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
import { orange500, blue500 } from "material-ui/styles/colors";
const styles = {
  errorStyle: {
    color: orange500,
    padding: 10
  },
  underlineStyle: {
    borderColor: orange500
  },
  floatingLabelStyle: {
    color: orange500
  },
  floatingLabelFocusStyle: {
    color: blue500
  }
};
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
  render() {
    const { values } = this.state;
    return (
      <Layout navigationTitle="Mission" showBackNavigation={true}>
        <div style={{ padding: 10 }}>
          <TextField
            floatingLabelText="Enter Mission"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            hintStyle={styles.errorStyle}
            fullWidth={true}
            onChange={this.handleMissionChange}
          />
          <SelectField
            value={this.state.projectId}
            onChange={this.handleProjectChange}
            floatingLabelText="Select Project Name"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
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
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            fullWidth={true}
            maxHeight={200}
          >
            {this.menuItems(values)}
          </SelectField>
          <DatePicker
            floatingLabelText="Start Date"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            fullWidth={true}
            onChange={this.handleStartDateChange}
          />
          <DatePicker
            floatingLabelText="End Date"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            fullWidth={true}
            onChange={this.handleEndDateChange}
          />
          <TextField
            floatingLabelText="Remarks"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            fullWidth={true}
            multiLine={true}
            onChange={this.handleRmarkChange}
          />
          <div style={{ padding: 10 }}>
            <RaisedButton
              label="Cancel"
              primary={true}
              onClick={this.props.handleClose}
              style={{ marginRight: 10 }}
            />
            <RaisedButton
              label="Save"
              primary={true}
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
