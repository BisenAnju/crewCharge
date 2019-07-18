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
  ListItem,
  Subheader
} from "material-ui";
import {
  NavigationMenu,
  NavigationArrowBack,
  ActionHome,
  ActionPowerSettingsNew,
  NotificationEventNote,
  SocialGroup,
  ActionDateRange,
  ActionSettings
} from "material-ui/svg-icons";
import privacy from "../images/privacy.png";
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
            this.props.history.push("/")
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
          disableSwipeToOpen={true}
          docked={false}
          width={260}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <List>
            <ListItem
              disabled
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

            {this.props.userData.map((user, index) =>
              user.uid === this.props.user.uid && user.userType === "Admin" ? (
                <div key={index}>
                  <Subheader inset={true}>Admin</Subheader>
                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/leavedashboard/admin");
                    }}
                    primaryText="Manage Leaves"
                    leftIcon={
                      <ActionDateRange
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
                      this.props.history.push("/complaintlist");
                    }}
                    primaryText="Manage Complaints"
                    leftIcon={
                      <NotificationEventNote
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
                      this.props.history.push("/teamallocation");
                    }}
                    primaryText="Team Allocation"
                    leftIcon={
                      <SocialGroup
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
                    // onClick={e => {
                    //   e.preventDefault();
                    //   this.props.history.push("");
                    // }}
                    primaryText="User & Permission"
                    leftIcon={
                      <SocialGroup
                        style={{
                          fill: "#fd914d",
                          heigth: "22px",
                          width: "22px",
                          left: "12px"
                        }}
                      />
                    }
                  />
                  <Divider />

                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/configuration");
                    }}
                    primaryText="Configuration"
                    leftIcon={
                      <ActionSettings
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
                this.props.history.push("/projects");
              }}
              primaryText="Client Communication"
              leftIcon={
                <ActionAssignment
                  style={{
                    fill: "#fd914d",
                    heigth: "22px",
                    width: "22px",
                    left: "12px"
                  }}
                />
              }
            /> */}
                </div>
              ) : null
            )}

            {this.props.userData.map((user, index) =>
              user.uid === this.props.user.uid &&
              user.userType === "Employee" ? (
                <div key={index}>
                  <Subheader inset={true}>Employee</Subheader>

                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/leavedashboard");
                    }}
                    primaryText="My Leaves"
                    leftIcon={
                      <ActionDateRange
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
                      this.props.history.push("/complaintlist");
                    }}
                    primaryText="My Complaints"
                    leftIcon={
                      <NotificationEventNote
                        style={{
                          fill: "#fd914d",
                          heigth: "22px",
                          width: "22px",
                          left: "12px"
                        }}
                      />
                    }
                  />
                  <Divider />
                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/privacypolicy");
                    }}
                    primaryText="Privacy Policy"
                    leftIcon={
                      <Avatar
                        backgroundColor="white"
                        src={privacy}
                        style={{
                          borderRadius: 0,
                          marginLeft: "22px",
                          marginTop: "10px"
                        }}
                      />
                    }
                  />
                  <Divider />
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
            <Divider />

            <div
              style={{
                fontSize: "85%",
                textAlign: "center"
              }}
            >
              v1.0.3
            </div>

            {/* <ListItem
              disabled={true}
              insetChildren={true}
              primaryText={"v1.0.3"}
            /> */}
          </List>
        </Drawer>
      </div>
    );
  }
}
export default withRouter(withAuthentication(withUser(NavigationBar)));
