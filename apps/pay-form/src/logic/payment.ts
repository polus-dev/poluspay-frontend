import { AllowanceTransfer, PermitSingle } from '@uniswap/permit2-sdk';
import { erc20ABI } from '@wagmi/core';
import permit2 from '../permit_abi';
import { CustomRouter } from './router';
import { Blockchain_t, ChainId } from '../store/api/endpoints/types';
import { Token as ERC20, WETH9 } from '@uniswap/sdk-core';
import { Token } from '../store/api/types';
import {
    ADDRESS_POLUS,
    PERMIT2_ADDRESS,
    RPCprovider,
    UNIVERSAL_ROUTER,
    QUOTER_ADDRESS,
} from './config';
import {
    Address,
    Hex,
    PublicClient,
    createPublicClient,
    decodeAbiParameters,
    encodeAbiParameters,
    getContract,
    http,
    parseAbiParameters,
} from 'viem';

export type Permit2AllowanceType = {
    amount: bigint;
    expiration: number;
    nonce: number;
};

interface DataSign {
    domain: any;
    types: any;
    primaryType: string;
    message: any;
}

export class CustomProvider {
    protected publicClient: PublicClient;

    constructor(protected blockchain: Blockchain_t) {
        let networkRpcUrl = RPCprovider.find(
            (el) => el.name === blockchain
        )?.url;
        if (!networkRpcUrl) throw new Error('networkRpcUrl is undefined');
        this.publicClient = createPublicClient({
            transport: http(networkRpcUrl),
        });
    }

    get networkId(): number {
        return ChainId[this.blockchain];
    }

    public async getValueForSwap(
        path: Hex,
        amountOut: bigint
    ): Promise<bigint> {
        const data = ('0x2f80bb1d' +
            encodeAbiParameters(
                [
                    { name: 'path', type: 'bytes' },
                    { name: 'amountOut', type: 'uint256' },
                ],
                [path, amountOut]
            )) as Hex;

        const result = await this.publicClient.call({
            // @ts-ignore
            to: QUOTER_ADDRESS[this.blockchain],
            data,
        });
        if (!result.data) {
            throw new Error('getValueForSwap: result.data is undefined');
        }
        return decodeAbiParameters(
            parseAbiParameters('uint256'),
            result.data
        )[0];
    }

    get RouterAddress(): Address {
        // @ts-ignore
        const address = UNIVERSAL_ROUTER[this.blockchain];
        if (!address) throw new Error('RouterAddress:address is undefined');
        return address;
    }

    get PolusAddress(): Address {
        // @ts-ignore
        const address = ADDRESS_POLUS[this.blockchain];
        if (!address) throw new Error('PolusAddress:address is undefined');
        return address;
    }

    get PermitAddress(): Address {
        return PERMIT2_ADDRESS;
    }
}

export class PaymentHelper extends CustomProvider {
    // ???
    time1 = BigInt(~~(Date.now() / 1000) + 60 * 30).toString();
    time2 = BigInt(~~(Date.now() / 1000) + 60 * 60 * 24 * 30).toString();

    constructor(
        blockchain: Blockchain_t,
        public userToken: Token,
        public merchantToken: Token,
        public userAddress: Address
    ) {
        super(blockchain);
    }

    get userTokenContract() {
        return getContract({
            address: this.userToken.contract as Address,
            abi: erc20ABI,
            publicClient: this.publicClient,
        });
    }

    get permitContract() {
        return getContract({
            address: PERMIT2_ADDRESS,
            abi: permit2,
            publicClient: this.publicClient,
        });
    }

    public async checkAllowanceToUserToken(
        type: 'permit' | 'polus' | 'router'
    ): Promise<bigint> {
        if (!this.userToken.contract)
            throw new Error('checkAllowance:contract is undefined');

        const to: Address =
            type === 'permit'
                ? this.PermitAddress
                : type === 'polus'
                ? this.PolusAddress
                : this.RouterAddress;

        if (!to) throw new Error('checkAllowance:to address is undefined');

        try {
            return await this.userTokenContract.read.allowance([
                this.userAddress,
                to,
            ]);
        } catch (error) {
            throw new Error('checkAllowance:error');
        }
    }

    public dataForSign(nonce: number): DataSign {
        if (!this.userToken.contract)
            throw new Error('dataForSign:contract is undefined');

        const dataForSign = CustomRouter.packToWagmi(
            this.userToken.contract,
            (2n ** 160n - 1n).toString(),
            this.time2,
            nonce.toString(),
            this.RouterAddress,
            this.time1
        );

        const valuesAny: PermitSingle = dataForSign.value;

        const { domain, types, values } = AllowanceTransfer.getPermitData(
            valuesAny,
            this.PermitAddress,
            ChainId[this.blockchain]
        );
        return {
            domain,
            types,
            message: values,
            primaryType: 'Mail',
        };
    }

    public async checkPermit(
        type: 'router' | 'polus'
    ): Promise<Permit2AllowanceType> {
        try {
            const response = await this.permitContract.read.allowance([
                this.userAddress,
                this.userToken.contract as Address,
                type === 'router' ? this.RouterAddress : this.PolusAddress,
            ]);
            return {
                amount: response[0],
                expiration: response[1],
                nonce: response[2],
            };
        } catch (error) {
            throw new Error('checkPermit:error');
        }
    }

    public async getSwapPath(amount: string) {
        const router = new CustomRouter(this.networkId);
        return await router.getRouter(
            amount,
            new ERC20(
                this.networkId,
                this.userToken.contract,
                this.userToken.decimals
            ),
            new ERC20(
                this.networkId,
                this.merchantToken.contract,
                this.merchantToken.decimals
            )
        );
    }

    public async getBalance(): Promise<bigint> {
        try {
            if (this.userToken.is_native)
                return await this.publicClient.getBalance({
                    address: this.userAddress,
                });

            return await this.userTokenContract.read.balanceOf([
                this.userAddress,
            ]);
        } catch (error) {
            throw new Error('getBalance:error');
        }
    }

    get Context(): 'universal router' | 'polus contract' {
        return (this.userToken.is_native && this.merchantToken.is_native) ||
            this.userToken.contract === this.merchantToken.contract
            ? 'polus contract'
            : 'universal router';
    }
}

export class WrapAltToken {
    static wrap = (chainId: number) => {
        if (chainId === 137)
            return new ERC20(
                chainId,
                '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
                18
            );
        else return WETH9[chainId];
    };
}
