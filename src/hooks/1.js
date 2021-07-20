import React from "react";

class ConstComp extends React.PureComponent {
  render() {
    console.log("abc");
    return "Hello";
  }
}
function CountLabel({ count }) {
  const color = count > 10 ? "red" : "blue";
  return <span style={{ color }}>{count}</span>;
}

export default function Counter() {
  const [count, setCount] = React.useState(2);
  function handleClick(e) {
    console.log("e", e, count);
    setCount(count + 1);
  }
  return (
    <div>
      {/* <button onClick={() => setCount(count + 1)}> */}
      <button onClick={handleClick}>
        <CountLabel count={count} />
        <ConstComp />
      </button>
    </div>
  );
}
