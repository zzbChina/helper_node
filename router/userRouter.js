const express = require('express')

const router = express.Router()

const login = require('../interface/login')
const translate = require('../interface/translate')
const read = require('../interface/reading')

//注册
router.post('/register',login.register)

//登录
router.post('/login',login.login)

//获取该用户的翻译数据
router.get('/checkMyTranslateData',translate.checkMyTranslateData)

//检查该文章是否被该用户收藏
router.post('/checkStatusOfThisReading',read.checkStatusOfThisReading)

//用户获取自己的收藏的周刊
router.get('/getAllMyStars',read.getAllMyStars)

module.exports = function(){
    return router
}