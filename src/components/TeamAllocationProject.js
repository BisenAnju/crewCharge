import React from "react";
import { withRouter } from "react-router-dom";
import {
  TextField,
  RaisedButton,
  Snackbar
} from "material-ui";
import Layout from "../layouts/Layout";
import { orange500, blue500 } from 'material-ui/styles/colors';
import Dropzone from 'react-dropzone';
import withFirebase from "../hoc/withFirebase";
import firebase from "firebase";
import ImageCompressor from "image-compressor.js";
const styles = {
  errorStyle: {
    color: orange500,
    padding: 10
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};
class TeamAllocationProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      projectName: null,
      pictures: [],
      completed1: false,
      isLoadingSingleUser: true,
      isLoadingUploadImage: 1,
      temporaryImageURL: null,
    };
  }
  handleTextChange = (event, index, projectName) => {
    this.setState({
      projectName: event.target.value,
      questionsId: event.target.value
    });
  };
  handleClose = () => {
    this.setState({ projectName: null, files: [] })
  }
  // handleDropZoneChange =(event, index, value) =>{
  //   let metadata = {
  //     contentType: 'image/*',
  //   };
  //   let storageRef =this.props.firebase.app.firebase_.storage().ref();
  //   let uploadTask = storageRef.child('images').put(value);
  //   console.log(uploadTask)
  //   this.setState({
  //     files: event.target.value
  //   });
  // }
  // handleDrop([{ preview }]) {
  //   this.setState({ preview })
  // }
  editProfile = (acceptedFiles, rejectedFiles) => {
    const file = acceptedFiles[0];
    if (file == null) {
      alert("Invalid File Type!");
    } else {
      this.setState({ completed1: true, isLoadingUploadImage: 2 });
    }
    new ImageCompressor(file, {
      //  eslint-disable-line
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
  render() {
    const maxSize = 10468;
    return (
      <Layout navigationTitle="Project">
        <div style={{ padding: 10 }}>
          <TextField
            floatingLabelText="Enter Project Name"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            defaultValue={this.state.projectName}
            hintStyle={styles.errorStyle}
            fullWidth={true}
            onChange={this.handleTextChange}
          />
          <div style={{ height: 100, marginTop: 20 }}>
            {this.state.temporaryImageURL === null ? "" :
              <div style={{ float: "right", marginRight: 20 }}><img src={this.state.temporaryImageURL} style={{ width: 80, height: 80 }}></img></div>
            }
            <div>
              <Dropzone onDrop={this.editProfile} accept="image/*">
                {({ getRootProps, getInputProps, isDragActive }) => {
                  return (
                    <div
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <u ><RaisedButton label="Upload..." primary={true}></RaisedButton></u>
                    </div>
                  );
                }}
              </Dropzone></div>
          </div>
          <div style={{ padding: 10, alignItems: "center" }}>
            <RaisedButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
              style={{ marginRight: 10 }}
            />
            <RaisedButton
              label="Save"
              primary={true}
              onClick={e => {
                e.preventDefault();
                this.props.handleAddProject(
                  this.state.projectName,
                  this.state.temporaryImageURL,
                );
              }}
            />
          </div>
          <div><Snackbar
            open={this.props.openSnackbar}
            message={this.props.message}
            autoHideDuration={4000}
          /></div>
        </div>
      </Layout>
    );
  }
}
export default withRouter(withFirebase(TeamAllocationProject));
