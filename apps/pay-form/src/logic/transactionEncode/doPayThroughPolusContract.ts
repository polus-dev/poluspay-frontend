import { IEncodeTransfer } from './types/IEncodeTransfer';
import { Address, encodeFunctionData } from 'viem';
import polusAbi from '../../polus_abi';
import { Hex } from 'viem';
interface IPayThroughPolusContract
    extends Omit<
        IEncodeTransfer,
        | 'context'
        | 'txData'
        | 'universalRouterAddress'
        | 'asset_amount_decimals'
    > {}

export function doPayThroughPolusContract({
    fee,
    uuid,
    merchant,
    merchantAmount,
    tokenAddress,
    feeRecipient,
}: IPayThroughPolusContract): Hex {
    // const polusContract = new ethers.utils.Interface(PolusContractAbi);
    uuid = uuid.replaceAll('-', '');
    if (tokenAddress) {
        return encodeFunctionData({
            abi: polusAbi,
            functionName: 'DoERC20Payment',
            args: [
                ('0x' + uuid) as Hex,
                tokenAddress as Address,
                feeRecipient as Address,
                BigInt(fee),
                merchant as Address,
                BigInt(merchantAmount),
            ],
        });
    } else {
        return encodeFunctionData({
            abi: polusAbi,
            functionName: 'DoETHPayment',
            args: [
                ('0x' + uuid) as Hex,
                feeRecipient as Address,
                BigInt(fee),
                merchant as Address,
                BigInt(merchantAmount),
            ],
        });
    }
}
