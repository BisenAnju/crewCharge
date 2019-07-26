import React from "react";
import { withRouter } from "react-router-dom";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";
import LeaveEmployeeApply from "../components/LeaveEmployeeApply";
import moment from "moment";

class LeaveEmployeeApplyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, player_ids: [] };
  }
  componentWillMount() {
    let player_ids = [];
    this.props.db
      .collection("users")
      .where("userType", "==", "Admin")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.exists && doc.data().userNotificationPlayerId !== undefined) {
            const details = doc.data();
            details.id = doc.id;
            player_ids.push(details.userNotificationPlayerId);
          }
        });
        this.setState({ player_ids });
      });
  }
  // Add leaves data
  addLeaves = (leaveData, leaveType) => {
    let newDueDate = moment.utc(moment().subtract(1, "days"))._d;
    let dueDate;
    if (leaveData.dueDate != null) {
      dueDate = leaveData.dueDate;
    } else {
      dueDate = newDueDate;
    }
    const addData = {
      leaveType,
      leaveStatus: "Pending",
      from: leaveData.from,
      to: leaveData.to,
      dueDate,
      purpose: leaveData.purpose,
      addedOn: new Date(),
      reason: leaveData.reason,
      approvedRejectedBy: null,
      approvedRejectedOn: null,
      userId: this.props.user.uid
    };
    this.props.db
      .collection("leaves")
      .add(addData)
      .then(ref => {
        console.log(this.state.player_ids);
        if (ref.id !== "undefined") {
          let ths = this;
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
              contents: { en: "Requested For New Leave" },
              include_player_ids: ths.state.player_ids,
              priority: 10,
              headings: { en: ths.props.user.displayName },
              data: {
                route: "/leavedashboard/admin/approvalrejection/",
                id: ref.id
              }
            };

            sendNotification(message);
          }, 2000);
        }
      }, this.props.history.goBack())
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  updateLeaveData = (leaveData, leaveType) => {
    this.props.db
      .collection("leaves")
      .doc(this.props.match.params.mode)
      .update({
        leaveType,
        leaveStatus: "Pending",
        from: leaveData.from,
        to: leaveData.to,
        dueDate: leaveData.dueDate,
        purpose: leaveData.purpose,
        reason: leaveData.reason
      })
      .then(() => {
        if (this.props.match.params.mode !== "undefined") {
          let ths = this;

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
          var data = {
            app_id: "323e54fd-ee29-4bb2-bafc-e292b01c694f",
            contents: { en: "Updated Leave" },
            include_player_ids: ths.state.player_ids,
            priority: 10,
            headings: { en: ths.props.user.displayName },
            data: {
              route: "/leavedashboard/admin/approvalrejection/",
              id: this.props.match.params.mode
            }
          };

          var https = require("https");
          var req = https.request(options, res => {
            res.on("data", data => {});
          });

          req.on("error", e => {
            console.log("ERROR:");
            console.log(e);
          });
          req.write(JSON.stringify(data));
          req.end();
          this.props.history.push("/leavedashboard");
        }
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  render() {
    return (
      <LeaveEmployeeApply
        addLeaves={this.addLeaves}
        updateLeaveData={this.updateLeaveData}
        singleData={this.props.singleData.find(
          data => data.leaveId === this.props.match.params.mode
        )}
        isLoading={this.state.isLoading}
        purposeData={this.props.purposeData}
      />
    );
  }
}
export default withRouter(withFirebase(withUser(LeaveEmployeeApplyContainer)));
