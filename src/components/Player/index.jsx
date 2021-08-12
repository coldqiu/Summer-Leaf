import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Style from "./index.less";
export default function MPlayer(props) {
  const isPlaying = useSelector((state) => state.isPlaying);
  return <div className={Style.playerWrap}></div>;
}
