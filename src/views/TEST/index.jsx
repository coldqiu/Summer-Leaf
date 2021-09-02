//
import { useRef, useCallback, useState, useEffect } from "react";

import { useWindowSize, usePrevious } from "react-use";
import AlloyFinger from "alloyfinger";

import "./index.css";
export default function Test() {
  const { width: htmlClientWidth, height: htmlClientHeight } = useWindowSize();

  const [translateY, setTranslateY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const preScrollTop = usePrevious(scrollTop);
  const wrapRef = useRef(null);
  const navBarCellHeight = ((100 / 75) * htmlClientWidth) / 10;
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
  const [list, setList] = useState(new Array(20).fill(1));
  const height = htmlClientHeight - ((180 / 75) * htmlClientWidth) / 10;

  // 监听虚拟列表的 touch事件；
  function touchstart(evt) {
    console.log("touchstart evt", evt);
    const { pageX, pageY } = evt.touches[0];
    console.log("pos", pageX, pageY);
  }
  function touchmove(evt) {
    console.log("touchmove evt", evt);
    const { pageX, pageY } = evt.touches[0];
    console.log("pos", pageX, pageY);
  }
  function touchend(evt) {
    console.log("touchend evt", evt);
  }
  function touchcancel(evt) {
    console.log("touchcancel evt", evt);
  }

  // better-scroll 处理虚拟列表的滚动
  // const BSInstance = useRef(null);

  return (
    <div className="page" style={{ overflow: "hidden", height: "100vh" }}>
      <div ref={getWrapRef} className="wrap">
        <div className="nav">NAV</div>
        <div className="content">
          <div className="tab">TAB</div>
          <div ref={getListRef} className="list">
            <ul className="ul">
              {list.map((item, index) => {
                return <li key={index}>{index}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
