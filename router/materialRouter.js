//引入express模块
const express   = require('express')

const router = express.Router()

const translate = require('../interface/translate')
const write = require('../interface/write')
const reading = require('../interface/reading')
const book = require('../interface/book')
const listen = require('../interface/listening')

//获取所有翻译材料
router.get('/getAllTranslateMaterials',translate.getAllTranslateMaterials)
//获取单个翻译材料
router.get('/getSingleTranslateData',translate.getSingleTranslateData)
//获取对应文章的重点单词
router.get('/getAllKeyWordsAboutIt',translate.getAllKeyWordsAboutIt)

//获取所有阅读材料
router.get('/getSixReadings',reading.getSixReadings)
//获取5片阅读的封面
router.get('/getFiveReadingSurface',reading.getFiveReadingSurface)
//获取对应阅读数据
router.get('/getReadingItemInfo',reading.getReadingItemInfo)
//获取最热门的的三个阅读
router.get('/getHotReadingData',reading.getHotReadingData)

//获取所有写作材料
router.get('/getAllWriteMaterials',write.getAllWriteMaterials)

//获取推荐英文书籍
router.get('/getRecommendBooks',book.getRecommendBooks)

router.post('/getThisBookMsgByPage',book.getThisBookMsgByPage)
//获取对应书籍的基本信息
router.get('/getThisBookBasicInfo',book.getThisBookBasicInfo)


//获取所有听力真题
router.get('/getAllListeningMockExams',listen.getAllListeningMockExams)

//获取该听力考题
router.get('/getListeningById',listen.getListeningById)

module.exports = function(){
    return router
}