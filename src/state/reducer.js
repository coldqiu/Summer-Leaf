import { ActionTypes } from "./action";

import { mode } from "./action";

const initialState = {
  bool: false,
  actions: [],
  isLock: true, // 锁定Tab content的滚动
  currentSong: {},
  currentSinger: {},
  isPlaying: false,
  playMode: mode.sequence, // sequence loop one random
  playList: [], // playMode 即 playList; 生成对应mode的playList 放在reducer内
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ToggleSiderBar: {
      return {
        ...state,
        bool: !state.bool,
      };
    }
    case ActionTypes.SetActions: {
      return {
        ...state,
        actions: action.actions,
      };
    }
    case ActionTypes.TogglePlaying: {
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    }
    case ActionTypes.SetPlayMode: {
      return {
        ...state,
        playMode: action.mode,
      };
    }

    default:
      return state;
  }
}
