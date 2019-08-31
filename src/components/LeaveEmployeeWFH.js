import React, { Component } from "react";
import { DatePicker, TextField, Snackbar, FlatButton } from "material-ui";
import { ActionDateRange } from "material-ui/svg-icons";
import moment from "moment";

const styles = {
  underlineStyle: {
    borderColor: "#fd914d"
  },
  floatingLabelFocusStyle: {
    color: "#fd914d"
  }
};

class LeaveEmployeeWFH extends Component {
  constructor() {
    super();
    this.state = {
      snackOpen: false,
      from: null,
      to: null,
      reason: "",
      showDiv: false
    };
  }
  componentWillMount() {
    if (this.props.singleData !== undefined) {
      this.setState({
        from: this.props.singleData.from,
        to: this.props.singleData.to,
        reason: this.props.singleData.reason
      });
    }
  }
  validateForm = e => {
    e.preventDefault();
    if (
      this.state.from === null ||
      this.state.to === null ||
      this.state.reason === ""
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
      this.state.reason === ""
    ) {
      this.setState({ snackOpen: true });
      return false;
    }
    this.props.updateLeaveData({ ...this.state }, this.props.leaveType);
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
      to: date,
      showDiv: true
    });
  };

  render() {
    return (
      <div>
        <div style={{ height: "calc(100vh - 148px)" }}>
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
                  <ActionDateRange
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
                <DatePicker
                  textFieldStyle={{
                    margin: "0% 7%",
                    width: "86%",
                    height: "35px",
                    textAlign: "center"
                  }}
                  autoOk
                  formatDate={date => moment(date).format("DD/MM/YYYY")}
                  value={this.state.from}
                  onChange={this.changeFromDate}
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
                  <ActionDateRange
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
                <DatePicker
                  textFieldStyle={{
                    margin: "0% 7%",
                    width: "86%",
                    height: "35px",
                    textAlign: "center"
                  }}
                  autoOk
                  formatDate={date => moment(date).format("DD/MM/YYYY")}
                  value={this.state.to}
                  onChange={this.changeToDate}
                  errorStyle={{ color: "#f08f4c" }}
                  errorText={
                    this.state.from > this.state.to &&
                    "Should be greater than from date"
                  }
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
                  moment(moment(this.state.to), "DD/MM/YYYY HH:mm:ss").diff(
                    moment(moment(this.state.from), "DD/MM/YYYY HH:mm:ss")
                  )
                )
                .format("D") +
                " Day " +
                "  " +
                moment(this.state.from).format("ll") +
                " - " +
                moment(this.state.to).format("ll")}
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
              hintText="Type Reason"
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
                bottom: "0px",
                position: "absolute",
                width: "100%",
                height: "7vh"
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
                bottom: "0px",
                position: "absolute",
                width: "100%",
                height: "7vh"
              }}
            >
              <FlatButton
                style={{
                  color: "white",
                  backgroundColor: "#f08f4c",
                  width: "100%",
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
      </div>
    );
  }
}

export default LeaveEmployeeWFH;
