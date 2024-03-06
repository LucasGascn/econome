export function url(request) {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error('API_KEY environment variable is not set.');
  }
  return `https://api.coingecko.com/api/v3/${request}${apiKey}`;
}
