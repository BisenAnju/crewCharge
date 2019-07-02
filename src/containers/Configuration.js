import React from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch
} from "react-router-dom";
import Configuration from "../components/Configuration";
import withFirebase from "../hoc/withFirebase";

class ConfigurationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addPurpose = (field, collection, purpose) => {
    this.props.db
      .collection(collection)
      .add({
        [field]: purpose
          .replace(" ", "")
          .replace("/", "")
          .replace("-", "")
          .toLowerCase(),
        displayName: purpose.charAt(0).toUpperCase() + purpose.slice(1)
      })
      .then
      // this.props.history.goBack()
      ()
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path={"/configuration"}
              render={props => (
                <Configuration {...props} addPurpose={this.addPurpose} />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default withFirebase(withRouter(ConfigurationContainer));
