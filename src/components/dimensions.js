const puckDiameter = 24;
const pointWidth = (puckDiameter * 15) / 12;
const barWidth = (puckDiameter * 15) / 12;
const boardBorder = (puckDiameter * 4) / 12;
const slatWidth = boardBorder;
const pointHeight = (puckDiameter * 60) / 12;
const pointGap = (puckDiameter * 18) / 12;
const offWidth = pointWidth;
const columnHeight = pointHeight * 2 + pointGap;
const barHeight = columnHeight;
const diceSize = (puckDiameter * 12) / 12;
//const boardHeight = barHeight + 2 * boardBorder;
//const boardWidth = pointWidth * 12 + barWidth + boardBorder * 3 + offWidth;

export default {
  puckDiameter,
  pointWidth,
  barWidth,
  boardBorder,
  slatWidth,
  pointHeight,
  pointGap,
  offWidth,
  columnHeight,
  barHeight,
  diceSize
};
