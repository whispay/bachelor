const router = require('express').Router();
const verify = require('./verifyToken');
const {sapRequest, sapAuth} = require('./../databaseHandler/dbConnector');


router.get('/table_name=:table_name', (req, res) => {
    var table_name = req.params.table_name.toUpperCase();
    sapRequest(res, "SELECT * from " + table_name);
})

router.get('/names/schema_name=:schema_name', (req, res) => {
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

router.get('/schema_name=:schema_name', (req, res) => {
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


module.exports = router;