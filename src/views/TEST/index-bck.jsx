//
import { useRef, useCallback, useState, useEffect } from "react";
import VirtualList from "react-tiny-virtual-list";

import { useWindowSize, usePrevious } from "react-use";
import AlloyFinger from "alloyfinger";

import throttle from "lodash/throttle";
// Lodash之throttle（节流）与 debounce （防抖

import "./index.css";
export default function Test() {
  const { width: htmlClientWidth, height: htmlClientHeight } = useWindowSize();

  const [translateY, setTranslateY] = useState(0);
  const preTranslateY = usePrevious(translateY);
  const [scrollTop, setScrollTop] = useState(0);
  const preScrollTop = usePrevious(scrollTop);
  const wrapRef = useRef(null);
  const contentRef = useRef(null);
  const navBarCellHeight = ((100 / 75) * htmlClientWidth) / 10;
  const fingerInstance = useRef(null);

  const [pos, setPos] = useState({ pageX: 0, pageY: 0 });
  const prePos = usePrevious(pos);
  // 获取页面容器dom
  const getWrapRef = useCallback((node) => {
    if (node) {
      wrapRef.current = node;
    }
  }, []);

  // 列表容器上的pressMove事件回调
  const handlePressMove = useCallback(
    (evt) => {
      let { top } = wrapRef.current.getBoundingClientRect();
      top = parseInt(parseFloat(top).toFixed(2));
      console.log("evt.deltaY, top", evt.deltaY, top);
      if (evt.deltaY > 0) {
        if (top <= 0 && top >= -navBarCellHeight) {
          let done =
            top + evt.deltaY > 0 ? 0 : top + evt.deltaY > -navBarCellHeight ? top + evt.deltaY : -navBarCellHeight;
          wrapRef.current.style.transform = `translate(0, ${done}px)`;
          setTranslateY(done);
          evt.preventDefault();
          console.log("done, navBarCellHeight:", done, navBarCellHeight);
        } else {
          console.log("pressMove else");
        }
      }
    },
    [, navBarCellHeight]
  );

  // 获取列表容器dom
  const getListRef = useCallback((node) => {
    if (node) {
      // contentRef.current = node;
      // fingerInstance.current = new AlloyFinger(node, {});
      // fingerInstance.current.on("touchMove", handlePressMove);
      // fingerInstance.on("pressMove", throttle(handlePressMove, 16));
    }
  }, []);
  const [list, setList] = useState(new Array(300).fill(1));
  const height = htmlClientHeight - ((180 / 75) * htmlClientWidth) / 10;

  const virtualListScroll = useCallback((scrollTop, e) => {
    // console.log("virtualListScroll,e", scrollTop, e);
    setScrollTop(scrollTop);
    let direction = scrollTop - preScrollTop; // 滚动方向 滚动多少
    if (direction > 0) {
      let distance = translateY - direction < 0 ? translateY - direction : 0;
      setTranslateY(Math.abs(distance) < navBarCellHeight ? distance : -navBarCellHeight);
      wrapRef.current.style.transform = `translate(0, ${translateY}px)`;
    }
    // }, []);
  });

  // 监听虚拟列表的 touch事件；
  const posRef = useRef(null);

  const touchstart = useCallback(
    (evt) => {
      console.log("touchstart evt", evt);
      const { pageY } = evt.touches[0];
      console.log("pos", pageY);
      posRef.current = pageY;
    },
    [posRef]
  );
  const touchmove = useCallback(
    (evt) => {
      const { pageY } = evt.touches[0];
      console.log("pos", pageY);

      const prePos = posRef.current;
      console.log("prePos", prePos);
      // console.log("1 posRef", posRef);
      posRef.current = pageY;
      // console.log("2 posRef", posRef); // 错误的值

      let direction = pageY - prePos; // 滚动方向 滚动多少
      console.log("directioin", direction);
      // 还是旧问题， 一遍获取 translateY 一边设置
      let { top } = wrapRef.current.getBoundingClientRect();
      let translateY = parseInt(parseFloat(top).toFixed(2));
      if (direction > 0) {
        let distance = translateY + direction < 0 ? translateY + direction : 0;
        setTranslateY(Math.abs(distance) < navBarCellHeight ? distance : -navBarCellHeight); //
        console.log("distance", distance);
        wrapRef.current.style.transform = `translate(0, ${distance}px)`;
      }
    },
    [posRef]
  );
  const touchend = useCallback((evt) => {
    console.log("touchend evt", evt);
  }, []);
  const touchcancel = useCallback((evt) => {
    console.log("touchcancel evt", evt);
  }, []);

  const virtualListRef = useCallback((ref) => {
    if (ref) {
      let node = ref.rootNode;
      contentRef.current = node;
      node.addEventListener("touchstart", touchstart);
      node.addEventListener("touchmove", touchmove);
      node.addEventListener("touchend", touchend);
      node.addEventListener("touchcancel", touchcancel);
    }
  });

  return (
    <div className="page" style={{ overflow: "hidden", height: "100vh" }}>
      <div ref={getWrapRef} className="wrap">
        <div className="nav">NAV</div>
        <div className="content">
          <div className="tab">TAB</div>
          <div ref={getListRef} className="list">
            <ul className="ul">
              <VirtualList
                width="100%"
                // height={600}
                height={height}
                itemCount={list.length}
                itemSize={100}
                overscanCount={4}
                // estimatedItemSize={1}
                ref={virtualListRef}
                onScroll={(scrollTop, e) => {
                  virtualListScroll(scrollTop, e);
                }}
                renderItem={({ index, style }) => {
                  return (
                    <li key={index} style={style}>
                      {index}
                    </li>
                  );
                }}
              ></VirtualList>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
