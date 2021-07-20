import { lazy } from "react";
export default [
  // {
  //   path: "/counter",
  //   name: "counter",
  //   component: lazy(() => import("../hooks/counter.js")),
  // },
  {
    path: "/song",
    name: "song",
    component: lazy(() => import("../views/Song")),
  },
  {
    path: "/collection",
    name: "collection",
    component: lazy(() => import("../views/Collection")),
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: lazy(() => import("../views/Detail")),
  },
];
