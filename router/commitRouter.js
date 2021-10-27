const express = require('express')

const router = express.Router()


const commit = require('../interface/commit')

const read = require('../interface/reading')
//提交我的翻译或者写作答案信息
router.post('/commitMyTranslateOrWrite',commit.commitMyTranslateOrWrite)

//完成阅读并提交数据
router.get('/finishOneReading',read.finishOneReading)

//收藏一篇文章
router.post('/starOneReading',read.starOneReading)
//取消收藏一篇文章
router.post('/cancelThisReadingStar',read.cancelThisReadingStar)
//修改用户信息
router.post('/updateUserMessage',commit.updateUserMessage)

//用户提交自己的建议
router.post('/commitMyAdvise',commit.commitMyAdvise)

module.exports = function(){
    return router
}