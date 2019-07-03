import React from "react";
import withFirebase from "../hoc/withFirebase";
import NewComplaint from "../components/ComplaintAdd";
import withUser from "../hoc/withUser";
import details from "material-ui/svg-icons/image/details";

class NewComplaintContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playerIds: [], publicKeys: [], adminDetails: [] };
  }
  componentWillMount() {
    let playerIds = [],
      publicKeys = [],
      adminDetails = [];
    this.props.db
      .collection("users")
      .where("userType", "==", "Admin")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data());
          if (doc.exists && doc.data().userNotificationPlayerId !== undefined) {
            const details = doc.data();
            details.id = doc.id;
            playerIds.push(details.userNotificationPlayerId);
            publicKeys.push(details.publicKeys);
            adminDetails.push(details);
          }
        });
        this.setState({ adminDetails, playerIds, publicKeys });
      });
  }
  AddComplaint = data => {
    let ths = this;
    this.props.db
      .collection("complaints")
      .add({
        userId: this.props.user.uid,
        complaintType: data.complaintType,
        isAnonymous: data.isAnonymous,
        isArchived: false,
        title: data.title.charAt(0).toUpperCase() + data.title.slice(1),
        description:
          data.description.charAt(0).toUpperCase() + data.description.slice(1),
        priority: data.priority,
        addedOn: new Date()
      })
      .then(ref => {
        if (ref.id !== "undefined") {
          setTimeout(function() {
            ths.props.history.push("/complaintlist");
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
              contents: { en: data.complaintType },
              include_player_ids: ths.state.playerIds,
              headings: { en: "New Complaint" },
              data: { Route: "/complaintview/", Id: ref.id }
            };
            console.log(ths.state.playerIds);
            // sendNotification(message);
          }, 2000);
        }
      });
  };
  render() {
    return (
      <NewComplaint
        complaintType={this.props.complaintType}
        AddComplaint={this.AddComplaint}
        adminDetails={this.state.adminDetails}
      />
    );
  }
}

export default withUser(withFirebase(NewComplaintContainer));
