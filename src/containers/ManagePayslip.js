import React from "react";
import withFirebase from "../hoc/withFirebase";
import { withRouter } from "react-router-dom";
import ManagePayslip from "../components/ManagePayslip";
class ManagePayslipContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            isLoading: true
        };
    }
    componentWillMount() {
        this.props.db
            .collection("users")
            .onSnapshot(
                snapshot => {
                    const userData = [];
                    snapshot.forEach(doc => {
                        if (doc.exists) {
                            userData.push(doc.data());
                        }
                    });
                    this.setState({
                        isLoading: false,
                        userData
                    });
                },
                err => {
                    console.log(`Encountered error: ${err}`);
                }
            );
    }

    userPayslip = data => {
        // console.log(data)
        // console.log(data[data.length - 1])
        const payrollObject = {
            date: data[data.length - 1].date,
            designation: data[data.length - 1].designation,
            salary: data[data.length - 1].salary,
            status: data[data.length - 1].status
        };
        this.props.db
            .collection("users")
            .doc(data[data.length - 1].uid)
            .get()
            .then(querySnapshot => {
                var payroll = [];
                if (querySnapshot.exists) {
                    if (querySnapshot.data().payroll === undefined) {
                        payroll.push(payrollObject);
                    }
                    else {
                        payroll = querySnapshot.data().payroll;
                        payroll.push(payrollObject);
                    }
                }
                this.props.db
                    .collection("users")
                    .doc(data[data.length - 1].uid)
                    .update({
                        payroll
                    });
            })
            .catch(err => {
                console.log("Error getting documents", err);
            });
    };


    render() {
        return (
            <ManagePayslip {...this.state}
                userPayslip={this.userPayslip} />
        );
    }
}
export default withFirebase(withRouter(ManagePayslipContainer));
