const express =require('express')
const router = express.Router()
const {verifyToken} = require('../middleware/authmidleware')

router.get('/',verifyToken,async (req,res) => {
    try {
        const id_member = req.user.id_member
        const [rows] = await 
    } catch (error) {
        
    }
})