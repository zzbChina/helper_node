const dbConfig = require('../connectDB/index')
const info = require('../common/info')

//提交我的翻译数据
commitMyTranslateOrWrite = (req,res)=>{
    let {topic,content,note_title,note_content,target_id,time,type,user} = req.body
    let sql = 'select id from user_commit where topic=?'
    let sqlArr = [topic]
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,res)
        }else{
            if(data == ''){
                let sql = 'insert into user_commit set ?'
                let sqlArr = {topic,content,note_title,note_content,target_id,time,type,user}
                let callback = (err)=>{
                    if(err){
                        info.mistake(err,res)
                    }else{
                        info.resInfo(200,'','数据插入成功',true,res)
                    }
                }
                dbConfig.sqlConnect(sql,sqlArr,callback)
            }else{
                info.resInfo(201,'','该标题已经存在',true,res)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//修改我的个人信息
updateUserMessage = (req,res)=>{
    let {type,info} = req.body
    let sql = 'update users set ?=?'
    let sqlArr = [type,info]
    let callback = (err)=>{
        if(err){
            info.mistake(err,res)
        }else{
            info.resInfo(200,'','修改用户信息成功',true,res)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)

}

//提交我的建议
commitMyAdvise = (req,res)=>{
    let {user_id,title,content,star,time} = req.body
    let sql = 'insert user_advise set ?'
    let sqlArr = {user_id,title,content,star,time}
    let callback = (err)=>{
        if(err){
            info.mistake(err,res)
        }else{
            info.resInfo(200,'','提交数据成功',true,res)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}


module.exports = {
    commitMyTranslateOrWrite,
    updateUserMessage,
    commitMyAdvise
}