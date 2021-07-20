//
import Style from "./grid.less";
import List from "./list";

export default function grid({ list = [] }) {
  function handleClick(item) {
    console.log("click item ", item);
  }
  const arr = list.map((item) => (
    <li onClick={() => handleClick(item)} className={Style.li} key={item.title}>
      {/* {item.title} */}
      <img src={item.coverPic} alt={item.coverPic} />
      <List info={item.info ? item.info : { title: "default title", left: "xx", right: " yy" }}></List>
    </li>
  ));
  return <ul className={Style.ul}>{arr}</ul>;
}
