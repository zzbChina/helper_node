const express = require('express')
const app = express()
//引入body-parser中间件，解决post请求参数问题
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

//引入cors解决跨域
const cors = require('cors')
app.use(cors());
//后端路由引入区
const materialRouter = require('./router/materialRouter')
const userRouter = require('./router/userRouter')
const commitRouter = require('./router/commitRouter')

//使用路由中间件
app.use(materialRouter())
app.use(userRouter())
app.use(commitRouter())

//引入前端静态资源
app.use(express.static(__dirname+'/static'))

app.listen(8000,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Local:   http://localhost:8000/')
        console.log('Network: http://10.8.236.179:8000/')
    }
})