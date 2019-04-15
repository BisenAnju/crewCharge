import React from "react";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";

class Profile extends React.Component {
  render() {
    console.log(this.props.user);
    return (
      <div>
        <p>
          {this.props.user
            ? `Hello ${this.props.user.displayName}`
            : "Logged Out"}
        </p>
        <button onClick={() => this.props.firebase.googleSignIn()}>
          Login
        </button>
        <button onClick={() => this.props.firebase.signInAnonymously()}>
          Login Anonymously
        </button>
        <button onClick={() => this.props.firebase.logOut()}>Logout</button>
      </div>
    );
  }
}

export default withUser(withFirebase(Profile));
