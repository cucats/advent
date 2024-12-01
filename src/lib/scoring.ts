export const calculateScore = (day: number, nthAnswer: number) => {
  const baseScore = Math.max(100 - 10 * (nthAnswer - 1), 10);
  return baseScore * Math.pow(1.05, day - 1);
};
