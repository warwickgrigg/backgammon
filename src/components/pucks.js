import React, { useReducer } from "react";
import Dice from "./dice";
//import { useStateValue } from "../state";
import { validFirstMoves } from "../engine/moves";
import dimensions from "./dimensions";
const jlog = o => console.log(JSON.stringify(o));

const initState = { from: -1, moves: [] };
const reducer = (state, action) => ({
  ...state,
  ...(typeof action === "function" ? action(state) : action)
});

const Pucks = ({ stacks, player, dice, dispatch }) => {
  //const { doMove, undoMove, trailer } = moveOps([me, opp]);
  const [state, upState] = useReducer(reducer, initState);
  const fm = validFirstMoves({
    points: stacks.map(c => c.map(p => p.length)),
    dice,
    player
  });

  const isFrom = from => {
    if (state.moves.length >= dice.length) return false;
    for (let i = 0; i < fm.length; i++) if (from === fm[i][0][0]) return true;
    return false;
  };

  const isTo = (from, to) => {
    for (let i = 0; i < fm.length; i++)
      if (to === fm[i][0][1] && from === fm[i][0][0]) return true;
    return false;
  };

  const makeMove = ({ from, to, taken }) => {
    stacks[player][to].push(stacks[player][from].pop());
    if (taken) stacks[1 - player][0].push(stacks[1 - player][25 - to].pop());
    return { stacks };
  };

  const unmakeMove = ({ from, to, taken }) => {
    stacks[player][from].push(stacks[player][to].pop());
    if (taken) stacks[1 - player][25 - to].push(stacks[1 - player][0].pop());
    return { stacks };
  };

  const puckClick = p => {
    jlog({ p, from: state.from });
    if (p === state.from) {
      upState({ from: -1 });
    } else if (state.from === -1 && isFrom(p)) {
      upState({ from: p });
    } else if (isTo(state.from, p)) {
      const to = p;
      const taken = fm.find(
        m => m[0][0] === state.from && m[0][1] === to
      )[0][2];
      upState({
        from: -1,
        moves: state.moves.concat({ from: state.from, to, taken })
      });
      dispatch(makeMove({ from: state.from, to, taken }));
    }
  };

  const undoClick = () => {
    const { from, moves } = state;
    if (from >= 0) {
      upState({ from: -1 });
    } else if (moves.length) {
      const move = moves.pop();
      upState({ moves });
      dispatch(unmakeMove(move));
    }
  };

  const throwDice = () => {
    let dice = [];
    for (let i = 0; i < 2; i++) dice[i] = Math.floor(6 * Math.random()) + 1;
    if (dice[0] === dice[1]) dice = Array(4).fill(dice[0]);
    dispatch({ dice });
  };

  const xy = (p, c) => {
    // in preparation for animated pucks
    const d = dimensions;
    const { pointWidth: pW, barWidth: bW, barHeight: bH, puckDiameter: pD } = d;
    const r = pD / 2;
    if (p <= 0) return [6 * pW + 0.5 * bW - r, c * pD];
    if (p <= 6) return [(12.5 - p) * pW + bW - r, c * pD];
    if (p <= 12) return [(12.5 - p) * pW - r, c * pD];
    if (p <= 18) return [(p - 12.5) * pW - r, bH - (c + 1) * pD];
    if (p <= 24) return [(p - 12.5) * pW + bW - r, bH - (c + 1) * pD];
    const { slatWidth: sW, offWidth: oW } = d;
    return [12 * pW + bW + sW + 0.5 * oW - r, bH - (c + 1) * pD];
  };

  for (var pucks = [], c = 0; c < stacks.length; c++) {
    const puckClass = ["puck", "puck dark"][c];
    for (let cStacks = stacks[c], point = 0; point < cStacks.length; point++) {
      let stack = cStacks[point];
      let topSuffix = "";
      const p = c ? 25 - point : point;
      if (isTo(state.from, p) && !stacks[1 - c][25 - point].length) {
        stack = stack.concat(`onTop${point}`);
        topSuffix = " to";
      } else if (state.from === -1 && isFrom(p)) {
        topSuffix = " from";
      } else if (p === state.from) topSuffix = " selected";
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

  const actions = [
    ["undo", undoClick, () => state.from >= 0 || state.moves.length > 0],
    ["done", () => 0, () => state.moves.length >= dice.length],
    ["throw", throwDice, () => true || dice.length === 0]
  ];

  const buttons = () => actions.filter(([txt, fn, condition]) => condition());

  return (
    <div className="elements">
      <Dice dice={dice} used={state.moves.map(({ from, to }) => to - from)} />
      <div className="pucks">{pucks}</div>
      <div className="buttons">
        {buttons().map(([text, fn], i) => (
          <div className="button" key={i} onClick={fn}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pucks;
