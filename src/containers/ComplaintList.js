import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ComplaintList from "../components/ComplaintList";
import ComplaintView from "../containers/ComplaintView";
import NewComplaintContainer from "./ComplaintAdd";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";

const QuickEncrypt = require("quick-encrypt");
const Cryptr = require("cryptr");

class ComplaintListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      isLoading: true,
      listItem: [],
      snackOpen: false,
      message: ""
    };
    this.handleArchive = this.handleArchive.bind(this);
  }
  async componentWillMount() {
    let listItem = [],
      ths = this;
    let query = this.props.db
      .collection("complaints")
      .orderBy("addedOn", "desc");

    // check usertype of loggedin user
    if (
      this.props.userData.find(user => user.uid === this.props.loggedInUser.uid)
        .userType === "Admin"
    ) {
      await this.setState({ isAdmin: true });
    }

    if (this.state.isAdmin === false) {
      query = query.where("userId", "==", this.props.loggedInUser.uid);
    }

    // get complaints
    query.onSnapshot(async snapshot => {
      listItem = [];
      snapshot.forEach(async doc => {
        if (doc.exists) {
          const details = doc.data();
          details.id = doc.id;
          details.Type = details.complaintType;
          ///////////// data decrypting start ///////////
          let privatekey = localStorage.getItem("privatekey");
          if (typeof details.receiverId === "object") {
            // check authorized user
            if (details.receiverId.find(data => data === this.props.user.uid)) {
              let func = this.props.firebase.function.httpsCallable("encPrac");
              let encryptedKeyforReciever = await func({
                encryptedKeyForServer: details.encryptedKeyForServer,
                docId: null,
                requesterId: this.props.loggedInUser.uid
              }).then(res => {
                return res.data;
              });
              let decryptedKeyFromServer = await QuickEncrypt.decrypt(
                encryptedKeyforReciever.toString(),
                privatekey.toString()
              );
              const cryptr = new Cryptr(decryptedKeyFromServer);
              details.description = await cryptr.decrypt(details.description);
              details.title = await cryptr.decrypt(details.title);
              details.addedOn = await cryptr.decrypt(details.addedOn);
            }
          }
          ///////////// data decrypting end ///////////
          listItem.push(details);
        }
      });
      this.setState({ listItem });
      setTimeout(function() {
        ths.setState({ isLoading: false });
      }, 2000);
    });
  }
  snackbarHandleRequestClose = () => this.setState({ snackOpen: false });
  handleArchive(status, userId) {
    this.props.db
      .collection("complaints")
      .doc(userId)
      .update({
        isArchived: status
      });
    this.setState({
      message:
        status === true
          ? "Complaint Successfully archived"
          : "Complaint Successfully Unarchived",
      snackOpen: true
    });
  }
  render() {
    return (
      <div>
        <Router>
          <Route
            exact
            path="/complaintlist"
            render={props => (
              <ComplaintList
                {...props}
                onActionClick={this.handleArchive}
                snackOpen={this.state.snackOpen}
                snackbarHandleRequestClose={this.snackbarHandleRequestClose}
                message={this.state.message}
                archive={this.handleArchive}
                loading={this.state.isLoading}
                listData={this.state.listItem}
                pendingList={this.state.listItem.filter(
                  data =>
                    (data.adminReply === undefined ||
                      (data.adminReply !== undefined &&
                        data.statusByAdmin === "pending")) &&
                    data.isArchived === false
                )}
                archivedList={this.state.listItem.filter(
                  data => data.isArchived === true
                )}
                resolvedList={this.state.listItem.filter(
                  data =>
                    data.statusByAdmin !== undefined &&
                    data.statusByAdmin === "resolve" &&
                    data.isArchived === false
                )}
                isAdmin={this.state.isAdmin}
                userData={this.props.userData}
                loggedInUser={this.props.loggedInUser}
                complaintType={this.props.complaintType}
              />
            )}
          />
          <Route
            exact
            path="/complaint"
            render={props => (
              <NewComplaintContainer
                {...props}
                isAdmin={this.state.isAdmin}
                userData={this.props.userData}
                complaintType={this.props.complaintType}
              />
            )}
          />
          <Route
            path={"/complaintview/:id"}
            render={props => (
              <ComplaintView
                {...props}
                loggedInUser={this.props.user}
                userData={this.props.userData}
                complaintType={this.props.complaintType}
              />
            )}
          />
        </Router>
      </div>
    );
  }
}
export default withUser(withFirebase(ComplaintListContainer));
