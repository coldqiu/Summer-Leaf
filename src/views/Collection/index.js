import Header from "../../components/Header";
import TabList from "../../components/TabList";
import Style from "./index.less";

export default function Collection(porps) {
  return (
    <div className={Style.collection}>
      <Header title={"Collection"} />
      <TabList />
      <h1>Collection</h1>
    </div>
  );
}
