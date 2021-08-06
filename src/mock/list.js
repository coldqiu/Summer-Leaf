import { string } from "bfj/src/events";

const Mock = require("mockjs");

function getImg(imgName) {
  return require(`@/assets/img/${imgName}.jpg`).default;
}
export const songList1 = [
  {
    id: 1,
    type: "song",
    title: "song A",
    coverPic: getImg(3),
    info: {
      title: "title 123456789032343531111333",
      left: "left xx xxyyxxyyxxzasdfaasdf",
      right: "2文章",
    },
  },
  {
    id: 2,
    type: "song",
    title: "B",
    coverPic: getImg(3),
    info: {
      title: "title",
      left: "left xx",
      right: "right yy",
    },
  },
  {
    id: 3,
    type: "song",
    title: "C",
    coverPic: getImg(3),
    info: {
      title: "title",
      left: "left xx",
      right: "right yy",
    },
  },
  {
    id: 4,
    type: "song",
    title: "D",
    coverPic: getImg(3),
  },
  {
    id: 5,
    type: "song",
    title: "song A",
    coverPic: getImg(3),
    info: {
      title: "title 123456789032343531111333",
      left: "left xx xxyyxxyyxxzasdfaasdf",
      right: "2文章",
    },
  },
  {
    id: 6,
    type: "song",
    title: "song A",
    coverPic: getImg(3),
    info: {
      title: "title 123456789032343531111333",
      left: "left xx xxyyxxyyxxzasdfaasdf",
      right: "2文章",
    },
  },
  {
    id: 7,
    type: "song",
    title: "song A",
    coverPic: getImg(3),
    info: {
      title: "title 123456789032343531111333",
      left: "left xx xxyyxxyyxxzasdfaasdf",
      right: "2文章",
    },
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

export const detailList = [
  {
    img: getImg(1),
    title: "title 1111111",
    left: "left xx xxyyxxyyxxzasdfaasdf",
    right: "1文章",
  },
  {
    img: getImg(2),
    title: "title 2222",
    left: "left xx xxyyxxyyxxzasdfaasdf",
    right: "2文章",
  },
  {
    img: getImg(3),
    title: "title 33",
    left: "left xx xxyyxxyyxxzasdfaasdf",
    right: "3文章",
  },
];

let template = {
  id: 1,
  type: "song",
  title: "song A",
  coverPic: getImg(3),
  info: {
    title: "title 123456789032343531111333",
    left: "left xx xxyyxxyyxxzasdfaasdf",
    right: "2文章",
  },
};

export const songList = Mock.mock({
  "list|100": [
    {
      "id|+1": 1,
      type: "@sentence",
      "title|": "@paragraph",
      // "coverPic|": getImg(parseInt(Math.random() * 7)),
      "coverPic|": getImg(3),
      "info|": {
        title: "@paragraph",
        left: "@name",
        "right|+1": 1,
      },
    },
  ],
});
