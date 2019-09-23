

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
import moment from "moment"
class Payroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: [],
      yr: 0, mon: "", days: 0
    };
  }
  componentWillMount() {
    const currentUser = this.props.userData.find(
      user => user.uid === this.props.match.params.id
    );
    this.setState({
      currentUser
    }, () => {
      console.log(this.state.currentUser.joiningDate)
      var firedate = this.state.currentUser.joiningDate
      var datee = new Date(firedate.seconds * 1000)
      console.log(datee)
      var month = datee.getMonth() + 1;
      var year = datee.getFullYear();
      var monthName = moment(datee).format("MMM")
      var dayCounter = new Date(2019, month, 0).getDate();
      console.log(dayCounter, month, year, monthName)
      this.setState({ yr: year, mon: monthName, days: dayCounter })
    });
  }
  render() {
    return (
      <Layout navigationTitle="Payroll" showBackNavigation={true}>

        <div style={{ height: "calc(100vh - 80px)", overflow: "scroll", paddingBottom: "5px" }}>
          <div style={{ marginLeft: "87%", position: 'fixed' }}>
            <PdfFormat payrollId={this.state.currentUser.employeeName}></PdfFormat>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              margin: "0% 5% 0%5%",
              // backgroundColor: "#e6e6f3"
              paddingTop: "8%"
            }}
            id={this.state.currentUser.employeeName}
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

            <div style={{ display: "flex", flexDirection: "column", margin: "6% 5% 0% 5%" }} >
              <div>
                <Table style={{ backgroundColor: "" }}>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow style={{ borderStyle: "none", height: "30px" }}>
                      <TableRowColumn style={{ fontSize: "1em", height: "30px", fontWeight: "bold", padding: "0px", fontFamily: "Roboto" }}>Name</TableRowColumn>
                      <TableRowColumn style={{ fontSize: "1em", height: "30px", fontWeight: "bold", whiteSpace: "normal", paddingRight: "0px", paddingLeft: "0px", fontFamily: "Roboto" }}>{this.state.currentUser.employeeName}</TableRowColumn>
                    </TableRow>

                    <TableRow style={{ borderStyle: "none", height: "30px", }}>
                      <TableRowColumn style={{ fontSize: "1em", height: "30px", padding: "0px", fontWeight: "bold", fontFamily: "Roboto" }}>Designation</TableRowColumn>
                      <TableRowColumn style={{ fontSize: "1em", height: "30px", fontWeight: "bold", whiteSpace: "normal", paddingRight: "0px", paddingLeft: "0px", fontFamily: "Roboto" }}>{this.state.currentUser.designation}</TableRowColumn>
                    </TableRow>
                    <TableRow style={{ borderStyle: "none", height: "30px", }}>
                      <TableRowColumn style={{ fontSize: "1em", height: "30px", padding: "0px", fontWeight: "bold", fontFamily: "Roboto" }}>Salary Period</TableRowColumn>
                      <TableRowColumn style={{ fontSize: "1em", height: "30px", fontWeight: "bold", whiteSpace: "normal", paddingRight: "0px", paddingLeft: "0px", fontFamily: "Roboto" }}>1st {this.state.mon} {this.state.yr} to {this.state.days}th {this.state.mon} {this.state.yr}</TableRowColumn>
                    </TableRow>
                    <TableRow style={{ borderStyle: "none", height: "30px", }}>
                      <TableRowColumn style={{ fontSize: "1em", height: "30px", padding: "0px", fontWeight: "bold", fontFamily: "Roboto" }}>Location</TableRowColumn>
                      <TableRowColumn style={{ fontSize: "1em", height: "30px", fontWeight: "bold", whiteSpace: "normal", paddingRight: "0px", paddingLeft: "0px", fontFamily: "Roboto" }}>301 Gore Parisar , near Shyamiyana Palace,Civil lines,Raipur (C.G.) </TableRowColumn>
                    </TableRow>
                    <TableRow style={{ borderStyle: "none" }}>
                      <TableRowColumn style={{ fontSize: "1.2em", color: "#17179e", fontWeight: "bold", padding: "0px", fontFamily: "Roboto" }}>Description</TableRowColumn>
                      <TableRowColumn style={{ fontSize: "1em", fontWeight: "bold", whiteSpace: "normal", textAlign: "right", fontFamily: "Roboto" }}>Amount (Rs)</TableRowColumn>
                    </TableRow>
                    <TableRow style={{ borderBottom: "2px solid rgb(224, 224, 224)" }}>
                      <TableRowColumn style={{ fontSize: "1em", padding: "0px", fontFamily: "Roboto" }}>Basic Salary</TableRowColumn>
                      <TableRowColumn style={{ textAlign: "right", fontSize: "1em", fontFamily: "Roboto" }}>{this.state.currentUser.basicSalary}</TableRowColumn>
                    </TableRow>
                    <TableRow style={{ borderBottom: "2px solid rgb(224, 224, 224)", }}>
                      <TableRowColumn style={{ fontSize: "1em", padding: "0px", fontFamily: "Roboto" }}>Deductions</TableRowColumn>
                      <TableRowColumn style={{ textAlign: "right", fontSize: "1em", fontFamily: "Roboto" }}>0.00</TableRowColumn>
                    </TableRow>
                    <TableRow style={{ borderStyle: "none" }}>
                      <TableRowColumn style={{ fontSize: "1em", padding: "0px", textAlign: "right", fontFamily: "Roboto" }}>Subtotal</TableRowColumn>
                      <TableRowColumn style={{ textAlign: "right", fontSize: "1em", fontFamily: "Roboto" }}>{this.state.currentUser.basicSalary}</TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
                <div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </Layout >
    );
  }
}
export default Payroll;


