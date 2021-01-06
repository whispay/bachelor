const router = require ('express').Router();
const jwt = require('jsonwebtoken');
const {checkSapUser, sapAuthentication} = require('./../databaseHandler/dbConnector');


// /api/user/login creates a JWT Token if user is authenticated
router.post('/login/uname=:uname&pwd=:pwd', async (req, res)=>{
    
    checkSapUser(res, req.params.uname, req.params.pwd)
});

router.get('/uname=:uname&pwd=:pwd', (req, res) => {
    sapAuthentication(res, req.params.uname, req.params.pwd)
})



module.exports = router;