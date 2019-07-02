import React from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";
import LeaveEmployeeApplyContainer from "./LeaveEmployeeApply";
import LeaveEmployeeDetailsContainer from "./LeaveEmployeeDetails";
import LeaveEmployeeDashboard from "../components/LeaveEmployeeDashboard";

class LeaveEmployeeDashboardContainer extends React.Component {
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
      .where("userId", "==", this.props.user.uid)
      .orderBy("addedOn", "desc")
      .onSnapshot(
        snapshot => {
          const leaveData = [];
          snapshot.forEach(doc => {
            if (doc.exists) {
              // this.props.db
              //   .collection("leaves")
              //   .doc(doc.id)
              //   .collection("comment")
              //   .get()
              //   .then(shot => {
              //     if (shot.size > 0) {
              //       this.setState({ comment: "true" });
              //     } else {
              //       this.setState({ comment: "false" });
              //     }
              //   });
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
              exact
              path={"/leavedashboard/leaveapply/:mode"}
              render={props => (
                <LeaveEmployeeApplyContainer
                  {...props}
                  singleData={this.state.leaveData}
                  purposeData={this.props.purposeData}
                />
              )}
            />
            <Route
              exact
              path={"/leavedashboard/leavedetails/:leaveId"}
              render={props => (
                <LeaveEmployeeDetailsContainer
                  {...props}
                  singleData={this.state.leaveData}
                  userData={this.state.userData}
                  purposeData={this.props.purposeData}
                />
              )}
            />
            <Route
              exact
              path={"/leavedashboard"}
              render={props => (
                <LeaveEmployeeDashboard
                  key={this.state.leaveData.leaveId}
                  {...props}
                  userData={this.state.userData}
                  leaveData={this.state.leaveData}
                  purposeData={this.props.purposeData}
                  isLoading={this.state.isLoading}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default withUser(
  withFirebase(withRouter(LeaveEmployeeDashboardContainer))
);
