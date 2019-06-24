import React from "react";
import { withRouter } from "react-router-dom";
import {
  TextField,
  RefreshIndicator,
  FlatButton,
  List,
  ListItem,
  SelectField,
  MenuItem,
  Card,
  CardText,
  Avatar,
  CardActions,
  Snackbar
} from "material-ui";
import Layout from "../layouts/Layout";
import moment from "moment";
import Feedback from "material-ui/svg-icons/action/feedback";
import Overworked from "material-ui/svg-icons/action/work";
import LackOfVacationSickLeave from "material-ui/svg-icons/action/watch-later";
import Pay from "material-ui/svg-icons/action/payment";
import OfficeTemperature from "material-ui/svg-icons/image/texture";
import OfficeCleanliness from "material-ui/svg-icons/places/rv-hookup";
import Harassment from "../images/harassment.png";

const icn = {
  Harassment: Harassment,
  Feedback: <Feedback />,
  Overworked: <Overworked />,
  LackOfVacationSickLeave: <LackOfVacationSickLeave />,
  Pay: <Pay />,
  OfficeTemperature: <OfficeTemperature />,
  OfficeCleanliness: <OfficeCleanliness />
};

class ComplaintView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      adminReply: "",
      statusByAdmin: null,
      autoHideDuration: 4000,
      snackOpen: false,
      message: "All fields are required"
    };
    this.formSubmit = this.formSubmit.bind(this);
  }
  snackbarHandleRequestClose = () => {
    this.setState({
      snackOpen: false
    });
  };
  handleOpen = val => this.setState({ open: val });
  handleChange = (event, index, statusByAdmin) =>
    this.setState({ statusByAdmin });
  inputValidation = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  formSubmit() {
    if (this.state.adminReply === "" || this.state.statusByAdmin === null) {
      this.setState({ snackOpen: true });
      return false;
    }

    // validate is internet connected
    if (navigator.onLine === false) {
      this.setState({ message: "No internet access", snackOpen: true });
      return false;
    }
    this.props.submit(this.state.adminReply, this.state.statusByAdmin);
    this.handleOpen(false);
    this.setState({ message: "Submit Successful", snackOpen: true });
  }
  render() {
    return (
      <Layout navigationTitle="Complaint Details" showBackNavigation={true}>
        <div style={{ height: "90vh", overflowY: "scroll" }}>
          {this.props.loading ? (
            <center>
              <RefreshIndicator
                size={40}
                left={10}
                top={0}
                status="loading"
                loadingColor="rgb(240, 143, 76)"
                style={{ display: "inline-block", position: "relative" }}
              />
            </center>
          ) : (
            <Card
              style={{ boxShadow: "0px", backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              <center>
                <Avatar
                  backgroundColor="rgba(0, 0, 0, 0)"
                  color="black"
                  {...(this.props.data.complaintType === "Harassment"
                    ? {
                        src:
                          icn[
                            this.props.data.complaintType
                              .replace(" ", "")
                              .replace("/", "")
                          ]
                      }
                    : {
                        icon:
                          icn[
                            this.props.data.complaintType
                              .replace(" ", "")
                              .replace("/", "")
                          ]
                      })}
                  size={130}
                />
              </center>
              <List style={{ marginTop: "5%" }}>
                <ListItem
                  style={{ width: "50%", float: "left" }}
                  disabled
                  secondaryText={"Name"}
                  primaryText={this.props.data.userName}
                  secondaryTextLines={1}
                />
                <ListItem
                  style={{ width: "50%", float: "right", textAlignLast: "end" }}
                  secondaryTextLines={1}
                  disabled
                  secondaryText={"Date & Time"}
                  primaryText={moment(
                    new Date(this.props.data.addedOn.seconds * 1000)
                  ).format("DD MMM YYYY h:m A")}
                />
                <ListItem
                  disabled
                  secondaryText="Title"
                  primaryText={this.props.data.title}
                />
                <CardText
                  style={{
                    // marginTop: "-8%",
                    overflowWrap: "break-word",
                    paddingBottom: "13%",
                    fontSize: "16px"
                  }}
                >
                  {this.props.data.description}
                </CardText>
              </List>
              {this.props.isAdmin === true && (
                <div>
                  <CardText>
                    <h4>Do Action</h4>
                    <SelectField
                      underlineFocusStyle={{
                        borderBottom: "2px solid rgb(240, 143, 76)"
                      }}
                      floatingLabelStyle={{ color: "rgb(240, 143, 76)" }}
                      name="statusByAdmin"
                      style={{ width: "100%" }}
                      value={
                        this.props.data.statusByAdmin !== undefined
                          ? this.props.data.statusByAdmin
                          : this.state.statusByAdmin
                      }
                      onChange={this.handleChange}
                      floatingLabelText="Select Complaint Status"
                    >
                      <MenuItem value="pending" primaryText="Pending" />
                      <MenuItem value="resolve" primaryText="Resolved" />
                      <MenuItem value="other" primaryText="Other" />
                    </SelectField>
                    <TextField
                      underlineFocusStyle={{
                        borderBottom: "2px solid rgb(240, 143, 76)"
                      }}
                      floatingLabelStyle={{ color: "rgb(240, 143, 76)" }}
                      value={
                        this.props.data.adminReply !== undefined
                          ? this.props.data.adminReply
                          : this.state.adminReply
                      }
                      name="adminReply"
                      onChange={this.inputValidation}
                      style={{ width: "100%" }}
                      floatingLabelText="Write About Action"
                      multiLine={true}
                      rowsMax={6}
                    />
                  </CardText>
                  <CardActions
                    style={{
                      width: "100%"
                    }}
                  >
                    <FlatButton
                      style={{
                        color: "white",
                        backgroundColor: "rgb(240, 143, 76)"
                      }}
                      label="Submit"
                      fullWidth={true}
                      onClick={this.formSubmit}
                    />
                  </CardActions>
                </div>
              )}
            </Card>
          )}
        </div>
        <Snackbar
          onActionClick={this.snackbarHandleRequestClose}
          action="Close"
          open={this.state.snackOpen}
          onRequestClose={this.snackbarHandleRequestClose}
          message={this.state.message}
          autoHideDuration={this.state.autoHideDuration}
        />
      </Layout>
    );
  }
}
export default withRouter(ComplaintView);
