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
      usersList: nextProps.usersList,
    });
  }
  handleTypeChange = (event, index, value) => {
    if (value === 1) {
      window.location = "/teamallocation/peoplesList";
    }
  };
  render() {
    return (
      <Layout navigationTitle="Project List">
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
              daysCount={6}  //How many days will be shown
              classNames={classNames}  //Overrides classnames for custom classes (below example)
              startDay={new Date()} // First day as Date Object or 22 June 2016
              selectedDays={['22 June 2017', new Date()]} // Selected days list
              multipleDaySelect={true} //enables multiple day selection
              selectDay={function (day) { }}
              unselectDay={function (day) { }}
              onPrevClick={function (startDay, selectedDays) { }} // called with the new startDay
              onNextClick={function (startDay, selectedDays) { }} // called with the new startDay
              unselectable={false} // if true allows to unselect a date once it has been selected. Only works when multipleDaySelect={false}
              format={'YYYY-MM-DD'} //format of dates that handled in selectDay and unselectDay functions
              firstLineFormat={'ddd'} // format for the first line of the day button
              secondLineFormat={'D'} // format for the second line of the day button
              firstLineMobileFormat={'ddd'} // format for the first line of the day button mobile
              secondLineMobileFormat={'D'} // format for the second line of the day button mobile
              unavailables={{
                dates: moment.weekdaysShort(),  //unavailable dates list
                relative: [0, 1],  //unavailable dates list relative to today (0:today, 1:tomorrow, -1:yesterday)
                weekly: [0] //unavailable dates list for each week (0:Sunday, 1:Monday ...)
              }}
              mobilView={window.innerWidth < 1024}  // enables mobil view
              beforeToday={false}   // all dates before today set as unavailable (default:true)
              hiddens={{  // makes dates invisible
                //dates: ['22 July 2017'], //absolute dates list
                //relative: [2], // relative to today (0:today, 1:tomorrow, -1:yesterday)
                weekly: [0]  //each week (0:Sunday, 1:Monday ...)
              }}
            />
          </div>
          <Divider />
          {this.state.projectsList.map(
            (row, id) => (
              <div key={id}><div key={id}>
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
                <div><Divider></Divider></div>
              </div>
            )
          )}
        </div>
      </Layout>
    );
  }
}
export default withRouter(TeamAllocationProjectList);
