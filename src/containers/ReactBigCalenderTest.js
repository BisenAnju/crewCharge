import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import ReactBigCalenderTest from "../components/ReactBigCalenderTest";

class ReactBigCalenderTestContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Router>
          <Route
            exact
            path={"/leavedashboard/admin/approvalrejection/viewrecord"}
            render={props => <ReactBigCalenderTest {...props} />}
          />
        </Router>
      </div>
    );
  }
}

export default ReactBigCalenderTestContainer;
