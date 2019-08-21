import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { RaisedButton, SelectField, MenuItem, TextField } from "material-ui";
import MultipleDatePicker from "react-multiple-datepicker";

const holidayCategory = [
  <MenuItem value="saturdays" key="saturday" primaryText="Saturday" />,
  <MenuItem value="sundays" key="sunday" primaryText="Sunday" />,
  <MenuItem value="festivals" key="festival" primaryText="Festival" />,
  <MenuItem value="others" key="other" primaryText="Other" />
];
class AddHolidays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holidays: [],
      category: "",
      reason: ""
    };
  }
  textChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCategory = (event, index, category) => {
    this.setState({ category });
  };
  handleHoliday = e => {
    e.preventDefault();
    // if (this.state.purpose === "") {
    //   this.setState({ snackOpen: true });
    //   return false;
    // }
    this.props.addHolidays({ ...this.state }, () =>
      this.setState({
        holidays: [],
        category: ""
      })
    );
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
          <MultipleDatePicker
            onSubmit={dates => this.setState({ holidays: dates })}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <SelectField
            floatingLabelText="Select category"
            value={this.state.category}
            onChange={this.handleCategory}
          >
            {holidayCategory}
          </SelectField>
        </div>

        <div style={{ marginTop: "10px" }}>
          <TextField
            hintText="Reason"
            name="reason"
            value={this.state.reason}
            onChange={this.textChange}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <RaisedButton
            label="SAVE"
            backgroundColor="#fd914d"
            labelColor="white"
            onClick={this.handleHoliday}
          />
        </div>
      </div>
    );
  }
}
export default withRouter(AddHolidays);
