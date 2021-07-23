//
import { useEffect, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import Style from "./grid.less";
import List from "./list";

export default function Grid({ list = [], click }) {
  const arr = list.map((item) => <GridItem item={item} key={item.title} click={click} />);
  return <ul className={Style.ul}>{arr}</ul>;
}

export function GridItem({ item, click }) {
  const history = useHistory();
  const [dom, setDom] = useState(null);
  const ref = useCallback((node) => {
    setDom(node);
  }, []);

  const handleClick = useCallback(() => {
    const { top, left, right, bottom } = dom.getBoundingClientRect();
    const width = right - left;
    const height = bottom - top;
    // 动画完成 才切换路由
    // history.push(`/song/${item.id}`, [left, top, width, height]);
    const pos = [left, top, width, height];
    click(item, pos);
  }, [dom]);

  useEffect(() => {
    // console.log("GridItem Mounted childDom", dom);
    return () => {
      // console.log("GridItem willUnMount childDom", dom);
    };
  }, []);

  return (
    <li onClick={() => handleClick(item)} key={item.title} ref={ref} className={Style.li}>
      {/* // 点击时记录位置 ，即Detail 动画初始位置 */}
      <img src={item.coverPic} alt={item.coverPic} />
      <List
        info={
          item.info ? item.info : { title: "default title", left: "xx", right: " yy" }
        }
      ></List>
    </li>
  );
}
