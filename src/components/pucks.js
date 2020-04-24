import React, { useState } from "react";
//import { useStateValue } from "../state";
import { validFirstMoves } from "../engine/moves";
const jlog = o => console.log(JSON.stringify(o));

export default ({ points, player, dice, dispatch }) => {
  const [selectedPoint, selectPoint] = useState(-1);
  //const [_, dispatch] = useStateValue();
  const fm = validFirstMoves({ points, dice, player });
  jlog({ selectedPoint });

  const isPossibleFrom = p => {
    for (let i = 0; i < fm.length; i++) if (p === fm[i][0][0]) return true;
    return false;
  };

  const isPossibleTo = p => {
    for (let i = 0; i < fm.length; i++)
      if (p === fm[i][0][1] && selectedPoint === fm[i][0][0]) return true;
    return false;
  };

  const puckClick = p => {
    jlog({ selectedPoint, p });
    if (p === selectedPoint) {
      selectPoint(-1);
    } else if (selectedPoint === -1 && isPossibleFrom(p)) {
      selectPoint(p);
    }
  };
  jlog({ info: "rendering", points, player, dice });

  return points.map((stacks, c) =>
    stacks.map((count, point) => {
      let topClassSuffix;
      const p = c ? 25 - point : point;
      if (isPossibleTo(p) && !points[1 - c][25 - point]) {
        count += 1;
        topClassSuffix = " possible-to";
      } else
        topClassSuffix =
          p === selectedPoint
            ? " selected"
            : selectedPoint === -1 && isPossibleFrom(p)
            ? " possible-from"
            : "";
      if (count > 5) {
        var excess = `+${count - 5}`;
        count = 5;
      }

      const gridArea = `p${p}`;
      const stackClass = p > 12 ? "puck-stack near" : "puck-stack";
      const puckClass = ["puck", "puck dark"][c];
      //jlog({ p, selectedPoint, topClassSuffix });
      return (
        <div className={stackClass} key={gridArea} style={{ gridArea }}>
          {Array.from(new Array(count), (_, k) => (
            <div
              onClick={() => puckClick(p)}
              key={k}
              id={`p/${p}/${k}`}
              className={puckClass + (k === count - 1 ? topClassSuffix : "")}
            >
              {!k && excess}
            </div>
          ))}
        </div>
      );
    })
  );
};
