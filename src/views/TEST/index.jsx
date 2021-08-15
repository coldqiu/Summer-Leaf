//
import { useRef, useCallback, useState } from "react";

import { useWindowSize, usePrevious } from "react-use";
import AlloyFinger from "alloyfinger";

import "./index.css";
export default function Test() {
  const { width: htmlClientWidth } = useWindowSize();
  const [translateY, setTranslateY] = useState(0);
  const preTranslateY = usePrevious(translateY);
  console.log("translateY, preTranslateY", translateY, preTranslateY);
  const wrapRef = useRef(null);
  const contentRef = useRef(null);
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
      console.log("PressMove", evt, top);
      top = parseInt(parseFloat(top).toFixed(2));
      console.log("top", top, navBarCellHeight);

      if (top <= 0 && top >= -navBarCellHeight) {
        console.log("evt.deltaY", evt.deltaY);
        console.log(" top + evt.deltaY", top + evt.deltaY);
        let done =
          top + evt.deltaY > 0 ? 0 : top + evt.deltaY > -navBarCellHeight ? top + evt.deltaY : -navBarCellHeight;
        wrapRef.current.style.transform = `translate(0, ${done}px)`;
        console.log("don", done);
        setTranslateY(done);
      }
    },
    [wrapRef, navBarCellHeight]
  );

  // 获取列表容器dom
  const getListRef = useCallback(
    (node) => {
      if (node) {
        contentRef.current = node;
        console.log("node", node);
        let fingerInstance = new AlloyFinger(node, {});
        fingerInstance.on("pressMove", handlePressMove);
      }
    },
    [handlePressMove]
  );

  return (
    <div ref={getWrapRef} className="wrap">
      <div className="nav">NAV</div>
      <div className="content">
        <div className="tab">TAB</div>
        <div ref={getListRef} className="list">
          <ul className="ul">
            <li> LIST LI</li>
            <li> LIST LI</li>
            <li> LIST LI</li>
            <li> LIST LI</li>
            <li> LIST LI</li>
            <li> LIST LI</li>
            <li> LIST LI</li>
            <li> LIST LI</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
