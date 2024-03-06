export function url(request, key = true) {
  if (key) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error('API_KEY environment variable is not set.');
    }
    return `https://api.coinranking.com/v2/${request}`;
    //${apiKey}`;
  } else {
    return `https://api.coinranking.com/v2/${request}`;
  }
}
