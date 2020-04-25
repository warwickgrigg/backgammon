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

  const xy = (point, i) => {
    const pointWidth = 30;
    // max / originPoints / excessmultiplier / points / bars / offs
    const breaks = [[0, 0, 6], [6, 0, 6, 1], []];
    if (point <= 0) {
    }
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
