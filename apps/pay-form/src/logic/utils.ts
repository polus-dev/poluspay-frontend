import { ethers } from 'ethers';

export const getPathFromCallData = (calldata: string) => {
    const coder = new ethers.utils.AbiCoder();
    const types = [
        ['bytes', 'bytes[]', 'uint256'],
        ['address', 'uint256', 'uint256', 'bytes', 'bool'],
    ];
    return coder.decode(
        types[1],
        coder.decode(types[0], Buffer.from(calldata.slice(10), 'hex'))[1][0]
    )[3];
    // 🤡
};
