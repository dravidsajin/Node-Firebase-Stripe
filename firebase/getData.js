const firebase = require("./firebse_connect");

module.exports = {
    _getData: function(callback){
        firebase.database().ref("users/").once("value").then(function(snapshot){
            callback(snapshot.val());
            //snapshot will return the rows
        })
    }
}