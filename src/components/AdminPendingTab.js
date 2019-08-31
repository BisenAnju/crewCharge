import React from "react";
import { withRouter } from "react-router-dom";
import withUser from "../hoc/withUser";
import moment from "moment";
import "../styles/style.css";
import { List, ListItem, CircularProgress, Avatar, Divider } from "material-ui";
import { ActionHome } from "material-ui/svg-icons";
const tabStyles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    padding: 10
  }
};

class AdminPendingTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  getAvatar = userId => {
    let avatarUrl = [];
    avatarUrl = this.props.userData.find(item => item.uid === userId);
    if (avatarUrl !== undefined) return <Avatar src={avatarUrl.photoURL} />;
  };
  render() {
    return (
      <div
        style={{
          height: "85vh",
          overflow: "auto",
          display: "self"
        }}
      >
        <div style={tabStyles.slide}>
          <List>
            {this.props.isLoading ? (
              <center>
                <CircularProgress />
              </center>
            ) : (
              this.props.leaveData
                .filter(data => data.leaveStatus === "Pending")
                .map((leave, id) => (
                  <div key={id}>
                    <ListItem
                      onClick={e => {
                        e.preventDefault();
                        this.props.adminId === this.props.user.uid
                          ? this.props.history.push(
                              "/leavedashboard/admin/approvalrejection/" +
                                leave.leaveId
                            )
                          : this.props.history.push(
                              "/leavedashboard/leavedetails/" + leave.leaveId
                            );
                      }}
                      leftAvatar={this.getAvatar(leave.userId)}
                      rightIcon={
                        leave.leaveType === "wfh" ? (
                          <ActionHome
                            style={{
                              height: "27px",
                              width: "27px",
                              borderRadius: "0%",
                              fill: "#0c76c1"
                            }}
                          />
                        ) : (
                          this.getIconUrl(leave.purpose)
                        )
                      }
                      primaryText={
                        this.props.userData.findIndex(
                          user => user.uid === leave.userId
                        ) >= 0 &&
                        this.props.userData.find(
                          user => user.uid === leave.userId
                        ).displayName
                      }
                      secondaryText={
                        <p style={{ fontSize: 10, fontWeight: "bold" }}>
                          <span>
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
                          </span>
                          <br />
                          {leave.reason}
                        </p>
                      }
                      secondaryTextLines={2}
                    />
                    <Divider inset={true} />
                  </div>
                ))
            )}
          </List>
        </div>
      </div>
    );
  }
}
export default withUser(withRouter(AdminPendingTab));
