import React from "react";
import Layout from "../layouts/Layout";
import { Avatar } from "material-ui";

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import { ImagePictureAsPdf } from "material-ui/svg-icons";
import { cyan900 } from 'material-ui/styles/colors';
import moment from 'moment'
const rightIconMenu = (
    <IconButton
        touch={true}
        tooltipPosition="bottom-center"
    >
        <ImagePictureAsPdf onClick={console.log("Anju")} />
    </IconButton>

);

class PayrollDateCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentUser: [], expanded: false, monthArray: [] };
    }
    componentWillMount() {
        const currentUser = this.props.userData.find(
            user => user.uid === this.props.match.params.id
        );
        this.setState({
            currentUser
        }, () => {
            console.log(this.state.currentUser.joiningDate)
            var firedate = this.state.currentUser.joiningDate
            console.log("firedate " + firedate)
            var datee = new Date(firedate.seconds * 1000)
            var date1 = new Date()
            var fomatDate1 = moment(datee).format("YYYY/MM/DD")
            var fomatDate2 = moment(date1).format("YYYY/MM/DD")
            console.log(fomatDate1 + " hello " + fomatDate2)
            var dateStart = moment(fomatDate1);
            var dateEnd = moment(fomatDate2);
            var timeValues = [];

            while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
                timeValues.push(dateStart.format('MMM'));
                dateStart.add(1, 'month');
            }
            console.log(dateStart)
            console.log(timeValues)
            this.setState({ monthArray: timeValues })
        });
    }

    render() {
        console.log(this.props.match.params.id)
        return (
            <Layout navigationTitle="Payroll" showBackNavigation={true}>
                <div style={{ height: "calc(100vh - 80px)", overflow: "scroll", paddingBottom: "5px" }}>

                    <div style={{ padding: "5%" }}>


                        <List>
                            {/* <Subheader>2018</Subheader> */}

                            {this.state.monthArray.map((months, index) => {

                                return (
                                    <div><ListItem
                                        disabled
                                        leftAvatar={<Avatar backgroundColor="rgb(253, 145, 77)" style={{ fontSize: "13px", fontWeight: 'bold' }} >{months}</Avatar>}
                                        primaryText={this.state.currentUser.designation}
                                        rightIcon={<ImagePictureAsPdf style={{ fill: "rgb(214, 17, 17)" }} onClick={() => {
                                            this.props.history.push("/payroll/date/" + this.state.currentUser.uid)
                                        }} />}
                                        secondaryText={
                                            <p>
                                                {/* <span style={{ color: darkBlack }}>{this.state.currentUser.basicSalary}</span><br /> */}
                                                1 {months} 2018 to 30 {months} 2018
                                            </p>
                                        }
                                        secondaryTextLines={2}

                                    />
                                        <Divider inset={true} /></div>
                                );
                            })
                            }

                            <Divider inset={true} />
                        </List>
                    </div>


                </div>
            </Layout >
        );
    }
}
export default PayrollDateCard;
