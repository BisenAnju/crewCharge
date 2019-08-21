import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import { List, ListItem, Avatar } from "material-ui";

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: false
    };
  }

  render() {
    return (
      <Layout navigationTitle="User Attendance" showBackNavigation={true}>
        <div
          style={{
            height: "90vh",
            overflow: "scroll",
            display: "self"
          }}
        >
          <List>
            {this.props.userData.map((user, index) => (
              <ListItem
                key={index}
                primaryText={user.displayName}
                leftIcon={
                  <Avatar
                    src={user.photoURL}
                    style={{ height: "40px", width: "40px" }}
                  />
                }
                onClick={() => {
                  this.setState({ currentUser: user }, () =>
                    this.props.history.push("/attendance/" + user.uid)
                  );
                }}
              />
            ))}
          </List>
        </div>
      </Layout>
    );
  }
}
export default withRouter(Attendance);
