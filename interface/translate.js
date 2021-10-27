const dbConfig = require('../connectDB/index')
const info = require('../common/info')

//获取全部的翻译数据
getAllTranslateMaterials = (req,res)=>{
    sql = 'select * from translate_materials'
    sqlArr = []
    callback = (err,data)=>{
        if(err){
            info.mistake(res)
            console.log(err)
        }else{
            let msg = '查询成功'
            info.resInfo(200,data,msg,true,res)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}
//获取单个的翻译材料数据
getSingleTranslateData = (req,res)=>{
    let {target_id} = req.query
    let sql = 'select * from translate_materials where id=?'
    let sqlArr = [target_id]
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,res)
        }else{
            if(data == ''){
                info.resInfo(201,data,'数据为空',true,res)
            }else{
                info.resInfo(200,data,'请求成功',true,res)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//获取翻译材料的重点单词
getAllKeyWordsAboutIt = (req,res)=>{
    let {conn_id,type} = req.query
    let sql = 'select * from keywords where conn_id=? and type=?'
    let sqlArr  = [conn_id,type]
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,res)
        }else{
            if(data == ''){
                info.resInfo(404,data,'请求资源为空',true,res)
            }else{
                info.resInfo(200,data,'请求资源成功',true,res)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//查看我的翻译数据
checkMyTranslateData = (req,res)=>{
    let {type,target_id} = req.query
    let sql = 'select * from user_commit where type=? and user=?'
    let sqlArr = [type,target_id]
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,data)
        }else{
            if(data == ''){
                info.resInfo(200,data,'没有找到数据',true,res)
            }else{
                info.resInfo(200,data,'请求数据成功',true,res)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

module.exports = {
    getAllTranslateMaterials,
    getSingleTranslateData,
    getAllKeyWordsAboutIt,
    checkMyTranslateData
}