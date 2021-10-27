const info = require('../common/info.js')
const dbConfig = require('../connectDB/index')

//获取最新6条阅读材料
getSixReadings = (req,res)=>{
    let sql = 'select chinese_title,id from readings order by id desc limit 0,6'
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

//获取5个阅读的封面图信息
getFiveReadingSurface = (req,res)=>{
    let sql = 'select surface,chinese_title from readings limit 0,5'
    let sqlArr = []
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,res)
        }else{
            for(let d of data){
                d.show = false
            }
            info.resInfo(200,data,'请求成功',true,res)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//获取对应的阅读数据
getReadingItemInfo = (req,res)=>{
    let {id} = req.query
    let sql = 'select * from readings where id=?'
    let sqlArr = [id]
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,res)
        }else{
            if(data == ''){
                info.resInfo(404,data,'请求数据为空',true,res)
            }else{
                info.resInfo(200,data,'请求数据成功',true,res)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//获得最热门的三条阅读数据
getHotReadingData = (req,res)=>{
    let sql = 'select surface,chinese_title,id from readings order by finish_number desc limit 0,3'
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

//完成一篇文章的阅读
finishOneReading = (req,res)=>{
    let {user_id,reading_id} = req.query
    let sql = 'select * from reading_finish where user_id=? and reading_id=?'
    let sqlArr = [user_id,reading_id]
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,res)
        }else{
            if(data != ''){
                info.resInfo(202,data,'该用户已完成阅读',true,res)
            }else{
                let sql = 'select finish_number from readings where id=?'
                let sqlArr = [reading_id]
                let callback = (err,data)=>{
                    if(err){
                        info.mistake(err,res)
                    }else{
                        if(data == ''){
                            console.log(reading_id)
                            info.resInfo(404,data,'请求的资源不存在',true,res)
                        }else{
                            let newData = parseInt(data[0].finish_number) + 1
                            let sql = 'update readings set finish_number=? where id=?'
                            let sqlArr = [newData,reading_id]
                            let callback = (err,data)=>{
                                        if(err){
                                            info.mistake(err,res)
                                        }else{
                                            let sql = 'insert into reading_finish set user_id=?,reading_id=?'
                                            let sqlArr = [user_id,reading_id]
                                            let callback = (err)=>{
                                                if(err){
                                                    info.mistake(err,res)
                                                }else{
                                                    info.resInfo(200,data,'数据更新成功',true,res)
                                                }
                                            }
                                            dbConfig.sqlConnect(sql,sqlArr,callback)
                                        }
                                    }
                                    dbConfig.sqlConnect(sql,sqlArr,callback)
                                }
                            }
                        }
                dbConfig.sqlConnect(sql,sqlArr,callback)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//收藏一篇文章
starOneReading  =(req,res)=>{
    let {user_id,target_id,reading_title,time} = req.body
    let sql = 'insert into user_star set user_id=?,target_id=?,reading_title=?,time=?'
    let sqlArr = [user_id,target_id,reading_title,time]
    let callback = (err)=>{
        if(err){
            info.mistake(err,res)
        }else{
            info.resInfo(200,'','数据写入成功',true,res)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//检查该文章的收藏状态
checkStatusOfThisReading = (req,res)=>{
    let {user_id,target_id} = req.body
    let sql = 'select * from user_star where user_id=? and target_id=?'
    let sqlArr = [user_id,target_id]
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,res)
        }else{
            if(data == ''){
                info.resInfo(200,'','该文章海没有被该用户收藏',true,res)
            }else{
                info.resInfo(201,'','该文章已经被该用户收藏',true,res)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//取消该文章的收藏状态
cancelThisReadingStar = (req,res)=>{
    let {user_id,target_id} = req.body
    let sql = 'delete from user_star where user_id=? and target_id=?'
    let sqlArr = [user_id,target_id]
    let callback = (err)=>{
        if(err){
            info.mistake(err,res)
        }else{
            info.resInfo(200,'','删除成功',true,res)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//用户获取自己的所有收藏周刊
getAllMyStars = (req,res)=>{
    let {user_id} = req.query
    let sql = 'select * from user_star where user_id=?  order by id desc'
    let sqlArr = [user_id]
    let callback = (err,data)=>{
        if(err){
            info.mistake(err,res)
        }else{
            if(data == ''){
                info.resInfo(201,data,'数据为空',true,res)
            }else{
                info.resInfo(200,data,'数据成功',true,res)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

module.exports = {  
    getSixReadings,
    getFiveReadingSurface,
    getReadingItemInfo,
    getHotReadingData,
    finishOneReading,
    starOneReading,
    checkStatusOfThisReading,
    cancelThisReadingStar,
    getAllMyStars
}