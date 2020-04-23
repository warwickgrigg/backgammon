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

const moves = fn => ({ dice, points, player, from = -1 }) => {
  const [me, opp] = player === 0 ? points : [points[1], points[0]];
  const { doMove, undoMove, trailer } = moveOps([me, opp]);
  const path = initPath(dice);
  const end = path.length - 1;
  const off = me.length - 1;

  function initPath(d) {
    //prettier-ignore
    let combo = from >= 0 ? [d[0]] : 
                d[0] === d[1] ? [d[0], d[0], d[0], d[0]] : 
                d[0] > d[1] ? [d[1], d[0]] : d;
    const g = goers([me, opp], combo);
    if (from >= 0) g[0].goers = g[0].goers.filter(p => p === from);
    return combo.map((die, i) => ({ die, ...g[i] }));
  }

  const isDup = () => {
    if (path.length !== 2) return false; // not doubles and single die
    if (path[0].die <= path[1].die) return false; // not second pass
    if (path[0].from === path[1].from) return true; // same from
    if (path[0].to !== path[1].from) return false; // not if no bounce
    return !path[0].taken && !me[off - path[0].from - path[1].die]; // no take
  };

  const post = a => fn(a.map(({ from: f, to: t, taken: n }) => [f, t, n]));

  const earlierGoers = (n, goE) => {
    for (let i = 0; i < goE; i++) if (me[n.goers[i]]) return true;
    return false;
  };

  const goerLimit = goers => {
    if (!me[0]) return goers.length; // none on bar
    if (goers.length === 0) return 0; // all blocked anyway
    return goers[0] > 0 ? 0 : 1; // bar is blocked y/n
  };

  const walkTree = (depth, g, tail) => {
    const c = path[depth]; // current node
    let canPass = true;
    for (const goerLim = goerLimit(c.goers); g < goerLim; g++) {
      c.from = c.goers[g];
      if (!me[c.from]) continue; // if all pucks moved away
      c.to = c.from + c.die;
      if (c.to >= off) {
        if (tail < 19) continue; // not all home
        if (c.to > off && c.from > tail) continue;
        c.to = off;
        c.taken = 0;
      } else c.taken = opp[off - c.to];
      //jlog({ depth, l: path.length, c: { ...c, hot: undefined } });
      if (depth === end) {
        if (!isDup()) post(path);
      } else {
        const next = path[depth + 1];
        const pushValue = !me[c.to] && next.hot[c.to] ? c.to : 0;
        if (pushValue) next.goers.push(pushValue);
        doMove(c);
        canPass = walkTree(depth + 1, g, trailer(tail)) && canPass;
        if (canPass && !earlierGoers(c, g)) post(path.slice(0, depth + 1));
        undoMove(c);
        if (pushValue) next.goers.pop();
      }
      canPass = false;
    }
    return canPass;
  };
  const initTail = trailer(0);
  walkTree(0, 0, initTail);
  if (path.length === 2) {
    [path[0], path[1]] = [path[1], path[0]];
    walkTree(0, 0, initTail);
  }
};

const validMoves = props => {
  const result = [];
  moves(v => result.push(v))(props);
  return result;
};

const validFirstMoves = ({ dice: d, points, ...props }) => {
  const result = [];
  const p = [[...points[0]], [...points[1]]];
  jlog({ v: "firstMoves", d });
  d = d[0] === d[1] ? [d[0]] : d;
  d.forEach(d =>
    moves(v => result.push(v))({ dice: [d], points: p, ...props })
  );
  jlog({ result });
  return result;
};

export { moves, moveOps, validMoves, validFirstMoves };
