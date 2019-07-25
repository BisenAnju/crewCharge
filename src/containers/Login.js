import React, { Component } from "react";
import Login from "../components/Login";
import withFirebase from "../hoc/withFirebase";
import withAuthentication from "../hoc/withAuthentication";
import withUser from "../hoc/withUser";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.user !== null) {
      const user = {
        userName: this.props.firebase.auth.currentUser.displayName,
        userId: this.props.firebase.auth.currentUser.uid,
        userImage: this.props.firebase.auth.currentUser.photoURL,
        userEmailId: this.props.firebase.auth.currentUser.email
      };

      let QuickEncrypt = require("quick-encrypt"),
        keys = QuickEncrypt.generate(2048),
        publicKey;
      console.time("time");
      if (
        localStorage.getItem("publickey") === "" ||
        localStorage.getItem("publickey") === null ||
        localStorage.getItem("publickey") === undefined
      ) {
        await localStorage.setItem("publickey", keys.public);
      }
      publicKey = localStorage.getItem("publickey");
      if (
        localStorage.getItem("privatekey") === "" ||
        localStorage.getItem("privatekey") === null ||
        localStorage.getItem("privatekey") === undefined
      ) {
        await localStorage.setItem("privatekey", keys.private);
      }
      console.timeEnd("time");
      //ADD USER
      const u = this.props.db.collection("users").doc(user.userId);
      u.get().then(querySnapshot => {
        if (querySnapshot.exists) {
          console.log("You are already registered");
          if (querySnapshot.data().access === undefined) {
            u.update({
              access: {
                leave: false,
                complaint: false,
                teamAllocation: false,
                clientCommunication: false
              }
            });
          }
          if (window.cordova) {
            if (
              querySnapshot.data().userNotificationPlayerId === null ||
              querySnapshot.data().userNotificationPlayerId ===
                JSON.parse(localStorage.getItem("playerId")).id
            ) {
              u.update({
                userNotificationPlayerId: JSON.parse(
                  localStorage.getItem("playerId")
                ).id,
                publicKey: publicKey
              });
            }
          }
          if (
            querySnapshot.data().publicKey === undefined ||
            querySnapshot.data().publicKey !== publicKey
          ) {
            u.update({
              publicKey: publicKey
            });
          }
        } else {
          let playerId = null;
          if (window.cordova) {
            playerId = JSON.parse(localStorage.getItem("playerId")).id;
          }
          u.set({
            uid: user.userId,
            displayName: user.userName,
            email: user.userEmailId,
            photoURL: user.userImage,
            userType: "Employee",
            userNotificationPlayerId: playerId,
            publicKey: publicKey,
            access: {
              leave: false,
              complaint: false,
              teamAllocation: false,
              clientCommunication: false
            }
          })
            .then(function() {
              console.log("You have been successfully registered");
            })
            .catch(function(error) {
              console.error("Something went wrong ", error);
            });
        }
      });
    }
  }

  handleLoader = () => {
    localStorage.setItem("isLoading", true);
  };

  render() {
    return (
      <Login
        {...this.state}
        {...this.props}
        handleLoader={this.handleLoader}
        isLoading={this.state.isLoading}
        login={this.props.firebase.googleSignIn}
        logOut={this.props.logOut}
        anonymousLogin={this.props.signInAnonymously}
      />
    );
  }
}

export default withFirebase(withAuthentication(withUser(LoginContainer)));
