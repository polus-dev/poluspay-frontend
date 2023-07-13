export const makeShortHash = (
    hash: string,
    leftAlignment: number = 4,
    rightAlignment = leftAlignment
) => `${hash.slice(0, leftAlignment)}...${hash.slice(-rightAlignment)}`;
