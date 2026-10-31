const express = require('express')
const bc = require('bcrypt')
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')
const router = express.Router()

router.post('/regis',async(req,res)=>{

    try {
        
        const pic_user = req.files.pic_user
        const form = JSON.parse(req.body.form)
        let filename = null
        if(pic_user){
            filename = Date.now() + path.extname(pic_user.name)
            await pic_user.mv(path.join(uploadDir,filename))
        }
        const hash = await bc.hash(form.password,10)
        const [rows] = await db.query(`insert into tb_member(fname,lname,email,username,password,role,pic_user) values(?,?,?,?,?,?,?)`,[form.fname,form.lname,form.email,form.username,hash,form.role,filename])
        res.json(rows,{message:'regis'})
    } catch (error) {
        console.error("error regis",error)
        res.status(500).json({message:"error regis"})
    }

})

module.exports = router