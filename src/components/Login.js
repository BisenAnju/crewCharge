import React, { Component } from "react";
import withUser from "../hoc/withUser";
import { withRouter } from "react-router-dom";
import { AppBar, RaisedButton } from "material-ui";
import { lightGreen800, lightGreen400 } from "material-ui/styles/colors";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null
    };
  }

  componentDidMount() {
    const isLoad = localStorage.getItem("isLoading");
    this.setState({
      isLoading: isLoad
    });
  }
  render() {
    return (
      <div>
        <AppBar
          titleStyle={{ fontSize: "18px", textAlign: "center" }}
          title="Sign In"
          style={{ backgroundColor: lightGreen400 }}
        />
        <div
          style={{
            marginTop: "100px",
            display: "grid",
            justifyContent: "center"
          }}
        >
          {/* {this.state.isLoading ? (
            <CircularProgress />
          ) : ( */}
          <div>
            <div
              id="welcome"
              style={{ fontSize: "22px", color: lightGreen800 }}
            >
              Sign In using your Google account
            </div>
            <div style={{ textAlign: "center", margin: "20px 20px" }}>
              <RaisedButton
                label="Sign In"
                labelColor="white"
                backgroundColor={lightGreen800}
                onClick={e => {
                  e.preventDefault();
                  this.props.login();
                  this.props.handleLoader();
                }}
              />
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
    );
  }
}

export default withRouter(withUser(Login));
