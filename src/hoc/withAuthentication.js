import React from "react";
import withFirebase from "./withFirebase";

const AuthUserContext = React.createContext(null);

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null
      };
    }
    // Check if a user has already loggedIn ifnot then save the user details and proceed
    componentDidMount() {
      // let userData;
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.setState({ authUser });
        } else {
          this.setState({ authUser: null });
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export { AuthUserContext };
export default withAuthentication;
