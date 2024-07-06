const express = require('express');

const router = express.Router();

const{loginVerification, sessionLoginManagement, verifyLogoutStatus} = require('../services/authentication/Authentication');

const {sessionSync, sessionMatch} = require('../services/session/SessionManagement');



function BREAK (req, res, next){
    console.log("break detected");
}

router.post('/registration', async (req, res, next)=>{})

router.post('/forgotpassword', async (req,res, next)=>{})

router.post('/login', loginVerification, sessionLoginManagement, async (req, res) => {});

router.post('/logout', verifyLogoutStatus);

module.exports = router;