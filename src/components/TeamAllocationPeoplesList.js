import React from "react";
import {
  Card,
  CardHeader,
  MenuItem,
  SelectField,
  Paper,
  CardText,
  Divider,
  IconButton,
  IconMenu,
  Avatar
} from "material-ui";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import Layout from "../layouts/Layout";
import { withRouter } from "react-router-dom";
import * as moment from "moment";
import ReactWeeklyDayPicker from "./WeeklyDayPicker";
import { lightGreen400, red400 } from "material-ui/styles/colors";
import { classNames } from "../constants/weeklydaypicker";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import "../styles/style.css";
import CircleRipple from "material-ui/internal/CircleRipple";
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
    let startDay = new Date(finalDate);
    this.setState({ startDay });
  }
  functionSelectedDate = async selectedDate => {
    await this.filterDateWise(selectedDate);
  };
  handleaddMission = () => {
    window.location = "/teamallocation";
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
    this.setState({
      leavesList,
      missionsList,
      selectedDate: selctedCurrentDate,
      startDay
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
      <Layout navigationTitle="Peoples List">
        <div>
          <div
            style={{
              paddingLeft: 50
            }}
          >
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
          {this.state.usersList.map((row, id) => {
            let projectId = [];
            this.state.missionsList.map(missionRow => {
              if (missionRow.assignTo.find(data => data === row.uid))
                projectId = this.state.projectsList.filter(
                  data => data.projectId === missionRow.projectId
                );
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
                ? (backcolor = "#C73DAC")
                : (backcolor = null);
            }
            return (
              <Card key={id}>
                <CardHeader
                  title={row.displayName}
                  avatar={
                    <Avatar
                      style={{
                        border: 5,
                        border: "solid",
                        borderColor: backcolor,
                        width: 50,
                        height: 50
                      }}
                      src={row.photoURL}
                    />
                  }
                  actAsExpander={true}
                  style={{ padding: 5 }}
                  titleStyle={{
                    paddingTop: 10,
                    paddingRight: 5,
                    fontWeight: "bold"
                  }}
                  children={projectId.map((projectRow, index) => (
                    <img
                      key={index}
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: 5,
                        float: "right"
                      }}
                      src={projectRow.logoURL}
                    />
                  ))}
                />
                {this.state.missionsList.map((missionRow, index) => {
                  if (missionRow.assignTo.find(data => data === row.uid))
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
                        </Paper>
                      </CardText>
                    );
                })}
              </Card>
            );
          })}
          <FloatingActionButton
            backgroundColor={lightGreen400}
            style={this.contentButton}
          >
            <ContentAdd onClick={this.handleaddMission} />
          </FloatingActionButton>
        </div>
      </Layout>
    );
  }
}
export default withRouter(TeamAllocationPeopleList);
