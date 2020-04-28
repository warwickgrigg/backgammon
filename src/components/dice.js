import React from "react";

const Dice = ({ dice, used }) => {
  const isUsed = i =>
    dice.length === 4 ? i < used.length : used.includes(dice[i]);
  return (
    <div className="dice">
      {dice.map((v, i) => (
        <div className={"die" + (isUsed(i) ? " inactive" : "")} key={i}>
          {v}
        </div>
      ))}
    </div>
  );
};

export default Dice;
