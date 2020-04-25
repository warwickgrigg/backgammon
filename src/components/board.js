import React from "react";
//import React, { useState } from "react";
//import { useStateValue } from "../state";
import Pucks from "./pucks";
import Surface from "./surface";
import Dice from "./dice";

const jlog = o => console.log(JSON.stringify(o));

export default ({ points, dice, player, dispatch }) => {
  //const [selectedPoint, selectPoint] = useState(-1);
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
  let pucksProps = { points, dice, player, dispatch };
  //
  return (
    <div className="board" key="board">
      <Surface />
      <Pucks {...pucksProps} />
      <Dice values={dice} />
    </div>
  );
};
