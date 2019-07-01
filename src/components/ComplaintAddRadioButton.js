import React from "react";
import {
  SelectField,
  MenuItem,
  RadioButton,
  RadioButtonGroup
} from "material-ui";
import { ActionDateRange, ImageTimer } from "material-ui/svg-icons";
export class PriorityRadioButton extends React.Component {
  render() {
    return (
      <RadioButtonGroup
        style={{ display: "flex", marginTop: "5%" }}
        name="shipSpeed"
        defaultSelected="low"
      >
        <RadioButton
          rippleStyle={{ color: "rgb(253, 145, 77)" }}
          iconStyle={{ fill: "rgb(240, 143, 76)" }}
          labelStyle={{ marginLeft: "-18%" }}
          value="low"
          label="Low"
          id="priority"
          style={{
            marginBottom: "5%",
            marginRight: "2%",
            width: "min-content"
          }}
          onClick={this.props.validatePriority}
        />
        <RadioButton
          rippleStyle={{ color: "rgb(253, 145, 77)" }}
          iconStyle={{ fill: "rgb(240, 143, 76)" }}
          labelStyle={{ marginLeft: "-15%" }}
          value="medium"
          label="Medium"
          id="priority"
          style={{
            marginBottom: "5%",
            marginRight: "2%",
            width: "min-content"
          }}
          onClick={this.props.validatePriority}
        />
        <RadioButton
          rippleStyle={{ color: "rgb(253, 145, 77)" }}
          iconStyle={{ fill: "rgb(240, 143, 76)" }}
          labelStyle={{ marginLeft: "-18%" }}
          value="high"
          label="High"
          id="priority"
          style={{
            marginBottom: "5%",
            marginRight: "2%",
            width: "min-content"
          }}
          onClick={this.props.validatePriority}
        />
      </RadioButtonGroup>
    );
  }
}
//Leave Management radiobtn
export class LeaveApplyRadioButton extends React.Component {
  render() {
    return (
      <RadioButtonGroup
        style={{
          display: "flex"
        }}
        name="shipSpeed"
        defaultSelected={this.props.leaveType}
      >
        <RadioButton
          rippleStyle={{ color: "rgb(253, 145, 77)" }}
          labelStyle={{ marginLeft: "-18%" }}
          value="Hour"
          label="Hour"
          id="leaveType"
          checkedIcon={<ImageTimer style={{ fill: "#f08f4c" }} />}
          uncheckedIcon={<ImageTimer />}
          style={{
            marginRight: "18%",
            marginLeft: "13%",
            width: "min-content"
          }}
          onClick={this.props.validateLeave}
          // disabled={this.props.leaveType === "Full" ? true : false}
        />
        <RadioButton
          rippleStyle={{ color: "rgb(253, 145, 77)" }}
          labelStyle={{ marginLeft: "-15%" }}
          value="Full"
          label="Full"
          id="leaveType"
          checkedIcon={<ActionDateRange style={{ fill: "#f08f4c" }} />}
          uncheckedIcon={<ActionDateRange />}
          style={{
            width: "min-content"
          }}
          onClick={this.props.validateLeave}
          // disabled={this.props.leaveType === "Hour" ? true : false}
        />
      </RadioButtonGroup>
    );
  }
}

export class AnonymousRadioButton extends React.Component {
  render() {
    return (
      <RadioButtonGroup
        style={{ display: "flex", marginTop: "5%" }}
        name="shipSpeed"
        defaultSelected={false}
      >
        <RadioButton
          rippleStyle={{ color: "rgb(253, 145, 77)" }}
          iconStyle={{ fill: "rgb(240, 143, 76)" }}
          value={true}
          label="Yes"
          labelStyle={{ marginLeft: "-20%" }}
          style={{
            marginBottom: "5%",
            marginRight: "2%",
            width: "min-content"
          }}
          id="isAnonymous"
          onClick={this.props.validateRadio}
        />
        <RadioButton
          rippleStyle={{ color: "rgb(253, 145, 77)" }}
          iconStyle={{ fill: "rgb(240, 143, 76)" }}
          value={false}
          labelStyle={{ marginLeft: "-20%" }}
          label="No"
          id="isAnonymous"
          style={{
            marginBottom: "5%",
            marginRight: "2%",
            width: "min-content"
          }}
          onClick={this.props.validateRadio}
        />
      </RadioButtonGroup>
    );
  }
}
export class SelectfieldClass extends React.Component {
  render() {
    return (
      <SelectField
        maxHeight={180}
        floatingLabelStyle={{ color: "rgb(240, 143, 76)" }}
        floatingLabelText="Select complaint type"
        id="complaintType"
        style={{ width: "100%" }}
        value={this.props.complaintTypeValue}
        onChange={this.props.selectChange}
      >
        <MenuItem value="Favoritism" primaryText="Favoritism" />
        <MenuItem value="Feedback" primaryText="Feedback" />
        <MenuItem value="Harassment" primaryText="Harassment" />
        <MenuItem
          primaryText="Issues With Co-Workers"
          value="Issues With Co-Workers"
        />
        <MenuItem
          value="Lack Of Vacation/Sick Leave"
          primaryText="Lack of Vacation/Sick Leave"
        />
        <MenuItem value="Office Cleanliness" primaryText="Office Cleanliness" />
        <MenuItem value="Office Temperature" primaryText="Office Temperature" />
        <MenuItem value="Other" primaryText="Other" />
        <MenuItem value="Overworked" primaryText="Overworked" />
        <MenuItem value="Pay" primaryText="Pay" />
        <MenuItem value="Policy Changes" primaryText="Policy Changes" />
        <MenuItem value="Work Hours" primaryText="Work Hours" />
      </SelectField>
    );
  }
}
