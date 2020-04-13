export default pucks => (from = 0) => {
  while (!pucks[from] && from++ < 25);
  return from;
};
