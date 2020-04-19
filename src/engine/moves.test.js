import { validMoves } from "./moves";
import toBoard from "./toBoard";

const jlog = o => console.log(JSON.stringify(o));
const jlog2 = o => console.log(JSON.stringify(o, null, 2));

//console.log({ toBoard: toBoard("1w") });

const arrayDiff = (a, b, path = []) => {
  if (!Array.isArray(a) || !Array.isArray(b)) return a !== b ? path : false;
  for (let i = 1; i < a.length; i++) {
    let r = arrayDiff(a[i], b[i], [...path, i]);
    if (r) return r;
  }
  return false;
};

const vMoves = ({ player = 0, board = "1w", dice = [1] }) => {
  const [before, points] = [toBoard(board), toBoard(board)];
  const r = validMoves({ player, points, dice });
  return [arrayDiff(before, points) || "unchanged", r];
};

test("die simple: 1w/1", () => {
  expect(vMoves({ board: "1w", dice: [1] })).toEqual([
    "unchanged",
    [[[1, 2, 0]]]
  ]);
});

test("die, blocked: 1w,2b2/1", () => {
  expect(vMoves({ board: "1w,2b2", dice: [1] })).toEqual(["unchanged", []]);
});

test("die, one off: 0w/1", () => {
  expect(vMoves({ board: "0w", dice: [1] })).toEqual([
    "unchanged",
    [[[0, 1, 0]]]
  ]);
});

test("die, lagger prevents bear off: 1w,24w/1", () => {
  expect(vMoves({ board: "1w,24w", dice: [1] })).toEqual([
    "unchanged",
    [[[1, 2, 0]]]
  ]);
});

test("die, exact bearing off: 24w/1", () => {
  expect(vMoves({ board: "24w", dice: [1] })).toEqual([
    "unchanged",
    [[[24, 25, 0]]]
  ]);
});

test("die, only lagger bears off:23w,24w/5", () => {
  expect(vMoves({ board: "23w,24w", dice: [5] })).toEqual([
    "unchanged",
    [[[23, 25, 0]]]
  ]);
});

test("die, exact bear off, plus alternative move: 23w,24w/1", () => {
  expect(vMoves({ board: "23w,24w", dice: [1] })).toEqual([
    "unchanged",
    [[[23, 24, 0]], [[24, 25, 0]]]
  ]);
});

test("dice diff, points 1 x 4, no takers: 1w4/1,5", () => {
  expect(vMoves({ board: "1w4", dice: [1, 5] })).toEqual([
    "unchanged",
    [[[1, 2, 0], [1, 6, 0]], [[1, 2, 0], [2, 7, 0]]]
  ]);
});

test("dice diff, points 1 x 4, one taker: 1w4,6b/1,5", () => {
  expect(vMoves({ board: "1w4,6b", dice: [1, 5] })).toEqual([
    "unchanged",
    [[[1, 2, 0], [1, 6, 1]], [[1, 2, 0], [2, 7, 0]], [[1, 6, 1], [6, 7, 0]]]
  ]);
});

test("dice diff, points 1 x 4, two takers: 1w4,2b,6b/1,5", () => {
  expect(vMoves({ board: "1w4,2b,6b", dice: [1, 5] })).toEqual([
    "unchanged",
    [[[1, 2, 1], [1, 6, 1]], [[1, 2, 1], [2, 7, 0]], [[1, 6, 1], [6, 7, 0]]]
  ]);
});

test("dice diff, points onBar x 1: 0w1,1w3,6b/1,5", () => {
  expect(vMoves({ board: "0w1,1w3,6b", dice: [1, 5] })).toEqual([
    "unchanged",
    [[[0, 1, 0], [1, 6, 1]], [[0, 5, 0], [1, 2, 0]]]
  ]);
});

test("dice diff, points onBar x 2: 0w2,5b1/1,5", () => {
  expect(vMoves({ board: "0w2,5b1", dice: [1, 5] })).toEqual([
    "unchanged",
    [[[0, 1, 0], [0, 5, 1]]]
  ]);
});

test("dice diff, points onBar x 2, Blocked x 1: 0w2,5b2/1,5", () => {
  expect(vMoves({ board: "0w2,5b2", dice: [1, 5] })).toEqual([
    "unchanged",
    [[[0, 1, 0]]]
  ]);
});

test("dice double, points 1 x 4: 1w4,6b/5/5", () => {
  expect(vMoves({ board: "1w4,6b", dice: [5, 5] })).toEqual([
    "unchanged",
    [
      [[1, 6, 1], [1, 6, 0], [1, 6, 0], [1, 6, 0]],
      [[1, 6, 1], [1, 6, 0], [1, 6, 0], [6, 11, 0]],
      [[1, 6, 1], [1, 6, 0], [6, 11, 0], [6, 11, 0]],
      [[1, 6, 1], [1, 6, 0], [6, 11, 0], [11, 16, 0]],
      [[1, 6, 1], [6, 11, 0], [11, 16, 0], [16, 21, 0]]
    ]
  ]);
});

test("dice diff, points allHome:20w2,23w,24w/1,5", () => {
  expect(vMoves({ board: "20w2,23w,24w", dice: [1, 5] })).toEqual([
    "unchanged",
    [
      [[20, 21, 0], [20, 25, 0]],
      [[20, 25, 0], [23, 24, 0]],
      [[20, 25, 0], [24, 25, 0]]
    ]
  ]);
});

test("dice diff, points startBearOff: 18w,20w,23w,24w/1,5", () => {
  expect(vMoves({ board: "18w,20w,23w,24w", dice: [1, 5] })).toEqual([
    "unchanged",
    [
      [[18, 19, 0], [20, 25, 0]],
      [[18, 19, 0], [19, 24, 0]],
      [[18, 23, 0], [20, 21, 0]],
      [[18, 23, 0], [24, 25, 0]]
    ]
  ]);
});
/*
test("all done: /1,5", () => {
  expect(vMoves({board: "", dice: [1, 5] })).toEqual(
    [[]]
  );
});
*/

//jlog(validMoves({ player: 0, points: toBoard(""), dice: [1] }));
//jlog(toBoard(""));
