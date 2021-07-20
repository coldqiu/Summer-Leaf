import React, { Suspense } from "react";
import {
  BrowserRouter,
  Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import routers from "./router/index.js";

import MHeader from "./components/Header/index.js";
import MSiderBar from "./components/Sidebar/index.js";
import MPlayer from "./components/Player/index.js";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MSiderBar />
        <Suspense fallback={<h1>loading</h1>}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/song" />} />
            {routers.map((item) => {
              return (
                <Route
                  component={item.component}
                  path={item.path}
                  key={item.name}
                  exact={item.exact || false}
                />
              );
            })}
          </Switch>
        </Suspense>
      </BrowserRouter>
      {/* <MPlayer /> */}
    </div>
  );
}

export default App;
