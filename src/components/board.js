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
        validFirstMoves({ points, dice, player }).filter(i => i[0][0] === point)
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
    const el = e.target;
    let { left, top, bottom, right } = el.getBoundingClientRect();
    const { id } = el;
    const [t, i, j] = id.split("/");
    const { clientX: cx, clientY: cy } = e;
    let [bx1, by1, bx2, by2] = [left, top, bottom, right].map(v =>
      Math.floor(v)
    );
    jlog({ left, top, bottom, right, cx, cy });
    jlog([id, t, i, j, [cx - left, cy - top], [right - left, bottom - top]]);
    if (t === "p" || t === "c") pointClick(parseInt(i, 10));
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
