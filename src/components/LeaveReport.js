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
      leaveData: []
    };
  }

  componentWillMount() {
    // console.log(this.props.match.params.index);
    // if (this.props.match.params.index === "1") {
    //   this.setState({ slideIndex: 1 });
    // } else if (this.props.match.params.index === "2") {
    //   this.setState({ slideIndex: 2 });
    // } else {
    //   this.setState({ slideIndex: 0 });
    // }

    if (this.props.leaveData !== undefined)
      this.setState({ leaveData: this.props.leaveData }, () =>
        this.currentMonth(this.state.leaveData)
      );
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props.match.params.index);

    if (nextProps.leaveData !== undefined)
      this.setState({ leaveData: nextProps.leaveData }, () =>
        this.currentMonth(this.state.leaveData)
      );
  }

  handleChange = value => {
    if (value === 0) {
      this.currentMonth(this.state.leaveData);
    } else if (value === 1) {
      this.lastMonth(this.state.leaveData);
    } else if (value === 2) {
      this.setState({ currentMonthLeave: [] });
    }
    this.setState({
      slideIndex: value
    });
  };

  currentMonth = nextProps => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    if (nextProps.length > 0) {
      let currentMonthLeave = nextProps.filter(
        leave =>
          moment(leave.from).format("L") >= moment(firstDay).format("L") &&
          moment(leave.from).format("L") <= moment(date).format("L")
      );
      this.setState({ currentMonthLeave });
    }
  };

  lastMonth = nextProps => {
    var date = new Date();
    var prevFirstDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    var prevLastDate = new Date(date.getYear(), date.getMonth(), 0);

    let lastMonthLeave = nextProps.filter(
      leave =>
        moment(leave.from).format("L") >= moment(prevFirstDate).format("L") &&
        moment(leave.from).format("L") <= moment(prevLastDate).format("L")
    );
    this.setState({ currentMonthLeave: lastMonthLeave });
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
              currentMonthLeave={this.state.currentMonthLeave}
              slideIndex={this.state.slideIndex}
            />
            <AdminLeaveReport
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
