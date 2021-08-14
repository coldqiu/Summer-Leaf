import React, { useEffect, useState, useRef } from "react";

// 测试 原生、合成事件
class ConstComp extends React.PureComponent {
  render() {
    console.log("abc");
    return "Hello";
  }
}
function CountLabel({ count }) {
  const ref = useRef(null);
  function domClick(e) {
    console.log("domClick e", e);
    // e.stopPropagation();
  }
  function click(e) {
    console.log("click e", e);
    e.stopPropagation();
  }
  useEffect(() => {
    console.log("ref dom", ref);
    ref.current.addEventListener("click", domClick, false);
    return () => {
      // console.log("ref.current", ref.current);
      // ref.current.removeEventListener("click", domClick);
    };
  }, []);
  const color = count > 10 ? "red" : "blue";
  return (
    <h2 onClick={(e) => click(e)} ref={ref} style={{ color }}>
      {count}
    </h2>
    // <h2 onClickCapture={(e) => click(e)} ref={ref} style={{ color }}>
    //   {count}
    // </h2>
  );
}

export default function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        <CountLabel count={count} />
        <ConstComp />
      </button>
    </div>
  );
}
