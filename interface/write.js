const dbConfig = require('../connectDB/index')
const info = require('../common/info')

getAllWriteMaterials = (req,res)=>{
    let sql = 'select * from write_materials'
    let sqlArr = []
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,res)
        }else{
            info.resInfo(200,data,'请求数据成功',true,res)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}


module.exports = {
    getAllWriteMaterials
}