const express = require('express');
const app = express();
const config = require('./config/config.json');
//MIDDLEWARES - Function that executes when routes are beeing hit
var cors = require('cors');

//Connect to DB
const hana = require("@sap/hana-client");


const conn = hana.createConnection();

app.use(cors());

var r;

function sapRequest (res, sql) {
    conn.connect(config.dbAccess, err => {
    if(err){
        console.log(err);
        conn.disconnect();
        console.log("Server Disconnected")
    }else{
        conn.exec(sql, (err, results) => {
            if(err){
                console.log(err);
                conn.disconnect();
                console.log("Server Disconnected")
            }else{
                console.log("Schema",results);
                conn.disconnect();
                console.log("Server Disconnected")
                res.send(results);
            }
        });
    }
});

}


//ROUTES
app.get('/schemas', (req,res) =>{
   sapRequest(res, "SELECT SCHEMA_NAME from SCHEMAS")
})

app.get('/tables', (req,res) =>{
    sapRequest(res, "SELECT TABLE_NAME from TABLES WHERE SCHEMA_NAME = 'UPHAN' ")
 })


app.listen(3000);