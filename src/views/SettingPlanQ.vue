<template>
    <div >
        <Table
            ref="table"
            :tableTitle="tableTitle_emotion"
            :searchBtn="true"
            :form="form"
            :searchTime="true"
            :deleteUrl="deleteUrl"
            :searchUrl="urlTwo"
            :page-footer="true"
            :add="true"
            @add="add()"
            :edit="true"
            @edit="edit"
            class="programme-right"
            levelUrl="leverDetail"
        >
        </Table>
        <!--弹出-->
        <el-dialog custom-class="dialog"
                   :visible.sync="dialogFormVisible"
                   :destroy-on-close="true"
                   ref="dialog"
                   @close="onDialogClose">
            <div class="tan_top">
                新增训练方案
            </div>
            <div style="display: flex;margin-top: 30px;">
                <div style="margin-left: 50px;" class="t1" @click="single_training">
                    <img src="../assets/images/danren.png">
                    <div class="t2">单人训练方案</div>
                </div>
                <div style="margin-left: 14px;"class="t1" @click="combat_training">
                    <img src="../assets/images/duikang.png">
                    <div class="t2">对抗训练方案</div>
                </div>
            </div>
            <div>
                <div style="margin-left: 50px; margin-top: 14px;" class="t1" @click="team_training">
                    <img src="../assets/images/tuanti.png">
                    <div class="t2">团体训练方案</div>
                </div>
            </div>
        </el-dialog>
        <el-dialog custom-class="dialog"
                   :visible.sync="single"
                   :destroy-on-close="true"
                   ref="dialog"
                   :width="width"
                   @close="onDialogClose"
        >

            <div class="tan_top">
                {{ total_text }}
            </div>
            <div class="row">
                <el-form ref="formData" :model="form" label-width="90px" class="form_con">
                    <!--方案名称-->
                    <div class="flex">
                        <el-form-item label="方案名称" style="margin-right: 200px;">
                            <el-input v-model="formData.name" placeholder="请输入方案名称" class="item1" style="width: 498px"></el-input>
                        </el-form-item>
                        <el-form-item label="训练方式" prop="type">
                            <el-radio-group v-model="formData.type">
                                <el-radio :label="1" name="1" disabled>单人</el-radio>
                                <el-radio :label="2" name="2" disabled>对抗</el-radio>
                                <el-radio :label="3" name="3" disabled>团体</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>

