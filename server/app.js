
//Express
const express = require('express');
const { json } = require('express');
const { restart } = require('nodemon');
const app = express();

//JWT Authentication
const jwt = require('jsonwebtoken');

//Read Configfile
const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: true }));
const config = require('./config/config.json');

//MIDDLEWARES - Function that executes when routes are beeing hit
var cors = require('cors');
app.use(cors());

//Connect to DB
const hana = require("@sap/hana-client");
const conn = hana.createConnection();

//More Route Middlewares
const authRoute = require('./routes/auth');
app.use('/api/user', authRoute);
const schemaRoute = require('./routes/schemas');
app.use('/api/schemas', schemaRoute);
const tablesRoute = require('./routes/tables');
app.use('/api/tables', tablesRoute);
const columnsRoute = require('./routes/columns');
app.use('/api/columns', columnsRoute);
const sqlRoute = require('./routes/sql');
app.use('/api/sql', sqlRoute);

//Listen on Port 3000 when Server starts
app.listen(3000, () => console.log('Server started on Port 3000'));


// ---------------Authentication v2 -------------------------//
/*
async function sapRequestAuth(res, sql, username, password) {
    config.dbAccess.uid = username;
    config.dbAccess.pwd = password;
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


app.post('/api/v2/login', (req, res) => {

    const user = req.body.user;
    jwt.sign({ 'user': user }, 'secretkey', { expiresIn: '360s' }, (err, token) => {
        res.json({
            token: token
        })
    });
});
// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

//Middleware function
function verifyToken(req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ');
        // Get Token from array
        const bearerToken = bearer[1];
        // Set the Token
        req.token = bearerToken;
        // Next middleware function
        next();
    } else {
        //Forbidden
        res.sendStatus(403);
    }
};

// Authenticate the Username and Password from the JWT Token
app.post('/api/v2/auth', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            (sapAuthentication(res, authData.user.username, authData.user.password));

        }
    });
})


// ------------------ API v2 DBMS -------------------------//

//ROUTES-SCHEMA

app.get('/api/v2/schemas', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            sapRequestAuth(res, "SELECT * from SCHEMAS", authData.user.username, authData.user.password);
        }
    });

})

app.get('/api/v2/schemas/names', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            console.log(authData);
            res.sendStatus(403);
        } else {
            console.log(authData);
            sapRequestAuth(res, "SELECT SCHEMA_NAME from SCHEMAS", authData.user.username, authData.user.password);
        }
    });
})

app.get('/api/v2/schemas/schema_name=:schema_name', verifyToken, (req, res) => {
    var schema_names = req.params.schema_name.split("&");
    var sql_query = "SELECT * from SCHEMAS WHERE ";
    for (var i = 0; i < schema_names.length; i++) {
        if (i + 1 == schema_names.length) {

        } else {
            sql_query = sql_query + "SCHEMA_NAME = " + schema_names[i]
        }
        sql_query = sql_query + "SCHEMA_NAME = " + schema_names[i] + " OR "
    };
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            console.log(authData);
            res.sendStatus(403);
        } else {
            sapRequestAuth(res, sql_query, authData.user.username, authData.user.password);
        }
    });

})

//ROUTES-TABLES
app.get('/api/v2/tables/table_name=:table_name',verifyToken, (req, res) => {
    var table_name = req.params.table_name.toUpperCase();
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            console.log(authData);
            res.sendStatus(403);
        } else {
            sapRequestAuth(res,  "SELECT * from "+table_name, authData.user.username, authData.user.password);
        }
    });
 
})

app.get('/api/v2/tables/names/schema_name=:schema_name', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            console.log("Fehlgeschlagen: "+ authData);
            res.sendStatus(403);
        } else {
            console.log(authData);
            sapRequestAuth(res,  "SELECT TABLE_NAME from TABLES WHERE SCHEMA_NAME="+ "'" + req.params.schema_name +"'", authData.user.username, authData.user.password);
        }
    });
   
})


app.get('/api/v2/tables/schema_name=:schema_name', verifyToken,(req, res) => {
    var schema_names = req.params.schema_name.split("&");
    var sql_query = "SELECT * from TABLES WHERE ";
    for (var i = 0; i < schema_names.length; i++) {
        if (i + 1 == schema_names.length) {
            sql_query = sql_query + "SCHEMA_NAME = '" + schema_names[i] + "'"
        } else {
            sql_query = sql_query + "SCHEMA_NAME = " + schema_names[i] + " OR "
        }
    }
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            console.log(authData);
            res.sendStatus(403);
        } else {
            sapRequestAuth(res,  sql_query, authData.user.username, authData.user.password);
        }
    });

})
*/