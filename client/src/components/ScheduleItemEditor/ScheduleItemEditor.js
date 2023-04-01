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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var material_1 = require("@mui/material");
var Add_1 = __importDefault(require("@mui/icons-material/Add"));
var Close_1 = __importDefault(require("@mui/icons-material/Close"));
var Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
var TimePicker_1 = require("@mui/x-date-pickers/TimePicker");
var AdapterMoment_1 = require("@mui/x-date-pickers/AdapterMoment");
var LocalizationProvider_1 = require("@mui/x-date-pickers/LocalizationProvider");
var lodash_1 = require("lodash");
var moment_1 = __importDefault(require("moment"));
var react_1 = __importStar(require("react"));
var uuid_1 = require("uuid");
var shared_1 = require("../../../../shared");
require("./ScheduleItemEditor.scss");
var getZoneDurationByUnit_1 = require("../../util/getZoneDurationByUnit");
var Transition = react_1["default"].forwardRef(function Transition(props, ref) {
    return <material_1.Slide direction="up" ref={ref} {...props}/>;
});
function ScheduleItemEditor(_a) {
    var _this = this;
    var open = _a.open, _b = _a.program, program = _b === void 0 ? {
        id: '',
        active: false,
        displayName: '',
        startHours: 12,
        startMinutes: 0,
        startDaysOfWeek: '',
        runTimes: [{ id: 'zone-1', zoneId: '1', measurement: 0 }],
        runTimeUnit: shared_1.RunTimeUnitType.Seconds
    } : _b, closeDialog = _a.closeDialog, deleteProgram = _a.deleteProgram, saveProgram = _a.saveProgram;
    var _c = (0, react_1.useState)([]), days = _c[0], setDays = _c[1];
    var _d = (0, react_1.useState)(''), displayName = _d[0], setDisplayName = _d[1];
    var _e = (0, react_1.useState)(new Date()), time = _e[0], setTime = _e[1];
    var _f = (0, react_1.useState)(new Date()), endTime = _f[0], setEndTime = _f[1];
    var _g = (0, react_1.useState)(program.runTimes.map(function (runTime) { return (__assign(__assign({}, runTime), { measurement: runTime.measurement.toString() })); })), runTimes = _g[0], setRunTimes = _g[1];
    var _h = (0, react_1.useState)(program.runTimeUnit), runTimeUnit = _h[0], setRunTimeUnit = _h[1];
    var initializeDialog = function () {
        if (deleteProgram) {
            setDays(program.startDaysOfWeek.split(','));
            setDisplayName(program.displayName);
            setTime(function () {
                var date = new Date();
                date.setHours(program.startHours);
                date.setMinutes(program.startMinutes);
                return date;
            });
            console.log(runTimes);
            setRunTimes(program.runTimes.map(function (runTime) { return (__assign(__assign({}, runTime), { measurement: runTime.measurement.toString() })); }));
        }
        else {
            setDays([]);
            setDisplayName('');
            setTime(new Date());
            setRunTimeUnit(shared_1.RunTimeUnitType.Seconds);
        }
    };
    (0, react_1.useEffect)(function () {
        if (open)
            initializeDialog();
        // eslint-disable-next-line
    }, [open]);
    (0, react_1.useEffect)(function () {
        var secondsToAdd = 0;
        runTimes.forEach(function (runTime) {
            if (runTime.zoneId !== '') {
                var zoneId = runTime.zoneId, measurement = runTime.measurement;
                secondsToAdd += (0, getZoneDurationByUnit_1.getZoneDurationByUnit)(zoneId, Number(measurement), runTimeUnit);
            }
        });
        setEndTime((0, moment_1["default"])(time).add(secondsToAdd, 's').toDate());
    }, [runTimes, runTimeUnit, time]);
    var deleteButton;
    if (deleteProgram) {
        deleteButton = <material_1.Button color="error" variant="outlined" sx={{}} onClick={function () { return deleteProgram(program.id); }}>Delete Program</material_1.Button>;
    }
    var handleAddRunTime = function () {
        var newRunTimes = __spreadArray(__spreadArray([], runTimes, true), [
            {
                id: (0, uuid_1.v4)(),
                zoneId: '',
                measurement: '0'
            },
        ], false);
        setRunTimes(newRunTimes);
    };
    var handleChangeRuntimeMeasurement = function (e, id) {
        var newRunTimes = runTimes.map(function (r) {
            if (r.id === id)
                return __assign(__assign({}, r), { measurement: e.target.value });
            return r;
        });
        setRunTimes(newRunTimes);
    };
    var handleChangeRuntimeZone = function (e, id) {
        var newRunTimes = runTimes.map(function (r) {
            if (r.id === id)
                return __assign(__assign({}, r), { zoneId: e.target.value });
            return r;
        });
        setRunTimes(newRunTimes);
    };
    var handleDeleteRunTime = function (id) {
        var newRunTimes = runTimes.filter(function (r) { return r.id !== id; });
        setRunTimes(newRunTimes);
    };
    var handleClose = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    closeDialog();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleDays = function (_, updatedDays) {
        setDays(updatedDays);
    };
    var handleSave = function () {
        // const formattedsDaysOfWeek =
        saveProgram(__assign(__assign({}, program), { displayName: displayName, startDaysOfWeek: days.join(), startHours: (0, moment_1["default"])(time).hours(), startMinutes: (0, moment_1["default"])(time).minutes(), runTimes: runTimes.map(function (runTime) { return (__assign(__assign({}, runTime), { measurement: Number(runTime.measurement) })); }), runTimeUnit: runTimeUnit }));
        closeDialog();
    };
    var handleTimeChange = function (newValue) {
        setTime(newValue);
    };
    return (<>
      <material_1.Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <material_1.AppBar sx={{ position: 'relative' }}>
          <material_1.Toolbar>
            <material_1.IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <Close_1["default"] />
            </material_1.IconButton>
            <material_1.Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit {program.displayName}
            </material_1.Typography>
            <material_1.Button autoFocus color="inherit" onClick={handleSave} disabled={(0, lodash_1.isEmpty)(displayName)}>
              save
            </material_1.Button>
          </material_1.Toolbar>
        </material_1.AppBar>
        <material_1.Container sx={{ mt: 2 }}>
          <material_1.Stack spacing={3}>
            <material_1.ToggleButtonGroup color="primary" value={days} onChange={handleDays} aria-label="outlined primary button group" sx={{ alignSelf: 'center' }}>
              <material_1.ToggleButton value="0">SUN</material_1.ToggleButton>
              <material_1.ToggleButton value="1">MON</material_1.ToggleButton>
              <material_1.ToggleButton value="2">TUE</material_1.ToggleButton>
              <material_1.ToggleButton value="3">WED</material_1.ToggleButton>
              <material_1.ToggleButton value="4">THR</material_1.ToggleButton>
              <material_1.ToggleButton value="5">FRI</material_1.ToggleButton>
              <material_1.ToggleButton value="6">SAT</material_1.ToggleButton>
            </material_1.ToggleButtonGroup>
            <material_1.TextField id="outlined-basic" label="Program Name" variant="outlined" error={(0, lodash_1.isEmpty)(displayName)} value={displayName} onChange={function (event) {
            setDisplayName(event.target.value);
        }}/>
            <material_1.Grid container spacing={2}>
              <material_1.Grid item xs={6}>
                <LocalizationProvider_1.LocalizationProvider dateAdapter={AdapterMoment_1.AdapterMoment}>
                  <TimePicker_1.TimePicker label="Start Time" value={time} onChange={handleTimeChange} renderInput={function (params) { return <material_1.TextField {...params}/>; }}/>
                </LocalizationProvider_1.LocalizationProvider>
              </material_1.Grid>
              <material_1.Grid item xs={6}>
                <LocalizationProvider_1.LocalizationProvider dateAdapter={AdapterMoment_1.AdapterMoment}>
                  <TimePicker_1.TimePicker disabled label="End Time" value={endTime} onChange={handleTimeChange} renderInput={function (params) { return <material_1.TextField {...params}/>; }}/>
                </LocalizationProvider_1.LocalizationProvider>
              </material_1.Grid>
            </material_1.Grid>
            <>
              <material_1.FormControl fullWidth>
                <material_1.ToggleButtonGroup color="primary" value={runTimeUnit} exclusive sx={{ alignSelf: 'center' }} onChange={function (e) { return setRunTimeUnit(e.target.value); }}>
                  <material_1.ToggleButton value="inches">Inches</material_1.ToggleButton>
                  <material_1.ToggleButton value="minutes">Minutes</material_1.ToggleButton>
                  <material_1.ToggleButton value="seconds">Seconds</material_1.ToggleButton>
                </material_1.ToggleButtonGroup>
                </material_1.FormControl>
                <material_1.List>
                {runTimes.map(function (runTime) { return (<material_1.ListItem key={runTime.id}>
                      <material_1.Box sx={{ flexGrow: 1 }}>
                        <material_1.Box sx={{ flexGrow: 1, maxWidth: 150 }}>
                          <material_1.FormControl fullWidth>
                            <material_1.Select id="demo-simple-select" value={runTime.zoneId} onChange={function (e) { return handleChangeRuntimeZone(e, runTime.id); }}>
                              <material_1.MenuItem value={'1'}>Zone 1</material_1.MenuItem>
                              <material_1.MenuItem value={'2'}>Zone 2</material_1.MenuItem>
                              <material_1.MenuItem value={'3'}>Zone 3</material_1.MenuItem>
                              <material_1.MenuItem value={'4'}>Zone 4</material_1.MenuItem>
                            </material_1.Select>
                          </material_1.FormControl>
                        </material_1.Box>
                      </material_1.Box>
                      <material_1.TextField className="control-panel__item__input" error={isNaN(runTime.measurement)} helperText={isNaN(runTime.measurement) ? 'Must be number.' : ''} InputProps={{
                endAdornment: <material_1.InputAdornment className="control-panel__item__input__unit" position="start">{runTimeUnit}</material_1.InputAdornment>,
                inputProps: {
                    style: { textAlign: 'right' }
                }
            }} sx={{ mr: 3 }} value={runTime.measurement} onChange={function (e) { return handleChangeRuntimeMeasurement(e, runTime.id); }}/>
                      <material_1.IconButton onClick={function () { return handleDeleteRunTime(runTime.id); }}>
                        <Delete_1["default"] />
                      </material_1.IconButton>
                    </material_1.ListItem>); })}
              </material_1.List>
              <material_1.Fab color="primary" aria-label="add" sx={{ alignSelf: 'flex-end', mt: 3 }} onClick={handleAddRunTime}>
                <Add_1["default"] />
              </material_1.Fab>

              {deleteButton}
              <material_1.Box sx={{ minHeight: 3 }}></material_1.Box>
            </>
          </material_1.Stack>
        </material_1.Container>
      </material_1.Dialog>
    </>);
}
exports["default"] = ScheduleItemEditor;
