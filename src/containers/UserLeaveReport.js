import React from "react";
import { withRouter } from "react-router-dom";
import UserLeaveReport from "../components/UserLeaveReport";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";

class UserLeaveReportContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <UserLeaveReport
          leaveData={this.props.leaveData}
          purposeData={this.props.purposeData}
          singleData={this.props.userData.find(
            data => data.uid === this.props.match.params.id
          )}
          from={this.props.match.params.from}
          to={this.props.match.params.to}
        />
      </div>
    );
  }
}
export default withUser(withFirebase(withRouter(UserLeaveReportContainer)));
