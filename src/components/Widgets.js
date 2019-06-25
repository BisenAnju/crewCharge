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
        widgetList: nextProps.widgetList
      });
  }

  render() {
    console.log("widgets component props");
    console.log(this.props);

    return (
      <Layout navigationTitle="Widgets" showBackNavigation={true}>
        this.state.isLoading ? (
        <center>
          <CircularProgress />
        </center>
        ) : (
        <div id="listOfWidgets">
          <h3>
            Widgets:
            {this.props.widgetList ? (
              this.props.widgetList.length
            ) : (
              <div>No widgets found</div>
            )}
          </h3>
          {this.props.widgetList.map(widget =>
            widget.map((item, widgetIndex) => (
              <div id="widget" key={widgetIndex}>
                <Card style={cardStyle}>
                  <CardHeader title={item.name} />
                  <CardText
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      margin: "0 20px"
                    }}
                  >
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHeaderColumn>ID</TableHeaderColumn>
                          <TableHeaderColumn>Name</TableHeaderColumn>
                          <TableHeaderColumn>Status</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {this.props.workItemsList.map((w, workItemIndex) => {
                          return widgetIndex === workItemIndex ? (
                            <TableRow>
                              {w.map(item => (
                                <TableRowColumn>data</TableRowColumn>
                              ))}
                            </TableRow>
                          ) : null;
                        })}
                      </TableBody>
                    </Table>
                  </CardText>
                </Card>
              </div>
            ))
          )}
        </div>
        );
      </Layout>
    );
  }
}
export default withRouter(Widgets);
