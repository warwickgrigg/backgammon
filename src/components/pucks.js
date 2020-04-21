import React, { useState } from "react";

export default ({ points, player, selectedPoint }) => {
  return points.map((stacks, c) =>
    stacks.map((count, point) => {
      if (!count) return undefined;
      if (count > 5) {
        var excess = `+${count - 5}`;
        count = 5;
      }
      if (c) point = 25 - point;
      const gridArea = `p${point}`;
      const stackClass = point > 12 ? "puck-stack near" : "puck-stack";
      const puckClass = ["puck", "puck dark"][c];
      const topClassSuffix = point === selectedPoint ? " selected" : "";
      return (
        <div
          onClick={() => 0 /*pointClick(point)*/}
          className={stackClass}
          key={gridArea}
          style={{ gridArea }}
        >
          {Array.from(new Array(count), (_, k) => (
            <div
              key={k}
              id={`p/${point}/${k}`}
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
