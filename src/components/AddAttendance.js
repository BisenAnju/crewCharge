import React, { Component } from "react";
import {
  RaisedButton,
  SelectField,
  MenuItem,
  DatePicker,
  TimePicker
} from "material-ui";
import moment from "moment";

class AddAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", attDate: null, inTime: null, outTime: null };
  }
  handleUserName = (event, index, userName) => this.setState({ userName });
  changeDate = (event, date) => {
    this.setState({
      attDate: date
    });
  };
  handleInTime = (event, date) => {
    this.setState({ inTime: date });
  };
  handleOutTime = (event, date) => {
    this.setState({ outTime: date });
  };
  handleAttendance = e => {
    e.preventDefault();
    this.props.addAttendance({ ...this.state }, () => alert("hiiiii"));
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <div>
          <SelectField
            maxHeight={180}
            floatingLabelText="Select Name"
            value={this.state.userName}
            onChange={this.handleUserName}
          >
            {this.props.userData.map((user, index) => (
              <MenuItem
                key={index}
                value={user.uid}
                primaryText={user.displayName}
              />
            ))}
          </SelectField>
        </div>

        <div>
          <DatePicker
            autoOk
            hintText="Attendance date"
            formatDate={date => moment(date).format("DD/MM/YYYY")}
            value={this.state.attDate}
            onChange={this.changeDate}
          />
        </div>

        <div>
          <TimePicker
            autoOk
            format="24hr"
            hintText="In time"
            value={this.state.inTime}
            onChange={this.handleInTime}
          />
        </div>
        <div>
          <TimePicker
            autoOk
            format="24hr"
            hintText="Out time"
            value={this.state.outTime}
            onChange={this.handleOutTime}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <RaisedButton
            label="SAVE"
            backgroundColor="#fd914d"
            labelColor="white"
            onClick={this.handleAttendance}
          />
        </div>
      </div>
    );
  }
}
export default AddAttendance;
