const express = require("express")
const router = express.Router()
const userDB = require("../../db/user")

//鉴权
router.use((req, res, next) => {
    if (!req.session.userInfo) {
        return res.send({
            code: 6,
            msg: "用户未登录"
        })
    }
    next()
})

//用户名修改
router.post("/user", async (req, res) => {
    let {user} = req.body

    //验证符不符合规则
    if (!/^[\w\u4e00-\u9fa5\u0800-\u4e00\uac00-\ud7ff]{2,8}$/.test(user)) {
        return res.send({
            code: 1,
            msg: "用户名格式不正确"
        })
    }

    //验证新旧用户名是否一样
    if (user === req.session.userInfo.user) {
        return res.send({
            code: 7,
            msg: "新用户名与原用户名相同"
        })
    }

    //验证用户名是否已存在
    let doc = await userDB.findOne({user})
    if (doc) {
        return res.send({
            code: 2,
            msg: "用户已存在"
        })
    }

    //修改用户名
    await userDB.findByIdAndUpdate(req.session.userInfo._id,{user})
    //更新session
    req.session.userInfo.user = user
    //返回前端
    res.send({
        code: 0,
        msg: "用户名修改完成",
        data: req.session.userInfo
    })
})

//密码修改
router.post("/pass", async (req, res) => {
    let {oldPass,pass} = req.body;

    //验证符不符合规则
    let reg = /^[\w\[\]\/\\\-!@#$%^&*()+=|,.<>?:;"'{}]{6,18}$/;
    if (!reg.test(pass)) {
        return res.send({
            code: 1,
            msg: "密码格式错误"
        })
    }

   try{
       let _id = req.session.userInfo._id;
       let doc = await userDB.findById(_id);
       if(doc.pass!==oldPass){
           return res.send({
               code:2,
               msg:"原密码错误",

           })
       }

       //新密码与旧密码一样
       if (oldPass === pass){
           return res.send({
               code: 8,
               msg: "新旧密码相同"
           })
       }

       //更新密码
       await userDB.findByIdAndUpdate(_id,{pass});
       req.session.destroy()

       //返回前端
       res.send({
           code: 0,
           msg: "密码修改完成",
       })
   }catch (e){
        return res.send({
            code:4,
            msg:"服务器错误"
        })
   }
})

router.use("/photo",require("./uploadPhoto"));

module.exports = router



