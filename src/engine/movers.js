export default (meopp, eDice = [1, 2]) => {
  const helpers1 = ([me, opp]) => die => {
    const off = me.length - 1; // 25
    const bear = off - die; // 1:24
    const hot = Array(me.length).fill(true);
    hot[25] = false;
    for (var from = 0, starters = []; from < bear; from++)
      if (opp[bear - from] > 1) hot[from] = false;
      else if (me[from]) starters.push(from);
    for (; from < off; from++) if (me[from]) starters.push(from);
    return { starters, hot, bear };
  };
  const l = eDice.length;
  const uniqDice = l === 2 ? eDice : [eDice[0]];
  const result = uniqDice.map(helpers1(meopp));
  if (l <= 2) return result;
  const { starters, hot, bear } = result[0];
  return Array.from(new Array(l), () => ({
    starters: starters.slice(),
    hot,
    bear
  }));
};
