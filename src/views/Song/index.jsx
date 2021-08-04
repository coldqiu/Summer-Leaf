import { useCallback, useEffect, useRef, useState, useLayoutEffect } from "react";
import { Route, useHistory, useLocation } from "react-router-dom";
// import { useLocation } from "react-router";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { useSearchParam, useMount } from "react-use";

import TabList from "../../components/TabList";
import Style from "./index.less";
import Grid from "../../base/gird.jsx";
import { songList, singerList, albumnList } from "../../mock/list";

import { SetActions } from "../../state/action";
import { actions } from "./config";

// 每个页面下的tab 都有详情页， 是否可以将详情页，从页面内拿出来；让URL简洁好看点；
// 当前song页下的detail依赖了song页组件<TabList>中的点击事件传递的信息（dom大小位置，和item.id）

import Detail from "../Detail";
// 路由动画能实现的根本原因 `Route render: func` 无论路由是否匹配，函数都会运行
export default function Song(porps) {
  const cache = useRef({ position: null, item: null });
  const history = useHistory();
  // console.log("song history", history);
  const [detailVisible, setDetailVisible] = useState("visible");
  const location = useLocation();
  const dispatch = useDispatch();
  let currentTab = useSearchParam("tab") || "song";
  const tabRef = useRef(null);
  console.log("currentTab", currentTab);
  // debugger;
  // 默认song, tab变化反应在路由上，暂时放在 查询条件上， 但和当前详情页的 param 形式冲突；

  const onClick = useCallback(
    (item, pos) => {
      cache.current = { position: pos, item };
      history.push(`/${item.type}/${item.id}`, pos);
      // 仅入detail前 使detail可见
      setDetailVisible("visible");
    },
    [history]
  );

  const onExit = useCallback((e) => {
    const { position } = cache.current;
    console.log("e", e);
    const dom = e.children[0].children[0];

    dom.style.width = `${position[2]}px`;
    dom.style.height = `${position[3]}px`;
    dom.style.transform = `translate(${position[0]}px, ${position[1]}px)`;
    dom.style.transition = `all 0.5s cubic-bezier(.56,.4,.3,1)`;

    // 隐藏 Detail 页中出去 img 之外的dom visibility
    e.style.visibilty = "hidden";
    setDetailVisible("hidden");
    // 返回 song 需将 detailVisible 置为 visible, 或者说 进入detail前，
  }, []);

  const tabs = [
    {
      key: "song",
      title: "song",
      component: Grid,
      comProps: { list: songList, click: (item, pos) => onClick(item, pos) },
    },
    { key: "singer", title: "singer", component: Grid, comProps: { list: singerList } },
    { key: "albumn", title: "albumn", component: Grid, comProps: { list: albumnList } },
  ];

  const onTabClick = useCallback((tab, index) => {
    console.log("onTabClick", tab, index);
  }, []);
  const titleToIndex = {
    song: 0,
    singer: 1,
    albumn: 2,
  };
  const currentTabIndex = titleToIndex[currentTab];
  const onChange = useCallback(
    (tab, index) => {
      history.push(`/song?tab=${tab.title}`);
    },
    [history]
  );
  return (
    <div className={Style.song}>
      <TabList
        tabs={tabs}
        onTabClick={(tab, index) => onTabClick(tab, index)}
        onChange={(tab, index) => onChange(tab, index)}
        activeTab={currentTabIndex}
        ref={tabRef}
      ></TabList>
      <Route path={"/song/:id"} exact={false}>
        {(props) => (
          <CSSTransition
            in={props.match != null}
            timeout={500}
            classNames="page"
            unmountOnExit
            onExit={onExit}
          >
            <Detail
              {...props}
              state={cache.current.position}
              item={cache.current.item}
              visible={detailVisible}
            />
          </CSSTransition>
        )}
      </Route>
    </div>
  );
}
