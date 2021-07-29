import Style from "./Icon.less";
export default function Icon(props) {
  return (
    <li className={`${Style.li} ${props.className}`}>
      <div className={Style.icon}>
        <span onClick={() => props.onClick()} className={`iconfont ${props.icon}`}></span>
      </div>
    </li>
  );
}
