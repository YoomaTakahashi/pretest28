const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')
const uploadDir = path.join(__dirname,'../uploads')
const JWT_SECRET = process.env.JWT_SECRET
const bc = require('bcrypt')
const db  