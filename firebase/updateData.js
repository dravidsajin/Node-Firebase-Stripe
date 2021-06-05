const firebase = require("./firebse_connect");

module.exports = {
    _updateData: function(req,callback){
        //i wait to update the email
        let username = req.username;
        let email = req.email;

        firebase.database().ref("users/"+username+"/").update({
            email: email
        });
        callback("success");
    }
}