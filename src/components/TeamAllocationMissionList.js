import React from "react";
import {
  List,
  ListItem,
  Divider,
  IconMenu,
  MenuItem,
  IconButton
} from "material-ui";
import { Tabs, Tab } from "material-ui/Tabs";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import TeamAllocationProjectList from "./TeamAllocationProjectList";
import TeamAllocationPeopleList from "./TeamAllocationPeoplesList";
import { grey500, orange100 } from "material-ui/styles/colors";
import * as moment from "moment";
class TeamAllocationMissionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }
  handleTabChange = value => {
    this.setState({
      value: value
    });
  };
  handleEditMissionChange(missionsId) {
    window.location = "/teamallocation/mission/" + missionsId;
  }
  handleArchiveMissionChange(missionsId) {
    console.log(missionsId);
  }
  handleEditProjectChange(projectId) {
    window.location = "/teamallocation/project/" + projectId;
  }
  handleArchiveProjectChange(projectId) {
    console.log(projectId);
  }
  render() {
    console.log(this.props);
    return (
      <Layout navigationTitle="Mission And Project List">
        <div>
          <div>
            <Tabs
              value={this.state.value}
              onChange={this.handleTabChange}
              tabItemContainerStyle={{ backgroundColor: "transparent" }}
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
                <div>
                  <div>
                    <Divider style={{ backgroundColor: orange100 }} />
                    <p style={{ color: grey500, padding: 20 }}>
                      <span style={{ padding: 10 }}>Missions List</span>
                    </p>
                    <Divider style={{ backgroundColor: orange100 }} />
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
                                      this.handleEditMissionChange(
                                        row.missionsId
                                      );
                                    }}
                                  >
                                    Edit
                                  </MenuItem>
                                  <MenuItem
                                    onClick={e => {
                                      e.preventDefault();
                                      this.handleArchiveMissionChange(
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
                                "Deadline :" +
                                moment(
                                  row.deadline.startDate.seconds * 1000
                                ).format("LL") +
                                " - " +
                                moment(
                                  row.deadline.endDate.seconds * 1000
                                ).format("LL")
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </List>
                  </div>
                  <Divider style={{ backgroundColor: orange100 }} />
                  <div>
                    <p style={{ color: grey500, padding: 20 }}>
                      <span style={{ padding: 10 }}>Project List</span>
                    </p>
                    <Divider style={{ backgroundColor: orange100 }} />
                    <List>
                      {this.props.projectsList.map((row, index) => (
                        <div key={index}>
                          <div>
                            <ListItem
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
                                      this.handleEditProjectChange(
                                        row.projectId
                                      );
                                    }}
                                  >
                                    Edit
                                  </MenuItem>
                                  <MenuItem
                                    onClick={e => {
                                      e.preventDefault();
                                      this.handleArchiveProjectChange(
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
                        </div>
                      ))}
                    </List>
                    <div>
                      <FloatingActionButton
                        backgroundColor={"rgb(253, 145, 77)"}
                        style={{ float: "right", marginRight: 10 }}
                      >
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
                          <MenuItem onClick={this.props.handleAddMission}>
                            Add Mission
                          </MenuItem>
                          <Divider />
                          <MenuItem onClick={this.props.handleAddproject}>
                            Add Project
                          </MenuItem>
                        </IconMenu>
                      </FloatingActionButton>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </Layout>
    );
  }
}
export default withRouter(TeamAllocationMissionList);
