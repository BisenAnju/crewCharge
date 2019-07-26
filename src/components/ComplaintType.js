import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  RaisedButton,
  TextField,
  Snackbar,
  CircularProgress,
  FloatingActionButton
} from "material-ui";
import Dropzone from "react-dropzone";
import ImageCompressor from "image-compressor.js";
import firebase from "firebase";
import { FileFileUpload } from "material-ui/svg-icons";
import { grey100 } from "material-ui/styles/colors";
const styles = {
  floatingLabelFocusStyle: {
    color: "#fd914d"
  }
};
class ComplaintType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaintType: null,
      snackOpen: false,
      temporaryImageURL: null,
      pictures: [],
      completed: false,
      isLoadingUploadImage: 1
    };
  }
  getIcon = (acceptedFiles, rejectedFiles) => {
    const file = acceptedFiles[0];
    if (file == null) {
      alert("Invalid File Type!");
    } else {
      this.setState({
        completed: true,
        loading: true,
        isLoadingUploadImage: 2
      });
    }
    new ImageCompressor(file, {
      quality: 0.55,
      maxWidth: 1500,
      success: result => {
        const image = firebase
          .storage()
          .ref()
          .child("images");
        const ref = image.child(new Date().toString());
        ref.put(file).then(() => {
          ref.getDownloadURL().then(url => {
            console.log(url);
            const updatedImageURL = url;
            console.log(updatedImageURL);
            const pictures = this.state.pictures;
            pictures.push(url);
            this.setState({
              completed: true,
              pictures,
              loading: false,
              temporaryImageURL: updatedImageURL,
              isLoadingUploadImage: 3
            });
            console.log(updatedImageURL);
          });
        });
      }
    });
  };
  textChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleComplaint = e => {
    e.preventDefault();
    if (this.state.complaintType === null) {
      this.setState({ snackOpen: true });
      return false;
    }
    this.props.addPurpose(
      "value",
      "complaintType",
      this.state.complaintType,
      this.state.temporaryImageURL
    );
  };
  handleRequestClose = () => {
    this.setState({ snackOpen: false });
  };
  render() {
    return (
      <div>
        <center>
          <TextField
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            floatingLabelText="Complaint type"
            onChange={this.textChange}
            value={this.state.complaintType}
            name="complaintType"
          />
        </center>
        <br />

        <div
          style={{
            border: "1px solid #d3d3d3",
            // height: "80px",
            width: "100%"
            // marginLeft: 35
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              float: "right",
              marginRight: 30,
              marginTop: 10
            }}
          >
            {this.state.loading ? (
              <CircularProgress
                size={20}
                color={"#fd914d"}
                style={{ margin: 10 }}
              />
            ) : this.state.temporaryImageURL !== null ? (
              <img
                alt={"img"}
                style={{ width: 50, height: 50 }}
                src={this.state.temporaryImageURL}
              />
            ) : null}
          </div>
          <Dropzone onDrop={this.getIcon} accept="image/*">
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <u>
                    <FloatingActionButton
                      backgroundColor={grey100}
                      style={{ margin: 10 }}
                    >
                      {<FileFileUpload style={{ fill: "#fd914d" }} />}
                    </FloatingActionButton>
                  </u>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
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
