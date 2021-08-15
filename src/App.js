import { Suspense, useRef, createContext } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import routers from "./router/index.js";

// import NavBarCell from "@/components/NavBarCell.jsx";
import MSiderBar from "./components/Sidebar/index.js";

// import MPlayer from "./components/Player/index.js";

import "./App.css";

export const AppContext = createContext(null);
function App() {
  const ref = useRef(null);

  // const [dom, setDom] = useState(null);
  // const ref = useCallback((node) => {
  //   if (node) {
  //     setDom(node);
  //   }
  // });
  return (
    <div className="App" ref={ref}>
      <AppContext.Provider value={ref}>
        <BrowserRouter>
          <MSiderBar />
          {/* <NavBarCell /> */}
          <Suspense fallback={<h1>loading</h1>}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/song" />} />
              {routers.map((item) => {
                return (
                  <Route component={item.component} path={item.path} key={item.name} exact={item.exact || false} />
                );
              })}
            </Switch>
          </Suspense>
        </BrowserRouter>
      </AppContext.Provider>
      {/* <MPlayer /> */}
    </div>
  );
}

export default App;
