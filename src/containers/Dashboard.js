import React, { Component } from "react";
import Dashboard from "../components/Dashboard";
import withUser from "../hoc/withUser";
import { withFirebase } from "../firebase";
import { withRouter } from "react-router-dom";

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { userData: [] };
  }
  componentWillMount() {
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

    let navigationNotification = JSON.parse(
      localStorage.getItem("navigationNotification")
    );
    // console.log(navigationNotification);
    if (navigationNotification !== null) {
      let path = navigationNotification.route + navigationNotification.id;
      localStorage.removeItem("navigationNotification");
      if (path) this.props.history.push(path);
    }
  }
  render() {
    return (
      <div>
        {this.props.user && <Dashboard userData={this.state.userData} />}
      </div>
    );
  }
}

export default withRouter(withUser(withFirebase(DashboardContainer)));
