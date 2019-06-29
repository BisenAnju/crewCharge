import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import TeamAllocationMission from "../components/TeamAllocationMission";
import TeanAllocationProjectContainer from "./TeamAllocationProject";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
class TeamAllocationMissionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackbar: false,
      message: ""
    };
  }
  handleAddMission = (
    missionName,
    values,
    startDate,
    endDate,
    remarks,
    projectId
  ) => {
    if (
      missionName === null ||
      values.length < 0 ||
      startDate === null ||
      endDate === null ||
      projectId === null
    ) {
      this.setState({ openSnackbar: true, message: "Fill all Required field" });
    } else {
      this.props.db
        .collection("missions")
        .add({
          name: missionName,
          projectId: projectId,
          assignTo: values,
          createdOn: Date(),
          createdBy: this.props.user.uid,
          deadline: {
            startDate: startDate,
            endDate: endDate,
            remarks: remarks
          },
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
  handleUpdateMission = (
    missionName,
    values,
    startDate,
    endDate,
    remarks,
    projectId,
    missionId
  ) => {
    if (
      missionName === null ||
      values.length < 0 ||
      startDate === null ||
      endDate === null ||
      projectId === null
    ) {
      this.setState({ openSnackbar: true, message: "Fill all Required field" });
    } else {
      this.props.db
        .collection("missions")
        .doc(missionId)
        .update({
          name: missionName,
          projectId: projectId,
          assignTo: values,
          deadline: {
            startDate: startDate,
            endDate: endDate,
            remarks: remarks
          },
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
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path={"/teamallocation/mission"}
              render={props => (
                <TeamAllocationMission
                  {...this.props}
                  {...this.state}
                  handleAddMission={this.handleAddMission}
                  handleUpdateMission={this.handleUpdateMission}
                />
              )}
            />
            <Route
              exact
              path={"/teamallocation/mission/:missionId"}
              render={props => (
                <TeamAllocationMission
                  {...this.props}
                  {...this.state}
                  handleAddMission={this.handleAddMission}
                  handleUpdateMission={this.handleUpdateMission}
                />
              )}
            />
            <Route
              exact
              path={"/teamallocation/project"}
              render={props => <TeanAllocationProjectContainer {...props} />}
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
