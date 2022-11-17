<template>
    <div class="content">
        <div class="content_body">
            <div class="row">
                <el-form ref="form" :model="form" label-width="90px" width="300px">
                    <div style="margin-bottom: 20px;">
                        <el-form-item label="医院名称">
                            <el-input v-model="form.hospital_name"></el-input>
                        </el-form-item>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <el-form-item label="医院副名称">
                            <el-input v-model="form.second_name"></el-input>
                        </el-form-item>
                    </div>
                    <div style="display: flex; margin-left: 20px; margin-bottom: 50px;" >
                        <div style="margin-right: 10px;">医院logo</div>
                        <el-upload
                            class="avatar-uploader border"
                            :show-file-list="false"
                            :action="`${$axios.defaults.baseURL}/api/common/upload_file`"
                            :headers={token}
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="(form || '').logo" :src="(form || '').logo" class="avatar">
                            <img v-else src="../assets/images/morenImg.png">
                            <el-button type="warning" round style="background-color: #01B2E4; border-color: #01B2E4" >上传图标</el-button>
                        </el-upload>
                    </div>
                </el-form>
            </div>
            <div style="position: absolute;bottom: 30px;left: 50px;">
                <el-form style="display: flex;">
                    <el-form-item >
                        <el-button type="primary" round @click="onSubmit">保存</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  style="background: #B12C54;border-color:#B12C54;width: 140px;" round @click="beifen">一键备份</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-dialog :visible.sync="qrDialog" :modal="false" width="22vw" top="25vh" :close-on-click-modal="false">
            <div class="dialog-body">
                <div class="dialog-text" style="text-align: center;color: #FFFFFF;">
                    <img src="../assets/images/tishi.png" style="width: 80px;height: 80px">
                    <h2 style="margin-top: 20px;margin-bottom: 10px;">下载提示</h2>
                    <div style="margin-top: 5px; margin-bottom: 20px" >
                        <h3>备份成功，请稍后在信息中心进行下载</h3>
                    </div>
                    <el-button type="warning" style="background: #F5605A;border: 1px solid #F5605A;color: #FFFFFF;box-shadow:none;" round @click="qrDialog = false">知道了
                    </el-button>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
import store from "../store";

export default {
    name: "SettingConfig",
    data() {
        return {
            form: {
                hospital_name: '',
                second_name: '',
                logo: ''
            },
            token: '',
            qrDialog: false,
        }
    },
    mounted() {
        //消息接口
        this.$store.dispatch('GetXiao')
        this.onList();

        this.token = store.state.user.token
    },
    methods: {
        beifen() {
            this.$axios.post('api/sql/tabledatasql', {}).then(res => {
                if(res.data.code == 1) {
                    this.qrDialog = true
                }
            })
        },
        backPage() {
            this.$router.go(-1);
        },
        onList() {
            this.$axios.post('api/setting/config_info', {}).then(res => {
                this.form = res.data.data ||  {};
                this.$store.commit('setHospital', this.form);
            })
        },
        onSubmit() {
            this.$axios.post('api/setting/config', this.form).then(res => {
                this.onList()
            })
        },
        handleAvatarSuccess(res) {
            (this.form || '').logo = res.data;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
}
</script>

<style lang="scss" scoped>
::v-deep {
    .el-dialog__wrapper {
        background: rgba(0, 11,26, 0.9);
    }
    .el-dialog__header {
        position: relative;
    }
    .el-dialog {
        width: 736px;
        background: rgba(8, 51, 145, 0.3) ;
        border: 1px solid #01C2F4;
    }
    .el-button--primary {
        width: 140px !important;
        height: 50px !important;
        border-color: #01B2E4;
        border-radius: 25px !important;
        background-color: #01B2E4;
        margin-right: 10px;
    }
    .el-form-item__label {
        color: #FFFFFF;
    }
    .el-form-item {
        margin-bottom: 0;
    }
    .el-input__inner {
        color: #FFFFFF;
        background: #021743;
        border-color: #01B2E4;
    }

}
.el-button.is-round {
    width: 150px;
    height: 50px;
}
.content_body .el-form {
    min-width: 400px;
}

.content_body {
    color: #FFFFFF;
    background: rgba(8, 51, 145, 0.3);
    border: 1px solid #01C2F4;
    padding: 82px 0 0;
}

.border {
    width: 240px;
    height: 240px;
    border: 1px solid #01C2F4;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.border img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
}

.border button {
    height: 40px;
    margin-top: 25px;
    font-size: 16px;
}

.row {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}
</style>
