import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { TimePicker, RaisedButton, TextField, Snackbar } from "material-ui";
import { ImageTimer, CommunicationComment } from "material-ui/svg-icons";
import { PurposeRadioButton } from "./ComplaintAddRadioButton";

const flexcontainer = {
  display: "flex",
  justifyContent: "center"
};

const styles = {
  underlineStyle: {
    borderColor: "#fd914d"
  },
  floatingLabelFocusStyle: {
    color: "#fd914d"
  }
};
class LeaveEmployeeHourLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purpose: "",
      from: null,
      to: null,
      snackOpen: false,
      reason: "",
      playerId: [],
      dueDate: null
    };
  }

  componentWillMount() {
    if (this.props.singleData !== undefined) {
      this.setState({
        purpose: this.props.singleData.purpose,
        from: this.props.singleData.from,
        to: this.props.singleData.to,
        reason: this.props.singleData.reason
      });
    }
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
      this.state.reason === "" ||
      this.state.purpose === ""
    ) {
      this.setState({ snackOpen: true });
      return false;
    }
    this.props.addLeaves({ ...this.state }, this.props.leaveType);
  };
  updateLeave = e => {
    e.preventDefault();
    if (
      this.state.from === null ||
      this.state.to === null ||
      this.state.reason === "" ||
      this.state.purpose === ""
    ) {
      this.setState({ snackOpen: true });
      return false;
    }
    this.props.updateLeaveData({ ...this.state }, this.props.leaveType);
  };
  handleRequestClose = () => {
    this.setState({ snackOpen: false });
  };
  render() {
    return (
      <div>
        <PurposeRadioButton
          validatePurpose={this.validatePurpose}
          purpose={this.state.purpose}
          purposeData={this.props.purposeData}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <div style={{ display: "flex" }}>
            {/* <ImageTimer
              style={{
                fill: "#f08f4c",
                margin: "20% 5% 0% 0%",
                height: "30px",
                width: "30px"
              }}
            /> */}
            <TimePicker
              textFieldStyle={{
                width: "80%"
              }}
              format="ampm"
              floatingLabelText="From"
              hintText="Time (from)"
              value={this.state.from}
              onChange={this.handleChangeTimePicker1}
              minutesStep={60}
            />
          </div>

          <div style={{ display: "flex" }}>
            {/* <ImageTimer
              style={{
                fill: "#f08f4c",
                margin: "20% 5% 0% 0%",
                height: "30px",
                width: "30px"
              }}
            /> */}
            <TimePicker
              textFieldStyle={{
                width: "80%"
              }}
              format="ampm"
              floatingLabelText="to"
              hintText="Time (to)"
              value={this.state.to}
              onChange={this.handleChangeTimePicker2}
              minutesStep={60}
            />
          </div>
        </div>

        {/* <div
          style={{
            display: "flex",
            marginTop: "8%",
            backgroundColor: "#eae8de",
            height: "10vh"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "45%",
                borderRight: "1px solid gray",
                alignItems: "center"
              }}
            >
              <div>
                <ImageTimer style={{ fill: "#f08f4c" }} />
              </div>
              <div>
                <TimePicker
                  textFieldStyle={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                  }}
                  format="ampm"
                  floatingLabelText="From"
                  hintText="Time (from)"
                  value={this.state.from}
                  onChange={this.handleChangeTimePicker1}
                  minutesStep={60}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "45%",
                alignItems: "center"
              }}
            >
              <div>
                <ImageTimer style={{ fill: "#f08f4c" }} />
              </div>
              <div>
                <TimePicker
                  textFieldStyle={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                  }}
                  format="ampm"
                  floatingLabelText="to"
                  hintText="Time (to)"
                  value={this.state.to}
                  onChange={this.handleChangeTimePicker2}
                  minutesStep={60}
                />
              </div>
            </div>
          </div>
        </div> */}

        {/* <div style={flexcontainer}>
          <div>
            <CommunicationComment
              style={{ margin: "35px 10px 0px 0px", fill: "#f08f4c" }}
            />
          </div>
          <div>
            <TextField
              underlineFocusStyle={styles.underlineStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              floatingLabelText="Reason"
              hintText="Type Reason"
              multiLine={true}
              rows={2}
              rowsMax={4}
              name="reason"
              value={this.state.reason}
              onChange={this.textChange}
            />
          </div>
        </div> */}

        <br />
        <center>
          {this.props.singleData === undefined ? (
            <div className="flexAppItem">
              <RaisedButton
                label="SUBMIT"
                backgroundColor="rgb(253, 145, 77)"
                labelColor="white"
                onClick={this.validateForm}
              />
            </div>
          ) : (
            <div className="flexAppItem">
              <RaisedButton
                label="UPDATE"
                backgroundColor="rgb(253, 145, 77)"
                labelColor="white"
                onClick={this.updateLeave}
              />
            </div>
          )}
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
