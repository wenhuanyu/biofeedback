<template>
    <div>
        <ReportCenterTable
            :page-footer="true"
            :deleteUrl="'api/patient/report_delete'"
            :setting="true"
            :search-url="url"
            :InfoHref="InfoHref"
            :tableTitle="tableTitle"
            detail-href="TestReport"
            :Adownload="true"
            :Adelete = "true"
            @remove="removeBtn"
            class="programme-right"
            @zip_add = "zip_addClick"
            @delinfo="delinfoChange"
            :tableType = "1"
            ref="table"
        />
        <el-dialog :visible.sync="qrDialog" :modal="false" width="22vw" top="25vh" :close-on-click-modal="false">
            <div class="dialog-body">
                <div class="dialog-text" style="text-align: center;color: #FFFFFF;">
                    <img src="../assets/images/tishi.png" style="width: 80px;height: 80px">
                    <h2 style="margin-top: 20px;margin-bottom: 10px;">下载提示</h2>
                    <div style="margin-top: 5px; margin-bottom: 20px" >
                        <h3>打包任务已提交，请稍后在信息中心进行下载</h3>
                    </div>
                    <el-button type="warning" style="background: #F5605A;border: 1px solid #F5605A;color: #FFFFFF;box-shadow:none;" round @click="qrDialog = false">知道了
                    </el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="qrDialog_del" :modal="false" width="22vw" top="25vh" :close-on-click-modal="false">
            <div class="dialog-body">
                <div class="dialog-text" style="text-align: center;color: #FFFFFF;">
                    <img src="../assets/images/tishi.png" style="width: 80px;height: 80px">
                    <h2 style="margin-top: 20px;margin-bottom: 10px;">提示</h2>
                    <div style="margin-top: 5px; margin-bottom: 20px" >
                        <h3>{{ delinfoList }}</h3>
                    </div>
                    <div slot="footer">
                        <el-button type="warning" style="background: #01B2E4;border: 1px solid #01B2E4;color: #FFFFFF;box-shadow:none;" round @click="deleteZJ">直接删除
                        </el-button>
                        <el-button type="primary" round @click="buttonSubmit">一键下载</el-button>
                    </div>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
import ReportCenterTable from "../components/ReportCenterTable";

export default {
    name: "ReportCenter",
    components: {ReportCenterTable},
    data() {
        return {
            tableTitle: [
                {
                    name: '编号',
                    value: 'num'
                },
                {
                    name: '患者',
                    value: 'name'
                },
                {
                    name: '病历号',
                    value: 'medical_num',
                },
                {
                    name: '医保号',
                    value: 'medical_insurance_num'
                }],
            url: 'api/patient/index',
            InfoHref: 'InfoAssess',
            qrDialog: false,
            qrDialog_del:false,
            delinfoList:'',
            delid:'',
            delidxzL:'',
        };
    },
    computed: {},
    watch: {},
    methods: {
        deleteZJ() {
            this.$axios.post('api/patient/report_delete', this.$qs.stringify({
                id: this.delid,
                type:1
            })).then(res => {
                this.$refs.table.onRefresh()
                this.qrDialog_del = false;
            })
        },
        buttonSubmit() {
            this.$axios.post('api/zip/zip_add', this.$qs.stringify({
                patient_id: this.delidxzL,
            })).then(res => {
                if(res.data.code == 1) {
                    this.qrDialog = true
                    this.qrDialog_del = false;
                }

            })
        },
        delinfoChange(res,id,delid) {
            this.qrDialog_del = true;
            this.delinfoList = res.data.name
            this.delidxzL = id
            this.delid = delid
        },
        zip_addClick(res) {
            if(res) {
                this.qrDialog = true
            }
        },
        add() {
        },
        removeBtn(ids) {
            console.log(ids)
        }
    },
    mounted() {
    }
}
</script>

<style scoped lang="scss">
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background: #022358;
}
.el-select-dropdown__item.selected {
    color: #01C2F4 !important;
}

::v-deep {
.el-dialog__wrapper {
    background: rgba(0, 11,26, 0.9);
}
.el-dialog__headerbtn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #01C2F4;
}
.el-dialog__headerbtn .el-dialog__close {
    font-size: 22px;
    color: #000000 !important;
}
.el-select .el-input__inner:focus {
    border: 1px solid #01C2F4;
}
.el-select .el-input.is-focus .el-input__inner {
    border: 1px solid #01C2F4;
}
.el-scrollbar {
    background: #021743;
    border: 1px solid #01C2F4;
}
.el-input.is-disabled .el-input__inner {
    background: #021743;
    border: 1px solid #01C2F4;
}
.el-input__suffix {
    right: 80px;
}
.el-select .el-input .el-select__caret {
    margin-right: 90px;
}
.el-radio__input.is-checked .el-radio__inner {
    background: #01C2F4;
    border: #01C2F4;
}
.el-radio__input.is-checked + .el-radio__label {
    color:#01C2F4 ;
}
.el-radio {
    padding-left: 15px;
    margin-left: 15px;
    width: 80px;
    border: 1px solid #01C2F4 ;
    border-radius: 20px;
    line-height: 40px;
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
    background: #B12C54;
    border: #B12C54;
    border-radius: 3px !important;
}
.el-button--warning {
    background: #01B2E4;
    border: #01B2E4;
    border-radius: 3px !important;
}
.el-input__inner {
    width: 75%;
    background: #021743;
    border: 1px solid #01C2F4;
}
.el-form-item__label {
    font-size: 18px;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 35px;
}
.el-input {
    margin-left: 15px;
    color: #808BA1 !important;
    font-size: 16px;
    font-weight: 500;
}
.el-radio__label {
    color: #ffffff;
}
}
.tan_top {
    position: absolute;
    top: -77px;
    left: -1px;
    width: 444px;
    height: 76px;
    background-image: url("../assets/images/ttt.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-size: 24px;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 76px;
    text-align: center;
}
.tan_body {
}
</style>
