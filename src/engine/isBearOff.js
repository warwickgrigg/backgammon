export default (pucks, start = 0) => {
  while (start < 19) if (pucks[start++]) return false;
  return true;
};
