import goers from "./goers";

const jlog = o => (console.log(JSON.stringify(o)), o);

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
  },
  trailer: (from = 0) => {
    for (; from < 25; from++) if (me[from]) return from;
    return from;
  }
});

const moves = fn => ({ dice: d, points, player }) => {
  const [me, opp] = player === 0 ? points : [points[1], points[0]];
  const { doMove, undoMove, trailer } = moveOps([me, opp]);
  //prettier-ignore
  const combo = d[0] === d[1] ? [d[0], d[0], d[0], d[0]] : 
                d[0] > d[1] ? [d[1], d[0]] : d;
  const g = goers([me, opp], combo);
  const initTail = trailer(0);
  const end = combo.length - 1;
  const off = me.length - 1;
  const path = combo.map((d, i) => ({ d, ...g[i] /* bear: off - d */ }));

  const isDup = () => {
    if (path.length !== 2) return false; // doubles and single die
    if (path[0].d <= path[1].d) return false; // not second pass
    if (path[0].from === path[1].from) return true;
    return (
      path[0].to === path[1].from &&
      path[0].taken === me[off - path[0].from - path[1].d] // is bounce // same take
    );
  };

  const post = a => fn(a.map(({ from: f, to: t, taken: n }) => [f, t, n]));

  const earlierGoers = (n, goE) => {
    for (let i = 0; i < goE; i++) if (me[n.goers[i]]) return true;
    return false;
  };

  const gLimit = c => {
    if (!me[0]) return c.goers.length; // none on bar
    if (c.goers.length === 0) return 0; // all blocked anyway
    return c.goers[0] > 0 ? 0 : 1; // bar is blocked y/n
  };

  const recurse = (r, g, tail) => {
    const c = path[r]; // current node
    let canPass = true;
    for (const gLim = gLimit(c); g < gLim; g++) {
      c.from = c.goers[g];
      if (!me[c.from]) continue; // if all pucks moved away
      c.to = c.from + c.d;
      if (c.to >= off) {
        if (tail < 19) continue; // not all home
        if (c.to > off && c.from > tail) continue;
        c.to = off;
        c.taken = 0;
      } else c.taken = opp[off - c.to];
      jlog({ r, l: d.length, c: { ...c, hot: undefined } });
      if (r === end) {
        if (!isDup()) post(path);
      } else {
        const next = path[r + 1];
        const pushValue = !me[c.to] && next.hot[c.to] ? c.to : 0;
        if (pushValue) next.goers.push(pushValue);
        doMove(c);
        canPass = recurse(r + 1, g, trailer(tail)) && canPass;
        if (canPass && !earlierGoers(c, g)) post(path.slice(0, r + 1));
        undoMove(c);
        if (pushValue) next.goers.pop();
      }
      canPass = false;
    }
    return canPass;
  };
  recurse(0, 0, initTail);
  if (combo.length === 2) {
    [path[0], path[1]] = [path[1], path[0]];
    recurse(0, 0, initTail);
  }
};

const validMoves = state => {
  const result = [];
  moves(v => result.push(v))(state);
  return result;
};

export { moves, moveOps, validMoves };
