<template>
  <div class="user">
    <el-card>
      <el-row :gutter="10">
        <el-col :span="8">
          <!-- 搜索框 -->
          <el-input placeholder="请输入用户名" v-model="keywords">
            <el-button @click="search" slot="append" icon="el-icon-search">
            </el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!-- 添加按钮 -->
          <el-button type="primary" @click="dialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- el-table:表格 border:边框线条 stripe:隔行显示灰色条块 -->
      <el-table :data="userlist" border stripe>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" @click="modi(scope.row)" size="mini"
              >修改</el-button
            >
            <el-button
              type="danger"
              @click="deleteMsg(scope.row.name)"
              size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页效果 -->
      <el-pagination
        layout="prev, pager, next"
        :page-size="5"
        @current-change="currentchange"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      @close="close"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>
        <el-form
          :model="adduser"
          :rules="adduserRules"
          ref="user"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="adduser.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="adduser.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="adduser.phone"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户"
      @close="close"
      :visible.sync="modiVisi"
      width="30%"
    >
      <span>
        <el-form :model="modiuser" ref="user" label-width="100px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="modiuser.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="modiuser.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="modiuser.phone"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modiVisi = false">取 消</el-button>
        <el-button type="primary" @click="modiconfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    //自定义邮箱校验规则
    let checkEmail = (rule, value, callback) => {
      let regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return callback();
      } else {
        callback(new Error("请输入正确的邮箱!"));
      }
    };
    //自定义手机号校验规则
    let checkPhone = (rule, value, callback) => {
      let regPhone =
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regPhone.test(value)) {
        return callback();
      } else {
        callback(new Error("请输入正确的手机号!"));
      }
    };
    return {
      total: 0,
      page: 0,
      //搜索内容
      keywords: "",
      //修改用户弹窗
      modiVisi: false,
      //控制添加用户弹窗的显示隐藏
      dialogVisible: false,
      //添加用户的表单数据
      adduser: { name: "", email: "", phone: "" },
      //修改用户的表单数据
      modiuser: { name: "", email: "", phone: "" },
      //添加用户的验证规则
      adduserRules: {
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
        email: [
          {
            required: true,
            message: "请输邮箱",
            trigger: "blur", //触发时机:失去焦点时
          },
          {
            validator: checkEmail,
            trigger: "blur",
          },
        ],

        phone: [
          {
            required: true,
            message: "请输手机号",
            trigger: "blur", //触发时机:失去焦点时
          },
          {
            validator: checkPhone,
            trigger: "blur",
          },
        ],
      },
      userlist: [],
    };
  },

  mounted() {
    //请求列表接口并将数据给userlist
    this.myuserlist();
  },

  methods: {
    //用户搜索接口
    searchReq(callback) {
      this.$axios
        .get("http://127.0.0.1:3000/usersearch", {
          params: {
            keywords: this.keywords,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    },
    //用户列表接口
    userlistReq(callback) {
      this.$axios
        .get("http://127.0.0.1:3000/userlist", {
          params: {
            page: this.page,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    },
    myuserlist() {
      this.userlistReq((res) => {
        this.userlist = res.data.list;
        this.total = res.data.total;
      });
    },
    //删除用户接口
    userdelete(name, callback) {
      this.$axios
        .get("http://127.0.0.1:3000/userdelete", {
          params: {
            name: name,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    },
    //当前页面改变时触发
    currentchange(page) {
      this.page = page-1;
      this.myuserlist();
    },
    //添加用户点击确定时按钮事件
    confirm() {
      this.$refs.user.validate((val) => {
        if (val) {
          let { name, email, phone } = this.adduser;
          this.userlist.unshift({ name, email, phone });
          //隐藏添加用户对话框
          this.dialogVisible = false;
        }
      });
    },
    //修改用户接口
    modiuserReq(user, callback) {
      this.$axios
        .get("http://127.0.0.1:3000/usermodi", {
          params: {
            ...user,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    },
    //确定修改
    modiconfirm() {
      this.modiuserReq(this.modiuser, (res) => {
        if (res.code == 1) {
          this.$msg("修改用户成功!");
          this.myuserlist();
        } else {
          this.$msg(res.msg);
        }
      });
      this.modiVisi = false;
    },
    //添加用户弹窗消失触发事件
    close() {
      this.$refs.user.resetFields();
    },
    //修改用户
    modi(obj) {
      console.log(obj);
      this.modiVisi = true;
      let { name, email, phone } = obj;
      this.modiuser.name = name;
      this.modiuser.email = email;
      this.modiuser.phone = phone;
    },
    //删除用户
    deleteMsg(name) {
      this.$msgBox("此操作将永久删除该用户, 是否继续?", () => {
        this.userdelete(name, (res) => {
          if (res.code == 1) {
            this.$msg("删除用户成功!");
            //重新刷新页面
            this.myuserlist();
          }
        });

        this.userlist.splice(0,1);
      });
    },
    //搜索按钮事件
    search() {
      if (!this.keywords) return;
      this.searchReq((res) => {
        let str = res.data
          .map((item) => {
            return item.name;
          })
          .join(",");
        this.$msgBox(`搜索到用户:${str}`, () => {});
      });
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  padding: 20px;
}
.el-table {
  margin-top: 20px;
}
</style>