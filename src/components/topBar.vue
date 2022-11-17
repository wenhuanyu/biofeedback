<template>
  <div class="top">
    <div class="top_left">
        <div style="width: 112px;height: 112px;"><img style="width: 100%;height: 100%"  src="../assets/images/t1.png" alt=""></div>
        <div style="color: #ffffff;font-size: 28px;font-weight: 800;margin-top: 5px;margin-left: 8px;">
            多参数生物反馈系统（医疗版）
        </div>
    </div>
    <div class="top_right" style="margin-right: 40px;">
<!--      <router-link to="SystemAnalysis">-->
<!--        <el-button style="margin-right: 20px" type="warning" round v-if="$route.name == 'Assess'" >系统分析</el-button>-->
<!--      </router-link>-->
        <div style="margin-right: 60px;position: relative;">
            <div style="width:10px;height:10px;border-radius:50%;background: #FF8F5F;position: absolute;top: 0;left: 8px;" v-if="xiaoxi == 1"></div>
            <img src="../assets/images/xiaoxi.png" alt="" @click="messageClick"
                 style="width: 24px; height: 28px;margin-top: 6px;cursor: pointer;">
        </div>
      <img src="../assets/images/user_red.png" alt="">
      <div>
        <el-popover
            placement="top"
            width="160"
            v-model="logoutShow">
          <p>确定退出登录？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="logoutShow = false">取消</el-button>
            <el-button type="primary" size="mini" @click="logout">确定</el-button>
          </div>
          <button slot="reference" class="top-button">
            <p class="login_name" >{{ $store.state.user.username }}</p>
            <img src="../assets/images/bottom_icon_gray.png" alt="">
          </button>
        </el-popover>
      </div>
      <img src="../assets/images/top_close.png" alt="" @click="close">

    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "topBar",
  data() {
    return {
      logoutShow: false,
        // xiaoxi:'',
    };
  },
  computed: {
      ...mapState(['xiaoxi'])
  },
    watch: {
        // xiaoxi(nv,ov) {
        // }
    },
  methods: {
      messageClick() {
          this.$router.push('/messagePage')
      },
    close() {
      this.$confirm('确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('setUserInfo', {data: '', status: false,sysMenuList:[]});
        this.$router.push('/Login');
        this.$message({
          type: 'success',
          message: '成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    logout() {
      this.$store.commit('setUserInfo', {data: '', status: false});
      this.$router.push('/Login');
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
::v-deep .el-button--primary {
    background-color: #1E87F0;
    border-color: #1E87F0;
}
::v-deep .el-button--text {
    color: #1E87F0;
}
.top {
  position: relative;
  height: 120px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: url("../assets/images/indexTop.png");
  padding: 0 35px 0 25px;
}

.top_left, .top_right {
  display: flex;
  align-items: center;
}

.top_left img {
  height: 100px;
  margin-right: 125px;
}

.top_left div {
  display: flex;
  align-items: center;
}

.top_left div a {
  font-size: 20px;
  color: #1E87F0;
  font-weight: bold;
}

.top_left div b {
  display: block;
  height: 42px;
  border-left: 1px solid #b5b5b5;
  margin: 0 30px;
}

.top_left div p {
  background: #1E87F0;
  height: 60px;
  line-height: 60px;
  width: 175px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  border-radius: 4px;
  cursor: pointer;
}

.top_left div p .other {
  background: #DEF5DD;
  color: #1E87F0;
}

.top_right div {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #555;
  margin: 0 15px;
}

.top_right div img {
  margin-left: 5px;
}

.top_group {
  display: none;
  position: absolute;
  top: 85%;
  right: 25px;
  width: 220px;
  z-index: 100;
}

.login_name {
  display: inline-block;
  font-size: 18px;
  color: #ffffff;
}

.top-button {
  border: none;
  background-color: transparent;
}

.top_group a {
  display: block;
  width: 100%;
  text-align: center;
  height: 60px;
  background: #fff;
  border-radius: 50px;
  line-height: 60px;
  font-size: 18px;
  color: #333;
  box-shadow: 0px 3px 18px 0px rgba(0, 0, 0, 0.18);
}
</style>
