//
import { useEffect, useCallback, useState } from "react";
import VirtualList from "react-tiny-virtual-list";

import Style from "./grid.less";
import List from "./list";

export default function Grid({ list = [], click }) {
  const arr = list.map((item) => <GridItem item={item} key={item.title} click={click} />);
  console.log("list.lenght", list.length);
  const vlist = (
    <VirtualList
      width="100%"
      height={870}
      itemCount={list.length}
      itemSize={105}
      // overscanCount={10}
      // estimatedItemSize={1}
      renderItem={({ index, style }) => (
        // <div key={index} style={style}>
        //   Letter: {list[index]}, Row: #{index}
        // </div>
        <GridItem item={list[index]} key={list[index].title} click={click} style={style}>
          index:{index}
        </GridItem>
      )}
    ></VirtualList>
  );
  // return <ul className={Style.ul}>{arr}</ul>;
  return <ul className={Style.ul}>{vlist}</ul>;
}

export function GridItem({ item, click, style }) {
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
  }, [dom, click, item]);

  useEffect(() => {
    // console.log("GridItem Mounted childDom", dom);
    return () => {
      // console.log("GridItem willUnMount childDom", dom);
    };
  }, []);

  return (
    <li
      onClick={() => handleClick(item)}
      key={item.title}
      className={Style.li}
      style={style}
    >
      {/* // 点击时记录【图片】位置 ，即Detail 动画初始位置 */}
      <img ref={ref} src={item.coverPic1} alt={item.coverPic} />
      <List
        info={
          item.info ? item.info : { title: "default title", left: "xx", right: " yy" }
        }
      ></List>
    </li>
  );
}
