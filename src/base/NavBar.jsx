import { useDispatch } from "react-redux";
import { withRouter } from "react-router";
import Style from "./NavBar.less";

function NavBar(props) {
  const dispatch = useDispatch();
  return (
    <div className={Style.wrap}>
      <div className={Style.left}>
        <ul className={Style.ul}>
          {/* <li className={Style.li}>
            <div className={Style.icon}>
              <span
                onClick={() => dispatch(ToggleSiderBar())}
                className={"iconfont icon-add " + Style.copy}
              ></span>
            </div>
          </li> */}
          {props.left}
        </ul>
      </div>
      <div className={Style.middle}>{props.title}</div>
      <div className={Style.right}>
        <ul className={Style.ul}>
          {/* <li className={Style.li}>
            <div className={Style.icon}>
              <span className={"iconfont icon-add " + Style.copy}></span>
            </div>
          </li>
          <li className={Style.li}>
            <div className={Style.icon}>
              <span className={"iconfont icon-add " + Style.copy}></span>
            </div>
          </li> */}
          {props.right}
        </ul>
      </div>
    </div>
  );
}

export default withRouter(NavBar);
