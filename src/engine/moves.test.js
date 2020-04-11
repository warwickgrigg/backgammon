import { validMoves } from "./moves";

const jlog = o => console.log(JSON.stringify(o));
const jlog2 = o => console.log(JSON.stringify(o, null, 2));

const testState = {
  counter: 0,
  dice: [1, 5],
  player: 0, // 0 for white, 1 for black
  points: [[], []] // white's, black's
};

// prettier-ignore
const points = {
  p1x4: [
    [ // white
      0, // on bar
      4, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      11,  // off
    ], [ // black
      0, // on bar
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,    1, 0, 0, 0, 0, 0,
      13,  // off
    ],
  ],
  blocking: [
    [ // white
      0, // on bar
      1, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      15,  // off
    ], [ // black
      0, // on bar
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,    2, 0, 0, 0, 0, 0,
      13,  // off
    ],
  ],
  onBarx1: [
    [ // white
      1, // on bar
      3, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      11,  // off
    ], [ // black
      0, // on bar
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,    1, 0, 0, 0, 0, 0,
      13,  // off
    ],
  ],
  onBarx2: [
    [ // white
      2, // on bar
      3, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      11,  // off
    ], [ // black
      0, // on bar
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,    0, 1, 0, 0, 0, 0,
      13,  // off
    ],
  ],
  onBarx2Blockedx1: [
    [ // white
      2, // on bar
      3, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      11,  // off
    ], [ // black
      0, // on bar
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,    0, 2, 0, 0, 0, 0,
      13,  // off
    ],
  ],
  allHome: [
    [ // white
      0, // on bar
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,    0, 2, 0, 0, 1, 1,
      11,  // off
    ], [ // black
      0, // on bar
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,    1, 0, 0, 0, 0, 0,
      13,  // off
    ],
  ],
  startBearOff: [
    [ // white
      0, // on bar
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1,    0, 1, 0, 0, 1, 1,
      11,  // off
    ], [ // black
      0, // on bar
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,    1, 0, 0, 0, 0, 0,
      13,  // off
    ],
  ],
};
//jlog({ validMoves: validMoves(testState) });
const dice = {
  diff: [1, 5],
  double: [5, 5]
};

test("points 1 x 4, dice diff", () => {
  expect(
    validMoves({ ...testState, points: points.p1x4, dice: dice.diff })
  ).toEqual([
    [[1, 2, 0], [1, 6, 1]],
    [[1, 2, 0], [2, 7, 0]],
    [[1, 6, 1], [6, 7, 0]]
  ]);
});

test("points onBar x 1, dice diff", () => {
  expect(
    validMoves({ ...testState, points: points.onBarx1, dice: dice.diff })
  ).toEqual([[[0, 1, 0], [1, 6, 1]], [[0, 5, 0], [1, 2, 0]]]);
});
/*
test("points onBar x 2, dice diff", () => {
  expect(
    validMoves({
      ...testState,
      points: points.onBarx2,
      dice: dice.diff
    })
  ).toEqual([[[0, 1, 0], [0, 5, 1]]]);
});

test("points onBar x 2, Blocked x 1, dice diff", () => {
  expect(
    validMoves({
      ...testState,
      points: points.onBarx2Blockedx1,
      dice: dice.diff
    })
  ).toEqual([[[0, 1, 0]]]);
});

test("points 1 x 4, dice double", () => {
  expect(
    validMoves({ ...testState, points: points.p1x4, dice: dice.double })
  ).toEqual([
    [[1, 6, 1], [1, 6, 0], [1, 6, 0], [1, 6, 0]],
    [[1, 6, 1], [1, 6, 0], [1, 6, 0], [6, 11, 0]],
    [[1, 6, 1], [1, 6, 0], [6, 11, 0], [6, 11, 0]],
    [[1, 6, 1], [1, 6, 0], [6, 11, 0], [11, 16, 0]],
    [[1, 6, 1], [6, 11, 0], [11, 16, 0], [16, 21, 0]]
  ]);
});

test("points allHome, dice diff", () => {
  expect(
    validMoves({ ...testState, points: points.allHome, dice: dice.diff })
  ).toEqual([
    [[20, 21, 0], [20, 25, 0]],
    [[20, 25, 0], [23, 24, 0]],
    [[20, 25, 0], [24, 25, 0]]
  ]);
});

test("points startBearOff, dice diff", () => {
  expect(
    validMoves({ ...testState, points: points.startBearOff, dice: dice.diff })
  ).toEqual([
    [[18, 19, 0], [19, 24, 0]],
    [[18, 19, 0], [20, 25, 0]],
    [[18, 23, 0], [20, 21, 0]],
    [[18, 23, 0], [24, 25, 0]],
    [[20, 25, 0], [23, 24, 0]],
    [[20, 25, 0], [24, 25, 0]]
  ]);
});
jlog(validMoves({ ...testState, dice: dice.double }));
*/
