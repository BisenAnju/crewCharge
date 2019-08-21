import React from "react";
import { withRouter } from "react-router-dom";
import Calender from "../components/Calender";
import withFirebase from "../hoc/withFirebase";
class CalenderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: [],
      isLoading: true
    };
  }
  componentWillMount() {
    this.props.db
      .collection("holiday_master")
      .where("current", "==", true)
      .get()
      .then(snapshot => {
        snapshot.forEach(e => {
          if (e.exists) {
            this.props.db
              .collection("holiday_master")
              .doc(e.id)
              .collection("events")
              .get()
              .then(data => {
                const eventData = [];
                data.forEach(docitem => {
                  if (docitem.exists) {
                    const holidayArr = docitem.data();
                    holidayArr.start = new Date(
                      holidayArr.start.seconds * 1000
                    );
                    holidayArr.end = new Date(holidayArr.end.seconds * 1000);
                    eventData.push(holidayArr);
                  }
                });
                this.setState({
                  isLoading: false,
                  eventData
                });
              });
          }
        });
      });
  }

  render() {
    return <Calender eventData={this.state.eventData} />;
  }
}
export default withFirebase(withRouter(CalenderContainer));
