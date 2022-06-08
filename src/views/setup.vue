<template>
  <div>
    <el-card>
      <h3>修改密码</h3>
      <el-form :model="user" ref="user" label-width="auto">
        <el-form-item label="账号:" prop="name">
          <el-input
            v-model="user.name"
            placeholder="请输入账号"
            clearable
            disabled
          ></el-input>
        </el-form-item>

        <el-form-item label="原密码:" prop="psw">
          <el-input
            type="password"
            v-model="user.oldpsw"
            placeholder="请输入原密码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="psw">
          <el-input
            type="password"
            v-model="user.newpsw"
            placeholder="请输入新密码"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="modi" type="primary"> 修改密码 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        name: "",
        oldpsw: "",
        newpsw: "",
      },
    };
  },

  methods: {
    modi() {
      if (!this.user.oldpsw || !this.user.newpsw) {
        this.$msg("请输入密码!");
      } else {
        this.modifypswReq((res)=>{
           if(res.code == 0){
             this.$msg(res.msg);
           }else{
             this.$msg('密码修改成功!');
             this.$localSave.removeItem('user');
             this.$router.replace('/');
           }
        });
      }
    },

    modifypswReq(callback) {
      this.$axios
        .get("http://127.0.0.1:3000/modifypsw", {
          params: {
            name: this.user.name,
            oldpsw: this.user.oldpsw,
            newpsw: this.user.newpsw,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    },
  },

  mounted() {
    let user = this.$localSave.getItem("user");
    if (user) {
      this.user.name = user.name;
    }
  },
};
</script>

<style lang="less" scoped>
.el-form {
  width: 300px;
}
</style>