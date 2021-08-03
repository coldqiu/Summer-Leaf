// action 和 页面 页面内的Tab 两级限定
// 提出可复用的操作；
// 将页面各自的 redux 操作放在各自目录下；
const sortActions = [{ title: "A-Z" }, { title: "Z-A" }];

export const actions = {
  song: [{ title: "song" }, { title: "排序" }, { title: "添加到" }, { title: "音效" }],
  singer: [
    { title: "singer" },
    { title: "排序", actions: sortActions },
    { title: "添加到" },
    { title: "音效" },
  ],
  albumn: [
    { title: "albumn" },
    { title: "排序" },
    { title: "添加到" },
    { title: "音效" },
  ],
};
