import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { RaisedButton, TextField, Snackbar } from "material-ui";

const styles = {
  floatingLabelFocusStyle: {
    color: "#fd914d"
  }
};
class ComplaintType extends Component {
  constructor(props) {
    super(props);
    this.state = { complainttype: null, snackOpen: false };
  }

  textChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleComplaint = e => {
    e.preventDefault();
    if (this.state.complainttype === null) {
      this.setState({ snackOpen: true });
      return false;
    }
    this.props.addPurpose("value", "complaintType", this.state.complainttype);
  };
  handleRequestClose = () => {
    this.setState({ snackOpen: false });
  };
  render() {
    return (
      <div>
        <br />
        <center>
          <TextField
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            floatingLabelText="Complaint type"
            onChange={this.textChange}
            value={this.state.complainttype}
            name="complainttype"
          />
        </center>
        <br />

        <br />
        <br />
        <center>
          <RaisedButton
            label="ADD"
            backgroundColor="#fd914d"
            labelColor="white"
            onClick={this.handleComplaint}
          />
        </center>
        <Snackbar
          open={this.state.snackOpen}
          message="Add complaint type..."
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
export default withRouter(ComplaintType);
