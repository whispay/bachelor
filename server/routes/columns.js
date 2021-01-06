
const router = require('express').Router();
const verify = require('./verifyToken');
const {sapRequest, sapAuth} = require('./../databaseHandler/dbConnector');


//ROUTES-Columns
router.get('/table_name=:table_name', (req, res) => {
    sapRequest(res, "SELECT COLUMN_NAME FROM SYS.TABLE_COLUMNS WHERE TABLE_NAME = '" + req.params.table_name + "'")
})

module.exports = router;