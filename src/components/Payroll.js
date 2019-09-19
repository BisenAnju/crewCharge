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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            margin: "0% 5%",
            // backgroundColor: "#e6e6f3"
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
                backgroundColor: "blue",
                height: "10px",
                margin: "5% 0%"
              }}
            />
            <div style={{ fontSize: "0.8em", color: "blue" }}>
              WisdomTree Edutech LLP
            </div>
            <div style={{ fontSize: "0.5em" }}>LLPIN: AAE- 5211</div>
            <div style={{ fontSize: "0.5em" }}>210B, National Corporate Park</div>
            <div style={{ fontSize: "0.5em" }}>G E Road, Raipur 492001</div>
            <div style={{ fontSize: "0.5em" }}>Mob: +91 9300508989</div>
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
                fontSize: "0.8em",
                color: "blue",
                fontWeight: "bold",
                margin: "5% 0% 1% 5%"
              }}
            >
              Salary Slip
            </div>
            <div
              style={{
                fontSize: "0.6em",
                color: "#c5147f",
                fontWeight: "bold",
                margin: "0% 0% 3% 5%"
              }}
            >
              31st October 2018
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", margin: "0% 5% 5% 5%" }} >
            {/*  <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Name</div>
              <div>Mr Harshit Agrawal</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Designation</div>
              <div>Software Developer</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Salary Period</div>
              <div>1st October 2018 to 31st October 2018</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Location</div>
              <div>Sundar Nagar</div>
            </div> */}

            <div >
              {/* <table border>
              <th>
                <td>Description</td>
                <td>Amount (Rs)</td>
              </th>
              <tr>
                <td>Basic Salary</td>
                <td>0.00</td>
              </tr>
            </table> */}


              <Table style={{ backgroundColor: "" }}>
                <TableBody displayRowCheckbox={false}>

                  <TableRow style={{ borderStyle: "none", height: "0px", }}>
                    <TableRowColumn style={{ fontSize: "0.5em", height: "0px", fontWeight: "bold", padding: "0px" }}>Name</TableRowColumn>
                    <TableRowColumn style={{ fontSize: "0.5em", height: "0px", fontWeight: "bold", whiteSpace: "normal", paddingRight: "0px" }}>Harshit Agrawal</TableRowColumn>
                  </TableRow>

                  <TableRow style={{ borderStyle: "none", height: "0px", }}>
                    <TableRowColumn style={{ fontSize: "0.5em", height: "0px", padding: "0px", fontWeight: "bold", }}>Designation</TableRowColumn>
                    <TableRowColumn style={{ fontSize: "0.5em", height: "0px", fontWeight: "bold", whiteSpace: "normal", paddingRight: "0px" }}>Software Developer</TableRowColumn>
                  </TableRow>
                  <TableRow style={{ borderStyle: "none", height: "0px", }}>
                    <TableRowColumn style={{ fontSize: "0.5em", height: "0px", padding: "0px", fontWeight: "bold", }}>Salary Period</TableRowColumn>
                    <TableRowColumn style={{ fontSize: "0.5em", height: "0px", fontWeight: "bold", whiteSpace: "normal", paddingRight: "0px" }}>1st October 2018 to 31st October 2018</TableRowColumn>
                  </TableRow>
                  <TableRow style={{ borderStyle: "none", height: "0px", }}>
                    <TableRowColumn style={{ fontSize: "0.5em", height: "0px", padding: "0px", fontWeight: "bold", }}>Location</TableRowColumn>
                    <TableRowColumn style={{ fontSize: "0.5em", height: "0px", fontWeight: "bold", whiteSpace: "normal", paddingRight: "0px" }}>Sundar Nagar</TableRowColumn>
                  </TableRow>

                  <TableRow style={{ borderStyle: "none" }}>
                    <TableRowColumn style={{ fontSize: "1em", color: "blue", fontWeight: "bold", padding: "0px" }}>Description</TableRowColumn>
                    <TableRowColumn style={{ fontSize: "0.5em", fontWeight: "bold", whiteSpace: "normal", textAlign: "right", }}>Amount (Rs)</TableRowColumn>
                  </TableRow>
                  <TableRow style={{ borderBottom: "1px solid rgb(224, 224, 224)", height: "0px" }}>
                    <TableRowColumn style={{ fontSize: "0.5em", padding: "0px", height: "0px" }}>Basic Salary</TableRowColumn>
                    <TableRowColumn style={{ textAlign: "right", fontSize: "0.5em", height: "0px" }}>0.00</TableRowColumn>
                  </TableRow>
                  <TableRow style={{ borderBottom: "1px solid rgb(224, 224, 224)", height: "0px" }}>
                    <TableRowColumn style={{ fontSize: "0.5em", padding: "0px", height: "0px" }}>Deductions</TableRowColumn>
                    <TableRowColumn style={{ textAlign: "right", fontSize: "0.5em", height: "0px" }}>0.00</TableRowColumn>
                  </TableRow>
                  <TableRow style={{ borderStyle: "none" }}>
                    <TableRowColumn style={{ fontSize: "0.5em", padding: "0px", textAlign: "right" }}>Subtotal</TableRowColumn>
                    <TableRowColumn style={{ textAlign: "right", fontSize: "0.5em" }}>  0.00</TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

          </div>
          <div style={{ margin: "auto" }} >
            <PdfFormat payrollId="generatePdf"></PdfFormat>


          </div>

        </div>
      </Layout >
    );
  }
}
export default Payroll;
