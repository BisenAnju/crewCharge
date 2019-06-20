import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import withFirebase from "../hoc/withFirebase";
import ComplaintType from "../components/ComplaintType";

class ComplaintTypeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addComplaint = complaint => {
    this.props.db
      .collection("complaintType")
      .add({
        displayName: complaint.charAt(0).toUpperCase() + complaint.slice(1)
      })
      .then(this.props.history.goBack())
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path={"/complainttype"}
              render={props => (
                <ComplaintType {...props} addComplaint={this.addComplaint} />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withFirebase(withRouter(ComplaintTypeContainer));
