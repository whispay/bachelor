const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: true }));
const config = require('./config/config.json');
//MIDDLEWARES - Function that executes when routes are beeing hit
var cors = require('cors');

//Connect to DB
const hana = require("@sap/hana-client");
const { json } = require('express');
const { restart } = require('nodemon');


const conn = hana.createConnection();

app.use(cors());

var r;

async function sapRequest(res, sql) {
    await conn.connect(config.dbAccess, err => {
        if (err) {
            res.send(err);
            console.log(err);
            conn.disconnect();
            console.log("Server Disconnected")
        } else {
            conn.exec(sql, async (err, results) => {
                if (err) {
                    res.send(err);
                    console.log(err + "THIS IS A ERROR");
                    conn.disconnect();
                    console.log("Server Disconnected")
                } else {
                    let r = await results;
                    console.log("Schema", r);

                    //When doing a Insert or Delete the Response is a status Code
                    if (typeof r == 'number') {
                        conn.disconnect();
                        console.log("Server Disconnected");
                    }
                    //When Doing a CREATE, the Response is undefined
                    else if (typeof r == undefined) {
                        conn.disconnect();
                        console.log("Server Disconnected");
                        //SELECT
                    } else {
                        res.send(r);
                        conn.disconnect();
                        console.log("Server Disconnected");
                    }
                }
            });
        }
    });

}

function sapAuthentication(res, username, password) {
    config.dbAccess.uid = username;
    config.dbAccess.pwd = password;
    conn.connect(config.dbAccess, err => {
        if (err) {
            res.send(false);
            console.log(err);
            console.log(config.dbAccess);
            conn.disconnect();
            console.log("Server Disconnected");
        } else {
            res.send(true);
            console.log("Server Connected");
            conn.disconnect();
            console.log("Server Disconnected");
        }
    })
}

//Authentication


app.post('/api/login', (req, res) => { 
    
    /*const user= {
        id:1,
        username: 'jia',
        email: "dschialin@gmail.com"
    }*/
    const user = req.body.user;
    jwt.sign({user:user}, 'secretkey', {expiresIn: '360s'} ,(err, token)=>{
        res.json({
            token:token
        })
    }); 
});
// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

//Middleware function
function verifyToken(req, res, next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //Split at the space
        const bearer = bearerHeader.split(' ');
        // Get Token from array
        const bearerToken = bearer[1];
        // Set the Token
        req.token = bearerToken;
        // Next middleware function
        next();
    }else{
        //Forbidden
        res.sendStatus(403);
    }
};

// Auth POST
app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData)=>{
        if(err){
            res.sendStatus(403)
        } else{
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
})

//ROUTES-Columns

app.get('/columns/table_name=:table_name', (req, res) => {
    sapRequest(res, "SELECT COLUMN_NAME FROM SYS.TABLE_COLUMNS WHERE TABLE_NAME = '" + req.params.table_name + "'")
})

//ROUTES-SCHEMA
app.get('/authentication/uname=:uname&pwd=:pwd', (req, res) => {
    sapAuthentication(res, req.params.uname, req.params.pwd)
})

app.get('/schemas', (req, res) => {
    sapRequest(res, "SELECT * from SCHEMAS")
})

app.get('/schemas/names', (req, res) => {
    sapRequest(res, "SELECT SCHEMA_NAME from SCHEMAS")
})

app.get('/schemas/schema_name=:schema_name', (req, res) => {
    var schema_names = req.params.schema_name.split("&");
    var sql_query = "SELECT * from SCHEMAS WHERE ";
    for (var i = 0; i < schema_names.length; i++) {
        if (i + 1 == schema_names.length) {

        } else {
            sql_query = sql_query + "SCHEMA_NAME = " + schema_names[i]
        }
        sql_query = sql_query + "SCHEMA_NAME = " + schema_names[i] + " OR "
    }

    sapRequest(res, sql_query)
})

//ROUTES-TABLES
app.get('/tables/table_name=:table_name', (req, res) => {
    var table_name = req.params.table_name.toUpperCase();
    sapRequest(res, "SELECT * from " + table_name);
})

app.get('/tables/names/schema_name=:schema_name', (req, res) => {
    var schema_names = req.params.schema_name.split("&");
    var sql_query = "SELECT TABLE_NAME from TABLES WHERE ";
    for (var i = 0; i < schema_names.length; i++) {
        if (i + 1 == schema_names.length) {
            sql_query = sql_query + "SCHEMA_NAME = '" + schema_names[i] + "'"
        } else {
            sql_query = sql_query + "SCHEMA_NAME = " + schema_names[i] + " OR "
        }
    }
    sapRequest(res, sql_query)
})


app.get('/tables/schema_name=:schema_name', (req, res) => {
    var schema_names = req.params.schema_name.split("&");
    var sql_query = "SELECT * from TABLES WHERE ";
    for (var i = 0; i < schema_names.length; i++) {
        if (i + 1 == schema_names.length) {
            sql_query = sql_query + "SCHEMA_NAME = '" + schema_names[i] + "'"
        } else {
            sql_query = sql_query + "SCHEMA_NAME = " + schema_names[i] + " OR "
        }
    }

    sapRequest(res, sql_query)
})

app.get('/sql=:sql_query', (req, res) => {
    sapRequest(res, req.params.sql_query)
})

app.post('/sqlQuery', (req, res) => {
    console.log('SQLQUERY: ', req.body);

    sapRequest(res, req.body.sqlQuery)

})
app.listen(3000, () => console.log('Server started on Port 3000'));