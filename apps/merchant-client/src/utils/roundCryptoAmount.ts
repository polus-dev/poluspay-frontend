export const roundCryptoAmount = (amount: string) => {
  const index = amount.indexOf(".");
  let floatIndex = index + 1;
  do {
    floatIndex++
  }
  while (floatIndex < amount.length && amount[floatIndex] === "0")
  return (parseFloat(amount).toFixed(floatIndex - index) ?? "calculation error")
}
