const dbConfig = require('../connectDB/index')
const info = require('../common/info')
const md5 = require('md5')

//注册
register = (req,res)=>{
    let account = req.body.account
    let sql = 'select * from users where account=?'
    let sqlArr = [account]
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,res)
        }else{
            if(data != ''){
                let msg = '该用户已存在'
                info.resInfo(404,'',msg,true,res)
            }else{
                let password = md5(req.body.password)
                let nickname = req.body.nickname
                let date = req.body.date
                let sql = 'insert into users set account=?,password=?,nickname=?,date=?'
                let sqlArr = [account,password,nickname,date]
                let callback = (err)=>{
                    if(err){
                        info.mistake(err,res)
                    }else{
                        info.resInfo(200,'','注册成功',true,res)
                    }
                }
                dbConfig.sqlConnect(sql,sqlArr,callback)

            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//登录
login = (req,res)=>{
    let account = req.body.account
    let password = md5(req.body.password)
    let sql = 'select * from users where account=?'
    let sqlArr = [account]
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,res);
        }else{
            if(data == ''){
                info.resInfo(202,'','账号不存在',true,res)
            }else{
                if(data[0].password == password){
                    let status = 'true'
                    let last_loginDate = req.body.last_loginDate
                    let sql = 'update users set last_loginDate=?,status=? where account=?'
                    let sqlArr = [last_loginDate,status,account]
                    let callback = (err)=>{
                        if(err){
                            info.mistake(err,res)
                        }else{
                            info.resInfo(200,data,'登录成功',true,res)
                        }
                    }
                    dbConfig.sqlConnect(sql,sqlArr,callback)
                }else{
                    info.resInfo(201,'','密码错误',true,res)
                }
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

module.exports = {
    register,
    login
}