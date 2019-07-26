import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import TeamAllocationMission from "../components/TeamAllocationMission";
import TeanAllocationProjectContainer from "./TeamAllocationProject";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import * as moment from "moment";
class TeamAllocationMissionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackbar: false,
      message: "",
      values: [],
      projectId: null,
      startDate: new Date(),
      endDate: new Date(),
      missionName: "",
      remarks: null
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
      this.setState({
        openSnackbar: true,
        message: "Fill all Required fields"
      });
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
            startDate: moment(startDate).format("lll"),
            endDate: moment(endDate).format("lll"),
            remarks: remarks
          },
          status: "Active"
        })
        .then(
          this.setState({
            openSnackbar: true,
            message: "Mission Added Successfully"
          }),
          this.props.history.push("/teamallocation/" + 2)
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
      this.setState({
        openSnackbar: true,
        message: "Fill all Required fields"
      });
    } else {
      console.log(startDate);
      console.log(endDate);
      this.props.db
        .collection("missions")
        .doc(missionId)
        .update({
          name: missionName,
          projectId: projectId,
          assignTo: values,
          deadline: {
            startDate: moment(startDate).format("lll"),
            endDate: moment(endDate).format("lll"),
            remarks: remarks
          },
          status: "Active"
        })
        .then(
          this.setState({
            openSnackbar: true,
            message: "Mission Added Successfully"
          }),
          this.props.history.push("/teamallocation/" + 2)
        );
    }
  };
  componentWillMount() {
    if (
      this.props.missionsList.length > 0 &&
      this.props.match.params.missionId !== undefined
    ) {
      let missionList = this.props.missionsList.find(
        misiionData =>
          misiionData.missionsId === this.props.match.params.missionId
      );
      const startDate = missionList.deadline.startDate;
      const endDate = missionList.deadline.endDate;
      this.setState({
        missionName: missionList.name,
        values: missionList.assignTo,
        projectId: missionList.projectId,
        startDate,
        endDate,
        remarks: missionList.deadline.remarks
      });
    }
  }
  render() {
    return (
      <div>
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
      </div>
    );
  }
}
export default withRouter(
  withFirebase(withUser(TeamAllocationMissionContainer))
);
