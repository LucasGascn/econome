export function url(request: string, key = true) {
  if (key) {
    const apiKey = process.env.API_KEY;
    //  const apiKey = "&x_cg_demo_api_key=CG-PRyvFoARJicJ7tL2qacTfMzV" //process.env.API_KEY;

    if (!apiKey) {
      throw new Error('API_KEY environment variable is not set.');
    }
    return `https://api.coinranking.com/v2/${request}`;
    //${apiKey}`;
  } else {
    return `https://api.coinranking.com/v2/${request}`;
  }
}

export function roundNumber(num: number) {
  let roundedNum;

  if (Math.abs(num) < 0.001) {
    roundedNum = num.toExponential(2);
  } else {
    roundedNum = (Math.round(num * 100) / 100).toFixed(2);
  }

  return roundedNum;
}

export function calculatePercentageIncrease(
  oldValue: number,
  newValue: number,
) {
  let percentageIncrease = ((newValue - oldValue) / oldValue) * 100;

  return percentageIncrease;
}
