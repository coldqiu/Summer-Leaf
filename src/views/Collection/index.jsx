// import Header from "../../components/Header";
// import TabList from "../../components/TabList";
import { useCallback, Fragment, useRef, forwardRef, useEffect, useState } from "react";
import { useHistory } from "react-router";

// import Tooltip from "rmc-tooltip";
// import "rmc-tooltip/assets/bootstrap.css";

import Tooltip from "@/base/Tooltip";

import NavBar from "@/base/NavBar";
import Icon from "@/base/Icon";
import Style from "./index.less";

export default function Collection(props) {
  const [position, setPosition] = useState([]);
  const [visibleTooltip, setVisibleTooltip] = useState(false);
  const goToSearch = useCallback(() => {
    // history.push("/song");
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
  ];
  // const align = { top: 10, right: 10 };
  // align 可以是 触发点击事件dom的位置,
  // 动态位置的tooltip 需要考虑更多边界条件，比如“碰撞检测” 元素超出视窗自动调整 元素位置 top right bottom left 模式,
  // 目前还不支持配置 "placement" 属性
  // const align = position;

  const rightMenu = [
    { icon: "icon-add", onClick: goToSearch },
    {
      icon: "icon-arrow-right",
      onClick: handleAction,
      visible: visibleTooltip,
      clickMask,
      overlay: <OverlayNode actions={actions} />,
      position,
    },
  ];

  function click1() {
    console.log("this.is actions click1");
  }

  const history = useHistory();
  console.log("history", history);
  const onBack = useCallback(() => {
    history.goBack();
  }, []);

  // const ref = useRef(null);
  // useEffect(() => {
  //   const { top, right, bottom, left } = ref.current.getBoundingClientRect();
  // });

  const ref = useCallback((node) => {
    if (node) {
      // const { top, right, bottom, left } = node.getBoundingClientRect();
      // setPosition([top, right, bottom, left]);
      setPosition(node.getBoundingClientRect());
    }
  }, []);

  return (
    <div className={Style.collection}>
      {/* <Header title={"Collection"} /> */}
      {/* <TabList /> */}
      {/* <h1>Collection</h1> */}
      <NavBar
        left={<Icon icon={"icon-arrow-right"} onClick={onBack} />}
        title={"this.is.NavBar"}
        right={<RightContent list={rightMenu} ref={ref} />}
      />
    </div>
  );
}

function RightContentBase(props, ref) {
  const [search, menu] = props.list;
  console.log("menu", menu);
  return (
    <Fragment>
      <div className={Style.rightIcon}>
        <Icon icon={search.icon} onClick={() => search.onClick()} />
      </div>

      <Tooltip
        visible={menu.visible}
        clickMask={menu.clickMask}
        overlay={menu.overlay}
        align={menu.align}
      >
        <div ref={ref} className={Style.rightIcon}>
          <Icon icon={menu.icon} onClick={() => menu.onClick()} />
        </div>
      </Tooltip>
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

{
  /* rmc-tooltip */
}
{
  /* <Tooltip
        placement={"bottomRight"}
        align={{ overflow: { adjustY: 0, adjustX: 0 }, offset: [20, -60] }}
        overlay={<span>tooltip</span>}
        arrowContent={null}
        mask={true}
      >
        <Icon
          icon={menu.icon}
          onClick={() => menu.onClick()}
          className={Style.rightIcon}
        />
      </Tooltip> */
}
