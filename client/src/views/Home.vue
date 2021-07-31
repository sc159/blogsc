<template>
  <div id="Home">
    <!--hello-->
    <article class="hello">
      <h2>HELLO!</h2>
      <p class="des">
        你好！欢迎来到我的博客！我是一名前端工程师，热衷于研究JavaScript、NodeJs、Vue……这是我的主页！我会在这里发表一些不成熟的技术文章，记录一些沙雕的日常。博客目前使用的是Vue
        + Element + Node + Express + MongoDB搭建的，如果对源码感兴趣的话可以<a href="https://github.com/sc159"
                                                                      target="_blank">点击这里</a>。欢迎提出宝贵的建议哦！</p>
      <div class="info">
        <div class="personal">
          <h3>personal information</h3>
          <ul>
            <li>
              <p>NICKNAME</p>
              <p>程子</p>
            </li>
            <li>
              <p>ADDRESS</p>
              <p>湖北省武汉市</p>
            </li>

            <li>
              <p>EMAIL</p>
              <p>1730227232@qq.com</p>
            </li>
            <li>
              <p>GITHUB</p>
              <p><a href="https://github.com/sc159" target="_blank">https://github.com/sc159</a></p>
            </li>
          </ul>
        </div>
        <div class="skills">
          <h3>skills</h3>
          <ul>
            <li>
              <p class="lang">
                <span>HTML</span>
                <span>90%</span>
              </p>
              <p class="level">
                <span style="width: 90%"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span>css</span>
                <span>90%</span>
              </p>
              <p class="level">
                <span style="width: 90%"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span>Javascript</span>
                <span>85%</span>
              </p>
              <p class="level">
                <span style="width: 85%"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span>NodeJs</span>
                <span>80%</span>
              </p>
              <p class="level">
                <span style="width: 80%"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span>Vue</span>
                <span>70%</span>
              </p>
              <p class="level">
                <span style="width: 70%"></span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </article>

    <!--article-->
    <article class="article">
      <h2>ARTICLE</h2>
      <p class="des">热门文章推荐。 <a href="/article">更多文章</a> 请访问文章页（￣︶￣）↗　</p>
      <div class="content" v-if="hotArticle.length">
        <div class="left">
          <div class="art">
            <img src="../assets/img/article/1.jpg" alt="">
            <p>{{hotArticle[0].title}}</p>
            <div class="cover">
              <a :href="`/article/${hotArticle[0]._id}`" target="_blank">
                <p>View More</p>
              </a>
            </div>
          </div>
          <div class="art">
            <img src="../assets/img/article/3.jpg" alt="">
            <p>{{hotArticle[1].title}}</p>
            <div class="cover">
              <a :href="`/article/${hotArticle[1]._id}`" target="_blank">
                <p>View More</p>
              </a>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="art">
            <img src="../assets/img/article/2.jpg" alt="">
            <p>{{hotArticle[2].title}}</p>
            <div class="cover">
              <a :href="`/article/${hotArticle[2]._id}`" target="_blank">
                <p>View More</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>

    <!--contact-->
    <article class="contact">
      <h2>CONTACT ME</h2>
      <p class="des">有任何问题请联系我吧，收到消息后会给您回复邮件的哦♪(^∇^*)</p>
      <el-form
          :model="contactForm"
          status-icon
          :rules="rules"
          ref="contactForm"
          label-position="top"
      >
        <el-form-item label="Your Name" prop="name">
          <el-input v-model="contactForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Your Email" prop="email">
          <el-input v-model="contactForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Subject" prop="subject">
          <el-input v-model.number="contactForm.subject"></el-input>
        </el-form-item>
        <el-form-item label="Your Message" prop="message">
          <el-input v-model="contactForm.message" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">Send</el-button>
        </el-form-item>
      </el-form>
    </article>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {

      //表单数据
      contactForm: {
        name: "",
        email: "",
        subject: "",
        message: ""
      },
      //表单规则
      rules: {
        name: [
          {required: true, trigger: "blur"}
        ],
        email: [
          {type: "email", required: true, trigger: "blur"}
        ],
        message: [
          {required: true, trigger: "blur"}
        ],
        subject: [{type: "string"}]
      },
      //文章列表
      hotArticle: []
    }
  },

  methods: {
    //Contact me的提交
    submit() {
      //需要验证表单的数据合不合要求
      //需要调用el-form组件的validate
      this.$refs.contactForm.validate(async valid=>{
        if (valid){
          let {data} = await this.$axios({
            method: "POST",
            url: "/contact",
            data: this.contactForm
          })

          if (data.code){
            return this.$message.error(data.msg)
          }

          this.$message.success("发送成功，我会尽快回复的")
          this.$refs.contactForm.resetFields()
        }else{
          return false
        }
      })
    },
    //请求文章数据
    async getArticle() {
      let {data} = await this.$axios({
        method: "get",
        url: "/get/article"
      })
      if (data.code) return
      this.hotArticle = data.data.slice(0, 3)
    }
  },
  created() {
    this.getArticle()
  }
}
</script>

