export default pucks => (from = 0) => {
  for (; from < 25; from++) if (pucks[from]) return from;
  return from;
};
