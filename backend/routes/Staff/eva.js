const express = require('express')
const bc = require('bcrypt')
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')
const router = express.Router()

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        const {id_member,id_sys,day_eva} = req.body
        const [rows] = await db.query(`insert into tb_eva(id_member,id_sys,day_eva,status_eva) values(?,?,?,?)`,[id_member,id_sys,day_eva,1])
        res.json(rows,{message:'save'})
    } catch (error) {
        console.error("error save",error)
        res.status(500).json({message:"error save"})
    }

})

router.put('/update/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        const {id_eva} = req.params
        const {id_member,id_sys,day_eva} = req.body
        const [rows] = await db.query(`update tb_eva set id_member=?,id_sys=?,day_eva=? where id_eva = ?`,[id_member,id_sys,day_eva,id_eva])
        res.json(rows,{message:'update'})
        
    } catch (error) {
        console.error("error update",error)
        res.status(500).json({message:"error update"})
    }

})

router.delete('/delete/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        const {id_eva} = req.params
        const [rows] = await db.query(`delete from tb_eva where id_eva = ?`,[id_eva])
        res.json(rows,{message:'delete'})
        
    } catch (error) {
        console.error("error delete",error)
        res.status(500).json({message:"error delete"})
    }

})


router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        const [rows] = await db.query(`select * from tb_eva e,tb_system s,tb_member m where e.id_member = m.id_member and e.id_sys = s.id_sys order by id_eva desc`)
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