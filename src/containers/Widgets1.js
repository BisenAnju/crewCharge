import React, { Component } from "react";
import Widgets from "../components/Widgets";
import axios from "axios";
import { headers, teamListData, projectListData } from "./Projects";
import { withRouter } from "react-router-dom";
import { CircularProgress } from "material-ui";
class WidgetsContainer1 extends Component {
  // Dashboard List GET https://dev.azure.com/{organization}/{project}/{team}/_apis/dashboard/dashboards?api-version=5.0-preview.2
  //Dashboard GET https://dev.azure.com/smilebots/LokusNews/{team}/_apis/dashboard/dashboards/{dashboardId}?api-version=5.0-preview.2
  //Team List https://dev.azure.com/smilebots/_apis/teams?api-version=5.0-preview
  //Wiql https://dev.azure.com/smilebots/a54486bc-eb07-444f-ab8b-f16202416e5f/2e5a85d0-5b65-472d-96ef-15f573951d5e/_apis/wit/wiql/94e929f3-a2f7-437d-99dc-438ca76a2ba6?api-version=5.0
  //Queries List https://dev.azure.com/smilebots/a54486bc-eb07-444f-ab8b-f16202416e5f/_apis/wit/queries?$depth=2&api-version=5.0
  //  this.props.match.param.projectId

  constructor(props) {
    super(props);
    this.state = {
      wiqlWorkItemsList: [],
      wiqlWorkItem: [],
      wiqlList: [],
      teamList: [],
      widgetList: [],
      isLoading: true
    };
  }
  async componentWillMount() {
    try {
      const DashboardArray = [];
      teamListData.value.map(team =>
        //console.log(data)
        {
          if (team.projectId === this.props.match.params.projectId) {
            let dashboardsListAPI = `https://dev.azure.com/smilebots/${
              this.props.match.params.projectId
            }/${team.id}/_apis/dashboard/dashboards?api-version=5.0-preview.2`;
            const DashboardData = Promise.all(
              axios.get(dashboardsListAPI, headers)
            );
            DashboardArray.push(DashboardData);
          }
        }, console.log(DashboardArray));
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    console.log("widgets containers props");
    console.log(this.props);
    return this.state.isLoading ? (
      <center>
        <CircularProgress />
      </center>
    ) : (
      <div>
        <Widgets {...this.state} />
      </div>
    );
  }
}

export default withRouter(WidgetsContainer1);
