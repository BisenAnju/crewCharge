import React from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import UserLeave from "../components/UserLeave";
import SingleUserLeave from "../components/SingleUserLeave";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";

class UserLeaveContainer extends React.Component {
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

    this.props.db
      .collection("leaves")
      .where("leaveStatus", "==", "Approved")
      .get()
      .then(
        snapshot => {
          const leaveData = [];
          snapshot.forEach(doc => {
            if (doc.exists) {
              const leave = doc.data();
              leave.start = new Date(leave.from.seconds * 1000);
              leave.end = new Date(leave.to.seconds * 1000);
              leave.title = leave.reason;
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
        <Router>
          <Switch>
            <Route
              exact
              path={"/userleaves"}
              render={props => (
                <UserLeave {...props} userData={this.state.userData} />
              )}
            />
            <Route
              exact
              path={"/userleaves/:id"}
              render={props => (
                <SingleUserLeave
                  {...props}
                  userData={this.state.userData}
                  leaveData={this.state.leaveData}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default withUser(withFirebase(withRouter(UserLeaveContainer)));
