//
import { Fragment, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Style from "./Tooltip.less";

import collisionDetection from "@/utils/collisionDetection";

export default function Tooltip(props) {
  // 需要 plactment 属性，需要 “碰撞检测” 终于有个hooks?只是工具函数
  // 默认右下位置 不考虑中间位置
  // 触发事件元素右下坐标已计算，overlay的宽高在dom中  视窗的宽高；
  const [dom, setDom] = useState(null);
  const ref = useCallback(
    (node) => {
      if (node) {
        setDom(node);
        // 经过碰撞检测 在设置定位
        // position align dom大小 align
        // node.style.cssText += `top: ${props.align.top}px; left: ${props.align.right}px`;
        // console.log("getComputedStyle(node)", getComputedStyle(node));
        console.log("node.getBoundingClientRect()", node.getBoundingClientRect());
        collisionDetection(props.position, props.align, node.getBoundingClientRect());
      }
    },
    [props]
  );
  return (
    <Fragment>
      {props.visible
        ? createPortal(
            <div className={Style.tooltip}>
              <div onClick={() => props.clickMask()} className={Style.mask}></div>
              <div ref={ref} className={Style.overlay}>
                {props.overlay}
              </div>
            </div>,
            document.body
          )
        : null}

      {props.children}
    </Fragment>
  );
}
