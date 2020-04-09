import movers from "./movers";

// prettier-ignore
const points = {
  case1: [
    [ // white
      1, // on bar
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,    1, 1, 1, 1, 1, 1,
      9,  // off
    ], [ // black
      2, // on bar
      0, 0, 2, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      11,  // off
    ],
  ],
};

test("mover options, blocker on 22, two dice", () => {
  expect(movers(points.case1, [1, 2])).toEqual([
    [[0, 19, 20, 22, 23], [24]],
    [[0, 19, 21, 22], [23, 24]]
  ]);
});

test("mover options, blocker on 22, one dice", () => {
  expect(movers(points.case1, [2])).toEqual([[[0, 19, 21, 22], [23, 24]]]);
});

/*
test("mover options, blocker on 22, double", () => {
  expect(movers(points.case1, [1, 1, 1, 1])).toEqual([
    [[[0, 19, 20, 22, 23], [24]]],
    //prettier-ignore
    [
      [[0, 19, 20, 22, 23], [24]], 
      [[0, 19, 20, 22, 23], [24]]
    ],
    [
      [[0, 19, 20, 22, 23], [24]],
      [[0, 19, 20, 22, 23], [24]],
      [[0, 19, 20, 22, 23], [24]]
    ],
    [
      [[0, 19, 20, 22, 23], [24]],
      [[0, 19, 20, 22, 23], [24]],
      [[0, 19, 20, 22, 23], [24]],
      [[0, 19, 20, 22, 23], [24]]
    ]
  ]);
});
*/
