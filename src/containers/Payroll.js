import React from "react";
import { withRouter } from "react-router-dom";
import Payroll from "../components/Payroll";
import withFirebase from "../hoc/withFirebase";

class PayrollContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      isLoading: true
    };
  }
  componentWillMount() {
    this.props.db
      .collection("users")
      // .orderBy("displayName")
      .onSnapshot(
        snapshot => {
          const userData = [];
          snapshot.forEach(doc => {
            if (doc.exists) {
              userData.push(doc.data());
            }
          });
          this.setState({
            isLoading: false,
            userData
          });
        },
        err => {
          console.log(`Encountered error: ${err}`);
        }
      );
  }
  render() {
    return (
      <div>
        <Payroll userData={this.state.userData} />
      </div>
    );
  }
}
export default withFirebase(withRouter(PayrollContainer));
