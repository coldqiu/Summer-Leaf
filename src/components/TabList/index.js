import React, { forwardRef } from "react";
import { Tabs } from "rmc-tabs";
import Style from "./index.less";
import "./tab.css";
import "rmc-tabs/assets/index.css";

// console.log("DefaultTabBar", <DefaultTabBar></DefaultTabBar>);
export function MyList({ tabs, onTabClick, onChange, activeTab }, ref) {
  return (
    <Tabs
      tabs={tabs}
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
      // ref={ref}
      // activeTab={activeTab}
      page={activeTab}
    >
      {tabs.map((item) => {
        return (
          <div key={item.key} className={Style.content} ref={ref}>
            <item.component {...item.comProps} />
          </div>
        );
      })}
    </Tabs>
  );
}

export default forwardRef(MyList);

const tabsBar = {
  width: "600px",
  background: "deepskyblue",
};

// tabBarTextStyle
const tabBarUnderlineStyle = {
  background: "deepskyblue",
};
