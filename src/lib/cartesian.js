const cartesian = (fn, len = []) => {
  const n = len.length;
  let result = new Array(n).fill(0);
  for (let b = 0, carry = 0; b < 1000 && !carry; b++) {
    fn(result.slice(0));
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
};

const cartesianArrays = (fn, arrays = []) =>
  cartesian(c => fn(c.map((e, i) => arrays[i][e])), arrays.map(a => a.length));

//cartesian(jlog, [2, 3]); // lengths of 2 and 3
//cartesianArrays(jlog, [["A", "B"], [0, 1]]);
//cartesianArrays(jlog, [["A", "B", "C"], [0, 1], ["x", "y", "z"]]);

export { cartesian, cartesianArrays };
