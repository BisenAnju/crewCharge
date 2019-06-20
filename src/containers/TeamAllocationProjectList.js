import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";
import TeamAllocationProjectList from "../components/TeamAllocationProjectList";
class TeamAllocationProjectListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      usersList: [],
      projectsList: []
    };
  }
  componentWillMount() {
    let usersList = [];
    let projectsList = [];
    this.props.db.collection("users").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(doc => {
        if (doc.doc.exists) {
          const usersDetails = doc.doc.data();
          usersDetails.userId = doc.doc.id;
          usersList.push(usersDetails);
        } else {
          alert("No Data Found");
        }
      });
      this.setState({ isLoading: false, usersList });
    });
    this.props.db.collection("projects").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(doc => {
        if (doc.doc.exists) {
          const projectDetails = doc.doc.data();
          projectDetails.projectId = doc.doc.id;
          projectsList.push(projectDetails);
        } else {
          alert("No Data Found");
        }
      });
      this.setState({ isLoading: false, projectsList });
    });
  }
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path={"/teamallocation/projectList"}
              render={props => (
                <TeamAllocationProjectList {...this.props} {...this.state} />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(
  withFirebase(withUser(TeamAllocationProjectListContainer))
);
