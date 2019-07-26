import React from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import TeamAllocationProjectList from "./TeamAllocationProjectList";
import TeamAllocationPeopleList from "./TeamAllocationPeoplesList";
import SwipeableViews from "react-swipeable-views";
import withFirebase from "../hoc/withFirebase";
import ProjectMissionList from "./ProjectMissionList";
class TeamAllocationMissionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      massage: null,
      slideIndex: 0
    };
  }
  handleChange = value => {
    this.setState({
      slideIndex: value
    });
  };
  componentWillMount() {
    this.setState({ slideIndex: this.props.index });
  }
  render() {
    return (
      <Layout navigationTitle="Projects Allocation" showBackNavigation={true}>
        <Tabs
          value={this.state.slideIndex}
          onChange={this.handleChange}
          tabItemContainerStyle={{ backgroundColor: "transparent" }}
          inkBarStyle={{ backgroundColor: "#f08f4c" }}
        >
          <Tab label="Peoples List" style={{ color: "#f08f4c" }} value={0} />
          <Tab label="Project List" style={{ color: "#f08f4c" }} value={1} />
          <Tab label="Manage" style={{ color: "#f08f4c" }} value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <TeamAllocationPeopleList {...this.props} />
          <TeamAllocationProjectList {...this.props} />
          <ProjectMissionList
            {...this.props}
            handleArchiveProjectChange={this.props.handleArchiveProjectChange}
            handleArchiveMissionChange={this.props.handleArchiveMissionChange}
          />
        </SwipeableViews>
      </Layout>
    );
  }
}
export default withRouter(withFirebase(TeamAllocationMissionList));
