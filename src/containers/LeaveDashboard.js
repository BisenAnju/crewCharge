import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import LeaveEmployeeDashboardContainer from "./LeaveEmployeeDashboard";
import LeaveAdminDashboardContainer from "./LeaveAdminDashboard";
import withFirebase from "../hoc/withFirebase";

class LeaveDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      purposeData: []
    };
  }
  componentWillMount() {
    // get purpose
    this.props.db
      .collection("leavePurpose")
      .get()
      .then(
        doc => {
          const purposeData = [];
          doc.forEach(docitem => {
            if (docitem.exists) {
              purposeData.push(docitem.data());
            }
          });
          this.setState({
            isLoading: false,
            purposeData
          });
        },
        err => {
          console.log(`Encountered error: ${err}`);
        }
      );
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path={"/leavedashboard"}
              render={props => (
                <LeaveEmployeeDashboardContainer
                  {...props}
                  purposeData={this.state.purposeData}
                />
              )}
            />
            <Route
              exact
              path={"/leavedashboard/admin"}
              render={props => (
                <LeaveAdminDashboardContainer
                  {...props}
                  purposeData={this.state.purposeData}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withFirebase(withRouter(LeaveDashboardContainer));
