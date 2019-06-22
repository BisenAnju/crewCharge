import React from "react";
import { withRouter } from "react-router-dom";
import NavigationBarContainers from "../containers/NavigationBar";
import "../styles/style.css";
import BG from "../images/bg.jpg";

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
        {children}
      </div>
    );
  }
}
export default withRouter(Layout);
