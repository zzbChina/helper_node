const mysql = require('mysql')
 
module.exports = {
    config : {
        host : 'localhost',
        user:'root',
        password : 'root',
        database : 'helper'
    },
    //连接数据库，使用mysql的连接池的方式连接
    //连接池对象
    sqlConnect:function(sql,sqlArr,callback){
        const pool = mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            if(err){
                console.log('数据库连接失败!')
            }

            //事件驱动
            conn.query(sql,sqlArr,callback)

            //释放链接
            conn.release()
        })
    }
}