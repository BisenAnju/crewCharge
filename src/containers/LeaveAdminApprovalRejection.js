import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter
} from "react-router-dom";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";
import LeaveAdminApprovalRejection from "../components/LeaveAdminApprovalRejection";
import ReactBigCalenderTestContainer from "./ReactBigCalenderTest";

class LeaveAdminApprovalRejectionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      commentData: [],
      playerId: []
    };
  }

  handleChange = data => {
    let ths = this;
    let matchParams = this.props.match.params.leaveId;
    this.props.db
      .collection("leaves")
      .doc(matchParams)
      .update({
        leaveStatus: data.leaveStatus,
        approvedRejectedBy: this.props.user.displayName,
        approvedRejectedOn: new Date()
      })
      .then(ref => {
        if (ref.id !== "undefined") {
          setTimeout(function() {
            var sendNotification = function(data) {
              var headers = {
                "Content-Type": "application/json; charset=utf-8",
                Authorization:
                  "Basic NDkwNGU2ODYtNTgwYS00MDY4LThjN2MtYzNmMGZhMGJmNzNk"
              };

              var options = {
                host: "onesignal.com",
                port: 443,
                path: "/api/v1/notifications",
                method: "POST",
                headers: headers
              };

              var https = require("https");
              var req = https.request(options, function(res) {
                res.on("data", function(data) {
                  console.log("Response:");
                  console.log(JSON.parse(data));
                });
              });

              req.on("error", function(e) {
                console.log("ERROR:");
                console.log(e);
              });

              req.write(JSON.stringify(data));
              req.end();
            };

            var message = {
              app_id: "323e54fd-ee29-4bb2-bafc-e292b01c694f",
              contents: { en: data.remark },
              include_player_ids: ths.state.playerId,
              headings: { en: ths.props.user.displayName },
              data: {
                Route: "/leavedashboard/leavedetails/",
                Id: ref.id
              }
            };

            sendNotification(message);
          }, 2000);
        }
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    this.props.db
      .collection("leaves")
      .doc(matchParams)
      .collection("comment")
      .add({
        comment: data.remark,
        userId: this.props.user.uid,
        addedOn: new Date()
      })
      .then()
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  componentWillMount() {
    //get playerId
    let playerId = [];
    this.props.db
      .collection("users")
      .where("userType", "==", "Admin")
      .get()
      .then(
        snapshot => {
          snapshot.forEach(doc => {
            if (
              doc.exists &&
              doc.data().userNotificationPlayerId !== undefined
            ) {
              const details = doc.data();
              details.id = doc.id;
              playerId.push(details.userNotificationPlayerId);
            }
          });
          this.setState({ playerId });
        },
        err => {
          console.log(`Encountered error: ${err}`);
        }
      );

    //get comment data
    this.props.db
      .collection("leaves")
      .doc(this.props.match.params.leaveId)
      .collection("comment")
      .orderBy("addedOn", "asc")
      .onSnapshot(
        snapshot => {
          const commentData = [];
          snapshot.forEach(doc => {
            if (doc.exists) {
              commentData.push(doc.data());
            }
          });
          this.setState({
            isLoading: false,
            commentData
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
            <Route
              exact
              path={"/leavedashboard/admin/approvalrejection/viewrecord"}
              render={props => <ReactBigCalenderTestContainer {...props} />}
            />
            <Route
              exact
              path={"/leavedashboard/admin/approvalrejection/:leaveId"}
              render={props => (
                <LeaveAdminApprovalRejection
                  {...props}
                  handleChange={this.handleChange}
                  userData={this.props.userData}
                  singleData={this.props.singleData.find(
                    data => data.leaveId === this.props.match.params.leaveId
                  )}
                  commentData={this.state.commentData}
                  purposeData={this.props.purposeData}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withUser(
  withFirebase(withRouter(LeaveAdminApprovalRejectionContainer))
);
