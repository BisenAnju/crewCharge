import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { List, ListItem, Avatar, DatePicker } from "material-ui";
import * as moment from "moment";

class AdminLeaveReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: false,
      leaveList: [],
      leaveCount: [],
      from: null,
      to: null
    };
  }
  componentWillMount() {
    if (this.props.currentMonthLeave !== undefined)
      this.setState({ leaveList: this.props.currentMonthLeave });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentMonthLeave !== undefined)
      this.setState({ leaveList: nextProps.currentMonthLeave });
  }
  changeFromDate = (event, date) => {
    this.setState(
      {
        from: date
      },
      () => {
        if (this.state.to !== null) {
          let filterLeaves = this.props.leaveData.filter(
            leave =>
              moment(leave.from).format("L") >=
                moment(this.state.from).format("L") &&
              moment(leave.from).format("L") <=
                moment(this.state.to).format("L")
          );
          this.setState({ leaveList: filterLeaves });
        }
      }
    );
  };
  changeToDate = (event, date) => {
    this.setState(
      {
        to: date
      },
      () => {
        let filterLeaves = this.props.leaveData.filter(
          leave =>
            moment(leave.from).format("L") >=
              moment(this.state.from).format("L") &&
            moment(leave.from).format("L") <= moment(this.state.to).format("L")
        );
        this.setState({ leaveList: filterLeaves });
      }
    );
  };
  render() {
    return (
      <div
        style={{
          marginTop: "5%",
          height: "80vh",
          overflow: "scroll",
          display: "self"
        }}
      >
        {this.props.slideIndex === 2 ? (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <DatePicker
                textFieldStyle={{
                  margin: "0% 7%",
                  width: "86%",
                  height: "35px",
                  textAlignLast: "center",
                  borderRadius: "15px",
                  backgroundColor: "#dbf9e3"
                }}
                hintText="From"
                autoOk
                formatDate={date => moment(date).format("DD/MM/YYYY")}
                value={this.state.from}
                onChange={this.changeFromDate}
              />
            </div>
            <div>
              <DatePicker
                textFieldStyle={{
                  margin: "0% 7%",
                  width: "86%",
                  height: "35px",
                  textAlignLast: "center",
                  borderRadius: "15px",
                  backgroundColor: "#dbf9e3"
                }}
                hintText="To"
                autoOk
                formatDate={date => moment(date).format("DD/MM/YYYY")}
                value={this.state.to}
                onChange={this.changeToDate}
              />
            </div>
          </div>
        ) : null}

        <List>
          {this.props.userData.map((user, index) => {
            let leaveCount = [];
            if (this.state.leaveList.length > 0) {
              leaveCount = this.state.leaveList.filter(
                leave => leave.userId === user.uid
              );
            }
            return (
              <ListItem
                key={index}
                primaryText={user.displayName}
                leftIcon={
                  <Avatar
                    src={user.photoURL}
                    style={{ height: "40px", width: "40px" }}
                  />
                }
                rightIcon={
                  <span style={{ color: "maroon", fontWeight: "bold" }}>
                    {leaveCount.length + " L "}
                  </span>
                }
                onClick={() => {
                  this.setState({ currentUser: user }, () => {
                    this.props.slideIndex === 2
                      ? this.props.history.push(
                          "/leaveReport/" +
                            user.uid +
                            "/" +
                            this.props.slideIndex +
                            "/" +
                            this.state.from +
                            "/" +
                            this.state.from
                        )
                      : this.props.history.push(
                          "/leaveReport/" +
                            user.uid +
                            "/" +
                            this.props.slideIndex +
                            "/" +
                            new Date() +
                            "/" +
                            new Date()
                        );
                  });
                }}
              />
            );
          })}
        </List>
      </div>
    );
  }
}

export default withRouter(AdminLeaveReport);