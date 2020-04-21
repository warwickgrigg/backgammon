import React, { useState } from "react";
import { useStateValue } from "../state";
import Pucks from "./pucks";
import Surface from "./surface";
import Dice from "./dice";
import { validMoves, validFirstMoves } from "../engine/moves";

const jlog = o => console.log(JSON.stringify(o));
//
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

export default () => {
  const [{ points, dice, player }, dispatch] = useStateValue();
  const [selectedPoint, selectPoint] = useState(-1);
  const pointClick = point => {
    jlog({ selectedPoint, point });
    if (selectedPoint === -1 && points[player][point]) {
      jlog(validMoves({ points, dice, player, from: point }));
      jlog(
        validFirstMoves({ points, dice, player }).filter(
          i => i[0][0] === selectedPoint
        )
      );
      selectPoint(point);
    } else if (point === selectedPoint) {
      selectPoint(-1);
    } else if (points[1][25 - point] < 1) {
      dispatch({
        type: "inc",
        value: 1
      });
    }
  };
  const boardClick = e => {
    //e.stopPropagation();
    //e.preventDefault();
    let { left, top, bottom, right } = e.target.getBoundingClientRect();
    const { id } = e.target;
    const [el, i, j] = id.split("/");
    const { clientX, clientY } = e;
    [left, top, bottom, right] = [left, top, bottom, right].map(v =>
      Math.floor(v)
    );
    jlog({ left, top, bottom, right, clientX, clientY });
    jlog([
      id,
      el,
      i,
      [clientX - left, clientY - top],
      [right - left, bottom - top]
    ]);
    if (el === "p" || el === "c") pointClick(parseInt(i, 10));
  };
  let pucksProps = { points, player, selectedPoint };

  return (
    <div className="board" key="board" onClick={e => boardClick(e)}>
      <Surface />
      <Pucks {...pucksProps} />
      <Dice values={dice} />
    </div>
  );
};
