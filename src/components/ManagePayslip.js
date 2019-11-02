import React, { Component } from "react";
import Layout from "../layouts/Layout";
import moment from "moment";
import { Chip, SelectField, MenuItem, TextField, Card, CardHeader, CardActions, List, CardText, ListItem } from "material-ui";
const styles = {
    chip: { margin: 4 }
};
const allMonths = [
    { name: "04", label: "April" },
    { name: "05", label: "May" },
    { name: "06", label: "June" },
    { name: "07", label: "July" },
    { name: "08", label: "August" },
    { name: "09", label: "September" },
    { name: "10", label: "October" },
    { name: "11", label: "November" },
    { name: "12", label: "December" },
    { name: "01", label: "January" },
    { name: "02", label: "February" },
    { name: "03", label: "March" }
];
class ManagePayslip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: "2017-2018",
            month: "",
            filterUser: [],
            designation: "Trainee",
            status: "draft",
            salary: "10000",
            finalArr: []
        };
    }

    handleYear = (event, index, year) => this.setState({ year });
    handleDesignation = (event, index, designation, aindex, uid) => {
        const finalArr = this.state.finalArr
        const data = {};
        data.designation = designation;
        data.salary = this.state.salary;
        data.uid = uid;
        let d = new Date(this.state.year.split("-")[0], (moment().month(this.state.month).format("M") - 2), 1, 0, 0, 0, 0);
        data.date = d
        finalArr.push(data);

        const filterUser = this.state.filterUser;
        filterUser[aindex].designation = designation;
        this.setState({ filterUser, finalArr });
    }

    handleSalary = (event, aindex, uid) => {
        const filterUser = this.state.filterUser;
        filterUser[aindex].salary = event.target.value;

        const finalArr = this.state.finalArr
        if (finalArr.find(item => item.uid === uid)) {
            filterUser[aindex].salary = event.target.value;
            finalArr[finalArr.length - 1].salary = event.target.value;
        }
        else {
            const data = {};
            data.designation = this.state.designation;
            data.salary = event.target.value;
            data.uid = uid;
            let d = new Date(this.state.year.split("-")[0], (moment().month(this.state.month).format("M") - 2), 1, 0, 0, 0, 0);
            data.date = d
            finalArr.push(data);
        }
        this.setState({ finalArr, filterUser });
    };

    handleChip = month => {
        this.setState({ month }, () => {
            let filterUser = this.props.userData.filter(user => user.joiningDate && (
                this.state.month >= "04" ?
                    moment(user.joiningDate.seconds * 1000).format("MM") <= this.state.month &&
                    moment(user.joiningDate.seconds * 1000).format("YYYY") === this.state.year.split("-")[0]
                    :
                    moment(user.joiningDate.seconds * 1000).format("MM") > this.state.month &&
                    moment(user.joiningDate.seconds * 1000).format("YYYY") < this.state.year.split("-")[1]));
            this.setState({ filterUser })
        }
        );
    }
    handleStatus = (e, label, index, uid, id) => {
        document.getElementById(id).style.opacity = label ? "1" : "0.4"
        const finalArr = this.state.finalArr;
        if (index === 0) {
            finalArr[index].status = label;
        }
        else {
            finalArr[index - 1].status = label;
        }
        this.setState({ finalArr });

        const filterUser = this.state.filterUser;
        filterUser[index].status = label;

        this.setState({ status: label, filterUser }, () => {
            if (this.state.status === "approved") {
                this.setState({ finalArr }, () => this.props.userPayslip(this.state.finalArr))
            }
        })
    }
    render() {
        return (
            <Layout navigationTitle="Manage Payslip" showBackNavigation={true}>
                <div style={{
                    display: "flex",
                    justifyContent: "flex-start",
                }}>
                    <div>
                        <SelectField
                            value={this.state.year}
                            onChange={this.handleYear}
                            style={{ width: "200px", marginLeft: "10%" }}
                        >
                            <MenuItem value="2017-2018" primaryText="2017-18" />
                            <MenuItem value="2018-2019" primaryText="2018-19" />
                            <MenuItem value="2019-2020" primaryText="2019-20" />
                        </SelectField>
                    </div>
                </div>

                <div style={{ display: "flex", overflow: "scroll" }}>
                    {allMonths.map((singleMonth, index) => (
                        <Chip
                            key={singleMonth.name}
                            onClick={e => {
                                e.preventDefault();
                                this.handleChip(singleMonth.name)
                            }}
                            style={styles.chip}
                        >
                            {singleMonth.label}
                        </Chip>
                    ))
                    }
                </div>

                <div style={{
                    height: "calc(100vh - 200px)",
                    overflow: "scroll",
                }}>
                    {this.state.filterUser !== [] ?
                        <List>
                            {
                                this.state.filterUser
                                    .map((data, index) => (
                                        <Card key={data.uid} style={{ margin: "5%" }}>
                                            <CardHeader
                                                style={{ padding: "5% 0% 0% 5%" }}
                                                title={data.displayName}
                                                subtitle={<SelectField
                                                    floatingLabelText="Designation"
                                                    style={{ width: "130px" }}
                                                    value={data.payroll && moment(data.payroll[data.payroll.length - 1].date.seconds * 1000).format("MM") === this.state.month ? data.payroll[data.payroll.length - 1].designation : data.designation !== undefined ? data.designation : this.state.designation}
                                                    selected={
                                                        data.designation
                                                    }
                                                    onChange={(e, i, value) => this.handleDesignation(e, i, value, index, data.uid)}
                                                >
                                                    <MenuItem value="trainee" primaryText="Trainee" />
                                                    <MenuItem value="developer" primaryText="Developer" />
                                                </SelectField>}
                                                avatar={data.photoURL}
                                            />

                                            <CardText style={{ padding: "0px", fontSize: "16px", fontWeight: "bold", textAlign: "right", marginRight: "10%" }}>
                                                <TextField
                                                    style={{ width: "120px" }}
                                                    id="salary"
                                                    value={data.payroll && moment(data.payroll[data.payroll.length - 1].date.seconds * 1000).format("MM") === this.state.month ? data.payroll[data.payroll.length - 1].salary : data.salary !== undefined ? data.salary : this.state.salary}
                                                    onChange={(e) => this.handleSalary(e, index, data.uid)}
                                                />
                                            </CardText>


                                            <List style={{ marginRight: "0px", display: "flex", justifyContent: "space-evenly" }}>
                                                <ListItem
                                                    style={{ color: "white", fontWeight: "bold", backgroundColor: "#FFC312", flex: 1, textAlign: "center" }}
                                                    primaryText="Draft"
                                                    id={index + "draft"}
                                                    selected={this.state.finalArr.find(
                                                        item => item.uid === data.uid
                                                    ) === undefined
                                                        ? false
                                                        : this.state.finalArr.filter(
                                                            item =>
                                                                item.uid === data.uid
                                                        )[
                                                            this.state.finalArr.filter(
                                                                item =>
                                                                    item.uid === data.uid
                                                            ).length - 1
                                                        ].id ===
                                                        index + "draft" && true}

                                                    onClick={e => {
                                                        e.preventDefault();
                                                        this.handleStatus(e, "draft", index, data.uid, e.target.parentElement.parentElement.id ? e.target.parentElement.parentElement.id : e.target.parentElement.parentElement.parentElement.id)
                                                    }}
                                                />
                                                <ListItem
                                                    style={{
                                                        opacity: data.payroll && data.payroll.find(item => moment(item.date.seconds * 1000).format("MM") === this.state.month) ? "1" : "0.4",
                                                        color: "white", fontWeight: "bold", backgroundColor: "#1289A7", flex: 1, textAlign: "center"
                                                    }}
                                                    primaryText="Approved"
                                                    id={index + "approved"}
                                                    selected={this.state.finalArr.find(
                                                        item => item.uid === data.uid
                                                    ) === undefined
                                                        ? false
                                                        : this.state.finalArr.filter(
                                                            item =>
                                                                item.uid === data.uid
                                                        )[
                                                            this.state.finalArr.filter(
                                                                item =>
                                                                    item.uid === data.uid
                                                            ).length - 1
                                                        ].id ===
                                                        index + "approved" && true}
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        this.handleStatus(e, "approved", index, data.uid, e.target.parentElement.parentElement.id ? e.target.parentElement.parentElement.id : e.target.parentElement.parentElement.parentElement.id)
                                                    }}
                                                />

                                                <ListItem
                                                    style={{ opacity: "0.4", color: "white", fontWeight: "bold", backgroundColor: "#009432", flex: 1, textAlign: "center" }}
                                                    primaryText="Paid"
                                                    id={index + "paid"}
                                                    selected={this.state.finalArr.find(
                                                        item => item.uid === data.uid
                                                    ) === undefined
                                                        ? false
                                                        : this.state.finalArr.filter(
                                                            item =>
                                                                item.uid === data.uid
                                                        )[
                                                            this.state.finalArr.filter(
                                                                item =>
                                                                    item.uid === data.uid
                                                            ).length - 1
                                                        ].id ===
                                                        index + "paid" && true}
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        this.handleStatus(e, "paid", index, data.uid, e.target.parentElement.parentElement.id ? e.target.parentElement.parentElement.id : e.target.parentElement.parentElement.parentElement.id)
                                                    }}
                                                />
                                            </List>
                                        </Card>))}
                        </List>
                        : null}
                </div>
            </Layout>);
    }
}
export default ManagePayslip;
