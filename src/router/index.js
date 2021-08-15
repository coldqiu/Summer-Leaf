import { lazy } from "react";
const list = [
  {
    path: "/song",
    name: "song",
    component: lazy(() => import("../views/Song/index.jsx")),
    // children: [
    //   {
    //     path: "/:id",
    //     name: "song-detail",
    //     component: lazy(() => import("../views/Detail")),
    //   },
    // ],
  },
  {
    path: "/collection",
    name: "collection",
    component: lazy(() => import("../views/Collection/index.jsx")),
  },
  {
    path: "/search",
    name: "search",
    component: lazy(() => import("../views/Search/index.jsx")),
  },
  {
    path: "/song/:id",
    name: "detail",
    component: lazy(() => import("../views/Detail")),
  },
  {
    path: "/test",
    name: "test",
    component: lazy(() => import("../views/TEST/index.jsx")),
  },
];

export default list;
