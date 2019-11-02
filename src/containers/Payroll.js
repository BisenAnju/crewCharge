import React from "react";
import withFirebase from "../hoc/withFirebase";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import Payroll from "../components/Payroll";
import PayrollList from "../components/PayrollList";
import PayrollDateCard from "../components/PayrollDateCard";
import ManagePayslip from "../components/ManagePayslip";
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
      .orderBy("displayName")
      .get()
      .then(
        item => {
          const userData = [];
          item.forEach(doc => {
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
        <Router>
          <Switch>
            <div>
              <Route
                exact
                path={"/managePayslip"}
                render={props => (
                  <ManagePayslip {...props} />
                )}
              />
              <Route
                exact
                path={"/payroll"}
                render={props => (
                  <PayrollList {...props} userData={this.state.userData} />
                )}
              />
              <Route
                exact
                path={"/payroll/:id"}
                render={props => <PayrollDateCard {...props} {...this.state} />}
              />
              <Route
                exact
                path={"/payroll/:month/:id"}
                render={props => (
                  <Payroll {...props} userData={this.state.userData} />
                )}
              />

            </div>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default withFirebase(withRouter(PayrollContainer));
