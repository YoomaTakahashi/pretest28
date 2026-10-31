const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')
const uploadDir = path.join(__dirname,'../../uploads/file_eva')
const db = require('../../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authmidleware')

router.get('/',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try {
        const id_member = req.user.id_member
        const [rows] = await db.query(`select * from tb_member m,tb_eva e,tb_system s where e.id_member=? and e.id_member=m.id_member and e.id_sys=s.id_sys order by e.id_eva desc`,[id_member])
        res.json(rows)
    } catch (error) {
        console.error('Error Get user',error)
        res.status(500).json({message:'Error Get user'})
    }
})

module.exports = router