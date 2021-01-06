const router = require('express').Router();
const verify = require('./verifyToken');
const {sapRequest, sapAuth} = require('./../databaseHandler/dbConnector');


router.get('/sql=:sql_query', (req, res) => {
    sapRequest(res, req.params.sql_query)
})

router.post('/sqlQuery', (req, res) => {
    console.log('SQLQUERY: ', req.body);

    sapRequest(res, req.body.sqlQuery)

})

module.exports = router;
