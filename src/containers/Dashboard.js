import React, { Component } from "react";
import Dashboard from "../components/Dashboard";
import withUser from "../hoc/withUser";
import { withFirebase } from "../firebase";
import { withRouter } from "react-router-dom";

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    let navigationNotification = JSON.parse(
      localStorage.getItem("navigationNotification")
    );
    // console.log("data:- " + navigationNotification);
    if (navigationNotification !== null) {
      let path = navigationNotification.route + navigationNotification.id;
      localStorage.removeItem("navigationNotification");
      if (path) this.props.history.push(path);
    }
  }
  render() {
    console.log("render");
    return (
      <div>
        {this.props.user && <Dashboard userData={this.props.userData} />}
      </div>
    );
  }
}

export default withRouter(withUser(withFirebase(DashboardContainer)));
