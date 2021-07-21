import React, { useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { useParams, useLocation } from "react-router";

import { songList } from "../mock/list";

export default function MCSSTransition(props) {
  console.log("MCSSTransition props", props);
  //   const params = useParams();
  //   const location = useLocation();
  const params = props.match.params;
  const location = props.location;
  console.log("params", params);
  const [x, y, width, height] = location.state;
  const item = songList.filter((item) => item.id === parseInt(params.id))[0];

  const onEnter = useCallback((node, isAppearing) => {
    setTimeout(() => {
      console.log("onEnter", node, isAppearing);
      node.style.transform = `translate(0px, 0px)`;
      node.style.color = "blue";
      node.style.width = "100%";
      node.style.height = "100%";
      node.style.transition = "all 1s";
      console.log("node.stylenode.style", node.style);
    }, 0);
  }, []);
  const onExit = useCallback((node) => {
    console.log("onExit");
    node.style.transform = `translate(${x}px, ${y}px)`;
    node.style.color = "pink";
    node.style.width = width;
    node.style.height = height;
    node.style.transition = "all 1s";
  }, []);

  useEffect(() => {
    return console.log("beforeUnMount");
  });

  return (
    <CSSTransition
      in={props.inProp}
      appear={true}
      // classNames={"fade"}
      onEnter={onEnter}
      onExit={onExit}
      unmountOnExit={true}
      style={{
        color: "red",
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${x}px, ${y}px)`,
        transition: "all 6s",
        overflowY: "auto",
      }}
      timeout={80}
    ></CSSTransition>
  );
}
