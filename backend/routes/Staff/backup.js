const express = require('express')
const mysql2 = require('mysql2')
const db = require('../../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authmidleware')

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
    } catch (error) {
        
    }

})