import React, { useReducer } from "react";
import "./styles.css";
import Pucks from "./components/pucks";
import Surface from "./components/surface";
import toBoard from "./engine/toBoard";

const jlog = o => {
  console.log(JSON.stringify(o));
  return o;
};

const txt2State = s => {
  let state = toBoard(s);
  state.stacks = state.points.map((a, col) =>
    a.map((c, p) =>
      Array.from(new Array(c), (_, i) => (col + 1) * 1000 + p * 10 + i)
    )
  );
  delete state.points;
  return state;
};

let boardStart;
boardStart = txt2State("1w2,6b5,8b3,12w5,13b5,17w3,19w5,24b2/w/5,5");
boardStart = txt2State("1w2,6b5,8b3,12w5,13b5,17w6,19w2,24b2/w/5,5");
//boardStart = txt2State("1w2,2b,6b4,8b3,12w5,13b5,17w3,19w5,24b2/w/1,5");
//boardStart = txt2State("20w,23w,24w/w/1,5");
//
jlog({ boardStart });

const init = {
  // dice: [1, 5],
  // player: 0, // 0 for white, 1 for black
  // stacks: [[],[]],
  ...boardStart
  //player: 0
};

const reducer = (state, update) => ({
  ...state,
  ...jlog(typeof update === "function" ? update(state) : update)
});

export default function App() {
  const [state, dispatch] = useReducer(reducer, init);
  let pucksProps = { ...state, dispatch };
  return (
    <div className="App">
      <div key="head">
        <h1>Backgammon - a work in progress</h1>
      </div>
      {/*<Board {...state} dispatch={dispatch} />*/}
      <div className="board" key="board">
        <Surface />
        <Pucks {...pucksProps} />
      </div>
    </div>
  );
}
/*
const boardClick = e => {
  const el = e.target;
  let { left, top, bottom, right } = el.getBoundingClientRect();
  const { id } = el;
  const [t, i, j] = id.split("/");
  const { clientX: cx, clientY: cy } = e;
  let [bx1, by1, bx2, by2] = [left, top, bottom, right].map(v =>
    Math.floor(v)
  );
  //jlog({ left, top, bottom, right, cx, cy });
  jlog([id, t, i, j, [cx - bx1, cy - by1], [bx2 - bx1, by2 - by1]]);
  //if (t === "p" || t === "c") pointClick(parseInt(i, 10));
};
*/
