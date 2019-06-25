import React, { Component } from "react";
import { cardStyle } from "./Projects";
import { withRouter } from "react-router-dom";
import {
  CardText,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
  CircularProgress
} from "material-ui";
import Layout from "../layouts/Layout";

class Widgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widgetList: [],
      workItemsList: [],
      columns: [],
      isLoading: true
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 3000);
  }

  // componentDidMount() {
  //   console.log("will mount");
  //   if (this.props.widgetList.length > 0) {
  //     this.setState({
  //       isLoading: false
  //     });
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    console.log("will receive");
    if (nextProps.widgetList !== this.props.widgetList)
      this.setState({
        isLoading: nextProps.isLoading,
        widgetList: nextProps.widgetList,
        workItemsList: nextProps.workItemsList,
        columns: nextProps.columns
      });
  }

  render() {
    console.log("widgets component props");
    console.log(this.props);

    return (
      <Layout navigationTitle="Widgets" showBackNavigation={true}>
        {this.state.isLoading ? (
          <center>
            <CircularProgress />
          </center>
        ) : (
          <div
            style={{
              height: "90vh",
              overflow: "auto",
              display: "self"
            }}
            id="listOfWidgets"
          >
            <h3>
              Widgets:
              {this.state.widgetList.length > 0 ? (
                this.state.widgetList[0].length
              ) : (
                <div>No widgets found</div>
              )}
            </h3>
            {this.state.widgetList.map((widgets, widgetListIndex) => {
              return widgets.map((widget, widgetIndex) => {
                if (widget.settings.length > 127) {
                  //counter++;
                  return (
                    <div id="widget" key={widgetIndex}>
                      <Card style={cardStyle}>
                        <CardHeader title={widget.name} />
                        <CardText
                          style={{
                            display: "flex",
                            margin: "0 20px"
                          }}
                        >
                          {this.state.columns.map((column, columnIndex) => {
                            console.log(widgetIndex);
                            console.log(columnIndex);
                            if (widgetIndex === columnIndex) {
                              return column.map(col => {
                                return (
                                  <div style={{ margin: "0 10px" }}>
                                    {col.name}
                                  </div>
                                );
                              });
                            } else {
                              console.log("index not matched");
                            }
                          })}
                        </CardText>
                      </Card>
                    </div>
                  );
                }
              });
            })}
          </div>
        )}
      </Layout>
    );
  }
}
export default withRouter(Widgets);
