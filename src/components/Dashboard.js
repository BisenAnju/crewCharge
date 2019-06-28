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
              height: "calc(100vh - 245px)"
            }}
          >
            <div style={{ display: "flex", flex: "1" }}>
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
                    display: "flex",
                    justifyContent: "center",
                    padding: "7%",
                    backgroundColor: "transparent",
                    flex: "1"
                  }}
                >
                  <img
                    style={{ height: "15vh", width: "15vh" }}
                    src={leave}
                    alt="leave"
                  />
                </div>
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "17px",
                    display: "flex",
                    backgroundColor: "transparent",
                    color: "#ccc2bb",
                    flex: "1"
                  }}
                >
                  Leave Dashboard
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
                    display: "flex",
                    justifyContent: "center",
                    padding: "7%",
                    backgroundColor: "transparent",
                    flex: "1"
                  }}
                >
                  <img
                    src={allocation}
                    alt="allocation"
                    style={{ height: "15vh", width: "15vh" }}
                  />
                </div>
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "17px",
                    display: "flex",
                    flex: "1",
                    backgroundColor: "transparent",
                    color: "#ccc2bb"
                  }}
                >
                  Team Allocation
                </div>
              </div>
            </div>

            <div style={{ display: "flex", marginTop: "3%", flex: "1" }}>
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
                    display: "flex",
                    justifyContent: "center",
                    padding: "7%",
                    backgroundColor: "transparent",
                    flex: "1"
                  }}
                >
                  <img
                    src={complaint}
                    alt="complaint"
                    style={{ height: "15vh", width: "15vh" }}
                  />
                </div>
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "17px",
                    display: "flex",
                    flex: "1",
                    backgroundColor: "transparent",
                    color: "#ccc2bb",
                    wordBreak: "break-all"
                  }}
                >
                  Complaint & Feedback
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
                    display: "flex",
                    justifyContent: "center",
                    padding: "7%",
                    backgroundColor: "transparent",
                    flex: "1"
                  }}
                >
                  <img
                    src={team}
                    alt="team"
                    style={{ height: "15vh", width: "15vh" }}
                  />
                </div>
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "17px",
                    display: "flex",
                    flex: "1",
                    backgroundColor: "transparent",
                    color: "#ccc2bb",
                    wordBreak: "break-all"
                  }}
                >
                  Client Communication
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