<!--                    &lt;!&ndash;情绪难易级别&ndash;&gt;-->
<!--                    <el-form-item label="难易级别" prop="level">-->
<!--                        <span style="color: #FFFFFF ; margin-right: 5px;">心率</span>-->
<!--                        <el-select v-model="heart_rate" placeholder="下拉查看" class="item1" style="width: 105px">-->
<!--                            <el-option v-for="item in difficulty__"-->
<!--                                       :key="item.id"-->
<!--                                       :label="item.name"-->
<!--                                       :value="item.id" style="width: 100px !important;">-->
<!--                            </el-option>-->
<!--                        </el-select>-->
<!--                        <span style="color: #FFFFFF ; margin-right: 5px; margin-left: 10px;">皮温</span>-->
<!--                        <el-select v-model="head_temp" placeholder="下拉查看" class="item1" style="width: 105px">-->
<!--                            <el-option v-for="item in difficulty_"-->
<!--                                       :key="item.id"-->
<!--                                       :label="item.name"-->
<!--                                       :value="item.id" style="width: 100px !important;">-->
<!--                            </el-option>-->
<!--                        </el-select>-->
<!--                        <span style="color: #FFFFFF ; margin-right: 5px; margin-left: 10px;">注意力/放松度</span>-->
<!--                        <el-select v-model="attention" placeholder="下拉查看" class="item1" style="width: 105px">-->
<!--                            <el-option v-for="item in difficulty"-->
<!--                                       :key="item.id"-->
<!--                                       :label="item.name"-->
<!--                                       :value="item.id" style="width: 100px !important;">-->
<!--                            </el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->
                    <!--方案内容-->
                    <el-form-item label="方案内容">
                        <el-transfer ref="transfer" v-model="value" :data="data" @change="handleChange" left-check-change="sd"
                                     filterable="filterable" filter-placeholder="关键词搜索" class="box-nowrap item2"
                                     style="text-align: left;" :titles="['全部内容', '已选择内容']">
                            <span slot-scope="{ option }" style="line-height: 45px; display: flex">
                                <span class="con_lift" @click="log(option)">{{ option.label }}</span>
                                <div class="item_" v-if="value_ids.includes(option.key)">
                                    <template>
                                        <el-select v-model="listMap[option.key]" placeholder="请选择"
                                                   @change="onMusicChange($event)">
                                            <el-option
                                                v-for="item in musicList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                                style="width:140px"
                                            >
                                            </el-option>
                                        </el-select>
                                        <el-input v-model.sync="timeMap[option.key]" placeholder="时间"
                                                  style="width: 60px !important; margin-left: 5px;"
                                                  @change="onTime($event)"></el-input>
                                    </template>
                                </div>
                            </span>
                        </el-transfer>
                    </el-form-item>
                    <div class="slider_con" style="display: flex">
                        <el-form-item label="前静息期" prop="music_" style="margin-right: 20px; width: 440px;">
                            <el-select v-model="formData.before_music" placeholder="请选择" class="select_prev">
                                <el-option
                                    v-for="item in musicList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                    style="width:150px"
                                >
                                </el-option>
                            </el-select>
                            <span class="line">—</span>
                            <el-input v-model.sync="formData.before_music_time" placeholder="时间" class="select_min"
                                      style="width: 60px !important; margin-left: 5px;"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="后静息期" prop="music__" class="slider_left" style="width: 440px;">
                            <el-select v-model="formData.after_music" placeholder="请选择" class="select_prev">
                                <el-option
                                    v-for="item in musicList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                    style="width:150px"
                                >
                                </el-option>
                            </el-select>
                            <span class="line">—</span>
                            <el-input v-model.sync="formData.after_music_time" placeholder="时间" class="select_min"
                                      style="width: 60px !important; margin-left: 5px;"
                            ></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer ">
                <el-button type="warning" round style="margin-right:20px;
                border-radius: 3px !important;background: #01B2E4; border:#01B2E4 " @click="quxiao">取消
                </el-button>
                <el-button type="primary" round style="margin-right:100px;border-radius: 3px !important;background: #B12C54; border:#B12C54 " @click="buttonSubmit">完成</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Table from '../components/Table';