//*************************************************************************** */
// import React from "react";
// import Layout from "../layouts/Layout";
// // import { ImagePictureAsPdf } from "material-ui/svg-icons";
// import {
//   Table,
//   TableBody,
//   TableRow,
//   TableRowColumn,
// } from 'material-ui/Table';
// import PdfFormat from "../components/PdfFormat"
// class Payroll extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { currentUser: [] };
//   }
//   componentWillMount() {
//     const currentUser = this.props.userData.find(
//       user => user.uid === this.props.match.params.id
//     );
//     this.setState({
//       currentUser
//     }, () => { console.log(this.state.currentUser.employeeName) });
//   }
//   render() {

//     return (
//       //  <Layout navigationTitle="Payroll" showBackNavigation={true}>

//       <div style={{ height: "calc(100vh - 80px)", overflow: "scroll", paddingBottom: "5px" }}>
//         <div style={{ marginLeft: "87%", position: 'fixed' }}>
//           <PdfFormat payrollId={this.state.currentUser.employeeName}></PdfFormat>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             width: "80%",
//             margin: "0% 5% 0%5%",
//             // backgroundColor: "#e6e6f3"
//             paddingTop: "0%"
//           }}
//           id={this.state.currentUser.employeeName}
//         >
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "left",
//               margin: "2% 5%"
//             }}
//           >
//             <div
//               style={{
//                 backgroundColor: "#17179e",
//                 height: "2.4em",
//                 margin: "3% 0%"
//               }}
//             />
//             <div style={{ fontSize: "2.3em", color: "blue", fontFamily: "Roboto" }}>
//               WisdomTree Edutech LLP
//             </div>
//             <div style={{ color: "gray", marginTop: "2%", fontSize: "2em", fontFamily: "Roboto" }}>
//               <div>LLPIN: AAE- 5211</div>
//               <div>210B, National Corporate Park</div>
//               <div>G E Road, Raipur 492001</div>
//               <div>Mob: +91 9300508989</div>
//             </div>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "left"
//             }}
//           >
//             <div
//               style={{
//                 fontSize: "3em",
//                 color: "#17179e",
//                 fontWeight: "bold",
//                 margin: "2% 0% 1% 5%"
//               }}
//             >
//               Salary Slip
//             </div>
//             <div
//               style={{
//                 fontSize: "2em",
//                 color: "#c5147f",
//                 fontWeight: "bold",
//                 margin: "0% 0% 3% 5%",
//                 fontFamily: "Roboto"
//               }}
//             >
//               31st October 2018
//             </div>
//           </div>

