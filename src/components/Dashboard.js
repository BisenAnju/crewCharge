import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import BG from "../images/bg.jpg";
// import Leave from "../images/leave.jpg";
import { grey500, green200, blueGrey300 } from "material-ui/styles/colors";
import { lightBlue300 } from "material-ui/styles/colors";
import { ActionHome } from "material-ui/svg-icons";
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
        // style={{
        //   backgroundImage: ' url("' + BG + '")',
        //   height: "-webkit-fill-available",
        //   backgroundPosition: "unset",
        //   backgroundSize: "cover"
        // }}
        >
          <div
            style={{ margin: "0% 2%", borderRadius: "10px" }}
            onClick={e => {
              e.preventDefault();
              this.props.history.push("/leavedashboard");
            }}
          >
            <div
              style={{
                padding: "7%",
                backgroundColor: "rgba(136, 37, 37, 0.45)",
                color: "white"
              }}
            >
              <center>
                {/* <img src={Leave}> */}
                <ActionHome
                  color="white"
                  style={{ width: "16%", height: "0%" }}
                />
              </center>
            </div>
            <div
              style={{
                padding: "10px",
                backgroundColor: "rgba(136, 37, 37)",
                color: "white"
              }}
            >
              <center>
                <h3>Leave Dashboard</h3>
              </center>
            </div>
          </div>
          <div
            style={{ margin: "0% 2%", borderRadius: "10px" }}
            onClick={e => {
              e.preventDefault();
              this.props.history.push("/complaintlist");
            }}
          >
            <div
              style={{
                padding: "7%",
                backgroundColor: "rgba(158, 158, 158, 0.7)",
                color: "white"
              }}
            >
              <center>
                <ActionHome
                  color="white"
                  style={{ width: "16%", height: "0%" }}
                />
              </center>
            </div>
            <div
              style={{
                padding: "10px",
                backgroundColor: "rgba(158, 158, 158, 0.85)",
                color: "white"
              }}
            >
              <center>
                <h3>Complaint & Feedback</h3>
              </center>
            </div>
          </div>
          <div
            style={{ margin: "0% 2%", borderRadius: "10px" }}
            onClick={e => {
              e.preventDefault();
              this.props.history.push("/teamallocation");
            }}
          >
            <div
              style={{
                padding: "7%",
                backgroundColor: "rgba(158, 158, 158, 0.7)",
                color: "white"
              }}
            >
              <center>
                <ActionHome
                  color="white"
                  style={{ width: "16%", height: "0%" }}
                />
              </center>
            </div>
            <div
              style={{
                padding: "10px",
                backgroundColor: "rgba(158, 158, 158, 0.85)",
                color: "white"
              }}
            >
              <center>
                <h3>Team Allocation</h3>
              </center>
            </div>
          </div>
          <div
            style={{ margin: "0% 2%", borderRadius: "10px" }}
            onClick={e => {
              e.preventDefault();
              this.props.history.push("/projects");
            }}
          >
            <div
              style={{
                padding: "7%",
                backgroundColor: "rgba(158, 158, 158, 0.7)",
                color: "white"
              }}
            >
              <center>
                <ActionHome
                  color="white"
                  style={{ width: "16%", height: "0%" }}
                />
              </center>
            </div>
            <div
              style={{
                padding: "10px",
                backgroundColor: "rgba(158, 158, 158, 0.85)",
                color: "white"
              }}
            >
              <center>
                <h3>Client Communication</h3>
              </center>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default withRouter(Dashboard);
