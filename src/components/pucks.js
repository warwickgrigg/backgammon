import React, { useState } from "react";
//import { useStateValue } from "../state";
import { validFirstMoves, moveOps } from "../engine/moves";
const jlog = o => console.log(JSON.stringify(o));

export default ({ points, player, dice, dispatch }) => {
  //const { doMove, undoMove, trailer } = moveOps([me, opp]);
  const [from, setFrom] = useState(-1);
  const [state, setState] = useState({ moves: [] });
  const upState = slice => setState({ ...state, ...slice });
  const fm = validFirstMoves({
    points: points.map(c => c.map(p => p.length)),
    dice,
    player
  });

  const isFrom = from => {
    for (let i = 0; i < fm.length; i++) if (from === fm[i][0][0]) return true;
    return false;
  };

  const isTo = (from, to) => {
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
    jlog({ p, from });
    if (p === from) {
      setFrom(-1);
    } else if (from === -1 && isFrom(p)) {
      setFrom(p);
    } else if (isTo(from, p)) {
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

  for (var pucks = [], c = 0; c < points.length; c++) {
    const puckClass = ["puck", "puck dark"][c];
    for (let stacks = points[c], point = 0; point < stacks.length; point++) {
      let stack = stacks[point];
      let topSuffix = "";
      const p = c ? 25 - point : point;
      if (isTo(from, p) && !points[1 - c][25 - point]) {
        stack = stack.concat(`onTop${point}`);
        topSuffix = " to";
      } else if (from === -1 && isFrom(p)) {
        topSuffix = " from";
      } else if (p === from) topSuffix = " selected";
      const excess = stack.length - 5;
      if (excess > 0) stack = stack.slice(5);
      for (let k = 0; k < stack.length; k++) {
        const id = `p/${stack[k]}`;
        //jlog({ c, point, k });
        const [left, top] = xy(p, k);
        const className = puckClass + (k === stack.length - 1 ? topSuffix : "");
        const props = { id, key: id, style: { left, top }, className };
        pucks.push(
          <div onClick={() => puckClick(p)} {...props}>
            {!k && excess > 0 && excess}
          </div>
        );
      }
    }
  }
  return <div>{pucks}</div>;
};
