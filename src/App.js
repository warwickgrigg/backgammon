import React from "react";
import "./styles.css";
import Pucks from "./components/pucks";
import Surface from "./components/surface";
import Dice from "./components/dice";
import Counter from "./components/counter";
import GlobalCounter from "./components/gcounter";
import { StateProvider } from "./state";

const jlog = o => console.log(JSON.stringify(o, null, 2));

const state = {
  dice: [1, 2],
  player: 0, // 0 for white, 1 fpr black
  // prettier-ignore
  points: [
    [ // white
      0, // on bar
      2, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 5,
      0, 0, 0, 0, 3, 0,    6, 0, 0, 0, 0, 0,
      0,  // off
    ], [ // black
      0, // on bar
      2, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 5,
      0, 0, 0, 0, 3, 0,    5, 0, 0, 0, 0, 0,
      0,  // off
    ],
  ]
};

const pips = (p, points) => points[p].reduce((a, c, i) => a + (25 - i) * c, 0);
console.log({ wpips: pips(0, state.points), bpips: pips(1, state.points) });

const validMoves = ({ dice, player, points }) => {
  const moves = (pos, dice, me, opp) => {
    const simpleMoves = (pos, dice, me, opp) => {
      const result = [];
      for (var i = 0, taken = []; i < dice.length; i++) {
        pos += dice[i];
        if (pos > 24 || opp[pos] > 1) return result;
        if (opp[pos] > 1) taken.push(pos);
        result.push([pos, taken]);
        if (me[pos]) return result;
      }
      return result;
    };
    const r1 = simpleMoves(pos, dice, me, opp);
    if (dice.length === 4) {
      return r1;
    } else {
      const r2 = simpleMoves(pos, [dice[1], dice[0]], me, opp);
      if (
        r1.length === 2 &&
        r2.length === 2 &&
        !opp[r1[0][0]] &&
        !opp[r2[0][0]]
      ) {
        return [r1[0], r2[0], r1[1]]; // eg. if both 3,4 and 4,3 equivalent
      }
      return r1.concat(r2); // no equivalences to eliminate
    }
  };

  const xDice = ([d1, d2]) => (d1 === d2 ? [d1, d1, d1, d1] : [d1, d2]);

  const myPoints = ({ player, points }) =>
    player === 0
      ? [[...points[0]], [...points[1]].reverse()]
      : [[...points[1]].reverse(), [...points[0]]];

  const [me, opp] = myPoints({ player, points });

  for (var i = 0, result = []; i < me.length; i++) {
    if (me[i]) {
      const m = moves(i, xDice(dice), me, opp);
      if (m.length) result.push([i, m]);
    }
  }
  return result;
};

console.log(JSON.stringify(validMoves(state), null, 2));

const treePath = [];
const applyMove = (from, to, me, opp) => {
  me[from]--;
  me[to]++;
  treePath.push([from, to, opp[to]]);
  opp[to] = 0;
};

const undoMove = (me, opp) => {
  const [from, to, taken] = treePath.pop();
  me[from]++;
  me[to]--;
  opp[to] = taken;
};

export default function App() {
  const initialState = { counter: 0 };
  const reducer = (state, action) => {
    switch (action.type) {
      case "inc":
        return { ...state, counter: state.counter + action.value };
      default:
        return state;
    }
  };
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className="App">
        <div key="head">
          <h1>Backgammon - a work in progress</h1>
        </div>
        <div className="board" key="board">
          <Surface />
          <Pucks points={state.points} />
          <Dice values={state.dice} />
        </div>
        <Counter />
        <GlobalCounter />
        <GlobalCounter />
      </div>
    </StateProvider>
  );
}
