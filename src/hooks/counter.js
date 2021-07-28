import React, { useState, useEffect } from "react";

export default function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("this.is.inSide of Interval count", count); // 始终为 0
      //   setCount(count + 1); // 始终只为 1,删除依赖，可以更新count
        setCount((x, y) => {
          console.log("x ,  interval", x, interval);
          return x + 1;
        }); //
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  //   });
  return <div>计数器为：{count}</div>;
}
