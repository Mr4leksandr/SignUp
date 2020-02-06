//list id 2e07109c9e
//API key 70b6611573eed445720b055289fc49c3-us4

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
//send files from public folder
app.use(express.static("public"));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
    let FirstName = req.body.FirstName;
    let LastName = req.body.LastName;
    let Email = req.body.Email;

    //build up an object of data to be posted to the server
    let data = {
        members: [
            {email_address: Email,
            status: "subscribed",
        merge_fields: {
            FNAME: FirstName,
            LNAME: LastName
        }}
        ]
    };

    let jsonData = JSON.stringify(data);

    const options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/2e07109c9e",
        method: "POST",
        headers: {
            "Authorization": "nword 70b6611573eed445720b055289fc49c3-us4"
        },
        body: jsonData
    }

    request(options, function(error, response, body){
        if(error){
            console.log(error);
        } else {
            console.log(response.statusCode);
        }
    });

    console.log(FirstName, LastName, Email);
});

app.listen(3000, function(){
    console.log("Server is running on 3000");
});