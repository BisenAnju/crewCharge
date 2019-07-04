import React from "react";
import {
    List,
    ListItem,
    Divider,
    IconMenu,
    MenuItem,
    IconButton,
    Avatar
} from "material-ui";
import { withRouter } from "react-router-dom";
import Subheader from "material-ui/Subheader";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { orange100 } from "material-ui/styles/colors";
import withFirebase from "../hoc/withFirebase";
import * as moment from "moment";
class ProjectMissionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            massage: null,
            slideIndex: 0
        };
    }
    handleChange = value => {
        this.setState({
            slideIndex: value
        });
    };
    contentButton = {
        top:"85%",
        Right:"10%",
        marginLeft: "79%",
       position: "fixed"
    };
    render() {
        return (
   <div
       style={{
           display: "flex",
           flexDirection: "column",
           height: "calc(100vh-112px)"
       }}
   >
       <div
           style={{
               display: "flex",
               flexDirection: "column"
           }}
       >
           <div>
               <Subheader
  style={{
      textAlign: "center",
      fontSize: "17px",
      fontWeight: "bold"
  }}
    >   Missions List
                </Subheader>
                            </div>
                            <Divider style={{ backgroundColor: orange100 }} />
                            <div
                                style={{
                                    height: "30vh",
                                    overflow: "scroll"
                                }}
                            >
                                <List>
                                    {this.props.missionsList
                                        .filter(data => data.status === "Active")
                                        .map((row, index) => (
                                            <div key={index}>
                                                <div>
                                                    <ListItem
                                                        key={index}
                                                        rightIconButton={
                                                            <IconMenu
                                                                menuStyle={{
                                                                    backgroundColor: "rgba(242, 243, 242, 0.5)"
                                                                }}
                                                                iconButtonElement={
                                                                    <IconButton style={{ marginTop: 4 }}>
                                                                        <MoreVertIcon />
                                                                    </IconButton>
                                                                }
                                                            >
                                                                <MenuItem
                                                                    onClick={e => {
                                                                        e.preventDefault();
                                                                        this.props.history.push(
                                                                            "/teamallocation/mission/" +
                                                                            row.missionsId
                                                                        );
                                                                    }}
                                                                >
                                                                    Edit
                                </MenuItem>
                                                                <MenuItem
                                                                    onClick={e => {
                                                                        e.preventDefault();
                                                                        this.props.handleArchiveMissionChange(
                                                                            row.missionsId
                                                                        );
                                                                    }}
                                                                >
                                                                    Archive
                                </MenuItem>
                                                            </IconMenu>
                                                        }
                                                    >
                                                        <div>
                                                            <div>
                                                                <h4>{row.name}</h4>
                                                            </div>
                                                            <div style={{ paddingTop: 5 }}>
                                                                <span style={{ fontSize: "14px" }}>
                                                                    {moment(row.deadline.startDate).format("ll") +
                                                                        " - " +
                                                                        moment(row.deadline.endDate).format("ll")}
                                                                </span>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    maxWidth: "290px",
                                                                    overflowWrap: "break-word",
                                                                    wordWrap: "break-word",
                                                                    paddingTop: 5
                                                                }}
                                                            >
                                                                <span style={{ fontSize: "14px" }}>
                                                                    Remarks: {row.deadline.remarks}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </ListItem>
                                                </div>
                                                <Divider style={{ backgroundColor: orange100 }} />
                                            </div>
                                        ))}
                                </List>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <div>
                                <Subheader
                                    style={{
                                        textAlign: "center",
                                        fontSize: "17px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Project List   </Subheader>
                            </div>
                            <Divider style={{ backgroundColor: orange100 }} />
                            <div
                                style={{
                                    height: "30vh",
                                    overflow: "scroll"
                                }}
                            >
                                <List>
                                    {this.props.projectsList.map((row, index) => (
                                        <div key={index}>
                                            <div>
                                                <ListItem
                                                    primaryText={row.name}
                                                    leftAvatar={<Avatar src={row.logoURL} />}
                                                    rightIconButton={
                                                        <IconMenu
                                                            menuStyle={{
                                                                backgroundColor: "rgba(242, 243, 242, 0.5)"
                                                            }}
                                                            iconButtonElement={
                                                                <IconButton style={{ marginTop: 4 }}>
                                                                    <MoreVertIcon />
                                                                </IconButton>
                                                            }
                                                        >
                                                            <MenuItem
                                                                onClick={e => {
                                                                    e.preventDefault();
                                                                    this.props.history.push(
                                                                        "/teamallocation/project/" + row.projectId
                                                                    );
                                                                }}
                                                            >
                                                                Edit </MenuItem>
                                                            {/* <MenuItem
                                                                onClick={e => {
                                                                    e.preventDefault();
                                                                    this.props.handleArchiveProjectChange(
                                                                        row.projectId
                                                                    );
                                                                }}
                                                            >
                                                                Archive </MenuItem> */}
                                                        </IconMenu>
                                                    }
                                                />
                                            </div>
                                            <Divider style={{ backgroundColor: orange100 }} />
                                        </div>
                                    ))}
                                </List>
                            </div>
                        </div>
                <div style={this.contentButton}>
                    <div style={{marginBottom:10}}>
                        <FloatingActionButton
                            backgroundColor={"rgb(253, 145, 77)"}
                            
                        >
                            <div>
                                <IconMenu
                                    iconButtonElement={
                                        <IconButton style={{ marginTop: 4 }}>
                                            <ContentAdd color={"white"} />
                                        </IconButton>
                                    }
                                    menuStyle={{
                                        backgroundColor: "rgba(242, 243, 242, 0.5)",
                                        padding: 0
                                    }}
                                    anchorOrigin={{
                                        horizontal: "right",
                                        vertical: "bottom"
                                    }}
                                    targetOrigin={{
                                        horizontal: "right",
                                        vertical: "bottom"
                                    }}
                                >
                                    <MenuItem
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.history.push("/teamallocation/mission");
                                        }}
                                    >
                                        Add Mission</MenuItem>
                                    <Divider />
                                    <MenuItem
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.history.push("/teamallocation/project");
                                        }}
                                    >
                                        Add Project </MenuItem>
                                </IconMenu>
                            </div>
                        </FloatingActionButton>
                    </div>
                        </div>
                    </div>
        );
    }
}
export default withRouter(withFirebase(ProjectMissionList));
