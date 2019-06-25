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
import TeamAllocationPeopleList from "./TeamAllocationPeoplesList";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList
} from "@ionic/react";

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
    const iconButtonElement = (
      <IconButton>
        <MoreVertIcon color={"grey"} />
      </IconButton>
    );
    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={this.props.handleEditChange}>Edit</MenuItem>
        <MenuItem onClick={this.props.handleArchiveChange}>Archive</MenuItem>
      </IconMenu>
    );
    return (
      //   <Layout navigationTitle="Mission And Project List">
      <div>
        <div style={{ paddingTop: "15%" }}>
          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
            tabItemContainerStyle={{ backgroundColor: "transparent" }}
          >
            <Tab label="Missions List" style={{ color: "#f08f4c" }} value={0}>
              <div>
                <TeamAllocationPeopleList />
              </div>
            </Tab>
            <Tab label="Missions List" style={{ color: "#f08f4c" }} value={1}>
              <List>
                {this.props.missionsList.map((row, index) => (
                  <div>
                    <div>
                      <ListItem
                        key={index}
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
            <Tab label="Project List" style={{ color: "#f08f4c" }} value={2}>
              <div>
                <List>
                  {this.props.projectsList.map((row, index) => (
                    <div>
                      <div>
                        <ListItem
                          key={index}
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
        {/* <FloatingActionButton
            backgroundColor={"rgb(253, 145, 77)"}
            style={this.contentButton}
          >
            <ContentAdd onClick={this.handleaddMission} />
          </FloatingActionButton> */}
        <IonContent>
          <IonFab
            vertical="top"
            horizontal="end"
            slot="fixed"
            backgroundColor={"rgb(253, 145, 77)"}
            style={this.contentButton}
          >
            <IonFabButton>
              <IonIcon name="add" />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </div>
      //   </Layout>
    );
  }
}
export default withRouter(TeamAllocationMissionList);
