import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withUser from "../hoc/withUser";
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

          {this.props.userData.map((user, index) =>
            user.uid === this.props.user.uid && user.userType === "Admin" ? (
              <div
                key={index}
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
                      <img style={{ height: "11vh" }} src={leave} alt="leave" />
                    </div>
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "17px",
                        display: "flex",
                        backgroundColor: "transparent",
                        flexDirection: "column",
                        color: "#ccc2bb",
                        flex: "1"
                      }}
                    >
                      <div>My</div>
                      <div>Leave</div>
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
                      this.props.history.push("/teamallocation/" + 0);
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
                        style={{ height: "11vh" }}
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
                        flexDirection: "column"
                      }}
                    >
                      <div>Team</div>
                      <div>Allocation</div>
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
                        style={{ height: "11vh" }}
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
                        flexDirection: "column"
                      }}
                    >
                      <div>Complaint &</div>
                      <div>Feedback</div>
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
                      <img src={team} alt="team" style={{ height: "11vh" }} />
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
                        flexDirection: "column"
                      }}
                    >
                      <div>Client</div>
                      <div>Communication</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          )}

          {this.props.userData
            .filter(
              user =>
                user.uid === this.props.user.uid && user.userType === "Employee"
            )
            .map((item, id) =>
              item.access["leave"] &&
              item.access["complaint"] &&
              item.access["teamAllocation"] &&
              item.access["clientCommunication"] ? (
                <div
                  key={id}
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
                          style={{ height: "11vh" }}
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
                          flexDirection: "column",
                          color: "#ccc2bb",
                          flex: "1"
                        }}
                      >
                        <div>My</div>
                        <div>Leave</div>
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
                        this.props.history.push("/teamallocation/" + 0);
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
                          style={{ height: "11vh" }}
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
                          flexDirection: "column"
                        }}
                      >
                        <div>Team</div>
                        <div>Allocation</div>
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
                          style={{ height: "11vh" }}
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
                          flexDirection: "column"
                        }}
                      >
                        <div>Complaint &</div>
                        <div>Feedback</div>
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
                        <img src={team} alt="team" style={{ height: "11vh" }} />
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
                          flexDirection: "column"
                        }}
                      >
                        <div>Client</div>
                        <div>Communication</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : item.access["leave"] &&
                item.access["complaint"] &&
                item.access["teamAllocation"] ? (
                <div
                  key={id}
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
                          style={{ height: "11vh" }}
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
                          flexDirection: "column",
                          color: "#ccc2bb",
                          flex: "1"
                        }}
                      >
                        <div>My</div>
                        <div>Leave</div>
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
                        this.props.history.push("/teamallocation/" + 0);
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
                          style={{ height: "11vh" }}
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
                          flexDirection: "column"
                        }}
                      >
                        <div>Team</div>
                        <div>Allocation</div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      marginTop: "3%",
                      flex: "1",
                      justifyContent: "center"
                    }}
                  >
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
                          style={{ height: "11vh" }}
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
                          flexDirection: "column"
                        }}
                      >
                        <div>Complaint &</div>
                        <div>Feedback</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : item.access["leave"] && item.access["complaint"] ? (
                <div
                  key={id}
                  style={{
                    display: "flex",
                    height: "30vh",
                    marginTop: "10%"
                  }}
                >
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
                      <img style={{ height: "11vh" }} src={leave} alt="leave" />
                    </div>
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "17px",
                        display: "flex",
                        backgroundColor: "transparent",
                        flexDirection: "column",
                        color: "#ccc2bb",
                        flex: "1"
                      }}
                    >
                      <div>My</div>
                      <div>Leave</div>
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
                        style={{ height: "11vh" }}
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
                        flexDirection: "column"
                      }}
                    >
                      <div>Complaint &</div>
                      <div>Feedback</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={id} style={{ textAlign: "center", marginTop: "10%" }}>
                  You dont have authorization to access any module...contact
                  your admin
                </div>
              )
            )}
        </div>
      </Layout>
    );
  }
}
export default withUser(withRouter(Dashboard));
