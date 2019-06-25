import React from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import TeamAllocationMissionList from "../components/TeamAllocationMissionList";
class TeamAllocationMissionListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      usersList: [],
      missionsList: []
    };
  }
  componentWillMount() {
    let usersList = [];
    let missionsList = [];
    this.props.db
      .collection("users")
      .orderBy("displayName")
      .onSnapshot(snapshot => {
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
    this.props.db
      .collection("missions")
      .where("status", "==", "Active")
      .orderBy("name")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(doc => {
          if (doc.doc.exists) {
            const missionsDetails = doc.doc.data();
            missionsDetails.missionsId = doc.doc.id;
            missionsList.push(missionsDetails);
          } else {
            alert("No Data Found");
          }
        });
        this.setState({ isLoading: false, missionsList });
      });
  }
  handleEditChange = () => {};
  handleArchiveChange = () => {};
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path={"/teamallocation/missionlist"}
              render={props => (
                <TeamAllocationMissionList
                  {...this.props}
                  {...this.state}
                  handleEditChange={this.handleEditChange}
                  handleArchiveChange={this.handleArchiveChange}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default withRouter(TeamAllocationMissionListContainer);
