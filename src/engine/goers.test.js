import goers from "./goers";
import toBoard from "./toBoard";

const jlog = o => console.log(JSON.stringify(o));
const jlog2 = o => console.log(JSON.stringify(o, null, 2));

// prettier-ignore
const points = {
  case1: toBoard("0w,2b,19w,20w,21w,22w,22b2,23w,24w,25b2")
};

test("mover options, blocker on 22, two dice", () => {
  expect(goers(points.case1, [1, 2])).toEqual(
    //prettier-ignore
    [
      {
        hot: [
          true,
          true, true, true, true, true, true,
          true, true, true, true, true, true,
          true, true, true, true, true, true,
          true, true, false, true, true, true,
          false
        ],
        goers: [0, 19, 20, 22, 23, 24]
      },
      {
        hot: [
          true,
          true, true, true, true, true, true,
          true, true, true, true, true, true,
          true, true, true, true, true, true,
          true, false, true, true, true, true,
          false
        ],
        goers: [0, 19, 21, 22, 23, 24]
      }
    ]
  );
});

test("mover options, blocker on 22, one dice", () => {
  expect(goers(points.case1, [2])).toEqual(
    //prettier-ignore
    [
      {
        hot: [
          true,
          true, true, true, true, true, true,
          true, true, true, true, true, true,
          true, true, true, true, true, true,
          true, false, true, true, true, true,
          false
        ],
        goers: [0, 19, 21, 22, 23, 24]
      }
    ]
  );
});

test("mover options, blocker on 22, double", () => {
  expect(goers(points.case1, [1, 1, 1, 1])).toEqual(
    //prettier-ignore
    [
    {
      hot: [
        true,
        true, true, true, true, true, true,
        true, true, true, true, true, true,
        true, true, true, true, true, true,
        true, true, false, true, true, true,
        false
      ],
      goers: [0, 19, 20, 22, 23, 24]
    },
    {
      hot: [
        true,
        true, true, true, true, true, true,
        true, true, true, true, true, true,
        true, true, true, true, true, true,
        true, true, false, true, true, true,
        false
      ],
      goers: [0, 19, 20, 22, 23, 24]
    },
    {
      hot: [
        true,
        true, true, true, true, true, true,
        true, true, true, true, true, true,
        true, true, true, true, true, true,
        true, true, false, true, true, true,
        false
      ],
      goers: [0, 19, 20, 22, 23, 24]
    },
    {
      hot: [
        true,
        true, true, true, true, true, true,
        true, true, true, true, true, true,
        true, true, true, true, true, true,
        true, true, false, true, true, true,
        false
      ],
      goers: [0, 19, 20, 22, 23, 24]
    },
  ]
  );
});
