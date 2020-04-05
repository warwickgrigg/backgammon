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

const permItems = (fn, ordered, n, array) =>
  perm(p => fn(p.map(e => array[e])), ordered, n, array.length);

perm(jlog, true, 3, [1, 1, 3, 1, 1]);
perm(jlog, false, 2, 3);
const r = [];
perm(v => r.push(v), true, 2, 3);
jlog({ l: r.length, r });
permItems(jlog, true, 2, ["A", "B", "C", "D", "E"]);

export default perm;
