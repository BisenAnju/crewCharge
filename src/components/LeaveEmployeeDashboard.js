import React from "react";
import { withRouter } from "react-router-dom";
import AdminPendingTab from "./AdminPendingTab";
import AdminApprovedTab from "./AdminApprovedTab";
import AdminRejectedTab from "./AdminRejectedTab";
import { FloatingActionButton, Tab, Tabs } from "material-ui";
import SwipeableViews from "react-swipeable-views";
import ContentAdd from "material-ui/svg-icons/content/add";
import Layout from "../layouts/Layout";
const buttonStyle = {
  position: "fixed",
  right: 24,
  bottom: 24
};

class LeaveEmployeeDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slideIndex: 0 };
  }
  handleChange = value => {
    this.setState({
      slideIndex: value
    });
  };
  render() {
    return (
      <Layout navigationTitle="Employee Dashboard" showBackNavigation={true}>
        <div>
          <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}
            tabItemContainerStyle={{ backgroundColor: "transparent" }}
            inkBarStyle={{ backgroundColor: "#f08f4c" }}
          >
            <Tab
              label="PENDING"
              value={0}
              style={{
                color: "#f08f4c"
              }}
            />
            <Tab
              label="APPROVED"
              value={1}
              style={{
                color: "#f08f4c"
              }}
            />
            <Tab
              label="REJECTED"
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
            <AdminPendingTab
              leaveData={this.props.leaveData}
              userData={this.props.userData}
            />
            <AdminApprovedTab
              leaveData={this.props.leaveData}
              userData={this.props.userData}
            />
            <AdminRejectedTab
              leaveData={this.props.leaveData}
              userData={this.props.userData}
            />
          </SwipeableViews>
          <FloatingActionButton
            style={buttonStyle}
            backgroundColor="rgb(253, 145, 77)"
            onClick={e => {
              e.preventDefault();
              this.props.history.push(`/leavedashboard/leaveapply/new`);
            }}
          >
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </Layout>
    );
  }
}
export default withRouter(LeaveEmployeeDashboard);
