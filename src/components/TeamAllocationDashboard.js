import React from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import * as moment from "moment";
import SwipeableViews from "react-swipeable-views";
import TeamAllocationPeopleList from "./TeamAllocationPeoplesList";
import TeamAllocationProjectList from "./TeamAllocationProjectList";
import TeamAllocationMissionList from "./TeamAllocationMissionList";
import { withRouter } from "react-router-dom";
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
  componentWillReceiveProps(nextProps) {
    this.setState({
      leavesList: nextProps.leavesList,
      missionsList: nextProps.missionsList,
      projectsList: nextProps.projectsList,
      usersList: nextProps.usersList,
      nowDate: moment(Date()).format("LL")
    });
    console.log(nextProps.usersList);
  }
  render() {
    return (
      <div>
        <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
          <Tab label="Peoples List" value={0} />
          <Tab label="Projects List" value={1} />
          <Tab label="Management" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <TeamAllocationPeopleList {...this.props} {...this.state} />
          </div>
          <div>
            {" "}
            <TeamAllocationProjectList {...this.props} {...this.state} />
          </div>
          <div>
            {" "}
            <TeamAllocationMissionList {...this.props} {...this.state} />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}
export default withRouter(TeamAllocationDashboard);
