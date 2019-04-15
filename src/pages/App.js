import React from "react";
import withMUI from "../hoc/withMUI";
import BottomNavigation from "../components/BottomNavigation";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DemoPage from "./Demo";
import * as ROUTES from "../constants/routes";
import Vehicles from "./Vehicles";
import Profile from "./Profile";
import withAuthentication from "../hoc/withAuthentication";

const exampleFunction = name => {
  alert(name);
};

const App = () => (
  <Router>
    <div>
      {/* <p>{lang("login.signInMessage")}</p> */}
      <h1>YourWheeler</h1>
      <hr />
      {/* Passing route a prop */}
      <Route
        path={`${ROUTES.EXPLORE}/:id`}
        render={props => (
          <DemoPage
            {...props}
            chingProp="Yahann jo bhi daal do"
            exampleFunction={exampleFunction}
          />
        )}
      />
      <Route
        path={`${ROUTES.VEHICLES}`}
        render={props => (
          <Vehicles
            {...props}
            chingProp="This displays a working list with add"
            exampleFunction={exampleFunction}
          />
        )}
      />
      <Route
        path={`${ROUTES.PROFILE}`}
        render={props => (
          <Profile
            {...props}
            chingProp="This displays Login and Logout with status"
            exampleFunction={exampleFunction}
          />
        )}
      />
      <BottomNavigation />
    </div>
  </Router>
);

export default withMUI(withAuthentication(App));
