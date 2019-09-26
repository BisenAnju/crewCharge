import React from "react";
import Layout from "../layouts/Layout";
import { Avatar, CircularProgress, List, ListItem, Divider } from "material-ui";
import { ImagePictureAsPdf } from "material-ui/svg-icons";
import moment from "moment";


class PayrollDateCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: [],
      expanded: false,
      monthYear: []
    };
  }

  componentWillMount() {
    const currentUser = this.props.userData.find(
      user => user.uid === this.props.match.params.id
    );
    this.setState({
      currentUser
    });
  }
  componentWillReceiveProps(nextProps) {
    const currentUser = nextProps.userData.find(
      user => user.uid === this.props.match.params.id
    );

    this.setState({
      currentUser
    });
  }
  render() {

    return (
      <Layout navigationTitle="Payroll" showBackNavigation={true}>
        <div
          style={{
            height: "calc(100vh - 80px)",
            overflow: "scroll",
            paddingBottom: "5px"
          }}
        >
          <div style={{ padding: "5%" }}>
            <List>
              {this.props.isLoading ? (
                <center>
                  <CircularProgress />
                </center>
              ) : this.state.currentUser.payroll === undefined ? <div style={{ margin: "33px 0px 0px 42px", fontSize: "1.2em", color: "#061e4a" }}> <p>No salary slip available yet...</p> </div> : (
                this.state.currentUser.payroll.map((item, index) => {

                  return (
                    <div key={index}>
                      <ListItem
                        disabled
                        leftAvatar={
                          <Avatar
                            style={{ fontSize: "13px", fontWeight: "bold" }}
                          >
                            {moment(item.date.seconds * 1000).format("MMM")}
                          </Avatar>
                        }
                        primaryText={item.designation}
                        rightIcon={
                          <ImagePictureAsPdf
                            style={{ fill: "rgb(214, 17, 17)" }}
                            onClick={() => {
                              this.props.history.push(
                                "/payroll/" +
                                moment(item.date.seconds * 1000).format(
                                  "ll"
                                ) +
                                "/" +
                                this.state.currentUser.uid
                              );
                            }}
                          />
                        }
                        secondaryText={moment(item.date.seconds * 1000).format(
                          "ll"
                        )}
                      />
                      <Divider inset={true} />
                    </div>
                  );
                })
              )}
            </List>
          </div>
        </div>
      </Layout>
    );
  }
}
export default PayrollDateCard;
