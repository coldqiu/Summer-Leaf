import { useState, useEffect, useCallback } from "react";
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
  const [x, y, width, height] = pos;
  const [dom, setDom] = useState(null);
  const ref = useCallback((node) => {
    if (node) {
      setDom(node);
    }
  }, []);
  useEffect(() => {
    if (dom) {
      // 增加 if判断 ,一开始拿不到 dom  why?
      dom.style.width = `100%`;
      dom.style.height = `100%`;
      dom.style.transform = `translate(0px, 0px)`;
      dom.style.transition = `all 0.45s cubic-bezier(.56,.4,.3,1)`;
    }
    return () => {
      // console.log("GridItem willUnMount childDom", dom);
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