export default {
    name: "SettingPlanQ",
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
            single:false,
            dialogFormVisible: false,
            tableTitle_emotion: [
                {
                    name: '训练名称',
                    value: 'name',
                },
                {
                    name: '训练方式',
                    value: 'type',
                    formatter: (row) => {
                        if (row.type == 1) {
                            return '单人训练';
                        } else if(row.type == 2) {
                            return '对抗训练';
                        } else {
                            return '团体训练'
                        }
                    },
                },
                {
                    name: '已选内容',
                    value: 'detail',
                    formatter: (row) => {
                        let text = [];
                        row.detail.map((item, key) => {
                            if (key < 10) {
                                text.push(item.game_name)
                            }
                        });
                        return text.join('，') + (row.detail.length > text.length ? '...' : '')
                    },
                    align: 'left',
                    width: '300px'
                },
                {
                    name: '时间',
                    value: 'create_at',
                }
            ],
            form: {
                keyword: '',
                id: 0
            },
            urlTwo:'api/emotion_policy/lst',
            deleteUrl: 'api/emotion_policy/delete',
            addHrefTwo:'SettingPlanAddQ',
            detailHrefTwo: 'SettingPlanDetailQ',
            tableData: [],
            currentRow: '',
            music: '',
            musicList: [],
            onMusicChange_id: '',
            gameTime: '',
            game_time: '',
            num: 1,
            data: [],
            value: [],
            heart_rate: '',
            head_temp:'',
            attention:'',
            formData: {
                name: '',
                game_info: '',
                before_music:'',
                before_music_time:'',
                after_music:'',
                after_music_time:'',
                type:''
            },
            test_paper_ids: '',
            // difficulty: [],
            // difficulty_: [],
            // difficulty__: [],
            // difficulty_id: '',
            rightChecked: [49, 66],
            submitUrl: 'api/emotion_policy/add2',
            id: 0,
            idData: [],
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            // 难易级别
            value1: '',
            //滑块设置数值
            valueNum: 0,
            //前静息期
            valuePrev: '',
            //后静息期
            valueNext: '',
            type: '',
            value_ids: [],
            optionList: [],
            listMap: {},
            timeMap: {},
            id_:'',
            type_plan:'',
            total_text:'',
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.getMusic()
        // this.getDifficulty()
        // this.getDifficulty_()
        // this.getDifficulty__()
    },
    methods: {
        quxiao() {
            this.single = false
            this.dialogFormVisible = false
            this.formData ={
                name: '',
                game_info: '',
                before_music:'',
                before_music_time:'',
                after_music:'',
                after_music_time:'',
                type:''
            }
            this.id_ = ''
            this.value = []
            this.timeMap = []
            this.listMap = []
            this.value_ids = []
            this.$refs.transfer.$refs.leftPanel.checked = [];
            this.$refs.transfer.$refs.rightPanel.checked = [];
            this.$refs.table.onSubmit()
        },
        onDialogClose() {
            this.quxiao()
        },
        add() {
            this.dialogFormVisible = true
        },
        //单人训练点击
        single_training() {

            this.single = true
            this.total_text = '新建单人训练方案'
            this.type_plan = 1
            this.formData.type = 1
            this.onPaper()
        },
        //对抗训练点击
        combat_training() {
            this.single = true
            this.total_text = '新建对抗训练方案'
            this.type_plan = 2
            this.formData.type = 2
            this.onPaper()

        },
        //团队训练点击
        team_training() {
            this.single = true
            this.total_text = '新建团队训练方案'
            this.type_plan = 3
            this.formData.type = 3
            this.onPaper()
        },
        async onPaper() {
            await this.$axios.post('api/emotion_policy/game_lst',this.$qs.stringify(
                {
                    type:this.type_plan
                 }
            )).then(res => {
                if (res.data.code === 1) {
                    let list = res.data.data.all
                    const data = [];
                    const idData = [];

                    for (let i = 0; i < list.length; i++) {
                        data.push({
                            key: list[i].id,
                            label: list[i].name,
                        });
                        idData[list[i].id] = {
                            'game_id': list[i].id,
                            'music_id': this.onMusicChange_id,
                            'game_time': this.game_time,
                        }
                        // this.difficulty_id = list[i].id
                    }
                    this.data = data;
                    this.idData = idData;

                }

            })
        },
        onMusicChange(e) {
            console.log(e)
            this.onMusicChange_id = e
            this.onPaper()
        },
        async getMusic() {
            await this.$axios.post('api/common/music_lst',).then(res => {
                if (res.data.code === 1) {
                    this.musicList = res.data.data;
                }
            })
        },
        //方案内容
        handleChange(value, direction, movedKeys) {
            console.log('value',value)
            console.log('direction', direction);
            console.log('movedKeys', movedKeys);
            movedKeys.map((item) => {
                this.listMap[item] = '';
                if(direction === 'left'){
                    this.timeMap[item] = '';
                } else {

                }
            })
            value.map((item, index) => {
                this.optionList.push('')
            })
            console.log('value', value);
            this.value_ids = value
            console.log('value_ids', this.value_ids)
        },
        //完成按钮
        buttonSubmit() {
            this.formData.game_info = this.value.map(item => {
                console.log(this.idData[item])
                return this.idData[item]
            })
            if (this.id_ !== '') {
                this.submitUrl = 'api/emotion_policy/edit2'
                this.formData.id = this.id_
            } else {
                this.submitUrl = 'api/emotion_policy/add2'
            }
            this.$axios.post(this.submitUrl, this.$qs.stringify(this.formData)).then(res => {
                if (res.data.code === 1) {
                    this.single = false
                    this.dialogFormVisible = false
                    this.formData = {
                        name: '',
                        game_info: '',
                        before_music:'',
                        before_music_time:'',
                        after_music:'',
                        after_music_time:'',
                        type:''
                    }
                    this.id_ = ''
                    this.quxiao()
                    this.$refs.table.onSubmit()
                }
            })
        },
        // async getDifficulty() {
        //     await this.$axios.post('api/common/emotion_level_lst',{type:1}).then(res => {
        //         if (res.data.code === 1) {
        //             this.difficulty = res.data.data;
        //         }
        //     })
        // },
        // async getDifficulty_() {
        //     await this.$axios.post('api/common/emotion_level_lst',{type:3}).then(res => {
        //         if (res.data.code === 1) {
        //             this.difficulty_ = res.data.data;
        //         }
        //     })
        // },
        // async getDifficulty__() {
        //     await this.$axios.post('api/common/emotion_level_lst',{type:4}).then(res => {
        //         if (res.data.code === 1) {
        //             this.difficulty__ = res.data.data;
        //         }
        //     })
        // },
        log(option) {
            console.log('log', option.key)
        },
        onTime(e) {
            console.log(e)
            this.game_time = e
            this.onPaper()
        },
         async edit(row) {
            console.log('row',row)
            this.id_ = row.id
             this.type_plan = row.type
             if(this.type_plan == 1) {
                 this.total_text = '编辑单人训练方案'
             }else if(this.type_plan == 2) {
                 this.total_text = '编辑对抗训练方案'
             }else if(this.type_plan == 3) {
                 this.total_text = '编辑团体训练方案'
             }
             this.onPaper()
            this.single = true
            await this.$axios.post('api/emotion_policy/info', this.$qs.stringify({id: this.id_})).then(res => {
                if (res.data.code === 1) {
                    let data = res.data.data;
                    console.log('data',data)
                    this.value = data.game_ids.split(',').map(id => {
                        return +id;
                    })
                    for (const key in this.formData) {
                        this.formData[key] = data[key];
                        console.log(this.formData)
                    }
                    this.value_ids = data.game_ids
                }
            })

        },

    },
}
</script>

