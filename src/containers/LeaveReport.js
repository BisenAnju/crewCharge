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
import moment from "moment";
class LeaveReportContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userData: [],
      leaveData: [],
      purposeData: [],
      attendanceData: []
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
      .where("status", "==", "personal")
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

    // get attendance data
    this.props.db
      .collection("attendance")
      .orderBy("date", "asc")
      .onSnapshot(
        snapshot => {
          const attendanceData = [];
          snapshot.forEach(doc => {
            if (doc.exists) {
              const attendance = doc.data();
              attendance.start = new Date(attendance.date.seconds * 1000);
              attendance.end = new Date(attendance.date.seconds * 1000);
              if (attendance.in !== "") {
                attendance.in = moment(attendance.in.seconds * 1000).format(
                  "HH.mm"
                );
                attendance.title = attendance.in;
              }
              if (attendance.out !== "") {
                attendance.out = moment(attendance.out.seconds * 1000).format(
                  "HH.mm"
                );
              }

              attendanceData.push(attendance);
            }
          });
          this.setState({
            isLoading: false,
            attendanceData
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
                  attendanceData={this.state.attendanceData}
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
                  attendanceData={this.state.attendanceData}
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
