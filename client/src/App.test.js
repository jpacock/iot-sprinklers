"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = require("@testing-library/react");
var react_2 = __importDefault(require("react"));
var App_1 = __importDefault(require("./App"));
test('renders learn react link', function () {
    (0, react_1.render)(<App_1["default"] />);
    var linkElement = react_1.screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
