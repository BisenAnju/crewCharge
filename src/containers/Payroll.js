import React from "react";
import Payroll from "../components/Payroll";
import withFirebase from "../hoc/withFirebase";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import PayrollList from "../components/PayrollList"
import PayrollDateCard from "../components/PayrollDateCard";
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
          }, () => { console.log(this.state.userData) });
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
                path={"/payroll"}
                render={props => (
                  <PayrollList {...props} userData={this.state.userData} />
                )}
              />
              <Route
                exact
                path={"/payroll/:id"}
                render={props => (
                  <PayrollDateCard  {...props} userData={this.state.userData} />
                )}
              />
              <Route
                exact
                path={"/payroll/date/:id"}
                render={props => (
                  <Payroll
                    {...props}
                    userData={this.state.userData}
                  />

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
