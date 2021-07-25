export const ActionTypes = {
  ToggleSiderBar: "ToggleSiderBar",
};

export const ToggleSiderBar = (bool) => ({
  type: ActionTypes.ToggleSiderBar,
  bool: !bool,
});

// export const 

// export const ToggleSiderBar = {
//   type: ActionTypes.ToggleSiderBar,
//   // bool
// };
