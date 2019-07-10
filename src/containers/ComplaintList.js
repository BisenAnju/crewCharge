import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ComplaintList from "../components/ComplaintList";
import ComplaintView from "../containers/ComplaintView";
import NewComplaintContainer from "./ComplaintAdd";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";
import { dataDecrypt } from "./DataEncryption";

class ComplaintListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      isLoading: true,
      listItem: [],
      pendingList: [],
      archivedList: [],
      resolvedList: [],
      snackOpen: false,
      message: ""
    };
    this.handleArchive = this.handleArchive.bind(this);
  }
  async componentWillMount() {
    let listItem = [],
      ths = this;
    let query = this.props.db.collection("complaints");

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
          details.userData = this.props.userData.find(
            data => data.id === details.userId
          );
          details.compType = this.props.complaintType.find(
            data => data.value === details.Type
          );
          ///////////// data decrypting start ///////////
          if (typeof details.receiverId === "object") {
            // check authorized user
            if (details.receiverId.find(data => data === this.props.user.uid)) {
              const cryptr = await dataDecrypt(details, this.props);
              const Decrypt = cryptr.crypt;
              details.description = await Decrypt.decrypt(details.description);
              details.title = await Decrypt.decrypt(details.title);
              details.addedOn = await Decrypt.decrypt(details.addedOn);
            }
          }
          ///////////// data decrypting end ///////////
          listItem.push(details);
        }
      });
      setTimeout(() => {
        ths.setState(
          {
            pendingList: listItem.filter(
              data =>
                (data.adminReply === undefined ||
                  (data.adminReply !== undefined &&
                    data.statusByAdmin === "pending")) &&
                data.isArchived === false
            ),
            archivedList: listItem.filter(data => data.isArchived === true),
            resolvedList: listItem.filter(
              data =>
                data.statusByAdmin !== undefined &&
                data.statusByAdmin === "resolve" &&
                data.isArchived === false
            )
          },
          () => ths.setState({ isLoading: false })
        );
      }, 2000);
    });
  }
  snackbarHandleRequestClose = () => this.setState({ snackOpen: false });
  handleArchive(isArchived, userId) {
    this.props.db
      .collection("complaints")
      .doc(userId)
      .update({
        isArchived
      });
    this.setState({
      message:
        isArchived === true
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
                // listData={this.state.listItem}
                pendingList={this.state.pendingList}
                archivedList={this.state.archivedList}
                resolvedList={this.state.resolvedList}
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
