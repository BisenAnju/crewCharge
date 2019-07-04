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
import "../styles/style.css";
import { loader } from "../constants/loader";
class TeamAllocationPeopleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      open: false,
      usersList: [],
      selectedValue: 1,
      projectsList: [],
      missionsfilterList: [],
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
    this.inititalizePropsValue(nextProps);
  }
  componentWillMount() {
    this.inititalizePropsValue(this.props);
    let nowDate = new Date();
    let nowDay = new Date().getDay();
    let finalDate = nowDate.setDate(new Date().getDate() - nowDay + 1);
    let startDay = new Date(finalDate);
    this.setState({ startDay });
  }
  inititalizePropsValue = whichProps => {
    let missionsList = [];
    let nowDate = moment().format("l");
    whichProps.projectsList.map(row => {
      const mision = whichProps.missionsList.find(
        missionData => missionData.projectId === row.projectId
      );
      if (mision !== undefined) {
        missionsList.push(mision);
      }
    });
    let missionsfilterList = missionsList.filter(
      missionData =>
        moment(missionData.deadline.startDate).format("l") <= nowDate &&
        moment(missionData.deadline.endDate).format("l") >= nowDate
    );
    this.setState({
      leavesList: whichProps.leavesList,
      missionsfilterList,
      missionsList,
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
    let leavesList = this.props.leavesList.filter(
      data =>
        moment(data.from.seconds * 1000).format("L") <= selectedDate &&
        moment(data.to.seconds * 1000).format("L") >= selectedDate
    );
    let missionsfilterList = this.state.missionsList.filter(
      missionData =>
        moment(missionData.deadline.startDate).format("L") <= selectedDate &&
        moment(missionData.deadline.endDate).format("L") >= selectedDate
    );
    console.log(missionsfilterList);
    this.setState({
      leavesList,
      missionsfilterList,
      selectedDate: selctedCurrentDate,
      startDay,
      isLoading: false
    });
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 112px)"
        }}
      >
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
            height: "calc(100vh - 186px)",
            overflow: "scroll"
          }}
        >
          {this.state.loader
            ? loader
            : this.state.usersList.map((row, id) => {
                let projectId = [];
                this.state.missionsfilterList.map(missionRow => {
                  if (missionRow.assignTo.find(data => data === row.uid)) {
                    projectId = this.state.projectsList.find(
                      data => data.projectId === missionRow.projectId
                    );
                  }
                });
                let backcolor = null;
                {
                  this.props.leavesList.find(
                    leaveDate =>
                      moment(leaveDate.from.seconds * 1000).format("LL") <=
                        moment(this.state.selectedDate).format("LL") &&
                      (moment(leaveDate.to.seconds * 1000).format("LL") >=
                        moment(this.state.selectedDate).format("LL") &&
                        leaveDate.userId === row.uid)
                  )
                    ? (backcolor = "leavesAnimation")
                    : (backcolor = "leavesAnima");
                }
                return (
                  <Card key={id}>
                    <CardHeader
                      title={row.displayName}
                      avatar={
                        <Avatar className={backcolor} src={row.photoURL} />
                      }
                      actAsExpander={true}
                      style={{ padding: 5 }}
                      titleStyle={{
                        paddingTop: 10,
                        paddingRight: 5,
                        fontWeight: "bold"
                      }}
                      children={
                        projectId.logoURL !== undefined ? (
                          <img
                            alt="active"
                            style={{
                              paddingTop: 5,
                              width: 35,
                              height: 35,
                              borderRadius: 5,
                              float: "right"
                            }}
                            src={projectId.logoURL}
                          />
                        ) : (
                          <Avatar
                            style={{
                              background: "red",
                              height: "10px",
                              width: "10px",
                              float: "right",
                              margin: "10px"
                            }}
                          />
                        )
                      }
                    />
                    {this.state.missionsfilterList.map((missionRow, index) => {
                      if (missionRow.assignTo.find(data => data === row.uid)) {
                        return (
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
                              <h3>{missionRow.name}</h3>
                              {/* <h4>Project Dead Line</h4> */}
                              <h5 style={{ float: "left", marginRight: 10 }}>
                                {moment(missionRow.deadline.startDate).format(
                                  "ll"
                                )}
                              </h5>
                              <h5 style={{ float: "left", marginRight: 10 }}>
                                -
                              </h5>
                              <h5>
                                {moment(missionRow.deadline.endDate).format(
                                  "ll"
                                )}
                              </h5>
                              <h5>Massege: {missionRow.deadline.remarks}</h5>
                            </Paper>
                          </CardText>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </Card>
                );
              })}
        </div>
      </div>
    );
  }
}
export default withRouter(TeamAllocationPeopleList);
