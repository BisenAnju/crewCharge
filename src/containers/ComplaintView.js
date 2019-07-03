import React from "react";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";
import ComplaintView from "../components/ComplaintView";

const QuickEncrypt = require("quick-encrypt");
const Cryptr = require("cryptr");

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
    //////// encrypt //////////
    adminReply = adminReply.charAt(0).toUpperCase() + adminReply.slice(1);
    statusByAdmin =
      statusByAdmin.charAt(0).toUpperCase() + statusByAdmin.slice(1);

    const cryptr = new Cryptr(this.state.detail.decryptedKeyFromServer);
    let encryptedAdminReply = cryptr.encrypt(adminReply);
    ///////////encrypt///////////
    this.props.db
      .collection("complaints")
      .doc(this.props.match.params.id)
      .update({
        adminReply: encryptedAdminReply,
        statusByAdmin
      })
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
    let ths = this;
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
      .then(async doc => {
        if (doc.exists) {
          const detail = doc.data();
          // detail.date = detail.addedOn.toDate();
          let com = this.props.complaintType.find(
            data => data.value === detail.complaintType
          );
          detail.complaintType = com.displayName;
          detail.iconUrl = com.iconUrl !== undefined ? com.iconUrl : null;
          ///////////// list ///////////
          let a = localStorage.getItem("privatekey");
          if (typeof detail.receiverId === "object") {
            if (detail.receiverId.find(data => data === this.props.user.uid)) {
              var func = this.props.firebase.function.httpsCallable("encPrac");
              var encryptedKeyforReciever = await func({
                encryptedKeyForServer: detail.encryptedKeyForServer,
                docId: doc.id,
                requesterId: ths.props.user.uid
              }).then(res => {
                return res.data;
              });
              var decryptedKeyFromServer = await QuickEncrypt.decrypt(
                encryptedKeyforReciever.toString(),
                a.toString()
              );
              const cryptr = new Cryptr(decryptedKeyFromServer);
              if (detail.statusByAdmin !== undefined) {
                detail.adminReply = await cryptr.decrypt(detail.adminReply);
              }
              detail.description = await cryptr.decrypt(detail.description);
              detail.date = await cryptr.decrypt(detail.addedOn);
              detail.title = await cryptr.decrypt(detail.title);
              let userdata = this.props.userData.find(
                data => data.uid === detail.userId
              );
              detail.decryptedKeyFromServer = decryptedKeyFromServer;
              detail.playerid = userdata.userNotificationPlayerId;
              detail.userImageURL = userdata.photoURL;
              detail.userName = userdata.displayName;
            }
          }
          ///////////// list ///////////
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

export default withUser(withFirebase(ComplaintViewContainer));
