import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import { Tabs, Tab } from "material-ui";
import AdminLeaveReport from "./AdminLeaveReport";
import SwipeableViews from "react-swipeable-views";
import * as moment from "moment";

class LeaveReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonthLeave: [],
      slideIndex: 0,
      leaveData: [],
      attendanceData: [],
      currentMonthAttendance: []
    };
  }

  componentWillMount() {
    if (this.props.leaveData !== undefined)
      this.setState(
        {
          leaveData: this.props.leaveData,
          attendanceData: this.props.attendanceData
        },
        () => this.currentMonth(this.state.leaveData, this.state.attendanceData)
      );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.leaveData !== undefined)
      this.setState(
        {
          leaveData: nextProps.leaveData,
          attendanceData: nextProps.attendanceData
        },
        () => this.currentMonth(this.state.leaveData, this.state.attendanceData)
      );
  }

  handleChange = value => {
    if (value === 0) {
      this.currentMonth(this.state.leaveData, this.state.attendanceData);
    } else if (value === 1) {
      this.lastMonth(this.state.leaveData, this.state.attendanceData);
    } else if (value === 2) {
      this.setState({ currentMonthLeave: [] });
    }
    this.setState({
      slideIndex: value
    });
  };

  currentMonth = (leave, attendance) => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    if (leave.length > 0) {
      let currentMonthLeave = leave.filter(
        leaveItem =>
          moment(leaveItem.from).format("L") >= moment(firstDay).format("L") &&
          moment(leaveItem.from).format("L") <= moment(date).format("L")
      );
      let currentMonthAttendance = attendance.filter(
        attendanceItem =>
          moment(attendanceItem.start).format("L") >=
            moment(firstDay).format("L") &&
          moment(attendanceItem.start).format("L") <= moment(date).format("L")
      );
      this.setState({ currentMonthLeave, currentMonthAttendance });
    }
  };

  lastMonth = (leave, attendance) => {
    var date = new Date();
    var prevFirstDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    var prevLastDate = new Date(date.getFullYear(), date.getMonth(), 0);
    let lastMonthLeave = leave.filter(
      leaveItem =>
        moment(leaveItem.from).format("L") >=
          moment(prevFirstDate).format("L") &&
        moment(leaveItem.from).format("L") <= moment(prevLastDate).format("L")
    );
    let lastMonthAttendance = attendance.filter(
      attendanceItem =>
        moment(attendanceItem.start).format("L") >=
          moment(prevFirstDate).format("L") &&
        moment(attendanceItem.start).format("L") <=
          moment(prevLastDate).format("L")
    );
    this.setState({
      currentMonthAttendance: lastMonthAttendance,
      currentMonthLeave: lastMonthLeave
    });
  };
  render() {
    return (
      <Layout navigationTitle="Leave Report" showBackNavigation={true}>
        <div>
          <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}
            tabItemContainerStyle={{ backgroundColor: "transparent" }}
            inkBarStyle={{ backgroundColor: "#f08f4c" }}
          >
            <Tab
              label="This Month"
              value={0}
              style={{
                color: "#f08f4c"
              }}
            />
            <Tab
              label="Last Month"
              value={1}
              style={{
                color: "#f08f4c"
              }}
            />
            <Tab
              label="Custom"
              value={2}
              style={{
                color: "#f08f4c"
              }}
            />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <AdminLeaveReport
              userData={this.props.userData}
              currentMonthAttendance={this.state.currentMonthAttendance}
              currentMonthLeave={this.state.currentMonthLeave}
              slideIndex={this.state.slideIndex}
            />
            <AdminLeaveReport
              currentMonthAttendance={this.state.currentMonthAttendance}
              userData={this.props.userData}
              currentMonthLeave={this.state.currentMonthLeave}
              slideIndex={this.state.slideIndex}
            />
            <AdminLeaveReport
              userData={this.props.userData}
              currentMonthLeave={this.state.currentMonthLeave}
              slideIndex={this.state.slideIndex}
              leaveData={this.props.leaveData}
            />
          </SwipeableViews>
        </div>
      </Layout>
    );
  }
}
export default withRouter(LeaveReport);
