import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation } from "react-router";
import { GridItem } from "../../base/gird";

import { songList } from "../../mock/list";

import "./tmp.css";

import Style from "./index.less";

console.log("Style.fullLi", Style.fullLi);
console.log("Style.", Style);

export default function Detail(props) {
  console.log("Detail props", props);
  const params = useParams();
  const location = useLocation();
  console.log("params", params);
  const [x, y, width, height] = location.state;
  const item = songList.filter((item) => item.id === parseInt(params.id))[0];

  useEffect(() => {
    return console.log("beforeUnMount");
  });

  // const GridItemStyle = {

  // }
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: "100px",
        background: "rgba(0,0,0,0.6)",
        zIndex: 10,
      }}
    >
      <div
        style={{
          color: "red",
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${x}px, ${y}px)`,
          transition: "all 6s",
          overflowY: "auto",
        }}
      >
        {/* onClick 禁止GridItem 点击事件 */}
        <GridItem
          item={item}
          noClick={true}
          // style={{
          //   color: "pink",
          //   width: "100%",
          //   height: "100%",
          // }}
          customClass={Style.fullLi}
        />
      </div>
    </div>
  );
}

const duration = 3000;

const defaultStyle = {
  // transition: `all ${duration}ms ease-in-out`,
  background: "rgba(0,0,0,0.01)",
  // transition 支持部分css属性 https://www.wodecun.com/blog/8036.html，
};

// const transitionStyles = {
//   entering: { opacity: 1 },
//   entered: { opacity: 1 },
//   exiting: { opacity: 1 },
//   exited: { opacity: 0.3 },
// };

// export default withRouter(Detail);
