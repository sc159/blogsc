const express = require("express");
const app = express();
app.listen(4000,() => {
    console.log("服务启动，端口4000")
});

require("./middleware/mongoose");

//中间件
app.use(require("./middleware/cors"))
app.use(require("./middleware/session"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("./public"))

//路由监听
app.use("/", require("./router/index"))
