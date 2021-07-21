import React, { useEffect, useCallback, useRef, createRef } from "react";
import { useParams, useLocation } from "react-router";
import { GridItem } from "../../base/gird";

import { songList } from "../../mock/list";

import styled from "styled-components";
import Style from "./index.less";

console.log("Style.fullLi", Style.fullLi);
console.log("Style.", Style);

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 100px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
`;

export default function Detail(props) {
  // function Detail(props, ref) {
  console.log("Detail props", props);
  const params = useParams();
  const location = useLocation();
  console.log("params", params);
  const [x, y, width, height] = location.state;
  console.log("state", location.state)
  const item = songList.filter((item) => item.id === parseInt(params.id))[0];

  const refGridItem = useRef(null);
  // // 使用 useRef 报错：Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
  const domRef = useCallback((node) => {
    console.log("node", node);
    refGridItem.current = node;
  }, []);

  // const domRef = useRef();
  // useImperativeHandle(ref, () => {

  // })

  // const refGridItem = createRef();
  // console.log("const refGridItem = createRef()", refGridItem)
 
  // const onExit = useCallback((node) => {
  //   console.log("onExit", node);
  //   node.style.transform = `translate(${x}px, ${y}px)`;
  //   node.style.color = "pink";
  //   node.style.width = width;
  //   node.style.height = height;
  //   node.style.transition = "all 1s";
  // }, []);

  useEffect(() => {
    return () => {
      console.log("beforeUnMount  [props.match]", props);
      // RefGridItem.current
      console.log("refGridItem", refGridItem);
      // console.log("domRef", domRef);
      // console.log("refGridItem.current", refGridItem.current);
    };
  }, []);

  return (
    <Wrap>
      <div>
        {/* onClick 禁止GridItem 点击事件 */}
        <GridItem
          ref={refGridItem}
          // ref={domRef}
          item={item}
          noClick={true}
          customClass={Style.fullLi}
        />
      </div>
    </Wrap>
  );
}

// transition 支持部分css属性 https://www.wodecun.com/blog/8036.html，
