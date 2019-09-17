import React from "react";
import { withRouter } from "react-router-dom";
import Payroll from "../components/Payroll";
import withFirebase from "../hoc/withFirebase";

class PayrollContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Payroll />
      </div>
    );
  }
}
export default withFirebase(withRouter(PayrollContainer));
