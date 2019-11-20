import React from "react";
import { withRouter } from "react-router-dom";
import Configuration from "../components/Configuration";
import withFirebase from "../hoc/withFirebase";
class ConfigurationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      purposeData: [],
      userData: []
    };
  }

  componentWillMount() {
    this.props.db
      .collection("leavePurpose")
      .get()
      .then(
        doc => {
          const purposeData = [];
          doc.forEach(docitem => {
            if (docitem.exists) {
              purposeData.push(docitem.data());
            }
          });
          this.setState({
            isLoading: false,
            purposeData
          });
        },
        err => {
          console.log(`Encountered error: ${err}`);
        }
      );

    this.props.db
      .collection("users")
      .orderBy("displayName")
      .onSnapshot(
        snapshot => {
          const userData = [];
          snapshot.forEach(doc => {
            if (doc.exists) {
              userData.push(doc.data());
            }
          });
          this.setState({
            isLoading: false,
            userData
          });
        },
        err => {
          console.log(`Encountered error: ${err}`);
        }
      );
  }

  addHolidays = data => {
    const holidayRef = this.props.db.collection("holiday_master").doc("2019");
    holidayRef
      .get()
      .then(querySnapshot => {
        if (querySnapshot.exists) {
          data.holidays.map(item =>
            this.props.db
              .collection("holiday_master")
              .doc("2019")
              .collection("events")
              .add({
                id: data.category,
                title: data.reason,
                start: item,
                end: item
              })
          );
        }
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  addAttendance = attendance => {
    let date = attendance.attDate.getDate();
    let month = attendance.attDate.getMonth();
    let inTime = new Date(new Date(attendance.inTime).setMonth(month));
    let outTime = new Date(new Date(attendance.outTime).setMonth(month));
    this.props.db
      .collection("attendance")
      .add({
        userId: attendance.userName,
        in: new Date(new Date(inTime).setDate(date)),
        out: new Date(new Date(outTime).setDate(date)),
        date: attendance.attDate
      })
      .then()
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  addPurpose = (field, collection, data, iconURL) => {
    this.props.db
      .collection(collection)
      .add({
        [field]: data
          .replace(" ", "")
          .replace("/", "")
          .replace("-", "")
          .toLowerCase(),
        displayName: data.charAt(0).toUpperCase() + data.slice(1),
        iconUrl: iconURL
      })
      .then(this.props.history.goBack())
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  addPayroll = payrollData => {
    const payrollObject = {
      date: payrollData.month,
      designation: payrollData.designation,
      salary: payrollData.salary
    };
    this.props.db
      .collection("users")
      .doc(payrollData.userName)
      .get()
      .then(querySnapshot => {
        var payroll = [];
        if (querySnapshot.exists) {
          payroll = querySnapshot.data().payroll;
          payroll.push(payrollObject);
        }
        this.props.db
          .collection("users")
          .doc(payrollData.userName)
          .update({
            payroll
          });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

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

  addYear = year => {
    const displayYear = year + "-" + (parseInt(year) + 1)

    this.props.db
      .collection("yearMaster")
      .add({
        year,
        displayYear
      })
      .then()
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  render() {
    return (
      <Configuration
        addPurpose={this.addPurpose}
        addAttendance={this.addAttendance}
        addHolidays={this.addHolidays}
        addPayroll={this.addPayroll}
        addYear={this.addYear}
        userJoiningDate={this.userJoiningDate}
        purposeData={this.state.purposeData}
        userData={this.state.userData}
      />
    );
  }
}
export default withFirebase(withRouter(ConfigurationContainer));
