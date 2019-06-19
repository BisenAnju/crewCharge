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
  TableHeaderColumn
} from "material-ui";

class Widgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widgetList: [],
      wiqlWorkItemsList: [],
      wiqlList: [],
      teamList: [],
      wiqlWorkItem: [],
      isLoading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      widgetList: nextProps.widgetList,
      wiqlWorkItemsList: nextProps.wiqlWorkItemsList,
      wiqlList: nextProps.wiqlList,
      teamList: nextProps.teamList,
      isLoading: nextProps.isLoading,
      wiqlWorkItem: nextProps.wiqlWorkItem
    });
  }

  render() {
    console.log("widgets component props");
    console.log(this.props);
    console.log("widgets component state");
    console.log(this.state);

    return this.state.isLoading ? (
      <h2>loading...</h2>
    ) : (
      <div id="listOfWidgets">
        <h3>
          Widgets:
          {this.state.widgetList.length > 0 ? (
            this.state.widgetList[0].length
          ) : (
            <div>No widgets found</div>
          )}
        </h3>
        {this.state.widgetList.map(widget =>
          widget.map((item, index) => (
            <div id="widget" key={index}>
              <Card style={cardStyle}>
                <CardHeader title={item.name} />
                <CardText
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "0 20px"
                  }}
                >
                  {this.state.wiqlWorkItemsList.map((workItem, index) => (
                    <Table selectable={false} key={index}>
                      <TableHeader>
                        <TableRow>
                          {index === 0
                            ? workItem.columns.map(column => (
                                <TableHeaderColumn key={index}>
                                  {column.name}
                                </TableHeaderColumn>
                              ))
                            : null}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableRowColumn />
                          <TableRowColumn>data</TableRowColumn>
                          <TableRowColumn>
                            {this.state.wiqlWorkItem.length}
                          </TableRowColumn>
                          <TableRowColumn>data</TableRowColumn>
                        </TableRow>
                      </TableBody>
                    </Table>
                  ))}
                </CardText>
              </Card>
            </div>
          ))
        )}
      </div>
    );
  }
}
export default withRouter(Widgets);
