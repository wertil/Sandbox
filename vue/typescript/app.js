"use strict";
//start watcher:  tsc app.ts -w
exports.__esModule = true;
var inTypescript = true;
var thingToWatch = "Vlaljadf"; // implicit string type
var thingToWatch2 = "Vlaljadf";
thingToWatch2 = {};
var saySomething = function (stuff) {
    return "lets all watch".concat(stuff).concat(" Today.");
};
saySomething(thingToWatch2);
