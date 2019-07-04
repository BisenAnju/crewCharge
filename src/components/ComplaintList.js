import React from "react";
import { withRouter } from "react-router-dom";
import {
  Avatar,
  Tabs,
  Tab,
  FloatingActionButton,
  RefreshIndicator,
  IconButton,
  Snackbar,
  List,
  ListItem,
  Divider
} from "material-ui";
import Archived from "material-ui/svg-icons/content/archive";
import ContentAdd from "material-ui/svg-icons/content/add";
import Layout from "../layouts/Layout";
import UnArchived from "material-ui/svg-icons/content/unarchive";
import moment from "moment";
import SwipeableViews from "react-swipeable-views";

const loader = (
  <center>
    <RefreshIndicator
      size={40}
      left={10}
      top={0}
      status="loading"
      loadingColor="rgb(240, 143, 76)"
      style={{
        display: "inline-block",
        position: "relative"
      }}
    />
  </center>
);

class ComplaintList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      style: { background: "aliceblue", fontWeight: "bold" }
    };
    // console.log(localStorage.getItem("publickey"));
    // console.log(localStorage.getItem("privatekey"));
  }
  handleChange = slideIndex => this.setState({ slideIndex });
  render() {
    return (
      <Layout showBackNavigation={true} navigationTitle="Complaint list">
        <Tabs
          tabItemContainerStyle={{ backgroundColor: "transparent" }}
          onChange={this.handleChange}
          inkBarStyle={{ backgroundColor: "#f08f4c" }}
          value={this.state.slideIndex}
        >
          <Tab
            style={{
              color: "#f08f4c"
            }}
            label="Pending"
            value={0}
          />
          <Tab
            style={{
              color: "#f08f4c"
            }}
            label="Resolved"
            value={1}
          />
          <Tab
            style={{
              color: "#f08f4c"
            }}
            label="Archived"
            value={2}
          />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <List
              style={{
                paddingBottom: "16%",
                height: "90vh",
                width: "100%",
                overflowY: "scroll",
                overflowX: "hidden"
              }}
            >
              {this.props.loading
                ? loader
                : this.props.listData
                    .filter(
                      data =>
                        (data.adminReply === undefined ||
                          (data.adminReply !== undefined &&
                            data.statusByAdmin === "pending")) &&
                        data.isArchived === false
                    )
                    .map((doc, index) => {
                      let userdata = this.props.userData.find(
                        data => data.id === doc.userId
                      );
                      let compType = this.props.complaintType.find(
                        data => data.value === doc.Type
                      );
                      try {
                        doc.complaintType = compType.displayName;
                        doc.username = userdata.displayName;
                        doc.userImageURL = userdata.photoURL;
                        return (
                          <div key={index}>
                            <ListItem
                              style={{
                                borderLeft:
                                  doc.statusByAdmin === undefined
                                    ? "4px solid #f08f4c"
                                    : "4px solid rgb(248, 249, 248)",
                                fontWeight:
                                  doc.statusByAdmin === undefined
                                    ? "bold"
                                    : "null"
                              }}
                              onClick={() =>
                                this.props.history.push(
                                  `/complaintview/${doc.id}`
                                )
                              }
                              leftAvatar={
                                <Avatar size={48} src={doc.userImageURL} />
                              }
                              hoverColor={"rgba(253, 145, 77, 0.43)"}
                              secondaryTextLines={2}
                              primaryText={doc.username}
                              secondaryText={
                                <p>
                                  <span>
                                    {doc.title + " - " + doc.addedOn}
                                    {/* {doc.title +
                                      " - " +
                                      moment(
                                        new Date(doc.addedOn.seconds * 1000)
                                      ).format("DD MMM YYYY")} */}
                                  </span>
                                  <br />
                                  {doc.priority === "high" ? (
                                    <span style={{ color: "red" }}>
                                      {doc.complaintType}
                                    </span>
                                  ) : doc.priority === "medium" ? (
                                    <span style={{ color: "#b3b312" }}>
                                      {doc.complaintType}
                                    </span>
                                  ) : (
                                    doc.complaintType
                                  )}
                                </p>
                              }
                            />
                            <Divider inset={true} />
                          </div>
                        );
                      } catch (e) {
                        console.log();
                      }
                    })}
            </List>
          </div>
          <div>
            <List
              style={{
                height: "90vh",
                width: "100%",
                overflowY: "scroll",
                overflowX: "hidden"
              }}
            >
              {this.props.loading
                ? loader
                : this.props.listData
                    .filter(
                      data =>
                        data.statusByAdmin !== undefined &&
                        data.statusByAdmin === "resolve" &&
                        data.isArchived === false
                    )
                    .map((doc, index) => {
                      let userdata = this.props.userData.find(
                        data => data.uid === doc.userId
                      );
                      try {
                        doc.username = userdata.displayName;
                        doc.userImageURL = userdata.photoURL;

                        return (
                          <ListItem
                            key={index}
                            onClick={() =>
                              this.props.history.push(
                                "/complaintview/" + doc.id
                              )
                            }
                            leftAvatar={<Avatar src={doc.userImageURL} />}
                            secondaryTextLines={2}
                            primaryText={doc.username}
                            secondaryText={
                              <p>
                                <span>
                                  {doc.title +
                                    " - " +
                                    moment(
                                      new Date(doc.addedOn.seconds * 1000)
                                    ).format("DD MMM YYYY")}
                                </span>
                                <br />
                                {doc.complaintType}
                              </p>
                            }
                            rightIconButton={
                              <IconButton
                                onClick={e => {
                                  e.preventDefault();
                                  this.props.archive(true, doc.id);
                                  this.setState({
                                    lastArchivedDocId: doc.id
                                  });
                                }}
                              >
                                <Archived />
                              </IconButton>
                            }
                          />
                        );
                      } catch (e) {
                        console.log();
                      }
                    })}
            </List>
          </div>
          <div>
            <List
              style={{
                height: "90vh",
                width: "100%",
                overflowY: "scroll",
                overflowX: "hidden"
              }}
            >
              {/* <div style={{ display: "flex", flexdirection: "column" }}>
                <DatePicker
                  hintText="From date"
                  style={{
                    marginRight: "10%",
                    marginLeft: "10%",
                    width: "30%"
                  }}
                />
                <DatePicker
                  hintText="To date"
                  style={{
                    marginRight: "10%",
                    marginLeft: "10%",
                    width: "30%"
                  }}
                />
              </div> */}
              {this.props.listData
                .filter(data => data.isArchived === true)
                .map((doc, index) => {
                  let userdata = this.props.userData.find(
                    data => data.uid === doc.userId
                  );
                  doc.username = userdata.displayName;
                  doc.userImageURL = userdata.photoURL;
                  return (
                    <ListItem
                      key={index}
                      onClick={() =>
                        this.props.history.push("/complaintview/" + doc.id)
                      }
                      leftAvatar={<Avatar src={doc.userImageURL} />}
                      secondaryTextLines={2}
                      primaryText={doc.username}
                      secondaryText={
                        <p>
                          <span>
                            {doc.title +
                              " - " +
                              moment(
                                new Date(doc.addedOn.seconds * 1000)
                              ).format("DD MMM YYYY")}
                          </span>
                          <br />
                          {doc.complaintType}
                        </p>
                      }
                      rightIconButton={
                        <IconButton
                          onClick={e => {
                            e.preventDefault();
                            this.props.archive(false, doc.id);
                          }}
                        >
                          <UnArchived />
                        </IconButton>
                      }
                    />
                  );
                })}
            </List>
          </div>
        </SwipeableViews>
        <Snackbar
          open={this.props.snackOpen}
          onRequestClose={this.props.snackbarHandleRequestClose}
          message={this.props.message}
          autoHideDuration={2000}
        />
        <FloatingActionButton
          onClick={() => this.props.history.push("/complaint")}
          backgroundColor="rgb(253, 145, 77)"
          style={{
            position: "absolute",
            zIndex: "1",
            right: "10%",
            bottom: "13%"
          }}
        >
          <ContentAdd />
        </FloatingActionButton>
      </Layout>
    );
  }
}
export default withRouter(ComplaintList);
