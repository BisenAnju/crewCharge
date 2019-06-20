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
      leavesList: []
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
      usersList: nextProps.usersList
    });
  }
  handleTypeChange = (event, index, value) => {
    if (value === 1) {
      window.location = "/teamallocation";
    }
  };
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
      <Layout navigationTitle="Project List" showBackNavigation={true}>
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
          {this.state.projectsList.map((row, id) => (
            <div key={id}>
              <div key={id}>
                <List key={id}>
                  {this.state.missionsList.map((missionRow, index) => {
                    return (
                      <ListItem
                        key={id}
                        leftAvatar={<Avatar src={row.logoURL} />}
                        disabled={true}
                        nestedItems={[
                          missionRow.projectId === row.projectId ? (
                            <ListItem key={index}>
                              {this.state.usersList.map((user, i) => {
                                if (
                                  missionRow.assignTo.find(
                                    udata => udata === user.uid
                                  )
                                )
                                  return (
                                    <div key={i}>
                                      <img
                                        style={{
                                          width: 40,
                                          height: 40,
                                          borderRadius: 50,
                                          float: "left"
                                        }}
                                        src={user.photoURL}
                                      />
                                    </div>
                                  );
                              })}
                              <br />
                              <br />
                              <br />
                              <div style={{ marginBottom: 10 }}>
                                <h4>{missionRow.name}</h4>
                              </div>
                              <div>
                                {
                                  <p>
                                    <span style={{ color: "black" }}>
                                      Start=
                                      {moment(
                                        missionRow.deadline.startDate.seconds *
                                          1000
                                      ).format("ll")}
                                    </span>
                                    <span style={{ color: "black" }}>
                                      , End Date=
                                      {moment(
                                        missionRow.deadline.endDate.seconds *
                                          1000
                                      ).format("ll")}
                                    </span>
                                    <br />
                                    <span style={{ color: "black" }}>
                                      Remarks:{missionRow.deadline.remarks}
                                    </span>
                                  </p>
                                }
                              </div>
                            </ListItem>
                          ) : null
                        ]}
                      >
                        <div>{row.name}</div>
                      </ListItem>
                    );
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
export default withRouter(TeamAllocationProjectList);
