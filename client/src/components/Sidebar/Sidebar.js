"use strict";
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
exports.__esModule = true;
exports.Sidebar = void 0;
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var Sidebar = function () {
    var _a = (0, react_1.useState)(false), open = _a[0], setOpen = _a[1];
    return (<>
      <material_1.IconButton size="large" edge="start" color="inherit" aria-label="logo" onClick={function () { return setOpen(true); }}>
        <icons_material_1.Menu />
      </material_1.IconButton>
      <material_1.Drawer anchor="left" open={open} onClose={function () { return setOpen(false); }} variant="temporary">
        <material_1.Box m={2} width="250px" textAlign="center" role="presentation">
          <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faDroplet} color="lightBlue"/>
        </material_1.Box>
        <material_1.List>
          <material_1.ListItemButton component={react_router_dom_1.Link} to="/schedule" onClick={function () { return setOpen(false); }}>
            <material_1.IconButton>
              <icons_material_1.CalendarMonth />
            </material_1.IconButton>
            Schedule
          </material_1.ListItemButton>
          <material_1.ListItemButton component={react_router_dom_1.Link} to="/run-once" onClick={function () { return setOpen(false); }}>
            <material_1.IconButton>
              <icons_material_1.PlayCircleOutline />
            </material_1.IconButton>
            Run Once
          </material_1.ListItemButton>
          <material_1.ListItemButton component={react_router_dom_1.Link} to="/manual" onClick={function () { return setOpen(false); }}>
            <material_1.IconButton>
              <icons_material_1.ToggleOffOutlined />
            </material_1.IconButton>
            Manual
          </material_1.ListItemButton>
          <material_1.ListItemButton component={react_router_dom_1.Link} to="/history" onClick={function () { return setOpen(false); }}>
            <material_1.IconButton>
              <icons_material_1.History />
            </material_1.IconButton>
            History
          </material_1.ListItemButton>
        </material_1.List>
      </material_1.Drawer>
    </>);
};
exports.Sidebar = Sidebar;
