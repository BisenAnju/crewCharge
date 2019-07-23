import React from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import PermissionList from "../components/PermissionList";
import UserPermission from "../components/UserPermission";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";

class PermissionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, userData: [] };
  }

  updateRole = (access, user) => {
    this.props.db
      .collection("users")
      .doc(user.uid)
      .update({
        access
      })
      .then(this.props.history.goBack())
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };
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
            <div>
              <Route
                exact
                path={"/permission"}
                render={props => (
                  <PermissionList {...props} userData={this.state.userData} />
                )}
              />
              <Route
                exact
                path={"/permission/:id"}
                render={props => (
                  <UserPermission
                    {...props}
                    updateRole={this.updateRole}
                    userData={this.state.userData}
                    // singleUser={this.state.userData.find(
                    //   data => data.uid === this.props.match.params.uid
                    // )}
                  />
                )}
              />
            </div>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default withUser(withFirebase(withRouter(PermissionContainer)));
