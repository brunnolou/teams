import config from "./config";
var Rebase = require("re-base");
var firebase = require("firebase/app");
var database = require("firebase/database");
var app = firebase.initializeApp(config);
var db = firebase.database(app);
var base = Rebase.createClass(db);

export default base;
