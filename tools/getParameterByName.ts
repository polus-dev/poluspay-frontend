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
