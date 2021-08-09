import { useCallback, useRef, useState, forwardRef, useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { useSearchParam, useScroll, useToggle, useLockBodyScroll } from "react-use";

import TabList from "../../components/TabList";
import Style from "./index.less";
import Grid from "../../base/gird.jsx";
import { songList, singerList, albumnList } from "../../mock/list";
import useLockElementScroll from "../../hooks/useLockElementScroll";

import { SetActions } from "../../state/action";
import { actions } from "./config";
import Detail from "../Detail";
import { AppContext } from "@/App.js";

// 每个页面下的tab 都有详情页， 是否可以将详情页，从页面内拿出来；让URL简洁好看点；
// 当前song页下的detail依赖了song页组件<TabList>中的点击事件传递的信息（dom大小位置，和item.id）以及一个控制 Detail visible的变量

export default function Song(props) {
  const appRef = useContext(AppContext);
  console.log("appRef", appRef);

  const [locked, toggleLocked] = useToggle(true);

  useLockElementScroll(locked);
  const cache = useRef({ position: null, item: null });
  const history = useHistory();
  const [detailVisible, setDetailVisible] = useState("visible");
  const dispatch = useDispatch();
  let currentTab = useSearchParam("tab") || "song";
  const contentRef = useRef(null);
  const tabRef = useCallback((node) => {
    if (node) {
      console.log("tabcontentRef node", node.children[0].children[0]);
      contentRef.current = node;
    }
  });
  const { x, y } = useScroll(appRef);
  console.log("body x y", x, y);
  useEffect(() => {
    // console.log(contentRef.current.children[0].children[0])
    console.log("locked", locked);
    locked
      ? (contentRef.current.children[0].children[0].style.overflow = "hidden")
      : (contentRef.current.children[0].children[0].style.overflow = "auto");

    console.log(
      "contentRef.current.children[0].children[0].style.overflow",
      contentRef.current.children[0].children[0]
      // 拿到的是是渲染中某个最初时刻的 dom ,不是 实时的；
    );
  }, [locked, contentRef]);

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
      comProps: { list: songList.list, click: (item, pos) => onClick(item, pos) },
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
      dispatch(SetActions(actions[tab.title]));
    },
    [history]
  );

  const pageRef = useRef(null);
  return (
    <div className={Style.song} ref={pageRef}>
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

// export default forwardRef(Song);
