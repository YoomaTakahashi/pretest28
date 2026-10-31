const express = require('express')
const bc = require('bcrypt')
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmidleware')
const router = express.Router()

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const [rows] = await db.query(`insert into tb_indicate(id_topic,name_indicate,detail_indicate,point_indicate,check_indicate) values(?,?,?,?,?)`,[id_topic,name_indicate,detail_indicate,point_indicate,check_indicate])
        res.json(rows,{message:'save'})
    } catch (error) {
        console.error("error save",error)
        res.status(500).json({message:"error save"})
    }

})

router.put('/update/:id_indicate',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        const {id_indicate} = req.params
        const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const [rows] = await db.query(`update tb_indicate set id_topic=?,name_indicate=?,detail_indicate=?,point_indicate=?,check_indicate=? where id_indicate = ?`,[id_topic,name_indicate,detail_indicate,point_indicate,check_indicate,id_indicate])
        res.json(rows,{message:'update'})
        
    } catch (error) {
        console.error("error update",error)
        res.status(500).json({message:"error update"})
    }

})

router.delete('/delete/:id_indicate',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        const {id_indicate} = req.params
        const [rows] = await db.query(`delete from tb_indicate where id_indicate = ?`,[id_indicate])
        res.json(rows,{message:'delete'})
        
    } catch (error) {
        console.error("error delete",error)
        res.status(500).json({message:"error delete"})
    }

})


router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        const [rows] = await db.query(`select * from tb_topic t,tb_indicate i where t.id_topic = i.id_topic order by id_indicate desc`)
        res.json(rows,{message:'get'})
        
    } catch (error) {
        console.error("error get",error)
        res.status(500).json({message:"error get"})
    }

})

// router.get('/showC',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

//     try {
//         const [rows] = await db.query(`select * from tb_member where role='กรรมการประเมิน' order by id_member desc`)
//         res.json(rows,{message:'delete'})
        
//     } catch (error) {
//         console.error("error delete",error)
//         res.status(500).json({message:"error delete"})
//     }

// })

module.exports = router