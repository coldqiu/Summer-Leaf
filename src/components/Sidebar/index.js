import { useSelector, useDispatch } from "react-redux";
import Style from "./index.less";
import { ToggleSiderBar } from "../../state/action";
import AlbumCover from "../../base/AlbumCover";
import Menu, { menuList } from "./Menu.jsx";

// export default function MSiderBar({ dispatch }) {
export default function MSiderBar() {
  const bool = useSelector((state) => state.bool);
  const dispatch = useDispatch();
  return (
    <div className={!bool ? Style.hide : Style.siderBar}>
      {/* AlbumCover */}
      <div className={Style.albumCoverWrap}>
        <AlbumCover />
      </div>
      {/* mask */}
      <div
        onClick={() => dispatch(ToggleSiderBar(bool))}
        className={Style.mask}
      ></div>
      <Menu list={menuList}></Menu>
    </div>
  );
}
