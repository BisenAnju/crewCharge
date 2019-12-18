import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withUser from "../hoc/withUser";
import Layout from "../layouts/Layout";
import blur from "../images/blur1.png";
import icon from "../images/icon1.png";
import leave from "../images/leave.svg";
// import payslip from "../images/payslip.svg";
// import employee from "../images/employee.svg";
import complaint from "../images/complaint.svg";
import allocation from "../images/allocation.svg";

import { BottomNavigation, BottomNavigationItem, Paper } from 'material-ui';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';


const nearbyIcon = <IconLocationOn />;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0, };
  }
  select = (index) => this.setState({ selectedIndex: index });

  render() {
    console.log(this.props.userData);
    console.log(this.props.user);
    return (
      <Layout navigationTitle="Crew Charge">

        {this.props.userData.map((user, index) =>
          user.uid === this.props.user.uid && user.userType === "Admin" ?

            (<div style={{ position: "absolute", bottom: "0px" }}>
              <Paper zDepth={1}>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                  <BottomNavigationItem
                    label="Tasks"
                    icon={nearbyIcon}
                    onClick={() => this.select(0)}
                  />
                  <BottomNavigationItem
                    label="Leaves"
                    icon={nearbyIcon}
                    onClick={() => this.select(1)}
                  />
                  <BottomNavigationItem
                    label="Payroll"
                    icon={nearbyIcon}
                    onClick={() => this.select(2)}
                  />
                  <BottomNavigationItem
                    label="Complaint"
                    icon={nearbyIcon}
                    onClick={() => this.select(3)}
                  />
                  <BottomNavigationItem
                    label="setting"
                    icon={nearbyIcon}
                    onClick={() => this.select(4)}
                  />
                </BottomNavigation>
              </Paper>
            </div>)

            : null
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
                <div style={{ height: "calc(100vh - 70px)" }}>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img alt="icon" src={icon} style={{ height: "120px" }} />
                  </div>
                  <div
                    key={id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "calc(100vh - 190px)"
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
                          <img
                            src="/static/media/allocation.a3b40e91.svg"
                            alt="team"
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
                          <div>Client</div>
                          <div>Communication</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : item.access["leave"] &&
                item.access["complaint"] &&
                item.access["teamAllocation"] ? (

                  <div style={{ height: "calc(100vh - 70px)" }}>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img alt="icon" src={icon} style={{ height: "120px" }} />
                    </div>


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
                  </div>
                ) : item.access["leave"] && item.access["complaint"] ? (
                  <div style={{ height: "calc(100vh - 70px)" }}>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img alt="icon" src={icon} style={{ height: "120px" }} />
                    </div>

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
                  </div>
                ) : (
                    <div key={id} style={{ textAlign: "center", marginTop: "10%" }}>
                      You dont have authorization to access any module...contact
                      your admin
                </div>
                  )
          )}

      </Layout >
    );
  }
}
export default withUser(withRouter(Dashboard));
