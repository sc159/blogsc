const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const articleDB = require("../../db/article")

let md_upload = multer({
    storage :multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname,"../../public/file/md"))
        },
        filename: function (req, file, cb) {
            req.md_name = `md-${Date.now()}.md`
            cb(null,  req.md_name)
        }
    })
}).single('file')

let cover_upload = multer({
    storage :multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname,"../../public/file/cover"))
        },
        filename: function (req, file, cb) {
            let {ext} = path.parse(file.originalname)
            req.cover_name = `cover-${Date.now()}${ext}`
            cb(null, req.cover_name)
        }
    })
}).single('file')

//上传md
router.post("/md",async (req,res)=>{
    let doc = req.body
    md_upload(req, res, async (err) => {
        //上传失败
        if (err) {
            return res.send({
                code: 9,
                msg: "上传失败"
            })
        }
        //上传成功
        res.send({
            code: 0,
            msg: "md上传成功",
            url: `/file/md/${req.md_name}`
        })
    })
})

//上传cover
router.post("/cover",async (req,res)=>{
    cover_upload(req, res, async (err) => {
        //上传失败
        if (err) {
            return res.send({
                code: 9,
                msg: "上传失败"
            })
        }
        //上传成功
        res.send({
            code: 0,
            msg: "cover上传成功",
            url: `/file/cover/${req.cover_name}`
        })
    })
})

//文章发表
router.post("/add", async (req, res)=>{
    let {title, des, md, cover} = req.body

    let doc = await articleDB.create({
        title: title || undefined,
        des: des || undefined,
        md,
        cover: cover || undefined,
        author: req.session.userInfo._id
    })

    res.send({
        code: 0,
        msg: "文章发表成功",
        data:{_id:doc._id}
    })
})

//文章修改
router.post("/update", async (req, res) => {
    let {id, doc} = req.body

    await articleDB.findByIdAndUpdate(id, doc)

    res.send({
        code: 0,
        msg: "修改成功"
    })
})

//文章删除
router.delete("/delete",async (req,res)=>{
    let {id} = req.body
    await articleDB.findByIdAndDelete(id)
    res.send({
        code: 0,
        msg: "删除完成"
    })
})

module.exports = router