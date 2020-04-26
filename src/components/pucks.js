import React, { useState } from "react";
//import { useStateValue } from "../state";
import { validFirstMoves, moveOps } from "../engine/moves";
const jlog = o => console.log(JSON.stringify(o));

const coords = [];

export default ({ points, player, dice, dispatch }) => {
  //const { doMove, undoMove, trailer } = moveOps([me, opp]);
  const [from, setFrom] = useState(-1);
  const [state, setState] = useState({ moves: [] });
  const upState = slice => setState({ ...state, ...slice });
  const fm = validFirstMoves({ points, dice, player });

  const isPossibleFrom = from => {
    for (let i = 0; i < fm.length; i++) if (from === fm[i][0][0]) return true;
    return false;
  };

  const isPossibleTo = (from, to) => {
    for (let i = 0; i < fm.length; i++)
      if (to === fm[i][0][1] && from === fm[i][0][0]) return true;
    return false;
  };

  const makeMove = move => state => {
    const points = [state.points[0].slice(), state.points[1].slice()];
    moveOps(points).doMove(move);
    return { points };
  };

  const unmakeMove = move => state => {
    const points = [state.points[0].slice(), state.points[1].slice()];
    moveOps(points).undoMove(move);
    return { points };
  };

  const puckClick = p => {
    if (p === from) {
      setFrom(-1);
    } else if (from === -1 && isPossibleFrom(p)) {
      setFrom(p);
    } else if (isPossibleTo(from, p)) {
      const to = p;
      const taken = fm.find(m => m[0][0] === from && m[0][1] === to)[0][2];
      upState({ moves: state.moves.concat({ from, to, taken }) });
      dispatch(makeMove({ from, to, taken }));
      setFrom(-1);
    }
  };

  const undoClick = () => {
    const { moves } = state;
    const move = moves.pop();
    upState({ moves });
    dispatch(unmakeMove(move));
  };

  const xy = (p, c) => {
    const puckDiameter = 24;
    const pointWidth = (puckDiameter * 15) / 12;
    const barWidth = (puckDiameter * 15) / 12;
    const boardBorder = (puckDiameter * 4) / 12;
    const slatwidth = boardBorder;
    // --dice-size: calc(var(--puck-diameter) * 12 / 12);
    const pointHeight = (puckDiameter * 57) / 12;
    const pointGap = (puckDiameter * 16) / 12;
    const offWidth = pointWidth;
    const columnHeight = pointHeight * 2 + pointGap;
    const barHeight = columnHeight;
    //const boardHeight = barHeight + 2 * boardBorder;
    //const boardWidth = pointWidth * 12 + barWidth + boardBorder * 3 + offWidth;
    // max / originPoints / excessmultiplier / points / bars / offs
    const [pW, bW, bH] = [pointWidth, barWidth, barHeight];
    const d = puckDiameter;
    const r = d / 2;
    if (p <= 0) return [6 * pW + 0.5 * bW - r, c * d];
    if (p <= 6) return [(12.5 - p) * pW + bW - r, c * d];
    if (p <= 12) return [(12.5 - p) * pW - r, c * d];
    if (p <= 18) return [(p - 12.5) * pW - r, bH - (c + 1) * d];
    if (p <= 24) return [(p - 12.5) * pW + bW - r, bH - (c + 1) * d];
    return [12 * pW + bW + slatwidth + 0.5 * offWidth - r, bH - (c + 1) * d];
  };

  return points.map((stacks, c) =>
    stacks.map((count, point) => {
      let topClassSuffix;
      const p = c ? 25 - point : point;
      if (isPossibleTo(from, p) && !points[1 - c][25 - point]) {
        count += 1;
        topClassSuffix = " possible-to";
      } else
        topClassSuffix =
          p === from
            ? " selected"
            : from === -1 && isPossibleFrom(p)
            ? " possible-from"
            : "";
      if (count > 5) {
        var excess = `+${count - 5}`;
        count = 5;
      }

      const gridArea = p < 25 ? `p${p}` : ["woff", "boff"][c];
      const stackClass = p > 12 ? "puck-stack near" : "puck-stack";
      const puckClass = ["puck", "puck dark"][c];
      //jlog({ p, from, topClassSuffix });
      return (
        <div className={stackClass} key={gridArea} style={{ gridArea }}>
          {Array.from(new Array(count), (_, k) => {
            const [left, top] = xy(p, k);
            return (
              <div
                onClick={() => puckClick(p)}
                key={k}
                id={`p/${p}/${k}`}
                style={{ left, top }}
                className={puckClass + (k === count - 1 ? topClassSuffix : "")}
              >
                {!k && excess}
              </div>
            );
          })}
        </div>
      );
    })
  );
};
