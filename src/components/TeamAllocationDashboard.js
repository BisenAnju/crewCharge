import React from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import SwipeableViews from "react-swipeable-views";
import TeamAllocationPeopleList from "./TeamAllocationPeoplesList";
class TeamAllocationDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    };
  }
  handleChange = value => {
    this.setState({
      slideIndex: value
    });
  };

  render() {
    return (
      <div>
        <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
          <Tab label="Tab One" value={0} />
          <Tab label="Tab Two" value={1} />
          <Tab label="Tab Three" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <TeamAllocationPeopleList />
          </div>
          <div>slide n°2</div>
          <div>slide n°3</div>
        </SwipeableViews>
      </div>
    );
  }
}
export default withRouter(TeamAllocationDashboard);
