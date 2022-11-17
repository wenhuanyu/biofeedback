<template>
    <div>
        <Table ref="list"
               :add="true"
               :searchTime="false"
               @add="add"
               :edit="true"
               @edit="edit"
               :tableTitle="tableTitle"
               :searchBtn="false"
               :form="form"
               :back="back"
               :deleteUrl="deleteUrl"
               :searchUrl="url">
        </Table>
        <el-dialog class="new-dialog" :visible.sync="dialogFormVisible">
            <div class="tan_top">
                {{title}}
            </div>
            <el-form :model="addForm">
                <el-form-item label="角色名称" label-width="120px">
                    <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色权限" label-width="120px">
                    <div v-for="item in authList" :key="item.id">
                        <div class="row">
                            <el-checkbox class="select-all" :indeterminate="item.isIndeterminate" v-model="item.checked"
                                         @change="handleCheckAllChange(item)">{{ item.name }}
                            </el-checkbox>
                            <el-checkbox-group v-model="item.checkedCities" @change="handleCheckedCitiesChange(item)"
                            >
                                <el-checkbox v-for="child in item.child" :label="child.id" :key="child.id">{{ child.name
                                    }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>

                    </div>

                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" round style="border-color: #01B2E4; background-color: #01B2E4; border-radius: 3px !important;">取 消</el-button>
                <el-button type="primary" @click="onAdd" round >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Table from '../components/Table';

    export default {
        name       : "SettingRole",
        components : {
            Table
        },
        data() {
            return {
                tableTitle        : [
                    {
                        name  : '角色',
                        value : 'name',
                        width : 200
                    },
                    {
                        name  : '权限',
                        value : 'auth_text',
                        align : 'left'
                    },
                ],
                form       : {
                    page  : 1,
                    limit : 10,
                },
                addForm           : {
                    name : ''
                },
                back              : {
                    text : '返回系统页'
                },
                url               : 'api/setting/role_lst',
                deleteUrl         : 'api/setting/role_delete',
                addHref           : 'SettingWardDetail',
                addApi            : 'api/setting/role_add',
                editApi           : 'api/setting/role_add',
                tableData         : [],
                dialogFormVisible : false,
                authList          : [],
                checkedAuth       : [],
                title:''

            };
        },
        computed   : {},
        watch      : {},
        mounted() {
            this.onAuthList()
        },
        methods    : {
            add() {
                this.authList.map(item => {
                    item.checked = false
                    item.isIndeterminate = false
                    item.checkedCities = []
                })
                this.title='新增角色'
                this.dialogFormVisible = true
                this.addApi = 'api/setting/role_add'
                this.addForm = {
                    name : '',
                    auth : [],
                }
            },
            edit(val) {
                this.title='编辑角色'
                this.addApi = 'api/setting/role_edit'
                let auth = val.auth.map(item=>{
                    return +item
                })
                this.addForm = {
                    id   : val.id,
                    name : val.name,
                    auth : auth,
                }

                this.authList = this.authList.map((item)=>{
                    let childIds = item.child.map((childItem)=>{
                        return +childItem.id
                    })
                    let select = [];
                     childIds.map(roleId=>{
                        if(auth.indexOf(roleId)  != -1){
                            select.push(roleId)
                        }
                    });
                    item.isIndeterminate = select > 0 && select < childIds;
                    if (select.length === childIds.length) {
                        item.checked = select.length === childIds.length
                    } else {
                        item.checked = select.length
                    }
                    item.checkedCities =  select
                    return item
                })
                this.$forceUpdate();
                this.dialogFormVisible = true

            },
            unique(arr) {
                const res = new Map();
                return arr.filter((arr) => !res.has(arr) && res.set(arr, 1))
            },
            async onAdd() {
                let auth = [];
                this.authList.map(item => {
                    auth = auth.concat(item.checkedCities)
                    return item;
                });
                let checkedParent = this.authList.filter(item => item.checkedCities.length!==0).map(item => item.id)
                auth = [...auth, ...checkedParent]
                this.addForm.auth = this.unique(auth).join(',');
                await this.$axios.post(this.addApi,this.$qs.stringify( this.addForm)).then(res => {
                    if (res.data.code == 1) {
                        this.$refs.list.onSubmit()
                        this.dialogFormVisible = false
                        //获取权限列表
                        this.$store.dispatch('GetAuth')
                    }
                })
            },
            async onAuthList() {
                await this.$axios.post('api/setting/auth', this.$qs.stringify(this.addForm)).then(res => {
                    this.authList = res.data.data;
                    console.log('this.authList',this.authList)
                    this.authList = this.authList.map(item => {
                        item.checked = false
                        item.isIndeterminate = false
                        item.checkedCities = []
                        return item;
                    })
                    this.$forceUpdate()
                })
            },
            handleCheckAllChange(val) {
                val.checkedCities = val.checked ? val.child.map(item => {
                    return item.id
                }) : [];
                val.isIndeterminate = false;
                this.$forceUpdate()
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.checkedCities.length;
                value.checked = checkedCount === value.child.length;
                value.isIndeterminate = checkedCount > 0 && checkedCount < value.child.length;
                this.$forceUpdate()
            }
        },
    }
</script>

<style lang="scss" scoped>
    .el-form {
        width: 600px;
    }
    .row {
        display: flex;
    }
    ::v-deep .select-all {
        width: 30%;
    }
    ::v-deep .el-checkbox-group {
        width: 70%;
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
        .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #01C2F4;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner {
            background: #01C2F4;
            border: #01C2F4;
        }
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background: #01C2F4;
            border: #01C2F4;
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
</style>
