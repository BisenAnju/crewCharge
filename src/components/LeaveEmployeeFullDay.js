import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  DatePicker,
  SelectField,
  MenuItem,
  RaisedButton,
  TextField,
  Snackbar
} from "material-ui";
import {
  ActionDateRange,
  CommunicationComment,
  ActionList
} from "material-ui/svg-icons";

const flexcontainer = {
  display: "flex",
  justifyContent: "center"
};
class LeaveEmployeeFulldayLeave extends Component {
  constructor() {
    super();
    this.state = {
      purpose: null,
      snackOpen: false,
      from: null,
      to: null,
      dueDate: null,
      reason: null
    };
  }
  handleChange = (event, index, purpose) => this.setState({ purpose });
  validateForm = e => {
    e.preventDefault();
    if (
      this.state.from === null ||
      this.state.to === null ||
      this.state.reason === null ||
      this.state.purpose === null
    ) {
      this.setState({ snackOpen: true });
      return false;
    }
    this.props.addLeaves({ ...this.state }, this.props.leaveType);
  };
  handleRequestClose = () => {
    this.setState({
      snackOpen: false
    });
  };
  textChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  changeFromDate = (event, date) => {
    this.setState({
      from: date
    });
  };
  changeToDate = (event, date) => {
    this.setState({
      to: date
    });
  };
  changeDueDate = (event, date) => {
    this.setState({
      dueDate: date
    });
  };
  render() {
    return (
      <div>
        <div style={flexcontainer}>
          <div>
            <ActionList style={{ marginTop: "38px", fill: "#f08f4c" }} />
          </div>
          <div>
            <SelectField
              value={this.state.purpose}
              onChange={this.handleChange}
              floatingLabelText="Select Purpose"
            >
              {this.props.purposeData.map(purpose => (
                <MenuItem
                  value={purpose.purpose}
                  primaryText={purpose.displayName}
                />
              ))}
            </SelectField>
          </div>
        </div>
        <br />
        <div style={flexcontainer}>
          <div>
            <ActionDateRange style={{ marginTop: "12px", fill: "#f08f4c" }} />
          </div>
          <div>
            <DatePicker
              hintText="Select date (from)"
              value={this.state.from}
              onChange={this.changeFromDate}
            />
          </div>
        </div>
        <br />
        <div style={flexcontainer}>
          <div>
            <ActionDateRange style={{ marginTop: "12px", fill: "#f08f4c" }} />
          </div>
          <div>
            <DatePicker
              hintText="Select date (to)"
              value={this.state.to}
              errorStyle={{ color: "#f08f4c" }}
              errorText={
                this.state.from > this.state.to &&
                "Should be greater than from date"
              }
              onChange={this.changeToDate}
            />
          </div>
        </div>
        <br />

        <div style={flexcontainer}>
          <div>
            <ActionDateRange style={{ marginTop: "12px", fill: "#f08f4c" }} />
          </div>
          <div>
            <DatePicker
              hintText="Select due date"
              errorText={
                this.state.dueDate > this.state.from &&
                "Should be smaller than from date"
              }
              errorStyle={{ color: "#f08f4c" }}
              value={this.state.dueDate}
              onChange={this.changeDueDate}
            />
          </div>
        </div>

        <div style={flexcontainer}>
          <div>
            <CommunicationComment
              style={{ marginTop: "38px", fill: "#f08f4c" }}
            />
          </div>
          <div>
            <TextField
              hintText="Type Reason"
              multiLine={true}
              rows={2}
              rowsMax={4}
              name="reason"
              value={this.state.reason}
              onChange={this.textChange}
            />
          </div>
        </div>

        <br />
        <br />
        <center>
          <div className="flexAppItem">
            <RaisedButton
              label="SUBMIT"
              backgroundColor="rgb(253, 145, 77)"
              labelColor="white"
              onClick={this.validateForm}
            />
          </div>
        </center>

        <Snackbar
          open={this.state.snackOpen}
          message="All fields are required..."
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default withRouter(LeaveEmployeeFulldayLeave);
