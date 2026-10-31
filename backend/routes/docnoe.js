const express =require('express')
const db = require('../db')
const router = express.Router()

router.get('/show',async (req,res) => {
    try {
        const [rows] = await db.query(`select * from tb_doc where id_eva `)
        res.json(rows)
    } catch (error) {
        console.error('Error Get ',error)
        res.json(500).json({message:'Error get'})
    }
})

module.exports = router