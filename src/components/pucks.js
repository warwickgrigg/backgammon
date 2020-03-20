import React from "react";
export default ({ points }) =>
  points[0].map((_, point) =>
    ["puck", "puck dark"].map((puckClass, c) => {
      let count = points[c][c ? 25 - point : point];
      const gridArea = `p${point}`;
      if (count > 5) {
        var excess = `+${count - 5}`;
        //excess = "·";
        count = 5;
      }
      const stackClass = point > 12 ? "puck-stack near" : "puck-stack";

      return (
        count !== 0 && (
          <div className={stackClass} key={gridArea} style={{ gridArea }}>
            {Array.from(new Array(count), (_, k) => (
              <div key={k} className={puckClass}>
                {!k && excess}
              </div>
            ))}
          </div>
        )
      );
    })
  );
