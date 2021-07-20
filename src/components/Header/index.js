import { useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { ToggleSiderBar } from "../../state/action";
import Style from "./index.less";

// @widthRouter 装饰 class
function MHeader(props) {
  // const bool = useSelector((state) => state.bool);
  console.log("header props", props);
  // console.log("")
  // console.log("props.location.pathname", props.location.pathname);
  const dispatch = useDispatch();
  return (
    <div className={Style.wrap}>
      <div className={Style.left}>
        <ul className={Style.leftMenu}>
          <li className={Style.menuItem}>
            <span
              onClick={() => dispatch(ToggleSiderBar())}
              className={"iconfont icon-add " + Style.copy}
            ></span>
          </li>
        </ul>
      </div>
      <div className={Style.middle}>
        <h1>{props.title}</h1>
      </div>
      <div className={Style.right}>
        <ul className={Style.rightMenu}>
          <li className={Style.menuItem}>
            <span className={"iconfont icon-add " + Style.copy}></span>
          </li>
          <li className={Style.menuItem}>
            <span className={"iconfont icon-add " + Style.add}></span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default withRouter(MHeader);
