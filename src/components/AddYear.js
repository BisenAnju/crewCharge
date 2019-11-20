import React, { Component } from "react";
import { TextField, RaisedButton } from "material-ui";

class AddYear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: "",
        }

    }
    handleChange = (event) => {
        this.setState({
            year: event.target.value,
        });
    }
    saveYear = e => {
        e.preventDefault();
        this.props.addYear(this.state.year);
        this.setState({ year: "", });
    }
    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div>
                    <TextField
                        id="year"
                        value={this.state.year}
                        onChange={this.handleChange}
                    />
                </div>

                <div style={{ marginTop: "20px" }}>
                    <RaisedButton
                        label="SAVE"
                        backgroundColor="#fd914d"
                        labelColor="white"
                        onClick={this.saveYear}
                    />
                </div>
            </div>
        )
    }

}
export default AddYear;