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
  ListItem, Card, CardHeader, CardText, MenuItem
} from "material-ui";
import {
  NavigationArrowBack,
  SocialPerson,
  ActionDashboard
} from "material-ui/svg-icons";
import Home from "material-ui/svg-icons/action/home";
import Menu from "material-ui/svg-icons/navigation/menu";
import ROUTES from "../constants/routes";
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
            fontSize: "18px",
            textAlign: "center"
          }}
          title={this.props.navigationTitle}
          onRightIconButtonClick={() =>
            this.props.navigationTitle !== "Dashboard" && this.props.history.goBack(ROUTES.DASHBOARD)}
          onLeftIconButtonClick={() =>
            this.props.showBackNavigation ? this.props.history.goBack() : this.handleToggle()}
          iconElementLeft={
            <IconButton>
              {this.props.showBackNavigation ? (
                <NavigationArrowBack />
              ) : (
                  <Menu />
                )}
            </IconButton>
          }
          iconElementRight={
            <IconButton>
              <Home />
            </IconButton>
          }
        />
        <Drawer
          docked={false}
          width={210}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <div>
            <Avatar style={{ margin: 18 }} size={30}>
              <SocialPerson />
            </Avatar>
            <span style={{ fontWeight: "bold" }}>
              {this.props.userData.findIndex(
                user => user.displayName === this.props.user.displayName
              ) >= 0 &&
                this.props.userData.find(
                  user => user.displayName === this.props.user.displayName
                ).displayName}
            </span>
          </div>
          <Divider />
          <List>
            <ListItem
              onClick={e => {
                e.preventDefault();
                this.props.history.push("/leavedashboard");
              }}
              primaryText="Leave dashboard"
              leftIcon={<ActionDashboard />}
            />

            {this.props.userData.map(user =>
              user.uid === this.props.user.uid && user.userType === "Admin" ? (
                <div>
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

          {/* Routes of Complaint Management */}
          <Card>
            <CardHeader
              title="Complaint Management"
              actAsExpander={true}
              showExpandableButton={true}
            />

            <CardText expandable={true}>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  this.props.history.push("/complaint");
                }}
              >
                New Complaint
              </MenuItem>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  this.props.history.push("/complaintlist");
                }}
              >
                Complaint List
              </MenuItem>
            </CardText>
          </Card>
          {/*Team Allocation start */}
          <Card style={{ boxShadow: "0px" }}>
            <CardHeader
              title="Team Allocation"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  this.props.history.push(
                    "/teamallocation"
                  );
                }}
              >
                Missions
                  </MenuItem>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  this.props.history.push(
                    "/teamallocation/project"
                  );
                }}
              >
                Project
                  </MenuItem>
            </CardText>
          </Card>
          {/*Team Allocation End */}
          {/* Team Intelligence MenuItem  Start*/}
          {/* <Card>
            <CardHeader
              title="Team Intelligence"
              actAsExpander={true}
              showExpandableButton={true}
            />

            <CardText
              expandable={true}
              style={{
                padding: 0
              }}
            >
              <Card style={{ boxShadow: "0px" }}>
                <CardHeader
                  title="Admin"
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardText expandable={true}>
                  <MenuItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push(
                        "/teamintelligencedashboard/admin"
                      );
                    }}
                  >
                    Question Management
                  </MenuItem>
                  <MenuItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push(
                        "/teamintelligencedashboard/admin/teamemployeedetaillist"
                      );
                    }}
                  >
                    Employee Got Talent
                  </MenuItem>
                  <MenuItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push(
                        "/teamintelligencedashboard/admin/teamcategorylist"
                      );
                    }}
                  >
                    Category List
                  </MenuItem>
                  <MenuItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push(
                        "/teamintelligencedashboard/admin/teamarchiveddata"
                      );
                    }}
                  >
                    Archived List
                  </MenuItem>
                </CardText>
              </Card> */}
          {/* <Card style={{ boxShadow: "0px" }}>
                <CardHeader
                  title="Employee"
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardText expandable={true}>
                  <MenuItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push(
                        "/teamintelligencedashboard/employee"
                      );
                    }}
                  >
                    Question Management
                  </MenuItem>
                  <MenuItem
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push(
                        "/teamintelligencedashboard/employee/teamemployeedetaillist"
                      );
                    }}
                  >
                    Employee Got Talent
                  </MenuItem>
                </CardText>
              </Card> */}
          {/* </CardText>
          </Card> */}
          {/* Team Intelligence MenuItem  End*/}
          <Card>
            <MenuItem
              onClick={() => {
                this.props.logOut();
              }}
            >
              <b>SignOut</b>
            </MenuItem>
          </Card>
        </Drawer>
      </div>
    );
  }
}
export default withRouter(withAuthentication(withUser(NavigationBar)));