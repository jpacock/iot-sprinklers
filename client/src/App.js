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
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
require("./App.css");
var Sidebar_1 = require("./components/Sidebar/Sidebar");
var pages_1 = require("./pages");
var theme = (0, styles_1.createTheme)({
    palette: {
        primary: {
            main: '#388e3c'
        },
        secondary: {
            main: '#546e7a'
        }
    }
});
function App() {
    var _a = (0, react_1.useState)(false), isDrawerOpen = _a[0], setIsDrawerOpen = _a[1];
    return (<styles_1.ThemeProvider theme={theme}>
      
      <div className="App">
        <react_router_dom_1.BrowserRouter>
          <material_1.Box sx={{ flexGrow: 1 }}>
            <material_1.Drawer anchor="left" open={isDrawerOpen} onClose={function () { return setIsDrawerOpen(false); }}>
              <material_1.Box p={2} role="presentation">
                Schedule
              </material_1.Box>
            </material_1.Drawer>
            <material_1.AppBar position="static">
              <material_1.Toolbar>
                <Sidebar_1.Sidebar />
                <material_1.Box sx={{ margin: "10px" }}>
                  <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faDroplet}/>
                </material_1.Box>
                <material_1.Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Sprinkler UI
                </material_1.Typography>
              </material_1.Toolbar>
            </material_1.AppBar>
          </material_1.Box>
        
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/" element={<pages_1.Schedule />}/>
            <react_router_dom_1.Route path="/history" element={<pages_1.History />}/>
            <react_router_dom_1.Route path="/manual" element={<pages_1.Manual />}/>
            <react_router_dom_1.Route path="/run-once" element={<pages_1.RunOnce />}/>
            <react_router_dom_1.Route path="/schedule" element={<pages_1.Schedule />}/>
          </react_router_dom_1.Routes>
        </react_router_dom_1.BrowserRouter>
      </div>
    </styles_1.ThemeProvider>);
}
exports["default"] = App;
