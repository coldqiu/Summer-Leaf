//
import { useState, useRef } from "react";
import { useAudio } from "react-use";

export default function MA(props) {
  const [tracks, setTracks] = useState([]);
  const [tracksIndex, setTracksIndex] = useState(0);

  const [audio, state, controls, ref] = useAudio({
    src: "xxx-audio-source",
    autoPlay: true,
  });
  // auido 是<Auido />组件
  // state
  //   {
  //     "buffered": [], // AudioBuffer接口表示存在内存里的一段短小的音频资源
  //     "time": 0,
  //     "duration": 425.952625,
  //     "isPlaying": false,
  //     "muted": false, // 静音
  //     "volume": 0.1
  //   }
  //    对标签属性的封装
  //    controls: {
  //     pause, play, mute, unmute, volume(number), seek(number)
  //   }
  // ref 是对<Audio /> 组件的引用

  // 使用定时器检测是否播放完毕 vs 事件监听
  // 监听事件 以及 time 和 duration;
}
