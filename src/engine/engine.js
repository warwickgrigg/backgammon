import occupation from "./occupation";
import laggard from "./laggard";

const jlog = o => console.log(JSON.stringify(o));
const jlog2 = o => console.log(JSON.stringify(o, null, 2));

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

export { pips };
