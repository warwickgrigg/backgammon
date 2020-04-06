import { validMoves } from "./moves";

const jlog = o => console.log(JSON.stringify(o));
const jlog2 = o => console.log(JSON.stringify(o, null, 2));

const testState = {
  counter: 0,
  dice: [1, 5],
  player: 0, // 0 for white, 1 for black
  // prettier-ignore
  points: [
    [ // white
      0, // on bar
      2, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      13,  // off
    ], [ // black
      0, // on bar
      0, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,    1, 0, 0, 0, 0, 0,
      13,  // off
    ],
  ]
};
jlog({ validMoves: validMoves(testState) });

/*
test("xtest", () => {
  expect(validMoves(testState)).toEqual([2, 3]);
});
*/
