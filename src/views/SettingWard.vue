<template>
    <div>
        <Table ref="list"
               :searchTime="false"
               :add="true"
               @add="add()"
               :tableTitle="tableTitle"
               :searchBtn="false"
               :back="back"
               :deleteUrl="deleteUrl"
               :searchUrl="url">
        </Table>
        <el-dialog class="new-dialog"
                   :visible.sync="dialogFormVisible">
            <div class="tan_top">
                新增病区
            </div>
            <div class="tan_body">
                <el-form :model="addForm">
                    <el-form-item label="选择部门" label-width="120px">
                        <el-radio-group v-model="addForm.department_id">
                            <el-radio
                                v-for="(item) in districtList"
                                :key="item.id"
                                :value ="item.id"
                                :label = "item.id"
                            >
                                {{item.name}}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="病区名称" label-width="120px"  >
                        <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入病区名称"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false" round style="background: #01B2E4;border: #01B2E4;border-radius: 3px !important;">取 消</el-button>
                    <el-button type="primary" @click="onAdd" round>确 定</el-button>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import Table from '../components/Table';

    export default {
        name       : "SettingWard",
        components : {
            Table
        },
        data() {
            return {
                tableTitle : [
                    {
                        name  : '编号',
                        value : 'num',
                    },
                    {
                        name  : '部门',
                        value : 'department_name',
                    },
                    {
                        name  : '病区名称',
                        value : 'name',
                        width : 300
                    },
                    {
                        name  : '添加时间',
                        value : 'create_at',
                        width : 300
                    },
                ],
                form       : {

                },
                addForm: {
                    name: '',
                    department_id:''
                },
                back:{
                    text:'返回系统页'
                },
                url        : 'api/district/index',
                deleteUrl  : 'api/district/delete',
                tableData  : [],
                dialogFormVisible: false,
                districtList:[],
            };
        },
        computed   : {},
        watch      : {},
        async mounted() {
            await this.getWard();
        },
        methods    : {
            add() {
                this.dialogFormVisible = true
            },
            async onAdd(){
                if(this.addForm.department_id == '') {
                    this.$message({
                        type: 'info',
                        message: '请选择部门'
                    });
                    return;
                }
                if(this.addForm.name == '') {
                    this.$message({
                        type: 'info',
                        message: '请输入病区名称'
                    });
                    return;
                }
                await this.$axios.post('api/district/add',this.$qs.stringify( this.addForm)).then(res => {
                    if(res.data.code == 1){
                        this.$refs.list.onSubmit()
                        this.addForm.name = '';
                        this.addForm.department_id = '';
                        this.dialogFormVisible = false
                    }
                })
            },
            async getWard() {
                await this.$axios.post('api/district/department').then(res => {
                    this.districtList = res.data.data
                })
            }
        },
    }
</script>

<style scoped lang="scss">
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
    ::v-deep {
        .el-dialog__wrapper {
            background: rgba(0, 11,26, 0.9);
        }
        .el-form-item {
            width: 550px;
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
        width: 100px;
        border: 1px solid #01C2F4 ;
        border-radius: 20px;
        line-height: 40px;
    }
    .el-dialog__header {
        position: relative;
    }
    .el-dialog {
        width: 736px;
        background: rgba(8, 51, 145, 0.3);
        border: 1px solid #01C2F4;
    }
    .el-button--primary {
        background: #B12C54;
        border: #B12C54;
        border-radius: 3px !important;
        margin-left: 50px;
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
    .dialog-footer {
        margin-top: 60px;
        margin-left: 50px;
    }

</style>
