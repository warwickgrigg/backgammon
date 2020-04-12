export default a => {
  const board = [Array(25).fill(0), Array(25).fill(0)];
  const onboardCount = [0, 0];
  if (typeof a === "string") {
    a = a
      .split(",")
      .map(v => v.match(/(\d+|[^\d]+)/g))
      .map(([p, c, n = "1"]) => [
        parseInt(p, 10),
        c.toLowerCase() === "w" ? 0 : 1,
        parseInt(n, 10)
      ]);
  }
  a.forEach(([position, color, count]) => {
    const p = position * (1 - color) + 25 * color;
    onboardCount[color] += count - board[color][p];
    board[color][p] = count;
  });
  onboardCount.forEach((v, color) => (board[color][25] = 15 - v));
  return board;
};
