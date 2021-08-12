export const mode = {
  sequence: "sequence",
  loop: "loop",
  one: "one",
  random: "random",
};
export const ActionTypes = {
  ToggleSiderBar: "ToggleSiderBar",
  SetActions: "SetActions", // 设置顶部页面 actions ,根据 page url 以及 page 下的tab[page下的tab如何融入路由层，# or ?]
  TogglePlaying: "TogglePlaying",
  SetPlayMode: "SetPlayMode",
  SetPlayList: "SetPlayList",
};
// 先把功能呢实现 再考虑 代码组织方式

export const ToggleSiderBar = (bool) => ({
  type: ActionTypes.ToggleSiderBar,
  bool: !bool,
});

export const SetActions = (actions) => ({
  type: ActionTypes.SetActions,
  actions,
});
export const TogglePlaying = () => ({
  type: ActionTypes.TogglePlaying,
});

export const SetPlayMode = (mode) => ({
  type: ActionTypes.SetPlayMode,
  mode,
});
