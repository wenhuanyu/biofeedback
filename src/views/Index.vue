<template>
    <div id="index">
        <div style="width: 100vw; height: 128px;"><img style="width: 100%;height: 100%" src="../assets/images/indexTop.png"></div>
        <div class="logo" style="display: flex">
            <div style="width: 112px;height: 112px;"><img style="width: 100%;height: 100%"  src="../assets/images/t1.png" alt=""></div>
            <div style="color: #ffffff;font-size: 28px;font-weight: 800;margin-top: 30px;margin-left: 6px;">
                多参数生物反馈系统
            </div>
        </div>

        <div class="index-content" >
            <div><router-link v-for="(item,index) in line.slice(0,1)"
                              :key="'line1' + index" :to="item.to" :style="{'pointer-events': check(item.name)}">
                <div class="bbb">
<!--                    <div :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" v-html="item.name" class="aaa"></div>-->
                    <!--                    <div :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" v-html="item.introduce" class="ccc"></div>-->
                    <img class="n1" :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" :src="item.img" alt="">
                </div>
            </router-link></div>
            <div><router-link v-for="(item,index) in line.slice(1,2)"
                              :key="'line1' + index" :to="item.to" :style="{'pointer-events': check(item.name)}">
                <div class="bbb">
<!--                    <div :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" v-html="item.name" class="aaa"></div>-->
                    <!--                    <div :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" v-html="item.introduce" class="ccc"></div>-->
                    <img class="n1" :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" :src="item.img" alt="">
                </div>
            </router-link></div>
            <div><router-link v-for="(item,index) in line.slice(2,3)"
                              :key="'line1' + index" :to="item.to" :style="{'pointer-events': check(item.name)}">
                <div class="bbb">
<!--                    <div :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" v-html="item.name" class="aaa"></div>-->
                    <!--                    <div :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" v-html="item.introduce" class="ccc"></div>-->
                    <img class="n1" :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" :src="item.img" alt="">
                </div>
            </router-link></div>
        </div>
        <div class="index-content content1">
            <div><router-link v-for="(item,index) in line.slice(3,4)"
                              :key="'line1' + index" :to="item.to" :style="{'pointer-events': check(item.name)}">
                <div class="bbb">
                    <!--                    <div :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" v-html="item.name" class="aaa"></div>-->
                    <!--                    <div :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" v-html="item.introduce" class="ccc"></div>-->
                    <img class="n1" :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" :src="item.img" alt="">
                </div>
            </router-link></div>
            <div><router-link v-for="(item,index) in line.slice(4,5)"
                              :key="'line1' + index" :to="item.to" :style="{'pointer-events': check(item.name)}">
                <div class="bbb">
                    <!--                    <div :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" v-html="item.name" class="aaa"></div>-->
                    <!--                    <div :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" v-html="item.introduce" class="ccc"></div>-->
                    <img class="n1" :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" :src="item.img" alt="">
                </div>
            </router-link></div>
            <div><router-link v-for="(item,index) in line.slice(5,6)"
                              :key="'line1' + index" :to="item.to" :style="{'pointer-events': check(item.name)}">
                <div class="bbb">
                    <!--                    <div :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" v-html="item.name" class="aaa"></div>-->
                    <!--                    <div :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" v-html="item.introduce" class="ccc"></div>-->
                    <img class="n1" :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" :src="item.img" alt="">
                </div>
            </router-link></div>
        </div>

        <div class="all_right">
            <el-popover
                placement="top"
                width="160"
                v-model="logoutShow">
                <p>确定退出登录？</p>
                <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="logoutShow = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="logout">确定</el-button>
                </div>
                <button slot="reference" class="all_right_top">
                    <img src="../assets/images/user_red.png" alt="">
                    <p>退出登录</p>
                </button>
            </el-popover>
        </div>
    </div>
</template>

<script>
export default {
    name: "Index",
    data() {
        return {
            logoutShow: false,
            line: [
                {
                    img: require("@/assets/images/index_icon6.png"),
                    name: '终端监控',
                    to: '/TermMonitor'
                },
                {
                    img: require('@/assets/images/index_icon1.png'),
                    name: '患者管理',
                    to: 'PatientManagement'
                },

                {
                    img: require("@/assets/images/index_icon4.png"),
                    name: '训练治疗',
                    to: '/Emotion'
                },
                //line 2
                {
                    img: require("@/assets/images/index_icon9.png"),
                    name: '数据分析',
                    to: '/DataAnalysis'
                },
                {
                    img: require("@/assets/images/index_icon5.png"),
                    name: '报告中心',
                    to: '/ReportCenter'
                },
                {
                    img: require("@/assets/images/index_icon8.png"),
                    name: '系统设置',
                    to: '/SystemSetting'
                },

            ]
        };
    },
    computed: {
        check: function () {
            return (name) => {
                return this.$store.state.mainMenus.includes(name) ? 'all' : 'none'
            }
        }
    },
    watch: {
        /*'$store.state.mainMenus':(newVal)=>{
            console.log('mainMenus change',newVal)
        }*/
    },
    async mounted() {
        console.log('用户类型', sessionStorage.getItem('usertype'))

        if (sessionStorage.getItem('usertype') !== 'center') {
            this.$router.push('/TerminalLogin')
        }
        if (!sessionStorage.getItem('usertype')) {
            this.$router.push('/Login')
        }
        this.getRules().then()
    },
    methods: {
        logout() {
            this.$store.commit('setUserInfo', {data: '', status: false});
            this.$router.push('/Login');
        },
        getRules() {
            let rule = new Promise((resolve, reject) => {
                //获取权限列表
                this.$store.dispatch('GetAuth')
            })
            return rule
        }
    },
}
</script>

<style scoped lang="scss">
.n1 {
    width: 365px;
    height: 346px;
    margin-right: 40px;
}
.n2 {
    width: 779px;
    height: 346px;
}
.n3 {
    width: 365px;
    height: 383px;
    margin-right: 40px;
}
.n4 {
    width: 385px;
    height: 383px;
    margin-right: 40px;
}
.n5 {
    width: 354px;
    height: 383px;

}
button {
    border: none;
    background:none;
}
.bbb {
    position: relative;
}
.aaa {
    z-index: 100;
    position: absolute;
    top: 85%;
    left: 8%;
    height: 35px;
    font-size: 24px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 35px;
}
//.ccc {
//    z-index: 100;
//    position: absolute;
//    top: 48%;
//    left: 38%;
//    height: 17px;
//    font-size: 16px;
//    font-weight: 400;
//    color: #FFFFFF;
//    line-height: 17px;
//}
#index {
    width: 100%;
    height: 100vh;
    background: url('../assets/images/indexBG.png') no-repeat;
    background-size: 100% 100%;
}

.logo {
    position: absolute;
    top: 13px;
    left: 5%;
}

.index-content {
    width: 70%;
    display: flex;
    position: fixed;
    top: 18vh;
    left: 18%;
}

.content1 {
    width: 70%;
    top: 58vh;
    left: 18%;
}


.index-content .img {
    display: block;
    transition: .3s all ease-in-out;
}

.index-content a {
    height: 22%;
}

.all_right_top p::after {
    border-top: 8px solid #1E87F0;
}
::v-deep .el-button--primary {
    background-color: #1E87F0;
}
::v-deep .el-button--text {
    color: #1E87F0;
}
.disabled {
    filter: grayscale(100%);
}
</style>
