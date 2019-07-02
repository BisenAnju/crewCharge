import React from "react";
import { withRouter } from "react-router-dom";
import Configuration from "../components/Configuration";
import withFirebase from "../hoc/withFirebase";

class ConfigurationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addPurpose = (field, collection, data, iconURL) => {
    this.props.db
      .collection(collection)
      .add({
        [field]: data
          .replace(" ", "")
          .replace("/", "")
          .replace("-", "")
          .toLowerCase(),
        displayName: data.charAt(0).toUpperCase() + data.slice(1),
        iconUrl: iconURL
      })
      .then(this.props.history.goBack())
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  render() {
    return <Configuration addPurpose={this.addPurpose} />;
  }
}
export default withFirebase(withRouter(ConfigurationContainer));
