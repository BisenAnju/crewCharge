import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import { List, ListItem, Avatar, Divider, Subheader } from "material-ui";
import * as moment from "moment";

class UserLeaveReport extends Component {
  constructor(props) {
    super(props);
    this.state = { currentMonthLeave: [] };
  }
  componentWillMount() {
    var date = new Date();

    if (this.props.match.params.index === "0") {
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      let users = this.props.leaveData.filter(
        leave => leave.userId === this.props.singleData.uid
      );
      let currentMonthLeave = users.filter(
        leave =>
          moment(leave.from).format("L") >= moment(firstDay).format("L") &&
          moment(leave.from).format("L") <= moment(date).format("L")
      );
      this.setState({ currentMonthLeave });
    }

    if (this.props.match.params.index === "1") {
      var prevFirstDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      var prevLastDate = new Date(date.getYear(), date.getMonth(), 0);

      let users = this.props.leaveData.filter(
        leave => leave.userId === this.props.singleData.uid
      );
      let currentMonthLeave = users.filter(
        leave =>
          moment(leave.from).format("L") >= moment(prevFirstDate).format("L") &&
          moment(leave.from).format("L") <= moment(prevLastDate).format("L")
      );
      this.setState({ currentMonthLeave });
    }

    if (this.props.match.params.index === "2") {
      let users = this.props.leaveData.filter(
        leave => leave.userId === this.props.singleData.uid
      );
      let currentMonthLeave = users.filter(
        leave =>
          moment(leave.from).format("L") >=
            moment(this.props.from).format("L") &&
          moment(leave.from).format("L") <= moment(this.props.to).format("L")
      );
      this.setState({ currentMonthLeave });
    }
  }

  getIconUrl = purpose => {
    let iconURL = [];
    iconURL = this.props.purposeData.find(item => item.purpose === purpose);
    if (iconURL !== undefined)
      return (
        <Avatar
          src={iconURL.iconUrl}
          style={{
            height: "27px",
            width: "27px",
            backgroundColor: "white",
            borderRadius: "0%"
          }}
        />
      );
  };

  render() {
    return (
      <Layout navigationTitle="User Leave" showBackNavigation={true}>
        <center>
          <Avatar
            src={this.props.singleData.photoURL}
            style={{ marginTop: 10 }}
            size={55}
          />
        </center>
        <br />
        <center>
          <span style={{ fontWeight: "bold" }}>
            {this.props.singleData.displayName}
          </span>
        </center>
        <br />
        <Divider />
        <div
          style={{
            height: "70vh",
            overflow: "auto",
            display: "self"
          }}
        >
          <List>
            {this.state.currentMonthLeave.map((leave, index) => (
              <div key={index}>
                <Subheader
                  inset={true}
                  style={{ color: "#338dc1", fontWeight: "bold" }}
                >
                  {leave.leaveType}
                </Subheader>
                <ListItem
                  leftAvatar={this.getIconUrl(leave.purpose)}
                  secondaryText={leave.reason}
                  primaryText={
                    <p style={{ fontSize: 15 }}>
                      {leave.leaveType === "Hour"
                        ? moment
                            .utc(
                              moment(
                                moment(leave.to),
                                "DD/MM/YYYY HH:mm:ss"
                              ).diff(
                                moment(
                                  moment(leave.from),
                                  "DD/MM/YYYY HH:mm:ss"
                                )
                              )
                            )
                            .format("HH:mm") +
                          " Hours " +
                          moment(leave.addedOn).format("ll")
                        : moment
                            .utc(
                              moment(
                                moment(leave.to),
                                "DD/MM/YYYY HH:mm:ss"
                              ).diff(
                                moment(
                                  moment(leave.from),
                                  "DD/MM/YYYY HH:mm:ss"
                                )
                              )
                            )
                            .format("D") +
                          " Day " +
                          "  " +
                          moment(leave.from).format("ll") +
                          " - " +
                          moment(leave.to).format("ll")}
                    </p>
                  }
                  secondaryTextLines={2}
                />
              </div>
            ))}
          </List>
        </div>
      </Layout>
    );
  }
}
export default withRouter(UserLeaveReport);
