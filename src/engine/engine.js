const jlog = o => console.log(JSON.stringify(o));
const pips = (p, points) => points[p].reduce((a, c, i) => a + (25 - i) * c, 0);

const validMoves = ({ dice, isWhite, points }) => {
  const moves = (pos, dice, me, opp) => {
    const simpleMoves = (pos, dice, me, opp) => {
      for (var i = 0, p = pos, taken = [], result = []; i < dice.length; i++) {
        p += dice[i];
        if (p > 24 || opp[p] > 1) return result;
        if (opp[p] === 1) taken.push(p);
        result.push({
          from: pos,
          to: p,
          taken: taken.slice(),
          dice: dice.slice(0, i + 1)
        });
        if (me[p] && me[p] + 2 + i >= dice.length) return result;
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
        !opp[r1[0].to] &&
        !opp[r2[0].to]
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

  for (var i = 0, result = [[], [], [], [], []]; i < me.length; i++) {
    if (me[i]) {
      const m = moves(i, xDice(dice), me, opp);
      //result = result.concat(m);
      m.forEach(m1 => result[m1.dice.length].push(m1));
    }
  }
  //[[[2], [1,1], [[1,1,1,1], [1,1,2], [2,2], [4]]]
  return result;
};

const vMoves = ({ dice, isWhite, points }) => {
  const moves = (pos, dice, me, opp) => {
    const simpleMoves = (pos, dice, me, opp) => {
      for (var i = 0, p = pos, taken = [], result = []; i < dice.length; i++) {
        p += dice[i];
        if (p > 24 || opp[p] > 1) return result;
        if (opp[p] === 1) taken.push(p);
        result.push({
          from: pos,
          to: p,
          taken: taken.slice(),
          dice: dice.slice(0, i + 1)
        });
        if (me[p] && me[p] + 2 + i >= dice.length) return result;
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
        !opp[r1[0].to] &&
        !opp[r2[0].to]
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

  for (var i = 0, result = [[], [], [], [], []]; i < me.length; i++) {
    if (me[i]) {
      const m = moves(i, xDice(dice), me, opp);
      //result = result.concat(m);
      m.forEach(m1 => result[m1.dice.length].push(m1));
    }
  }
  //[[[2], [1,1], [[1,1,1,1], [1,1,2], [2,2], [4]]]
  return result;
};

const treePath = [];
const walkerState = {
  diceIndex: [0, 0],
  dice: [[3, 4], [4, 3]],
  pos: 0
};
const applyDice = (from, to, me, opp) => {
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

const countSum = a => a.reduce((a, c) => [a[0] + 1, a[1] + c], [0, 0]);

export { pips, validMoves };
