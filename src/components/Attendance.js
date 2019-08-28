import React, { Component } from "react";
import Layout from "../layouts/Layout";
import { List, ListItem, Avatar } from "material-ui";
import moment from "moment";
class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: false,
      currentMonthAttendance: []
    };
  }

  componentWillMount() {
    this.getMonth(this.props.attendanceData);
  }

  componentWillReceiveProps(nextProps) {
    this.getMonth(nextProps.attendanceData);
  }

  getMonth = data => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    if (data.length > 0) {
      let currentMonthAttendance = data.filter(
        attendance =>
          moment(attendance.date).format("L") >= moment(firstDay).format("L") &&
          moment(attendance.date).format("L") <= moment(date).format("L")
      );
      this.setState({ currentMonthAttendance });
    }
  };
  render() {
    return (
      <Layout navigationTitle="User Attendance" showBackNavigation={true}>
        <div
          style={{
            height: "90vh",
            overflow: "scroll",
            display: "self"
          }}
        >
          <List>
            {this.props.userData.map((user, index) => {
              let totalInTime = [];
              let sum = 0;
              let avg = 0;
              if (this.state.currentMonthAttendance.length > 0) {
                this.state.currentMonthAttendance
                  .filter(attendance => attendance.userId === user.uid)
                  .map(item =>
                    item.in !== ""
                      ? (totalInTime.push(parseFloat(item.in)),
                        (sum += parseFloat(item.in)))
                      : null
                  );
                avg = sum / totalInTime.length;
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
                      {!isNaN(avg) ? avg.toFixed(2) : 0}
                    </span>
                  }
                  onClick={() => {
                    this.setState({ currentUser: user }, () =>
                      this.props.history.push("/attendance/" + user.uid)
                    );
                  }}
                />
              );
            })}
          </List>
        </div>
      </Layout>
    );
  }
}
export default Attendance;
