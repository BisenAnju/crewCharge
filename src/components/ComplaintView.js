import React from "react";
import { withRouter } from "react-router-dom";
import Anonymous from "../images/anonymous.png";
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
  Snackbar,
  Subheader,
  Divider
} from "material-ui";
import Layout from "../layouts/Layout";

class ComplaintView extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      open: false,
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
    let adminReply =
      this.state.adminReply !== undefined
        ? this.state.adminReply
        : this.props.data.adminReply === undefined
        ? null
        : this.props.data.adminReply;
    let statusByAdmin =
      this.state.statusByAdmin !== undefined
        ? this.state.statusByAdmin
        : this.props.data.statusByAdmin === undefined
        ? null
        : this.props.data.statusByAdmin;
    if (adminReply === null || statusByAdmin === null) {
      this.setState({ message: "All fields mandatory", snackOpen: true });
      return false;
    }
    // validate is internet connected
    if (navigator.onLine === false) {
      this.setState({ message: "No internet access", snackOpen: true });
      return false;
    }
    this.props.submit(adminReply, statusByAdmin);
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
            <div>
              {console.log(this.props)}
              <List>
                <ListItem
                  disabled
                  leftAvatar={
                    <Avatar
                      size={45}
                      src={
                        this.props.data.isAnonymous === false
                          ? this.props.data.userImageURL
                          : this.props.data.userId ===
                            this.props.loggedInUser.uid
                          ? this.props.data.userImageURL
                          : Anonymous
                      }
                    />
                  }
                  rightAvatar={
                    <Avatar
                      size={45}
                      backgroundColor="transparent"
                      color="rgb(253, 145, 77)"
                      src={this.props.data.iconUrl}
                    />
                  }
                  primaryText={
                    this.props.data.isAnonymous === false
                      ? this.props.data.userName
                      : this.props.data.userId === this.props.loggedInUser.uid
                      ? this.props.data.userName
                      : "Anonymous"
                  }
                  secondaryText={this.props.data.complaintType}
                />
                <Divider />
                <ListItem
                  secondaryTextLines={1}
                  disabled
                  secondaryText={"Date"}
                  primaryText={this.props.data.date}
                />
                <ListItem
                  disabled
                  secondaryText="Title"
                  primaryText={this.props.data.title}
                />
              </List>
              <Card
                style={{
                  boxShadow: "0px",
                  backgroundColor: "rgba(0, 0, 0, 0)"
                }}
              >
                <CardText
                  style={{
                    overflowWrap: "break-word",
                    paddingBottom: "13%",
                    fontSize: "16px"
                  }}
                >
                  {this.props.data.description}
                </CardText>
                {this.props.isAdmin === true &&
                ((this.props.data.statusByAdmin !== undefined &&
                  this.props.data.statusByAdmin !== "resolve") ||
                  this.props.data.statusByAdmin === undefined) ? (
                  <div>
                    <CardText>
                      {console.log(this.props.data)}
                      <h4>Do Action</h4>
                      <SelectField
                        underlineFocusStyle={{
                          borderBottom: "2px solid rgb(240, 143, 76)"
                        }}
                        floatingLabelStyle={{ color: "rgb(240, 143, 76)" }}
                        name="statusByAdmin"
                        style={{ width: "100%" }}
                        value={
                          this.state.statusByAdmin === undefined
                            ? this.props.data.statusByAdmin
                            : this.state.statusByAdmin
                        }
                        onChange={this.handleChange}
                        floatingLabelText="Select Complaint Status"
                      >
                        <MenuItem value="pending" primaryText="Pending" />
                        <MenuItem value="resolve" primaryText="Resolved" />
                      </SelectField>
                      <TextField
                        underlineFocusStyle={{
                          borderBottom: "2px solid rgb(240, 143, 76)"
                        }}
                        floatingLabelStyle={{ color: "rgb(240, 143, 76)" }}
                        value={
                          this.state.adminReply === undefined
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
                ) : this.props.data.statusByAdmin !== undefined ? (
                  <div>
                    <Subheader>Action by admin</Subheader>
                    <ListItem
                      disabled
                      secondaryText={"Status"}
                      primaryText={this.props.data.statusByAdmin}
                      secondaryTextLines={1}
                    />
                    <ListItem
                      secondaryTextLines={2}
                      disabled
                      secondaryText={"Action"}
                      primaryText={this.props.data.adminReply}
                    />
                  </div>
                ) : null}
              </Card>
            </div>
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
