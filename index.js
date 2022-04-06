const express = require("express")
const path = require("path")
port = process.env.PORT || 3000

const app = express()


// Firebase config-----------------------------
var admin = require("firebase-admin");

var serviceAccount = require("./iotproject-a5d6d-firebase-adminsdk-s3oyy-17ce65692d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iotproject-a5d6d-default-rtdb.asia-southeast1.firebasedatabase.app"
});

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views" ))

var db = admin.database()
var ref = db.ref("/DHT/DHT_4");  //Set the current directory you are working in

// console.log(ref);
// Firebase config-----------------------------

app.get("/",(req,res)=>{
    ref.once("value", function(snapshot) {
        var data = snapshot.val();   //Data is in JSON format.
        
        newdata = Object.values(data)
        
        // console.log(newdata);
        
        // res.render("chart", {newdata})
        res.json(newdata)
    })
})

app.listen(port, console.log("localhost: " + port))