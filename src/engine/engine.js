import occupation from "./occupation";
import tail from "./tail";
import stats from "../lib/stats";

const jlog = o => console.log(JSON.stringify(o));
const jlog2 = o => console.log(JSON.stringify(o, null, 2));

const pips = xys => xys.reduce((a, [x, y]) => a + (25 - x) * y, 0);

const doubles = (me, occs) => occs.reduce((a, c) => (me[c] > 1 ? a + 1 : a), 0);
const blocks = (me, occs) => {
  const result = [];
  for (let i = 0; i < occs.length; ) {
    if (me[occs[i]] > 1) {
      for (
        var j = i + 1;
        j < occs.length && occs[j] === occs[i] + j - i && me[occs[j]] > 1;
        j++
      );
      result[i] = (result[i] || 0) + 1;
      i = j;
    } else i++;
  }
};

const allHomeCount = 25 * 15;
const evaluate = ({ player, points }) => {
  const [me, opp] = player === 0 ? points : [points[1], points[0]];
  const occupations = points.map(occupation);
  const sigma = occupations.map(stats);
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

export { pips };
