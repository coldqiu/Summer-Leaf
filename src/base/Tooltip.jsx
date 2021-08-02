//
import { Fragment, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Style from "./Tooltip.less";

import collisionDetection from "@/utils/collisionDetection";

export default function Tooltip(props) {
  console.log("Tooltip props:", props);
  // const [visible, setVisbile] = useState(props.visible ? props.visible : false);
  const [visible, setVisbile] = useState(false);
  const [triggerDom, setTriggerDom] = useState(null);
  const ref = useCallback(
    (overlayNode) => {
      // debugger;
      if (overlayNode) {
        // 经过碰撞检测 再设置定位
        // triggerDom 点击的Icon; align 是偏移配置； overlayNode 是Tooltip组件的overlay
        const { top, left } = collisionDetection(triggerDom, props.align, overlayNode);
        overlayNode.style.cssText = `top: ${top}px; left: ${left}px`;
      }
    },
    [triggerDom]
  );
  const onClick = (e) => {
    // debugger;
    // 清除 props.iconBox
    // 只有点击事件才能获取 triggerDom，props.visible=true 无用，会报错；
    // 后续 考虑props.visible
    console.log("e", e, visible);
    setVisbile((bool) => !bool);
    setTriggerDom(e.target);
  };
  return (
    // Fragment key 是唯一可以传递给 Fragment 的属性。未来我们可能会添加对其他属性的支持，例如事件。
    <div onClick={(e) => onClick(e)} style={{ height: "100%" }}>
      {visible
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
    </div>
  );
}
