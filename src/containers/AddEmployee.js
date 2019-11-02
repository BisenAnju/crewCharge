import React from "react";
import { withRouter } from "react-router-dom";
import AddEmployee from "../components/AddEmployee";
import withFirebase from "../hoc/withFirebase";

class AddEmployeeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      employeeData: []
    };
  }

  userJoiningDate = data => {
    this.props.db
      .collection("users")
      .doc(data.employeeName)
      .update({
        employeeName: data.empName,
        designation: data.designation,
        joiningDate: data.joiningDate,
        // payroll: [
        //   {
        //     date: data.joiningDate,
        //     designation: data.designation,
        //     salary: data.basicSalary
        //   }
        // ]
      })
      .then(() => this.props.history.goBack())
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  componentWillMount() {
    this.props.db
      .collection("users")
      .orderBy("displayName")
      .get()
      .then(
        doc => {
          const employeeData = [];
          doc.forEach(docitem => {
            if (docitem.exists) {
              employeeData.push(docitem.data());
            }
          });
          this.setState({
            isLoading: false,
            employeeData
          });
        },
        err => {
          console.log(`Encountered error: ${err}`);
        }
      );
  }

  render() {
    return (
      <AddEmployee
        employeeData={this.state.employeeData}
        userJoiningDate={this.userJoiningDate}
      />
    );
  }
}
export default withFirebase(withRouter(AddEmployeeContainer));
