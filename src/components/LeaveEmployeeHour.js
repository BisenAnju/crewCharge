import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  TimePicker,
  RaisedButton,
  TextField,
  Snackbar,
  SelectField,
  MenuItem
} from "material-ui";
import {
  ImageTimer,
  CommunicationComment,
  ActionList
} from "material-ui/svg-icons";

const flexcontainer = {
  display: "flex",
  justifyContent: "center"
};
class LeaveEmployeeHourLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purpose: null,
      from: null,
      to: null,
      snackOpen: false,
      reason: null,
      messageText: "",
      playerId: []
    };
  }
  handleChange = (event, index, purpose) => this.setState({ purpose });
  //Handle change time picker for both clocks
  handleChangeTimePicker1 = (event, date) => {
    this.setState({ from: date });
  };
  handleChangeTimePicker2 = (event, date) => {
    this.setState({ to: date });
  };
  textChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
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
    this.setState({ snackOpen: false });
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
            <ImageTimer style={{ marginTop: "50%", fill: "#f08f4c" }} />
          </div>
          <div>
            <TimePicker
              format="ampm"
              hintText="Select Time (from)"
              value={this.state.from}
              onChange={this.handleChangeTimePicker1}
            />
          </div>
        </div>
        <br />
        <div style={flexcontainer}>
          <div>
            <ImageTimer style={{ marginTop: "50%", fill: "#f08f4c" }} />
          </div>
          <div>
            <TimePicker
              format="ampm"
              hintText="Select Time (to)"
              value={this.state.to}
              errorStyle={{ color: "#f08f4c" }}
              errorText={
                this.state.from > this.state.to &&
                "Should be greater than from time"
              }
              onChange={this.handleChangeTimePicker2}
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
export default withRouter(LeaveEmployeeHourLeave);
