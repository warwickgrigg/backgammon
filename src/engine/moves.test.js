import { validMoves } from "./moves";
import toBoard from "./toBoard";

const jlog = o => console.log(JSON.stringify(o));
const jlog2 = o => console.log(JSON.stringify(o, null, 2));

//console.log({ toBoard: toBoard("1w") });
test("die simple", () => {
  expect(validMoves({ player: 0, points: toBoard("1w"), dice: [1] })).toEqual([
    [[1, 2, 0]]
  ]);
});

test("die, blocked", () => {
  expect(
    validMoves({ player: 0, points: toBoard("1w,2b2"), dice: [1] })
  ).toEqual([]);
});

test("die, one off", () => {
  expect(validMoves({ player: 0, points: toBoard("0w"), dice: [1] })).toEqual([
    [[0, 1, 0]]
  ]);
});

test("die, lagger prevents bear off", () => {
  expect(
    validMoves({ player: 0, points: toBoard("1w,24w"), dice: [1] })
  ).toEqual([[[1, 2, 0]]]);
});

test("die, exact bearing off", () => {
  expect(validMoves({ player: 0, points: toBoard("24w"), dice: [1] })).toEqual([
    [[24, 25, 0]]
  ]);
});

test("die, only lagger bears off", () => {
  expect(
    validMoves({ player: 0, points: toBoard("23w,24w"), dice: [5] })
  ).toEqual([[[23, 25, 0]]]);
});

test("die, exact bear off, plus alternative move", () => {
  expect(
    validMoves({ player: 0, points: toBoard("23w,24w"), dice: [1] })
  ).toEqual([[[23, 24, 0]], [[24, 25, 0]]]);
});

test("dice diff, points 1 x 4", () => {
  expect(
    validMoves({ player: 0, points: toBoard("1w4,6b"), dice: [1, 5] })
  ).toEqual([
    [[1, 2, 0], [1, 6, 1]],
    [[1, 2, 0], [2, 7, 0]],
    [[1, 6, 1], [6, 7, 0]]
  ]);
});

test("dice diff, points onBar x 1", () => {
  expect(
    validMoves({ player: 0, points: toBoard("0w1,1w3,6b"), dice: [1, 5] })
  ).toEqual([[[0, 1, 0], [1, 6, 1]], [[0, 5, 0], [1, 2, 0]]]);
});

test("dice diff, points onBar x 2", () => {
  expect(
    validMoves({ player: 0, points: toBoard("0w2,5b1"), dice: [1, 5] })
  ).toEqual([[[0, 1, 0], [0, 5, 1]]]);
});

test("dice diff, points onBar x 2, Blocked x 1", () => {
  expect(
    validMoves({
      player: 0,
      points: toBoard("0w2,5b2"),
      dice: [1, 5]
    })
  ).toEqual([[[0, 1, 0]]]);
});

test("dice double, points 1 x 4", () => {
  expect(
    validMoves({ player: 0, points: toBoard("1w4,6b"), dice: [5, 5] })
  ).toEqual([
    [[1, 6, 1], [1, 6, 0], [1, 6, 0], [1, 6, 0]],
    [[1, 6, 1], [1, 6, 0], [1, 6, 0], [6, 11, 0]],
    [[1, 6, 1], [1, 6, 0], [6, 11, 0], [6, 11, 0]],
    [[1, 6, 1], [1, 6, 0], [6, 11, 0], [11, 16, 0]],
    [[1, 6, 1], [6, 11, 0], [11, 16, 0], [16, 21, 0]]
  ]);
});

test("dice diff, points allHome", () => {
  expect(
    validMoves({ player: 0, points: toBoard("20w2,23w,24w"), dice: [1, 5] })
  ).toEqual([
    [[20, 21, 0], [20, 25, 0]],
    [[20, 25, 0], [23, 24, 0]],
    [[20, 25, 0], [24, 25, 0]]
  ]);
});

test("dice diff, points startBearOff", () => {
  expect(
    validMoves({ player: 0, points: toBoard("18w,20w,23w,24w"), dice: [1, 5] })
  ).toEqual([
    [[18, 19, 0], [20, 25, 0]],
    [[18, 19, 0], [19, 24, 0]],
    [[18, 23, 0], [20, 21, 0]],
    [[18, 23, 0], [24, 25, 0]]
  ]);
});
