import React from "react";
import { withRouter } from "react-router-dom";
import NavigationBarContainers from "../containers/NavigationBar";
import "../styles/style.css";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handelAppbartogel = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { children } = this.props;
    return (
      <div
        style={
          {
            // backgroundImage: ' url("' + BG + '")',
            // height: "-webkit-fill-available",
            // backgroundPosition: "unset",
            // backgroundSize: "cover"
          }
        }
      >
        <NavigationBarContainers
          navigationTitle={this.props.navigationTitle}
          showBackNavigation={this.props.showBackNavigation}
        />
        <div
          style={{
            width: "100%",
            position: "fixed",
            backgroundColor: "rgba(242, 243, 242, 0.5)",
            minHeight: "100vh"
          }}
        >
          <div style={{ height: "70px" }} />
          {children}
        </div>
      </div>
    );
  }
}
export default withRouter(Layout);
