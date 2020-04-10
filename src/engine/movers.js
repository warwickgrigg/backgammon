export default ([me, opp], eDice = [1, 2]) => {
  const helpers1 = ([me, opp]) => die => {
    const off = me.length - 1; // 25
    const end = off - die; // 1:24
    const landers = Array(me.length).fill(false);
    for (var from = 0, starters = []; from < end; from++) {
      if (opp[end - from] < 2) {
        landers[from] = true;
        if (me[from]) starters.push(from);
      }
    }
    for (var enders = []; from < off; from++) {
      landers[from] = true;
      if (me[from]) enders.push(from);
    }
    return { starters, enders, landers, end };
  };
  const l = eDice.length;
  let uDice = l === 2 ? eDice : [eDice[0]];
  let result = uDice.map(helpers1([me, opp]));
  if (l <= 2) return result;
  let { starters, enders, landers, end } = result[0];
  return Array.from(new Array(l), () => ({
    starters: starters.slice(),
    enders: enders.slice(),
    landers: landers.slice(),
    end
  }));
};
