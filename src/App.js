import React, { Component } from "react";
import withMUI from "./hoc/withMUI";
//import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
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
import TeamAllocationDashboardContainer from "./containers/TeamAllocationDashboard";
import TeamAllocationProjectContainer from "./containers/TeamAllocationProject";
import LeaveDashboardContainer from "./containers/LeaveDashboard";
import LeaveAdminApprovalRejectionContainer from "./containers/LeaveAdminApprovalRejection";
import LeaveEmployeeDetailsContainer from "./containers/LeaveEmployeeDetails";
import ProjectsContainer from "./containers/Projects";
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

    this.props.db
      .collection("leaves")
      .orderBy("addedOn", "desc")
      .onSnapshot(
        snapshot => {
          const leaveData = [];
          snapshot.forEach(doc => {
            if (doc.exists) {
              const leave = doc.data();
              leave.leaveId = doc.id;
              leave.from = new Date(leave.from.seconds * 1000);
              leave.to = new Date(leave.to.seconds * 1000);
              leave.addedOn = new Date(leave.addedOn.seconds * 1000);
              if (leave.dueDate != null) {
                leave.dueDate = new Date(leave.dueDate.seconds * 1000);
              }
              if (leave.approvedRejectedOn != null) {
                leave.approvedRejectedOn = new Date(
                  leave.approvedRejectedOn.seconds * 1000
                );
              }
              leaveData.push(leave);
            }
          });
          this.setState({
            isLoading: false,
            leaveData
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
        {this.props.user ? (
          <div>
            <Router>
              <Switch>
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
                      userData={this.state.userData}
                      singleData={this.state.leaveData}
                    />
                  )}
                />
                <Route
                  exact
                  path={"/leavedashboard/leavedetails/:leaveId"}
                  render={props => (
                    <LeaveEmployeeDetailsContainer
                      {...props}
                      singleData={this.state.leaveData.find(
                        data => data.userId === this.props.user.uid
                      )}
                      userData={this.state.userData}
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
                {/*Team Allocation start */}
                <Route
                  path={"/teamallocation"}
                  render={props => (
                    <TeamAllocationDashboardContainer {...props} />
                  )}
                />
                <Route
                  path={"/teamallocation/project"}
                  render={props => (
                    <TeamAllocationProjectContainer {...props} />
                  )}
                />
                {/*Team Allocation End */}
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
