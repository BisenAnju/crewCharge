import React, { Component } from "react";
import axios from "axios";
import Projects from "../components/Projects";
import { CircularProgress } from "material-ui";
import WidgetsContainer from "./Widgets";
import WidgetsContainer1 from "./Widgets1";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const PAT = `Basic OjNzaGd2NzVwYWNqd3l4Y3o1NmJ3cG9nY3phMjczaHFqaXNmcWMyYXFlbzRpMmhlNzR4YnE=`;
const headers = {
  headers: {
    Authorization: PAT
  }
};

let teamListData = null;
let projectListData = null;

class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamList: [],
      projectList: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    try {
      const [teamList, projectList] = await Promise.all([
        axios.get(
          `https://dev.azure.com/smilebots/_apis/teams?api-version=5.0-preview`,
          headers
        ),
        axios.get(
          "https://dev.azure.com/smilebots/_apis/projects?api-version=5.1-preview.2",
          headers
        )
      ]);
      teamListData = teamList.data;
      projectListData = projectList.data;
      this.setState({
        teamList: teamListData,
        projectList: projectListData,
        isLoading: false
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleWidgets = () => {
    console.log("Widgets clicked");
    return <WidgetsContainer />;
  };

  render() {
    return this.state.isLoading ? (
      <center>
        <CircularProgress />
      </center>
    ) : (
      <Router>
        <Switch>
          <Route
            exact
            path="/projects"
            render={props => (
              <Projects
                {...props}
                {...this.state}
                handleWidgets={this.handleWidgets}
              />
            )}
          />
          <Route
            exact
            path="/projects/:projectId/widgets"
            render={props => <WidgetsContainer {...props} {...this.state} />}
          />
          <Route
            exact
            path="/projects/:projectId/widgets1"
            render={props => <WidgetsContainer1 {...props} {...this.state} />}
          />
        </Switch>
      </Router>
    );
  }
}
export { headers, teamListData, projectListData };
export default ProjectsContainer;
