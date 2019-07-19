import React from "react";
import {
  SelectField,
  MenuItem,
  RadioButton,
  RadioButtonGroup,
  Avatar
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

//Leave purpose radiobtn
export class PurposeRadioButton extends React.Component {
  render() {
    console.log(this.props.purpose);
    return (
      <RadioButtonGroup
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "10%"
        }}
        name="shipSpeed"
        defaultSelected={this.props.purpose}
      >
        {this.props.purposeData.map((purpose, id) => (
          <RadioButton
            key={id}
            style={{ marginRight: "5%" }}
            rippleStyle={{ color: "rgb(253, 145, 77)" }}
            iconStyle={{ fill: "rgb(240, 143, 76)" }}
            value={purpose.purpose}
            label={
              <Avatar
                src={purpose.iconUrl}
                style={{
                  height: "22px",
                  width: "22px",
                  backgroundColor: "white",
                  borderRadius: "0%"
                }}
              />
            }
            id="purpose"
            onClick={this.props.validatePurpose}
          />
        ))}
      </RadioButtonGroup>
    );
  }
}

//LeaveType radiobtn
export class LeaveApplyRadioButton extends React.Component {
  render() {
    return (
      <RadioButtonGroup
        style={{
          display: "flex",
          justifyContent: "space-around"
        }}
        name="shipSpeed"
        defaultSelected={this.props.leaveType}
      >
        <RadioButton
          value="Hour"
          label="Hour"
          id="leaveType"
          checkedIcon={<ImageTimer style={{ fill: "#f08f4c" }} />}
          uncheckedIcon={<ImageTimer />}
          style={{
            width: "min-content"
          }}
          onClick={this.props.validateLeave}
        />
        <RadioButton
          value="Full"
          label="Full"
          id="leaveType"
          checkedIcon={<ActionDateRange style={{ fill: "#f08f4c" }} />}
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
        {this.props.complaintType.map((data, index) => (
          <MenuItem
            key={index}
            value={data.value}
            primaryText={data.displayName}
          />
        ))}
      </SelectField>
    );
  }
}