<style scoped lang="scss">
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
::v-deep .el-transfer-panel__list.is-filterable {
    height: 230px;
}

.con_lift {
    width: 40%;
    overflow: hidden;
    display: inline-block;
}

.el-button.is-round {
    width: 150px;
    height: 50px;
}

.el-button + .el-button {
    margin-left: 50px;
}

.content_body .el-form {
    min-width: 400px;
}

::v-deep .el-transfer-panel {
    width: 50%;
    padding-bottom: 20px;
}

::v-deep .el-form-item__label {
    text-align: left;
}

::v-deep .row .el-form-item {
    font-weight: 600;
    color: #333333;
    font-size: 16px;

}

::v-deep .el-transfer-panel__body {
    //height:100%;
    height: 30vh;
}

::v-deep .el-checkbox:last-of-type{
    margin-right: 30px !important;
}

::v-deep {
    .el-dialog__wrapper {
        background: rgba(0, 11,26, 0.9);
    }
    .el-radio__input.is-checked + .el-radio__label {
        color: #01B2E4;
    }
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #01B2E4;
        background: #01B2E4;
    }
    .el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label {
        color: #FFFFFF;
    }
    .el-checkbox__label {}
    .el-transfer-panel__item.el-checkbox {
        color: #FFFFFF;
        //height: 45px;
    }
    .el-input__inner {
        background: #021841;
        border-color: #01B2E4 !important;
    }
    .el-transfer-panel .el-transfer-panel__header {
        background: #021841;
        border-color: #01B2E4 !important;
    }
    .el-transfer-panel__body {
        background: #021841;
    }
    .el-transfer-panel {
        background: #021841;
        border-color: #01B2E4 !important;
    }
    .el-dialog__body {
        width: 85%;
    }
    [class^=el-icon-], [class*=" el-icon-"] {
        color: #01B2E4;
    }

    .el-button [class*=el-icon-] + span {
        color: #01B2E4;
    }

    .el-button--primary {
        background: #01B2E4;
        border-color: #01B2E4;
    }

    .el-button--warning {
        background: #33D196;
        border-color: #33D196;
    }
    .el-dialog {
        width: 736px;
        background: rgba(8, 51, 145, 0.3);
        border: 1px solid #01C2F4;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
        background: #01B2E4;
        border-color: #01B2E4;
    }
    .el-transfer-panel__item {
        height: 45px;
    }
    .el-transfer-panel__item .el-checkbox__input {
        top: 14px;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #01B2E4;
    }

    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background: #01B2E4;
        border-color: #01B2E4;
    }

    .el-form-item__error {
        color: #01B2E4;
    }

    .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus {
        border-color: #01B2E4;
    }
    .el-transfer__buttons {
        display: inline-block;
        padding: 0 40px;

        .el-button--primary {
            display: block;
            width: 78px;
            height: 40px;
            background-image: url("../assets/images/left_arr.png");
        }
        .el-transfer__button:last-child {
            margin-left: 0;
            transform: rotate(180deg);
        }
    }
    .el-form-item__label {
        text-align: left;
        vertical-align: middle;
        float: left;
        font-size: 16px;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
        font-weight: 600;
        color: #FFFFFF;
    }

    .content_body {
        padding: 30px 50px 25px 50px;
        display: flex;
        height: 100vh;
        flex-direction: column;

        .top_edit {
            height: 60px;
            color: #333333;
            font-size: 18px;
            font-weight: 600;
            width: 100%;
            padding-bottom: 22px;
        }

        .row {
            flex: 1;
            border-top: 1px solid #E6E6E6;
            padding-top: 29px;

            .item1, .el-input {

            }

            .item2 .el-transfer-panel {
                width: 498px;
            }

            .item_ {
                float: right;
            }

            .item_ .el-input {
                width: 150px !important;
                float: right;
            }

            .el-transfer-panel__item {
                height: 45px;
            }

            .el-transfer-panel__item .el-checkbox__input {
                top: 14px;
            }

            .el-transfer-panel .el-transfer-panel__header {
                background: #fff;
            }

            .el-transfer-panel__list .is-filterable {
                //height: 275px;
                height: 25vh;
                overflow: auto;
                margin-right: 5px;
            }

            .el-transfer-panel__filter {
                width: 500px;
                .el-input__inner {
                    border-radius: 2px;
                }
            }

            .el-transfer__buttons {
                display: inline-block;
                padding: 0 40px;

                .el-button--primary {
                    display: block;
                    width: 78px;
                    height: 40px;
                    background-image: url("../assets/images/left_arr.png");
                }
                .el-transfer__button:last-child {
                    margin-left: 0;
                    transform: rotate(180deg);
                }
            }
            .el-icon-arrow-left, .el-icon-arrow-right {
                display: none;
            }
            .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before {
                content: '';
            }
            .slider_con {
                width: 100%;
                display: flex;
                flex: 3;

                .slider_left {
                    margin-right: 35px;

                    //.input_num, .el-input {
                    //    width: 155px;
                    //}
                    //
                    //.el-input__inner {
                    //    width: 155px;
                    //}

                    .slider_el {
                        width: 256px;
                        float: left;
                        display: inline-block
                    }

                    .slider_p {
                        display: inline-block;
                        margin-left: 15px;
                    }

                    .el-slider__runway {
                        width: 256px;
                        height: 20px;
                        background: #FFE6E5;
                        border-radius: 25px;
                        border: 1px solid #F5635E;
                    }

                    .el-slider__bar {
                        height: 20px;
                        background: linear-gradient(180deg, #F5635E 0%, #FB918E 100%);
                        border-radius: 25px;
                    }

                    .el-slider__button-wrapper {
                        top: -9px;
                    }

                    .el-slider__button-wrapper .el-slider__button {
                        width: 28px;
                        height: 28px;
                        background: linear-gradient(180deg, #FA8C89 0%, #F5635E 100%);
                        border: 1px solid #F5635E;
                    }

                    .el-slider__runway {
                        margin: 10px 0;
                    }

                    .el-icon-arrow-left, .el-icon-arrow-right {
                        display: none;
                    }
                }

                .slider_left:last-child {
                    margin-right: 0;
                }

                .slider_right {
                    .input_num, .el-input {
                        width: 155px;
                    }

                    .el-input__inner {
                        width: 155px;
                    }
                }

                .slider_left .slider_p, .slider_right .slider_p {
                    display: inline-block;
                    font-size: 16px;
                    font-weight: 500;
                    color: #333333;
                    line-height: 40px;
                    vertical-align: middle;
                }

                .select_prev .el-input--suffix {
                    width: 230px !important;
                }

                .select_min .el-input--suffix {
                    width: 100px !important;
                }

                .line {
                    //width: 14px;
                    height: 1px;
                    color: #CDCDCD;
                    margin: 0 6px;
                }
            }
        }

        .bottom_btn {
            height: 60px;
            position: relative;
            right: 0;

            .el-form-item__content {
                .el-button {
                    float: right;
                }

                .el-button:first-child {
                    margin-left: 25px;
                }
            }
        }
    }

    .el-transfer-panel__list.is-filterable::-webkit-scrollbar {
        display: block;
        width: 4px;
        height: 1px;
    }

    .el-transfer-panel__list.is-filterable::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background: #D8D8D8;;
    }
}


</style>
