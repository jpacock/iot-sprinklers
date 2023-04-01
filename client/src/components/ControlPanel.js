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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var material_1 = require("@mui/material");
var InputAdornment_1 = __importDefault(require("@mui/material/InputAdornment"));
var TextField_1 = __importDefault(require("@mui/material/TextField"));
var axios_1 = __importDefault(require("axios"));
var lodash_1 = require("lodash");
var config_1 = require("../config");
var getZoneDurationByUnit_1 = require("../util/getZoneDurationByUnit");
require("./ControlPanel.scss");
var sprinklerServiceUrl = (0, config_1.getConfig)().sprinklerServiceUrl;
function ControlPanel() {
    var _a = (0, react_1.useState)(''), latestRunId = _a[0], setLatestRunId = _a[1];
    var _b = (0, react_1.useState)(false), startDisabled = _b[0], setStartDisabled = _b[1];
    var _c = (0, react_1.useState)('inches'), unit = _c[0], setUnit = _c[1];
    var _d = (0, react_1.useState)(['1', '2', '3', '4'].map(function (zoneNumber) { return ({
        id: zoneNumber,
        name: "Zone ".concat(zoneNumber),
        running: false,
        measurement: 0
    }); })), zones = _d[0], _setZones = _d[1];
    var setZones = function (updatedZones) {
        _setZones(updatedZones);
        zonesRef.current = updatedZones;
        if (updatedZones.some(function (zone) { return zone.running === true; })) {
            setStartDisabled(true);
        }
        else {
            setStartDisabled(false);
        }
    };
    var zonesRef = (0, react_1.useRef)(zones);
    (0, react_1.useEffect)(function () {
        var updateZonesStatus = function (data) {
            var parsedData = JSON.parse(data);
            var updatedZones = zonesRef.current.map(function (zone) {
                var zoneInResponse = (0, lodash_1.find)(parsedData.pinState, ['zone', zone.id]);
                var running = !zoneInResponse.state;
                return __assign(__assign({}, zone), { running: running });
            });
            var latestRun = (0, lodash_1.get)(parsedData, 'latestRun', {});
            setLatestRunId((0, lodash_1.get)(latestRun, 'id', ''));
            setZones(updatedZones);
        };
        var eventSource = new EventSource("".concat(sprinklerServiceUrl, "/status"));
        eventSource.onmessage = function (e) { return updateZonesStatus(e.data); };
        return function () {
            eventSource.close();
        };
    }, []);
    var handleUpdateMeasurement = function (e) {
        var updatedZones = zones.map(function (zone) {
            if (zone.id === e.target.id) {
                return __assign(__assign({}, zone), { measurement: e.target.value });
            }
            return zone;
        });
        setZones(updatedZones);
    };
    var handleUnitChange = function (event, newUnit) {
        var updatedZones = zones.map(function (zone) {
            return __assign(__assign({}, zone), { measurement: 0 });
        });
        setZones(updatedZones);
        setUnit(newUnit);
    };
    function start() {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req = zones
                            .filter(function (zone) { return zone.measurement > 0; })
                            .map(function (zone) { return ({ zone: zone.id, duration: (0, getZoneDurationByUnit_1.getZoneDurationByUnit)(zone.id, zone.measurement, unit) }); });
                        setStartDisabled(true);
                        return [4 /*yield*/, axios_1["default"].post("".concat(sprinklerServiceUrl, "/runs/start"), req)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function stop() {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(sprinklerServiceUrl, "/runs/stop");
                        return [4 /*yield*/, axios_1["default"].post(url, null, {
                                params: {
                                    runId: latestRunId
                                }
                            })];
                    case 1:
                        _a.sent();
                        setStartDisabled(false);
                        return [2 /*return*/];
                }
            });
        });
    }
    return (<div className="control-panel__container">
      <div className="control-panel__header"> 
        <material_1.Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>Control Panel</material_1.Typography>
      </div>
      <material_1.ToggleButtonGroup className="control-panel__unit-toggle" color="primary" value={unit} exclusive onChange={handleUnitChange}>
        <material_1.ToggleButton value="inches">Inches</material_1.ToggleButton>
        <material_1.ToggleButton value="minutes">Minutes</material_1.ToggleButton>
        <material_1.ToggleButton value="seconds">Seconds</material_1.ToggleButton>
      </material_1.ToggleButtonGroup>
      {zones.map(function (zone) { return (<div className="control-panel__item" key={zone.id}>
            {zone.name} 
            <span className="control-panel__running-label">{zone.running ? '(Running...)' : ''}</span>
            
          <div className="spacer"/>
          <TextField_1["default"] id={zone.id} className="control-panel__item__input" error={isNaN(zone.measurement)} helperText={isNaN(zone.measurement) ? 'Must be number.' : ''} InputProps={{
                endAdornment: <InputAdornment_1["default"] className="control-panel__item__input__unit" position="start">{unit}</InputAdornment_1["default"]>,
                inputProps: {
                    style: { textAlign: 'right' }
                }
            }} value={zone.measurement} onChange={function (e) { return handleUpdateMeasurement(e); }}></TextField_1["default"]>
        </div>); })}
      <material_1.ButtonGroup className="control-panel__actions">
        <material_1.Button disabled={startDisabled} onClick={function () { return start(); }} color="primary" variant="contained">Start</material_1.Button>
        <material_1.Button color="primary" disabled={!startDisabled} onClick={function () { return stop(); }} variant="contained">Stop</material_1.Button>
      </material_1.ButtonGroup>
    </div>);
}
exports["default"] = ControlPanel;
