//
import { Fragment, useCallback } from "react";
import { createPortal } from "react-dom";
import Style from "./Tooltip.less";

import collisionDetection from "@/utils/collisionDetection";

export default function Tooltip(props) {
  // console.log("Tooltip props:", props);
  const ref = useCallback(
    (node) => {
      if (node) {
        // 经过碰撞检测 再设置定位
        const { top, left, width, height } = collisionDetection(
          props.iconBox,
          props.align,
          node
        );
        console.log("top, left, width, height", top, left, width, height);
        node.style.cssText = `top: ${top}px; left: ${left}px`;
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
