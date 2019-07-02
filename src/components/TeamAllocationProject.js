import React from "react";
import { withRouter } from "react-router-dom";
import {
  TextField,
  RaisedButton,
  CircularProgress,
  FloatingActionButton
} from "material-ui";
import Layout from "../layouts/Layout";
import { white, grey100 } from "material-ui/styles/colors";
import Dropzone from "react-dropzone";
import withFirebase from "../hoc/withFirebase";
import firebase from "firebase";
import ImageCompressor from "image-compressor.js";
import { FileFileUpload } from "material-ui/svg-icons";
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
    if (this.props.projectList !== null) {
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
            floatingLabelStyle={{ color: "rgb(253, 145, 77)" }}
            underlineFocusStyle={{ borderColor: "rgb(253, 145, 77)" }}
            onChange={this.handleTextChange}
          />
          <div
            style={{
              border: "1px solid #d3d3d3",
              height: "80px",
              width: "256px",
              marginLeft: 35
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
                  style={{ width: 50, height: 50 }}
                  src={this.state.temporaryImageURL}
                />
              ) : null}
            </div>
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
                      <FloatingActionButton
                        backgroundColor={grey100}
                        style={{ margin: 10 }}
                      >
                        {<FileFileUpload style={{ fill: "#fd914d" }} />}
                      </FloatingActionButton>
                    </u>
                  </div>
                );
              }}
            </Dropzone>
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
