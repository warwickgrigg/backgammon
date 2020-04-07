import laggard from "./laggard";

const jlog = o => console.log(JSON.stringify(o));
const jlog2 = o => console.log(JSON.stringify(o, null, 2));

const movers = ([me, opp]) => ({
  doMove: (from, to, taken) => {
    me[from]--;
    me[to]++;
    if (taken) {
      opp[0] += taken;
      opp[25 - to] = 0;
    }
  },
  undoMove: (from, to, taken) => {
    me[from]++;
    me[to]--;
    if (taken) {
      opp[0] -= taken;
      opp[25 - to] = taken;
    }
  }
});

const moves = fn => ({ dice, points, player }) => {
  let [d1, d2] = dice;
  if (d2 < d1) [d1, d2] = [d2, d1];
  const combos = d1 === d2 ? [[d1, d1, d1, d1]] : [[d1, d2], [d2, d1]];
  const [me, opp] = player === 0 ? points : [points[1], points[0]];
  const { doMove, undoMove } = movers([me, opp]);
  const myLaggard = laggard(me);
  const end = combos[0].length - 1;
  const result = Array(combos[0].length);
  const off = me.length - 1;
  const recurse = (r, from, lagger) => {
    let hasPosted = false;
    let fromLimit = lagger ? off : 1;
    console.log({ from, lagger, fromLimit });
    while (from < fromLimit) {
      if (me[from]) {
        let to = from + combo[r];
        let taken = 0;
        if (to >= off) {
          if (to > off && from !== lagger) break;
          to = off;
        } else {
          taken = opp[off - to];
        }
        if (taken < 2) {
          result[r] = [from, to, taken];
          if (r === end) {
            if (
              combo[0] <= combo[1] || // must test for dup bouncing puck
              from !== result[0][1] || // not bounce
              result[0][2] !== opp[off - result[0][0] - combo[1]] // diff take
            ) {
              fn(result.slice());
            }
          } else {
            doMove(from, to, taken);
            hasPosted =
              recurse(
                r + 1,
                combo[0] <= combo[1] ? from : from + 1, // dedup
                myLaggard(lagger)
              ) || hasPosted;
            if (!hasPosted) fn(result.slice(0, r + 1));
            undoMove(from, to, taken);
          }
          hasPosted = true;
        }
      }
      from++;
    }
    return hasPosted;
  };
  for (var combo of combos) {
    recurse(0, 0, myLaggard(0));
  }
};

const validMoves = state => {
  const result = [];
  moves(v => result.push(v))(state);
  //result.sort();
  //jlog({ result, len: result.length });
  return result;
};

export { moves, movers, validMoves };
