import React from "react";
import { Tabs } from "rmc-tabs";
import Style from "./index.less";
import "./tab.css";
import "rmc-tabs/assets/index.css";

// console.log("DefaultTabBar", <DefaultTabBar></DefaultTabBar>);
export default function MyList({ tabs }) {
  function onTabClick(object) {}

  function onChange(object) {}

  return (
    <div>
      <Tabs
        tabs={tabs}
        initalPage={"t2"}
        onTabClick={onTabClick}
        onChange={onChange}
        tabBarPosition={"top"}
        swipeable={true}
        useOnPan={true}
        destroyInactiveTab={false}
        prerenderingSiblingsNumber={1}
        distanceToChangeTab={0.42}
        usePaged={true}
        tabDirection={"horizontal"}
        tabBarBackgroundColor={"deepskyblue"}
        tabBarActiveTextColor={"red"}
        tabBarTextStyle={tabsBar}
        tabBarUnderlineStyle={tabBarUnderlineStyle}
      >
        {tabs.map((item) => {
          return (
            <div key={item.key} className={Style.content}>
              <item.component {...item.comProps} />
            </div>
          );
        })}
      </Tabs>
    </div>
  );
}

// const tabsBar = (React.CSSProperties = {
//   width: "600",
//   background: "red",
// });

const tabsBar = {
  width: "600px",
  background: "deepskyblue",
};

// tabBarTextStyle
const tabBarUnderlineStyle = {
  background: "deepskyblue",
};