<style lang="less" scoped>

#Home {
  article {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 15px;
    font-family: Quicksand;
    box-shadow: 0 0 4px #ddd;

    h2 {
      margin-bottom: 15px;
      font-size: 30px;
      letter-spacing: 3px;
      padding-top: 10px;
    }

    p.des {
      padding-bottom: 20px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;

      a {
        text-decoration: underline;
        color: #aaa;
      }
    }
  }

  article.hello {
    .info {
      display: flex;
      width: 100%;

      & > div {
        display: flex;
        flex-direction: column;
        width: 50%;
      }

      h3 {
        margin-bottom: 30px;
        font-weight: 400;
        font-size: 22px;
        color: #666;
      }

      .personal {
        overflow: hidden;
        display: flex;

        ul {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          li {
            display: flex;

            p:nth-child(1) {
              width: 40%;
              font-weight: 700;
            }

            p:nth-child(2) {
              width: 60%;
            }

            a {
              text-decoration: none;
            }
          }
        }
      }

      .skills {
        ul li {
          margin-bottom: 20px;

          p.lang {
            display: flex;
            justify-content: space-between;
            font-weight: 700;
            letter-spacing: 2px;

            span:nth-child(1) {
              font-size: 14px;
            }

            span:nth-child(2) {
              font-size: 12px;
              color: #999;
            }
          }

          p.level {
            width: 100%;
            height: 5px;
            background-color: #ececec;

            span {
              display: block;
              height: 100%;
              background-color: #bfe2e6;
            }
          }
        }
      }
    }
  }

  article.article {
    height: 810px;
    div.content {
      display: flex;

      > div {
        box-sizing: border-box;
        width: 50%;
        padding-right: 1px;

        .art {
          overflow: hidden;
          position: relative;
          box-sizing: border-box;
          padding-bottom: 1px;

          img {
            display: block;
            width: 100%;
          }

          > p {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30px;
            background-color: rgba(0, 0, 0, .1);
            font-weight: 700;
            line-height: 30px;
            color: #fff;
            text-align: center;
            transition: bottom .3s;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          div.cover {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            width: 100%;
            height: 100%;

            a {
              display: block;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, .5);
              opacity: 0;
              transition: opacity .3s;

              p {
                position: absolute;
                transition: .3s;
                font-weight: 700;
              }
              p:nth-child(1) {
                left: 50%;
                bottom: 50%;
                width: 30%;
                height: 32px;
                border-radius: 16px;
                text-align: center;
                line-height: 32px;
                transform: translateX(-50%);
                color: #000;
                background-color: #bfe2e6;
              }
            }
          }

          &:hover div.cover a {
            opacity: 1;

            p:nth-child(1) {
              top: 32%;
            }

            p:nth-child(2) {
              bottom: 32%;
            }
          }
        }
      }
    }
  }

  article.contact {
    .el-form {
      padding: 0 40px;
    }
    .el-button{
      display: block;
      width: 100px;
      height: 40px;
      margin-top: 35px;
      border: 0;
      border-radius: 20px;
      box-shadow: 0 0 0 #bbb;
      background-color: #bfe2e6;
      font-weight: 700;
      font-size: 16px;
      letter-spacing: 2px;
      font-family: Quicksand,"sans-serif";
      color: #000;
      outline: 0;
      cursor: pointer;
      transition: box-shadow .3s;
      &:hover{
        box-shadow: 0 3px 5px #bbb;
      }
    }
  }
}

</style>














