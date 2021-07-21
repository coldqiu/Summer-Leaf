import { Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import TabList from "../../components/TabList";
import Style from "./index.less";
import Grid from "../../base/gird.jsx";
import { songList, singerList, albumnList } from "../../mock/list";

import MCSSTransition from "../../base/MCSSTransition";

// import Detail from "../Detail/CoypDetail";
import Detail from "../Detail";
import "./tmp.css";
// Grid 里的组件添加 Transition 不方便，no base
export default function Song(porps) {
  const tabs = [
    { key: "t1", title: "t1", component: Grid, comProps: { list: songList } },
    { key: "t2", title: "t2", component: Grid, comProps: { list: singerList } },
    { key: "t3", title: "t3", component: Grid, comProps: { list: albumnList } },
  ];
  return (
    <div className={Style.song}>
      {/* style={{ background: "transparent" }} */}
      <TabList tabs={tabs}></TabList>
      {/* <Route
        component={<Detail {...restProps} inProp={match != null}></Detail>}
        path={"/song/:id"}
        exact={false}
      /> */}

      {/* <Route path={"/song/:id"} exact={true}>
        {(props) => (
          <MCSSTransition
            in={props.match != null}
            timeout={300}
            classNames="page"
            unmountOnExit
            {...props}
          >
            <h1>Detail</h1>
          </MCSSTransition>
        )}
      </Route> */}

      <Route path={"/song/:id"} component={Detail} exact={false}></Route>
      {/* <Route
        path={"/song/:id"}
        render={(props) => <Detail tmp={props} />}
        exact={false}
      ></Route> */}
    </div>
  );
}

{
  /* <h1>Detail</h1> */
}
