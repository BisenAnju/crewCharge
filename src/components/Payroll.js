import React from "react";
import Layout from "../layouts/Layout";

class Payroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout navigationTitle="Payroll" showBackNavigation={true}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            margin: "0% 5%",
            backgroundColor: "#e6e6f3"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              margin: "0% 5%"
            }}
          >
            <div
              style={{
                backgroundColor: "blue",
                height: "10px",
                margin: "5% 0%"
              }}
            />
            <div style={{ fontSize: "1.5em", color: "blue" }}>
              WisdomTree Edutech LLP
            </div>
            <div style={{ fontSize: "1em" }}>LLPIN: AAE- 5211</div>
            <div style={{ fontSize: "1em" }}>210B, National Corporate Park</div>
            <div style={{ fontSize: "1em" }}>G E Road, Raipur 492001</div>
            <div style={{ fontSize: "1em" }}>Mob: +91 9300508989</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left"
            }}
          >
            <div
              style={{
                fontSize: "1.6em",
                color: "blue",
                fontWeight: "bold",
                margin: "5% 0% 3% 5%"
              }}
            >
              Salary Slip
            </div>
            <div
              style={{
                fontSize: "1.1em",
                color: "#c5147f",
                fontWeight: "bold",
                margin: "0% 0% 5% 5%"
              }}
            >
              31st October 2018
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>Name</div>
              <div>Mr Harshit Agrawal</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>Designation</div>
              <div>Software Developer</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>Salary Period</div>
              <div>1st October 2018 to 31st October 2018</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>Location</div>
              <div>Sundar Nagar</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default Payroll;
