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
const iconButtonElement = (
  <IconButton>
    <MoreVertIcon color={"grey"} />
  </IconButton>
);
const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Archive</MenuItem>
  </IconMenu>
);
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
  contentButton = {
    top: "auto",
    bottom: 20,
    left: "auto",
    right: 20,
    position: "fixed",
    margin: 0
  };
  render() {
    return (
      <Layout navigationTitle="Peoples List">
        <div>
          <div style={{ paddingTop: "15%" }}>
            <Tabs value={this.state.value} onChange={this.handleTabChange}>
              <Tab
                label="Missions List"
                style={{ background: "rgba(0, 0, 0, 0)" }}
                value={0}
              >
                <List>
                  {this.props.missionsList.map((row, index) => (
                    <div>
                      <div>
                        <ListItem
                          primaryText={row.name}
                          rightIconButton={rightIconMenu}
                        />
                      </div>
                      <div>
                        <Divider />
                      </div>
                    </div>
                  ))}
                </List>
              </Tab>
              <Tab
                label="Project List"
                style={{ background: "rgba(0, 0, 0, 0)" }}
                value={1}
              >
                <div>
                  <List>
                    {this.props.projectsList.map((row, index) => (
                      <div>
                        <div>
                          <ListItem
                            primaryText={row.name}
                            rightIconButton={rightIconMenu}
                          />
                        </div>
                        <div>
                          <Divider />
                        </div>
                      </div>
                    ))}
                  </List>
                </div>
              </Tab>
            </Tabs>
          </div>
          <FloatingActionButton
            backgroundColor={"rgb(253, 145, 77)"}
            style={this.contentButton}
          >
            <ContentAdd onClick={this.handleaddMission} />
          </FloatingActionButton>
        </div>
      </Layout>
    );
  }
}
export default withRouter(TeamAllocationMissionList);
