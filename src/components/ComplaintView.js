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
  Subheader,
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
  formSubmit(e) {
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
        <div style={{ height: "-webkit-fill-available", overflowY: "scroll" }}>
          {this.props.loading ? (
            <center>
              <RefreshIndicator
                size={40}
                left={10}
                top={0}
                status="loading"
                style={{ display: "inline-block", position: "relative" }}
              />
            </center>
          ) : (
              <Card style={{ boxShadow: "0px" }}>
                <center>
                  <Avatar
                    backgroundColor="white"
                    color="black"
                    // src={this.props.data.userImageURL}
                    src={
                      this.props.data.complaintType === "Harassment" &&
                      icn[
                      this.props.data.complaintType
                        .replace(" ", "")
                        .replace("/", "")
                      ]
                    }
                    icon={
                      this.props.data.complaintType !== "Harassment" &&
                      icn[
                      this.props.data.complaintType
                        .replace(" ", "")
                        .replace("/", "")
                      ]
                    }
                    size={130}
                  />
                </center>
                <List style={{ marginTop: "5%" }}>
                  <Subheader style={{ width: "fit-content", lineHeight: "0%" }}>
                    {this.props.data.userName}
                  </Subheader>
                  <Subheader
                    style={{
                      width: "fit-content",
                      lineHeight: "0%",
                      float: "right",
                      marginRight: "3%"
                    }}
                  >
                    {moment(
                      new Date(this.props.data.addedOn.seconds * 1000)
                    ).format("DD MMM YYYY h:m A")}
                  </Subheader>
                  <ListItem
                    disabled
                    style={{ fontSize: "20px" }}
                    primaryText="Title"
                    secondaryText={this.props.data.title}
                  />
                  <ListItem
                    disabled
                    style={{ fontSize: "20px" }}
                    primaryText="Description"
                  />
                </List>
                <CardText
                  style={{
                    marginTop: "-8%",
                    overflowWrap: "break-word",
                    paddingBottom: "13%",
                    fontSize: "16px"
                  }}
                >
                  {this.props.data.description}
                </CardText>
                <CardText>
                  <h4>Do Action</h4>
                  <SelectField
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
                {this.props.isAdmin === true && (
                  <CardActions
                    style={{
                      width: "100%",
                      backgroundColor: "#47adda"
                    }}
                  >
                    <FlatButton
                      style={{ color: "white" }}
                      label="Submit"
                      fullWidth={true}
                      onClick={this.formSubmit}
                    />
                  </CardActions>
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