const formatNumbers = function(num: number) {
  return num < 10 ? "0" + num : num;
}

export const formatDate = function(date: Date) {
  let day = formatNumbers(date.getDate());
  let month = formatNumbers(date.getMonth() + 1);
  let year = date.getFullYear()
  return day + '-' + month + '-' + year
}
