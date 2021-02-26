
const dotenv = require('dotenv');
dotenv.config();
//require('../dotenv').config();
var cors = require('cors')
const AuthController = require('../controllers/AuthController')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

var corsOptions = {

    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  function tokenRefreshauthenticateToken(req, res, next){ // middleware that can be used to verify a user
    const authHeader = req.headers['authorization']; // expecting to have bearer token in header against authorization
    const token = authHeader && authHeader.split(' ')[1]; // token contains bearer TOKEN# so it splits on the basis of space
    if(token == null) return res.sendStatus(401) // if token header is null it will respond back with 401 error
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, user)=>{ // it will verify with our Secret Token 
        if(err) return res.sendStatus(403); // if not found it will return an error
        req.user = user // if found will set req.user as a user
        res.send('the user is verified and user is :'+ user);
        next();  
    })
}
router.post('/register',cors(corsOptions), AuthController.register)
router.post('/login',cors(corsOptions), AuthController.login)
router.get('/',cors(corsOptions), AuthController.getlogin)
router.get('/compiler/exec_trainer1/iot1',cors(corsOptions), AuthController.exec_trainer1_iot1)
router.get('/get_firebase_app',cors(corsOptions), AuthController.get_firebase_app)
router.post('/serialdata',cors(corsOptions), AuthController.serialdata)
router.post('/compile',cors(corsOptions), AuthController.compile)
router.get('/compile1',cors(corsOptions), AuthController.compile1)



module.exports = router
