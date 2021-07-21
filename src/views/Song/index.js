import { Route } from "react-router-dom";
import TabList from "../../components/TabList";
import Style from "./index.less";
import Grid from "../../base/gird.jsx";
import { songList, singerList, albumnList } from "../../mock/list";


import Detail from "../Detail";
export default function Song(porps) {
  const tabs = [
    { key: "t1", title: "t1", component: Grid, comProps: { list: songList } },
    { key: "t2", title: "t2", component: Grid, comProps: { list: singerList } },
    { key: "t3", title: "t3", component: Grid, comProps: { list: albumnList } },
  ];
  return (
    <div className={Style.song}>
      <TabList tabs={tabs}></TabList>
      <Route path={"/song/:id"} component={Detail} exact={false}></Route>
    </div>
  );
}


