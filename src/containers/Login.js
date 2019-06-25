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

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== null) {
      const user = {
        displayName: this.props.firebase.auth.currentUser.displayName,
        uid: this.props.firebase.auth.currentUser.uid,
        photoURL: this.props.firebase.auth.currentUser.photoURL,
        email: this.props.firebase.auth.currentUser.email
      };

      //ADD USER
      this.props.db
        .collection("users")
        .doc(user.uid)
        .onSnapshot(querySnapshot => {
          if (querySnapshot.exists) {
            console.log("You are already registered");
            if (
              (querySnapshot.data().userNotificationPlayerId === undefined ||
                querySnapshot.data().userNotificationPlayerId === null) &&
              window.cordova
            ) {
              this.props.db
                .collection("users")
                .doc(user.userId)
                .update({
                  userNotificationPlayerId: JSON.parse(
                    localStorage.getItem("playerId")
                  ).id
                });
            }
          } else {
            let playerId = null;
            if (window.cordova) {
              playerId = JSON.parse(localStorage.getItem("playerId")).id;
            }
            this.props.db
              .collection("users")
              .doc(user.uid)
              .set({
                userId: user.userId,
                userName: user.userName,
                userEmailId: user.userEmailId,
                userImageURL: user.userImage,
                userType: "Employee",
                userNotificationPlayerId: JSON.parse(localStorage.getItem("playerId")).id
              })
              .then(function () {
                console.log("You have been successfully registered");
              })
              .catch(function (error) {
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
