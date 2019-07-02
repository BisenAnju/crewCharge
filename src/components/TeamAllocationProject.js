import React from "react";
import { withRouter } from "react-router-dom";
import { TextField, RaisedButton } from "material-ui";
import Layout from "../layouts/Layout";
import { white } from "material-ui/styles/colors";
import Dropzone from "react-dropzone";
import withFirebase from "../hoc/withFirebase";
import firebase from "firebase";
import ImageCompressor from "image-compressor.js";
class TeamAllocationProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      projectName: "",
      pictures: [],
      completed1: false,
      isLoadingSingleUser: true,
      isLoadingUploadImage: 1,
      temporaryImageURL: null
    };
  }
  componentWillMount() {
    if (this.props.projectList !== undefined) {
      this.setState({
        projectName: this.props.projectList.name,
        temporaryImageURL: this.props.projectList.logoURL
      });
    }
  }
  handleTextChange = (event, index, projectName) => {
    this.setState({
      projectName: event.target.value,
      questionsId: event.target.value
    });
  };
  handleClose = () => {
    this.setState({ projectName: "", files: [] });
  };
  editProfile = (acceptedFiles, rejectedFiles) => {
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
  render() {
    return (
      <Layout navigationTitle="Project" showBackNavigation={true}>
        <div style={{ padding: 10 }}>
          <TextField
            floatingLabelText="Enter Project Name"
            value={this.state.projectName}
            fullWidth={true}
            onChange={this.handleTextChange}
          />
          <div style={{ height: 100, marginTop: 20 }}>
            {this.state.temporaryImageURL === null ? (
              ""
            ) : (
              <div style={{ float: "right", marginRight: 20 }}>
                <img
                  src={this.state.temporaryImageURL}
                  style={{ width: 80, height: 80 }}
                />
              </div>
            )}
            <div>
              <Dropzone
                onDrop={this.editProfile}
                accept="image/*"
                style={{ height: 100 }}
              >
                {({ getRootProps, getInputProps, isDragActive }) => {
                  return (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <u>
                        <RaisedButton
                          label="Upload..."
                          labelColor={white}
                          backgroundColor={"rgb(253, 145, 77)"}
                        />
                      </u>
                    </div>
                  );
                }}
              </Dropzone>
            </div>
          </div>
          <div style={{ padding: 10, alignItems: "center", marginLeft: "35%" }}>
            {this.props.match.params.projectId !== undefined ? (
              <RaisedButton
                label="Update"
                labelColor={white}
                backgroundColor={"rgb(253, 145, 77)"}
                onClick={e => {
                  e.preventDefault();
                  this.props.handleUpdateProject(
                    this.state.projectName,
                    this.state.temporaryImageURL,
                    this.props.match.params.projectId
                  );
                }}
                style={{ marginRight: 10 }}
              />
            ) : (
              <RaisedButton
                label="Save"
                labelColor={white}
                backgroundColor={"rgb(253, 145, 77)"}
                onClick={e => {
                  e.preventDefault();
                  this.props.handleAddProject(
                    this.state.projectName,
                    this.state.temporaryImageURL
                  );
                }}
              />
            )}
          </div>
        </div>
      </Layout>
    );
  }
}
export default withRouter(withFirebase(TeamAllocationProject));
