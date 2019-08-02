import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import {
  ActionDateRange,
  ImageTimer,
  ActionToday,
  ContentSend,
  CommunicationComment
} from "material-ui/svg-icons";
import {
  Divider,
  Avatar,
  TextField,
  List,
  ListItem,
  IconButton,
  FlatButton
} from "material-ui";

import { pink900, lime800, deepOrange900 } from "material-ui/styles/colors";
import Layout from "../layouts/Layout";
import withUser from "../hoc/withUser";

const styles = {
  underlineStyle: {
    borderColor: "#727976"
  }
};
class LeaveAdminApprovalRejection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackOpen: false,
      remark: "",
      leaveStatus: null,
      userComment: [],
      playerId: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      userComment: nextProps.commentData,
      remark: ""
    });
  }
  handleApprove = () => {
    let playerId = this.props.userData.filter(
      user => user.uid === this.props.singleData.userId
    )[0].userNotificationPlayerId;
    this.setState(
      {
        leaveStatus: "Approved",
        playerId: playerId,
        remark: "Leave Approved"
      },
      () => this.props.handleChange({ ...this.state })
    );
  };
  handleReject = () => {
    let playerId = this.props.userData.filter(
      user => user.uid === this.props.singleData.userId
    )[0].userNotificationPlayerId;
    this.setState(
      {
        leaveStatus: "Rejected",
        playerId: playerId,
        remark: "Leave Rejected"
      },
      () => this.props.handleChange({ ...this.state })
    );
  };
  handleDraft = () => {
    let playerId = this.props.userData.filter(
      user => user.uid === this.props.singleData.userId
    )[0].userNotificationPlayerId;
    this.setState(
      {
        leaveStatus: "Pending",
        playerId: playerId
      },
      () => this.props.handleChange({ ...this.state })
    );
  };
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
  textChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  getAvatar = userId => {
    let avatarUrl = [];
    avatarUrl = this.props.userData.find(item => item.uid === userId);
    if (avatarUrl !== undefined)
      return (
        <Avatar
          src={avatarUrl.photoURL}
          size={20}
          style={{ margin: "5px 0px 0px 5px" }}
        />
      );
  };
  render() {
    return (
      <Layout
        navigationTitle="Approval/Rejection Page"
        showBackNavigation={true}
      >
        <div>
          <center>
            <Avatar
              src={
                this.props.userData.findIndex(
                  user => user.uid === this.props.singleData.userId
                ) >= 0 &&
                this.props.userData.find(
                  user => user.uid === this.props.singleData.userId
                ).photoURL
              }
              style={{ marginTop: 15 }}
              size={60}
            />
          </center>
          <br />
          <center>
            <span style={{ fontWeight: "bold" }}>
              {this.props.userData.map(user =>
                user.uid === this.props.singleData.userId
                  ? user.displayName
                  : null
              )}
            </span>
          </center>
          <br />
          <Divider />
          <div
            style={{
              display: "flex",
              height: "calc(100vh-203px)",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                height: "52vh",
                overflow: "auto",
                display: "self",
                marginBottom: "10%"
              }}
            >
              <List>
                <ListItem
                  disabled
                  leftIcon={this.getIconUrl(this.props.singleData.purpose)}
                  primaryText={this.props.singleData.purpose}
                  secondaryText={<p style={{ fontSize: 14 }}>Purpose</p>}
                  // rightIcon={
                  //   <IconButton
                  //     touch={true}
                  //     style={{ margin: "0px 25px 0px 0px" }}
                  //     onClick={e => {
                  //       e.preventDefault();
                  //       this.props.history.push(`/leavedashboard/leaveapply`);
                  //     }}
                  //   >
                  //     <ImageEdit />
                  //   </IconButton>
                  // }
                />
                <ListItem
                  disabled
                  leftIcon={<ActionDateRange style={{ fill: pink900 }} />}
                  primaryText={moment(this.props.singleData.addedOn).format(
                    "lll"
                  )}
                  secondaryText={
                    <p style={{ fontSize: 14 }}>Application Date</p>
                  }
                />
                {this.props.singleData.leaveType === "Full" ? (
                  <ListItem
                    disabled
                    leftIcon={<ActionToday style={{ fill: lime800 }} />}
                    primaryText={moment(this.props.singleData.dueDate).format(
                      "ll"
                    )}
                    secondaryText={<p style={{ fontSize: 14 }}>Due Date</p>}
                  />
                ) : null}
                <ListItem
                  disabled
                  leftIcon={<ImageTimer style={{ fill: deepOrange900 }} />}
                  primaryText={
                    this.props.singleData.leaveType === "Full"
                      ? moment(this.props.singleData.from).format("ll") +
                        " - " +
                        moment(this.props.singleData.to).format("ll")
                      : moment
                          .utc(
                            moment(
                              moment(this.props.singleData.to),
                              "DD/MM/YYYY HH:mm:ss"
                            ).diff(
                              moment(
                                moment(this.props.singleData.from),
                                "DD/MM/YYYY HH:mm:ss"
                              )
                            )
                          )
                          .format("HH:mm") + "  Hours"
                  }
                  secondaryText={<p style={{ fontSize: 14 }}>Duration</p>}
                />
                <ListItem
                  disabled
                  leftIcon={
                    <CommunicationComment style={{ fill: "#597B2E" }} />
                  }
                  primaryText={<p>{this.props.singleData.reason}</p>}
                  secondaryText={<p style={{ fontSize: 14 }}>Reason</p>}
                />

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <div style={{ width: "95%" }}>
                    <ListItem
                      style={{ padding: "0px" }}
                      disabled
                      primaryText={
                        <div
                          style={{
                            backgroundColor: "#E8F5E9",
                            height: "50vh",
                            overflow: "auto",
                            borderRadius: "5px",
                            paddingBottom: "20%"
                          }}
                        >
                          {this.state.userComment.map((comment, index) =>
                            this.props.user.uid === comment.userId ? (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end"
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: "auto",
                                    marginRight: "5px",
                                    maxWidth: "80%",
                                    marginTop: "12px",
                                    backgroundColor: "#add0a8",
                                    padding: "4px 4px",
                                    borderRadius: "10px 0px 10px 10px",
                                    wordBreak: "break-all"
                                  }}
                                >
                                  <div
                                    style={{
                                      marginRight: "5px",
                                      float: "left"
                                    }}
                                  >
                                    <span style={{ fontSize: "14px" }}>
                                      {comment.comment}
                                    </span>
                                    <br />
                                    <span
                                      style={{
                                        color: "rgba(158, 158, 158, 0.91)",
                                        float: "right",
                                        justifyContent: "center",
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: "13px"
                                      }}
                                    >
                                      {moment(
                                        comment.addedOn.seconds * 1000
                                      ).format("lll")}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <Avatar
                                    src={this.props.user.photoURL}
                                    size={20}
                                    style={{ margin: "5px 5px 0px 0px" }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start"
                                }}
                              >
                                <div>{this.getAvatar(comment.userId)}</div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: "auto",
                                    maxWidth: "80%",
                                    marginLeft: "5px",
                                    marginTop: "12px",
                                    backgroundColor: "#c8d8c6",
                                    padding: "4px 4px",
                                    borderRadius: "0px 10px 10px 10px",
                                    wordBreak: "break-all"
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "auto",
                                      display: "flex",
                                      flexDirection: "column"
                                    }}
                                  >
                                    <span style={{ fontSize: "14px" }}>
                                      {comment.comment}
                                    </span>
                                    <span
                                      style={{
                                        textAlign: "right",
                                        color: "#9e9e9e",
                                        fontSize: "13px"
                                      }}
                                    >
                                      {moment(
                                        comment.addedOn.seconds * 1000
                                      ).format("lll")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              bottom: "0px",
                              position: "absolute",
                              width: "100%",
                              backgroundColor: "#e1eae6",
                              height: "7vh"
                            }}
                          >
                            <div style={{ width: "80%" }}>
                              <TextField
                                placeholder="Type a message"
                                value={this.state.remark}
                                name="remark"
                                onChange={this.textChange}
                                underlineFocusStyle={styles.underlineStyle}
                              />

                              {/* <TextField
                                placeholder="Type Here..."
                                multiLine={true}
                                rows={4}
                                rowsMax={4}
                                value={this.state.remark}
                                onChange={this.textChange}
                                name="remark"
                              /> */}
                            </div>
                            <div>
                              <IconButton
                                touch={true}
                                onClick={e => {
                                  e.preventDefault();
                                  this.handleDraft();
                                }}
                                iconStyle={{ height: "25px", width: "25px" }}
                                style={{ zIndex: 1 }}
                              >
                                <ContentSend />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </div>
                </div>
              </List>
            </div>
            {this.props.singleData.leaveStatus === "Pending" ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  bottom: "0px",
                  // position: "absolute",
                  width: "100%",
                  height: "7vh"
                }}
              >
                <FlatButton
                  style={{
                    color: "white",
                    backgroundColor: "#ea6648",
                    width: "47%",
                    margin: "0px 5px 0px 5px"
                  }}
                  label="Reject"
                  onClick={this.handleReject}
                />
                <FlatButton
                  style={{
                    color: "white",
                    backgroundColor: "#9cce5a",
                    width: "47%",
                    margin: "0px 5px 0px 5px"
                  }}
                  label="Approve"
                  onClick={this.handleApprove}
                />
              </div>
            ) : null}
          </div>
        </div>
      </Layout>
    );
  }
}
export default withRouter(withUser(LeaveAdminApprovalRejection));
