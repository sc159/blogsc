<template>
  <el-alert
      title="点击下方+号上传头像"
      :closable="false"
      type="warning"
      show-icon>
  </el-alert>
  <el-upload
      class="avatar-uploader"
      :action="baseURL+'/personal/photo'"
      :show-file-list="false"
      :with-credentials="true"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  name: "UpdatePhoto",
  data() {
    return {
      imageUrl: ''
    };
  },
  methods: {
    ...mapMutations(['loginSuccess']),
    handleAvatarSuccess(res, file) {
      console.log(file)
      if (res.code){
        return this.$message.error("上传失败，请稍后再试")
      }
      this.imageUrl = URL.createObjectURL(file.raw);
      this.loginSuccess(res.data)
    },
    beforeAvatarUpload(file) {
      const isJPG = /^image\/(jpeg|png)$/.test(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped lang="less">
/deep/.el-upload {
  margin: 20px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  .el-icon-plus {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar{
    display: block;
    max-width: 178px;
    max-height: 178px;
  }
}

</style>