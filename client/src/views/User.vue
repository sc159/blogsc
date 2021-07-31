<template>
  <div id="User">
    <div class="txt"> 用户信息</div>
    <div>昵称：{{userInfo.user}}</div>
    <div id="box">
      头像：<span class="img" :style="{ backgroundImage: `url(${baseURL}${userInfo.photo}${random})` }"
              :title="userInfo.user"
    ></span>
    </div>
    <article>
      <el-tabs v-model="activeName">
        <el-tab-pane label="修改用户名" name="first"><UpdateName></UpdateName></el-tab-pane>
        <el-tab-pane label="修改密码" name="second">  <UpdatePass></UpdatePass>
        </el-tab-pane>
        <el-tab-pane label="修改头像" name="third"><UpdatePhoto></UpdatePhoto></el-tab-pane>
      </el-tabs>
    </article>
  </div>
</template>

<script>
import UpdateName from "../components/User/UpdateName";
import UpdatePass from "../components/User/UpdatePass";
import UpdatePhoto from "../components/User/UpdatePhoto";
import {mapState} from "vuex"
export default {
  name: "User",
  data(){
    return{
      activeName:"first",
      random:`?_=${Date.now()}`
    }
  },
  components:{
    UpdateName,UpdatePass,UpdatePhoto
  },
  computed:{
    ...mapState(['userInfo'])
  },
  watch:{
    userInfo(){
      this.backHome();
      this.random = `?_=${Date.now()}`
    }
  },
  methods:{
    backHome(){
      if(!this.userInfo.user){

        this.$router.replace("/")
      }
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.backHome();
    })
  }
}
</script>

<style scoped lang="less">
#User{
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 15px;
  box-shadow: 0 0 4px #ddd;
  padding: 25px 20px;
  background-color: #fff;
  font-family: Quicksand, Microsoft YaHei, sans-serif;
  .txt{
    font-weight: 700;
    font-size: 20px;
    margin: 0 0 20px;
  }
  #box{
    height: 34px;
    line-height: 34px;
    margin: 20px 5px;
    .img {
      display: inline-block;
      width: 34px;
      height: 34px;
      background: none center center/cover;
      cursor: pointer;
    }
  }
}
</style>