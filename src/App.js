import React, { Component } from "react";
import withMUI from "./hoc/withMUI";
import withUser from "./hoc/withUser";
import { withFirebase } from "./firebase";
import withAuthentication from "./hoc/withAuthentication";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import DashboardContainer from "./containers/Dashboard";
import ComplaintList from "./containers/ComplaintList";
import ComplaintView from "./containers/ComplaintView";
import ComplaintType from "./containers/ComplaintType";
import LeavePurposeContainer from "./containers/LeavePurpose";
import LoginContainer from "./containers/Login";
// import "./styles/App.css";
import LeaveDashboardContainer from "./containers/LeaveDashboard";
import LeaveAdminApprovalRejectionContainer from "./containers/LeaveAdminApprovalRejection";
import LeaveEmployeeDetailsContainer from "./containers/LeaveEmployeeDetails";
import ProjectsContainer from "./containers/Projects";
import TeamAllocationMissionContainer from "./containers/TeamAllocationMission";
import TeamAllocationProjectContainer from "./containers/TeamAllocationProject";
import TeamAllocationPeoplesListContainer from "./containers/TeamAllocationPeoplesList";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userData: [],
      leaveData: []
    };
  }
  componentWillMount() {
    let userData = [];
    this.props.db.collection("users").onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        if (doc.exists) {
          const users = doc.data();
          users.id = doc.id;
          userData.push(users);
        }
      });
      this.setState({ userData });
    });
  }

  render() {
    return (
      <div>
        {this.props.user ? (
          <div>
            <Router>
              <Switch>
                <Route
                  path={"/teamallocation"}
                  render={props => (
                    <TeamAllocationPeoplesListContainer {...props} />
                  )}
                />
                <Route
                  path={"/teamallocation/project"}
                  render={props => (
                    <TeamAllocationProjectContainer {...props} />
                  )}
                />
                <Route
                  path={"/teamallocation/mission"}
                  render={props => (
                    <TeamAllocationMissionContainer {...props} />
                  )}
                />

                <Route
                  path={"/complaintview/:id"}
                  render={props => (
                    <ComplaintView
                      {...props}
                      loggedInUser={this.props.user}
                      userData={this.state.userData}
                    />
                  )}
                />
                <Route
                  path={"/complainttype"}
                  render={props => <ComplaintType {...props} />}
                />
                <Route
                  path={"/leavepurpose"}
                  render={props => <LeavePurposeContainer {...props} />}
                />
                <Route
                  path={"/complaintlist"}
                  render={props => <ComplaintList {...props} />}
                />
                <Route
                  path={"/leavedashboard/admin/approvalrejection/:leaveId"}
                  render={props => (
                    <LeaveAdminApprovalRejectionContainer
                      {...props}
                      loggedInUser={this.props.user}
                      userData={this.state.userData}
                    />
                  )}
                />
                <Route
                  exact
                  path={"/leavedashboard/leavedetails/:leaveId"}
                  render={props => (
                    <LeaveEmployeeDetailsContainer
                      {...props}
                      userData={this.state.userData}
                      loggedInUser={this.props.user}
                    />
                  )}
                />
                <Route
                  path={"/leavedashboard"}
                  render={props => <LeaveDashboardContainer {...props} />}
                />

                <Route
                  path={"/projects"}
                  render={props => <ProjectsContainer {...props} />}
                />

                <Route
                  path={"/"}
                  render={props => <DashboardContainer {...props} />}
                />
              </Switch>
            </Router>
          </div>
        ) : (
          <div>
            <Router>
              <Route
                path={"/"}
                render={props => <LoginContainer {...props} />}
              />
            </Router>
          </div>
        )}
      </div>
    );
  }
}

export default withMUI(withFirebase(withAuthentication(withUser(App))));
