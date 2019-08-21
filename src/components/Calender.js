import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
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
const localizer = BigCalendar.momentLocalizer(moment);

class Calender extends React.Component {
  constructor() {
    super();
    this.state = {
      myEventsList: [
        {
          start: "2019-08-08",
          groupId: "hii",
          // allDay: false,
          end: "2019-08-10",
          title: "title1"
        },
        {
          groupId: "hii",
          start: "2019-08-15",
          end: "2019-08-15",
          title: "title2"
        }
      ]
    };
  }

  render() {
    console.log(this.props.eventData);
    return (
      // <Layout navigationTitle="Calender" showBackNavigation={true}>
      <div>
        <BigCalendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.props.eventData}
          style={{ height: "100vh" }}
          // eventPropGetter={event => ({
          //   style: {
          //     // backgroundColor: event.color
          //     backgroundColor: event.start.getDay() < 5 ? "#ad4ca4" : "#3174ad"
          //   }
          // })}
          dayPropGetter={event => ({
            style: {
              // backgroundColor: "#FF0000"
              backgroundColor: event.getDay() === 0 ? "#7d8789" : null
            }
          })}
        />
      </div>
      // </Layout>
    );
  }
}

export default Calender;
