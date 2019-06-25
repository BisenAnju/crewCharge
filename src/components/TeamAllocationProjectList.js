import React from "react";
import { Card, CardHeader, Paper, CardText, Divider } from "material-ui";
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
    if (value === 1) {
      window.location = "/teamallocation";
    }
  };
  componentWillMount() {
    let nowDate = new Date();
    let nowDay = new Date().getDay();
    let finalDate = nowDate.setDate(new Date().getDate() - nowDay + 1);
    let startDay = new Date(finalDate);
    this.setState({ startDay });
  }
  functionSelectedDate = async selectedDate => {
    await this.filterDateWise(selectedDate);
  };
  handleAddProject = () => {
    window.location = "/teamallocation/project";
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
        {this.state.projectsList.map((row, id) => (
          <Card key={id}>
            <CardHeader
              title={row.name}
              avatar={row.logoURL}
              actAsExpander={true}
              showExpandableButton={true}
            />
            {this.state.missionsList.map((missionRow, index) =>
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
                          missionRow.assignTo.find(udata => udata === user.uid)
                        )
                          return (
                            <div key={i}>
                              <img
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 5,
                                  padding: 2,
                                  float: "left"
                                }}
                                src={user.photoURL}
                              />
                            </div>
                          );
                      })}
                    </div>
                    <br />
                    <br />
                    <br />
                    <div>
                      <h3>{missionRow.name}</h3>
                      <h4>Project Dead Line</h4>
                      <h5 style={{ float: "left", marginRight: 10 }}>
                        {moment(
                          missionRow.deadline.startDate.seconds * 1000
                        ).format("ll")}
                      </h5>
                      <h5 style={{ float: "left", marginRight: 10 }}>-</h5>
                      <h5>
                        {moment(
                          missionRow.deadline.endDate.seconds * 1000
                        ).format("ll")}
                      </h5>
                      <h5>Massege: {missionRow.deadline.remarks}</h5>
                    </div>
                  </Paper>
                </CardText>
              ) : null
            )}
          </Card>
        ))}
      </div>
    );
  }
}
export default withRouter(TeamAllocationProjectList);
