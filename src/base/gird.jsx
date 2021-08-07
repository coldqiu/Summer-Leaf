//
import { useEffect, useCallback, useState, useRef } from "react";
import VirtualList from "react-tiny-virtual-list";
import { useWindowSize } from "react-use";

import Style from "./grid.less";
import List from "./list";

export default function Grid({ list = [], click, virtualListScroll }) {
  const { width: htmlClientWidth, height: htmlClientHeight } = useWindowSize();
  // const imgHeight = htmlClientWidth / 2;
  // const listHeight = (120 / 75) * htmlClientWidth / 10;
  // const topMargin = 4;
  const gridItemHeight = htmlClientWidth / 2 + ((120 / 75) * htmlClientWidth) / 10 + 4;
  const ref = useRef(null);
  // 100 playerHeight 80 tabbarHeight
  const height = htmlClientHeight - ((180 / 75) * htmlClientWidth) / 10;
  const vlist = (
    <VirtualList
      width="100%"
      // height={"100vh"}
      height={height}
      itemCount={Math.ceil(list.length / 2)}
      itemSize={gridItemHeight}
      overscanCount={4}
      // estimatedItemSize={1}
      onScroll={(scrollTop, e) => {
        virtualListScroll(scrollTop, e, ref);
      }}
      ref={ref}
      renderItem={({ index, style }) => {
        return (
          <div key={index} style={style}>
            <GridItem item={list[2 * index]} click={click}></GridItem>
            <GridItem item={list[2 * index + 1]} click={click}></GridItem>
          </div>
        );
      }}
    ></VirtualList>
  );
  return <ul className={Style.ul}>{vlist}</ul>;
}

export function GridItem({ item, click }) {
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
    <li onClick={() => handleClick(item)} key={item.title} className={Style.li}>
      {/* // 点击时记录【图片】位置 ，即Detail 动画初始位置 */}
      <img ref={ref} src={item.coverPic} alt={item.coverPic} />
      <List info={item.info ? item.info : { title: "default title", left: "xx", right: " yy" }}></List>
    </li>
  );
}
