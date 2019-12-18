import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  SelectField,
  MenuItem,
  DatePicker,
  RaisedButton,
  TextField,
} from "material-ui";
import moment from "moment";
const styles = {
  underlineStyle: {
    borderColor: "#f08f4c"
  },
  floatingLabelStyle: {
    color: "#f08f4c"
  }
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
    let empdata = this.props.userData.find(
      data => data.uid === employeeName
    );
    this.setState({
      employeeName,
      empName: empdata.displayName
    });
  };
  changeJoiningDate = (event, date) => {
    this.setState({
      joiningDate: date
    });
  };
  handleNameChange = (e, name) => {
    this.setState({ empName: name });
  };
  handleDesignationChange = (e, designation) => {
    this.setState({ designation: designation });
  };
  handleLocationChange = (e, location) => {
    this.setState({ location: location });
  };
  handleBasicSalaryChange = (e, basicSalary) => {
    this.setState({ basicSalary: parseInt(basicSalary, 10) });
  };

  saveData = e => {
    e.preventDefault();
    this.props.userJoiningDate({ ...this.state });
  };
  render() {
    return (
      // <Layout navigationTitle="Add Employee" showBackNavigation={true}>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center"
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
            {this.props.userData.map((data, index) => data.joiningDate === undefined ? (
              <MenuItem
                key={index}
                value={data.uid}
                primaryText={data.displayName}
              />
            ) : null)}
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
            floatingLabelText="Joining Date"
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
        {/* <div>
              <TextField
                hintText="Location"
                floatingLabelText="Location"
                floatingLabelStyle={styles.floatingLabelStyle}
                underlineFocusStyle={styles.underlineStyle}
                value={this.state.location}
                onChange={this.handleLocationChange}
              />
            </div> */}
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

        <div style={{ margin: "20px 0 20px 0" }}>
          <RaisedButton
            label="SAVE"
            backgroundColor="#fd914d"
            labelColor="white"
            onClick={this.saveData}
          />
        </div>

        {/* <Paper
            style={{ marginTop: "20px", width: "90%" }}
            zDepth={1}
            rounded={false}
          >
            <List>
              {this.props.userData.map((empData, index) =>
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
          </Paper> */}



      </div>

      // </Layout>
    );
  }
}
export default withRouter(AddEmployee);
