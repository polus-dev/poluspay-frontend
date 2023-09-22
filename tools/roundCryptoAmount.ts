export const roundCryptoAmount = (amount: string) => {
    let z = '0',
        o = 4,
        v = '.',
        isStartWithZero = amount.startsWith(z),
        floatPointIndex = amount.indexOf(v);
    if (floatPointIndex < 0) return amount;
    while (
        isStartWithZero
            ? amount[++floatPointIndex] === z
            : amount[++floatPointIndex] !== z &&
              floatPointIndex < amount.length &&
              floatPointIndex <= o
    );
    return amount.slice(
        0,
        amount[floatPointIndex - 1] === v && !isStartWithZero
            ? floatPointIndex - 1
            : isStartWithZero
            ? floatPointIndex + 1
            : floatPointIndex
    );
};
