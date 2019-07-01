import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";
import TeamAllocationMissionContainer from "./TeamAllocationMission";
import TeamAllocationProjectContainer from "./TeamAllocationProject";
import TeamAllocationMissionList from "../components/TeamAllocationMissionList";
class TeamAllocationPeoplesListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      usersList: [],
      projectsList: [],
      missionsList: [],
      leavesList: [],
      massage: null
    };
  }
  componentWillMount() {
    let usersList = [];
    let projectsList = [];
    let leavesList = [];
    let missionsList = [];
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
      .where("status", "==", "Active")
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
  handleArchiveMissionChange = missionsId => {
    this.props.db
      .collection("missions")
      .doc(missionsId)
      .update({ status: "Archive" })
      .then(this.setState({ massage: "Your Data Deleted" }));
  };
  handleArchiveProjectChange = projectId => {
    this.props.db
      .collection("projects")
      .doc(projectId)
      .update({ status: "Archive" })
      .then(this.setState({ massage: "Your Data Deleted" }));
  };
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path={"/teamallocation"}
              render={props => (
                <TeamAllocationMissionList
                  {...this.props}
                  {...this.state}
                  handleAddproject={this.handleAddproject}
                  handleAddMission={this.handleAddMission}
                  handleArchiveMissionChange={this.handleArchiveMissionChange}
                  handleArchiveProjectChange={this.handleArchiveProjectChange}
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
              path={"/teamallocation/mission/:missionId"}
              render={props => (
                <TeamAllocationMissionContainer
                  {...this.props}
                  {...this.state}
                />
              )}
            />
            <Route
              exact
              path={"/teamallocation/project"}
              render={props => (
                <TeamAllocationProjectContainer {...props} {...this.state} />
              )}
            />
            <Route
              exact
              path={"/teamallocation/project/:projectId"}
              render={props => (
                <TeamAllocationProjectContainer
                  {...this.props}
                  {...this.state}
                />
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
