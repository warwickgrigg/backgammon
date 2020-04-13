//const r = pucks => pucks.reduce((a, c) => (c ? a.push(c) : a), []);

export default pucks => {
  for (var i = 0, result = []; i < pucks.length; i++)
    if (pucks[i]) result.push([i, pucks[i]]);
  return result;
};
