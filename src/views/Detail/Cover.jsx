import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import List from "@/base/list.jsx";
import Style from "./Cover.less";
const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 100px;
  z-index: 10;
  font-size: 0;
`;

export default function DetailCover({ item, pos }) {
  // const ref = useRef(null);
  console.log("cover pos", pos);
  console.log("cover item", item);
  const [x, y, width, height] = pos;
  const [dom, setDom] = useState(null);
  const ref = useCallback((node) => {
    if (node) {
      console.log("cover node", node);
      setDom(node);
    }
  }, []);
  useEffect(() => {
    console.log("x, y, width, height", x, y, width, height);
    if (dom) {
      // 增加 if判断 ,一开始拿不到 dom  why?
      console.log("GridItem Mounted childDom", dom);

      dom.style.width = `100%`;
      dom.style.height = `100%`;
      dom.style.transform = `translate(0px, 0px)`;
      dom.style.transition = `all 0.6s`;
    }
    return () => {
      // const dom = ref.current;
      // const { top, left, right, bottom } = dom.getBoundingClientRect();
      console.log("GridItem willUnMount childDom", dom);
      console.log("x", x);
      // if (dom) {
      //   // dom 有拿不到的时机， 整个过程是怎样的
      //   console.log("dom.style", dom.style);
      //   dom.style.width = `${width}px`;
      //   dom.style.height = `${height}px`;
      //   dom.style.transform = `translate(${x}px, ${y}px)`;
      // }
    };
  }, [dom]);

  return (
    <Wrap>
      <div
        ref={ref}
        className={Style.li}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${x}px, ${y}px)`,
        }}
      >
        <img src={item.coverPic} alt={item.coverPic} />
        <List
          info={
            item.info ? item.info : { title: "default title", left: "xx", right: " yy" }
          }
        ></List>
      </div>
    </Wrap>
  );
}
