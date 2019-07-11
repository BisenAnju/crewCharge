import React, { Component } from "react";
import NavigationBar from "../components/NavigationBar";
import WithAuthentication from "../hoc/withAuthentication";
import withUser from "../hoc/withUser";
class NavigationBarContainers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: []
    };
    this.logOut = this.logOut.bind(this);
  }
  logOut() {
    this.props.firebase.logOut();
    localStorage.clear();
  }
  componentWillMount() {
    // User Data
    this.props.db.collection("users").onSnapshot(
      snapshot => {
        const userData = [];
        snapshot.forEach(doc => {
          if (doc.exists) {
            userData.push(doc.data());
          }
        });
        this.setState({
          isLoading: false,
          userData
        });
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }

  render() {
    return (
      <div>
        <NavigationBar
          userData={this.state.userData}
          navigationTitle={this.props.navigationTitle}
          showBackNavigation={this.props.showBackNavigation}
          logOut={this.logOut}
        />
      </div>
    );
  }
}

export default WithAuthentication(withUser(NavigationBarContainers));
