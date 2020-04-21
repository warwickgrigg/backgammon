import React, { useState } from "react";
import { useStateValue } from "../state";
import Pucks from "./pucks";
import Surface from "./surface";
import Dice from "./dice";

const jlog = o => console.log(JSON.stringify(o));

/*
export default () => {
  const [{ counter }, dispatch] = useStateValue(); //[{ counter: 1 }, () => 0]; //
  return (
    <button
      onClick={() =>
        dispatch({
          type: "inc",
          value: 1
        })
      }
    >
      {counter}
    </button>
  );
};
*/

const boardClick = e => {
  //e.stopPropagation();
  //e.preventDefault();
  let { left, top, bottom, right } = e.target.getBoundingClientRect();
  const { classList, id } = e.target;
  const { clientX, clientY } = e;
  [left, top, bottom, right] = [left, top, bottom, right].map(v =>
    Math.floor(v)
  );
  jlog({ left, top, bottom, right, clientX, clientY });
  jlog([id, [clientX - left, clientY - top], [right - left, bottom - top]]);
};

export default () => {
  const [{ points, dice, player }, dispatch] = useStateValue();
  const [selectedPoint, selectPoint] = useState(-1);
  const pointClick = point => {
    if (selectedPoint === -1) {
      selectPoint(point);
    } else if (point === selectedPoint) {
      selectPoint(-1);
    } else if (opp[25 - point] < 1) {
      dispatch({
        type: "inc",
        value: 1
      });
    }
  };

  return (
    <div className="board" key="board" onClick={e => boardClick(e)}>
      <Surface />
      <Pucks points={points} player={player} />
      <Dice values={dice} />
    </div>
  );
};
