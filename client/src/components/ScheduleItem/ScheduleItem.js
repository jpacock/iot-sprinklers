"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var material_1 = require("@mui/material");
var Button_1 = __importDefault(require("@mui/material/Button"));
var Switch_1 = __importDefault(require("@mui/material/Switch"));
var react_1 = __importDefault(require("react"));
require("./ScheduleItem.scss");
var ScheduleItemEditor_1 = __importDefault(require("../ScheduleItemEditor/ScheduleItemEditor"));
function ScheduleItem(_a) {
    var program = _a.program, deleteProgram = _a.deleteProgram, updateProgram = _a.updateProgram;
    var _b = react_1["default"].useState(false), editorOpen = _b[0], setEditorOpen = _b[1];
    var handleClickOpen = function () { setEditorOpen(true); };
    var handleClose = function () { setEditorOpen(false); };
    var handleEditorSave = function (program) { return updateProgram(program); };
    var handleSwitch = function () { return updateProgram(__assign(__assign({}, program), { active: !program.active })); };
    return (<>
      <material_1.Card className="schedule-item">
        <material_1.Typography id="alert-dialog-title" p={1} sx={{ flexGrow: 1 }} variant="h6">
            {program.displayName.substring(0, 15)}
        </material_1.Typography>
        <Button_1["default"] variant="outlined" sx={{ mr: 2 }} onClick={handleClickOpen}>
          Edit
        </Button_1["default"]>
        <Switch_1["default"] checked={program.active} onChange={handleSwitch}></Switch_1["default"]>
      </material_1.Card>
      <ScheduleItemEditor_1["default"] program={program} open={editorOpen} closeDialog={handleClose} deleteProgram={deleteProgram} saveProgram={handleEditorSave}/>
    </>);
}
exports["default"] = ScheduleItem;
