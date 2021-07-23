import { useCallback, useRef } from "react";
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

  const onClick = useCallback((item, pos) => {
    // setPosition(pos);
    // setItem(item);
    cache.current = { position: pos, item };
    history.push(`/${item.type}/${item.id}`, pos);
  });

  const onExit = useCallback((e) => {
    const { position } = cache.current;
    const dom = e.children[0].children[0];
    dom.style.width = `${position[2]}px`;
    dom.style.height = `${position[3]}px`;
    dom.style.transform = `translate(${position[0]}px, ${position[1]}px)`;
    dom.style.transition = `all 0.45s cubic-bezier(.56,.4,.3,1)`;
    // dom.children[0].style.height = "50vw";
  }, []);
  function onBack() {
    history.push(`/song`);
  }
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

      <Route path={"/song/:id"} exact={false}>
        {(props) => (
          <CSSTransition
            in={props.match != null}
            timeout={500}
            classNames="page"
            unmountOnExit
            onExit={onExit}
          >
            {/* <div className="page"> */}
            <Detail {...props} state={cache.current.position} item={cache.current.item} />
            {/* </div> */}
          </CSSTransition>
        )}
      </Route>

      <button style={{ marginTop: "200px" }} onClick={() => onBack()}>
        back
      </button>
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
