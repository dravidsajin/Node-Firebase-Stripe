const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const ofirebase = require("./firebase/setData");
const ogetData = require("./firebase/getData");
const updateData = require("./firebase/updateData");
const deleteData = require("./firebase/deleteData");

//add the stripe folder
const Stripe = require("./stripe/stripe.js");

app.use(bodyParser.json());//this will accept json
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port,function(err,data){
    if(err)
        console.log(err);
    else
        console.log("connected");
});

app.post("/savedata/",function(req,res){
    console.log(req.body);
    ofirebase.saveData(req.body,function(err,data){
        //we need to return the result so
        res.send(data);
    });
})

//create end point for fetching data from firebase database
app.get("/userData/",function(req,res){
    ogetData._getData(function(data){
        res.send({"status":"200","statuscode":"1","result":data});
    });
})

//i want to update the email of first users

app.put("/userData/",function(req,res){
    updateData._updateData(req.body,function(data){
        res.send({"status":"200","statuscode":"1","message":"Updated Successfully"});
    });
})

//so now i want to remove all data from users ref of firebase database, so create endpoint for delete

app.delete("/userData/",function(req,res){
    deleteData._deleteUserData(function(data){
        res.send({"status":"200","statuscode":"1","message":"Deleted Successfully"});
    });
})






// stripe tutorial

//creating api for generate the stripe token

// method : post

app.post('/create-token', function(req, res){
    // call a token function
    Stripe.__createToken(req.body, function(err, result){
        if(err){
            res.send(err);
        }else{
            res.send({
                "message": "Token generated Successfully",
                "data": result
            });
        }
    });
});


// creating a endpoint

// method should be : POST
app.post('/create-charge', function(req, res){

   Stripe.__createCharge(req.body, function(err, result){
       if(err){
           res.send(err);
       }else{
           res.send({
                "message": "Charged Successfully",
                "data": result
            });
       }
   });
});


//get the charge details
app.get("/retrieve-charge", function(req, res){

    Stripe.__getCharge(req,function(err, result){
        if(err){
           res.send(err);
       }else{
           res.send({
                "message": "Charged Retrieved Successfully",
                "data": result
            });
       }
    });
});

//list all charges
app.get("/list-charges", function(req, res){

    Stripe.__listCharges(function(err,result){
        if(err){
           res.send(err);
       }else{
           res.send({
                "message": "charges listed successfully",
                "data": result
            });
       }
    });
});

//capture a uncaptured charge
app.get("/capture-charge", function(req, res){

    Stripe.__captureCharge(function(err, result){
        if(err){
           res.send(err);
       }else{
           res.send({
                "message": "charges captured successfully",
                "data": result
            });
       }
    });
});


// update the charge details
app.post("/update-charge", function(req, res){

    Stripe.__updateCharge(req.body, function(err, result){

         if(err){
           res.send(err);
       }else{
           res.send({
                "message": "charges updated successfully",
                "data": result
            });
       }
    });
});
































