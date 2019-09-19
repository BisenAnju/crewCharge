import React from "react";
import Layout from "../layouts/Layout";
// import { ImagePictureAsPdf } from "material-ui/svg-icons";
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import PdfFormat from "../components/PdfFormat"
class Payroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Layout navigationTitle="Payroll" showBackNavigation={true}>
        <div style={{ height: "calc(100vh - 80px)", overflow: "scroll", paddingBottom: "5px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              margin: "0% 5% 0%5%",
              // backgroundColor: "#e6e6f3"
              paddingTop: "8%"
            }}
            id="generatePdf"
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
                  backgroundColor: "#17179e",
                  height: "13px",
                  margin: "4% 0%"
                }}
              />
              <div style={{ fontSize: "1.5em", color: "blue", fontFamily: "Roboto" }}>
                WisdomTree Edutech LLP
            </div>
              <div style={{ color: "gray", marginTop: "5%", fontSize: "1em", fontFamily: "Roboto" }}>
                <div>LLPIN: AAE- 5211</div>
                <div>210B, National Corporate Park</div>
                <div>G E Road, Raipur 492001</div>
                <div>Mob: +91 9300508989</div>
              </div>
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
                  fontSize: "2em",
                  color: "#17179e",
                  fontWeight: "bold",
                  margin: "5% 0% 1% 5%"
                }}
              >
                Salary Slip
            </div>
              <div
                style={{
                  fontSize: "1em",
                  color: "#c5147f",
                  fontWeight: "bold",
                  margin: "0% 0% 3% 5%",
                  fontFamily: "Roboto"
                }}
              >
                31st October 2018
            </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", margin: "6% 0% 0% 5%" }} >
              <div>
                <Table style={{ backgroundColor: "" }}>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow style={{ borderStyle: "none", height: "30px" }}>
                      <TableRowColumn style={{ fontSize: "1em", height: "30px", fontWeight: "bold", padding: "0px", fontFamily: "Roboto" }}>Name</TableRowColumn>
                      <TableRowColumn style={{ fontSize: "1em", height: "30px", fontWeight: "bold", whiteSpace: "normal", paddingRight: "0px", paddingLeft: "0px", fontFamily: "Roboto" }}>Harshit Agrawal</TableRowColumn>
                    </TableRow>

                    <TableRow style={{ borderStyle: "none", height: "30px", }}>
                      <TableRowColumn style={{ fontSize: "1em", height: "30px", padding: "0px", fontWeight: "bold", fontFamily: "Roboto" }}>Designation</TableRowColumn>
                      <TableRowColumn style={{ fontSize: "1em", height: "30px", fontWeight: "bold", whiteSpace: "normal", paddingRight: "0px", paddingLeft: "0px", fontFamily: "Roboto" }}>Software Developer</TableRowColumn>
                    </TableRow>
                    <TableRow style={{ borderStyle: "none", height: "30px", }}>
                      <TableRowColumn style={{ fontSize: "1em", height: "30px", padding: "0px", fontWeight: "bold", fontFamily: "Roboto" }}>Salary Period</TableRowColumn>
                      <TableRowColumn style={{ fontSize: "1em", height: "30px", fontWeight: "bold", whiteSpace: "normal", paddingRight: "0px", paddingLeft: "0px", fontFamily: "Roboto" }}>1st October 2018 to 31st October 2018</TableRowColumn>
                    </TableRow>
                    <TableRow style={{ borderStyle: "none", height: "30px", }}>
                      <TableRowColumn style={{ fontSize: "1em", height: "30px", padding: "0px", fontWeight: "bold", fontFamily: "Roboto" }}>Location</TableRowColumn>
                      <TableRowColumn style={{ fontSize: "1em", height: "30px", fontWeight: "bold", whiteSpace: "normal", paddingRight: "0px", paddingLeft: "0px", fontFamily: "Roboto" }}>Sundar Nagar</TableRowColumn>
                    </TableRow>
                    <TableRow style={{ borderStyle: "none" }}>
                      <TableRowColumn style={{ fontSize: "1.2em", color: "#17179e", fontWeight: "bold", padding: "0px", fontFamily: "Roboto" }}>Description</TableRowColumn>
                      <TableRowColumn style={{ fontSize: "1em", fontWeight: "bold", whiteSpace: "normal", textAlign: "right", fontFamily: "Roboto" }}>Amount (Rs)</TableRowColumn>
                    </TableRow>
                    <TableRow style={{ borderBottom: "2px solid rgb(224, 224, 224)" }}>
                      <TableRowColumn style={{ fontSize: "1em", padding: "0px", fontFamily: "Roboto" }}>Basic Salary</TableRowColumn>
                      <TableRowColumn style={{ textAlign: "right", fontSize: "1em", fontFamily: "Roboto" }}>0.00</TableRowColumn>
                    </TableRow>
                    <TableRow style={{ borderBottom: "2px solid rgb(224, 224, 224)", }}>
                      <TableRowColumn style={{ fontSize: "1em", padding: "0px", fontFamily: "Roboto" }}>Deductions</TableRowColumn>
                      <TableRowColumn style={{ textAlign: "right", fontSize: "1em", fontFamily: "Roboto" }}>0.00</TableRowColumn>
                    </TableRow>
                    <TableRow style={{ borderStyle: "none" }}>
                      <TableRowColumn style={{ fontSize: "1em", padding: "0px", textAlign: "right", fontFamily: "Roboto" }}>Subtotal</TableRowColumn>
                      <TableRowColumn style={{ textAlign: "right", fontSize: "1em", fontFamily: "Roboto" }}>  0.00</TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
                <div>
                </div>

              </div>
            </div>

          </div>
          <div style={{ float: "right", marginRight: "5%" }}>
            <PdfFormat payrollId="generatePdf"></PdfFormat>
          </div>
        </div>
      </Layout >
    );
  }
}
export default Payroll;
