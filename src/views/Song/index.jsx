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
  const pageRef = useRef(null);

  const { width: htmlClientWidth } = useWindowSize();

  const navBarCellHeight = ((100 / 75) * htmlClientWidth) / 10;
  console.log("navBarCellHeight", navBarCellHeight);
  const [isFirstScroll, setIsFirstScroll] = useState(true);

  const handlePressMove = useCallback(
    (evt) => {
      // 下拉加载更多 也可能用的上
      // 无法禁止　虚拟列表滚动
      // fixed效果结束时 必须顺滑过渡到 虚拟列表下滑；
      // fixed效果和虚拟列表下拉都结束时 做加载更多动画;
      // AlloyFinger 底层用四个touch事件 组合模拟了 多个手势
      // 因为virtualListScroll的滚动是阻止不了的
      // handlePressMove 处理向下滑动时的 fixed 效果
      // virtualListScroll 处理向下滑动的 fixed效果
      // translateY 是两者共同维护的
      let { top } = appRef.current.getBoundingClientRect();
      // top 虽然是 translateY的值 但是直接使用造成 递归调用 handlePresMove,因为 调用了setTranslateY(done);
      console.log("PressMove", evt, top);
      top = parseInt(parseFloat(top).toFixed(2));

      console.log("top", top);

      if (top === 0 && preScrollTop === 0) {
        // trouble 下拉
        console.log("trouble");
      }

      if (top <= 0 && top >= -navBarCellHeight) {
        console.log("evt.deltaY", evt.deltaY);
        console.log(" top + evt.deltaY", top + evt.deltaY);
        let done =
          top + evt.deltaY > 0 ? 0 : top + evt.deltaY > -navBarCellHeight ? top + evt.deltaY : -navBarCellHeight;
        appRef.current.style.transform = `translate(0, ${done}px)`;
        console.log("don", done);
        setTranslateY(done);
        // 初始页面 向下滑动再向上滑动 fixed效果结束后 虚拟列表依然不滚动；
        // 需要一个释放 handlePress 的时机；以及绑定 hanldePrss的时机？
        // pressMove的触发频率 远高于 虚拟列表的滚动事件
        // 当前的问题感觉 处理不了了
        // 要是虚拟列表组件支持下拉加载更多这种 事件就好了向外暴露了 下拉的距离
        // 既可以实现fixed效果，也能在切换tab时处理fixed效果
      }
    },
    [appRef, navBarCellHeight, preScrollTop]
  );
  const tabRef = useCallback(
    (node) => {
      if (node) {
        contentRef.current = node;
        let fingerInstance = new AlloyFinger(node.layout, {});
        fingerInstance.on("pressMove", handlePressMove);
      }
    },
    [handlePressMove]
  );
  // 待处理：初始状态的 tabs 页不能触发虚拟列表不能向下动，导致顶部fixed动画效果失效；
  // AlloyFinger 和 虚拟列表的滚动不同时存在，how
  // 顶部存在 fixed效果时 不触发虚拟列表的滚动；

  // 使用contentRef 的offsetParent 添加 pressMove 事件，在 translateY < 0 时 响应 顶部fixed效果并 禁止虚拟列表的滚动；

  let virtualListScroll = useCallback(
    (scrollTop, e, virtualListRef) => {
      // onScroll 设置了passive: true 不可以调用preventDefault
      console.log("scscrollTop, e, virtualListRef", scrollTop, e, virtualListRef, true);
      // console.log(virtualListRef.current.rootNode);
      // function handler(e) {
      //   console.log("handler e", e);
      //   // e.preventDefault();
      //   // e.stopImmediatePropagation();
      //   // e.stopPropagation();
      // }
      // virtualListRef.current.rootNode.offsetParent.addEventListener("scroll", handler, true);
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

  const onTabClick = useCallback((tab, index) => {}, []);
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
          <CSSTransition in={props.match != null} timeout={500} classNames="page" unmountOnExit onExit={onExit}>
            <Detail {...props} state={cache.current.position} item={cache.current.item} visible={detailVisible} />
          </CSSTransition>
        )}
      </Route>
    </div>
  );
}

// export default forwardRef(Song);
