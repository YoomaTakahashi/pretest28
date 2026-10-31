const express = require('express')
const bc = require('bcrypt')
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmidleware')
const router = express.Router()

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        const {day_open,day_out,round_sys,year_sys,status_sys} = req.body
        const [rows] = await db.query(`insert into tb_system(day_open,day_out,round_sys,year_sys,status_sys) values(?,?,?,?,?)`,[day_open,day_out,round_sys,year_sys,status_sys])
        res.json(rows,{message:'save'})
    } catch (error) {
        console.error("error save",error)
        res.status(500).json({message:"error save"})
    }

})

router.put('/update/:id_sys',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        const {id_sys} = req.params
        const {day_open,day_out,round_sys,year_sys,status_sys} = req.body
        const [rows] = await db.query(`update tb_system set day_open=?,day_out=?,round_sys=?,year_sys=?,status_sys=? where id_sys = ?`,[day_open,day_out,round_sys,year_sys,status_sys,id_sys])
        res.json(rows,{message:'update'})
        
    } catch (error) {
        console.error("error update",error)
        res.status(500).json({message:"error update"})
    }

})

router.delete('/delete/:id_sys',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        const {id_sys} = req.params
        const [rows] = await db.query(`delete from tb_system where id_sys = ?`,[id_sys])
        res.json(rows,{message:'get'})
        
    } catch (error) {
        console.error("error delete",error)
        res.status(500).json({message:"error delete"})
    }

})


router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        const [rows] = await db.query(`select * from tb_system where status_sys='y' order by id_system desc`)
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