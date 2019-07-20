import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { TimePicker, TextField, Snackbar, FlatButton } from "material-ui";
import { ImageTimer } from "material-ui/svg-icons";
import { PurposeRadioButton } from "./ComplaintAddRadioButton";
import moment from "moment";

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
      dueDate: null,
      showDiv: false
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
    this.setState({ to: date, showDiv: true });
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
            margin: "7% 4% 0% 4%",
            backgroundColor: "#f3f5d1"
          }}
        >
          <div
            style={{
              display: "flex",
              borderRight: "1px solid gray",
              width: "50%",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <ImageTimer
                  style={{
                    fill: "#f08f4c",
                    height: "25px",
                    width: "25px"
                  }}
                />
              </div>
              <div>From</div>
            </div>

            <div>
              <TimePicker
                textFieldStyle={{
                  margin: "0% 7%",
                  width: "86%",
                  height: "35px",
                  textAlign: "center"
                }}
                // defaultTime={{ 9: 30 }}
                autoOk={true}
                format="ampm"
                value={this.state.from}
                onChange={this.handleChangeTimePicker1}
                minutesStep={60}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <ImageTimer
                  style={{
                    fill: "#f08f4c",
                    height: "25px",
                    width: "25px"
                  }}
                />
              </div>
              <div>To</div>
            </div>
            <div>
              <TimePicker
                textFieldStyle={{
                  margin: "0% 7%",
                  width: "86%",
                  height: "35px",
                  textAlign: "center"
                }}
                // defaultTime={{ 5: 30 }}
                autoOk={true}
                format="ampm"
                value={this.state.to}
                onChange={this.handleChangeTimePicker2}
                errorStyle={{ color: "#f08f4c" }}
                errorText={
                  this.state.from > this.state.to &&
                  "Should be greater than from time"
                }
                minutesStep={60}
              />
            </div>
          </div>
        </div>
        {this.state.showDiv ? (
          <div
            style={{
              marginTop: "7%",
              textAlign: "center",
              color: "midnightblue",
              fontFamily: "monospace"
            }}
          >
            {moment
              .utc(
                moment(moment(this.state.to), "HH:mm:ss").diff(
                  moment(moment(this.state.from), "HH:mm:ss")
                )
              )
              .format("HH:mm") +
              " Hours " +
              moment(new Date()).format("ll")}
          </div>
        ) : null}

        <div
          style={{
            margin: "7% 4% 0% 4%",
            backgroundColor: "#f3f5d1",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            border: "1px solid gray",
            borderRadius: "5px"
          }}
        >
          <TextField
            underlineFocusStyle={styles.underlineStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            hintText="Reason"
            multiLine={true}
            rows={2}
            rowsMax={4}
            name="reason"
            value={this.state.reason}
            onChange={this.textChange}
          />
        </div>

        {this.props.singleData === undefined ? (
          <div
            style={{
              display: "flex",
              marginTop: "40%"
            }}
          >
            <FlatButton
              style={{
                color: "white",
                backgroundColor: "#f08f4c",
                width: "100%",
                margin: "0px 15px 0px 15px"
              }}
              label="SUBMIT"
              onClick={this.validateForm}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              marginTop: "40%"
            }}
          >
            <FlatButton
              style={{
                color: "white",
                backgroundColor: "#f08f4c",
                width: "100%%",
                margin: "0px 15px 0px 15px"
              }}
              label="UPDATE"
              onClick={this.updateLeave}
            />
          </div>
        )}

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
