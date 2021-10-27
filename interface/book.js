const dbConfig = require('../connectDB/index')
const info = require('../common/info')

//获取推荐书籍基本信息
getRecommendBooks = (req,res)=>{
    let sql = 'select * from books limit 0,3'
    let sqlArr = []
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,res)
        }else{
            info.resInfo(200,data,'请求成功',true,res)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//获取这片英文书籍的内容对应页码的内容
getThisBookMsgByPage = (req,res)=>{
    let {conn_id,page} = req.body
    let sql = 'select * from book_chapter where conn_id=? and page=?'
    let sqlArr = [conn_id,page]
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,res)
        }else{
            if(data == ''){
                info.resInfo(200,data[0],'请求数据为空',true,res)
            }else{
                info.resInfo(200,data[0],'请求数据成功',true,res)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}
//获取对应书籍的基本内容
getThisBookBasicInfo = (req,res)=>{
    let {id} = req.query
    let sql = 'select * from books where id=?'
    let sqlArr = [id]
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,res)
        }else{
            if(data == ''){
                info.resInfo(201,data,'请求资源不存在',true,res)
            }else{
                info.resInfo(200,data[0],'请求资源成功',true,res)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

module.exports = {
    getRecommendBooks,
    getThisBookMsgByPage,
    getThisBookBasicInfo
}