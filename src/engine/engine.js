import occupation from "./occupation";
import isBearOff from "./isBearOff";

const jlog = o => console.log(JSON.stringify(o));
const jlog2 = o => console.log(JSON.stringify(o, null, 2));

const doMove = ([me, opp]) => (from, to, taken) => {
  me[from]--;
  me[to]++;
  opp[0] += taken;
  opp[25 - to] = 0;
};

const undoMove = ([me, opp]) => (from, to, taken) => {
  me[from]++;
  me[to]--;
  opp[0] -= taken;
  opp[25 - to] = taken;
};

const walkMoves = (fn, [d1, d2], points) => {
  const [me, opp] = points;
  const [doM, undoM] = [doMove(points), undoMove(points)];
  const combos = d1 === d2 ? [[d1, d1, d1, d1]] : [[d1, d2], [d2, d1]];
  const end = combos[0].length - 1;
  const result = Array(combos[0].length);
  const recurse = (r, from) => {
    let hasPosted = false;
    let to = from + combo[r];
    let fromLimit = me[0] ? 1 : 25;
    while (from < fromLimit && to < me.length) {
      let taken = opp[25 - to];
      if (me[from] && taken < 2) {
        result[r] = [from, to, taken];
        if (r === end) {
          fn(result.slice());
        } else {
          doM(from, to, taken);
          if (!recurse(r + 1, from)) fn(result.slice());
          undoM(from, to, taken);
        }
        hasPosted = true;
      }
      from++;
      to++;
    }
    return hasPosted;
  };
  for (var combo of combos) recurse(0, 0);
};

const validMoves = ({ dice, player, points }) => {
  const result = [];
  walkMoves(v => result.push(JSON.stringify(v.sort())), [2, 2], points);
  result.sort();
  jlog({ result, len: result.length, slen: [...new Set(result)].length });
  return [];
};

const pips = xys => xys.reduce((a, [x, y]) => a + (25 - x) * y, 0);

const sigmas = xys => {
  const [count, sum, squares] = xys.reduce(
    (a, [x, y]) => [a[0] + y, a[1] + x * y, a[2] + y * x * x],
    [0, 0, 0]
  );
  const mean = sum / (count - 1);
  const variance = squares / (count - 1) - mean * mean;
  const sd = variance ** 0.5;
  return { count, sum, squares, mean, variance, sd };
};

const doubles = xys => {
  for (var i = 0, start, result = []; i < xys.length; i++) {}
};

const allHomeCount = 25 * 15;
const evaluate = ({ player, points }) => {
  const [me, opp] = player === 0 ? points : [points[1], points[0]];
  const occupations = points.map(occupation);
  const sigma = occupations.map(sigmas);
  //const pip = occupations.map(pips);
  const pip = sigma.map(s => allHomeCount - s.sum);
  //const results = sigma.map(({ count, sum, squares, mean, sd }) => 0);
  return { sigma, pip, occupations };
};

const testState = {
  counter: 0,
  dice: [1, 5],
  player: 0, // 0 for white, 1 for black
  // prettier-ignore
  points: [
    [ // white
      0, // on bar
      2, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 3,
      0, 1, 1, 0, 3, 0,    5, 0, 0, 0, 0, 0,
      0,  // off
    ], [ // black
      0, // on bar
      2, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 5,
      0, 0, 0, 0, 3, 0,    3, 0, 0, 1, 1, 0,
      0,  // off
    ],
  ]
};

jlog(evaluate(testState));
validMoves(testState).forEach(jlog);
//console.log(JSON.stringify(fromTo(validMoves(state)), null, 2));

export { pips, validMoves };
