import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Paper from "material-ui/Paper";
import { grey500, green200, blueGrey300 } from "material-ui/styles/colors";
import { lightBlue300 } from "material-ui/styles/colors";

const flexContainer = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignContent: "baseline"
};

const flexItem = {
  alignItems: "center",
  padding: "7px",
  justifyContent: "space-around"
};
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout navigationTitle="Dashboard">
        <div style={flexContainer}>
          <div
            style={flexItem}
            onClick={e => {
              e.preventDefault();
              this.props.history.push("/leavedashboard");
            }}
          >
            <br />
            <Paper
              zDepth={2}
              style={{
                padding: "30px",
                borderRadius: "10px",
                backgroundColor: grey500,
                color: "white"
              }}
            >
              <h4> Leave Dashboard</h4>
            </Paper>
          </div>
          <div
            style={flexItem}
            onClick={e => {
              e.preventDefault();
              this.props.history.push("/complaintlist");
            }}
          >
            <Paper
              zDepth={2}
              style={{
                padding: "30px",
                borderRadius: "10px",
                backgroundColor: blueGrey300,
                color: "white"
              }}
            >
              <h4>Complaint & Feedback</h4>
            </Paper>
          </div>
          <div
            style={flexItem}
            onClick={e => {
              e.preventDefault();
              this.props.history.push("/projects");
            }}
          >
            <Paper
              zDepth={2}
              style={{
                padding: "30px",
                borderRadius: "10px",
                backgroundColor: lightBlue300,
                color: "white"
              }}
            >
              <h4> Client Communication</h4>
            </Paper>
          </div>
          <div
            style={flexItem}
            onClick={e => {
              e.preventDefault();
              this.props.history.push("/teamallocation");
            }}
          >
            <Paper
              zDepth={2}
              style={{
                padding: "30px",
                borderRadius: "10px",
                backgroundColor: green200
              }}
            >
              <h4>Team Allocation</h4>
            </Paper>
          </div>
        </div>
      </Layout>
    );
  }
}
export default withRouter(Dashboard);
