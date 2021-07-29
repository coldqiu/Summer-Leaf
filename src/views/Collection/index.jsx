// import Header from "../../components/Header";
// import TabList from "../../components/TabList";
import { useCallback, Fragment } from "react";
import { useHistory } from "react-router";

import NavBar from "@/base/NavBar";
import Icon from "@/base/Icon";
import Style from "./index.less";

export default function Collection(props) {
  const goToSearch = useCallback(() => {
    // history.push("/song");
    console.log("this.is.goToSearch");
  }, []);
  const rightMenu = [
    { icon: "icon-add", onClick: goToSearch },
    { icon: "icon-add", onClick: goToSearch },
  ];
  const history = useHistory();
  console.log("history", history);
  const onBack = useCallback(() => {
    history.goBack();
  }, []);
  return (
    <div className={Style.collection}>
      {/* <Header title={"Collection"} /> */}
      {/* <TabList /> */}
      <h1>Collection</h1>
      <NavBar
        left={<Icon icon={"icon-arrow-right"} onClick={onBack} />}
        title={"this.is.NavBar"}
        right={<RightContent list={rightMenu} />}
      />
    </div>
  );
}

function RightContent(props) {
  return (
    <Fragment>
      {props.list.map((item, index) => {
        return (
          <Icon
            icon={item.icon}
            onClick={() => item.onClick()}
            key={index}
            className={Style.rightIcon}
          />
        );
      })}
    </Fragment>
  );
}

// function Title(props) {
//   return;
// }
