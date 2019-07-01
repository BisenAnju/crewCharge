import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import TeanAllocationMissionContainer from "./TeamAllocationMission";
import TeamAllocationProject from "../components/TeamAllocationProject";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";
class TeamAllocationMissionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackbar: false,
      message: ""
    };
  }
  handleAddProject = (projectName, logo) => {
    if (projectName === null || logo === null) {
      this.setState({ openSnackbar: true, message: "Fill all Required field" });
    } else {
      this.props.db
        .collection("projects")
        .add({
          name: projectName,
          logoURL: logo,
          createdOn: Date(),
          createBy: this.props.user.uid,
          status: "Active"
        })
        .then(
          this.setState({
            openSnackbar: true,
            message: "Mission Add Success fully"
          }),
          (window.location = "/teamallocation")
        );
    }
  };
  handleUpdateProject = (projectName, logo, projectId) => {
    if (projectName === null || logo === null) {
      this.setState({ openSnackbar: true, message: "Fill all Required field" });
    } else {
      this.props.db
        .collection("projects")
        .doc(projectId)
        .update({
          name: projectName,
          logoURL: logo
        })
        .then(
          this.setState({
            openSnackbar: true,
            message: "Mission Add Success fully"
          }),
          (window.location = "/teamallocation")
        );
    }
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
                <TeanAllocationMissionContainer {...this.props} />
              )}
            />
            <Route
              exact
              path={"/teamallocation/project"}
              render={props => (
                <TeamAllocationProject
                  {...this.props}
                  handleAddProject={this.handleAddProject}
                />
              )}
            />
            <Route
              exact
              path={"/teamallocation/project/:projectId"}
              render={props => (
                <TeamAllocationProject
                  {...this.props}
                  handleUpdateProject={this.handleUpdateProject}
                  projectList={
                    this.props.projectsList.length > 0
                      ? this.props.projectsList.find(
                          data =>
                            data.projectId === this.props.match.params.projectId
                        )
                      : null
                  }
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
  withFirebase(withUser(TeamAllocationMissionContainer))
);
