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

// 每个页面下的tab 都有详情页， 是否可以将详情页，从页面内拿出来；让URL简洁好看点；
// 当前song页下的detail依赖了song页组件<TabList>中的点击事件传递的信息（dom大小位置，和item.id）以及一个控制 Detail visible的变量

export default function Song(props) {
  const appRef = useContext(AppContext);
  const [preScrollTop, setPreScrollTop] = useState(0); // 上一次滚动事件触发的 scrollTop, 用于检测滚动方向
  const [translateY, setTranslateY] = useState(0);
  const cache = useRef({ position: null, item: null });
  const history = useHistory();
  const [detailVisible, setDetailVisible] = useState("visible");
  const dispatch = useDispatch();
  let currentTab = useSearchParam("tab") || "song";
  const contentRef = useRef(null);
  const tabRef = useCallback((node) => {
    if (node) {
      contentRef.current = node;
    }
  }, []);
  // 待处理：初始状态的 tabs 页不能触发虚拟列表不能向下动，导致顶部fixed动画效果失效；
  // AlloyFinger 和 虚拟列表的滚动不同时存在，how
  // 顶部存在 fixed效果时 不触发虚拟列表的滚动；

  // 使用contentRef 的offsetParent 添加 pressMove 事件，在 translateY < 0 时 响应 顶部fixed效果并 禁止虚拟列表的滚动；

  const { width: htmlClientWidth } = useWindowSize();
  const [isFirstScroll, setIsFirstScroll] = useState(true);
  const navBarCellHeight = ((100 / 75) * htmlClientWidth) / 10;
  let virtualListScroll = useCallback(
    (scrollTop, e, virtualListRef) => {
      console.log(
        "virtualListScroll：scrollTop, preScrollTop, transLateY",
        scrollTop,
        preScrollTop,
        translateY
      );
      // handlePressMove();
      // onScroll 设置了passive: true 不可以调用preventDefault
      // 多个tab页的滚动都会影响 顶部的fixed效果

      // 切换 tabs 页的第一个滚动 仅设置preScrollTop
      if (isFirstScroll) {
        setPreScrollTop(scrollTop);
        setIsFirstScroll(false);
        return;
      }

      setPreScrollTop(scrollTop);
      let direction = scrollTop - preScrollTop; // 滚动方向 滚动多少
      let distance = translateY - direction < 0 ? translateY - direction : 0;
      setTranslateY(Math.abs(distance) < navBarCellHeight ? distance : -navBarCellHeight);
      appRef.current.style.transform = `translate(0, ${translateY}px)`;
    },
    [appRef, navBarCellHeight, preScrollTop, translateY, isFirstScroll]
  );

  const handlePressMove = useCallback(
    (evt) => {
      // 下拉加载跟多 也可能用的上
      console.log("evt", evt.deltaY);
      console.log("evt", evt);
      // 向上 的PressMove 在fixed效果下 禁用虚拟列表的滚动；
      // 向下 的PressMove 在fixed效果下 禁止虚拟列表滚动，
      // fixed效果结束时 必须顺滑过渡到 虚拟列表下滑；
      // fixed效果和虚拟列表下拉都结束时 做加载更多动画;

      // AlloyFinger 底层用四个touch事件 组合模拟了 多个手势
      const { top } = appRef.current.getBoundingClientRect();
      console.log("contentRef.current", contentRef.current);
      console.log(
        "contentRef.current.layout.children[2].children[0]",
        contentRef.current.layout.children[2].children[0]
      );

      if (top > -navBarCellHeight && top < 0) {
        console.log("session 1 top:", top);
        contentRef.current.layout.children[2].children[0].children[0].children[0].style.overflow =
          "hidden";

        // 这个设置 阻止了
        // evt.stopPropagation();
        // evt.stopImmediatePropagation();
        // contentRef.current.children[0].children[0];
      } else {
        // contentRef.current.children[0].children[0].style.overflow = "hidden";
        // console.log(
        //   "contentRef.current.children[0].children[0]",
        //   contentRef.current.children[0].children[0].style.overflow
        // );
      }
      console.log("evt.deltaY", evt.deltaY);

      if (evt.deltaY > 0) {
        // evt.stopPropagation();
        console.log("top", top);
        if (top < 0 && top >= -navBarCellHeight) {
          let done =
            top + evt.deltaY > -navBarCellHeight ? top + evt.deltaY : -navBarCellHeight;
          appRef.current.style.transform = `translate(0, ${done}px)`;
          setTranslateY(done);
        }
      }
    },
    [appRef, navBarCellHeight]
  );

  useEffect(() => {
    console.log("this.is useEffect");
    // let fingerInstance = new AlloyFinger(contentRef.current.offsetParent, {});
    let fingerInstance = new AlloyFinger(contentRef.current.layout, {});
    fingerInstance.on("pressMove", handlePressMove);
    // return fingerInstance.destroy();
    // 这样拿到的 translate
  }, [contentRef, htmlClientWidth, handlePressMove]);

  useEffect(() => {
    // console.log("currentTab:", currentTab);
    // console.log("contentRef.current", contentRef.current.layout);
  }, [currentTab]);

  //

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

  const onTabClick = useCallback((tab, index) => {
    // console.log("onTabClick", tab, index);
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
      setIsFirstScroll(true);
      console.log("onChange translateY", translateY);
      //  切换tabs 时的translateY 会被重置为 0 !? why
    },
    [history, dispatch]
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
