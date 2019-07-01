import React from "react";
import {
  List,
  ListItem,
  Divider,
  IconMenu,
  MenuItem,
  IconButton,
  Avatar
} from "material-ui";
import { Tabs, Tab } from "material-ui/Tabs";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Subheader from "material-ui/Subheader";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import TeamAllocationProjectList from "./TeamAllocationProjectList";
import TeamAllocationPeopleList from "./TeamAllocationPeoplesList";
import { orange100 } from "material-ui/styles/colors";
import withFirebase from "../hoc/withFirebase";
import * as moment from "moment";
class TeamAllocationMissionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      massage: null
    };
  }
  handleTabChange = value => {
    this.setState({
      value: value
    });
  };
  contentButton = {
    bottom: 5,
    right: 40,
    position: "absolute"
  };
  render() {
    return (
      <Layout navigationTitle="Projects Allocation" showBackNavigation={true}>
        <Tabs
          value={this.state.value}
          onChange={this.handleTabChange}
          tabItemContainerStyle={{ backgroundColor: "transparent" }}
          inkBarStyle={{ backgroundColor: "#f08f4c" }}
        >
          <Tab label="Peoples List" style={{ color: "#f08f4c" }} value={0}>
            <div>
              <TeamAllocationPeopleList {...this.props} />
            </div>
          </Tab>
          <Tab label="Project List" style={{ color: "#f08f4c" }} value={1}>
            <div>
              <TeamAllocationProjectList {...this.props} />
            </div>
          </Tab>
          <Tab label="Manage" style={{ color: "#f08f4c" }} value={2}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "calc(100vh-112px)"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "41vh"
                }}
              >
                <div>
                  <Subheader className="sticky">Missions List</Subheader>
                </div>
                <Divider style={{ backgroundColor: orange100 }} />
                <div
                  style={{
                    overflow: "scroll"
                  }}
                >
                  <List>
                    {this.props.missionsList.map((row, index) => (
                      <div key={index}>
                        <div>
                          <ListItem
                            key={index}
                            primaryText={row.name}
                            rightIconButton={
                              <IconMenu
                                menuStyle={{
                                  backgroundColor: "rgba(242, 243, 242, 0.5)"
                                }}
                                iconButtonElement={
                                  <IconButton style={{ marginTop: 4 }}>
                                    <MoreVertIcon />
                                  </IconButton>
                                }
                              >
                                <MenuItem
                                  onClick={e => {
                                    e.preventDefault();
                                    this.props.history.push(
                                      "/teamallocation/mission/" +
                                        row.missionsId
                                    );
                                  }}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={e => {
                                    e.preventDefault();
                                    this.props.handleArchiveMissionChange(
                                      row.missionsId
                                    );
                                  }}
                                >
                                  Archive
                                </MenuItem>
                              </IconMenu>
                            }
                            secondaryTextLines={2}
                            secondaryText={
                              moment(row.deadline.startDate).format("ll") +
                              " - " +
                              moment(row.deadline.endDate).format("ll") +
                              ", Remarks:" +
                              row.deadline.remarks
                            }
                          />
                        </div>
                        <Divider style={{ backgroundColor: orange100 }} />
                      </div>
                    ))}
                  </List>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "41vh"
                }}
              >
                <div>
                  <Subheader className="sticky" style={{ overflow: "scroll" }}>
                    Project List
                  </Subheader>
                </div>
                <Divider style={{ backgroundColor: orange100 }} />
                <div
                  style={{
                    overflow: "scroll"
                  }}
                >
                  <List>
                    {this.props.projectsList.map((row, index) => (
                      <div key={index}>
                        <div>
                          <ListItem
                            primaryText={row.name}
                            leftAvatar={<Avatar src={row.logoURL} />}
                            rightIconButton={
                              <IconMenu
                                menuStyle={{
                                  backgroundColor: "rgba(242, 243, 242, 0.5)"
                                }}
                                iconButtonElement={
                                  <IconButton style={{ marginTop: 4 }}>
                                    <MoreVertIcon />
                                  </IconButton>
                                }
                              >
                                <MenuItem
                                  onClick={e => {
                                    e.preventDefault();
                                    this.props.history.push(
                                      "/teamallocation/project/" + row.projectId
                                    );
                                  }}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={e => {
                                    e.preventDefault();
                                    this.props.handleArchiveProjectChange(
                                      row.projectId
                                    );
                                  }}
                                >
                                  Archive
                                </MenuItem>
                              </IconMenu>
                            }
                          />
                        </div>
                        <Divider style={{ backgroundColor: orange100 }} />
                      </div>
                    ))}
                  </List>
                </div>
              </div>
              <div style={this.contentButton}>
                <FloatingActionButton backgroundColor={"rgb(253, 145, 77)"}>
                  <div>
                    <IconMenu
                      iconButtonElement={
                        <IconButton style={{ marginTop: 4 }}>
                          <ContentAdd color={"white"} />
                        </IconButton>
                      }
                      menuStyle={{
                        backgroundColor: "rgba(242, 243, 242, 0.5)",
                        padding: 0
                      }}
                      anchorOrigin={{
                        horizontal: "right",
                        vertical: "bottom"
                      }}
                      targetOrigin={{
                        horizontal: "right",
                        vertical: "bottom"
                      }}
                    >
                      <MenuItem
                        onClick={e => {
                          e.preventDefault();
                          this.props.history.push("/teamallocation/mission");
                        }}
                      >
                        Add Mission
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={e => {
                          e.preventDefault();
                          this.props.history.push("/teamallocation/project");
                        }}
                      >
                        Add Project
                      </MenuItem>
                    </IconMenu>
                  </div>
                </FloatingActionButton>
              </div>
            </div>
          </Tab>
        </Tabs>
        {/* <div>
          <Snackbar
            open={this.props.openSnackbar}
            message={this.state.massage}
            autoHideDuration={4000}
          />
        </div> */}
      </Layout>
    );
  }
}
export default withRouter(withFirebase(TeamAllocationMissionList));
