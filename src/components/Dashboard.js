import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import blur from "../images/blur1.png";
import leave from "../images/leave1.png";
import icon from "../images/icon1.png";
import meeting from "../images/meeting1.png";
import complaint from "../images/complaint1.png";
import project from "../images/project1.png";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout navigationTitle="Project S">
        {/* <div
          style={{
            width: "100%",
            position: "fixed",
            backgroundColor: "#f2f3f2",
            minHeight: "100vh"
          }}
        > */}
        {/* <div style={{ height: "70px" }} /> */}
        <div>
          <center>
            <img alt="icon" src={icon} />
          </center>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
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
                <img src={leave} alt="leave" />
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
                <img src={meeting} alt="meeting" />
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
                <img src={complaint} alt="complaint" />
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
                <img src={project} alt="project" />
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
        {/* </div> */}
      </Layout>
    );
  }
}
export default withRouter(Dashboard);
