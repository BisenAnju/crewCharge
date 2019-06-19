import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import LeaveEmployeeDashboardContainer from "./LeaveEmployeeDashboard";
import LeaveAdminDashboardContainer from "./LeaveAdminDashboard";

class LeaveDashboardContainer extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path={"/leavedashboard"}
              render={props => <LeaveEmployeeDashboardContainer {...props} />}
            />
            <Route
              exact
              path={"/leavedashboard/admin"}
              render={props => <LeaveAdminDashboardContainer {...props} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(LeaveDashboardContainer);
