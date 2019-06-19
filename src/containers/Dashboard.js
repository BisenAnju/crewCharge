import React, { Component } from "react";
import Dashboard from "../components/Dashboard";
import withUser from "../hoc/withUser";
import { withFirebase } from "../firebase";
import { withRouter } from "react-router-dom";
import { CircularProgress } from "material-ui";

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
    if (navigationNotification !== null) {
      let rute = navigationNotification.route + navigationNotification.id;
      localStorage.removeItem("navigationNotification");
      if (rute) this.props.history.push(rute);
    }
  }
  render() {
    return <div>{this.props.user ? <Dashboard /> : <CircularProgress />}</div>;
  }
}

export default withRouter(withUser(withFirebase(DashboardContainer)));
