import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import { withRouter } from "react-router-dom";
import { Card, CardHeader, CardText, CardActions } from "material-ui/Card";
import Layout from "../layouts/Layout";

const cardStyle = {
  width: "90%",
  margin: `20px`,
  textAlign: "justify",
  display: "inline-block"
};

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    console.log("dashboard component props");
    console.log(this.props);
    return (
      <React.Fragment>
        <Layout navigationTitle="Projects" showBackNavigation={true}>
          <div id="listOfProjects">
            <h3>Projects: {this.props.projectList.count}</h3>
            {this.props.projectList.count > 0 &&
              this.props.projectList.value.map((project, index) => {
                return (
                  <div id="project" key={index}>
                    <Card style={cardStyle}>
                      <CardHeader
                        title={project.name}
                        avatar="https://dev.azure.com/smilebots/_apis/GraphProfile/MemberAvatars/beed249d-6e47-418c-b4f5-f8ce61d5ae61"
                      />
                      <CardText>
                        {project.description ? (
                          <div>
                            <p>Description</p>
                            <h5>{project.description}</h5>
                          </div>
                        ) : null}
                      </CardText>
                      <CardActions>
                        {/* <FlatButton label="WorkItems" primary={true} /> */}
                        <FlatButton
                          label="Widgets"
                          primary={true}
                          onClick={e => {
                            e.preventDefault();
                            this.props.handleWidgets();
                            this.props.history.push(
                              `/projects/${project.id}/widgets/`,
                              this.props.teamListData,
                              this.props.projectListData
                            );
                          }}
                        />
                      </CardActions>
                    </Card>
                  </div>
                );
              })}
          </div>
        </Layout>
      </React.Fragment>
    );
  }
}

export { cardStyle };
export default withRouter(Projects);
