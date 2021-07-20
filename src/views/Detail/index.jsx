import React, { useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import { useParams, useLocation } from "react-router";
import { GridItem } from "../../base/gird";

import { songList } from "../../mock/list";

// import Style from "./index.less";

export default function Detail(props) {
  console.log("Detail props", props);
  const [inProp, setInProp] = useState(true);
  const [transitionStyles, setTransitionStyles] = useState({
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0.6 },
    exited: { opacity: 0.3 },
  });
  const params = useParams();
  const location = useLocation();
  console.log("params", params);
  const [x, y] = location.state;
  const item = songList.filter((item) => item.id === parseInt(params.id))[0];
  const endCss = {
    transition: `translate(${x}px, ${y}px)`,
  };
  console.log("endCss", endCss);
  // var transitionStyles;
  useEffect(() => {
    setTransitionStyles({
      entering: { opacity: 1, ...endCss },
      entered: { opacity: 1, ...endCss },
      exiting: { opacity: 0.6 },
      exited: { opacity: 0.3 },
    });
  }, [inProp]);

  function onExit() {
    setInProp(false);
  }
  return (
    <div>
      <Transition in={inProp} onExit={onExit} timeout={80}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
              ...endCss, // 失效，why, 时机？！
            }}
          >
            {/* 禁止GridItem 点击事件 */}
            <GridItem item={item} noClick={true} />
            <h1>Detail</h1>
            <h1>{endCss.transition}</h1>
          </div>
        )}
      </Transition>
      <button onClick={() => setInProp((bool) => !bool)}>click</button>
    </div>
  );
}

const duration = 3000;

const defaultStyle = {
  // transition: `all ${duration}ms ease-in-out`,
  background: "rgba(0,0,0,0.01)",
  // transition 支持部分css属性 https://www.wodecun.com/blog/8036.html，
};

// const transitionStyles = {
//   entering: { opacity: 1 },
//   entered: { opacity: 1 },
//   exiting: { opacity: 1 },
//   exited: { opacity: 0.3 },
// };

// export default withRouter(Detail);
