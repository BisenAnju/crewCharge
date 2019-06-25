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
  NavigationMenu,
  NavigationArrowBack,
  ActionHome,
  ActionPowerSettingsNew,
  ActionList,
  ActionInput
} from "material-ui/svg-icons";
import leave from "../images/leave1.png";
import meeting from "../images/meeting1.png";
import complaint from "../images/complaint1.png";
import project from "../images/project1.png";
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
          disableSwipeToOpen={false}
          docked={false}
          width={260}
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
              secondaryText={
                this.props.userData.findIndex(
                  user => user.email === this.props.user.email
                ) >= 0 &&
                this.props.userData.find(
                  user => user.email === this.props.user.email
                ).email
              }
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
            {/* <ListItem
              onClick={e => {
                e.preventDefault();
                this.props.history.push("/leavedashboard");
              }}
              primaryText="Leave dashboard"
              leftIcon={<ActionDashboard />}
            /> */}
            <ListItem
              onClick={e => {
                e.preventDefault();
                this.props.history.push("/complaintlist");
              }}
              primaryText="Complaint List"
              leftIcon={
                <img
                  src={complaint}
                  style={{ height: "35px", width: "35px" }}
                />
              }
            />

            {this.props.userData.map((user, index) =>
              user.uid === this.props.user.uid && user.userType === "Admin" ? (
                <div key={index}>
                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/leavedashboard/admin");
                    }}
                    primaryText="Leave List"
                    leftIcon={
                      <img
                        src={leave}
                        style={{ height: "35px", width: "35px" }}
                      />
                    }
                  />
                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/teamallocation");
                    }}
                    primaryText="Peoples List"
                    leftIcon={
                      <img
                        src={meeting}
                        style={{ height: "35px", width: "35px" }}
                      />
                    }
                  />
                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/teamallocation/projectlist");
                    }}
                    primaryText="Projects List"
                    leftIcon={
                      <img
                        src={project}
                        style={{ height: "35px", width: "35px" }}
                      />
                    }
                  />

                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/teamallocation/mission");
                    }}
                    primaryText="Add Missions"
                    leftIcon={
                      <ActionInput
                        style={{
                          fill: "#fd914d",
                          heigth: "22px",
                          width: "22px",
                          left: "12px"
                        }}
                      />
                    }
                  />
                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/teamallocation/project");
                    }}
                    primaryText="Add Projects"
                    leftIcon={
                      <ActionInput
                        style={{
                          fill: "#fd914d",
                          heigth: "22px",
                          width: "22px",
                          left: "12px"
                        }}
                      />
                    }
                  />
                  {/* <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/leavepurpose");
                    }}
                    primaryText="Add Leave Purpose"
                    leftIcon={<ActionDashboard />}
                  /> */}
                  {/* <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/complainttype");
                    }}
                    primaryText="Add Complaint Type"
                    leftIcon={<ActionDashboard />}
                  /> */}
                </div>
              ) : null
            )}
            <Divider />
            <ListItem
              onClick={() => {
                this.props.logOut();
              }}
              primaryText="LogOut"
              leftIcon={
                <ActionPowerSettingsNew
                  style={{
                    fill: "#fd914d",
                    heigth: "22px",
                    width: "22px",
                    left: "12px"
                  }}
                />
              }
            />
          </List>
        </Drawer>
      </div>
    );
  }
}
export default withRouter(withAuthentication(withUser(NavigationBar)));
