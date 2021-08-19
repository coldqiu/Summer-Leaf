import { useCallback, useRef, useState, useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { useSearchParam, useWindowSize } from "react-use";

import TabList from "../../components/TabList";
import Style from "./index.less";
import Grid from "../../base/gird.jsx";
import { songList, singerList, albumnList } from "../../mock/list";
import AlloyFinger from "alloyfinger";

import { SetActions } from "../../state/action";
import { actions } from "./config";
import Detail from "../Detail";
import { AppContext } from "@/App.js";

export default function Song(props) {
  const appRef = useContext(AppContext);
  // const [fixedObject, setFixedObject] = useState({ scrollTop: 0, translateY: 0 });
  const fixedObject = useRef({ scrollTop: 0, translateY: 0 });
  let currentTab = useSearchParam("tab") || "song";
  const [isFirstScroll, setIsFirstScroll] = useState(true);
  const [detailVisible, setDetailVisible] = useState("visible");
  const history = useHistory();
  const dispatch = useDispatch();
  const cache = useRef({ position: null, item: null });
  //  onClick onExit
  const { width: htmlClientWidth } = useWindowSize();
  const navBarCellHeight = ((100 / 75) * htmlClientWidth) / 10;

  const handlePressMove = useCallback(
    (evt) => {
      console.log("handlePressMove evt", evt);
      // setFixedObject((object) => {
      //   let { translateY } = object;
      //   if (translateY <= 0 && translateY >= -navBarCellHeight) {
      //     let nextTranslateY =
      //       translateY + evt.deltaY > 0
      //         ? 0
      //         : translateY + evt.deltaY > -navBarCellHeight
      //         ? translateY + evt.deltaY
      //         : -navBarCellHeight;
      //     appRef.current.style.transform = `translate(0, ${nextTranslateY}px)`;
      //     return { ...object, translateY: nextTranslateY };
      //   }
      //   return { ...object };
      // });

      // 这些变量不用于页面渲染，用useRef
      let object = fixedObject.current;
      let { translateY } = object;
      let nextTranslateY;
      if (translateY <= 0 && translateY >= -navBarCellHeight) {
        nextTranslateY =
          translateY + evt.deltaY > 0
            ? 0
            : translateY + evt.deltaY > -navBarCellHeight
            ? translateY + evt.deltaY
            : -navBarCellHeight;
        appRef.current.style.transform = `translate(0, ${nextTranslateY}px)`;
      }

      fixedObject.current = { ...object, translateY: nextTranslateY };
    },
    [appRef, navBarCellHeight]
  );

  const tabRef = useCallback(
    (node) => {
      if (node && node.layout) {
        console.log("node", node, node.layout);
        // node 存在， node.layout 不存在
        let fingerInstance = new AlloyFinger(node.layout, {});
        fingerInstance.on("pressMove", handlePressMove);
      }
    },
    [handlePressMove]
  );

  const virtualListScroll = useCallback(
    (scrollTop) => {
      if (isFirstScroll) {
        setIsFirstScroll(false);
        return;
      }
      // setFixedObject((object) => { ...})
      let object = fixedObject.current;

      let deltaY = scrollTop - object.scrollTop;
      let nextTranslateY =
        object.translateY + deltaY > 0
          ? 0
          : object.translateY + deltaY > -navBarCellHeight
          ? object.translateY + deltaY
          : -navBarCellHeight;
      appRef.current.style.transform = `translate(0, ${nextTranslateY}px)`;

      fixedObject.current = { ...object, translateY: nextTranslateY };
    },
    [appRef, navBarCellHeight]
  );

  const titleToIndex = {
    song: 0,
    singer: 1,
    albumn: 2,
  };
  const currentTabIndex = titleToIndex[currentTab];

  const onChange = useCallback(
    (tab, index) => {
      history.push(`/song?tab?=${tab.title}`);
      dispatch(SetActions(actions[tab.title]));
      setIsFirstScroll(true);
    },
    [dispatch, history]
  );
  // 点击列表元素跳转 详情页
  const onClick = useCallback(
    (item, pos) => {
      cache.current = { position: pos, item };
      history.push(`/${item.type}/${item.id}`, pos);
      setDetailVisible("visible");
    },
    [history]
  );

  const onExit = useCallback((e) => {
    const { position } = cache.current;
    const dom = e.children[0].children[0];

    dom.style.width = `${position[2]}px`;
    dom.style.height = `${position[3]}px`;
    dom.style.transform = `translate(${position[0]}px, ${position[1]}px)`;
    dom.style.transition = `all 0.5s cubic-bezier(.56,.4,.3,1)`;

    // 隐藏 Detail 页中出去 img 之外的dom visibility
    e.style.visibilty = "hidden";
    setDetailVisible("hidden");
  }, []);

  // tabs组件配置
  const tabs = [
    {
      key: "song",
      title: "song",
      component: Grid,
      comProps: {
        list: songList.list,
        click: (item, pos) => onClick(item, pos),
        virtualListScroll,
      },
    },
    {
      key: "singer",
      title: "singer",
      component: Grid,
      comProps: {
        list: singerList.list,
        click: (item, pos) => onClick(item, pos),
        virtualListScroll,
      },
    },
    {
      key: "albumn",
      title: "albumn",
      component: Grid,
      comProps: {
        list: albumnList.list,
        click: (item, pos) => onClick(item, pos),
        virtualListScroll,
      },
    },
  ];

  return (
    <div className={Style.song}>
      <TabList
        tabs={tabs}
        onChange={(tab, index) => onChange(tab, index)}
        activeTab={currentTabIndex}
        ref={tabRef}
      ></TabList>
      <Route path={"/song/:id"} exact={false}>
        {(props) => (
          <CSSTransition in={props.match != null} timeout={500} classNames="page" unmountOnExit onExit={onExit}>
            <Detail {...props} state={cache.current.position} item={cache.current.item} visible={detailVisible} />
          </CSSTransition>
        )}
      </Route>
    </div>
  );
}
