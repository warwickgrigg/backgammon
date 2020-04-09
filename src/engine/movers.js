export default ([me, opp], eDice = [0, 0]) => {
  const starters1 = ([me, opp]) => die => {
    const off = me.length - 1; // 25
    const end = off - die; // 1:24
    for (var from = 0, normal = []; from < end; from++) {
      if (me[from] && opp[end - from] < 2) normal.push(from);
    }
    for (var enders = []; from < off; from++) if (me[from]) enders.push(from);
    return [normal, enders];
  };
  const l = eDice.length;
  let uDice = l === 2 ? eDice : [eDice[0]];
  let r = uDice.map(starters1([me, opp]));
  return l === 2 ? r : Array(l).fill(r[0]);
};
