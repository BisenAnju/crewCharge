import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ComplaintList from "../components/ComplaintList";
import ComplaintView from "../containers/ComplaintView";
import NewComplaintContainer from "./ComplaintAdd";
import withFirebase from "../hoc/withFirebase";
import withUser from "../hoc/withUser";
import { dataDecrypt } from "./DataEncryption";
import moment from "moment";
class ComplaintListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleArchive = this.handleArchive.bind(this);
    this.ref = props.db.collection("complaints").orderBy("addedOn", "desc");
    this.unsubscribe = null;
    this.state = {
      isAdmin: false,
      isLoading: true,
      listData: [],
      pendingList: [],
      archivedList: [],
      resolvedList: [],
      snackOpen: false,
      message: ""
    };
  }
  async componentDidMount() {
    const ths = this;
    // check usertype of loggedin user
    if (
      this.props.userData.find(user => user.uid === this.props.loggedInUser.uid)
        .userType === "Admin"
    ) {
      await this.setState({ isAdmin: true });
    }

    if (this.state.isAdmin === false) {
      this.ref = this.ref.where("userId", "==", this.props.loggedInUser.uid);
    }
    this.unsubscribe = await this.ref.onSnapshot(this.onCollectionUpdate);
    setTimeout(async function() {
      await ths.setState({
        pendingList: ths.state.listData.filter(
          data =>
            (data.adminReply === undefined ||
              (data.adminReply !== undefined &&
                data.statusByAdmin === "pending")) &&
            data.isArchived === false
        ),
        archivedList: ths.state.listData.filter(
          data => data.isArchived === true
        ),
        resolvedList: ths.state.listData.filter(
          data =>
            data.statusByAdmin !== undefined &&
            data.statusByAdmin === "resolve" &&
            data.isArchived === false
        )
      });
      ths.setState({ isLoading: false });
    }, 2000);
  }

  onCollectionUpdate = querySnapshot => {
    const listData = [];
    querySnapshot.forEach(async doc => {
      if (doc.exists) {
        const data = doc.data();
        data.id = doc.id;
        data.Type = data.complaintType;
        data.userData = this.props.userData.find(val => val.id === data.userId);
        data.compType = this.props.complaintType.find(
          val => val.value === data.Type
        );
        ///////////// data decrypting start ///////////
        try {
          if (typeof data.receiverId === "object") {
            // check authorized user
            if (data.receiverId.find(val => val === this.props.user.uid)) {
              const cryptr = await dataDecrypt(data, this.props);
              const Decrypt = cryptr.crypt;
              data.description = await Decrypt.decrypt(data.description);
              data.title = await Decrypt.decrypt(data.title);
              data.addedOn = moment(
                new Date(data.addedOn.seconds * 1000)
              ).format("DD MMM YYYY");
            }
          }
        } catch (e) {
          console.log("decryption error: " + e);
        }
        ///////////// data decrypting end ///////////
        listData.push(data);
      }
    });
    this.setState({
      listData
    });
  };
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
                listData={this.state.listData}
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
