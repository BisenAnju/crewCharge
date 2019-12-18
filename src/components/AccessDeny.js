import React, { Component } from "react";

class AccessDeny extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log("access deny")
        return (
            <div style={{
                display: "flex", justifyContent: "center",
                marginTop: "30%", fontSize: "20px",
                fontWeight: "bold"
            }}>Acess Denied</div>
        );
    }
}
export default AccessDeny;
