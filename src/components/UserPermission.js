import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  Checkbox,
  RaisedButton,
  Paper
} from "material-ui";
import Layout from "../layouts/Layout";
// const access = {
//   leave: false,
//   complaint: false,
//   teamAllocation: false
// };
const allKeys = [
  { name: "leave", label: "Leave Mgmnt" },
  { name: "complaint", label: "Complaint Mgmnt" },
  { name: "teamAllocation", label: "Team Allocation" }
];

const style = {
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};
class UserPermission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allKeys,
      access: []
    };
  }
  componentWillMount() {
    const userAccess = this.props.userData.find(
      user => user.uid === this.props.match.params.id
    ).access;
    this.setState({ access: userAccess });
  }
  handleReadCheck = name => {
    const access = this.state.access;
    access[name] = this.state.access[name] ? false : true;
    this.setState({ access });
  };
  handleSave = () => {
    const singleUser = this.props.userData.find(
      data => data.uid === this.props.match.params.id
    );
    this.props.updateRole(this.state.access, singleUser);
  };
  render() {
    return (
      <Layout navigationTitle="User Permission" showBackNavigation={true}>
        <Paper zDepth={1} style={style} rounded={false}>
          <Table selectable="false">
            <TableBody displayRowCheckbox={false}>
              {this.state.allKeys.map((singleKey, index) => (
                <TableRow selectable={false} key={index}>
                  <TableRowColumn>{singleKey.label}</TableRowColumn>
                  <TableRowColumn>
                    <Checkbox
                      checked={this.state.access[singleKey.name]}
                      onCheck={() => {
                        this.handleReadCheck(singleKey.name);
                      }}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <center>
          <RaisedButton
            label="Save"
            labelColor="white"
            backgroundColor="rgb(253, 145, 77)"
            onClick={this.handleSave}
            style={{ width: "50%" }}
          />
        </center>
      </Layout>
    );
  }
}
export default withRouter(UserPermission);
