import React from "react";
import { withRouter } from "react-router-dom";
import {
  TextField,
  SelectField,
  RaisedButton,
  MenuItem,
  Snackbar
} from "material-ui";
import DatePicker from "material-ui/DatePicker";
import Layout from "../layouts/Layout";
import { white } from "material-ui/styles/colors";
class TeamAllocationMission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayStyle: "none",
      open: false,
      missionName: null,
      values: [],
      projectId: null,
      startDate: null,
      endDate: null,
      remarks: null,
      openSnackbar: null,
      message: null
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.missionsList.length > 0) {
      let missionList = nextProps.missionsList.find(
        misiionData =>
          misiionData.missionsId === this.props.match.params.missionId
      );
      console.log(missionList);
      this.setState({
        missionName: missionList.name,
        values: missionList.assignTo,
        projectId: missionList.projectId,
        startDate: missionList.deadline.startDate,
        endDate: missionList.deadline.endDate,
        remarks: missionList.deadline.remarks
      });
    }
  }
  handleUsersChange = (event, index, values) => this.setState({ values });
  menuItems(values) {
    return this.props.usersList.map((row, index) => (
      <MenuItem
        key={index}
        insetChildren={true}
        checked={values && values.indexOf(row.uid) > -1}
        value={row.uid}
        primaryText={row.displayName}
      />
    ));
  }
  handleMissionChange = (event, index, textName) => {
    this.setState({
      missionName: event.target.value
    });
  };
  handleStartDateChange = (event, date) => {
    this.setState({
      startDate: date
    });
  };
  handleEndDateChange = (event, date) => {
    this.setState({
      endDate: date
    });
  };
  handleRmarkChange = (event, index, values) => {
    this.setState({
      remarks: event.target.value
    });
  };
  handleProjectChange = (event, index, value) => {
    this.setState({
      projectId: value
    });
  };
  handleClose = () => {
    this.setState({
      missionName: null,
      values: [],
      questionsId: null,
      startDate: null,
      endDate: null,
      remarks: null
    });
  };
  render() {
    const { values } = this.state;
    return (
      <Layout navigationTitle="Mission" showBackNavigation={true}>
        <div style={{ padding: 10 }}>
          <TextField
            floatingLabelText="Enter Mission"
            defaultValue={this.state.missionName}
            fullWidth={true}
            floatingLabelFocusStyle={{ color: "rgb(253, 145, 77)" }}
            floatingLabelStyle={{ color: "rgb(253, 145, 77)" }}
            underlineFocusStyle={{ borderColor: "rgb(253, 145, 77)" }}
            onChange={this.handleMissionChange}
          />
          <SelectField
            value={this.state.projectId}
            onChange={this.handleProjectChange}
            floatingLabelText="Select Project Name"
            floatingLabelStyle={{ color: "rgb(253, 145, 77)" }}
            floatingLabelFocusStyle={{ color: "rgb(253, 145, 77)" }}
            fullWidth={true}
            maxHeight={200}
          >
            {this.props.projectsList === undefined
              ? null
              : this.props.projectsList.map((row, index) => (
                  <MenuItem
                    key={index}
                    value={row.projectId}
                    primaryText={row.name}
                  />
                ))}
          </SelectField>
          <SelectField
            multiple={true}
            value={this.state.values}
            onChange={this.handleUsersChange}
            floatingLabelText="Select Users Name"
            floatingLabelStyle={{ color: "rgb(253, 145, 77)" }}
            floatingLabelFocusStyle={{ color: "rgb(253, 145, 77)" }}
            fullWidth={true}
            maxHeight={200}
          >
            {this.menuItems(values)}
          </SelectField>
          <DatePicker
            floatingLabelText="Start Date"
            value={this.state.startDate}
            floatingLabelStyle={{ color: "rgb(253, 145, 77)" }}
            floatingLabelFocusStyle={{ color: "rgb(253, 145, 77)" }}
            fullWidth={true}
            onChange={this.handleStartDateChange}
          />
          <DatePicker
            floatingLabelText="End Date"
            value={this.state.endDate}
            floatingLabelStyle={{ color: "rgb(253, 145, 77)" }}
            floatingLabelFocusStyle={{ color: "rgb(253, 145, 77)" }}
            fullWidth={true}
            onChange={this.handleEndDateChange}
          />
          <TextField
            floatingLabelText="Remarks"
            defaultValue={this.state.missionName}
            floatingLabelStyle={{ color: "rgb(253, 145, 77)" }}
            floatingLabelFocusStyle={{ color: "rgb(253, 145, 77)" }}
            fullWidth={true}
            multiLine={true}
            underlineFocusStyle={{ borderColor: "rgb(253, 145, 77)" }}
            onChange={this.handleRmarkChange}
          />
          <div style={{ padding: 10, float: "right", marginRight: "40%" }}>
            {/* <RaisedButton
              label="Cancel"
              onClick={this.handleClose}
              backgroundColor={orange500}
              labelColor={white}
              style={{ marginRight: 10 }}
            /> */}
            <RaisedButton
              label="Save"
              labelColor={white}
              backgroundColor={"rgb(253, 145, 77)"}
              onClick={e => {
                e.preventDefault();
                this.props.handleAddMission(
                  this.state.missionName,
                  this.state.values,
                  this.state.startDate,
                  this.state.endDate,
                  this.state.remarks,
                  this.state.projectId
                );
              }}
            />
          </div>
          <div>
            <Snackbar
              open={this.props.openSnackbar}
              message={this.props.message}
              autoHideDuration={4000}
            />
          </div>
        </div>
      </Layout>
    );
  }
}
export default withRouter(TeamAllocationMission);
