import React, { Component } from "react";
import withMUI from "./hoc/withMUI";
import withUser from "./hoc/withUser";
import { withFirebase } from "./firebase";
import withAuthentication from "./hoc/withAuthentication";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import DashboardContainer from "./containers/Dashboard";
import ComplaintList from "./containers/ComplaintList";
import ComplaintView from "./containers/ComplaintView";
import LoginContainer from "./containers/Login";
import PrivacyPolicy from "./components/PrivacyPolicy";
import LeaveDashboardContainer from "./containers/LeaveDashboard";
import ProjectsContainer from "./containers/Projects";
import TeamAllocationPeoplesListContainer from "./containers/TeamAllocationPeoplesList";
import ConfigurationContainer from "./containers/Configuration";
import PermissionContainer from "./containers/Permission";
import LinearProgress from "material-ui/LinearProgress";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      leaveData: [],
      complaintTypeData: [],
      u: null
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== null) {
      localStorage.setItem("user", nextProps.user.uid);
      this.props.db
        .collection("complaintType")
        .get()
        .then(doc => {
          const complaintTypeData = [];
          doc.forEach(docitem => {
            if (docitem.exists) {
              complaintTypeData.push(docitem.data());
            }
          });
          this.setState({
            complaintTypeData
          });
        });
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
    } else {
      this.state = {
        isLoading: true,
        leaveData: [],
        complaintTypeData: [],
        u: null
      };
    }
  }

  render() {
    return (
      <div>
        {this.state.userData ? (
          <div>
            <Router>
              <Switch>
                <Route
                  path={"/privacypolicy"}
                  render={() => <PrivacyPolicy />}
                />
                <Route
                  path={"/teamallocation"}
                  render={props => (
                    <TeamAllocationPeoplesListContainer {...props} />
                  )}
                />
                <Route
                  path={"/complaintview/:id"}
                  render={props => (
                    <ComplaintView
                      {...props}
                      loggedInUser={this.props.user}
                      userData={this.state.userData}
                      complaintType={this.state.complaintTypeData}
                    />
                  )}
                />
                <Route
                  path={"/configuration"}
                  render={props => <ConfigurationContainer {...props} />}
                />
                <Route
                  path={"/permission"}
                  render={props => <PermissionContainer {...props} />}
                />
                <Route
                  path={"/complaintlist"}
                  render={props => (
                    <ComplaintList
                      {...props}
                      loggedInUser={this.props.user}
                      userData={this.state.userData}
                      complaintType={this.state.complaintTypeData}
                    />
                  )}
                />
                <Route
                  path={"/leavedashboard"}
                  render={props => <LeaveDashboardContainer {...props} />}
                />

                <Route
                  path={"/projects"}
                  render={props => <ProjectsContainer {...props} />}
                />

                <Route
                  path={"/"}
                  render={props => (
                    <DashboardContainer
                      {...props}
                      userData={this.state.userData}
                    />
                  )}
                />
              </Switch>
            </Router>
          </div>
        ) : localStorage.getItem("user") === null ? (
          <div>
            <Router>
              <Route
                path={"/"}
                render={props => <LoginContainer {...props} />}
              />
            </Router>
          </div>
        ) : (
          <LinearProgress mode="indeterminate" color={"rgb(253, 145, 77)"} />
        )}
      </div>
    );
  }
}

export default withMUI(withFirebase(withAuthentication(withUser(App))));
