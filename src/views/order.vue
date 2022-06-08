<template>
  <div class="order">
    <el-card>
      <el-row :gutter="10">
        <el-col :span="8">
          <!-- 搜索框 -->
          <el-input placeholder="请输入商品名称" v-model="keywords">
            <el-button
              @click="search()"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- el-table:表格 border:边框线条 stripe:隔行显示灰色条块 -->
      <el-table :data="orderlist" border stripe>
        <el-table-column label="订单编号" prop="order_id"></el-table-column>
        <el-table-column label="商品名称" prop="order_name"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="order_pay"></el-table-column>
        <el-table-column label="是否发货" prop="order_pay"></el-table-column>
        <el-table-column label="下单时间" prop="order_time"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" @click="modi(scope.row)" size="mini"
              >修改订单</el-button
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

    <!-- 修改订单的对话框 -->
    <el-dialog
      title="修改订单"
      @close="close"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>
        <el-form
          :model="order"
          :rules="ordermodiRules"
          ref="user"
          label-width="100px"
        >
          <el-form-item label="订单编号" prop="id">
            <el-input v-model="order.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model="order.price"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      orderlist: [],
      keywords: "",
      total: 0,
      page: 0,
      //修改订单的表单数据
      order: { id: "", price: "" },
      //修改订单的验证规则
      ordermodiRules: {
        price: [
          {
            required: true,
            message: "请输入修改后的价格",
            trigger: "blur", //触发时机:失去焦点时
          },
        ],
      },
    };
  },

  mounted() {
    this.refreshList();
  },

  methods: {
    /* 刷新列表 */
    refreshList() {
      this.orderlistReq((res) => {
        this.orderlist = res.data.list;
        this.total = res.data.total;
      });
    },
    /* 搜索接口 */
    searchReq(callback) {
      this.$axios
        .get("http://127.0.0.1:3000/ordersearch", {
          params: {
            keywords: this.keywords,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    },
    //修改订单接口
    ordermodiReq(orderid, orderprice, callback) {
      this.$axios
        .get("http://127.0.0.1:3000/ordermodi", {
          params: {
            order_id: orderid,
            order_price: orderprice,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    },

    //搜索事件
    search() {
      if (!this.keywords) return;
      this.searchReq((res) => {
        this.$msgBox(
          `基于关键字${this.keywords}共搜索到${res.data.length}条商品结果`,
          () => {}
        );
      });
    },
    //修改订单
    modi(order) {
      this.dialogVisible = true;
      let { order_id, order_price } = order;
      this.order.id = order_id;
      this.order.price = order_price;
    },
    //订单列表接口
    orderlistReq(callback) {
      this.$axios
        .get("http://127.0.0.1:3000/orderlist", {
          params: {
            page: this.page,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    },

    currentchange(page) {
      this.page = page-1;
      this.refreshList();
    },

    //弹窗消失触发表单清空事件
    close() {
      this.$refs.user.resetFields();
    },
    /* 修改框确定事件 */
    confirm() {
      this.$refs.user.validate((val) => {
        if (val) {
          this.ordermodiReq(this.order.id, this.order.price, (res) => {
            if (res.code == 1) {
              this.refreshList();
              this.$msg("订单修改成功!");
            } else {
              this.$msg(res.msg);
            }
            this.dialogVisible = false;
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  padding: 20px;
}
.el-table {
  margin-top: 20px;
}
</style>