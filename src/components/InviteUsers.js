import React, { Component } from "react";
import { RaisedButton, TextField, } from "material-ui";
const styles = {
    underlineStyle: {
        borderColor: "#f08f4c"
    },
    floatingLabelStyle: {
        color: "#f08f4c"
    }
};
class InviteUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: ""
        };
    }
    handleName = (e, name) => {
        this.setState({ name });
    };
    handleEmail = (e, email) => {
        this.setState({ email });
    };
    inviteUser = e => {
        e.preventDefault();
        this.props.sendLink({ ...this.state });
        this.setState({ email: "", name: "" })
    }
    render() {
        return (
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
                    <TextField
                        hintText="Enter Name"
                        floatingLabelText="Enter Name"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        underlineFocusStyle={styles.underlineStyle}
                        value={this.state.name}
                        onChange={this.handleName}
                    />
                </div>
                <div>
                    <TextField
                        hintText="Enter Email"
                        floatingLabelText="Enter Email"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        underlineFocusStyle={styles.underlineStyle}
                        value={this.state.email}
                        onChange={this.handleEmail}
                    />
                </div>
                <div style={{ margin: "20px 0 20px 0" }}>
                    <RaisedButton
                        label="Invite"
                        backgroundColor="#fd914d"
                        labelColor="white"
                        onClick={this.inviteUser}
                    />
                </div>
            </div>
        );
    }
}
export default InviteUsers;
