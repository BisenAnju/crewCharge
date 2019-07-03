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
      archivedListItem: [],
      userData: [],
      snackOpen: false,
      message: "",
      complaintTypeData: []
    };
    this.handleArchive = this.handleArchive.bind(this);
  }
  componentWillMount() {
    let userData = [],
      query = this.props.db.collection("users");
    query.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(doc => {
        if (doc.doc.exists) {
          const users = doc.doc.data();
          users.id = doc.doc.id;
          userData.push(users);
        }
      });
      this.setState({ userData });
    });
    query
      .doc(this.props.user.uid)
      .get()
      .then(doc => {
        if (
          doc.data().userType !== undefined &&
          doc.data().userType === "Admin"
        ) {
          this.setState({ isAdmin: true });
        }
        let listItem = [],
          query2 = this.props.db
            .collection("complaints")
            .orderBy("addedOn", "desc");
        if (this.state.isAdmin === false) {
          query2 = query2.where("userId", "==", this.props.user.uid);
        }
        query2.onSnapshot(async snapshot => {
          listItem = [];
          snapshot.forEach(async doc => {
            if (doc.exists) {
              const details = doc.data();
              details.id = doc.id;
              details.Type = doc.data().complaintType;
              ///////////// list ///////////
              let a = localStorage.getItem("privatekey");
              if (typeof details.receiverId === "object") {
                if (
                  details.receiverId.find(data => data === this.props.user.uid)
                ) {
                  var func = this.props.firebase.function.httpsCallable(
                    "encPrac"
                  );
                  var encryptedKeyforReciever = await func({
                    encryptedKeyForServer: details.encryptedKeyForServer,
                    docId: doc.id,
                    requesterId: this.props.user.uid
                  }).then(res => {
                    return res.data;
                  });
                  var decryptedKeyFromServer = await QuickEncrypt.decrypt(
                    encryptedKeyforReciever.toString(),
                    a.toString()
                  );
                  const cryptr = new Cryptr(decryptedKeyFromServer);
                  details.description = await cryptr.decrypt(
                    details.description
                  );
                  details.title = await cryptr.decrypt(details.title);
                  details.addedOn = await cryptr.decrypt(details.addedOn);
                }
              }
              ///////////// list ///////////
              listItem.push(details);
            }
          });
          await this.setState({ listItem });
          this.setState({ isLoading: false });
        });
      });
    this.props.db
      .collection("complaintType")
      .get()
      .then(
        doc => {
          const complaintTypeData = [];
          doc.forEach(docitem => {
            if (docitem.exists) {
              complaintTypeData.push(docitem.data());
            }
          });
          this.setState({
            complaintTypeData
          });
        },
        err => {
          console.log(`Encountered error: ${err}`);
        }
      );
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
                isAdmin={this.state.isAdmin}
                userData={this.state.userData}
                complaintType={this.state.complaintTypeData}
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
                userData={this.state.userData}
                complaintType={this.state.complaintTypeData}
              />
            )}
          />
          <Route
            path={"/complaintview/:id"}
            render={props => (
              <ComplaintView
                {...props}
                loggedInUser={this.props.user}
                userData={this.state.userData}
                complaintType={this.state.complaintTypeData}
              />
            )}
          />
        </Router>
      </div>
    );
  }
}
export default withUser(withFirebase(ComplaintListContainer));
