import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Avatar, Divider } from "material-ui";
import Layout from "../layouts/Layout";
import moment from "moment";
moment.locale("en-GB");
BigCalendar.momentLocalizer(moment);
moment.locale("ko", {
  week: {
    dow: 1,
    doy: 1
  }
});
const localizer = BigCalendar.momentLocalizer(moment);

class SingleUserLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: "",
      displayName: "",
      userLeaves: []
    };
  }
  componentWillMount() {
    const photoUrl = this.props.userData.find(
      user => user.uid === this.props.match.params.id
    ).photoURL;
    const displayName = this.props.userData.find(
      user => user.uid === this.props.match.params.id
    ).displayName;
    const userLeaves = this.props.leaveData.filter(
      leave => leave.userId === this.props.match.params.id
    );
    this.setState({
      photoUrl,
      displayName,
      userLeaves
    });
  }
  render() {
    return (
      <Layout navigationTitle="Calender View" showBackNavigation={true}>
        <center>
          <Avatar
            src={this.state.photoUrl}
            style={{ marginTop: 10 }}
            size={50}
          />
        </center>
        <br />
        <center>
          <span style={{ fontWeight: "bold" }}>{this.state.displayName}</span>
        </center>
        <br />
        <Divider />

        <div
          style={{
            height: "75vh",
            overflow: "auto",
            display: "self",
            marginBottom: "5%"
          }}
        >
          <BigCalendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.userLeaves}
            style={{ height: "100vh" }}
            // dayPropGetter={event => ({
            //   style: {
            //     // backgroundColor: "#7d8789"
            //     backgroundColor: event.getDay() === 0 ? "#7d8789" : null
            //   }
            // })}
          />
        </div>
      </Layout>
    );
  }
}

export default SingleUserLeave;
