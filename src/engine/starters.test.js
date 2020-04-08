import starters from "./starters";

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

test("starters, 21 blocked by 22", () => {
  expect(starters(1, points.case1)).toEqual([0, 19, 20, 22, 23, 24]);
});
