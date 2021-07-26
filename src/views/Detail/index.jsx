import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";

import Cover from "./Cover";
import { songList } from "../../mock/list";

export default function Detail(props) {
  // Detail 外层 使用 CSSTransition包裹，是的在 /song 列表页也会 渲染这个页面， 组件的销毁由 CSSTransition 控制
  const params = useParams();
  const location = useLocation();
  const [x, y, width, height] = props.state ? props.state : location.state;
  const [position, setPosition] = useState(null);
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
    <div>
      <Cover item={item} pos={[x, y, width, height]} />
    </div>
  );
}

// transition 支持部分css属性 https://www.wodecun.com/blog/8036.html，
