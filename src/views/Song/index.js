import TabList from "../../components/TabList";
import Style from "./index.less";
import Grid from "../../base/gird.jsx";
import { songList, singerList, albumnList } from "../../mock/list";
// Grid 里的组件添加 Transition 不方便，no base
export default function Song(porps) {
  const tabs = [
    { key: "t1", title: "t1", component: Grid, comProps: { list: songList } },
    { key: "t2", title: "t2", component: Grid, comProps: { list: singerList } },
    { key: "t3", title: "t3", component: Grid, comProps: { list: albumnList } },
  ];
  return (
    <div className={Style.song}>
      <TabList tabs={tabs}></TabList>
    </div>
  );
}
