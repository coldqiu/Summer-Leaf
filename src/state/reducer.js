import { ActionTypes } from "./action";

const initialState = {
  bool: false,
  // title: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ToggleSiderBar: {
      return {
        ...state,
        bool: !state.bool,
      };
    }
    default:
      return state;
  }
}
