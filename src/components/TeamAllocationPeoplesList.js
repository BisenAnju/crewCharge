import React from "react";
import {
  List,
  ListItem,
  MenuItem,
  SelectField,
  Avatar,
  Divider
} from "material-ui";
import Layout from "../layouts/Layout";
import { withRouter } from "react-router-dom";
import * as moment from "moment";
import ReactWeeklyDayPicker from "./WeeklyDayPicker";
import { grey300 } from "material-ui/styles/colors";
import { classNames } from "../constants/weeklydaypicker";
class TeamAllocationPeopleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      open: false,
      usersList: [],
      selectedValue: 1,
      projectsList: [],
      missionsList: [],
      leavesList: [],
      nowDate: null,
      backcolor: null,
      startDay: null,
      selectedDate: new Date()
    };
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      leavesList: nextProps.leavesList,
      missionsList: nextProps.missionsList,
      projectsList: nextProps.projectsList,
      usersList: nextProps.usersList,
      nowDate: moment(Date()).format("LL")
    });
  }
  handleTypeChange = (event, index, value) => {
    if (value === 2) {
      window.location = "/teamallocation/projectList";
    }
  };
  componentWillMount() {
    let nowDate = new Date();
    let nowDay = new Date().getDay();
    let finalDate = nowDate.setDate(new Date().getDate() - nowDay + 1);
    console.log(new Date().getDate());
    let startDay = new Date(finalDate);
    this.setState({ startDay });
  }
  functionSelectedDate = async selectedDate => {
    await this.filterDateWise(selectedDate);
  };
  filterDateWise = selectedDate => {
    let selctedDate1 = new Date(selectedDate);
    let leavesList = this.props.leavesList.filter(
      data =>
        moment(data.from.seconds * 1000).format("L") >= selectedDate ||
        moment(data.to.seconds * 1000).format("L") <= selectedDate
    );
    let missionsList = this.props.missionsList.filter(
      missionData =>
        moment(missionData.deadline.startDate.seconds * 1000).format("L") >=
          selectedDate ||
        moment(missionData.deadline.endDate.seconds * 1000).format("L") <=
          selectedDate
    );
    this.setState({ leavesList, missionsList, selectedDate: selctedDate1 });
  };
  render() {
    return (
      <Layout navigationTitle="Peoples List">
        <div>
          <div style={{ paddingLeft: 50 }}>
            <SelectField
              value={this.state.selectedValue}
              onChange={this.handleTypeChange}
              maxHeight={200}
            >
              <MenuItem value={1} primaryText="Peoples List" />
              <MenuItem value={2} primaryText="Projects List" />
            </SelectField>
          </div>
          <Divider />
          <div>
            <ReactWeeklyDayPicker
              daysCount={7}
              classNames={classNames}
              startDay={this.state.startDay}
              selectedDays={[this.state.selectedDate]}
              multipleDaySelect={false}
              selectDay={this.functionSelectedDate}
              unselectDay={function(day) {}}
              onPrevClick={function(startDay, selectedDays) {}}
              onNextClick={function(startDay, selectedDays) {}}
              unselectable={false}
              format={"MM/DD/YYYY"}
              selected={this.state.selected}
              firstLineFormat={"ddd"}
              secondLineFormat={"D"}
              firstLineMobileFormat={"ddd"}
              secondLineMobileFormat={"D"}
              mobilView={window.innerWidth < 1024}
              beforeToday={true}
            />
          </div>
          <Divider />
          {this.state.usersList.map((row, id) => (
            <div key={id}>
              <div>
                <List>
                  {this.state.missionsList.map((missionRow, index) => {
                    let backcolor = null;
                    const projectId = this.state.projectsList.filter(
                      data => data.projectId === missionRow.projectId
                    );
                    if (
                      this.props.leavesList.find(
                        leaveDate =>
                          moment(leaveDate.from.seconds * 1000).format("LL") >=
                            moment(Date()).format("LL") &&
                          leaveDate.userId === row.uid
                      )
                    ) {
                      backcolor = grey300;
                    } else {
                      backcolor = null;
                    }
                    if (missionRow.assignTo.find(data => data === row.uid)) {
                      let endDate = moment(
                        missionRow.deadline.endDate.seconds * 1000
                      ).format("LL");
                      let startDays = moment(this.state.nowDate).diff(
                        moment(
                          missionRow.deadline.startDate.seconds * 1000
                        ).format("LL"),
                        "days"
                      );
                      let endDays = moment(endDate).diff(
                        this.state.nowDate,
                        "days"
                      );
                      return (
                        <ListItem
                          disableKeyboardFocus={true}
                          style={{ backgroundColor: backcolor }}
                          key={id}
                          leftAvatar={<Avatar src={row.photoURL} />}
                          nestedItems={[
                            <ListItem
                              key={index}
                              secondaryTextLines={2}
                              primaryText={missionRow.name}
                              secondaryText={
                                <p>
                                  <span style={{ color: "black" }}>
                                    {moment(
                                      missionRow.deadline.startDate.seconds *
                                        1000
                                    ).format("ll")}
                                  </span>
                                  <span style={{ color: "black" }}>
                                    To
                                    {moment(
                                      missionRow.deadline.endDate.seconds * 1000
                                    ).format("ll")}
                                  </span>
                                  <br />
                                  <span style={{ color: "black" }}>
                                    Remarks:{missionRow.deadline.remarks}
                                  </span>
                                </p>
                              }
                            />
                          ]}
                        >
                          {projectId.map((projectRow, index) => (
                            <div key={index}>
                              <div
                                style={{
                                  height: 10,
                                  width: 20,
                                  marginRight: 20,
                                  float: "right"
                                }}
                              >
                                <img
                                  style={{ height: 20, width: 20 }}
                                  src={projectRow.logoURL}
                                />
                              </div>
                              <br />
                              <div
                                style={{
                                  height: 10,
                                  width: 40,
                                  float: "right",
                                  marginTop: 10
                                }}
                              >
                                {startDays + " - " + endDays}
                              </div>
                            </div>
                          ))}
                          <div style={{ marginTop: -10 }}>
                            {row.displayName}
                          </div>
                        </ListItem>
                      );
                    } else {
                      if (
                        this.props.leavesList.find(
                          leaveDate =>
                            moment(leaveDate.from.seconds * 1000).format(
                              "LL"
                            ) >= moment(Date()).format("LL") &&
                            leaveDate.userId === row.uid
                        )
                      ) {
                        backcolor = grey300;
                      } else {
                        backcolor = null;
                      }
                      return (
                        <ListItem
                          key={id}
                          leftAvatar={<Avatar src={row.photoURL} />}
                          style={{ backgroundColor: backcolor }}
                          nestedItems={[<ListItem key={index} />]}
                        >
                          <div>{row.displayName}</div>
                        </ListItem>
                      );
                    }
                  })}
                </List>
              </div>
              <div>
                <Divider />
              </div>
            </div>
          ))}
        </div>
      </Layout>
    );
  }
}
export default withRouter(TeamAllocationPeopleList);
