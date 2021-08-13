import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Style from "./index.less";
export default function MPlayer(props) {
  // const isPlaying = useSelector((state) => state.isPlaying);
  // const dispatch = useDispatch();
  const [trankIndex, setTrankIndex] = useState(0);
  const [trankProgress, setTrankProgress] = useState(0);
  return <div className={Style.playerWrap}></div>;
}
