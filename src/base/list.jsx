//
import Style from "./list.less";
export default function list({ info }) {
  return (
    <div className={Style.wrap}>
      {/* 是否有img */}
      {info.img ? (
        <div className={Style.img}>
          <img src={info.img} />
        </div>
      ) : null}
      <div className={Style.info}>
        <div className={Style.title}>{info.title}</div>
        <div className={Style.message}>
          <div className={Style.left}>{info.left}</div>
          <div className={Style.mid}>&</div>
          <div className={Style.right}>{info.right}</div>
        </div>
      </div>
      <div className={Style.menu}>
        {/* <span className={`iconfont icon-${item.icon}`}></span> */}
        <span>$</span>
      </div>
    </div>
  );
}
