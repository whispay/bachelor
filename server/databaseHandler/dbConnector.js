//Connect to DB
const hana = require("@sap/hana-client");
const conn = hana.createConnection();

//Read Configfile
const config = require('./../config/config.json');

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

const jwt = require('jsonwebtoken');

function checkSapUser(res, username, password) {
    config.dbAccess.uid = username;
    config.dbAccess.pwd = password;

    conn.connect(config.dbAccess, err => {
        if (err) {
            console.log(err);
            conn.disconnect();
            console.log("Server Disconnected");
            res.send(false);
        } 
        //If no Error then send back a token
        else {
            console.log("Server Connected");
            conn.disconnect();
            console.log("Server Disconnected");

            const token = jwt.sign({'username': username, 'password': password}, 'secretkey');
            res.header('auth-token', token).send(token);
        }
    })

}

module.exports = {
    sapRequest,
    sapAuthentication,
    checkSapUser,
}