//           <div style={{ display: "flex", flexDirection: "column", margin: "2% 5% 0% 5%", paddingBottom: "10%" }} >
//             <div>
//               <Table style={{ backgroundColor: "" }}>
//                 <TableBody displayRowCheckbox={false}>
//                   <TableRow style={{ borderStyle: "none", height: "40px" }}>
//                     <TableRowColumn style={{ fontSize: "2em", height: "40px", fontWeight: "bold", padding: "0px", fontFamily: "Roboto" }}>Name</TableRowColumn>
//                     <TableRowColumn style={{ fontSize: "2em", height: "40px", fontWeight: "bold", whiteSpace: "normal", paddingRight: "0px", paddingLeft: "0px", fontFamily: "Roboto" }}>{this.state.currentUser.employeeName}</TableRowColumn>
//                   </TableRow>

//                   <TableRow style={{ borderStyle: "none", height: "40px", }}>
//                     <TableRowColumn style={{ fontSize: "2em", height: "40px", padding: "0px", fontWeight: "bold", fontFamily: "Roboto" }}>Designation</TableRowColumn>
//                     <TableRowColumn style={{ fontSize: "2em", height: "40px", fontWeight: "bold", whiteSpace: "normal", paddingRight: "0px", paddingLeft: "0px", fontFamily: "Roboto" }}>{this.state.currentUser.designation}</TableRowColumn>
//                   </TableRow>
//                   <TableRow style={{ borderStyle: "none", height: "40px", }}>
//                     <TableRowColumn style={{ fontSize: "2em", height: "40px", padding: "0px", fontWeight: "bold", fontFamily: "Roboto" }}>Salary Period</TableRowColumn>
//                     <TableRowColumn style={{ fontSize: "2em", height: "40px", fontWeight: "bold", whiteSpace: "normal", paddingRight: "0px", paddingLeft: "0px", fontFamily: "Roboto" }}>1st Apr 2019 to 30th Aprl 2019</TableRowColumn>
//                   </TableRow>
//                   <TableRow style={{ borderStyle: "none", height: "40px", }}>
//                     <TableRowColumn style={{ fontSize: "2em", height: "40px", padding: "0px", fontWeight: "bold", fontFamily: "Roboto" }}>Location</TableRowColumn>
//                     <TableRowColumn style={{ fontSize: "2em", height: "40px", fontWeight: "bold", whiteSpace: "normal", paddingRight: "0px", paddingLeft: "0px", fontFamily: "Roboto" }}>301 Gore Parisar , near Shyamiyana Palace,Civil lines,Raipur (C.G.) </TableRowColumn>
//                   </TableRow>
//                   <TableRow style={{ borderStyle: "none" }}>
//                     <TableRowColumn style={{ fontSize: "3em", color: "#17179e", fontWeight: "bold", padding: "0px", fontFamily: "Roboto" }}>Description</TableRowColumn>
//                     <TableRowColumn style={{ fontSize: "2em", fontWeight: "bold", whiteSpace: "normal", textAlign: "right", fontFamily: "Roboto" }}>Amount (Rs)</TableRowColumn>
//                   </TableRow>
//                   <TableRow style={{ borderBottom: "2px solid rgb(224, 224, 224)" }}>
//                     <TableRowColumn style={{ fontSize: "2em", padding: "0px", fontFamily: "Roboto" }}>Basic Salary</TableRowColumn>
//                     <TableRowColumn style={{ textAlign: "right", fontSize: "2em", fontFamily: "Roboto" }}>{this.state.currentUser.basicSalary}</TableRowColumn>
//                   </TableRow>
//                   <TableRow style={{ borderBottom: "2px solid rgb(224, 224, 224)", }}>
//                     <TableRowColumn style={{ fontSize: "2em", padding: "0px", fontFamily: "Roboto" }}>Deductions</TableRowColumn>
//                     <TableRowColumn style={{ textAlign: "right", fontSize: "2em", fontFamily: "Roboto" }}>0.00</TableRowColumn>
//                   </TableRow>
//                   <TableRow style={{ borderStyle: "none" }}>
//                     <TableRowColumn style={{ fontSize: "2em", padding: "0px", textAlign: "right", fontFamily: "Roboto" }}>Subtotal</TableRowColumn>
//                     <TableRowColumn style={{ textAlign: "right", fontSize: "2em", fontFamily: "Roboto" }}>{this.state.currentUser.basicSalary}</TableRowColumn>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//               <div>
//               </div>

//             </div>
//           </div>

//         </div>

//       </div>
//       // </Layout >
//     );
//   }
// }
// export default Payroll;
