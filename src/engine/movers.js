export default (meopp, eDice = [1, 2]) => {
  const helpers1 = ([me, opp]) => die => {
    const off = me.length - 1; // 25
    const end = off - die; // 1:24
    const hot = Array(me.length).fill(false);
    for (var from = 0, starters = []; from < end; from++) {
      if (opp[end - from] < 2) {
        hot[from] = true;
        if (me[from]) starters.push(from);
      }
    }
    for (var enders = []; from < off; from++) {
      hot[from] = true;
      if (me[from]) enders.push(from);
    }
    return { starters, enders, hot, end };
  };
  const l = eDice.length;
  const uniqDice = l === 2 ? eDice : [eDice[0]];
  const result = uniqDice.map(helpers1(meopp));
  if (l <= 2) return result;
  const { starters, enders, hot, end } = result[0];
  return Array.from(new Array(l), () => ({
    starters: starters.slice(),
    enders: enders.slice(),
    hot,
    end
  }));
};
