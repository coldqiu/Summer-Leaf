//
import { useState, useRef, forwardRef, useCallback } from "react";
import { useHistory } from "react-router-dom";

import Style from "./grid.less";
import List from "./list";

export default function Grid({ list = [] }) {
  const arr = list.map((item) => <GridItem item={item} key={item.title} />);
  return <ul className={Style.ul}>{arr}</ul>;
}

function GridItemBase({ item, noClick = false, customClass }, ref) {
  // console.log("restProps", restProps);

  // old
  // const itemRef = useRef(null);
  // ref = itemRef.current;

  // new
  const [itemRef, setItemRef] = useState();
  const getItemRef = useCallback((node) => {
    console.log("node item", node);
    setItemRef(node);
    ref = node;
  }, []);

  const history = useHistory();
  function handleClick(item) {
    console.log("click item itemRef", item, itemRef);
    // console.log("click item itemRef", item, itemRef.current);
    // setInProp((bool) => !bool);

    const { top, left, right, bottom } = itemRef.getBoundingClientRect();
    // const { top, left, right, bottom } = itemRef.current.getBoundingClientRect();
    console.log(top, left);
    const width = right - left;
    const height = bottom - top;
    // history.push(`/detail/${item.id}`, [left, top, width, height]);
    history.push(`/song/${item.id}`, [left, top, width, height]);
  }
  return (
    <li
      onClick={() => (noClick ? console.log("noClick", noClick) : handleClick(item))}
      key={item.title}
      // ref={itemRef}
      ref={getItemRef}
      className={customClass ? customClass : Style.li}
      // style={style}
    >
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

export const GridItem = forwardRef(GridItemBase);
