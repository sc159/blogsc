<template>
<div id="ContactMsg">
  <el-table
      :data="contactData"
      border
      style="width: 100%">
    <el-table-column
        prop="date"
        label="日期">
    </el-table-column>
    <el-table-column
        prop="name"
        label="Name">
    </el-table-column>
    <el-table-column
        prop="email"
        label="Email">
    </el-table-column>
    <el-table-column
        prop="subject"
        label="Subject">
    </el-table-column>
    <el-table-column
        prop="message"
        label="Message">
    </el-table-column>
    <el-table-column
        width="170px"
        label="是否处理">
      <template #default="scope">
        <el-switch
            style="display: block"
            v-model="scope.row.read"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="已处理"
            inactive-text="未处理"
            @change="switchHandle(scope.row)"
        >
        </el-switch>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: "ContactMsg",
  data() {
    return {
      contactData: []
    }
  },
  methods: {
    //请求所有数据
    async getContactData() {
      let {data} = await this.$axios({
        method: "GET",
        url: "/adminServer/contact"
      })

      if (data.code) {
        return this.$message.error(data.msg)
      }

      this.contactData = data.data

    },

    //switch切换触发
    async switchHandle(item) {
      let {data} = await this.$axios({
        method: "POST",
        url: "/adminServer/contact/read",
        data: {
          id: item._id,
          read: item.read
        }
      })
      if (data.code){
        return this.$message.error(data.msg)
      }
    }
  },
  created() {
    this.getContactData()
  }
}
</script>

<style scoped>

</style>