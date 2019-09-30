import React, { Component } from "react";
import {
  RaisedButton,
  SelectField,
  MenuItem,
  DatePicker,
  TextField
} from "material-ui";
import moment from "moment";

class AddMonthlyPayroll extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", month: null, designation: "", salary: 0 };
  }
  handleUserName = (event, index, userName) => this.setState({ userName });
  handleDesignation = (event, index, designation) =>
    this.setState({ designation });
  changeDate = (event, date) => {
    this.setState({
      month: date
    });
  };
  salaryChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handlePayroll = e => {
    e.preventDefault();
    this.props.addPayroll({ ...this.state });
    this.setState({ userName: "", month: null, designation: "", salary: 0 });
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
            {this.props.userData
              .filter(data => data.joiningDate !== undefined)
              .map((user, index) => (
                <MenuItem
                  key={index}
                  value={user.uid}
                  primaryText={user.displayName}
                />
              ))}
          </SelectField>
        </div>

        <div>
          <SelectField
            floatingLabelText="Designation"
            value={this.state.designation}
            onChange={this.handleDesignation}
          >
            <MenuItem value="trainee" primaryText="Trainee" />
            <MenuItem value="developer" primaryText="Software Developer" />
          </SelectField>
        </div>

        <div>
          <DatePicker
            autoOk
            hintText="Salary date"
            formatDate={date => moment(date).format("DD/MM/YYYY")}
            value={this.state.month}
            onChange={this.changeDate}
          />
        </div>

        <div>
          <TextField
            floatingLabelText="Salary"
            onChange={this.salaryChange}
            value={this.state.salary}
            type="number"
            name="salary"
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <RaisedButton
            label="SAVE"
            backgroundColor="#fd914d"
            labelColor="white"
            onClick={this.handlePayroll}
          />
        </div>
      </div>
    );
  }
}
export default AddMonthlyPayroll;
