const firebase = require("./firebse_connect");

module.exports = {
    _deleteUserData: function(callback){
        firebase.database().ref("users/").remove();
        callback("success");
    }
}