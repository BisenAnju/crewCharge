import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import { Tabs, Tab } from "material-ui";
import LeavePurpose from "./LeavePurpose";
import ComplaintType from "./ComplaintType";

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = { purpose: null, value: "a" };
  }
  handleChange = value => {
    this.setState({
      value: value
    });
  };

  render() {
    return (
      <Layout navigationTitle="Configuration" showBackNavigation={true}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          tabItemContainerStyle={{ backgroundColor: "transparent" }}
          inkBarStyle={{ backgroundColor: "#f08f4c" }}
        >
          <Tab
            label="Leave Purpose"
            value="a"
            style={{
              color: "#f08f4c"
            }}
          >
            <LeavePurpose addPurpose={this.props.addPurpose} />
          </Tab>
          <Tab
            label="Complaint Type"
            value="b"
            style={{
              color: "#f08f4c"
            }}
          >
            <ComplaintType handleComplaint={this.props.handleComplaint} />
          </Tab>
        </Tabs>
      </Layout>
    );
  }
}

export default withRouter(Configuration);
