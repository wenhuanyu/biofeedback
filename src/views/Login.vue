<template>
    <div>
        <div class="welcome" v-if="welcome" >
            <div class="bj"><img src="../assets/images/t1.png"></div>
            <div class="wz">多参数生物反馈系统（医疗版）</div>
            <div class="flex hy" @click="tiaozhuan">
                <div class="hyjt"><img src="../assets/images/t2.gif"></div>
            </div>
        </div>
        <div class="login" v-if="denglu">
            <div class="exit out">
                <img  src="../assets/images/login_exit.png" alt="" @click="exit">
            </div>
            <div class="logo">
                <img  src="../assets/images/t1.png" alt="">
                <div class="logowz">多参数生物反馈系统</div>
            </div>
            <div class="login-content_"></div>
<!--            <div class="z1 zz"></div>-->
<!--            <div class="z2 zz"></div>-->
<!--            <div class="z3 zz"></div>-->
<!--            <div class="z4 zz"></div>-->
            <div class="login-content">
                <p>用户登录</p>
                <form>
                    <div class="item">
                        <img src="../assets/images/login_user.png" alt="">
                        <el-input autocomplete="off" v-model="username" type="text" placeholder="请输入用户名"></el-input>
                    </div>
                    <div class="item">
                        <img src="../assets/images/login_pwd.png" alt="">
                        <el-input autocomplete="off" v-model="password" show-password type="password" placeholder="请输入密码"></el-input>
                    </div>
                    <div class="jizhu">
                        <el-checkbox v-model="remember">记住密码</el-checkbox>
                    </div>
                    <el-button round class="login-btn" @click="login">登录</el-button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name    : "Login",
    data() {
        return {
            username: '',
            password: '',
            remember: false,
            welcome:true,
            denglu:false

        };
    },
    computed: {},
    watch   : {},
    methods : {
        tiaozhuan() {
            this.welcome = false
            this.denglu = true
        },
        async login() {
            // console.log('exec',window.window.getPwd())
            if (!this.username) {
                this.$message.error('请输入用户名');
                return;
            }
            if (!this.password) {
                this.$message.error('请输入密码');
                return;
            }

            await this.$axios.post('api/index/login', {username: this.username, password: this.password}).then(res => {
                if (res.data.code === 1) {
                    this.$store.commit('setToken', res.data.data.token)
                    this.$store.commit('setUserInfo', {data: res.data.data, status: true, username: this.username});
                    this.$store.commit('sethospital_id', res.data.data.hospital_id);
                    console.log('跳转首页')
                    this.$router.push('/');
                    sessionStorage.setItem('usertype','center')


                    if (this.remember) {
                        this.$store.commit('setAccount', {username: this.username, password: this.password});
                    } else {
                        this.$store.commit('setAccount', '');
                    }
                }
            })
        },
        exit() {
            this.$confirm('确定退出系统吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                window.window.close()
            }).catch(() => {
            });
        }
    },

    mounted() {
        this.$store.commit('setClient', false);

        if (this.$store.state.user.account) {
            let data      = this.$store.state.user.account;
            this.password = data.password;
            this.username = data.username;
            this.remember = true;
        }
    }
}
</script>

<style scoped lang="scss">
.welcome {
    width: 100vw;
    height: 100vh;
    background: url('../assets/images/tp.png') no-repeat center;
    background-size: cover;
    overflow: hidden;
    .bj {
        width: 232px;
        height: 232px;
        margin: 0 auto;
        margin-top: 23vh;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .wz {
        width: 1400px;
        height: 148px;
        font-size: 100px;
        font-weight: 800;
        color: #FFFFFF;
        line-height: 148px;
        margin: 0 auto;
    }
    .hy {
        margin-top: 22vh;
        margin-left: 1546px;
        cursor: pointer;
    }
    .hyjt {
        background: url('../assets/images/t3.png') no-repeat center;
    }
}
.login {
    width: 100vw;
    height: 100vh;
    background: url('../assets/images/loginBG.png') no-repeat center;
    background-size: cover;
}

.logo {
    position: absolute;
    top: 20%;
    left: 50%;
    display: flex;
    img {
        width: 80px;
        height: 80px;
    }
    .logowz {
        width: 432px;
        height: 71px;
        font-size: 48px;
        font-weight: 800;
        color: #FFFFFF;
        line-height: 71px;
        margin-left: 22px;
    }
}
.zz {
    width: 25px;
    height: 25px;
}
.z1 {
    position: fixed;
    top: 29.8%;
    left: 50.9%;
    border-top: 5px solid #05E1FA;
    border-left: 5px solid #05E1FA;
}
.z2 {
    position: fixed;
    top: 29.8%;
    left: 75.9%;
    border-top: 5px solid #05E1FA;
    border-right: 5px solid #05E1FA;
}
.z3 {
    position: fixed;
    top: 77.8%;
    left: 50.9%;
    border-bottom: 5px solid #05E1FA;
    border-left: 5px solid #05E1FA;
}
.z4 {
    position: fixed;
    top: 77.8%;
    left: 75.9%;
    border-bottom: 5px solid #05E1FA;
    border-right: 5px solid #05E1FA;
}

.login-content_ {
    width: 500px;
    height: 468px;
    background: #083391;
    opacity: 0.3;
    position: fixed;
    top: 30%;
    left: 51%;
}
.login-content {
    width: 404px;
    position: fixed;
    top: 55%;
    left: 64%;
    transform: translate(-50%, -56%);
}

.login-content p {
    font-size: 30px;
    margin-bottom: 30px;
    text-align: center;
    height: 42px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 42px;
}

.login-content .item {
    display: flex;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #04A0F3;
    height: 55px;
    margin-bottom: 35px;
    padding: 0 20px;
}

.login-content .item img {
    width: 20px;
    height: 20px;
}

.login-content .item input {
    flex: 1;
    margin-left: 15px;
    font-size: 14px;
}

.login-content .item input::-webkit-input-placeholder {
    color: #999999;
}

.login-btn {
    display: block;
    background: linear-gradient(180deg, #02D9F9 0%, #01B2F1 100%);
    border: none!important;
    color: #ffffff;
    font-weight: bold;
    font-size: 16px;
    width: 404px;
    height: 54px;
    margin: 0 auto;
}
::v-deep .el-button.is-round {
    border-radius: 8px !important;
}
.jizhu {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #989898;
    margin-bottom: 30px;
    margin-left: 30px;
}

.jizhu input {
    width: 14px;
    height: 14px;
    margin: 0 10px 0 0;
}

.exit {
    position: fixed;
    top: 8%;
    right: 8%;
    width: 76px;
    height: 76px;
    background: #FFFFFF;
    border-radius: 50%;
    cursor: pointer;
    img {
        display: block;
        width: 33px;
        height: 33px;
        margin: 28% auto;
    }
}

::v-deep .el-input__inner {
    border: none;
    background: none;
    color: #FFFFFF;
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #FFFFFF;
}
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
    color: #02CEF7;
    background-color: #02CEF7;
    border-color: #02CEF7;
}
</style>
