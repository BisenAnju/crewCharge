import React from "react";
import { withRouter } from "react-router-dom";
import UserPermission from "../components/UserPermission";

class UserPermissionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("usercontainer");
    return <UserPermission />;
  }
}
export default withRouter(UserPermissionContainer);
