export default pucks => (from = 0) => {
  while (from < 25) if (pucks[from++]) return from;
  return from;
};
