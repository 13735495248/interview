<template>
  <div class="home">
    <el-row class="row" :gutter="20">
      <!-- el-col里面放个div在div上加class修改样式,否则gutter会不生效 -->
      <el-col :span="8">
        <!-- 卡片组件 -->
        <el-card shadow="hover">
          <div class="user">
            <img class="icon" :src="user.sex == '男' ? boyImg : girlImg" />
            <div class="userInfo">
              <p class="admin">用户名</p>
              <p class="gtitle">{{ user.name }}</p>
            </div>
          </div>
          <div class="time">
            <p class="gtitle">
              上次登录时间: <span>{{ user.lastlogintime }}</span>
            </p>
            <p class="gtitle">
              上次登录地点: <span>{{ user.lastplace }}</span>
            </p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px">
          <el-table :data="tableData">
            <!-- show-overflow-tooltip:内容过长会有提示tip -->
            <el-table-column
              show-overflow-tooltip
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="num">
          <div class="numcard" v-for="(item, index) in countData" :key="index">
            <i :class="item.icon" :style="{ background: item.color }"></i>
            <div class="des">
              <div>{{ item.value }}</div>
              <div>{{ item.name }}</div>
            </div>
          </div>
        </div>

        <el-card shadow="hover" style="height: 280px; width: 100%" id="bar">
        </el-card>
        <div class="charts">
          <el-card
            class="sonchart"
            shadow="hover"
            style="height: 260px"
            id="pie"
          ></el-card>
          <el-card
            class="sonchart"
            shadow="hover"
            style="height: 260px"
            id="line"
          ></el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { bar, pie, line } from "../tools/echarts.js";
export default {
  data() {
    return {
      user: {},
      boyImg: require("../imgs/boy.png"),
      girlImg: require("../imgs/girl.png"),
      //订单数据
      countData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      //课程列表数据
      tableData: [],
    };
  },

  methods: {
    /* 购买课程接口 */
    buycourseReq() {
      this.$axios.get("http://127.0.0.1:3000/buycourse").then((res) => {
        if (res.data.code == 1) {
          this.tableData = res.data.data;
        }
      });
    },

    /* 订单情况接口 */
    buyorderReq() {
      this.$axios.get("http://127.0.0.1:3000/buyorder").then((res) => {
        if (res.data.code == 1) {
          this.countData = res.data.data;
        }
      });
    },

    /* 图表接口 */
    charts(type, callback) {
      this.$axios
        .get("http://127.0.0.1:3000/charts", {
          params: {
            type: type,
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
      this.user = user;
    }

    this.buycourseReq();
      this.buyorderReq();
      this.charts("bar", (res) => {
        bar(
          document.getElementById("bar"),
          res.data.title,
          res.data.xdata,
          res.data.ydata
        );
      });
      this.charts("pie", (res) => {
        pie(document.getElementById("pie"), res.data);
      });
      this.charts("line", (res) => {
        line(document.getElementById("line"), res.data.xdata, res.data.ydata);
      });
  },
};
</script>

<style lang="less" scoped>
.home {
  .row {
    padding: 20px;
  }
  .user {
    display: flex;
    align-items: center;
    justify-content: center;
    .userInfo {
      margin-left: 20px;
      .admin {
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
  /* 右边卡片 */
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
    .numcard {
      margin-left: 5px;
      margin-top: 5px;
      border: 1px solid #eee;
      width: 30%;
      height: 60px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      i {
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .des {
        display: flex;
        flex-direction: column;
        height: 60px;
        justify-content: space-between;
        margin-left: 20px;
        font-size: 14px;
        color: #333;
      }
    }
  }
  .charts {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .sonchart {
      width: 49%;
    }
  }
  .time {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon {
    height: 80px;
    width: 80px;
  }

  .gtitle {
    font-size: 14px;
    color: #666;
  }
}
</style>