const countSum = a => a.reduce((a, c) => [a[0] + 1, a[1] + c], [0, 0]);
const jlog = o => console.log(JSON.stringify(o));
const jlog2 = o => console.log(JSON.stringify(o, null, 2));
const pips = (p, points) => points[p].reduce((a, c, i) => a + (25 - i) * c, 0);
const myPoints = ({ isWhite, points }) =>
  isWhite
    ? [points[0].slice(), points[1].slice().reverse()]
    : [points[1].slice().reverse(), points[0].slice()];

const cartesian = (fn, len = []) => {
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

const cartesianArrays = (fn, arrays = []) =>
  cartesian(c => fn(c.map((e, i) => arrays[i][e])), arrays.map(a => a.length));

//cartesian(jlog, [2, 3]);
//cartesianArrays(jlog, [["A", 1], [0, 1]]);
//cartesianArrays(jlog, [["A", "B", "C"], [0, 1], ["x", "y", "z"]]);

const perm = (fn, ordered = false, n, count) => {
  const a = Array.isArray(count) ? count.slice() : Array(count).fill(1);
  const m = a.length;
  const result = Array(n);
  const recurse = (r, i) => {
    while (i < m) {
      if (a[i]) {
        result[r] = i;
        if (r === n - 1) {
          fn(result.slice());
        } else {
          a[i]--; // one less available
          recurse(r + 1, ordered ? i : 0);
          a[i]++; // make available again
        }
      }
      i++;
    }
  };
  recurse(0, 0);
};

/*
const permItems = (fn, ordered, n, array) =>
  perm(p => fn(p.map(e => array[e])), ordered, n, array.length);

perm(jlog, true, 3, [1, 1, 3, 1, 1]);
perm(jlog, false, 2, 3);
const r = [];
perm(v => r.push(v), true, 2, 3);
jlog({ l: r.length, r });
permItems(jlog, true, 2, ["A", "B", "C", "D", "E"]);
*/

const doMove = (me, opp) => (from, to) => {
  me[from]--;
  me[to]++;
  opp[0] += opp[to];
  opp[to] = 0;
};

const undoMove = (me, opp) => (from, to, taken) => {
  me[from]++;
  me[to]--;
  opp[0] -= taken;
  opp[to] = taken;
};

const walkMoves = (fn, [d1, d2], me, opp) => {
  const doM = doMove(me, opp);
  const undoM = undoMove(me, opp);
  const combos = d1 === d2 ? [[d1, d1, d1, d1]] : [[d1, d2], [d2, d1]];
  const end = combos[0].length - 1;
  const m = me.length;
  const result = Array(combos[0].length);
  const recurse = (r, from) => {
    let to = from + combo[r];
    while (from < m && to < m) {
      let taken = opp[to];
      if (me[from] && taken < 2) {
        result[r] = [from, to, taken];
        if (r === end) {
          fn(result.slice());
        } else {
          doM(from, to);
          recurse(r + 1, from);
          undoM(from, to, taken);
        }
      }
      from++;
      to++;
    }
  };
  for (var combo of combos) recurse(0, 0);
};

const validMoves = ({ dice, isWhite, points }) => {
  let [me, opp] = myPoints({ isWhite, points });
  const result = [];
  walkMoves(v => result.push(JSON.stringify(v.sort())), [2, 2], me, opp);
  result.sort();
  jlog({ result, len: result.length, slen: [...new Set(result)].length });
  return [];
};

export { pips, validMoves };
