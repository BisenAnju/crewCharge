import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import config from "./config";

class Firebase {
  constructor() {
    this.app = firebase.initializeApp(config);
    this.auth = this.app.auth();
    this.db = this.app.firestore();
    this.function = this.app.functions();

    this.app
      .firestore()
      .enablePersistence()
      .then(() => {
        console.log("Persistence working!");
      })
      .catch(err => {
        if (err.code === "failed-precondition") {
          console.log(
            "Multiple tabs open. So, no offline persistence for you."
          );
        } else if (err.code === "unimplemented") {
          console.log("Offline persistence not supported in this browser.");
        }
      });
  }

  googleSignIn = () => {

    localStorage.loader = "true";
    // window.cordova && window.cordova.plugins.backgroundMode.enable();
    const provider = new firebase.auth.GoogleAuthProvider();
    this.auth
      .signInWithRedirect(provider)
      .then(() => firebase.auth().getRedirectResult())
      .then(result => {
        console.log(result.user);
        // window.cordova && window.cordova.plugins.backgroundMode.disable();
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  logOut = () => {
    this.auth.signOut().then(
      () => {
        localStorage.user = false;
        console.log("Signed Out");
      },
      error => {
        console.error("Sign Out Error", error);
      }
    );
  };

  signInAnonymously = () => {
    return this.auth.signInAnonymouslyAndRetrieveData();
  };
}

export default Firebase;
