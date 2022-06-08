<template>
  <div class="login">
    <div class="card">
      <img src="../imgs/icon.png" />
      <h3>极客营后台管理系统</h3>
      <el-form :model="user" :rules="userRules" ref="user" label-width="60px">
        <el-form-item label="账号:" prop="name">
          <el-input
            v-model="user.name"
            placeholder="请输入账号"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="密码:" prop="psw">
          <el-input
            type="password"
            v-model="user.psw"
            placeholder="请输入密码"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login">登录</el-button>
      <div class="bottomMenu">
        <a href="" @click.prevent="goregister">去注册</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        psw: "",
      },
      userRules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur", //触发时机:失去焦点时
          },
          {
            min: 4,
            max: 10,
            message: "用户名长度在4到10个字符之间",
            trigger: "blur",
          },
        ],

        psw: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur", //触发时机:失去焦点时
          },
        ],
      },
    };
  },

  methods: {
    
    //登录方法
    login() {
      this.$refs.user.validate((val) => {
        if (val) {
          this.loginReq();
        }
        console.log("表单校验结果:", val);
      });
    },
    //登录请求
    loginReq(){
      this.$axios.get('http://127.0.0.1:3000/login',{
          params:{
              name:this.user.name,
              psw:this.user.psw
          }
      }).then(res=>{
          console.log(res);
          if(res.data.code == 1){
            this.$msg('登录成功');
            this.$localSave.setItem('user',res.data.data);
            this.$router.push({ path: "/home" });
          }else{
             
              this.$msg(res.data.msg);
          }
         
      }).catch(err=>{
        if(err){
          alert('服务器挂了!');
        }
      })
    },

    //去注册
    goregister(){
     this.$router.push({path:'/register'});
    }
  },
  
  mounted() {
      // let user = this.$localSave.getItem('user');
      // //如果登录过直接去首页
      // if(user){
      //     this.$router.push({path:'/home'});
      // }
  },
};
</script>

<style lang="less" scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  .card {
    border: 0.5px solid #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40%;
    padding: 20px;
    img {
      width: 100px;
    }
    .el-button {
      width: 60%;
    }
    .bottomMenu{
        width: 60%;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
}


  
}
</style>