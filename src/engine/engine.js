const jlog = o => console.log(JSON.stringify(o));
const pips = (p, points) => points[p].reduce((a, c, i) => a + (25 - i) * c, 0);

const validMoves = ({ dice, isWhite, points }) => {
  const moves = (pos, dice, me, opp) => {
    const simpleMoves = (pos, dice, me, opp) => {
      const result = [];
      for (var i = 0, p = pos, taken = []; i < dice.length; i++) {
        pos += dice[i];
        if (pos > 24 || opp[pos] > 1) return result;
        if (opp[pos] === 1) taken.push(pos);
        result.push([dice.slice(0, i + 1), taken]);
        if (me[pos] && me[pos] + 2 + i >= dice.length) return result;
      }
      return result;
    };
    const r1 = simpleMoves(pos, dice, me, opp);
    if (dice.length === 4) {
      return r1;
    } else {
      const r2 = simpleMoves(pos, [dice[1], dice[0]], me, opp);
      if (
        r1.length === 2 &&
        r2.length === 2 &&
        !opp[r1[1][0]] &&
        !opp[r2[1][0]]
      ) {
        return [r1[0], r2[0], r1[1]]; // eg. if both 3,4 and 4,3 equivalent
      }
      return r1.concat(r2); // no equivalences to eliminate
    }
  };

  const xDice = ([d1, d2]) => (d1 === d2 ? [d1, d1, d1, d1] : [d1, d2]);

  const myPoints = ({ isWhite, points }) =>
    isWhite
      ? [[...points[0]], [...points[1]].reverse()]
      : [[...points[1]].reverse(), [...points[0]]];

  const [me, opp] = myPoints({ isWhite, points });

  for (var i = 0, result = []; i < me.length; i++) {
    if (me[i]) {
      const m = moves(i, xDice(dice), me, opp);
      if (m.length) result.push([i, m]);
    }
  }
  return result;
};

const countSum = a => a.reduce((a, c) => [a[0] + 1, a[1] + c], [0, 0]);

const fromTo = validMovesResult => {
  const v = validMovesResult;
  for (var i = 0, r = []; i < v.length; i++) {
    /*
    for (let j = 0, point = v[i]; j < point.length; j++) {
      for (let k = 0, frm = point[0], tos = point[1]; k < tos.length; k++) {}
    */
    for (let k = 0, frm = v[i][0], tos = v[i][1]; k < tos.length; k++) {
      jlog({
        lengths: [v.length, tos.length],
        frm,
        tos: tos[k],
        tosum: tos[k][0]
      });
      const cs = countSum(tos[k][0]);
      r.push({ from: frm, to: frm + cs[1], taken: tos[k][1], used: tos[k][0] });
    }
  }
  return r;
};

const treePath = [];
const applyMove = (from, to, me, opp) => {
  me[from]--;
  me[to]++;
  treePath.push([from, to, opp[to]]);
  opp[to] = 0;
};

const undoMove = (me, opp) => {
  const [from, to, taken] = treePath.pop();
  me[from]++;
  me[to]--;
  opp[to] = taken;
};

export { pips, validMoves, fromTo };
