<template>
    <div class="user">
        <Table
            ref="list"
            :edit="true"
            @edit="edit"
            :add="true"
            @add="add()"
            :searchBtn="false"
            :form="form"
            :page-footer="true"
            :deleteUrl="deleteUrl"
            :searchUrl="url"
            :tableTitle="tableTitle"

        >
        </Table>
        <el-dialog class="new-dialog"  :visible.sync="dialogFormVisible">
            <div class="tan_top">
                添加用户
            </div>
            <div class="tan_body">
                <el-form :model="addForm">
                    <el-form-item label="账号" prop="username" label-width="120px" >
                        <el-input v-model="addForm.username" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="nickname" label-width="120px">
                        <el-input v-model="addForm.nickname"  placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="设置密码" label-width="120px"  >
                        <el-input v-model="addForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="role_id" label-width="120px">
                        <el-select v-model="addForm.role_id" placeholder="角色">
                            <el-option v-for="item in role_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
<!--                    <el-form-item label="权限" prop="gender" label-width="120px">-->
<!--                        <el-radio-group v-model="addForm.gender">-->
<!--                            <el-radio :label=1>资料管理</el-radio>-->
<!--                            <el-radio :label=2>修改病例</el-radio>-->
<!--                        </el-radio-group>-->
<!--                    </el-form-item>-->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="buttonQx" round style="background: #01B2E4;border: #01B2E4;border-radius: 3px !important;">取 消</el-button>
                    <el-button type="primary" @click="onAdd" round>确 定</el-button>
                </div>
            </div>

        </el-dialog>
        <el-dialog class="new-dialog"  :visible.sync="terminalShow">
            <div class="tan_top">
                编辑用户
            </div>
            <div class="tan_body">
                <el-form :model="addForm">
                    <el-form-item label="账号" prop="username" label-width="120px" >
                        <el-input v-model="addForm.username" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="nickname" label-width="120px">
                        <el-input v-model="addForm.nickname"  placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="设置密码" label-width="120px"  >
                        <el-input v-model="addForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="role_id" label-width="120px">
                        <el-select v-model="addForm.role_id" placeholder="角色">
                            <el-option v-for="item in role_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <!--                    <el-form-item label="权限" prop="gender" label-width="120px">-->
                    <!--                        <el-radio-group v-model="addForm.gender">-->
                    <!--                            <el-radio :label=1>资料管理</el-radio>-->
                    <!--                            <el-radio :label=2>修改病例</el-radio>-->
                    <!--                        </el-radio-group>-->
                    <!--                    </el-form-item>-->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="selectQx" round style="background: #01B2E4;border: #01B2E4;border-radius: 3px !important;">取 消</el-button>
                    <el-button type="primary" @click="onEdit" round>确 定</el-button>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import Table from '../components/Table';

    export default {
        name       : "SettingUser",
        components : {
            Table
        },
        data() {
            return {
                tableTitle : [
                    // {
                    //     name  : '编号',
                    //     value : 'work_num',
                    //     width : 100
                    // },
                    {
                        name  : '姓名',
                        value : 'nickname',
                        width : 130
                    },
                    // {
                    //     name  : '性别',
                    //     value : 'gender',
                    //     width : 160
                    // },
                    // {
                    //     name  : '电话',
                    //     value : 'contact_phone',
                    //     width : 180
                    // },
                    // {
                    //     name  : '邮箱',
                    //     value : 'email'
                    // },
                    {
                        name  : '角色',
                        value : 'role_text.name',
                        width : 100
                    },
                    {
                        name  : '权限',
                        value : 'role_text.auth_text',
                        width : 500
                    }
                ],
                form       : {
                    page  : 1,
                    limit : 10,
                },
                back:{
                    text:'返回系统页'
                },
                url        : 'api/setting/user_lst',
                deleteUrl  : 'api/setting/user_delete',
                addHref    : 'SettingUserDetail',
                detailHref : 'SettingUserDetail',
                tableData  : [],
                addForm: {
                    nickname:'',
                    username: '',
                    password:'',
                    role_id:'',
                },
                dialogFormVisible:false,
                terminalShow:false,
                role_list: [],
            };
        },
        computed   : {},
        watch      : {},
        mounted() {
            this.onRole()
        },
        methods    : {
            add() {
                this.dialogFormVisible = true
            },
            edit(row) {
                this.terminalShow = true
                this.$axios.post('api/setting/user_info', this.$qs.stringify({id: row.id})).then(res => {
                    var data = res.data.data
                    this.addForm = data
                    this.backup = {...data};
                })
            },
            //添加确定按钮
            async onAdd(){
                await this.$axios.post('api/setting/user_add',this.$qs.stringify( this.addForm)).then(res => {
                    console.log('this.addForm',this.addForm)
                    if(res.data.code == 1){
                        this.$refs.list.onSubmit()
                        this.dialogFormVisible = false
                        this.addForm= {
                            nickname:'',
                            username: '',
                            password:'',
                            role_id:'',
                        }
                    }
                })
            },
            async onEdit() {
                let form = {...this.addForm};
                console.log('form',form)
                this.$axios.post('api/setting/user_edit', {
                    id : form.id,
                    nickname : form.nickname,
                    role_id : form.role_id,
                    username : form.username
                }).then(res => {
                    if (res.data.code === 1) {
                        this.$refs.list.onSubmit()
                        this.terminalShow = false
                        this.addForm= {
                            nickname:'',
                            username: '',
                            password:'',
                            role_id:'',
                        }
                    }
                })

            },
            //编辑  取消按钮
            selectQx() {
                this.terminalShow = false
                this.addForm= {
                    nickname:'',
                    username: '',
                    password:'',
                    role_id:'',
                }
            },
            //添加 取消按钮
            buttonQx() {
                this.dialogFormVisible = false
                this.addForm= {
                    nickname:'',
                    username: '',
                    password:'',
                    role_id:'',
                }
            },
            async onRole() {
                await this.$axios.post('api/setting/role_lst', this.$qs.stringify({id: this.id})).then(res => {
                    if (res.data.code == 1) {
                        this.role_list = res.data.data
                    }
                })
            },
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
    .el-select {
        width: 100%;
    }
.el-scrollbar {
    background: #021743;
    border: 1px solid #01C2F4;
}
.el-input__suffix {
    right: 120px;
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
    width: 120px;
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
