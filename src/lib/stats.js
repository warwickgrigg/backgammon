export default xys => {
  const [count, sum, squares] = xys.reduce(
    (a, [x, y]) => [a[0] + y, a[1] + x * y, a[2] + y * x * x],
    [0, 0, 0]
  );
  const nzCount = count - 1 || 1;
  const mean = sum / nzCount;
  const variance = squares / nzCount - mean * mean;
  const sd = variance ** 0.5;
  return { count, sum, squares, mean, variance, sd };
};
