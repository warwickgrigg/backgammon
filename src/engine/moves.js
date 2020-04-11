import laggard from "./laggard";
import movers from "./movers";

const jlog = o => console.log(JSON.stringify(o));
const jlog2 = o => console.log(JSON.stringify(o, null, 2));

const moveOps = ([me, opp]) => ({
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
  const [me, opp] = player === 0 ? points : [points[1], points[0]];
  const { doMove, undoMove } = moveOps([me, opp]);
  const [d1, d2] = dice[0] < dice[1] ? dice : [dice[1], dice[0]];
  const combo = d1 === d2 ? [d1, d1, d1, d1] : [d1, d2];
  const m = movers([me, opp], combo);
  const myLaggard = laggard(me);
  const end = combo.length - 1;
  const result = Array(combo.length);
  const off = me.length - 1;
  jlog({ m });

  const isDup = () => {
    if (combo[0] <= combo[1]) return false; // not first time
    if (result[0][0] === result[1][0]) return true; // same from
    return (
      result[0][1] === result[1][0] && // is bounce
      result[0][2] === opp[off - result[0][0] - combo[1]] // ssame take
    );
  };

  const recurse = (r, s, tail) => {
    jlog({ entryWith: { r, s, tail } });
    const slen = tail ? m[r].starters.length : m[r].starters[0] > 0 ? 0 : 1;
    for (var hasPosted = false; s < slen; s++) {
      const from = m[r].starters[s];
      jlog({ combo, bar: me[0], r, from, result });
      if (!me[from]) continue;
      const to = from + combo[r];
      if (to > 24 && from > tail) continue;
      const taken = opp[off - to];
      result[r] = [from, to, taken];
      jlog({ combo, bar: me[0], from, to, r, result });
      if (r === end) {
        if (!isDup()) fn(result.slice());
      } else {
        const pushValue = !me[to] && m[r + 1].hot[to] ? to : 0;
        if (pushValue) m[r + 1].starters.push(pushValue);
        doMove(from, to, taken);
        hasPosted = recurse(r + 1, s, myLaggard(tail)) || hasPosted;
        if (!hasPosted) fn(result.slice(0, r + 1));
        undoMove(from, to, taken);
        if (pushValue) m[r + 1].starters.pop();
      }
      hasPosted = true;
    }
    jlog({ exitAt: { s, from: m[r].starters[s], hasPosted } });
    return hasPosted;
  };
  recurse(0, 0, myLaggard(0));
  if (d1 !== d2) {
    [m[0], m[1]] = [m[1], m[0]];
    [combo[0], combo[1]] = [d2, d1];
    recurse(0, 0, myLaggard(0));
  }
};
const movesOld = fn => ({ dice, points, player }) => {
  let [d1, d2] = dice;
  if (d2 < d1) [d1, d2] = [d2, d1];
  const combos = d1 === d2 ? [[d1, d1, d1, d1]] : [[d1, d2], [d2, d1]];
  const [me, opp] = player === 0 ? points : [points[1], points[0]];
  const { doMove, undoMove } = moveOps([me, opp]);
  const myLaggard = laggard(me);
  const end = combos[0].length - 1;
  const result = Array(combos[0].length);
  const off = me.length - 1;

  const recurse = (r, from, lagger) => {
    let hasPosted = false;
    let fromLimit = lagger ? off : 1;
    //console.log({ from, lagger, fromLimit });
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

export { moves, moveOps, validMoves };
