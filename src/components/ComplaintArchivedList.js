import React from "react";
import { withRouter } from "react-router-dom";
import { IconButton, Card, CardText, List, ListItem } from "material-ui";
import UnArchived from "material-ui/svg-icons/content/unarchive";

class ComplaintArchivedList extends React.Component {
  render() {
    return (
      <Card
        style={{
          paddingBottom: "42%",
          boxShadow: "0px",
          overflowX: "hidden",
          Height: "-webkit-fill-available"
        }}
      >
        {/* <div style={{ display: "flex", flexdirection: "column" }}>
          <DatePicker
            hintText="From date"
            style={{
              marginRight: "10%",
              marginLeft: "10%",
              width: "30%"
            }}
          />
          <DatePicker
            hintText="To date"
            style={{
              marginRight: "10%",
              marginLeft: "10%",
              width: "30%"
            }}
          />
        </div> */}
        <CardText style={{ padding: "0%" }}>
          <div>
            <List>
              <div
                style={{
                  height: "-webkit-fill-available",
                  overflowX: "scroll"
                }}
              >
                {this.props.listData.map((doc, index) => {
                  if (doc.adminRemark !== undefined) {
                    return (
                      <ListItem
                        key={index}
                        onClick={() =>
                          this.props.history.push("/complaintview/" + doc.id)
                        }
                        leftAvatar={<Avatar src={this.props.logo} />}
                        rightIconButton={
                          <IconButton
                            onClick={e => {
                              e.preventDefault();
                              this.props.unarchive(doc.id);
                            }}
                          >
                            <UnArchived />
                          </IconButton>
                        }
                        primaryText={doc.complaintType}
                        secondaryText={doc.description}
                      />
                    );
                  } else {
                    return (
                      <ListItem
                        style={{
                          borderLeft: "3px solid rgb(29, 188, 212)",
                          fontWeight: "bold"
                        }}
                        key={index}
                        onClick={() =>
                          this.props.history.push("/complaintview/" + doc.id)
                        }
                        leftAvatar={<Avatar src={this.props.logo} />}
                        rightIconButton={
                          <IconButton
                            onClick={e => {
                              e.preventDefault();
                              this.props.unarchive(doc.id);
                            }}
                          >
                            <UnArchived />
                          </IconButton>
                        }
                        primaryText={doc.complaintType}
                        secondaryText={doc.description}
                      />
                    );
                  }
                })}
              </div>
            </List>
          </div>
        </CardText>
      </Card>
    );
  }
}
export default withRouter(ComplaintArchivedList);
