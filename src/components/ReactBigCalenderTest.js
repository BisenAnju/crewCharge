import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { RaisedButton } from "material-ui";
import { blueGrey500 } from "material-ui/styles/colors";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Layout from "../layouts/Layout";
import "react-big-calendar/lib/css/react-big-calendar.css";
moment.locale("en-GB");
BigCalendar.momentLocalizer(moment);
moment.locale("ko", {
  week: {
    dow: 1,
    doy: 1
  }
});

const raisedButtonStyle = {
  margin: 12,
  width: 140
};

const localizer = BigCalendar.momentLocalizer(moment);
const myEventsList = [
  {
    title: "Meeting",
    start: new Date(2019, 4, 14, 10, 30, 0, 0),
    end: new Date(2019, 4, 14, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
    color: "#FF7F50"
  },
  {
    title: "Conference",
    start: new Date(2019, 4, 19, 12, 0, 0, 0),
    end: new Date(2019, 4, 21, 13, 0, 0, 0),
    desc: "Power lunch",
    color: "#FF0000"
  }
];

class ReactBigCalenderTest extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [
        {
          fullname: null,
          email: null,
          createdAt: null,
          desc: null,
          loading: true,
          controlledDate: null,
          dataItems: [
            {
              start: new Date(),
              end: new Date(),
              title: ""
            }
          ]
          // start: new Date(),
          // end: new Date(moment().add(1, "days")),
          // title: "Some title"
          // title: "My event",
          // allDay: false,
          // start: new Date(2019, 4, 7, 10, 0), // 10.00 AM
          // end: new Date(2019, 4, 7, 14, 0) // 2.00 PM
        }
      ]
    };
  }

  // function colorWeekends(date)

  componentWillMount() {
    //   const db = firebase.firestore();
    //   let items = [];
    //   var citiesRef = db.collection("leave_Attendance");
    //   var allCities = citiesRef
    //     .get()
    //     .then(snapshot => {
    //       snapshot.forEach(doc => {
    //         items.push(doc.data());
    //         console.log(doc.id, "=>", doc.data());
    //       });
    //       this.setState({
    //         dataItems: items,
    //         loading: false
    //       });
    //       console.log(this.state.dataItems);
    //     })
    //     .catch(err => {
    //       console.log("Error getting documents", err);
    //     });
    //   console.log(this.state.loading);
  }

  render() {
    return (
      <Layout navigationTitle="Calender" showBackNavigation={true}>
        <div>
          <br />
          <div className="App">
            <BigCalendar
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="month"
              events={myEventsList}
              style={{ height: "100vh" }}
              eventPropGetter={event => ({
                style: {
                  backgroundColor: event.color
                  // backgroundColor: event.start.getDay() < 5 ? "#ad4ca4" : "#3174ad"
                }
              })}
              dayPropGetter={event => ({
                style: {
                  // backgroundColor: "#FF0000"
                  backgroundColor: event.getDay() === 0 ? "#7d8789" : null
                }
              })}
            />
            <br />
            <RaisedButton
              label="Back"
              style={raisedButtonStyle}
              onClick={e => {
                e.preventDefault();
                this.props.history.goBack();
              }}
              backgroundColor={blueGrey500}
              labelColor="white"
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default ReactBigCalenderTest;
