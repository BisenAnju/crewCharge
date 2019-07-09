import React from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";
import LeaveEmployeeDetails from "../components/LeaveEmployeeDetails";
import LeaveEmployeeApplyContainer from "./LeaveEmployeeApply";
import LeaveEmployeeDashboard from "./LeaveEmployeeDashboard";
class LeaveEmployeeDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      leaveData: [],
      commentData: []
    };
  }

  handleChange = data => {
    let ths = this;

    this.props.db
      .collection("leaves")
      .doc(this.props.match.params.leaveId)
      .collection("comment")
      .add({
        comment: data.remark,
        userId: this.props.user.uid,
        addedOn: new Date()
      })
      .then(() => {
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
            include_player_ids: [data.userPlayerId],
            headings: { en: "Emplyee Rply" },
            data: {
              Route: "/leavedashboard/admin/approvalrejection/",
              Id: ths.props.match.params.leaveId
            }
          };
          sendNotification(message);
        }, 2000);
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  componentWillMount() {
    //get comment data
    this.props.db
      .collection("leaves")
      .doc(this.props.match.params.leaveId)
      .collection("comment")
      .orderBy("addedOn", "desc")
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
              path={"/leavedashboard"}
              render={props => (
                <LeaveEmployeeDashboard
                  key={this.state.leaveData.leaveId}
                  {...props}
                  userData={this.state.userData}
                  leaveData={this.state.leaveData}
                  purposeData={this.props.purposeData}
                  isLoading={this.state.isLoading}
                />
              )}
            />
            <Route
              exact
              path={"/leavedashboard/leavedetails/:leaveId"}
              render={props => (
                <LeaveEmployeeDetails
                  {...props}
                  handleChange={this.handleChange}
                  singleData={this.props.singleData.find(
                    data => data.leaveId === this.props.match.params.leaveId
                  )}
                  commentData={this.state.commentData}
                  userData={this.props.userData}
                  purposeData={this.props.purposeData}
                />
              )}
            />
            <Route
              exact
              path={"/leavedashboard/leaveapply/:mode"}
              render={props => (
                <LeaveEmployeeApplyContainer
                  {...this.props}
                  updateRouter={this.props.updateRouter}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default withFirebase(
  withRouter(withUser(LeaveEmployeeDetailsContainer))
);
