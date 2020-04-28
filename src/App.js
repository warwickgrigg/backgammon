import React, { useReducer } from "react";
import "./styles.css";
//import { StateProvider } from "./state";
import Counter from "./components/counter";
//import GlobalCounter from "./components/gcounter";
import Board from "./components/board";
import toBoard from "./engine/toBoard";
//import { validMoves } from "./engine/moves";

const jlog = o => (console.log(JSON.stringify(o)), o);

const txt2State = s => {
  const state = toBoard(s);
  state.points = state.points.map((a, col) =>
    a.map((c, p) =>
      Array.from(new Array(c), (_, i) => (col + 1) * 1000 + p * 10 + i)
    )
  );
  return state;
};

let boardStart;
boardStart = txt2State("1w2,6b5,8b3,12w5,13b5,17w3,19w5,24b2/w/1,5");
//boardStart = txt2State("1w2,2b,6b4,8b3,12w5,13b5,17w3,19w5,24b2/w/1,5");
//boardStart = txt2State("20w,23w,24w/w/1,5");
//
jlog({ boardStart });

const init = {
  counter: 0,
  // dice: [1, 5],
  // player: 0, // 0 for white, 1 for black
  // points: [[],[]],
  ...boardStart
  //player: 0
};

const reducer = (state, update) => ({
  ...state,
  ...jlog(typeof update === "function" ? update(state) : update)
});

export default function App() {
  const [state, dispatch] = useReducer(reducer, init);
  return (
    //<StateProvider initialState={state} reducer={reducer}>

    <div className="App">
      <div key="head">
        <h1>Backgammon - a work in progress</h1>
      </div>
      <Board {...state} dispatch={dispatch} />
    </div>
    //<Counter />
    //<GlobalCounter />
    //<GlobalCounter />
    //</StateProvider>
  );
}
