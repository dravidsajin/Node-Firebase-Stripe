const firebase = require("firebase");

const app = firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
});

module.exports = app;