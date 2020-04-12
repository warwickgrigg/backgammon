import laggard from "./laggard";
import goers from "./goers";

const jlog = o => console.log(JSON.stringify(o));
const jlog2 = o => console.log(JSON.stringify(o, null, 2));

const moveOps = ([me, opp]) => ({
  doMove: ({ from, to, taken }) => {
    me[from]--;
    me[to]++;
    if (taken) {
      opp[0] += taken;
      opp[25 - to] = 0;
    }
  },
  undoMove: ({ from, to, taken }) => {
    me[from]++;
    me[to]--;
    if (taken) {
      opp[0] -= taken;
      opp[25 - to] = taken;
    }
  }
});

const moves = fn => ({ dice: d, points, player }) => {
  const [me, opp] = player === 0 ? points : [points[1], points[0]];
  const { doMove, undoMove } = moveOps([me, opp]);
  //prettier-ignore
  const combo = d[0] === d[1] ? [d[0], d[0], d[0], d[0]] 
    : d[0] > d[1] ? [d[1], d[0]] : d.slice();
  const g = goers([me, opp], combo);
  const myLaggard = laggard(me);
  const end = combo.length - 1;
  const result = Array.from(new Array(combo.length), () => ({}));
  const off = me.length - 1;
  jlog({ g });

  const isDup = () => {
    if (combo.length !== 2) return false; // doubles and single die
    if (combo[0] <= combo[1]) return false; // not second pass
    if (result[0].from === result[1].from) return true;
    return (
      result[0].to === result[1].from && // is bounce
      result[0].taken === opp[off - result[0].taken - combo[1]] // same take
    );
  };

  const post = a => fn(a.map(({ from: f, to: t, taken: n }) => [f, t, n]));

  const recurse = (r, s, tail) => {
    //jlog({ entryWith: { r, s, tail } });
    const slen = tail ? g[r].goers.length : g[r].goers[0] ? 0 : 1;
    for (var hasPosted = false; s < slen; s++) {
      const m = result[r]; // the new move
      m.from = g[r].goers[s];
      //jlog({ combo, bar: me[0], r, from: m.from, result });
      if (!me[m.from]) continue;
      m.to = m.from + combo[r];
      if (m.to >= off) {
        if (tail < 19) continue; // not all home
        if (m.to > off && m.from > tail) continue;
        m.to = off;
        m.taken = 0;
      } else m.taken = opp[off - m.to];
      //jlog({ combo, bar: me[0], ...m, r, result });
      if (r === end) {
        if (!isDup()) post(result);
      } else {
        const pushValue = !me[m.to] && g[r + 1].hot[m.to] ? m.to : 0;
        if (pushValue) g[r + 1].goers.push(pushValue);
        doMove(m);
        hasPosted = recurse(r + 1, s, myLaggard(tail)) || hasPosted;
        if (!hasPosted) post(result.slice(0, r + 1));
        undoMove(m);
        if (pushValue) g[r + 1].goers.pop();
      }
      hasPosted = true;
    }
    //jlog({ exitAt: { s, from: g[r].goers[s], hasPosted } });
    return hasPosted;
  };
  recurse(0, 0, myLaggard(0));
  if (combo.length === 2) {
    [g[0], g[1]] = [g[1], g[0]];
    [combo[0], combo[1]] = [combo[1], combo[0]];
    recurse(0, 0, myLaggard(0));
  }
};

const validMoves = state => {
  const result = [];
  moves(v => result.push(v))(state);
  return result;
};

export { moves, moveOps, validMoves };
