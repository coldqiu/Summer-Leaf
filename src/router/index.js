import { lazy } from "react";
const list = [
  // {
  //   path: "/counter",
  //   name: "counter",
  //   component: lazy(() => import("../hooks/counter.js")),
  // },
  {
    path: "/song",
    name: "song",
    component: lazy(() => import("../views/Song/index.jsx")),
    children: [
      {
        // path: "/detail/:id",
        path: "/:id",
        name: "song-detail",
        component: lazy(() => import("../views/Detail")),
      },
    ],
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
  // {
  //   path: "/detail/:id",
  //   name: "detail",
  //   component: lazy(() => import("../views/Detail")),
  // },
];

export default list;
