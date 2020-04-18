export default (meopp, eDice = [1, 2]) => {
  const inner = ([me, opp]) => die => {
    const off = me.length - 1; // 25
    const bear = off - die; // 1:24
    const hot = Array(me.length).fill(true);
    hot[25] = false;
    for (var from = 0, goers = []; from < bear; from++)
      if (opp[bear - from] > 1) hot[from] = false;
      else if (me[from]) goers.push(from);
    for (; from < off; from++) if (me[from]) goers.push(from);
    return { goers, hot };
  };
  const l = eDice.length;
  const uniqDice = l === 2 ? eDice : [eDice[0]];
  const result = uniqDice.map(inner(meopp));
  return l <= 2 ? result : Array(l).fill(result[0]);
};
