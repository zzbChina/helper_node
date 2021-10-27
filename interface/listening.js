const dbConfig = require('../connectDB/index')
const info = require('../common/info')

getAllListeningMockExams = (req,res)=>{
    let sql = 'select id,title,time from mock_exams'
    let sqlArr = []
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,res)
        }else{
            if(data == ''){
                info.resInfo(201,'','数据为空',true,res)
            }else{
                info.resInfo(200,data,'数据返回成功',true,res)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

getListeningById = (req,res)=>{
    let {id} = req.query
    let sql = 'select * from mock_exams where id=?'
    let sqlArr = [id]
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,data)
        }else{
            if(data == ''){
                info.resInfo(201,'','没有找到数据',true,res)
            }else{
                info.resInfo(200,data,'找到数据',true,res)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}


module.exports = {
    getAllListeningMockExams,
    getListeningById
}