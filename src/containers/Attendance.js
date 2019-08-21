import React from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import Attendance from "../components/Attendance";
import UserAttendance from "../components/UserAttendance";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";

class AttendanceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, userData: [] };
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
                <Attendance {...props} userData={this.state.userData} />
              )}
            />
            <Route
              exact
              path={"/attendance/:id"}
              render={props => (
                <UserAttendance {...props} userData={this.state.userData} />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default withUser(withFirebase(withRouter(AttendanceContainer)));
