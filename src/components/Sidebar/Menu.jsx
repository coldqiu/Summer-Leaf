import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToggleSiderBar } from "../../state/action";
import Style from "./Menu.less";

export default function Menu({ list }) {
  const elementLi = list.map((item) => {
    return <MenuItem item={item} key={item.title}></MenuItem>;
  });
  return <ul>{elementLi}</ul>;
}

function MenuItem({ item }) {
  const dispatch = useDispatch();
  const bool = useSelector((state) => state.bool);
  function handleClickLink(e) {
    e.stopPropagation();
    dispatch(ToggleSiderBar(bool));
  }

  return (
    <Link to={`/${item.title}`} onClick={handleClickLink}>
      <li className={Style.li}>
        <div className={Style.icon}>
          <span className={`iconfont icon-${item.icon}`}></span>
        </div>
        <div className={Style.title}>{item.title}</div>
      </li>
    </Link>
  );
}

export const menuList = [
  {
    icon: "add",
    title: "song",
  },
  {
    icon: "add",
    title: "collection",
  },
  {
    icon: "add",
    title: "menu3",
  },
];
