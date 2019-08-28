import React from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import LeaveAdminDashboard from "../components/LeaveAdminDashboard";
import LeaveAdminApprovalRejectionContainer from "./LeaveAdminApprovalRejection";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";

class LeaveAdminDashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      leaveData: [],
      userData: []
    };
  }

  componentWillMount() {
    // get Leave Data
    this.props.db
      .collection("leaves")
      .where("status", "==", "personal")
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

    // get User Data
    this.props.db.collection("users").onSnapshot(
      snapshot => {
        const userData = [];
        snapshot.forEach(doc => {
          if (doc.exists) {
            userData.push(doc.data());
          }
        });
        this.setState({
          isLoading: false,
          userData
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
              path={"/leavedashboard/admin/approvalrejection/:leaveId"}
              render={props => (
                <LeaveAdminApprovalRejectionContainer
                  {...props}
                  userData={this.state.userData}
                  singleData={this.state.leaveData}
                  purposeData={this.props.purposeData}
                />
              )}
            />
            <Route
              exact
              path={"/leavedashboard/admin"}
              render={props => (
                <LeaveAdminDashboard
                  {...props}
                  key={this.state.leaveData.leaveId}
                  userData={this.state.userData}
                  leaveData={this.state.leaveData}
                  isLoading={this.state.isLoading}
                  purposeData={this.props.purposeData}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withFirebase(withUser(withRouter(LeaveAdminDashboardContainer)));
