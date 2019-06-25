import { FlatButton, IconButton, MenuItem, IconMenu } from "material-ui";
import React from "react";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

export const actions = [
  <FlatButton label="Cancel" primary={true} />,
  <FlatButton label="Add" primary={true} />
];

const iconButtonElement = (
  <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
    <MoreVertIcon />
  </IconButton>
);
export const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Archive</MenuItem>
  </IconMenu>
);
