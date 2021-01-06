const router = require('express').Router();
const verify = require('./verifyToken');
const {sapRequest, sapAuth} = require('./../databaseHandler/dbConnector');

router.get('/test', verify, (req, res) => {
    res.json(
        {
            posts: {
                title: 'my first post', 
                description: 'random data you shouldnt access'
            }
        });
});

router.get('/', (req, res) => {
    sapRequest(res, "SELECT * from SCHEMAS")
})

router.get('/names', (req, res) => {
    sapRequest(res, "SELECT SCHEMA_NAME from SCHEMAS")
})

router.get('/schema_name=:schema_name', (req, res) => {
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



module.exports = router