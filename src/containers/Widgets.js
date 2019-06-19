import React, { Component } from "react";
import Widgets from "../components/Widgets";
import axios from "axios";
import { headers } from "./Projects";
import { withRouter } from "react-router-dom";
class WidgetsContainer extends Component {
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
  componentDidMount() {
    const getWidgets = () => {
      axios
        .get(
          `https://dev.azure.com/smilebots/_apis/teams?api-version=5.0-preview`,
          headers
        )
        .then(response => {
          // console.log("response gives teamList");
          // console.log(response.data.value);
          this.setState({
            teamList: response.data.value
          });

          // console.log("teamList from state");
          // console.log(this.state.teamList);
          this.state.teamList.map(team => {
            if (team.projectId === this.props.match.params.projectId) {
              let dashboardsListAPI = `https://dev.azure.com/smilebots/${
                this.props.match.params.projectId
              }/${
                team.id
              }/_apis/dashboard/dashboards?api-version=5.0-preview.2`;
              //  console.log(dashboardsListAPI);
              axios.get(dashboardsListAPI, headers).then(response => {
                // console.log("Dashboard List");
                // console.log(response.data.dashboardEntries);

                if (response.data.dashboardEntries.length > 0) {
                  const widgetListArray = [];
                  response.data.dashboardEntries.map(dashboard => {
                    axios.get(dashboard.url, headers).then(response => {
                      if (response.data.widgets.length > 0) {
                        // console.log("widgets list");
                        // console.log(response.data.widgets.length);
                        const widgets = response.data.widgets;
                        widgetListArray.push(widgets);
                      }
                    });
                  });
                  // console.log("final array after all push");
                  // console.log(widgetListArray);

                  this.setState({ widgetList: widgetListArray });
                  // console.log("widget list from state");
                  // console.log(this.state.widgetList);
                }
              });

              // https://dev.azure.com/smilebots/Project%20S/_apis/wit/queries?$depth=2&api-version=5.0

              let queriesListAPI = `https://dev.azure.com/smilebots/${
                this.props.match.params.projectId
              }/_apis/wit/queries?$depth=2&api-version=5.0`;
              //console.log(queriesListAPI);
              axios.get(queriesListAPI, headers).then(response => {
                // console.log(response.data);
                // console.log(
                //   response.data.value[1].children[0]._links.wiql.href
                // );
                const wiqlArray = [];
                response.data.value.map(query => {
                  if (query.children.length > 0)
                    query.children.map(child => {
                      //console.log(child._links.wiql.href);
                      wiqlArray.push(child._links.wiql.href);
                    });
                });
                this.setState({
                  wiqlList: wiqlArray
                });
                const wiqlWorkItemsListArray = [];
                this.state.wiqlList.map(wiql => {
                  axios.get(wiql, headers).then(response => {
                    // console.log("response from wiql");
                    // console.log(response.data);
                    wiqlWorkItemsListArray.push(response.data);
                  });
                });
                this.setState({ wiqlWorkItemsList: wiqlWorkItemsListArray });
                //console.log("work items list from state");
                //console.log(this.state.wiqlWorkItemsList);
                setTimeout(() => {
                  if (
                    this.state.wiqlWorkItemsList.length > 0 &&
                    this.state.wiqlWorkItemsList[0]
                  ) {
                    const workItemArray = [];
                    this.state.wiqlWorkItemsList.map(workItem => {
                      workItem.workItems.map(workItemUrl => {
                        let workItemAPI = workItemUrl.url;
                        // console.log("workItemAPI");
                        // console.log(workItemAPI);
                        axios.get(workItemAPI, headers).then(response => {
                          // console.log("workItem details");
                          // console.log(response.data);
                          workItemArray.push(response.data);
                        });
                      });
                    });
                    this.setState({
                      wiqlWorkItem: workItemArray
                    });
                    // console.log("work item from state");
                    // console.log(this.state.wiqlWorkItem);
                  }
                }, 1000);
              });
            }
          });
        })
        .catch(error => {
          this.setState({ error, isLoading: true });
          console.log("something went wrong");
        });
    };
    axios.all([getWidgets()]).then(
      this.setState({ isLoading: false })
      //console.log(this.state.isLoading)
    );
  }

  render() {
    // console.log("widgets containers props");
    // console.log(this.props);
    return this.state.isLoading ? (
      <h2>loading...</h2>
    ) : (
      <div>
        <Widgets {...this.state} />
      </div>
    );
  }
}

export default withRouter(WidgetsContainer);
