import { cartesian, cartesianArrays } from "./cartesian";

const jlog = o => console.log(JSON.stringify(o));
let stack = (a = []) => ({
  push: v => {
    a.push(v);
    return a;
  },
  pop: () => a.pop()
});

//jlog(cartesian(stack().push)([2, 3]));
//jlog(cartesianArrays(stack().push)([["A", "B", "C"], [0, 1], ["x", "y", "z"]]));

test("cartesian lengths of 2 and 3", () => {
  expect(cartesian(stack().push)([2, 3])).toEqual([
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
    [0, 2],
    [1, 2]
  ]);
});

test("Three cartesian arrays", () => {
  expect(
    cartesianArrays(stack().push)([["A", "B", "C"], [0, 1], ["x", "y", "z"]])
  ).toEqual([
    ["A", 0, "x"],
    ["B", 0, "x"],
    ["C", 0, "x"],
    ["A", 1, "x"],
    ["B", 1, "x"],
    ["C", 1, "x"],
    ["A", 0, "y"],
    ["B", 0, "y"],
    ["C", 0, "y"],
    ["A", 1, "y"],
    ["B", 1, "y"],
    ["C", 1, "y"],
    ["A", 0, "z"],
    ["B", 0, "z"],
    ["C", 0, "z"],
    ["A", 1, "z"],
    ["B", 1, "z"],
    ["C", 1, "z"]
  ]);
});
