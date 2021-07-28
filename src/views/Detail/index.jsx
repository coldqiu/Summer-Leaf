import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router";
// import styled from "styled-components";

import Cover from "./Cover";
import List from "../../base/list";
import Style from "./index.less";
import { songList, detailList } from "../../mock/list";

// const Wrap = styled.div`
// position: fixed;
// top: 0;
// left: 0;
// right: 0;
// bottom: 100px;
// z-index: 10;
// font-size: 0;
// // background: #fff;
// overflow-y: auto;
// `;

export default function Detail(props) {
  // Detail 外层 使用 CSSTransition包裹，是的在 /song 列表页也会 渲染这个页面， 组件的销毁由 CSSTransition 控制
  const params = useParams();
  const location = useLocation();
  const [x, y, width, height] = props.state ? props.state : location.state;
  // const [position, setPosition] = useState(null);
  const id = props.item ? props.item.id : parseInt(params.id);
  const item = songList.filter((item) => item.id === id)[0];
  // 位置大小信息 id item 应该使用 缓存

  // useImperativeHandle(ref, () => {
  // })

  useEffect(() => {
    // console.log("Detail Mounted childDom", x, y, width, height);
    return () => {
      // console.log("Detail willUnMount childDom");
    };
  }, []);

  return (
    // <Wrap>
    <div className={`${Style.wrap} ${props.visible === "visible" ? Style.visible : Style.hidden}`}>
      <Cover item={item} pos={[x, y, width, height]} />
      <div className={Style.list}>
        <div className={Style.playButton}>play </div>

        {detailList.map((item, index) => {
          return <List info={item} key={index} />;
        })}
      </div>
    </div>
    // </Wrap>
  );
}

// transition 支持部分css属性 https://www.wodecun.com/blog/8036.html，
