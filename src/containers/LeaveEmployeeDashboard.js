import React from "react";
import { withRouter } from "react-router-dom";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";
import LeaveEmployeeDashboard from "../components/LeaveEmployeeDashboard";

class LeaveEmployeeDashboardContainer extends React.Component {
  render() {
    return (
      <div>
        <LeaveEmployeeDashboard
          key={this.props.leaveData.leaveId}
          userData={this.props.userData}
          leaveData={this.props.leaveData}
          purposeData={this.props.purposeData}
          isLoading={this.props.isLoading}
        />
      </div>
    );
  }
}
export default withRouter(
  withFirebase(withUser(LeaveEmployeeDashboardContainer))
);
