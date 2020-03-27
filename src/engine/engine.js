const countSum = a => a.reduce((a, c) => [a[0] + 1, a[1] + c], [0, 0]);
const jlog = o => console.log(JSON.stringify(o));
const pips = (p, points) => points[p].reduce((a, c, i) => a + (25 - i) * c, 0);
const myPoints = ({ isWhite, points }) =>
  isWhite
    ? [points[0].slice(), points[1].slice().reverse()]
    : [points[1].slice().reverse(), points[0].slice()];

/*
const validMoves1 = ({ dice, isWhite, points }) => {
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

const vMovesx = ({ points, isWhite = true, dice }) => {
  let result = [];
  let diceCombo = d1 === d2 ? [[d1, d1, d1, d1]] : [[d1, d2], [d2, d1]];
  let [comboNo, diceNo] = [0, 0];
  let [me, opp] = myPoints({ isWhite, points });
  let from = 0; // next position to consider
  let branchMoves = []; // moves applied for this branch
  const pushMove = (from, to) => branchMoves.push({ from, to, taken: opp[to] });
  const popMove = () => branchMoves.pop();
  const applyMove = (from, to) => {
    pushMove(from, to);
    me[from]--;
    me[to]++;
    opp[to] = 0;
  };

  const undoMove = () => {
    var { from, to, taken } = popMove();
    me[from]++;
    me[to]--;
    opp[to] = taken;
    return from;
  };

  const nextPoint = () => {
    while (from < 24 && !me[from]) from++;
  };

  nextPoint();

  while (from < 24 && me[from]) {
    [comboNo, diceNo] = [0, 0];
    while (from < 24 && me[from]) {
      while (from < 24 && comboNo < diceCombo.length) {
        while (from < 24)
          while (diceNo < diceCombo[comboNo].length) {
            const to = from + diceCombo[comboNo][diceNo];
            if (to < 24 && opp[to] <= 1) {
              applyMove(from, to);
            }
          }
      }
      if (diceNo >= diceCombo[comboNo].length) {
        result.push(branchMoves);
      }
      if (to <= 24) {
        from++;
      }
      diceNo = 0;
      comboNo++;
    }
    from++;
  }

  //diceComboIndex = [0, 0];
  //return false; // no more moves for this puck
  return result;
};

const vMovesy = ({ points, isWhite = true, dice }) => {
  let result = [];
  let diceCombo = d1 === d2 ? [[d1, d1, d1, d1]] : [[d1, d2], [d2, d1]];
  let [comboNo, diceNo] = [0, 0];
  let [me, opp] = myPoints({ isWhite, points });
  let p = positions[p];
  let from = 0; // next position to consider
  let branchMoves = []; // moves applied for this branch
  const pushMove = (from, to) => branchMoves.push({ from, to, taken: opp[to] });
  const popMove = () => branchMoves.pop();
  const applyMove = (from, to) => {
    pushMove(from, to);
    me[from]--;
    me[to]++;
    opp[to] = 0;
  };

  while (from < 24 && !me[from]) {
    from++;
  }
  const undoMove = () => {
    var { from, to, taken } = popMove();
    me[from]++;
    me[to]--;
    opp[to] = taken;
    return from;
  };

  const nextPoint = () => {
    while (from < 24 && !me[from]) from++;
  };

  nextPoint();

  while (from < 24 && me[from]) {
    [comboNo, diceNo] = [0, 0];
    while (from < 24 && me[from]) {
      while (from < 24 && comboNo < diceCombo.length) {
        while (from < 24)
          while (diceNo < diceCombo[comboNo].length) {
            const to = from + diceCombo[comboNo][diceNo];
            if (to < 24 && opp[to] <= 1) {
              applyMove(from, to);
            }
          }
      }
      if (diceNo >= diceCombo[comboNo].length) {
        result.push(branchMoves);
      }
      if (to <= 24) {
        from++;
      }
      diceNo = 0;
      comboNo++;
    }
    from++;
  }

  //diceComboIndex = [0, 0];
  //return false; // no more moves for this puck
  return result;
};
*/
const cartesianInts = (fn, len = []) => {
  const n = len.length;
  let p = new Array(n).fill(0);
  for (let b = 0, carry = 0; b < 1000 && !carry; b++) {
    fn(p.slice(0));
    carry = 1;
    for (let i = 0; i < n && carry; i++) {
      p[i] += carry;
      if (p[i] >= len[i]) {
        p[i] = 0;
      } else {
        carry = 0;
      }
    }
  }
};

xxxx;

