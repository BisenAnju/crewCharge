import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";
import TeamAllocationProjectListContainer from "./TeamAllocationProjectList";
import TeamAllocationPeopleList from "../components/TeamAllocationPeoplesList";
import TeamAllocationMissionContainer from "./TeamAllocationMission";
import TeamAllocationProjectContainer from "./TeamAllocationProject";
import TeamAllocationMissionList from "../components/TeamAllocationMissionList";
import TeamAllocationDashboardContainer from "./TeamAllocationDashboard";
class TeamAllocationPeoplesListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      usersList: [],
      projectsList: [],
      missionsList: [],
      leavesList: []
    };
  }
  componentWillMount() {
    let usersList = [];
    let projectsList = [];
    let leavesList = [];
    let missionsList = [];
    let projectldata = [];
    this.props.db
      .collection("users")
      .orderBy("displayName")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(doc => {
          if (doc.doc.exists) {
            const usersDetails = doc.doc.data();
            usersDetails.userId = doc.doc.id;
            usersList.push(usersDetails);
          } else {
            alert("No Data Found");
          }
        });
        this.setState({ isLoading: false, usersList });
      });
    this.props.db
      .collection("projects")
      .orderBy("name")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(doc => {
          if (doc.doc.exists) {
            const projectDetails = doc.doc.data();
            projectDetails.projectId = doc.doc.id;
            projectsList.push(projectDetails);
          } else {
            alert("No Data Found");
          }
        });
        this.setState({ isLoading: false, projectsList });
      });
    this.props.db
      .collection("missions")
      .where("status", "==", "Active")
      .orderBy("name")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(doc => {
          if (doc.doc.exists) {
            const missionsDetails = doc.doc.data();
            missionsDetails.missionsId = doc.doc.id;
            missionsList.push(missionsDetails);
          } else {
            alert("No Data Found");
          }
        });
        this.setState({ isLoading: false, missionsList });
      });
    this.props.db
      .collection("leaves")
      .where("leaveStatus", "==", "Approved")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(doc => {
          if (doc.doc.exists) {
            const leavesDetails = doc.doc.data();
            leavesDetails.leavesId = doc.doc.id;
            leavesList.push(leavesDetails);
          } else {
            alert("No Data Found");
          }
        });
        this.setState({ isLoading: false, leavesList });
      });
  }
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path={"/teamallocation"}
              render={props => (
                <TeamAllocationPeopleList {...this.props} {...this.state} />
              )}
            />
            <Route
              exact
              path={"/teamallocation/projectlist"}
              render={props => (
                <TeamAllocationProjectListContainer
                  {...props}
                  {...this.state}
                />
              )}
            />
            <Route
              exact
              path={"/teamallocation/mission"}
              render={props => (
                <TeamAllocationMissionContainer {...props} {...this.state} />
              )}
            />
            <Route
              exact
              path={"/teamallocation/missionlist"}
              render={props => (
                <TeamAllocationMissionList {...this.props} {...this.state} />
              )}
            />
            <Route
              exact
              path={"/teamallocation/project"}
              render={props => (
                <TeamAllocationProjectContainer {...props} {...this.state} />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(
  withFirebase(withUser(TeamAllocationPeoplesListContainer))
);
