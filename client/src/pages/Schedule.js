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
exports.Schedule = void 0;
var material_1 = require("@mui/material");
var Add_1 = __importDefault(require("@mui/icons-material/Add"));
var Close_1 = __importDefault(require("@mui/icons-material/Close"));
var axios_1 = __importDefault(require("axios"));
var lodash_1 = require("lodash");
var react_1 = __importStar(require("react"));
var AddScheduleItemOverlay_1 = require("../components/AddScheduleItemOverlay/AddScheduleItemOverlay");
var ScheduleItem_1 = __importDefault(require("../components/ScheduleItem/ScheduleItem"));
var ScheduleItemEditor_1 = __importDefault(require("../components/ScheduleItemEditor/ScheduleItemEditor"));
var get_config_1 = require("../config/get-config");
var sprinklerServiceUrl = (0, get_config_1.getConfig)().sprinklerServiceUrl;
var Schedule = function () {
    var _a = (0, react_1.useState)([]), list = _a[0], setList = _a[1];
    var _b = (0, react_1.useState)(false), addScheduleItemOverlayOpen = _b[0], setAddScheduleItemOverlayOpen = _b[1];
    var _c = (0, react_1.useState)(false), editorOpen = _c[0], setEditorOpen = _c[1];
    var _d = (0, react_1.useState)(''), errorMessage = _d[0], setErrorMessage = _d[1];
    var _e = (0, react_1.useState)(false), notificationOpen = _e[0], setNotificationOpen = _e[1];
    var _f = react_1["default"].useState(""), selectedValue = _f[0], setSelectedValue = _f[1];
    (0, react_1.useEffect)(function () {
        console.log(selectedValue);
    }, [selectedValue]);
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, programs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get("".concat(sprinklerServiceUrl, "/program"))];
                    case 1:
                        response = _a.sent();
                        programs = response.data;
                        programs.sort(function (a, b) { return a.displayName > b.displayName ? 1 : -1; });
                        setList(programs);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    var updateProgram = function (updatedProgram) { return __awaiter(void 0, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].put("".concat(sprinklerServiceUrl, "/program/").concat(updatedProgram.id), updatedProgram)];
                case 1:
                    result = _a.sent();
                    if (result.status === 200) {
                        setList(function (prevState) { return prevState.map(function (program) {
                            if (program.id === updatedProgram.id)
                                return updatedProgram;
                            return program;
                        }); });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    setErrorMessage('Error updating program.');
                    setNotificationOpen(true);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleAddProgram = function (program) { return __awaiter(void 0, void 0, void 0, function () {
        var result, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].post("".concat(sprinklerServiceUrl, "/program"), (0, lodash_1.omit)(program, 'id'))];
                case 1:
                    result = _a.sent();
                    id = result.data.id;
                    if (result.status === 201) {
                        setList(function (prevState) { return (__spreadArray(__spreadArray([], prevState, true), [
                            __assign(__assign({}, program), { id: id })
                        ], false)); });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleClose = function () {
        setEditorOpen(false);
    };
    var handleCloseNotification = function (event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setNotificationOpen(false);
    };
    var handleDeleteProgram = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"]["delete"]("".concat(sprinklerServiceUrl, "/program/").concat(id))];
                case 1:
                    result = _a.sent();
                    if (result.status === 204) {
                        setList(function (prevState) { return (prevState.filter(function (program) { return program.id !== id; })); });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var action = (<react_1["default"].Fragment>
      <material_1.IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseNotification}>
        <Close_1["default"] fontSize="small"/>
      </material_1.IconButton>
    </react_1["default"].Fragment>);
    return (<>
      <material_1.Container className="schedule__container">
        {list.map(function (program) { return <ScheduleItem_1["default"] key={program.id} program={program} deleteProgram={handleDeleteProgram} updateProgram={updateProgram}/>; })}
        <material_1.Snackbar open={notificationOpen} autoHideDuration={6000} message={errorMessage} action={action}/>
        {/* <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: 30, right: 30 }} onClick={() => setEditorOpen(true)}>
          <AddIcon />
        </Fab> */}
        <material_1.Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: 30, right: 30 }} onClick={function () { return setAddScheduleItemOverlayOpen(true); }}>
          <Add_1["default"] />
        </material_1.Fab>
      </material_1.Container>
      <ScheduleItemEditor_1["default"] open={editorOpen} closeDialog={handleClose} saveProgram={handleAddProgram}/>
      <AddScheduleItemOverlay_1.AddScheduleItemOverlay onClose={function (value) { setAddScheduleItemOverlayOpen(false); setSelectedValue(value); }} open={addScheduleItemOverlayOpen} selectedValue={selectedValue}/>
    </>);
};
exports.Schedule = Schedule;