const cartesian = (fn, arrays = []) =>
  cartesianInts(
    c => fn(c.map((e, i) => arrays[i][e])),
    arrays.map(a => a.length)
  );

cartesianInts(jlog, [2, 3]);
cartesian(jlog, [["A", "B", "C"], [0, 1], ["x", "y", "z"]]);

//const permArray = (fn, n, m) => perm(p => p.map(i => m[i]), n, m.length);
/*
const cartesian = (fn, arrays = []) => {
  const n = arrays.length;
  for (let p = new Array(n).fill(0), carry = 0; !carry; ) {
    fn(p.map((e, i) => arrays[i][e]));
    carry = 1;
    for (let i = 0; i < n && carry; i++) {
      p[i] += carry;
      if (p[i] >= arrays[i].length) {
        p[i] = 0;
      } else {
        carry = 0;
      }
    }
  }
};
*/
const perm = (fn, n, m) => {
  const ifAllUnique = fn => a => {
    for (let i = 0; i < a.length; i++) {
      for (let j = i + 1; j < a.length; j++) if (a[i] === a[j]) return;
    }
    fn(a);
  };
  //cartesianInts(jlog, Array(n).fill(m));
  cartesianInts(ifAllUnique(fn), Array(n).fill(m));
};
//
//perm(jlog, 2, 3);
//cartesian(jlog, [["A", 1], [0, 1]]);

/*
const occPoints = (me, [min = 1, max = 15]) => {
  for (var i = 0, result = []; i < me.length; i++)
    if (me[i] >= min && me[i] <= max) result.push(i);
  return result;
};
*/
const occPucks = (me, [min = 1, max = 15]) => {
  for (var i = 0, result = []; i < me.length; i++) {
    if (me[i] >= min) {
      for (var c = 0; c < Math.min(me[i], max); c++) result.push(i);
    }
  }
  return result;
};

const canGo = (opp, to) => to < opp.length && opp[to] < 2;

const puckMoves = (opp, from, dice) => {
  for (
    var d = 0, moves = [[], []], taken = [], to = from + dice[d];
    d < dice.length && to < opp.length && opp[to] < 2;

  ) {
    if (opp[to]) taken.push(to);
    moves[d].push({ from, to, taken: taken.slice() });
    d++;
    to += dice[d];
  }
  return moves; //[[singles],[doubles]]
};

const validMoves = ({ dice, isWhite, points }) => {
  let result = [];
  let [d1, d2] = dice;
  [d1, d2] = [Math.min(d1, d2), Math.max(d1, d2)];
  let dicex = d1 === d2 ? [[d1, d1, d1, d1]] : [[d1, d2], [d2, d1]];
  let [me, opp] = myPoints({ isWhite, points });
  const segMoves = [[[], []], [[], []], [[], []], [[], []]]; // singles/doubles

  let starters = [1, dicex[0].length === 2 ? 2 : 4].map(i =>
    occPucks(me, [1, i])
  );

  jlog({
    //perm: perm(2, 10, false),
    //ln: perm(2, 10, false).length,
    //permy: perm(2, 10, true),
    //ly: perm(2, 10, true).length
  });

  {
    const p = [];
    //for (let i = 0; i < 10; i++)
    //p.push(permSerial(2, 6, true, p[p.length - 1]));
    //jlog({ p });
  }

  if (d1 !== d2) {
    dicex.forEach(
      (die, d) =>
        starters[0].forEach(s => {
          const moves = puckMoves(opp, s, die);
          jlog({ d, s, moves });
          moves.forEach((g, i) => segMoves[i][d].push(g));
        })
      //starters[1]
    );
    //permArray(true, jlog, )
    segMoves.map((m, im) =>
      m.map((g, ig) => jlog({ [`segMoves${im}${ig}`]: g }))
    );
  }
  /*
    //const singles = dicex.map(d => starters[0].filter(e => canGo(opp, e + d)));
    //const doubles = singles.map(s => s.filter(e => canGo(opp, e + d1 + d2)));
    //const combos = permArray(dicex.length, starters[1], true);
    //jlog( dicex, starters, singles, doubles, combos });
    combos.forEach(d => {
      if (canGo(opp, d[0] + dicex[0]) && canGo(opp, d[1] + dicex[1])) {
        result.push(d);
      }
    });
    */

  jlog({ dicex, segMoves, result });

  //jlog(permy(3, 1));

  //jlog(permArray(dice.length, starters[2]));
  //jlog(permArray(dice.length, starters[2]).map(p => p.map((e, i) => [e, dice[i]])));
  return result;
};

export { pips, validMoves };
