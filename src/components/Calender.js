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
          // rendering: "background",
          // color: "#ff9f89",
          backgroundColor: "red",
          // overlap: false,
          end: "2019-08-08",
          title: "title1"
        }
      ]
    };
  }

  render() {
    return (
      <Layout navigationTitle="Calender" showBackNavigation={true}>
        <div>
          <BigCalendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.props.eventData}
            style={{
              height: "90vh",
              overflow: "scroll",
              display: "self"
            }}
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
      </Layout>
    );
  }
}

export default Calender;
