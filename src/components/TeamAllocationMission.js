import React from "react";
import { withRouter } from "react-router-dom";
import {
  TextField,
  SelectField,
  RaisedButton,
  MenuItem,
  Snackbar,
  Avatar
} from "material-ui";
import DatePicker from "material-ui/DatePicker";
import Layout from "../layouts/Layout";
import { orange500, white } from "material-ui/styles/colors";
import { ActionHome, CommunicationMessage } from "material-ui/svg-icons";
import TextFieldIcon from "material-ui-textfield-icon";
class TeamAllocationMission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayStyle: "none",
      open: false,
      missionName: null,
      values: [],
      projectId: null,
      questionsId: null,
      startDate: null,
      endDate: null,
      remarks: null,
      openSnackbar: null,
      message: null
    };
  }
  componentWillMount() {
    console.log(this.props.missionList);
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
      projectId: null,
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
          <TextFieldIcon
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
            floatingLabelStyle={{ color: "rgb(253, 145, 77)" }}
            floatingLabelFocusStyle={{ color: "rgb(253, 145, 77)" }}
            fullWidth={true}
            onChange={this.handleStartDateChange}
          />
          <DatePicker
            floatingLabelText="End Date"
            floatingLabelStyle={{ color: "rgb(253, 145, 77)" }}
            floatingLabelFocusStyle={{ color: "rgb(253, 145, 77)" }}
            fullWidth={true}
            onChange={this.handleEndDateChange}
          />
          <TextFieldIcon
            floatingLabelText="Remarks"
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
