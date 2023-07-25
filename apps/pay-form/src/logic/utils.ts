import { ethers } from 'ethers';

export function getParameterByName(
    name: string,
    url = window.location.href
): string | null {
    const name1 = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name1}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


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
