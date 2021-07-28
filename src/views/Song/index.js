import { useCallback, useRef, useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import TabList from "../../components/TabList";
import Style from "./index.less";
import Grid from "../../base/gird.jsx";
import { songList, singerList, albumnList } from "../../mock/list";

import Detail from "../Detail";
// 路由动画能实现的根本原因 `Route render: func` 无论路由是否匹配，函数都会运行
export default function Song(porps) {
  // const [position, setPosition] = useState(null);
  // const [item, setItem] = useState(null);
  const cache = useRef({ position: null, item: null });
  const history = useHistory();
  console.log("song history", history);
  const [detailVisible, setDetailVisible] = useState("visible");

  const onClick = useCallback((item, pos) => {
    // setPosition(pos);
    // setItem(item);
    cache.current = { position: pos, item };
    history.push(`/${item.type}/${item.id}`, pos);
    // 仅入detail前 使detail可见
    setDetailVisible("visible");
  });

  const onExit = useCallback((e) => {
    const { position } = cache.current;
    const dom = e.children[0].children[0];

    dom.style.width = `${position[2]}px`;
    dom.style.height = `${position[3]}px`;
    dom.style.transform = `translate(${position[0]}px, ${position[1]}px)`;
    dom.style.transition = `all 25s cubic-bezier(.56,.4,.3,1)`;
    // dom.children[0].style.height = "50vw";

    // 隐藏 Detail 页中出去 img 之外的dom visibility
    e.style.visibilty = "hidden";
    setDetailVisible("hidden");
    // 返回 song 需将 detailVisible 置为 visible, 或者说 进入detail前，
  }, []);

  const tabs = [
    {
      key: "t1",
      title: "t1",
      component: Grid,
      comProps: { list: songList, click: (item, pos) => onClick(item, pos) },
    },
    { key: "t2", title: "t2", component: Grid, comProps: { list: singerList } },
    { key: "t3", title: "t3", component: Grid, comProps: { list: albumnList } },
  ];
  return (
    <div className={Style.song}>
      <TabList tabs={tabs}></TabList>

      {/* <Route path={"/song/:id"} component={Detail} exact={false}></Route> */}
      {detailVisible}

      <Route path={"/song/:id"} exact={false}>
        {(props) => (
          <CSSTransition
            in={props.match != null}
            timeout={50000000}
            classNames="page"
            unmountOnExit
            onExit={onExit}
          >
            {/* <div className="page"> */}
            <Detail
              {...props}
              state={cache.current.position}
              item={cache.current.item}
              visible={detailVisible}
              // className={Style[detailVisible]}
            />

            {/* </div> */}
          </CSSTransition>
        )}
      </Route>
    </div>
  );
}
{
  /* <TabList>
        <Grid key={"song"} list={songList}></Grid>
        <Grid key={"singer"}></Grid>
        <Grid key={"albumn"}></Grid>
      </TabList> */
}
