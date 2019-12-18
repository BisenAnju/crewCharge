import React from "react";
import withFirebase from "./withFirebase";
import CircularProgress from 'material-ui/CircularProgress';
const AuthUserContext = React.createContext(null);

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
        invitedUser: null
      };
    }

    componentWillMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        localStorage.loader = "false";

        if (authUser) {
          localStorage.user = JSON.stringify(authUser);
          let QuickEncrypt = require("quick-encrypt"),
            keys = QuickEncrypt.generate(2048),
            publicKey;
          console.time("time");
          if (
            localStorage.getItem("publickey") === "" ||
            localStorage.getItem("publickey") === null ||
            localStorage.getItem("publickey") === undefined
          ) {
            localStorage.setItem("publickey", keys.public);
          }
          publicKey = localStorage.getItem("publickey");
          if (
            localStorage.getItem("privatekey") === "" ||
            localStorage.getItem("privatekey") === null ||
            localStorage.getItem("privatekey") === undefined
          ) {
            localStorage.setItem("privatekey", keys.private);
          }
          console.timeEnd("time");

          //invitedUser
          const invitedUserData = [];
          this.props.db
            .collection("invitedUsers")
            .get()
            .then(
              doc => {
                doc.forEach(docitem => {
                  if (docitem.exists) {
                    invitedUserData.push(docitem.data());
                  }
                });
              },
              err => {
                console.log(`Encountered error: ${err}`);
              }
            );
          //ADD USER
          const u = this.props.db.collection("users").doc(authUser.uid);

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

            }

            else {
              let playerId = null;
              if (window.cordova) {
                playerId = JSON.parse(localStorage.getItem("playerId")).id;
              }
              if (invitedUserData.find(userData => userData.email === authUser.email)) {
                u.set({
                  uid: authUser.uid,
                  displayName: authUser.providerData[0].displayName &&
                    authUser.providerData[0].displayName
                    ? authUser.providerData[0].displayName
                    : authUser.displayName,
                  email: authUser.email,
                  photoURL: authUser.providerData[0].photoURL &&
                    authUser.providerData[0].photoURL
                    ? authUser.providerData[0].photoURL
                    : authUser.photoURL,
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
              }
              else {
                localStorage.user = false;
                this.setState({ invitedUser: false });
              }
            }
            this.setState({ authUser });
          })
        }
        else {
          localStorage.user = false;
          this.setState({ authUser: null });
        }
      })
    }

    render() {
      if (JSON.parse(localStorage.loader)) {
        return <CircularProgress size={60} thickness={5} color={"orange"} style={{ margin: "40%" }} />;
      }

      else {
        return (
          <AuthUserContext.Provider value={JSON.parse(localStorage.user)}>
            <Component {...this.props} user={JSON.parse(localStorage.user)} invitedUser={this.state.invitedUser} />
          </AuthUserContext.Provider>
        );
      }
    }
  }

  return withFirebase(WithAuthentication);
};

export { AuthUserContext };
export default withAuthentication;
