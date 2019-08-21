import React from "react";
import { withRouter } from "react-router-dom";
import Configuration from "../components/Configuration";
import withFirebase from "../hoc/withFirebase";
class ConfigurationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      purposeData: []
    };
  }

  componentWillMount() {
    this.props.db
      .collection("leavePurpose")
      .get()
      .then(
        doc => {
          const purposeData = [];
          doc.forEach(docitem => {
            if (docitem.exists) {
              purposeData.push(docitem.data());
            }
          });
          this.setState({
            isLoading: false,
            purposeData
          });
        },
        err => {
          console.log(`Encountered error: ${err}`);
        }
      );
  }

  addHolidays = data => {
    console.log(data.holidays);
    const holidayRef = this.props.db.collection("holiday_master").doc("2019");

    holidayRef
      .get()
      .then(querySnapshot => {
        if (querySnapshot.exists) {
          data.holidays.map(item =>
            this.props.db
              .collection("holiday_master")
              .doc("2019")
              .collection("events")
              .add({
                id: data.category,
                title: data.reason,
                start: item,
                end: item
              })
          );
        }
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

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
    return (
      <Configuration
        addPurpose={this.addPurpose}
        addHolidays={this.addHolidays}
        purposeData={this.state.purposeData}
      />
    );
  }
}
export default withFirebase(withRouter(ConfigurationContainer));
