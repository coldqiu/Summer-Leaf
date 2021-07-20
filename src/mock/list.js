function getImg(imgName) {
  return require(`@/assets/img/${imgName}.jpg`).default;
}
export const songList = [
  {
    title: "song A",
    coverPic: getImg(3),
    info: {
      title: "title 123456789032343531111333",
      left: "left xx xxyyxxyyxxzasdfaasdf",
      right: "2歌曲",
    },
  },
  {
    title: "B",
    coverPic: getImg(3),
    info: {
      title: "title",
      left: "left xx",
      right: "right yy",
    },
  },
  {
    title: "C",
    coverPic: getImg(3),
    info: {
      title: "title",
      left: "left xx",
      right: "right yy",
    },
  },
  {
    title: "D",
    coverPic: getImg(3),
  },
];

export const singerList = [
  {
    title: "singer A",
    coverPic: getImg(2),
  },
  {
    title: "B",
    coverPic: getImg(2),
  },
  {
    title: "C",
    coverPic: getImg(2),
  },
  {
    title: "D",
    coverPic: getImg(2),
  },
];

export const albumnList = [
  {
    title: "albumn A",
  },
  {
    title: "B",
  },
  {
    title: "C",
  },
];
