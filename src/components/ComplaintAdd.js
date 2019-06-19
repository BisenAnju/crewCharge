import React from "react";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Snackbar,
  RaisedButton,
  Card,
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
    this.setState({ complaintType });
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

    // validate is internet connected
    if (navigator.onLine === false) {
      this.setState({
        loading: false,
        message: "No internet access",
        snackOpen: true
      });
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
        <form onSubmit={this.validateAll}>
          <CardText>
            <span>Anonymous</span>
            <AnonymousRadioButton validateRadio={this.validateInput} />
            <span>Priority</span>
            <PriorityRadioButton validatePriority={this.validateInput} />
            {/* <h3>Complaint Type</h3> */}
            <SelectfieldClass
              selectChange={this.selectChange}
              complaintTypeValue={this.state.complaintType}
            />
            {/* <h3>Complaint Title</h3> */}
            <TextField
              floatingLabelText="Complaint Title"
              id="title"
              onChange={this.validateInput}
              style={{ width: "100%" }}
            />
            {/* <h3>Describe your complaint</h3> */}
            <TextField
              floatingLabelText="Complaint Description"
              id="description"
              onChange={this.validateInput}
              style={{ width: "100%" }}
              multiLine={true}
            />
          </CardText>
          <center>
            <RaisedButton
              labelColor="white"
              backgroundColor="#669e25"
              type="submit"
              label="Submit"
              disabled={this.state.loading}
              style={styles.button}
            >
              {this.state.loading && (
                <CircularProgress
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
      </Layout>
    );
  }
}
export default withRouter(NewComplaint);
