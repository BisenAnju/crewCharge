// import React, { Component } from "react";
// import { cardStyle } from "./Projects";
// import { withRouter } from "react-router-dom";
// import { CardText, Card, CardHeader, CircularProgress } from "material-ui";
// import Layout from "../layouts/Layout";

// class Widgets extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       widgetList: [],
//       workItemsList: [],
//       columns: [],
//       isLoading: true
//     };
//   }

//   componentWillMount() {
//     console.log("will mount");
//     setTimeout(() => {
//       console.log(this.state.widgetList.length);
//       const final = [];
//       const finalMapRet = this.state.widgetList.map(widget => {
//         // console.log("column");
//         // console.log(col);
//         // console.log("workItems");
//         // console.log(workItem);
//         // return {
//         //   widgetId: widget.id,
//         //   widgetName: widget.name,
//         //   columnRefName: col.referenceName,
//         //   columnTitle: col.name,
//         //   workItemId: workItem.id,
//         //   workItemData: workItem.fields
//         // };
//       });

//       console.log("---------------");
//       console.log(final);
//       console.log("***************");
//       console.log(finalMapRet);

//       this.setState({
//         isLoading: false
//       });
//     }, 2500);
//   }

//   componentWillReceiveProps(nextProps) {
//     console.log("will receive");
//     if (nextProps.widgetList !== this.props.widgetList)
//       this.setState({
//         isLoading: nextProps.isLoading,
//         widgetList: nextProps.widgetList,
//         workItemsList: nextProps.workItemsList,
//         columns: nextProps.columns
//       });
//   }

//   render() {
//     console.log("widgets component props");
//     console.log(this.props);

//     return (
//       <Layout navigationTitle="Widgets" showBackNavigation={true}>
//         {this.state.isLoading ? (
//           <center>
//             <CircularProgress />
//           </center>
//         ) : (
//           <div
//             style={{
//               height: "90vh",
//               overflow: "auto",
//               display: "self"
//             }}
//             id="listOfWidgets"
//           >
//             <h3>
//               Widgets:
//               {this.state.widgetList.length > 0 ? (
//                 this.state.widgetList.length
//               ) : (
//                 <div>No widgets found</div>
//               )}
//             </h3>
//             {this.state.widgetList.map((widget, widgetIndex) => {
//               return (
//                 <div id="widget" key={widgetIndex}>
//                   <Card style={cardStyle}>
//                     <CardHeader title={widget.name} />
//                     <CardText
//                       style={{
//                         display: "flex",
//                         margin: "0 20px",
//                         overflowX: "scroll"
//                       }}
//                     >
//                       {this.state.columns.map((column, columnIndex) => {
//                         // console.log(widgetIndex);
//                         // console.log(columnIndex);
//                         if (widgetIndex === columnIndex) {
//                           return column.map((col, colIndex) => {
//                             return (
//                               <div key={colIndex} style={{ margin: "0 10px" }}>
//                                 {col.name}

//                                 <div
//                                   key={"divTable-" + colIndex}
//                                   id="tableData"
//                                 >
//                                   <table key={"table-" + colIndex}>
//                                     {this.state.workItemsList.map(
//                                       (workItems, workItemsIndex) => {
//                                         if (widgetIndex === workItemsIndex) {
//                                           return workItems.map(workItem => {
//                                             return (
//                                               <div>
//                                                 <thead>
//                                                   <tr>
//                                                     {col.referenceName ===
//                                                     "System.Id" ? (
//                                                       <td>{workItem.id}</td>
//                                                     ) : null}
//                                                   </tr>
//                                                 </thead>
//                                                 {Object.entries(
//                                                   workItem.fields
//                                                 ).map(data => {
//                                                   // console.log(data);
//                                                   if (
//                                                     data[0] ===
//                                                     col.referenceName
//                                                   ) {
//                                                     console.log(data[1]);
//                                                     return (
//                                                       <tbody>
//                                                         <tr>
//                                                           {typeof data[1] ===
//                                                           "object" ? (
//                                                             <td>
//                                                               {
//                                                                 data[1]
//                                                                   .displayName
//                                                               }
//                                                             </td>
//                                                           ) : (
//                                                             <td>{data[1]}</td>
//                                                           )}
//                                                         </tr>
//                                                       </tbody>
//                                                     );
//                                                   }
//                                                 })}
//                                               </div>
//                                             );
//                                           });
//                                         }
//                                       }
//                                     )}
//                                   </table>
//                                 </div>
//                               </div>
//                             );
//                           });
//                         } else {
//                           //console.log("index not matched");
//                         }
//                       })}
//                     </CardText>
//                   </Card>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </Layout>
//     );
//   }
// }
// export default withRouter(Widgets);
