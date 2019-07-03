import React from "react";
import { withRouter } from "react-router-dom";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";
import {
  TextField,
  Snackbar,
  RaisedButton,
  CardText,
  CircularProgress
} from "material-ui";
import Layout from "../layouts/Layout";
import {
  PriorityRadioButton,
  SelectfieldClass,
  AnonymousRadioButton
} from "./ComplaintAddRadioButton";

const styles = {
  block: { marginTop: "2%" },
  button: { margin: "5%" }
};

class NewComplaint extends React.Component {
  constructor() {
    super();
    this.state = {
      complaintType: null,
      loading: false,
      snackOpen: false,
      isAnonymous: false,
      description: "",
      title: "",
      priority: "low",
      autoHideDuration: 4000,
      message: "All fields are required"
    };
    this.validateAll = this.validateAll.bind(this);
  }

  // get value of selected option of selectfield
  selectChange = (event, index, complaintType) => {
    this.setState({
      complaintType,
      complaintTypeName: event.target.firstChild.nodeValue
    });
  };

  validateInput = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  snackbarHandleRequestClose = () => {
    this.setState({
      snackOpen: false
    });
  };

  validateAll(e) {
    e.preventDefault();
    let ths = this;
    // validate is internet connected
    if (navigator.onLine === false) {
      this.setState({
        loading: false,
        message: "No internet access",
        snackOpen: true
      });
      return false;
    }

    // validate isAnonymous,priority,complaint type,complaint detail
    if (
      this.state.isAnonymous === null ||
      this.state.priority === null ||
      this.state.complaintType === null ||
      this.state.description === "" ||
      this.state.title === ""
    ) {
      this.setState({ snackOpen: true });
      return false;
    }

    ths.setState({ loading: true });
    if (this.props.AddComplaint(this.state)) {
      ths.setState({ message: "Submitted Successfully", snackOpen: true });
    }
  }
  render() {
    return (
      <Layout navigationTitle="New Complaint" showBackNavigation={true}>
        <div style={{ height: "90vh" }}>
          <form onSubmit={this.validateAll}>
            <CardText>
              <span>Anonymous</span>
              <AnonymousRadioButton validateRadio={this.validateInput} />
              <span>Priority</span>
              <PriorityRadioButton validatePriority={this.validateInput} />
              <SelectfieldClass
                selectChange={this.selectChange}
                complaintType={this.props.complaintType}
                complaintTypeValue={this.state.complaintType}
              />
              <TextField
                underlineFocusStyle={{
                  borderBottom: "2px solid rgb(240, 143, 76)"
                }}
                floatingLabelStyle={{ color: "rgb(240, 143, 76)" }}
                floatingLabelText="Enter complaint title"
                id="title"
                onChange={this.validateInput}
                style={{ width: "100%" }}
              />
              <TextField
                underlineFocusStyle={{
                  borderBottom: "2px solid rgb(240, 143, 76)"
                }}
                floatingLabelStyle={{ color: "rgb(240, 143, 76)" }}
                floatingLabelText="Enter complaint description"
                id="description"
                onChange={this.validateInput}
                style={{ width: "100%" }}
                multiLine={true}
              />
            </CardText>
            <center>
              <RaisedButton
                labelColor="white"
                backgroundColor="rgb(240, 143, 76)"
                type="submit"
                label="Submit"
                disabled={this.state.loading}
                style={styles.button}
              >
                {this.state.loading && (
                  <CircularProgress
                    color={"rgb(240, 143, 76)"}
                    style={{
                      width: "80%",
                      marginLeft: "auto",
                      marginRight: "auto",
                      position: "absolute"
                    }}
                    size={30}
                    thickness={3}
                  />
                )}
              </RaisedButton>
            </center>
          </form>
          <Snackbar
            open={this.state.snackOpen}
            onRequestClose={this.snackbarHandleRequestClose}
            message={this.state.message}
            autoHideDuration={this.state.autoHideDuration}
          />
        </div>
      </Layout>
    );
  }
}
export default withUser(withFirebase(withRouter(NewComplaint)));
