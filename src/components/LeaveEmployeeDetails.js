import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Divider,
  Avatar,
  List,
  ListItem,
  IconButton,
  TextField
} from "material-ui";
import Layout from "../layouts/Layout";
import {
  ActionHelp,
  ActionDateRange,
  ImageTimer,
  SocialPerson,
  ActionToday,
  ActionCheckCircle,
  NavigationCancel,
  CommunicationComment,
  HardwareKeyboardArrowRight,
  ImageEdit
} from "material-ui/svg-icons";
import moment from "moment";
import withUser from "../hoc/withUser";
import {
  red400,
  green500,
  yellow500,
  deepOrange900,
  lime800,
  pink900,
  indigo900
} from "material-ui/styles/colors";
class LeaveEmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationTitle: "Leave Details",
      userComment: [],
      remark: "",
      userPlayerId: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ userComment: nextProps.commentData });
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
  handleDraft = () => {
    let playerId = this.props.userData.filter(
      user => user.uid === this.props.user.uid
    )[0].userNotificationPlayerId;
    this.setState(
      {
        userPlayerId: playerId
      },
      () => this.props.handleChange({ ...this.state })
    );
  };
  textChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    console.log(this.props.purposeData);
    return (
      <Layout
        navigationTitle={this.state.navigationTitle}
        showBackNavigation={true}
      >
        <div>
          <List>
            <ListItem
              disabled
              leftAvatar={
                <Avatar
                  src={this.props.user.photoURL}
                  size={50}
                  style={{ marginTop: 10 }}
                />
              }
              rightAvatar={
                this.props.singleData.leaveStatus === "Pending" ? (
                  <ActionHelp
                    style={{
                      height: 35,
                      width: 35,
                      color: yellow500,
                      marginTop: 16
                    }}
                  />
                ) : this.props.singleData.leaveStatus === "Approved" ? (
                  <ActionCheckCircle
                    style={{
                      height: 35,
                      width: 35,
                      color: green500,
                      marginTop: 16
                    }}
                  />
                ) : (
                  <NavigationCancel
                    style={{
                      height: 35,
                      width: 35,
                      color: red400,
                      marginTop: 16
                    }}
                  />
                )
              }
              primaryText={
                <p style={{ marginTop: 10, fontWeight: "bold" }}>
                  {this.props.user.displayName}
                </p>
              }
              secondaryText={this.props.singleData.leaveStatus}
            />
          </List>
          <Divider />
          <div
            style={{
              height: "70vh",
              overflow: "auto",
              display: "self"
            }}
          >
            <List>
              <ListItem
                disabled
                leftIcon={this.getIconUrl(this.props.singleData.purpose)}
                primaryText={this.props.singleData.purpose}
                secondaryText={<p style={{ fontSize: 14 }}>Purpose</p>}
                rightIcon={
                  this.props.singleData.leaveStatus === "Pending" ? (
                    <IconButton
                      touch={true}
                      style={{ margin: "0px 25px 0px 0px" }}
                      onClick={e => {
                        e.preventDefault();
                        this.props.history.push(
                          `/leavedashboard/leaveapply/` +
                            this.props.singleData.leaveId
                        );
                      }}
                    >
                      <ImageEdit />
                    </IconButton>
                  ) : null
                }
              />
              <ListItem
                disabled
                leftIcon={<ActionDateRange style={{ fill: pink900 }} />}
                primaryText={moment(this.props.singleData.addedOn).format(
                  "lll"
                )}
                secondaryText={<p style={{ fontSize: 14 }}>Application Date</p>}
              />

              {this.props.singleData.leaveStatus === "Approved" ? (
                <ListItem
                  disabled
                  leftIcon={<SocialPerson style={{ fill: "#F27B13" }} />}
                  primaryText={this.props.singleData.approvedRejectedBy}
                  secondaryText={<p style={{ fontSize: 14 }}>Approved By</p>}
                />
              ) : this.props.singleData.leaveStatus === "Rejected" ? (
                <ListItem
                  disabled
                  leftIcon={<SocialPerson style={{ fill: "#F27B13" }} />}
                  primaryText={this.props.singleData.approvedRejectedBy}
                  secondaryText={<p style={{ fontSize: 14 }}>Rejected By</p>}
                />
              ) : null}

              {this.props.singleData.leaveStatus === "Approved" ? (
                <ListItem
                  disabled
                  leftIcon={<ActionDateRange style={{ fill: "#16724A" }} />}
                  primaryText={moment(
                    this.props.singleData.approvedRejectedOn
                  ).format("lll")}
                  secondaryText={<p style={{ fontSize: 14 }}>Approved On</p>}
                />
              ) : this.props.singleData.leaveStatus === "Rejected" ? (
                <ListItem
                  disabled
                  leftIcon={<ActionDateRange style={{ fill: "#16724A" }} />}
                  primaryText={moment(
                    this.props.singleData.approvedRejectedOn
                  ).format("lll")}
                  secondaryText={<p style={{ fontSize: 14 }}>Rejected On</p>}
                />
              ) : null}
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
                leftIcon={<CommunicationComment style={{ fill: "#597B2E" }} />}
                primaryText={this.props.singleData.reason}
                secondaryText={<p style={{ fontSize: 14 }}>Reason</p>}
                secondaryTextLines={2}
              />

              {this.state.userComment.length > 0 ? (
                <ListItem
                  disabled
                  leftIcon={
                    <CommunicationComment style={{ fill: "#871268" }} />
                  }
                  primaryText={
                    <div
                      style={{
                        backgroundColor: "#E8F5E9",
                        width: "42vh",
                        height: "35vh",
                        overflow: "auto",
                        borderRadius: "5px"
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
                                marginRight: "10px",
                                maxWidth: "80%",
                                marginTop: "5px",
                                backgroundColor: "#d8efd5",
                                padding: "5px 9px",
                                borderRadius: "0px 10px 10px 10px",
                                wordBreak: "break-all"
                              }}
                            >
                              <div
                                style={{ marginRight: "5px", float: "left" }}
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
                          </div>
                        ) : (
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center"
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  height: "auto",
                                  maxWidth: "80%",
                                  marginLeft: "10px",
                                  marginTop: "5px",
                                  backgroundColor: "#c8d8c6",
                                  padding: "5px 9px",
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
                          </div>
                        )
                      )}
                    </div>
                  }
                />
              ) : null}

              {this.state.userComment.length > 0 ? (
                this.props.singleData.leaveStatus === "Pending" ||
                this.props.singleData.leaveStatus === "Approved" ? (
                  <ListItem
                    disabled
                    leftIcon={<CommunicationComment />}
                    primaryText={
                      <p
                        style={{
                          fontSize: 14,
                          color: indigo900,
                          fontWeight: "bold"
                        }}
                      >
                        Enter Comment
                      </p>
                    }
                    secondaryText={
                      <TextField
                        disabled
                        placeholder="Type Comment..."
                        multiLine
                        rows={4}
                        value={this.state.remark}
                        onChange={this.textChange}
                        name="remark"
                        style={{ width: "40vh" }}
                      />
                    }
                    rightIcon={
                      <IconButton
                        touch={true}
                        onClick={e => {
                          e.preventDefault();
                          this.handleDraft();
                        }}
                        style={{ zIndex: 1, margin: "19% 12% 0px 0px" }}
                      >
                        <HardwareKeyboardArrowRight />
                      </IconButton>
                    }
                  />
                ) : null
              ) : null}
            </List>
          </div>
        </div>
      </Layout>
    );
  }
}
export default withUser(withRouter(LeaveEmployeeDetails));
