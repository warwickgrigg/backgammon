const cartesian = fn => (len = []) => {
  const n = len.length;
  let result = new Array(n).fill(0);
  let final;
  for (let b = 0, carry = 0; b < 1000 && !carry; b++) {
    final = fn(result.slice(0));
    carry = 1;
    for (let i = 0; i < n && carry; i++) {
      result[i] += carry;
      if (result[i] >= len[i]) {
        result[i] = 0;
      } else {
        carry = 0;
      }
    }
  }
  return final;
};

const cartesianArrays = fn => (arrays = []) =>
  cartesian(c => fn(c.map((e, i) => arrays[i][e])))(arrays.map(a => a.length));

export { cartesian, cartesianArrays };
