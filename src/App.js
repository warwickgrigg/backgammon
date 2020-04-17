import React from "react";
import "./styles.css";
import Pucks from "./components/pucks";
import Surface from "./components/surface";
import Dice from "./components/dice";
import Counter from "./components/counter";
import GlobalCounter from "./components/gcounter";
import { validMoves } from "./engine/moves";
import { StateProvider } from "./state";

const jlog = o => console.log(JSON.stringify(o));

export default function App() {
  const state = {
    counter: 0,
    dice: [1, 5],
    player: 0, // 0 for white, 1 for black
    // prettier-ignore
    points: [
      [ // white
        0, // on bar
        2, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 3,
        0, 1, 1, 0, 3, 0,    5, 0, 0, 0, 0, 0,
        0,  // off
      ], [ // black
        0, // on bar
        2, 0, 0, 0, 0, 0,    0, 0, 0, 0, 0, 5,
        0, 0, 0, 0, 3, 0,    3, 0, 0, 1, 1, 0,
        0,  // off
      ],
    ]
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "inc":
        return { ...state, counter: state.counter + action.value };
      default:
        return state;
    }
  };
  //jlog(validMoves(state));
  return (
    <StateProvider initialState={state} reducer={reducer}>
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
