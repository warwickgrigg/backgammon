import goers from "./goers";
import tail from "./tail";

const jlog = o => {
  console.log(JSON.stringify(o));
  return o;
};
//const jlog2 = o => console.log(JSON.stringify(o, null, 2));

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
  const myTail = tail(me);
  const end = combo.length - 1;
  const off = me.length - 1;
  //jlog({ g });
  const stack = combo.map((d, i) => ({ d, ...g[i], bear: off - d }));

  const post = a =>
    fn(a.map(({ from: f, to: t, taken: n }) => jlog([f, t, n])));

  const walk = (r = 0, iprotect = 0) => {
    const isDup = () => {
      if (stack.length !== 2) return false; // doubles and single die
      if (stack[0].d <= stack[1].d) return false; // not second pass
      if (stack[0].from === stack[1].from) return true;
      return (
        stack[0].to === stack[1].from &&
        stack[0].taken === me[off - stack[0].from - stack[1].d] // is bounce // same take
      );
    };
    const slen = () => {
      if (!me[0]) return stack[r].goers.length; // none on bar
      if (stack[r].goers.length === 0) return 0; // all blocked anyway
      if (stack[r].goers[0] > 0) return 0; // bar puck is blocked
      return 1;
    };
    const canPass = (m, goE) => {
      if (m.hasPosted) return false;
      for (let i = 0; i <= goE; i++) if (me[m.goers[i]]) return false;
      return true;
    };
    stack[0] = { ...stack[0], s: 0, tail: myTail(0), slen: slen() };
    while (r >= 0 && iprotect++ < 100) {
      stack[r].hasPosted = false;
      while (iprotect++ < 100 && stack[r].s < stack[r].slen) {
        const m = stack[r];
        //let s = m.s;
        const from = m.goers[m.s];
        let to = from + m.d;
        let taken = 0;
        if (!me[from]) {
          to = 0;
        } else if (to >= off) {
          to = m.tail < 19 || (to > off && from > m.tail) ? 0 : off;
        } else taken = opp[off - to];
        //prettier-ignore
        d.length === 2 && jlog({ r, l:d.length, d:m.d, s: m.s, from, to, goers: m.goers, tail: m.tail });
        if (to) {
          Object.assign(m, { from, to, taken });
          //pretiier-ignore
          jlog({ r, s: m.s, from, to, taken, end });
          if (r === end) {
            !isDup() && post(stack);
            m.hasPosted = true;
            m.s++;
          } else {
            r++;
            stack[r].s = m.s;
            m.newGoer = !me[to] && stack[r].hot[to] ? to : 0;
            if (m.newGoer) stack[r].goers.push(m.newGoer);
            doMove(m);
            stack[r].slen = slen();
            stack[r].tail = myTail(m.tail);
          }
        } else m.s++;
      }
      const m = stack[r];
      jlog({ undo: { r, s: m.s, slen: m.slen } });
      if (m.newGoer) m.goers.pop();
      undoMove(m);
      if (--r >= 0) {
        if (canPass(m, stack[r].s)) {
          jlog({ truncated: { m, s: stack[r].s } });
          post(stack.slice(0, r + 1));
          stack[r].hasPosted = true;
        }
        stack[r].s++;
      }
    }
  };
  walk();
  if (combo.length === 2) {
    [stack[0], stack[1]] = [stack[1], stack[0]];
    walk();
  }
};

const oldmoves = fn => ({ dice: d, points, player }) => {
  const [me, opp] = player === 0 ? points : [points[1], points[0]];
  const { doMove, undoMove } = moveOps([me, opp]);
  //prettier-ignore
  const combo = d[0] === d[1] ? [d[0], d[0], d[0], d[0]] 
    : d[0] > d[1] ? [d[1], d[0]] : d.slice();
  const g = goers([me, opp], combo);
  const myTail = tail(me);
  const initTail = myTail(0);
  const end = combo.length - 1;
  const result = Array.from(new Array(combo.length), () => ({}));
  const off = me.length - 1;
  //jlog({ g });
  const isDup = () => {
    if (combo.length !== 2) return false; // doubles and single die
    if (combo[0] <= combo[1]) return false; // not second pass
    if (result[0].from === result[1].from) return true;
    return jlog(
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
        hasPosted = recurse(r + 1, s, myTail(tail)) || hasPosted;
        if (!hasPosted) post(result.slice(0, r + 1));
        undoMove(m);
        if (pushValue) g[r + 1].goers.pop();
      }
      hasPosted = true;
    }
    //jlog({ exitAt: { s, from: g[r].goers[s], hasPosted } });
    return hasPosted;
  };
  recurse(0, 0, initTail);
  if (combo.length === 2) {
    [g[0], g[1]] = [g[1], g[0]];
    [combo[0], combo[1]] = [combo[1], combo[0]];
    recurse(0, 0, initTail);
  }
};

const validMoves = state => {
  const result = [];
  moves(v => result.push(v))(state);
  return result;
};

export { moves, moveOps, validMoves };
