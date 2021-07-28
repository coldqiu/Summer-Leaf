import { useSelector, useDispatch } from "react-redux";
// import { CSSTransition } from "react-transition-group";

import Style from "./index.less";
import { ToggleSiderBar } from "../../state/action";
import AlbumCover from "../../base/AlbumCover";
import Menu, { menuList } from "./Menu.jsx";

// export default function MSiderBar({ dispatch }) {
export default function MSiderBar() {
  const bool = useSelector((state) => state.bool);
  const dispatch = useDispatch();

  // function onExit(e) {
  //   console.log("e", e);
  // }
  return (
    <div className={Style.wrap}>
      <div className={bool ? Style.siderBar : Style.hideSiderBar}>
        {/* AlbumCover */}
        <div className={Style.albumCoverWrap}>
          <AlbumCover />
        </div>
        {/* mask */}
        <Menu list={menuList}></Menu>
      </div>
      <div
        onClick={() => dispatch(ToggleSiderBar(bool))}
        className={bool ? Style.mask : Style.hideMask}
      ></div>
    </div>
  );
}

// <CSSTransition in={bool} onExit={(e) => onExit(e)} classNames={"fade"} timeout={300}>
