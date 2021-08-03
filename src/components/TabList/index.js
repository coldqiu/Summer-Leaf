import React, { forwardRef } from "react";
import { Tabs } from "rmc-tabs";
import Style from "./index.less";
import "./tab.css";
import "rmc-tabs/assets/index.css";

// console.log("DefaultTabBar", <DefaultTabBar></DefaultTabBar>);
export function MyList({ tabs, onTabClick, onChange }, ref) {
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
        ref={ref}
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

export default forwardRef(MyList);

const tabsBar = {
  width: "600px",
  background: "deepskyblue",
};

// tabBarTextStyle
const tabBarUnderlineStyle = {
  background: "deepskyblue",
};
