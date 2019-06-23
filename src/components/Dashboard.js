import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import blur from "../images/blur1.png";
// import Leave from "../images/leave.jpg";
import leave from "../images/leave1.png";
import icon from "../images/icon1.png";
import meeting from "../images/meeting1.png";
import complaint from "../images/complaint1.png";
import project from "../images/project1.png";
const flexContainer = {
  display: "flex",
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
        <div
          style={{
            width: "100%",
            position: "fixed",
            backgroundColor: "#f2f3f2",
            minHeight: "100vh"
          }}
        >
          <div style={{ height: "70px" }} />
          <div>
            <center>
              <img src={icon} />
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
                  <img src={leave} />
                </center>
                {/* <leave
                color="rgb(253, 145, 77)"
                style={{ width: "16%", height: "0%" }}
              /> */}
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
                  <img src={meeting} />
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
                  <img src={complaint} />
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
                  <img src={project} />
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
                  <h3>Projects</h3>
                </center>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default withRouter(Dashboard);
