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
import Anonymous from "../images/anonymous.png";
import Archived from "material-ui/svg-icons/content/archive";
import ContentAdd from "material-ui/svg-icons/content/add";
import Layout from "../layouts/Layout";
import UnArchived from "material-ui/svg-icons/content/unarchive";
// import moment from "moment";
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
      pendingList: [],
      archivedList: [],
      resolvedList: [],
      slideIndex: 0,
      style: { background: "aliceblue", fontWeight: "bold" }
    };
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
              {console.log(this.state)}
              {this.props.loading ? (
                loader
              ) : this.props.pendingList.length > 0 ? (
                this.props.pendingList.map((doc, index) => {
                  try {
                    doc.username =
                      doc.isAnonymous === false
                        ? doc.userData.displayName
                        : doc.userId === this.props.loggedInUser.uid
                        ? doc.userData.displayName
                        : "Anonymous";
                    doc.userImageURL = doc.userData.photoURL;
                    return (
                      <div key={index}>
                        <ListItem
                          style={{
                            borderLeft:
                              doc.statusByAdmin === undefined
                                ? "4px solid #f08f4c"
                                : "4px solid rgb(248, 249, 248)",
                            fontWeight:
                              doc.statusByAdmin === undefined ? "bold" : "null"
                          }}
                          onClick={() =>
                            this.props.history.push(`/complaintview/${doc.id}`)
                          }
                          leftAvatar={
                            <Avatar
                              size={48}
                              src={
                                doc.isAnonymous === false
                                  ? doc.userImageURL
                                  : doc.userId === this.props.loggedInUser.uid
                                  ? doc.userImageURL
                                  : Anonymous
                              }
                            />
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
                                  {doc.compType.displayName}
                                </span>
                              ) : doc.priority === "medium" ? (
                                <span style={{ color: "#b3b312" }}>
                                  {doc.compType.displayName}
                                </span>
                              ) : (
                                doc.compType.displayName
                              )}
                            </p>
                          }
                        />
                        <Divider inset={true} />
                      </div>
                    );
                  } catch (e) {
                    console.log("Internet error" + e);
                  }
                })
              ) : (
                <ListItem
                  disabled={true}
                  primaryText={"There is no complaint"}
                />
              )}
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
              {this.props.loading ? (
                loader
              ) : this.props.resolvedList.length > 0 ? (
                this.props.resolvedList.map((doc, index) => {
                  try {
                    doc.username =
                      doc.isAnonymous === false
                        ? doc.userData.displayName
                        : doc.userId === this.props.loggedInUser.uid
                        ? doc.userData.displayName
                        : "Anonymous";
                    doc.userImageURL = doc.userData.photoURL;

                    return (
                      <div key={index}>
                        <ListItem
                          onClick={() =>
                            this.props.history.push("/complaintview/" + doc.id)
                          }
                          leftAvatar={
                            doc.isAnonymous === false ? (
                              <Avatar src={doc.userImageURL} />
                            ) : doc.userId === this.props.loggedInUser.uid ? (
                              <Avatar src={doc.userImageURL} />
                            ) : (
                              <Avatar icon={Anonymous} />
                            )
                          }
                          secondaryTextLines={2}
                          primaryText={doc.username}
                          secondaryText={
                            <p>
                              <span>{doc.title + " - " + doc.addedOn}</span>
                              <br />
                              {doc.compType.displayName}
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
                        <Divider inset={true} />
                      </div>
                    );
                  } catch (e) {
                    console.log();
                  }
                })
              ) : (
                <ListItem
                  disabled={true}
                  primaryText={"There is no resolved complaint"}
                />
              )}
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
              {this.props.archivedList.length > 0 ? (
                this.props.archivedList.map((doc, index) => {
                  let userdata = this.props.userData.find(
                    data => data.uid === doc.userId
                  );
                  doc.username = userdata.displayName;
                  doc.userImageURL = userdata.photoURL;
                  return (
                    <div key={index}>
                      <ListItem
                        onClick={() =>
                          this.props.history.push("/complaintview/" + doc.id)
                        }
                        leftAvatar={<Avatar src={doc.userImageURL} />}
                        secondaryTextLines={2}
                        primaryText={doc.username}
                        secondaryText={
                          <p>
                            <span>{doc.title + " - " + doc.addedOn}</span>
                            <br />
                            {doc.compType.displayName}
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
                      <Divider inset={true} />
                    </div>
                  );
                })
              ) : (
                <ListItem
                  disabled={true}
                  primaryText={"There is no archived complaint"}
                />
              )}
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
