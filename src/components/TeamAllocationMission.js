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
import * as moment from "moment";
class TeamAllocationMission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayStyle: "none",
      open: false,
      missionName: "",
      values: [],
      projectId: null,
      startDate: new Date(),
      endDate: new Date(),
      remarks: "",
      openSnackbar: null,
      message: null
    };
  }
  componentWillMount() {
    this.setState({
      values: this.props.values,
      projectId: this.props.projectId,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      missionName: this.props.missionName,
      remarks: this.props.remarks
    });
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
    const startDate = moment(date).format("lll");
    this.setState({
      startDate
    });
  };
  handleEndDateChange = (event, date) => {
    const endDate = moment(date).format("lll");
    this.setState({
      endDate
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
            value={this.state.missionName}
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
            value={new Date(this.state.startDate)} //2019-06-28
            floatingLabelStyle={{ color: "rgb(253, 145, 77)" }}
            floatingLabelFocusStyle={{ color: "rgb(253, 145, 77)" }}
            fullWidth={true}
            onChange={this.handleStartDateChange}
          />
          <DatePicker
            floatingLabelText="End Date"
            value={new Date(this.state.endDate)}
            floatingLabelStyle={{ color: "rgb(253, 145, 77)" }}
            floatingLabelFocusStyle={{ color: "rgb(253, 145, 77)" }}
            fullWidth={true}
            onChange={this.handleEndDateChange}
          />
          <TextField
            floatingLabelText="Remarks"
            value={this.state.remarks}
            floatingLabelStyle={{ color: "rgb(253, 145, 77)" }}
            floatingLabelFocusStyle={{ color: "rgb(253, 145, 77)" }}
            fullWidth={true}
            multiLine={true}
            underlineFocusStyle={{ borderColor: "rgb(253, 145, 77)" }}
            onChange={this.handleRmarkChange}
          />
          <div style={{ padding: 10, float: "right", marginRight: "40%" }}>
            {this.props.match.params.missionId !== undefined ? (
              <RaisedButton
                label="Update"
                onClick={this.handleClose}
                backgroundColor={"rgb(253, 145, 77)"}
                labelColor={white}
                onClick={e => {
                  e.preventDefault();
                  this.props.handleUpdateMission(
                    this.state.missionName,
                    this.state.values,
                    this.state.startDate,
                    this.state.endDate,
                    this.state.remarks,
                    this.state.projectId,
                    this.props.match.params.missionId
                  );
                }}
              />
            ) : (
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
            )}
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
