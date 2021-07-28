import { useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { ToggleSiderBar } from "../../state/action";
import Style from "./index.less";

// @widthRouter 装饰 class
// MHeader 中的内容是动态的，并受页面上的 事件影响, 存到store
function MHeader(props) {
  // const bool = useSelector((state) => state.bool);
  // console.log("header props", props);
  // console.log("props.location.pathname", props.location.pathname);
  const dispatch = useDispatch();
  return (
    <div className={Style.wrap}>
      <div className={Style.left}>
        <ul className={Style.ul}>
          <li className={Style.li}>
            <div className={Style.icon}>
              <span onClick={() => dispatch(ToggleSiderBar())} className={"iconfont icon-add " + Style.copy}></span>
            </div>
          </li>
        </ul>
      </div>
      <div className={Style.middle}>
        {/* <h1>{props.title}</h1> */}
        <h1>{props.location.pathname}</h1>
      </div>
      <div className={Style.right}>
        <ul className={Style.ul}>
          <li className={Style.li}>
            <div className={Style.icon}>
              <span className={"iconfont icon-add " + Style.copy}></span>
            </div>
          </li>
          <li className={Style.li}>
            <div className={Style.icon}>
              <span className={"iconfont icon-add " + Style.copy}></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default withRouter(MHeader);
