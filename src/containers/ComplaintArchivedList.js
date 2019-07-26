import React from "react";
import { BrowserRouter as Router,Route,withRouter} from "react-router-dom";
import withFirebase from "../hoc/withFirebase";
import ComplaintList from "./ComplaintList";
import NewComplaintContainer from "./ComplaintAdd";
import ComplaintView from "./ComplaintView";
import ArchivedComplaintList from "../components/ComplaintArchivedList";
import logo from "../images/emp.png";

class ComplaintListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      listItem: [],
      snackOpen: false,
      autoHideDuration: 4000,
      message: "Complaint Successfully unarchived"
    };
    this.handleUnarchive = this.handleUnarchive.bind(this);
  }

  componentWillMount(){
    let listItem = [];
    this.props.db
      .collection("complaints").orderBy("complaintDate","desc")
      .where('isArchived','==',true)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(doc => {
          if (doc.doc.exists) {
            const details = doc.doc.data();
            details.id = doc.doc.id;
            if(doc.type==="removed"){
              listItem.splice(doc.oldIndex,1);
            }
            if(doc.type==="added"){
              listItem.push(details);
            }
          }
        });
        this.setState({ listItem });
        this.setState({isLoading:false});
      });
  }

  handleUnarchive(userId){
    this.props.db
    .collection("complaints")
    .doc(userId)
    .update({isArchived: false})
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    this.setState({snackOpen:true});
  }

  render() {
    return (
    <div>
      <Router>
        <Route exact path='/complaintlist' render={(props)=> <ComplaintList {...props} />}/>
        <Route exact path='/archivedcomplaintlist' render={(props)=>
          <ArchivedComplaintList
            {...props}
            snackbarHandleRequestClose={this.snackbarHandleRequestClose}
            snackOpen={this.state.snackOpen}
            autoHideDuration={this.state.autoHideDuration}
            message={this.state.message}
            unarchive={this.handleUnarchive}
            logo={logo}
            loading={this.state.isLoading}
            listData={this.state.listItem}
          />
        }/>
        <Route exact path="/complaint" render={(props)=> <NewComplaintContainer {...props}/>} />
        <Route exact path="/complaintview/:id" render={(props)=> <ComplaintView {...props} data={this.state.detail} />}/>
      </Router>
      </div>
    );
  }
}
export default withRouter(withFirebase(ComplaintListContainer));