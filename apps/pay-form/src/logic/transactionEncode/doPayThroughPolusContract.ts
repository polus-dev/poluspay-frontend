import { Address, encodeFunctionData, Hex } from 'viem';
import { IEncodeTransfer } from './types/IEncodeTransfer';
import polusAbi from '../../abi/polus_abi';

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
    const modifiedUuid = uuid.replaceAll('-', '');
    const hex = `0x${modifiedUuid}` as Hex;

    if (tokenAddress) {
        return encodeFunctionData({
            abi: polusAbi,
            functionName: 'DoERC20Payment',
            args: [
                hex,
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
                hex,
                feeRecipient as Address,
                BigInt(fee),
                merchant as Address,
                BigInt(merchantAmount),
            ],
        });
    }
}
