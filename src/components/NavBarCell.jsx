import { useCallback, Fragment } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { ToggleSiderBar } from "@/state/action";

// import Tooltip from "rmc-tooltip";
// import "rmc-tooltip/assets/bootstrap.css";

import Tooltip from "@/base/Tooltip";

import NavBar from "@/base/NavBar";
import Icon from "@/base/Icon";
import Style from "./NavBarCell.less";

export default function NavBarCell(props) {
  const actions = useSelector((state) => state.actions);
  const dispatch = useDispatch();
  const history = useHistory();
  const goToSearch = useCallback(() => {
    history.push("/search");
  }, [history]);

  const handleAction = useCallback(() => {
    console.log("handleAction");
  }, []);
  const clickMask = useCallback(() => {
    console.log("this.is clickMask");
  }, []);
  // const actions = [
  //   { title: "title1", click: clickOverlayItem },
  //   { title: "title2", click: clickOverlayItem },
  //   { title: "title1", click: clickOverlayItem },
  // ];
  //   const align = { top: 10, left: -10 };
  const align = {};

  const rightMenu = [
    { icon: "icon-attachment", onClick: () => goToSearch() },
    {
      icon: "icon-menu",
      onClick: handleAction,
      clickMask,
      overlay: <OverlayNode actions={actions} />,
      align: align,
    },
  ];
  // function clickOverlayItem(item) {
  //   console.log("this.is actions clickOverlayItem", item);
  // }

  const leftMenu = [{ icon: "icon-toggle-left", onClick: () => dispatch(ToggleSiderBar()) }];

  return (
    <NavBar
      left={<ContentRender list={leftMenu} />}
      title={"this.is.NavBar"}
      right={<ContentRender list={rightMenu} />}
    />
  );
}

function ContentRender(props) {
  const list = props.list;
  return (
    <Fragment>
      {list.map((item, index) => {
        return (
          <div key={index}>
            {item.overlay ? (
              <Tooltip
                // visible={item.visible}
                clickMask={item.clickMask}
                overlay={item.overlay}
                align={item.align}
              >
                <Icon icon={item.icon} onClick={() => item.onClick()} />
              </Tooltip>
            ) : (
              <Icon icon={item.icon} onClick={() => item.onClick()} />
            )}
          </div>
        );
      })}
    </Fragment>
  );
}

function OverlayNode(props) {
  console.log("OverLayNode props", props);
  return (
    <ul className={Style.ul}>
      {props.actions.map((item, index) => {
        return (
          <li onClick={() => item.click(item)} className={Style.li} key={index}>
            {item.title}
          </li>
        );
      })}
    </ul>
  );
}
