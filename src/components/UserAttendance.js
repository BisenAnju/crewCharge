import React, { Component } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line
} from "recharts";
import { Avatar, Divider } from "material-ui";
import Layout from "../layouts/Layout";
import { withRouter } from "react-router-dom";

const data = [
  {
    name: "1",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "2",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "3",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "4",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "5",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "6",
    uv: 2390,
    pv: 3800,
    amt: 2500
  }
];

class UserAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: "",
      displayName: ""
    };
  }
  componentWillMount() {
    const photoUrl = this.props.userData.find(
      user => user.uid === this.props.match.params.id
    ).photoURL;
    const displayName = this.props.userData.find(
      user => user.uid === this.props.match.params.id
    ).displayName;
    this.setState({
      photoUrl,
      displayName
    });
  }
  render() {
    return (
      <Layout navigationTitle="Attendance" showBackNavigation={true}>
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

        <div>
          <LineChart
            width={300}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </div>
      </Layout>
    );
  }
}

export default withRouter(UserAttendance);
