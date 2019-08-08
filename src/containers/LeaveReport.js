import React from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import UserLeaveReportContainer from "./UserLeaveReport";
import LeaveReport from "../components/LeaveReport";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";

class LeaveReportContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userData: [],
      leaveData: [],
      purposeData: []
    };
  }

  componentWillMount() {
    //get users
    this.props.db
      .collection("users")
      .orderBy("displayName")
      .onSnapshot(
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

    //get current month leaves

    this.props.db
      .collection("leaves")
      .orderBy("from", "desc")
      .where("leaveStatus", "==", "Approved")
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

    //get purpose data
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
              path={"/leaveReport"}
              render={props => (
                <LeaveReport
                  {...props}
                  userData={this.state.userData}
                  leaveData={this.state.leaveData}
                  // index={this.props.match.params.index}
                />
              )}
            />
            <Route
              exact
              path={"/leaveReport/:id/:index/:from/:to"}
              render={props => (
                <UserLeaveReportContainer
                  {...props}
                  userData={this.state.userData}
                  leaveData={this.state.leaveData}
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
export default withUser(withFirebase(withRouter(LeaveReportContainer)));
