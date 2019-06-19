import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import AdminPendingTab from "./AdminPendingTab";
import AdminApprovedTab from "./AdminApprovedTab";
import AdminRejectedTab from "./AdminRejectedTab";
import { Tabs, Tab } from "material-ui";
import Layout from "../layouts/Layout";
import withUser from "../hoc/withUser";
import { lightGreen400 } from "material-ui/styles/colors";
class LeaveAdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      tempLeave: [],
      leaveStatus: "Pending"
    };
  }
  handleChange = value => {
    this.setState({
      slideIndex: value
    });
  };

  render() {
    return (
      <Layout navigationTitle="Admin Dashboard" showBackNavigation={true}>
        <div>
          <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
            <Tab
              label="PENDING"
              value={0}
              style={{ backgroundColor: lightGreen400 }}
            />
            <Tab
              label="APPROVED"
              value={1}
              style={{ backgroundColor: lightGreen400 }}
            />
            <Tab
              label="REJECTED"
              value={2}
              style={{ backgroundColor: lightGreen400 }}
            />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <AdminPendingTab
              leaveData={this.props.leaveData}
              userData={this.props.userData}
              adminId={this.props.user.uid}
            />
            <AdminApprovedTab
              leaveData={this.props.leaveData}
              userData={this.props.userData}
              adminId={this.props.user.uid}
            />
            <AdminRejectedTab
              leaveData={this.props.leaveData}
              userData={this.props.userData}
              adminId={this.props.user.uid}
            />
          </SwipeableViews>
        </div>
      </Layout>
    );
  }
}
export default withRouter(withUser(LeaveAdminDashboard));
