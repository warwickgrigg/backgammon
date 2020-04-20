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
  jlog({ id, left, top, bottom, right, clientX, clientY });
  jlog([[clientX - left, clientY - top], [right - left, bottom - top]]);
};

export default () => {
  const [{ points, dice, player }, dispatch] = useStateValue();
  return (
    <div className="board" key="board" onClick={e => boardClick(e)}>
      <Surface />
      <Pucks points={points} player={player} />
      <Dice values={dice} />
    </div>
  );
};
