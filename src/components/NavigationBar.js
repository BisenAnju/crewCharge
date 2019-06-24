import React from "react";
import { withRouter } from "react-router-dom";
import withUser from "../hoc/withUser";
import withAuthentication from "../hoc/withAuthentication";
import {
  AppBar,
  Avatar,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem
} from "material-ui";
import {
  NavigationArrowBack,
  SocialPerson,
  ActionDashboard
} from "material-ui/svg-icons";
import { NavigationMenu, ActionHome } from "material-ui/svg-icons";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <AppBar
          titleStyle={{
            textAlign: "center",
            color: "#fd914d"
          }}
          title={this.props.navigationTitle}
          style={{
            boxShadow: "0px",
            backgroundColor: "transparent",
            position: "fixed"
          }}
          onRightIconButtonClick={() =>
            this.props.navigationTitle !== "Dashboard" &&
            this.props.history.goBack("/dashboard")
          }
          onLeftIconButtonClick={() =>
            this.props.showBackNavigation
              ? this.props.history.goBack()
              : this.handleToggle()
          }
          iconElementLeft={
            <IconButton>
              {this.props.showBackNavigation ? (
                <NavigationArrowBack color="#fd914d" />
              ) : (
                <NavigationMenu color="#fd914d" />
              )}
            </IconButton>
          }
          iconElementRight={
            <IconButton>
              <ActionHome color="#fd914d" />
            </IconButton>
          }
        />
        <Drawer
          docked={false}
          width={210}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <List>
            <ListItem
              disabled
              onClick={e => {
                e.preventDefault();
                this.props.history.push("/leavedashboard/admin");
              }}
              primaryText={
                this.props.userData.findIndex(
                  user => user.displayName === this.props.user.displayName
                ) >= 0 &&
                this.props.userData.find(
                  user => user.displayName === this.props.user.displayName
                ).displayName
              }
              leftAvatar={
                <Avatar
                  size={50}
                  src={
                    this.props.userData.findIndex(
                      user => user.photoURL === this.props.user.photoURL
                    ) >= 0
                      ? this.props.userData.find(
                          user => user.photoURL === this.props.user.photoURL
                        ).photoURL
                      : "null"
                  }
                />
              }
            />
            <Divider />
            <ListItem
              onClick={e => {
                e.preventDefault();
                this.props.history.push("/leavedashboard");
              }}
              primaryText="Leave dashboard"
              leftIcon={<ActionDashboard />}
            />

            {this.props.userData.map((user, index) =>
              user.uid === this.props.user.uid && user.userType === "Admin" ? (
                <div key={index}>
                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/leavedashboard/admin");
                    }}
                    primaryText="Admin Dashboard"
                    leftIcon={<ActionDashboard />}
                  />
                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/leavepurpose");
                    }}
                    primaryText="Add Leave Purpose"
                    leftIcon={<ActionDashboard />}
                  />
                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/complainttype");
                    }}
                    primaryText="Add Complaint Type"
                    leftIcon={<ActionDashboard />}
                  />
                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/teamallocation");
                    }}
                    primaryText="Peoples List"
                    leftIcon={<ActionDashboard />}
                  />
                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/teamallocation/mission");
                    }}
                    primaryText="Add Missions"
                    leftIcon={<ActionDashboard />}
                  />
                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/teamallocation/project");
                    }}
                    primaryText="Add Projects"
                    leftIcon={<ActionDashboard />}
                  />
                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/teamallocation/projectlist");
                    }}
                    primaryText="Projects List"
                    leftIcon={<ActionDashboard />}
                  />
                </div>
              ) : null
            )}
            <Divider />
            <ListItem
              onClick={() => {
                this.props.logOut();
              }}
              primaryText="LogOut"
              leftIcon={<SocialPerson />}
            />
          </List>
        </Drawer>
      </div>
    );
  }
}
export default withRouter(withAuthentication(withUser(NavigationBar)));
