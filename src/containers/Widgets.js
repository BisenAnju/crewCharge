import React, { Component } from "react";
import Widgets from "../components/Widgets";
import axios from "axios";
import { headers } from "./Projects";
import { withRouter } from "react-router-dom";
import { CircularProgress } from "material-ui";
import { promises } from "fs";
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
      workItemsList: null,
      widgetList: null,
      columns: null,
      isLoading: true
    };
  }
  async componentDidMount() {
    let workItemArray = [];
    let widgetsArray = [];
    let columnsArray = [];
    const getWidgets = async () => {
      const filteredTeam = this.props.teamList.value.filter(team => {
        return this.props.match.params.projectId === team.projectId;
      });
      // console.log("filtered team");
      // console.log(filteredTeam);
      const dashboardsPromise = filteredTeam.map(async fteam => {
        let dashboardsListAPI = `https://dev.azure.com/smilebots/${
          this.props.match.params.projectId
        }/${fteam.id}/_apis/dashboard/dashboards?api-version=5.0-preview.2`;
        //console.log(dashboardsListAPI);
        const response = await axios.get(dashboardsListAPI, headers);
        return response.data;
      });

      const dashboardsPromises = Promise.all(dashboardsPromise);

      dashboardsPromises.then(dashboardsPromisesResponse => {
        // console.log("dashboard list data");
        // console.log(dashboardsPromisesResponse);
        return dashboardsPromisesResponse.map(
          dashboardsPromisesResponseItem => {
            // console.log("dashboardEntries");
            // console.log(dashboardsPromisesResponseItem.dashboardEntries);
            const dashboardEntriesPromise = dashboardsPromisesResponseItem.dashboardEntries.map(
              async element => {
                // console.log("dashboard entries url");
                // console.log(element.url);
                const response = await axios.get(element.url, headers);
                return response.data;
              }
            );
            const dashboardEntriesPromises = Promise.all(
              dashboardEntriesPromise
            );

            dashboardEntriesPromises.then(dashboardEntriesPromisesResponse => {
              // console.log("dashboardEntriesPromises");
              // console.log(dashboardEntriesPromisesResponse);
              dashboardEntriesPromisesResponse.map(widgetsItem => {
                if (widgetsItem.widgets.length > 0) {
                  // console.log("widgets");
                  // console.log(widgetsItem.widgets);
                  widgetsArray.push(widgetsItem.widgets);
                } else {
                  //           console.log("widgets length=0");
                }
              });
            });
          }
        );
      });
    };

    const getWorkItems = async () => {
      const queryListApi = `https://dev.azure.com/smilebots/${
        this.props.match.params.projectId
      }/_apis/wit/queries?$depth=2&api-version=5.0`;
      console.log(queryListApi);
      const queryListResponse = await axios.get(queryListApi, headers);
      //console.log(queryListResponse.data.value);
      queryListResponse.data.value.map(async query => {
        if (query.path === "Shared Queries" && query.children.length > 0) {
          const queryListResponsePromise = query.children.map(async child => {
            const response = await axios.get(child.url, headers);
            return response.data;
          });
          const queryListResponsePromises = await Promise.all(
            queryListResponsePromise
          );
          //console.log(queryListResponsePromises);
          const wiqlListPromise = queryListResponsePromises.map(async item => {
            console.log(item._links.wiql.href);
            const wiqlListResponse = await axios.get(
              item._links.wiql.href,
              headers
            );
            return wiqlListResponse.data;
          });
          const wiqlListPromises = Promise.all(wiqlListPromise);
          wiqlListPromises.then(results => {
            //console.log(results);

            results.map(result => {
              columnsArray.push(result.columns);
              if (result.workItems.length > 0) {
                const workItemListPromise = result.workItems.map(async item => {
                  const workItemListResponse = await axios.get(
                    item.url,
                    headers
                  );
                  return workItemListResponse.data;
                });
                const workItemListPromises = Promise.all(workItemListPromise);
                //console.log("workItemListPromises");
                workItemListPromises.then(workItemList => {
                  workItemArray.push(workItemList);
                });
              }
            });
          });
        }
      });
    };

    // console.log(workItemArray);
    // console.log(widgetsArray);

    await Promise.all([getWidgets(), getWorkItems()])
      .then(() => {
        this.setState({
          isLoading: false,
          widgetList: widgetsArray,
          workItemsList: workItemArray,
          columns: columnsArray
        });
        //console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    // console.log("widgets containers props");
    // console.log(this.props);
    return (
      <div>
        <Widgets {...this.state} />
      </div>
    );
  }
}

export default withRouter(WidgetsContainer);
