import React from "react";
import {
  Card,
  CardHeader,
  Paper,
  CardText,
  Divider,
  Avatar
} from "material-ui";
import { withRouter } from "react-router-dom";
import * as moment from "moment";
import ReactWeeklyDayPicker from "./WeeklyDayPicker";
import { classNames } from "../constants/weeklydaypicker";
class TeamAllocationProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      open: false,
      usersList: [],
      selectedValue: 2,
      projectsList: [],
      missionsList: [],
      missionsfilterList: [],
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
    this.inititalizePropsValue(nextProps);
  }
  componentWillMount() {
    let nowDate = new Date();
    let nowDay = new Date().getDay();
    let finalDate = nowDate.setDate(new Date().getDate() - nowDay + 1);
    let startDay = new Date(finalDate);
    this.setState({ startDay });
    this.inititalizePropsValue(this.props);
  }
  inititalizePropsValue = whichProps => {
    let nowDate = moment().format("L");
    let missionsfilterList = whichProps.missionsList.filter(
      missionData =>
        moment(missionData.deadline.startDate).format("L") <= nowDate &&
        moment(missionData.deadline.endDate).format("L") >= nowDate
    );
    this.setState({
      missionsfilterList,
      missionsList: whichProps.missionsList,
      isLoading: false,
      projectsList: whichProps.projectsList,
      usersList: whichProps.usersList,
      nowDate: moment(Date()).format("LL")
    });
  };
  functionSelectedDate = selectedDate => {
    this.filterDateWise(selectedDate);
  };
  filterDateWise = selectedDate => {
    let selctedCurrentDate = new Date(selectedDate);
    let selctedDate1 = new Date(selectedDate);
    let nowDay = new Date(selectedDate).getDay();
    let finalDate = selctedDate1.setDate(
      new Date(selectedDate).getDate() - nowDay + 1
    );
    let startDay = new Date(finalDate);

    let missionsfilterList = this.state.missionsList.filter(
      missionData =>
        moment(missionData.deadline.startDate).format("L") <= selectedDate &&
        moment(missionData.deadline.endDate).format("L") >= selectedDate
    );
    this.setState({
      missionsfilterList,
      selectedDate: selctedCurrentDate,
      startDay,
      isLoading: false
    });
  };
  contentButton = {
    top: "auto",
    bottom: 20,
    left: "auto",
    right: 20,
    position: "fixed",
    margin: 0
  };
  render() {
    return (
      <div>
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
        <div
          style={{
            height: "73vh",
            overflow: "auto",
            display: "self"
          }}
        >
          {this.state.projectsList.map((row, id) => (
            <Card key={id}>
              <CardHeader
                title={row.name}
                avatar={row.logoURL}
                actAsExpander={true}
                showExpandableButton={true}
              />
              {this.state.missionsfilterList.map((missionRow, index) =>
                missionRow.projectId === row.projectId ? (
                  <CardText
                    key={index}
                    expandable={true}
                    style={{
                      padding: 5
                    }}
                  >
                    <Paper
                      className={"paperDiv"}
                      style={{
                        padding: 10,
                        boxShadow: -1,
                        MozBoxShadow: -1
                      }}
                    >
                      <div>
                        {this.state.usersList.map((user, i) => {
                          if (
                            missionRow.assignTo.find(
                              udata => udata === user.uid
                            )
                          ) {
                            return (
                              <div key={i}>
                                <Avatar src={user.photoURL} size={40} />
                              </div>
                            );
                          }
                          return true;
                        })}
                      </div>
                      <br />
                      <div>
                        <h3>{missionRow.name}</h3>
                        <h5 style={{ float: "left", marginRight: 10 }}>
                          {moment(missionRow.deadline.startDate).format("ll")}
                        </h5>
                        <h5 style={{ float: "left", marginRight: 10 }}>-</h5>
                        <h5>
                          {moment(missionRow.deadline.endDate).format("ll")}
                        </h5>
                        <h5>Message: {missionRow.deadline.remarks}</h5>
                      </div>
                    </Paper>
                  </CardText>
                ) : null
              )}
            </Card>
          ))}
        </div>
      </div>
    );
  }
}
export default withRouter(TeamAllocationProjectList);
