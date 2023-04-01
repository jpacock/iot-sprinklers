"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AddScheduleItemOverlay = void 0;
var material_1 = require("@mui/material");
var react_1 = __importDefault(require("react"));
var AddScheduleItemOverlay = function (props) {
    var onClose = props.onClose, open = props.open, selectedValue = props.selectedValue;
    var handleClose = function () {
        onClose(selectedValue);
    };
    var handleListItemClick = function (value) {
        onClose(value);
    };
    return (<material_1.Dialog onClose={handleClose} open={open}>
      <material_1.DialogTitle>Schedule Type</material_1.DialogTitle>
      <material_1.List sx={{ pt: 0 }}>
        <material_1.ListItem button onClick={function () { return handleListItemClick("Scheduled"); }} key="key-1">
          <material_1.ListItemText primary="Scheduled"/>
        </material_1.ListItem>
        <material_1.ListItem button onClick={function () { return handleListItemClick("Manual"); }} key="key-2">
          <material_1.ListItemText primary="Manual"/>
        </material_1.ListItem>
      </material_1.List>
    </material_1.Dialog>);
};
exports.AddScheduleItemOverlay = AddScheduleItemOverlay;
