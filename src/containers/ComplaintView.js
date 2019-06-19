import React from "react";
import withFirebase from "../hoc/withFirebase";
import ComplaintView from "../components/ComplaintView";

class ComplaintViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isAdmin: false,
      detail: []
    };
    this.submit = this.submit.bind(this);
  }
  submit(adminReply, statusByAdmin) {
    let ths = this;
    this.props.db
      .collection("complaints")
      .doc(this.props.match.params.id)
      .update({ adminReply, statusByAdmin })
      .then(function() {
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
          contents: { en: statusByAdmin },
          include_player_ids: [ths.state.detail.playerid],
          headings: { en: "Complaint Status" },
          data: { Route: "/complaintview/", Id: ths.props.match.params.id }
        };

        sendNotification(message);
      });
  }
  componentWillMount() {
    this.props.db
      .collection("users")
      .doc(this.props.loggedInUser.uid)
      .get()
      .then(doc => {
        if (doc.data().userType === "Admin") {
          this.setState({ isAdmin: true });
        }
      });
    this.props.db
      .collection("complaints")
      .doc(this.props.match.params.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          const detail = doc.data();
          detail.date = doc.data().addedOn.toDate();
          let userdata = this.props.userData.find(
            data => data.uid === doc.data().userId
          );
          detail.playerid = userdata.userNotificationPlayerId;
          detail.userImageURL = userdata.photoURL;
          detail.userName = userdata.displayName;

          this.setState({ detail, isLoading: false });
        }
      });
  }
  render() {
    return (
      <ComplaintView
        submit={this.submit}
        loading={this.state.isLoading}
        isAdmin={this.state.isAdmin}
        data={this.state.detail}
      />
    );
  }
}

export default withFirebase(ComplaintViewContainer);
