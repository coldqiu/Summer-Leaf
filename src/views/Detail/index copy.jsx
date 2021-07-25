import React, { useEffect, useCallback, useState, useRef } from "react";
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
  console.log("Detail props", props);
  const params = useParams();
  const location = useLocation();
  // const [x, y, width, height] = location.state;
  console.log("state", location.state);
  const item = songList.filter((item) => item.id === parseInt(params.id))[0];

  const [childDom, setChildDom] = useState(null);
  const xx = useRef(null);
  const ref = useCallback((node) => {
    console.log("node", node);
    if (node !== null) {
      setChildDom((node) => node);
      xx.current = node;
    }
  }, []);

  // useImperativeHandle(ref, () => {

  // })

  useEffect(() => {
    console.log("Detail Mounted childDom", xx, childDom);
    return () => {
      console.log("Detail willUnMount childDom", xx);
    };
  }, []);

  return (
    <Wrap>
      <div>
        {/* onClick 禁止GridItem 点击事件 */}
        <GridItem
          ref={ref}
          // ref={refGridItem}
          // ref={domRef}
          childRef={xx}
          item={item}
          noClick={true}
          customClass={Style.fullLi}
        />
      </div>
    </Wrap>
  );
}

// transition 支持部分css属性 https://www.wodecun.com/blog/8036.html，
