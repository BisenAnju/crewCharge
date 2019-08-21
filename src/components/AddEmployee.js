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
  Avatar
} from "material-ui";
import moment from "moment";

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeName: null,
      joiningDate: null
    };
  }
  selectChange = (event, index, employeeName) => {
    this.setState({
      employeeName
    });
  };
  changeJoiningDate = (event, date) => {
    this.setState({
      joiningDate: date
    });
  };
  saveData = e => {
    e.preventDefault();
    this.props.userJoiningDate({ ...this.state });
  };
  render() {
    return (
      <Layout navigationTitle="Add Employee" showBackNavigation={true}>
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
          <div style={{ marginTop: "20px" }}>
            <DatePicker
              hintText="Joining Date"
              autoOk
              formatDate={date => moment(date).format("DD/MM/YYYY")}
              value={this.state.joiningDate}
              onChange={this.changeJoiningDate}
            />
          </div>

          <Paper
            style={{ marginTop: "15px", width: "90%" }}
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
                width: "100%"
              }}
              label="SAVE"
              onClick={this.saveData}
            />
          </div>
        </div>
      </Layout>
    );
  }
}
export default withRouter(AddEmployee);
