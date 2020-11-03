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
   sapRequest(res, "SELECT * from SCHEMAS")
})

app.get('/schemas/schema_name=:schema_name', (req,res) =>{
    var schema_names = req.params.schema_name.split("&");
    var sql_query = "SELECT * from SCHEMAS WHERE ";
    for(var i = 0; i < schema_names.length; i++){
        if(i + 1 == schema_names.length){

        }else{
            sql_query = sql_query + "SCHEMA_NAME = " + schema_names[i] 
        }
        sql_query = sql_query + "SCHEMA_NAME = " + schema_names[i] + " OR "    
    }

    sapRequest(res, sql_query)
 })


 app.get('/tables/schema_name=:schema_name', (req,res) =>{
    var schema_names = req.params.schema_name.split("&");
    var sql_query = "SELECT * from TABLES WHERE ";
    for(var i = 0; i < schema_names.length; i++){
        if(i + 1 == schema_names.length){
            sql_query = sql_query + "SCHEMA_NAME = '" + schema_names[i] + "'"
        }else{
            sql_query = sql_query + "SCHEMA_NAME = " + schema_names[i] + " OR "  
        }
    }

    sapRequest(res, sql_query)
 })

 app.get('/sql=:sql_query', (req,res) =>{
    sapRequest(res, req.params.sql_query)
 })
app.listen(3000);