import React, { Component } from "react";
import Dashboard from "../components/Dashboard";
import withUser from "../hoc/withUser";
import { withFirebase } from "../firebase";
import { withRouter } from "react-router-dom";

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.exec = this.exec.bind(this);
  }
  componentDidMount() {
    // this.test();
    setTimeout(this.exe, 2000);
  }
  // test=()=>window.cordova ? document.addEventListener('resume',this.exec,false):null;
  exec() {
    let navigationNotification = JSON.parse(
      localStorage.getItem("navigationNotification")
    );
    console.log("data:- " + navigationNotification);
    if (navigationNotification !== null) {
      let path = navigationNotification.route + navigationNotification.id;
      localStorage.removeItem("navigationNotification");
      if (path) this.props.history.push(path);
    }
  }
  render() {
    return <div>{this.props.user && <Dashboard />}</div>;
  }
}

export default withRouter(withUser(withFirebase(DashboardContainer)));
