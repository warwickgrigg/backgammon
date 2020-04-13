import stats from "./stats";

const jlog = o => console.log(JSON.stringify(o));
const jlog2 = o => console.log(JSON.stringify(o, null, 2));

test("mover options, blocker on 22, two dice", () => {
  expect(stats([[2, 2], [4, 2]])).toEqual(
    //prettier-ignore
    {"count": 4, "mean": 3, "sd": 1, "squares": 40, "sum": 12, "variance": 1}
  );
});
