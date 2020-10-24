const express = require('express');
const app = express();
const config = require('./config/config.json');
//MIDDLEWARES - Function that executes when routes are beeing hit


//Connect to DB
const hana = require("@sap/hana-client");

const conn = hana.createConnection();
var r;

conn.connect(config.dbAccess, err => {
    if(err){
        console.log(err);
    }else{
        conn.exec("SELECT SCHEMA_NAME from SCHEMAS", (err, results) => {
            if(err){
                console.log(err);
            }else{
                console.log(results);
                r = results;
            }
        });
    }
});



//ROUTES
app.get('/', (req,res) =>{
    res.send(r);
})

app.listen(3000);