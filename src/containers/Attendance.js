import React from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import Attendance from "../components/Attendance";
import SingleUserAttendance from "../components/SingleUserAttendance";
import withFirebase from "../hoc/withFirebase";
import moment from "moment";

class AttendanceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userData: [],
      attendanceData: []
    };
  }

  componentWillMount() {
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
              attendance.date = new Date(attendance.date.seconds * 1000);
              if (attendance.in !== "") {
                attendance.in = moment(attendance.in.seconds * 1000).format(
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
              path={"/attendance"}
              render={props => (
                <Attendance
                  {...props}
                  userData={this.state.userData}
                  attendanceData={this.state.attendanceData}
                />
              )}
            />
            <Route
              exact
              path={"/attendance/:id"}
              render={props => (
                <SingleUserAttendance
                  {...props}
                  userData={this.state.userData}
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
export default withFirebase(withRouter(AttendanceContainer));