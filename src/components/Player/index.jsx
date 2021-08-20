import { useState, useEffect, useCallback, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";

import "./player.css";
// 参考代码
// https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
import Style from "./index.less";
export default function MPlayer(props) {
  // player作为全局组件，内部数据 暂不考虑存 redux;
  // const isPlaying = useSelector((state) => state.isPlaying);
  // const dispatch = useDispatch();
  // playlist
  const [tracks, setTracks] = useState([]);
  // const tracks = [
  //   {
  //     title: string,
  //     artist: string,
  //     albumn: string,
  //     audioSrc: string | import,
  //     image: string,
  //     color: string,
  //   },
  //   ...
  //   ...
  // ];
  const [trackIndex, setTrankIndex] = useState(0);
  const { title, artist, color, image, audioSrc } = tracks[trackIndex];
  const [trackProgress, setTrankProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Refs
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
      clearInterval(intervalRef);
    }
  }, [isPlaying]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  // 在开始播放时 设置定时器
  // 定时检测是否播放完毕
  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  // Handle setup when changing tracks
  // isReady 应该监听 <audio /> 的ready事件
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  // 进度条相关变量
  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };
  const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  // 更改背景颜色
  return (
    <div className="audio-player">
      <div className="track-info">
        <img className="artwork" src={image} alt={`track artwork for ${title} by ${artist}`} />
        <h2 className="title">{title}</h2>
        <h3 className="artist">{artist}</h3>
      </div>
      {/* 进度条 */}
      <input
        type="range"
        value={trackProgress}
        step="1"
        min="0"
        max={duration ? duration : `${duration}`}
        className="progress"
        onChange={(e) => onScrub(e.target.value)}
        onMouseUp={onScrubEnd}
        onKeyUp={onScrubEnd}
        style={{ background: trackStyling }}
      />
      <AudioControls
        isPlaying={isPlaying}
        onPrevClick={toPrevTrack}
        onNextClick={toNextTrack}
        onPlayPauseClick={setIsPlaying}
      />
    </div>
  );
}

const AudioControls = ({ isPlaying, onPlayPauseClick, onPrevClick, onNextClick }) => {
  return (
    <div className="audio-controls">
      <button type="button" className="prev" aria-label="Previous" onClick={onPrevClick}>
        <Prev />
      </button>
      {isPlaying ? (
        <button type="button" className="pause" onClick={() => onPlayPauseClick(false)} aria-label="Pause">
          <Pause />
        </button>
      ) : (
        <button type="button" className="play" onClick={() => onPlayPauseClick(true)} aria-label="Play">
          <Play />
        </button>
      )}
      <button type="button" className="next" aria-label="Next" onClick={onNextClick}>
        <Next />
      </button>
    </div>
  );
};
