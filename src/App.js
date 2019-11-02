import React, { Component } from "react";
import withMUI from "./hoc/withMUI";
import withUser from "./hoc/withUser";
import { withFirebase } from "./firebase";
import withAuthentication from "./hoc/withAuthentication";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import DashboardContainer from "./containers/Dashboard";
import ComplaintList from "./containers/ComplaintList";
import ComplaintView from "./containers/ComplaintView";
import LoginContainer from "./containers/Login";
import PrivacyPolicy from "./components/PrivacyPolicy";
import LeaveDashboardContainer from "./containers/LeaveDashboard";
import ProjectsContainer from "./containers/Projects";
import TeamAllocationPeoplesListContainer from "./containers/TeamAllocationPeoplesList";
import ConfigurationContainer from "./containers/Configuration";
import CalenderContainer from "./containers/Calender";
import AddEmployeeContainer from "./containers/AddEmployee";
import PayrollContainer from "./containers/Payroll";
import LeaveReportContainer from "./containers/LeaveReport";
import AttendanceContainer from "./containers/Attendance";
import PermissionContainer from "./containers/Permission";
import UserLeaveContainer from "./containers/UserLeave";
import ManagePayslipContainer from "./containers/ManagePayslip";
import LinearProgress from "material-ui/LinearProgress";
import LeaveAdminApprovalRejectionContainer from "./containers/LeaveAdminApprovalRejection";
import LeaveEmployeeDetailsContainer from "./containers/LeaveEmployeeDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      leaveData: [],
      complaintTypeData: [],
      purposeData: [],
      singleData: [],
      u: null
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== null) {
      localStorage.setItem("user", nextProps.user.uid);
      this.props.db
        .collection("complaintType")
        .get()
        .then(doc => {
          const complaintTypeData = [];
          doc.forEach(docitem => {
            if (docitem.exists) {
              complaintTypeData.push(docitem.data());
            }
          });
          this.setState({
            complaintTypeData
          });
        });
      let userData = [];
      this.props.db
        .collection("users")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.exists) {
              const users = doc.data();
              users.id = doc.id;
              users.access = doc.data().access;
              userData.push(users);
            }
          });
          this.setState({ userData });
        });

      //User Leave
      this.props.db
        .collection("leaves")
        .where("userId", "==", nextProps.user.uid)
        .orderBy("addedOn", "desc")
        .onSnapshot(
          snapshot => {
            const singleData = [];
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
                singleData.push(leave);
              }
            });
            this.setState({
              isLoading: false,
              singleData
            });
          },
          err => {
            console.log(`Encountered error: ${err}`);
          }
        );

    } else {
      this.setState({
        isLoading: true,
        leaveData: [],
        complaintTypeData: [],
        u: null,
        purposeData: [],
        singleData: []
      });
    }
  }

  componentWillMount() {
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
        {this.state.userData ? (
          <div>
            <Router>
              <Switch>
                <Route
                  path={"/privacypolicy"}
                  render={() => <PrivacyPolicy />}
                />
                <Route
                  path={"/teamallocation/:index"}
                  render={props => (
                    <TeamAllocationPeoplesListContainer {...props} />
                  )}
                />
                <Route
                  path={"/complaintview/:id"}
                  render={props => (
                    <ComplaintView
                      {...props}
                      loggedInUser={this.props.user}
                      userData={this.state.userData}
                      complaintType={this.state.complaintTypeData}
                    />
                  )}
                />
                <Route
                  path={"/configuration"}
                  render={props => <ConfigurationContainer {...props} />}
                />
                <Route
                  path={"/addemployee"}
                  render={props => <AddEmployeeContainer {...props} />}
                />
                <Route
                  path={"/leaveReport"}
                  render={props => <LeaveReportContainer {...props} />}
                />
                <Route
                  path={"/attendance"}
                  render={props => <AttendanceContainer {...props} />}
                />
                <Route
                  path={"/payroll"}
                  render={props => <PayrollContainer {...props} />}
                />
                <Route
                  path={"/managePayslip"}
                  render={props => <ManagePayslipContainer {...props} />}
                />
                <Route
                  path={"/calender"}
                  render={props => <CalenderContainer {...props} />}
                />
                <Route
                  path={"/permission"}
                  render={props => <PermissionContainer {...props} />}
                />
                <Route
                  path={"/userleaves"}
                  render={props => <UserLeaveContainer {...props} />}
                />
                <Route
                  path={"/complaintlist"}
                  render={props => (
                    <ComplaintList
                      {...props}
                      loggedInUser={this.props.user}
                      userData={this.state.userData}
                      complaintType={this.state.complaintTypeData}
                    />
                  )}
                />
                <Route
                  path={"/leavedashboard/admin/approvalrejection/:leaveId"}
                  render={props => (
                    <LeaveAdminApprovalRejectionContainer
                      {...props}
                      userData={this.state.userData}
                      singleData={this.state.leaveData}
                      purposeData={this.state.purposeData}
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
                      purposeData={this.state.purposeData}
                      singleData={this.state.singleData}
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
                  render={props => (
                    <DashboardContainer
                      {...props}
                      userData={this.state.userData}
                    />
                  )}
                />
              </Switch>
            </Router>
          </div>
        ) : localStorage.getItem("user") === null ? (
          <div>
            <Router>
              <Route
                path={"/"}
                render={props => <LoginContainer {...props} />}
              />
            </Router>
          </div>
        ) : (
              <LinearProgress mode="indeterminate" color={"rgb(253, 145, 77)"} />
            )}
      </div>
    );
  }
}

export default withMUI(withFirebase(withAuthentication(withUser(App))));
