var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb://localhost:27017/Database')
var db = mongoose.connection
db.on('error',()=> console.log("Error in connecting to database"))
db.once('open',()=>console.log("Connected to databse"))

app.post("/signup", (req, res) => {
  var email_id = req.body.email_id;
  var uname = req.body.uname;
  var passwd = req.body.passwd;
  var repasswd = req.body.repasswd;

  var data = {
      "email": email_id,
      "username": uname,
      "password": passwd,
      "repassword": repasswd
  };

  db.collection('users').insertOne(data, (err, result) => {
      if (err) {
          console.error("Error adding record:", err);
          return res.status(500).send("Error adding record");
      }
      console.log("Record added successfully");
      app.get('/',(req,res)=>{
        res.sendFile(__dirname+ 'http://127.0.0.1:5501/index.html');
    })
  });
});

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('sign_up.html')
}).listen(3001);

console.log("Listening on port 3001");
