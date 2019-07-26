import React from "react";
import { withRouter } from "react-router-dom";
import PermissionList from "../components/PermissionList";

class PermissionListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PermissionList
        userData={this.props.userData}
        updateRole={this.props.updateRole}
      />
    );
  }
}
export default withRouter(PermissionListContainer);
