import React, { useState } from "react";

export default ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);
  console.log("counter body");
  return (
    <button onClick={() => setCount(prevCount => prevCount + 1)}>
      Increment: {count}
    </button>
  );
};
