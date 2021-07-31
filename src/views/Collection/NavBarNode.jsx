import { useCallback, Fragment, forwardRef, useState } from "react";
import { useHistory } from "react-router";

// import Tooltip from "rmc-tooltip";
// import "rmc-tooltip/assets/bootstrap.css";

import Tooltip from "@/base/Tooltip";

import NavBar from "@/base/NavBar";
import Icon from "@/base/Icon";
import Style from "./NavBarNode.less";

export default function NavBarNode(props) {
  const [iconBox, setIconBox] = useState([]);
  const [visibleTooltip, setVisibleTooltip] = useState(false);
  const goToSearch = useCallback(() => {
    console.log("this.is.goToSearch");
  }, []);
  const handleAction = useCallback(() => {
    setVisibleTooltip(true);
    console.log("handleAction");
  }, []);
  const clickMask = useCallback(() => {
    console.log("this.is clickMask");
    setVisibleTooltip(false);
  }, []);
  const actions = [
    { title: "title1", click: click1 },
    { title: "title2", click: click1 },
    { title: "title1", click: click1 },
  ];
  //   const align = { top: 10, left: -10 };
  const align = {};

  const rightMenu = [
    { icon: "icon-add", onClick: goToSearch },
    {
      icon: "icon-arrow-right",
      onClick: handleAction,
      visible: visibleTooltip,
      clickMask,
      overlay: <OverlayNode actions={actions} />,
      iconBox,
      align: align,
    },
  ];

  function click1() {
    console.log("this.is actions click1");
  }

  const history = useHistory();
  const onBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const ref = useCallback((node) => {
    if (node) {
      setIconBox(node);
    }
  }, []);

  return (
    <NavBar
      left={<Icon icon={"icon-arrow-right"} onClick={onBack} />}
      title={"this.is.NavBar"}
      right={<RightContent list={rightMenu} iconBox={iconBox} ref={ref} />}
    />
  );
}

function RightContentBase(props, ref) {
  const [search, menu] = props.list;
  // 外层设置了 flex-direction: row-reverse 导致 排列是反的
  return (
    <Fragment>
      <Tooltip
        visible={menu.visible}
        clickMask={menu.clickMask}
        overlay={menu.overlay}
        align={menu.align}
        iconBox={props.iconBox}
      >
        <div ref={ref} className={Style.rightIcon}>
          <Icon icon={menu.icon} onClick={() => menu.onClick()} />
        </div>
      </Tooltip>
      <div className={Style.rightIcon}>
        <Icon icon={search.icon} onClick={() => search.onClick()} />
      </div>
    </Fragment>
  );
}

const RightContent = forwardRef(RightContentBase);

function OverlayNode(props) {
  return (
    <ul className={Style.ul}>
      {props.actions.map((item, index) => {
        return (
          <li onClick={() => item.click()} className={Style.li} key={index}>
            {item.title}
          </li>
        );
      })}
    </ul>
  );
}
