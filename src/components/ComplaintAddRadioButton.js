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
          iconStyle={{ fill: "rgb(102, 158, 37)" }}
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
          iconStyle={{ fill: "rgb(102, 158, 37)" }}
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
          iconStyle={{ fill: "rgb(102, 158, 37)" }}
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
        defaultSelected="Hour"
      >
        <RadioButton
          labelStyle={{ marginLeft: "-18%" }}
          value="Hour"
          label="Hour"
          id="leaveType"
          checkedIcon={
            <ImageTimer style={{ color: "#558B2F", fill: "#558B2F" }} />
          }
          uncheckedIcon={<ImageTimer />}
          style={{
            marginRight: "18%",
            marginLeft: "18%",
            width: "min-content"
          }}
          onClick={this.props.validateLeave}
        />
        <RadioButton
          labelStyle={{ marginLeft: "-15%" }}
          value="Full"
          label="Full"
          id="leaveType"
          checkedIcon={
            <ActionDateRange style={{ color: "#558B2F", fill: "#558B2F" }} />
          }
          uncheckedIcon={<ActionDateRange />}
          style={{
            width: "min-content"
          }}
          onClick={this.props.validateLeave}
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
          iconStyle={{ fill: "rgb(102, 158, 37)" }}
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
          iconStyle={{ fill: "rgb(102, 158, 37)" }}
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
        floatingLabelText="Complaint Type"
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
