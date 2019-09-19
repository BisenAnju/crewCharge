import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import {
  SelectField,
  MenuItem,
  DatePicker,
  FlatButton,
  Paper,
  List,
  ListItem,
  TextField,
  Avatar
} from "material-ui";
import moment from "moment";
const styles = {

  underlineStyle: {
    borderColor: "#f08f4c",
  },
  floatingLabelStyle: {
    color: "#f08f4c",
  },

};
class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeName: "",
      empName: "",
      joiningDate: "",
      designation: "",
      location: "",
      basicSalary: ""
    };
  }
  selectChange = (event, index, employeeName) => {
    let empdata = this.props.employeeData.find(data => data.uid === employeeName);
    console.log(empdata.displayName)
    this.setState({
      employeeName,
      empName: empdata.displayName
    }, () => { console.log(this.state.employeeName) });
  };
  changeJoiningDate = (event, date) => {
    this.setState({
      joiningDate: date
    });
  };
  handleNameChange = (e, name) => {
    this.setState({ empName: name }, () => { console.log(this.state.empName) });
  }
  handleDesignationChange = (e, designation) => {
    this.setState({ designation: designation }, () => { console.log(this.state.designation) });
  }
  handleLocationChange = (e, location) => {
    this.setState({ location: location }, () => { console.log(this.state.location) });
  }
  handleBasicSalaryChange = (e, basicSalary) => {
    this.setState({ basicSalary: parseInt(basicSalary, 10) }, () => { console.log(this.state.basicSalary) });
  }

  saveData = e => {
    e.preventDefault();
    this.props.userJoiningDate({ ...this.state });
  };
  render() {
    return (
      <Layout navigationTitle="Add Employee" showBackNavigation={true}>
        <div style={{ height: "calc(100vh - 100px)", overflow: "scroll", paddingBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <div>
              <SelectField
                maxHeight={180}
                floatingLabelText="Select Employee"
                floatingLabelStyle={styles.floatingLabelStyle}
                id="employee"
                value={this.state.employeeName}
                onChange={this.selectChange}
              >
                {this.props.employeeData.map((data, index) => (
                  <MenuItem
                    key={index}
                    value={data.uid}
                    primaryText={data.displayName}
                  />
                ))}
              </SelectField>
            </div>
            <div>
              <TextField
                hintText="Enter Name"
                floatingLabelText="Enter Name"
                floatingLabelStyle={styles.floatingLabelStyle}
                underlineFocusStyle={styles.underlineStyle}
                value={this.state.empName}
                onChange={this.handleNameChange}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <DatePicker
                // hintText="Joining Date"
                floatingLabelText="Joining Date"
                // hintStyle={styles.floatingLabelStyle}
                floatingLabelStyle={styles.floatingLabelStyle}
                autoOk
                formatDate={date => moment(date).format("DD/MM/YYYY")}
                value={this.state.joiningDate}
                onChange={this.changeJoiningDate}
              />
            </div>
            <div>
              <TextField
                hintText="Designation"
                floatingLabelText="Designation"
                floatingLabelStyle={styles.floatingLabelStyle}
                underlineFocusStyle={styles.underlineStyle}
                value={this.state.designation}
                onChange={this.handleDesignationChange}
              />
            </div>
            <div>
              <TextField
                hintText="Location"
                floatingLabelText="Location"
                floatingLabelStyle={styles.floatingLabelStyle}
                underlineFocusStyle={styles.underlineStyle}
                value={this.state.location}
                onChange={this.handleLocationChange}
              />
            </div>
            <div>
              <TextField
                hintText="Basic Salary"
                floatingLabelText="Basic Salary"
                floatingLabelStyle={styles.floatingLabelStyle}
                underlineFocusStyle={styles.underlineStyle}
                type="number"
                value={this.state.basicSalary}
                onChange={this.handleBasicSalaryChange}
              />
            </div>
            <Paper
              style={{ marginTop: "20px", width: "90%" }}
              zDepth={1}
              rounded={false}
            >
              <List>
                {this.props.employeeData.map((empData, index) =>
                  empData.joiningDate !== undefined ? (
                    <ListItem
                      key={index}
                      leftAvatar={<Avatar src={empData.photoURL} size={30} />}
                      primaryText={empData.displayName}
                      secondaryText={moment(
                        empData.joiningDate.seconds * 1000
                      ).format("ll")}
                    />
                  ) : null
                )}
              </List>
            </Paper>

            <div
              style={{
                display: "flex",
                bottom: "0px",
                position: "absolute",
                width: "100%",
                height: "7vh"
              }}
            >
              <FlatButton
                style={{
                  color: "white",
                  backgroundColor: "#f08f4c",
                  width: "100%",
                  position: "fixed",
                  bottom: 0
                }}
                label="SAVE"
                onClick={this.saveData}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default withRouter(AddEmployee);
