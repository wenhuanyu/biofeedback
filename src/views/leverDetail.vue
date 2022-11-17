<template>
    <div>
        <Table
            :emotionId="true"
            :searchTime="false"
            :add="true"
            :edit="true"
            :searchInput ="false"
            :searchBtn="false"
            @edit="edit"
            :deleteUrl="deleteUrl"
            :searchUrl="url"
            :tableTitle="tableTitle"
            :delete-url="deleteUrl"
            :page-footer="true"
            @add="add()"
            ref="table"
            :back="{}"
        >
        </Table>
        <!--弹出-->
        <el-dialog custom-class="dialog"
                   :visible.sync="dialogFormVisible"
                   @close="onDialogClose"
        >
            <div class="tan_top">
                添加方案级别
            </div>
            <div class="tan_body">
                <el-form :model="addForm">
                    <el-form-item label="级别名称" label-width="120px"  >
                        <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入级别名称"></el-input>
                    </el-form-item>
                    <el-form-item label="阈值设置" label-width="120px">
                        <el-select v-model="addForm.type" placeholder="请选择生理参数" style="width: 100%;" @change="thresholdChange($event)">
                            <el-option v-for="item in thresholdList" :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="起始值" label-width="120px"  >
                        <el-input v-model="addForm.start_value" autocomplete="off" placeholder="请输入起始值"></el-input>
                    </el-form-item>
                    <el-form-item label="结束值" label-width="120px"  >
                        <el-input v-model="addForm.end_value" autocomplete="off" placeholder="请输入结束值"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" label-width="120px"  >
                        <el-input v-model="addForm.remark" autocomplete="off" placeholder="请输入备注"></el-input>
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
import Table from "../components/Table";

export default {
    name: "Emotion",
    components: {
        Table
    },
    props:{
        width: {
            type: String,
            default:'75%'
        }
    },
    data() {
        return {
            Data:[],
            tableTitle: [
                {
                    name: '名称',
                    value: 'name',
                    width: 230
                },
                {
                    name: '生理参数',
                    value: 'type_text',
                    width: 230
                }, {
                    name: '起始值',
                    value: 'start_value',
                    width: 230
                },
                {
                    name: '截止值',
                    value: 'end_value',
                    width: 230
                },
                {
                    name: '备注',
                    value: 'remark',
                    width: 230
                }
            ],
            url: 'api/emotion_policy/emotion_level_list',
            deleteUrl: 'api/emotion_policy/delete_emotion_level',
            tableData: [],
            dialogFormVisible: false,
            form: {
            },
            addForm: {
                type:'',
                name: '',
                start_value:'',
                end_value:'',
                remark:''
            },
            type:'',
            thresholdList:[],
            level_id:'',
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.threshold()
    },
    methods: {
        edit(row) {
            console.log('row',row)
            this.dialogFormVisible = true
            this.addForm.name = row.name
            this.addForm.type = row.type
            this.addForm.start_value = row.start_value
            this.addForm.end_value = row.end_value
            this.addForm.remark = row.remark
            this.level_id = row.id
        },
        async onAdd() {
            let url = ''
            if(this.level_id !=='') {
                url = 'api/emotion_policy/edit_emotion_level'
                this.addForm.level_id = this.level_id
            } else {
                url = 'api/emotion_policy/add_emotion_level'
            }
            this.addForm.emotion_id = this.$route.query.id
            this.addForm.hospital_id = this.$store.state.hospital_id
            await this.$axios.post(url,this.$qs.stringify(this.addForm)).then(res => {
                this.dialogFormVisible = false
                this.$refs.table.onSubmit()
                this.addForm.name = ''
                this.addForm.type = ''
                this.addForm.start_value = ''
                this.addForm.end_value = ''
                this.addForm.remark = ''
                this.level_id = ''
            })
        },
        thresholdChange(eve) {
            this.addForm.type = eve
        },
         //生理参数
         async threshold() {
            await this.$axios.post('api/common/physiology_param').then(res => {
                if (res.data.code == 1) {
                    this.thresholdList = res.data.data
                }
            })
        },

        onDialogClose() {

        },
        async details(row) {
            await this.$axios.post('api/emotion/detail', {
                id:row.id
            }).then(res => {
                if (res.data.code == 1) {
                    this.Data = res.data.data
                }
            })
        },
        Refresh() {
            this.$refs.table.onRefresh()
        },
        add() {
            this.addForm.name = ''
            this.addForm.type = ''
            this.addForm.start_value = ''
            this.addForm.end_value = ''
            this.addForm.remark = ''
            this.level_id = ''
            this.dialogFormVisible = true
        },
        // 按钮弹窗
        dialog_btn() {
            let _that = this
            _that.dialogFormVisible = true;     // alert('cap')
        },
    },
}
</script>


<style scoped lang="scss">
.www {
    background: none;
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
.t1 {
    position: relative;
    cursor: pointer;
}
.t2 {
    z-index: 100;
    position: absolute;
    bottom: 40px;
    left: 30px;
    font-size: 20px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 28px;
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
    //.el-input__suffix {
    //    right: 180px;
    //}
    .el-select .el-input .el-select__caret {
        margin-right: 180px;
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
        width: 836px;
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
    margin-left: 180px;
}
</style>
