//
import { useRef } from "react";
import { useHistory } from "react-router-dom";

import Style from "./grid.less";
import List from "./list";

export default function Grid({ list = [] }) {
  const arr = list.map((item) => <GridItem item={item} key={item.title} />);
  return <ul className={Style.ul}>{arr}</ul>;
}

export function GridItem({ item, noClick = false, style }) {
  // console.log("restProps", restProps);
  // const [inProp, setInProp] = useState(false);
  const itemRef = useRef(null);

  const history = useHistory();
  function handleClick(item) {
    console.log("click item itemRef", item, itemRef.current);
    // setInProp((bool) => !bool);

    const { top, left } = itemRef.current.getBoundingClientRect();
    console.log(top, left);
    history.push(`/detail/${item.id}`, [top, left]);
  }
  return (
    <li
      onClick={() => (noClick ? console.log("noClick", noClick) : handleClick(item))}
      key={item.title}
      ref={itemRef}
      className={Style.li}
      style={style}
    >
      {/* // 点击时记录位置 ，即Detail 动画初始位置 */}
      <img src={item.coverPic} alt={item.coverPic} />
      <List info={item.info ? item.info : { title: "default title", left: "xx", right: " yy" }}></List>
    </li>
  );
}
