import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import blur from "../images/blur1.png";
import icon from "../images/icon1.png";
import leave from "../images/leave.svg";
import complaint from "../images/complaint.svg";
import team from "../images/team.svg";
import allocation from "../images/allocation.svg";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout navigationTitle="Project S">
        <div style={{ height: "calc(100vh - 64px)" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img alt="icon" src={icon} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "calc(100vh - 224px)"
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "rgb(253, 145, 77) 0px 0px 10px -5px",
                  backgroundImage: ' url("' + blur + '")',

                  width: "50%",
                  margin: "0% 2%",
                  borderRadius: "10px",
                  overflow: "hidden"
                }}
                onClick={e => {
                  e.preventDefault();
                  this.props.history.push("/leavedashboard");
                }}
              >
                <div
                  style={{
                    padding: "7%",
                    backgroundColor: "transparent"
                  }}
                >
                  <center>
                    <img
                      src={leave}
                      alt="leave"
                      style={{ height: "20vh", width: "13vh" }}
                    />
                  </center>
                </div>
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "transparent",
                    color: "#ccc2bb"
                  }}
                >
                  <center>
                    <h3>Leave Dashboard</h3>
                  </center>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "rgb(253, 145, 77) 0px 0px 10px -5px",
                  backgroundImage: ' url("' + blur + '")',

                  width: "50%",
                  margin: "0% 2%",
                  borderRadius: "10px",
                  overflow: "hidden"
                }}
                onClick={e => {
                  e.preventDefault();
                  this.props.history.push("/teamallocation");
                }}
              >
                <div
                  style={{
                    padding: "7%",
                    backgroundColor: "transparent"
                  }}
                >
                  <center>
                    <img
                      src={allocation}
                      alt="allocation"
                      style={{ height: "20vh", width: "13vh" }}
                    />
                  </center>
                </div>
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "transparent",
                    color: "#ccc2bb"
                  }}
                >
                  <center>
                    <h3>Team Allocation</h3>
                  </center>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", marginTop: "3%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "rgb(253, 145, 77) 0px 0px 10px -5px",
                  backgroundImage: ' url("' + blur + '")',
                  width: "50%",
                  margin: "0% 2%",
                  borderRadius: "10px",
                  overflow: "hidden"
                }}
                onClick={e => {
                  e.preventDefault();
                  this.props.history.push("/complaintlist");
                }}
              >
                <div
                  style={{
                    padding: "7%",
                    backgroundColor: "transparent"
                  }}
                >
                  <center>
                    <img
                      src={complaint}
                      alt="complaint"
                      style={{ height: "20vh", width: "13vh" }}
                    />
                  </center>
                </div>
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "transparent",
                    color: "#ccc2bb"
                  }}
                >
                  <center>
                    <h3>Complaint & Feedback</h3>
                  </center>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "rgb(253, 145, 77) 0px 0px 10px -5px",
                  backgroundImage: ' url("' + blur + '")',
                  width: "50%",
                  margin: "0% 2%",
                  borderRadius: "10px",
                  overflow: "hidden"
                }}
                onClick={e => {
                  e.preventDefault();
                  this.props.history.push("/projects");
                }}
              >
                <div
                  style={{
                    padding: "7%",
                    backgroundColor: "transparent"
                  }}
                >
                  <center>
                    <img
                      src={team}
                      alt="team"
                      style={{ height: "20vh", width: "13vh" }}
                    />
                  </center>
                </div>
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "transparent",
                    color: "#ccc2bb"
                  }}
                >
                  <center>
                    <h3>Client Communication</h3>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default withRouter(Dashboard);
