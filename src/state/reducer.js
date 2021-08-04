import { ActionTypes } from "./action";

const initialState = {
  bool: false,
  actions: [],
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
    default:
      return state;
  }
}
