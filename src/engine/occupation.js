const r0 = pucks => pucks.reduce((a, c) => (c ? (a.push(c), a) : a), []);

const r1 = pucks => {
  for (var i = 0, result = []; i < pucks.length; i++)
    if (pucks[i]) result.push([i, pucks[i]]);
  return result;
};

export default r0;
