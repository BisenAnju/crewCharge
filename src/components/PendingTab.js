import React from "react";
import { withRouter } from "react-router-dom";
import withUser from "../hoc/withUser";
import moment from "moment";
import { List, ListItem, CircularProgress, Avatar, Divider } from "material-ui";

const tabstyles = {
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

class PendingTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={tabstyles.slide}>
        <List>
          {this.props.isLoading ? (
            <center>
              <CircularProgress />
            </center>
          ) : this.props.leaveData.length > 0 ? (
            this.props.leaveData.map((leave, id) => (
              <div key={id}>
                {leave.leaveStatus === "Pending" ? (
                  <div>
                    <ListItem
                      leftAvatar={<Avatar src={this.props.user.photoURL} />}
                      secondaryText={leave.reason}
                      onClick={e => {
                        e.preventDefault();
                        this.props.history.push(
                          "/leavedashboard/leavedetails/" + leave.leaveId
                        );
                      }}
                      primaryText={
                        <p style={{ fontSize: 13 }}>
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
                              moment(leave.applicationDate).format("ll")
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
                              " Days " +
                              "  " +
                              moment(leave.from).format("ll") +
                              " - " +
                              moment(leave.to).format("ll")}
                        </p>
                      }
                    />
                    <Divider inset={true} />
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <span style={{ color: "#004D40", fontWeight: "bold" }}>
              No Pending Leaves
            </span>
          )}
        </List>
      </div>
    );
  }
}
export default withUser(withRouter(PendingTab));
