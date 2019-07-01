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
              value={
                this.props.singleData !== undefined
                  ? this.props.singleData.purpose
                  : this.state.purpose
              }
              onChange={this.handleChange}
              floatingLabelText="Select Purpose"
            >
              {this.props.purposeData.map((purpose, id) => (
                <MenuItem
                  key={id}
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
            <ActionDateRange style={{ marginTop: "38px", fill: "#f08f4c" }} />
          </div>
          <div>
            <DatePicker
              floatingLabelText="From Date"
              hintText="Select date (from)"
              value={
                this.props.singleData !== undefined
                  ? this.props.singleData.from
                  : this.state.from
              }
              onChange={this.changeFromDate}
            />
          </div>
        </div>
        <br />
        <div style={flexcontainer}>
          <div>
            <ActionDateRange style={{ marginTop: "38px", fill: "#f08f4c" }} />
          </div>
          <div>
            <DatePicker
              floatingLabelText="To Date"
              hintText="Select date (to)"
              value={
                this.props.singleData !== undefined
                  ? this.props.singleData.to
                  : this.state.to
              }
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
            <ActionDateRange style={{ marginTop: "38px", fill: "#f08f4c" }} />
          </div>
          <div>
            <DatePicker
              floatingLabelText="Due Date"
              hintText="Select due date"
              errorText={
                this.state.dueDate > this.state.from &&
                "Should be smaller than from date"
              }
              errorStyle={{ color: "#f08f4c" }}
              value={
                this.props.singleData !== undefined
                  ? this.props.singleData.dueDate
                  : this.state.dueDate
              }
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
              floatingLabelText="Reason"
              hintText="Type Reason"
              multiLine={true}
              rows={2}
              rowsMax={4}
              name="reason"
              value={
                this.props.singleData !== undefined
                  ? this.props.singleData.reason
                  : this.state.reason
              }
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
