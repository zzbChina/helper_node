module.exports = {
    resInfo(code,data,msg,state,res){
        let info = {
            code : code,
            data : data,
            msg : msg,
            status : state,
        }
        res.send(info)
    },
    mistake(err,res){
        let info = {
            code : 500,
            data : '',
            msg : '服务器错误',
            status : false
        }
        res.send(info)
        console.log(err)
    }
}