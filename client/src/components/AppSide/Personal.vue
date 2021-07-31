<template>
  <div class="Personal">
    <div class="top">
      <div class="img"></div>
      <div class="name">
        <p>shucheng</p>
        <p>WEB Developer</p>
      </div>
      <div class="clear"></div>
      <div class="contact">
        <a href="https://github.com/sc159" class="iconfont icon-github" target="_blank"></a>
        <a href="https://weibo.com/u/6582530718" class="iconfont icon-tubiaozhizuo-" target="_blank"></a>
        <el-popover
          placement="bottom"
          :width="150"
          trigger="click"
        >
          <template #reference>
            <a class="iconfont icon-weixin"></a>
          </template>
          <img style="display: block" src="../../assets/img/personal/weixin.jpg" width="150" height="150">
        </el-popover>

        <a href="http://wpa.qq.com/msgrd?v=3&uin=1730227232&site=qq&menu=yes" class="iconfont icon-QQ" target="_blank"></a>
      </div>
    </div>
    <div class="bottom">
      <a href="" target="_blank">DOWNLOAD CV</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Personal"
}
</script>

<style lang="less" scoped>
.Personal {
  height: 220px;
  margin-bottom: 15px;
  box-shadow: 0 0 4px #ddd;

  .top {
    background-color: #bfe2e6;

    .img {
      overflow: hidden;
      float: left;
      width: 60px;
      height: 60px;
      margin-top: 20px;
      margin-left: 30px;
      border: 2px solid #fff;
      border-radius: 50%;
      background: url('../../assets/img/personal/sc.jpg') no-repeat 50%/cover;
    }

    .name {
      float: right;
      margin-top: 29px;
      margin-right: 30px;

      p:nth-child(1) {
        font-size: 20px;
        font-weight: bolder;
        letter-spacing: 5px;
      }

      p:nth-child(2) {
        font-family: Quicksand;
        color: #555;
        font-weight: 700;
        letter-spacing: 3px;
        font-size: 12px;
        margin-top: 5px;
      }
    }

    .contact {
      margin-top: 15px;
      padding-bottom: 20px;
      display: flex;
      justify-content: space-around;
      a{
        display: block;
        font-size: 20px;
        color: #525252;
        transition: color .3s;
        cursor: pointer;
      }
    }
  }

  .bottom{
    width: 100%;
    padding: 20px 0;
    background-color: #fff;
    a{
      display: block;
      width: 65%;
      height: 40px;
      border-radius: 23px;
      margin: 0 auto;
      box-shadow: 0 0 0 #888;
      font-family: Quicksand;
      font-size: 14px;
      text-align: center;
      line-height: 40px;
      font-weight: 700;
      color: #000;
      letter-spacing: 1px;
      background-color: #bfe2e6;
      transition: box-shadow .3s;

      &:hover{
        box-shadow: 0 2px 10px #888;
      }
    }
  }
}
</style>














