import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import { RaisedButton, TextField, Snackbar } from "material-ui";
import { lightGreen800 } from "material-ui/styles/colors";
import Dropzone from "react-dropzone";
import ImageCompressor from "image-compressor.js";
import firebase from "firebase";
class ComplaintType extends Component {
  constructor(props) {
    super(props);
    this.state = { complainttype: null, snackOpen: false };
  }

  getIcon = (acceptedFiles, rejectedFiles) => {
    const file = acceptedFiles[0];
    if (file == null) {
      alert("Invalid File Type!");
    } else {
      this.setState({ completed1: true, isLoadingUploadImage: 2 });
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
    if (this.state.complainttype === null) {
      this.setState({ snackOpen: true });
      return false;
    }
    this.props.addComplaint(this.state.complainttype);
  };
  handleRequestClose = () => {
    this.setState({ snackOpen: false });
  };
  render() {
    return (
      <Layout navigationTitle="Complaint Type" showBackNavigation={true}>
        <div>
          <br />
          <center>
            <TextField
              floatingLabelText="Complaint type"
              onChange={this.textChange}
              value={this.state.complainttype}
              name="complainttype"
            />
          </center>
          <br />
          <Dropzone onDrop={this.getIcon} accept="image/*">
            {({ getRootProps, getInputProps, isDragActive }) => {
              return (
                <div {...getRootProps}>
                  <input {...getInputProps} />
                  <u>
                    <RaisedButton
                      label="Upload Icon"
                      primary={true}
                      style={{ marginLeft: "15%" }}
                    />
                  </u>
                </div>
              );
            }}
          </Dropzone>
          <br />
          <br />
          <center>
            <RaisedButton
              label="ADD"
              backgroundColor={lightGreen800}
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
      </Layout>
    );
  }
}
export default withRouter(ComplaintType);
