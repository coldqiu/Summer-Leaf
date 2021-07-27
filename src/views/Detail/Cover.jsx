import { useState, useEffect, useCallback } from "react";
// import LazyLoad from "react-lazyload";
import List from "@/base/list.jsx";
import Style from "./Cover.less";

// 进入或退出页面时 图片外层盒子大小就需要确定，不能随着动画变大；动画在图片上，
export default function DetailCover({ item, pos }) {
  // const ref = useRef(null);
  const [x, y, width, height] = pos;
  const [dom, setDom] = useState(null);

  // 获取 图片高度
  const ref = useCallback((node) => {
    if (node) {
      setDom(node);
    }
  }, []);
  console.log("pos", pos);
  // 设置图片的style
  useEffect(() => {
    if (dom) {
      // 增加 if判断 ,一开始拿不到 dom  why?
      dom.style.width = `100vw`;
      dom.style.height = `100vw`;
      dom.style.transform = `translate(0px, 0px)`;
      dom.style.transition = `all 0.45s cubic-bezier(.56,.4,.3,1)`;
    }
    return () => {
      // console.log("GridItem willUnMount childDom", dom);
    };
  }, [dom]);

  return (
    <div className={Style.li}>
      <img
        ref={ref}
        src={item.coverPic}
        alt={item.coverPic}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${x}px, ${y}px)`,
        }}
      />
      <List
        info={
          item.info ? item.info : { title: "default title", left: "xx", right: " yy" }
        }
      ></List>
    </div>
  );
}
