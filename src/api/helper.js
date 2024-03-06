export function url(request) {
  const apiKey = "&x_cg_demo_api_key=CG-PRyvFoARJicJ7tL2qacTfMzV" //process.env.API_KEY;
  if (!apiKey) {
    throw new Error('API_KEY environment variable is not set.');
  }
  return `https://api.coingecko.com/api/v3/${request}${apiKey}`;
}
