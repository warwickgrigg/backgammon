var gapHits = Array.from(new Array(4 * 6 + 2), _ => []);
//for (let d1 = 1; d1 <= 6; d1++) result[d1] = [[d1]];
for (let d1 = 1; d1 <= 6; d1++) {
  for (let d2 = 1; d2 <= 6; d2++) {
    if (d1 === d2) {
      for (let sum = 0, i = 0; i < 4; i++) {
        sum += d1;
        gapHits[sum].push(Array(i + 1).fill(d1));
      }
    } else {
      gapHits[d1] = gapHits[d1].concat([[d1, d2]]);
      gapHits[d2] = gapHits[d2].concat([[d1, d2]]);
      gapHits[d1 + d2] = gapHits[d1 + d2].concat([[d1, d2]]);
    }
  }
}

//gapHits.forEach(jlog);

gapHits.forEach((a, i) => jlog([i, a.length]));

export default gapHits;
