import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LeaveEmployeeHour from "./LeaveEmployeeHour";
import LeaveEmployeeFullDay from "./LeaveEmployeeFullDay";
import Layout from "../layouts/Layout";
import { LeaveApplyRadioButton } from "./ComplaintAddRadioButton";

class LeaveEmployeeApply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveType: "Hour"
    };
  }

  handleChange = (event, index, leaveType) => this.setState({ leaveType });
  validateInput = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <Layout navigationTitle="Apply for Leave" showBackNavigation={true}>
        <div id="error_checking">
          <br />

          <LeaveApplyRadioButton validateLeave={this.validateInput} />

          {this.state.leaveType === "Hour" ? (
            <LeaveEmployeeHour
              leaveType={this.state.leaveType}
              addLeaves={this.props.addLeaves}
              purposeData={this.props.purposeData}
            />
          ) : (
            this.state.leaveType === "Full" && (
              <LeaveEmployeeFullDay
                leaveType={this.state.leaveType}
                addLeaves={this.props.addLeaves}
                purposeData={this.props.purposeData}
              />
            )
          )}
        </div>
      </Layout>
    );
  }
}
export default withRouter(LeaveEmployeeApply);
