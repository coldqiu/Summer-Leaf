import { ActionTypes } from "./action";

const initialState = {
  bool: false,
  actions: [],
  isLock: true, // 锁定Tab content的滚动
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
    case ActionTypes.SetLuckStatus: {
      return {
        ...state,
        actions: action.actions,
      };
    }
    default:
      return state;
  }
}
