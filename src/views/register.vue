<template>
  <div class="register">
    <template>
      <div class="login">
        <el-card :body-style="{ padding: '50px' }">
          <h3>注册</h3>
          <el-form
            :model="user"
            :rules="userRules"
            ref="user"
            label-width="auto"
          >
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

            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="user.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="register">注册</el-button>
        </el-card>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        psw: "",
        sex: "男",
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
    //注册方法
    register() {
      this.$refs.user.validate((val) => {
        if (val) {
          this.registerReq();
        }
        console.log("表单校验结果:", val);
      });
    },

    registerReq() {
      this.$axios
        .get("http://127.0.0.1:3000/register", {
          params: {
            name: this.user.name,
            psw: this.user.psw,
            sex: this.user.sex,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 1) {
            this.$msg("注册成功!");
            this.$router.push({ path: "/" });
          } else {
            this.$msg(res.data.msg);
          }
        });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.el-card {
  .el-card__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
    