import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";
import * as moment from "moment";
import TeamAllocationProjectList from "../components/TeamAllocationProjectList";
import TeamAllocationPeoplesListContainer from "./TeamAllocationPeoplesList";
class TeamAllocationProjectListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      usersList: [],
      projectsList: [],
      missionsList: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      leavesList: nextProps.leavesList,
      missionsList: nextProps.missionsList,
      projectsList: nextProps.projectsList,
      usersList: nextProps.usersList,
      nowDate: moment(Date()).format("LL")
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
            <Route
              exact
              path={"/teamallocation/peoplesList"}
              render={props => (
                <TeamAllocationPeoplesListContainer
                  {...this.props}
                  {...this.state}
                />
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
