import React from "react";
import { withRouter } from "react-router-dom";
import Configuration from "../components/Configuration";
import withFirebase from "../hoc/withFirebase";

class ConfigurationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addPurpose = (field, collection, data) => {
    console.log(data);
    // this.props.db
    //   .collection(collection)
    //   .add({
    //     [field]: data.purpose
    //       .replace(" ", "")
    //       .replace("/", "")
    //       .replace("-", "")
    //       .toLowerCase(),
    //     displayName:
    //       data.purpose.charAt(0).toUpperCase() + data.purpose.slice(1)
    //     //  icon:
    //   })
    //   .then //     this.props.history.goBack()
    //   .catch(err => {
    //     console.log("Error getting documents", err);
    //   });
  };

  render() {
    return <Configuration addPurpose={this.addPurpose} />;
  }
}
export default withFirebase(withRouter(ConfigurationContainer));
