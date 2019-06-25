import React from "react";
import withFirebase from "../hoc/withFirebase";
import NewComplaint from "../components/ComplaintAdd";
import withUser from "../hoc/withUser";

class NewComplaintContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { player_ids: [] };
  }
  componentWillMount() {
    let player_ids = [];
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
            player_ids.push(details.userNotificationPlayerId);
          }
        });
        this.setState({ player_ids });
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
          setTimeout(function () {
            ths.props.history.push("/complaintlist");
            var sendNotification = function (data) {
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
              var req = https.request(options, function (res) {
                res.on("data", function (data) {
                  console.log("Response:");
                  console.log(JSON.parse(data));
                });
              });

              req.on("error", function (e) {
                console.log("ERROR:");
                console.log(e);
              });

              req.write(JSON.stringify(data));
              req.end();
            };
            var message = {
              app_id: "323e54fd-ee29-4bb2-bafc-e292b01c694f",
              contents: { en: data.complaintType },
              include_player_ids: ths.state.player_ids,
              headings: { en: "New Complaint" },
              data: { Route: "/complaintview/", Id: ref.id }
            };
            console.log(ths.state.player_ids);
            sendNotification(message);
          }, 2000);
        }
      });
  };
  render() {
    return <NewComplaint AddComplaint={this.AddComplaint} />;
  }
}

export default withUser(withFirebase(NewComplaintContainer));
