import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import LeaveEmployeeDashboardContainer from "./LeaveEmployeeDashboard";
import LeaveAdminDashboardContainer from "./LeaveAdminDashboard";
import LeaveEmployeeApplyContainer from "./LeaveEmployeeApply";
import LeaveEmployeeDetailsContainer from "./LeaveEmployeeDetails";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";

class LeaveDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      purposeData: [],
      leaveData: [],
      userData: []
    };
  }
  componentWillMount() {
    // get purpose
    this.props.db
      .collection("leaves")
      .where("userId", "==", this.props.user.uid)
      .orderBy("addedOn", "desc")
      .onSnapshot(
        snapshot => {
          const leaveData = [];
          snapshot.forEach(doc => {
            if (doc.exists) {
              const leave = doc.data();
              leave.leaveId = doc.id;
              leave.from = new Date(leave.from.seconds * 1000);
              leave.to = new Date(leave.to.seconds * 1000);
              leave.addedOn = new Date(leave.addedOn.seconds * 1000);
              if (leave.dueDate != null) {
                leave.dueDate = new Date(leave.dueDate.seconds * 1000);
              }
              if (leave.approvedRejectedOn != null) {
                leave.approvedRejectedOn = new Date(
                  leave.approvedRejectedOn.seconds * 1000
                );
              }
              leaveData.push(leave);
            }
          });
          this.setState({
            isLoading: false,
            leaveData
          });
        },
        err => {
          console.log(`Encountered error: ${err}`);
        }
      );

    this.props.db.collection("users").onSnapshot(
      snapshot => {
        const userData = [];
        snapshot.forEach(doc => {
          if (doc.exists) {
            userData.push(doc.data());
          }
        });
        this.setState({
          isLoading: false,
          userData
        });
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );
    this.props.db
      .collection("leavePurpose")
      .get()
      .then(
        doc => {
          const purposeData = [];
          doc.forEach(docitem => {
            if (docitem.exists) {
              purposeData.push(docitem.data());
            }
          });
          this.setState({
            isLoading: false,
            purposeData
          });
        },
        err => {
          console.log(`Encountered error: ${err}`);
        }
      );
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <div>
              <Route
                exact
                path={"/leavedashboard"}
                render={props => (
                  <LeaveEmployeeDashboardContainer {...props} {...this.state} />
                )}
              />
              <Route
                exact
                path={"/leavedashboard/leaveapply/:mode"}
                render={props => (
                  <LeaveEmployeeApplyContainer
                    {...props}
                    {...this.state}
                    singleData={this.state.leaveData}
                  />
                )}
              />
              <Route
                exact
                path={"/leavedashboard/leavedetails/:leaveId"}
                render={props => (
                  <LeaveEmployeeDetailsContainer
                    {...props}
                    {...this.state}
                    singleData={this.state.leaveData}
                  />
                )}
              />
              <Route
                exact
                path={"/leavedashboard/admin"}
                render={props => (
                  <LeaveAdminDashboardContainer {...props} {...this.state} />
                )}
              />
            </div>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(withFirebase(withUser(LeaveDashboardContainer)));
