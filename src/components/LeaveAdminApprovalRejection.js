import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import ROUTES from "../constants/routes";
import {
  ActionDateRange,
  ImageTimer,
  ActionToday,
  CommunicationComment,
  ActionFlightTakeoff,
  MapsLocalHospital,
  ActionFace,
  HardwareKeyboardArrowRight,
  ImageEdit
} from "material-ui/svg-icons";
import {
  Divider,
  Avatar,
  RaisedButton,
  TextField,
  List,
  ListItem,
  IconButton
} from "material-ui";
import {
  lightGreen800,
  indigo900,
  pink900,
  lime800,
  deepOrange900
} from "material-ui/styles/colors";
import Layout from "../layouts/Layout";
import withUser from "../hoc/withUser";

const flexitem = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "baseline",
  textAlign: "center"
};
class LeaveAdminApprovalRejection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackOpen: false,
      remark: "",
      leaveStatus: null,
      userName: null,
      userComment: [],
      userPlayerId: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ userComment: nextProps.commentData });
  }

  handleApprove = () => {
    let playerId = this.props.userData.filter(
      user => user.uid === this.props.singleData.userId
    )[0].userNotificationPlayerId;
    this.setState(
      {
        leaveStatus: "Approved",
        userPlayerId: playerId
      },
      () => this.props.handleChange({ ...this.state })
    );
  };
  handleReject = e => {
    let playerId = this.props.userData.filter(
      user => user.uid === this.props.singleData.userId
    )[0].userNotificationPlayerId;
    this.setState(
      {
        leaveStatus: "Rejected",
        userPlayerId: playerId
      },
      () => this.props.handleChange({ ...this.state })
    );
  };
  handleDraft = e => {
    let playerId = this.props.userData.filter(
      user => user.uid === this.props.singleData.userId
    )[0].userNotificationPlayerId;
    this.setState(
      {
        leaveStatus: "Pending",
        userPlayerId: playerId
      },
      () => this.props.handleChange({ ...this.state }),
      () => this.setState({ remark: "" })
    );
  };

  textChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
          <List>
            <ListItem
              disabled
              leftIcon={
                this.props.singleData.purpose === "vacation" ? (
                  <ActionFlightTakeoff style={{ fill: "#303F9F" }} />
                ) : this.props.singleData.purpose === "general" ? (
                  <ActionFace style={{ fill: "#C2185B" }} />
                ) : (
                  <MapsLocalHospital style={{ fill: "#EF5350" }} />
                )
              }
              primaryText={this.props.singleData.purpose}
              secondaryText={<p style={{ fontSize: 14 }}>Purpose</p>}
              rightIcon={
                <IconButton
                  touch={true}
                  style={{ margin: "0px 25px 0px 0px" }}
                  onClick={e => {
                    e.preventDefault();
                    this.props.history.push(
                      `${ROUTES.LEAVEDASHBOARD}/leaveapply`
                    );
                  }}
                >
                  <ImageEdit />
                </IconButton>
              }
            />
            <ListItem
              disabled
              leftIcon={<ActionDateRange style={{ fill: pink900 }} />}
              primaryText={moment(this.props.singleData.addedOn).format("lll")}
              secondaryText={<p style={{ fontSize: 14 }}>Application Date</p>}
            />
            {this.props.singleData.leaveType === "Full" ? (
              <ListItem
                disabled
                leftIcon={<ActionToday style={{ fill: lime800 }} />}
                primaryText={moment(this.props.singleData.dueDate).format("ll")}
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
              primaryText={<p>{this.props.singleData.reason}</p>}
              secondaryText={<p style={{ fontSize: 14 }}>Reason</p>}
              // secondaryTextLines={2}
            />
            {this.state.userComment.length > 0 ? (
              <ListItem
                disabled
                leftIcon={<CommunicationComment style={{ fill: "#871268" }} />}
                primaryText={
                  <div
                    style={{
                      backgroundColor: "#E8F5E9",
                      width: 270,
                      height: 130,
                      overflow: "auto"
                    }}
                  >
                    {this.state.userComment.map(comment =>
                      this.props.user.uid === comment.userId ? (
                        <div
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
                            <div style={{ marginRight: "5px", float: "left" }}>
                              <span> {comment.comment}</span>
                              <br />
                              <span
                                style={{
                                  color: "rgba(158, 158, 158, 0.91)",
                                  float: "right",
                                  justifyContent: "center",
                                  display: "flex",
                                  alignItems: "center",
                                  fontSize: "0.9rem"
                                }}
                              >
                                {moment(comment.addedOn.seconds * 1000).format(
                                  "lll"
                                )}
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
                                backgroundColor: "#31234e",
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
                                <span>{comment.comment}</span>
                                <span
                                  style={{
                                    textAlign: "right",
                                    color: "#9e9e9e",
                                    fontSize: "0.9rem"
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

            {this.props.singleData.leaveStatus === "Pending" ? (
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
                    multiLine={true}
                    rows={4}
                    rowsMax={4}
                    value={this.state.remark}
                    onChange={this.textChange}
                    name="remark"
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
            ) : null}
            <br />
            <br />
            {this.props.singleData.leaveStatus === "Pending" ? (
              <div>
                <div style={flexitem}>
                  <RaisedButton
                    label="APPROVE"
                    onClick={this.handleApprove}
                    backgroundColor={lightGreen800}
                    labelColor="white"
                    disabled={this.state.remark === ""}
                  />
                  <RaisedButton
                    label="REJECT"
                    backgroundColor={lightGreen800}
                    onClick={this.handleReject}
                    labelColor="white"
                    disabled={this.state.remark === ""}
                  />
                </div>
              </div>
            ) : null}
          </List>
        </div>
      </Layout>
    );
  }
}
export default withRouter(withUser(LeaveAdminApprovalRejection));
