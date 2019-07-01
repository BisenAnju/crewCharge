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
  componentWillMount() {
    if (this.props.singleData !== undefined) {
      this.props.singleData.leaveType === "Full"
        ? this.setState({ leaveType: "Full" })
        : this.setState({ leaveType: "Hour" });
    }
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

          <LeaveApplyRadioButton
            validateLeave={this.validateInput}
            {...this.state}
          />

          {this.state.leaveType === "Hour" ? (
            <LeaveEmployeeHour
              {...this.props}
              leaveType={this.state.leaveType}
            />
          ) : (
            this.state.leaveType === "Full" && (
              <LeaveEmployeeFullDay
                {...this.props}
                leaveType={this.state.leaveType}
              />
            )
          )}
        </div>
      </Layout>
    );
  }
}
export default withRouter(LeaveEmployeeApply);
