import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import LeavePurpose from "./LeavePurpose";
import AddHolidays from "./AddHolidays";
import ComplaintType from "./ComplaintType";
import { Card, CardHeader, CardText } from "material-ui/Card";
import { Avatar } from "material-ui";
class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Layout navigationTitle="Configuration" showBackNavigation={true}>
        <Card style={{ margin: "10px", borderRadius: "5px" }}>
          <CardHeader
            title="Leave Purpose"
            titleColor="#fd914d"
            avatar={
              <Avatar size={30} backgroundColor="#fd914d" color="white">
                L
              </Avatar>
            }
            actAsExpander={true}
            showExpandableButton={true}
          />

          <CardText expandable={true}>
            <LeavePurpose
              addPurpose={this.props.addPurpose}
              purposeData={this.props.purposeData}
            />
          </CardText>
        </Card>

        <Card style={{ margin: "10px", borderRadius: "5px" }}>
          <CardHeader
            title="Add Holidays"
            titleColor="#fd914d"
            avatar={
              <Avatar size={30} backgroundColor="#fd914d" color="white">
                H
              </Avatar>
            }
            actAsExpander={true}
            showExpandableButton={true}
          />

          <CardText expandable={true}>
            <AddHolidays addHolidays={this.props.addHolidays} />
          </CardText>
        </Card>

        <Card style={{ margin: "10px", borderRadius: "5px" }}>
          <CardHeader
            title=" Complaint Type"
            titleColor="#fd914d"
            avatar={
              <Avatar size={30} backgroundColor="#fd914d" color="white">
                C
              </Avatar>
            }
            actAsExpander={true}
            showExpandableButton={true}
          />

          <CardText expandable={true}>
            <ComplaintType addPurpose={this.props.addPurpose} />
          </CardText>
        </Card>
      </Layout>
    );
  }
}

export default withRouter(Configuration);
