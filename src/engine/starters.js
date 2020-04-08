export default (die, [me, opp]) => {
  const off = me.length - 1; // 25
  const end = off - die; // 1:24
  const oppStart = off - die; // 1: 24
  for (var from = 0, result = []; from < end; from++) {
    if (me[from] && opp[oppStart - from] < 2) result.push(from);
  }
  console.log({ from });
  if (me[from]) result.push(from);
  return result;
};
