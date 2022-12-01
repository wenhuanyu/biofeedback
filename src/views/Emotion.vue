<template>
    <div>
        <Table :add="true"
               @details="details"
               :tableTitle="tableTitle"
               :delete-url="deleteUrl"
               :isAssess="true"
               :pageFooter="true"
               :deleteUrl="deleteUrl"
               :searchUrl="url"
               :statis-href="`AssessStatistics`"
               @add="add()"
               @qrcode="qrcode"
               ref="table"
               :startUrl="startUrl"
               :suspendUrl="suspendUrl"
               :endUrl="endUrl"
               :state_title="state_title">
        </Table>
        <!--弹出-->
        <el-dialog custom-class="dialog"
                   :visible.sync="dialogFormVisible"
                   :destroy-on-close="true"
                   ref="dialog"
                   @close="onDialogClose">
            <div class="tan_top">
                新增训练
            </div>
            <div style="display: flex;margin-top: 30px;">
                <div style="margin-left: 50px;" class="t1" @click="single_training">
                    <img src="../assets/images/danren.png">
                    <div class="t2">单人训练</div>
                </div>
                <div style="margin-left: 14px;"class="t1" @click="combat_training">
                    <img src="../assets/images/duikang.png">
                    <div class="t2">对抗训练</div>
                </div>
            </div>
            <div>
                <div style="margin-left: 50px; margin-top: 14px;" class="t1" @click="team_training">
                    <img src="../assets/images/tuanti.png">
                    <div class="t2">团体训练</div>
                </div>
            </div>
        </el-dialog>
        <el-dialog custom-class="dialog"
                   :visible.sync="single"
                   :destroy-on-close="true"
                   ref="dialog"
                   :width="width"
                   @close="onDialogClose">
            <div class="tan_top" v-if="type == 1">
                新增单人训练
            </div>
            <div class="tan_top" v-else-if="type == 2">
                新增对抗训练
            </div>
            <div class="tan_top" v-else-if="type == 3">
                新增团队训练
            </div>
            <div class="dialog_con">
                <el-form ref="form" :model="form">
                    <!--间值设置-->
                    <div class="slider_con padding-20">
                        <el-row>
                            <!-- 内容左侧-->
                            <el-col :span="12" v-if="type == 1 || type == 3">
                                <!-- 左上-->
                                <el-row>
                                    <el-col :span="3">
                                        <el-form-item label="患者" prop="name"></el-form-item>
                                    </el-col>
                                    <el-col :span="16">
                                        <div>
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-select placeholder="请选择患者"
                                                               v-model="patientListName"
                                                               filterable :filter-method="dataFilter"
                                                               @visible-change="visibleHideSelectInput"
                                                               @change="onPatientChange($event)"
                                                               clearable
                                                    >
                                                        <el-option v-for="item in deviceIdList"
                                                                   :key="item.id"
                                                                   :value="item.id"
                                                                   :label="item.name +'  '+ item.age+'岁'+'  '+ item.medical_num"></el-option>
                                                    </el-select>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-select placeholder="请选择终端"
                                                               v-model="terminal_nickname"
                                                               filterable :filter-method="dataFilterTerminal"
                                                               @visible-change="visibleHideSelectInputTerminal"
                                                               @change="hanldClickTerminal($event)"
                                                               style="width: 100%;"
                                                               clearable
                                                    >
                                                        <el-option v-for="item in terminalIdList"
                                                                   :key="item.id"
                                                                   :value="item.id"
                                                                   :label="item.nickname"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-row>
                                            <div class="space-30"></div>
                                            <el-row style="cursor: pointer">
                                                <template>
                                                    <el-table :data="add_newList"
                                                              :show-header="false"
                                                              border>
                                                        <el-table-column>
                                                            <template slot-scope="scope">
                                                                <div>
                                                                    {{
                                                                        scope.row.patient_ + ' ' + scope.row.patient_num
                                                                    }}
                                                                </div>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column prop="terminal_">
                                                            <template slot-scope="scope">
                                                                <img src="../assets/images/delete.png"
                                                                     class="pull-right"
                                                                     @click="deleteRow(scope.$index, tableData)"/>
                                                                <div>{{ scope.row.terminal_ }}</div>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>
                                                </template>
                                            </el-row>
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="new-evaluationPatient_add" @click="add_new">添加</div>
                                    </el-col>
                                </el-row>


                            </el-col>
                            <el-col :span="12" v-else-if="type == 2">
                                <!-- 左上-->
                                <el-row>
                                    <el-col :span="4">
                                        <el-form-item label="A组患者" prop="name"></el-form-item>
                                    </el-col>
                                    <el-col :span="16">
                                        <div>
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-select placeholder="请选择患者"
                                                               v-model="patientListName"
                                                               filterable :filter-method="dataFilter"
                                                               @visible-change="visibleHideSelectInput"
                                                               @change="onPatientChange($event)"
                                                               clearable
                                                    >
                                                        <el-option v-for="item in deviceIdList"
                                                                   :key="item.id"
                                                                   :value="item.id"
                                                                   :label="item.name +'  '+ item.age+'岁'+'  '+ item.medical_num"></el-option>
                                                    </el-select>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-select placeholder="请选择终端"
                                                               v-model="terminal_nickname"
                                                               filterable :filter-method="dataFilterTerminal"
                                                               @visible-change="visibleHideSelectInputTerminal"
                                                               @change="hanldClickTerminal($event)"
                                                               style="width: 100%;"
                                                               clearable
                                                    >
                                                        <el-option v-for="item in terminalIdList"
                                                                   :key="item.id"
                                                                   :value="item.id"
                                                                   :label="item.nickname"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-row>
                                            <div class="space-30"></div>
                                            <el-row style="cursor: pointer">
                                                <template>
                                                    <el-table :data="add_newList__"
                                                              :show-header="false"
                                                              border>
                                                        <el-table-column>
                                                            <template slot-scope="scope">
                                                                <div>
                                                                    {{
                                                                        scope.row.patient_ + ' ' + scope.row.patient_num
                                                                    }}
                                                                </div>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column prop="terminal_">
                                                            <template slot-scope="scope">
                                                                <img src="../assets/images/delete.png"
                                                                     class="pull-right"
                                                                     @click="deleteRow(scope.$index, tableData)"/>
                                                                <div>{{ scope.row.terminal_ }}</div>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>
                                                </template>
                                            </el-row>
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="new-evaluationPatient_add" @click="add_new">添加</div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4">
                                        <el-form-item label="B组患者" prop="name"></el-form-item>
                                    </el-col>
                                    <el-col :span="16">
                                        <div>
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-select placeholder="请选择患者"
                                                               v-model="patientListName_"
                                                               filterable :filter-method="dataFilter"
                                                               @visible-change="visibleHideSelectInput"
                                                               @change="onPatientChange_($event)"
                                                               clearable>
                                                        <el-option v-for="item in deviceIdList"
                                                                   :key="item.id"
                                                                   :value="item.id"
                                                                   :label="item.name +'  '+ item.age+'岁'+'  '+ item.medical_num"></el-option>
                                                    </el-select>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-select placeholder="请选择终端"
                                                               v-model="terminal_nickname_"
                                                               filterable :filter-method="dataFilterTerminal"
                                                               @visible-change="visibleHideSelectInputTerminal"
                                                               @change="hanldClickTerminal_($event)"
                                                               style="width: 100%;"
                                                               clearable
                                                    >
                                                        <el-option v-for="item in terminalIdList"
                                                                   :key="item.id"
                                                                   :value="item.id"
                                                                   :label="item.nickname"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-row>
                                            <div class="space-30"></div>
                                            <el-row style="cursor: pointer">
                                                <template>
                                                    <el-table :data="add_newList_"
                                                              :show-header="false"
                                                              border>
                                                        <el-table-column>
                                                            <template slot-scope="scope">
                                                                <div>
                                                                    {{
                                                                        scope.row.patient_ + ' ' + scope.row.patient_num
                                                                    }}
                                                                </div>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column prop="terminal_">
                                                            <template slot-scope="scope">
                                                                <img src="../assets/images/delete.png"
                                                                     class="pull-right"
                                                                     @click="deleteRow(scope.$index, tableData)"/>
                                                                <div>{{ scope.row.terminal_ }}</div>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>
                                                </template>
                                            </el-row>
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="new-evaluationPatient_add" @click="add_new_">添加</div>
                                    </el-col>
                                </el-row>


                            </el-col>
                            <!-- 内容右侧-->
                            <el-col :span="11" :offset="1">
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="训练方案" prop="name"></el-form-item>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-row>
                                            <el-col :span="14">
                                                <el-select v-model="programme_options_name" placeholder="请选择"
                                                           class="select_prev" @change="onProgrammeChange($event)">
                                                    <el-option v-for="item in programme_options"
                                                               :key="item.id"
                                                               :label="item.name"
                                                               :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-col>

                                        </el-row>
                                        <el-row>
                                            <div class="slider_btm">
                                                <div class="scrollbar">
                                                    <el-row>
                                                        <el-col class="slider_list">
                                                            <div v-for="item in gameList.game_list" style="width: 45%">
                                                                <img :src=item.game_cover alt="">
                                                                <p>{{ item.game_name }}</p>
                                                            </div>
                                                        </el-col>
                                                    </el-row>
                                                </div>
                                            </div>
                                        </el-row>
                                    </el-col>
                                </el-row>
                                <div class="space-25"></div>
                                <!-- 右下 -->
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="生理参数" prop="name"></el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-select v-model="physiologyList_name" placeholder="请选择"
                                                   @change="onPhysiology($event)">
                                            <el-option
                                                v-for="item in physiologyList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="1"><span class="line">-</span></el-col>
                                    <el-col :span="8">
                                        <el-select v-model="difficulty_options_name" placeholder="请选择"
                                                   class="select_min" @change="onDifficulty($event)">
                                            <el-option v-for="item in difficulty_options"
                                                       :key="item.id"
                                                       :label="item.name"
                                                       :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer ">
                <el-button type="warning" round style="margin-right:20px;
                border-radius: 3px !important;background: #01B2E4; border:#01B2E4 " @click="single = false">取消
                </el-button>
                <el-button type="primary" round style="margin-right:100px;border-radius: 3px !important;background: #B12C54; border:#B12C54 " @click="buttonSubmit">完成</el-button>
            </div>
        </el-dialog>
        <el-dialog custom-class="dialog"
                   :visible.sync="details_"
                   :destroy-on-close="true"
                   ref="dialog"
                   @close="onDialogClose">
            <el-table :data="Data" class="www">
                <el-table-column prop="patient_name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="gender" label="性别" width="180">
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="180">
                </el-table-column>
                <el-table-column prop="term_name" label="终端" width="180">
                </el-table-column>
            </el-table>
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
            state_title: true,
            tableTitle: [
                {
                    name: '编号',
                    value: 'num',
                    width: 130
                },
                {
                    name: '训练类型',
                    value: 'type',
                    formatter: (row) => {
                        if (row.type == 1) {
                            return '单人训练';
                        } else if(row.type == 2) {
                            return '对抗训练';
                        } else {
                            return  '团体训练'
                        }
                    },
                    width: 150
                },
                {
                    name: '训练时间',
                    value: 'create_time',
                    width: 230
                }, {
                    name: '训练名称',
                    value: 'program_name',
                    width: 230
                },
                {
                    name: '难易级别',
                    value: 'level_name',
                    width: 180
                },
                {
                    name: '状态',
                    value: 'status_text',
                    width: 130
                }
            ],
            url: 'api/emotion/lst',
            startUrl: 'api/emotion/start',
            suspendUrl: 'api/emotion/suspend',
            endUrl: 'api/emotion/end',
            deleteUrl: 'api/emotion/delete',
            addHref: 'AddAssess',
            InfoHref: 'EmotionDetail',
            tableData: [],
            qrDialog: false,
            currentRow: '',
            dialogFormVisible: false,
            details_:false,
            single:false,
            form: {
                'patient_ids': [],
                'terminal_ids': [],
                "program_id": ''
            },
            addForm: {
                name: ''
            },
            infoForm: [],
            papeForm: [],
            // 训练方案
            programme_options: [],
            programme_options_name: '',
            programme_options_id: '',
            physiologyList: [],
            physiologyList_name: '',
            physiology_options_id: '',
            difficulty_options: [],
            difficulty_options_name: '',
            difficulty_options_id: '',
            terminalList: [],
            terminal_nickname: '',
            terminal_nickname_:'',
            patientList: [],
            patientListName: '',
            patientListName_:'',
            add_newList: [],
            add_newList_:[],
            add_newList__:[],
            patient_id: '',
            terminal_id: '',
            patient_id_name: '',
            terminal_id_name: '',
            music: '',
            musicList: [],
            gameList: [],
            patient_num: '',
            type:'',
            hospital_id:'',
            terminalIdList:[],
            deviceIdList:[],
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.hospital_id = this.$store.state.hospital_id
        this.getTerminal();
        this.onPatient();
        this.getMusic();

        // this.getPhysiology()

    },
    methods: {
        // 自定义筛选方法
        dataFilter(val) {
            if (val) {
                let filterResult = [];
                let originalData = JSON.parse(JSON.stringify(this.patientList));
                originalData.filter((item) => {
                    if (item.medical_num.includes(val)) {
                        filterResult.push(item);
                    }
                })
                this.deviceIdList = filterResult

            } else {
                this.deviceIdList = this.patientList;
            }
        },
        // 当下拉框出现时触发
        visibleHideSelectInput(val) {
            if(val) {
                this.deviceIdList = JSON.parse(JSON.stringify(this.patientList));
            }
        },
        // 自定义筛选方法
        dataFilterTerminal(val) {
            if (val) {
                let filterResult = [];
                let originalData = JSON.parse(JSON.stringify(this.terminalList));
                originalData.filter((item) => {
                    if (item.nickname.includes(val)) {
                        filterResult.push(item);
                    }
                })
                this.terminalIdList = filterResult

            } else {
                this.terminalIdList = this.terminalList;
            }
        },
        // 当下拉框出现时触发
        visibleHideSelectInputTerminal(val) {
            if(val) {
                this.terminalIdList = JSON.parse(JSON.stringify(this.terminalList));
            }
        },
        onDialogClose() {
            this.qingkong()

        },
        async details(row) {
            this.details_ = true
            await this.$axios.post('api/emotion/detail', {
                id:row.id
            }).then(res => {
                if (res.data.code == 1) {
                    this.Data = res.data.data
                    this.Data.map(item=>{
                        if(item.gender == 0) {
                            return item.gender='男';
                        } else  {
                            return item.gender='女';
                        }
                    })
                }
            })
        },
        // 删除
        deleteRow(index, rows) {
            this.add_newList__.splice(index, 1)
            this.add_newList_.splice(index, 1)
            this.add_newList.splice(index, 1)
        },
        //请选择患者
        onPatientChange(e) {
            this.patient_id = e
            this.patient_id_name = e ? this.patientList.find(ele => ele.id === e).name : ''
            this.patient_id_num = e ? this.patientList.find(ele => ele.id === e).medical_num : ''
        },
        //请选择患者
        onPatientChange_(e) {
            this.patient_id = e
            this.patient_id_name = e ? this.patientList.find(ele => ele.id === e).name : ''
            this.patient_id_num = e ? this.patientList.find(ele => ele.id === e).medical_num : ''
        },
        //添加
        add_new() {
            if(this.patientListName == '') {
                this.$message.error('请选择患者');
                return;;
            }
            if(this.terminal_nickname == '') {
                this.$message.error('请选择终端');
                return;;
            }
            if (this.patientListName && this.terminal_nickname) {

                if(this.type == 1 || this.type == 3) {
                    for (let i = 0; i < this.add_newList.length; i++) {
                        let item = this.add_newList[i];
                        if (item.patient_id === this.patient_id) {
                            this.$message.error('该用户已被指定');
                            return;
                        }

                        if (item.terminal_id === this.terminal_id) {
                            this.$message.error('该终端已被使用');
                            return;
                        }
                    }
                    this.add_newList.push({
                        patient_: this.patient_id_name,
                        patient_id: this.patient_id,
                        terminal_id: this.terminal_id,
                        terminal_: this.terminal_id_name,
                        patient_num: this.patient_id_num,
                    })
                } else if(this.type == 2) {
                    for (let i = 0; i < this.add_newList__.length; i++) {
                        let item = this.add_newList__[i];
                        if (item.patient_id === this.patient_id) {
                            this.$message.error('该用户已被指定');
                            return;
                        }
                        if (item.terminal_id === this.terminal_id) {
                            this.$message.error('该终端已被使用');
                            return;
                        }
                    }
                    for (let i = 0; i < this.add_newList.length; i++) {
                        let item = this.add_newList[i];
                        if (item.patient_id === this.patient_id) {
                            this.$message.error('该用户已被指定');
                            return;
                        }
                        if (item.terminal_id === this.terminal_id) {
                            this.$message.error('该终端已被使用');
                            return;
                        }
                    }
                    this.add_newList__.push({
                        patient_: this.patient_id_name,
                        patient_id: this.patient_id,
                        terminal_id: this.terminal_id,
                        terminal_: this.terminal_id_name,
                        patient_num: this.patient_id_num,
                        group_id:'A',
                    })
                    this.add_newList.push({
                        patient_: this.patient_id_name,
                        patient_id: this.patient_id,
                        terminal_id: this.terminal_id,
                        terminal_: this.terminal_id_name,
                        patient_num: this.patient_id_num,
                        group_id:'A',
                    })
                }
            }

            console.log('this.add_newList',this.add_newList)
        },
        //添加
        add_new_() {
            if(this.patientListName_ == '') {
                this.$message.error('请选择患者');
                return;;
            }
            if(this.terminal_nickname_ == '') {
                this.$message.error('请选择终端');
                return;;
            }
            if (this.patientListName_ && this.terminal_nickname_) {
                for (let i = 0; i < this.add_newList_.length; i++) {
                    let item = this.add_newList_[i];
                    if (item.patient_id === this.patient_id) {
                        this.$message.error('该用户已被指定');
                        return;
                    }

                    if (item.terminal_id === this.terminal_id) {
                        this.$message.error('该终端已被使用');
                        return;
                    }
                }
                for (let i = 0; i < this.add_newList.length; i++) {
                    let item = this.add_newList[i];
                    if (item.patient_id === this.patient_id) {
                        this.$message.error('该用户已被指定');
                        return;
                    }

                    if (item.terminal_id === this.terminal_id) {
                        this.$message.error('该终端已被使用');
                        return;
                    }
                }
                if(this.type == 1) {
                    this.add_newList.push({
                        patient_: this.patient_id_name,
                        patient_id: this.patient_id,
                        terminal_id: this.terminal_id,
                        terminal_: this.terminal_id_name,
                        patient_num: this.patient_id_num,
                    })
                } else if(this.type == 2) {
                    this.add_newList_.push({
                        patient_: this.patient_id_name,
                        patient_id: this.patient_id,
                        terminal_id: this.terminal_id,
                        terminal_: this.terminal_id_name,
                        patient_num: this.patient_id_num,
                        group_id:'B',
                    })
                    this.add_newList.push({
                        patient_: this.patient_id_name,
                        patient_id: this.patient_id,
                        terminal_id: this.terminal_id,
                        terminal_: this.terminal_id_name,
                        patient_num: this.patient_id_num,
                        group_id:'B',
                    })
                }

            }

            console.log('this.add_newList',this.add_newList)
        },
        // 患者接口
        async onPatient() {
            await this.$axios.post('api/patient/index', this.$qs.stringify({
                type: 1,
            })).then(res => {
                if (res.data.code == 1) {
                    this.patientList = res.data.data
                }
            })
        },
        //单人训练点击
        single_training() {
            this.single = true
            this.dialogFormVisible = false
            this.type = 1
            this.getProgramme();
        },
        //对抗训练点击
        combat_training() {
            this.single = true
            this.dialogFormVisible = false
            this.type = 2
            this.getProgramme();
        },
        //团队训练点击
        team_training() {
            this.single = true
            this.dialogFormVisible = false
            this.type = 3
            this.getProgramme();
        },
        getTerminal() {
            this.$axios.post('api/common/termLst').then(res => {
                if (res.data.code === 1) {
                    var terminalListId = {};
                    this.terminalList = res.data.data.map(item => {
                        terminalListId[item.id] = item;
                        return item;
                    })

                    this.terminalListId = terminalListId
                }
            })
        },
        selectTerminal() {
            if (this.curindex === 0) {
                this.$message({
                    type: 'info',
                    message: '请选择终端'
                })
                return;
            }

            this.infoForm.push({'user': this.userInfo, 'terminal': this.curInfo});
            this.closeDialog()
        },
        //选择终端
        hanldClickTerminal(e) {
            let isSelect = false;
            this.infoForm.map(infoI => {
                if (infoI.terminal.id == e.id) {
                    isSelect = true
                    return;
                }
            })
            if (isSelect) {
                this.$message({
                    type: 'info',
                    message: '终端已被选'
                })
                return;
            }
            this.curindex = e.id;
            this.curInfo = e

            // console.log(e)
            this.terminal_id = e
            this.terminal_id_name = e ? this.terminalList.find(ele => ele.id === e).nickname : ''
            console.log(111, this.terminal_id_name)
        },
        //选择终端
        hanldClickTerminal_(e) {
            let isSelect = false;
            this.infoForm.map(infoI => {
                if (infoI.terminal.id == e.id) {
                    isSelect = true
                    return;
                }
            })
            if (isSelect) {
                this.$message({
                    type: 'info',
                    message: '终端已被选'
                })
                return;
            }
            this.curindex = e.id;
            this.curInfo = e

            // console.log(e)
            this.terminal_id = e
            this.terminal_id_name = e ? this.terminalList.find(ele => ele.id === e).nickname : ''
            console.log(111, this.terminal_id_name)
        },
        deleteInfo(key) {
            this.infoForm.splice(key, 1)
        },
        qingkong() {
            this.add_newList = []
            this.add_newList_ = []
            this.add_newList__ = []
            this.programme_options_id = ''
            this.difficulty_options_id = ''
            this.physiology_options_id= ''
            this.patientListName = '';
            this.patientListName_ = '';
            this.terminal_nickname = '';
            this.terminal_nickname_ = '';
            this.programme_options_name = '';
            this.difficulty_options_name = '';
            this.gameList = [];
            this.physiologyList_name = '';
        },
        //完成按钮点击事件
        async buttonSubmit() {
            let patient_ids = [];
            let terminal_ids = [];
            let group_ids =[];
            this.add_newList.map(item => {
                patient_ids.push(item.patient_id)
            })

            this.add_newList.map(item => {
                terminal_ids.push(item.terminal_id)
            })

            this.add_newList.map(item => {
                group_ids.push(item.group_id)
            })

            await this.$axios.post('api/emotion/add', this.$qs.stringify({
                patient_ids: patient_ids.join(','),
                terminal_ids: terminal_ids.join(','),
                group_ids:group_ids.join(','),
                program_id: this.programme_options_id,
                level_id: this.difficulty_options_id,
                physiology_id: this.physiology_options_id,
                type:this.type
            })).then(res => {
                if (res.data.code === 1) {
                    this.single = false
                    this.Refresh()
                    this.qingkong()
                }
                console.log(res.data.info)
            })

        },
        Refresh() {
            this.$refs.table.onRefresh()
        },
        async getMusic() {
            await this.$axios.post('api/common/music_lst',).then(res => {
                if (res.data.code === 1) {
                    this.musicList = res.data.data;
                }
            })
        },
        // async getPhysiology() {
        //     await this.$axios.post('api/common/physiology_param',).then(res => {
        //         if (res.data.code === 1) {
        //             this.physiologyList = res.data.data
        //         }
        //     })
        // },

        async getProgramme() {
            await this.$axios.post('api/common/emotion_lst',this.$qs.stringify(
                {
                    hospital_id: this.hospital_id,
                    type:this.type
                }
            )).then(res => {
                if (res.data.code === 1) {
                    this.programme_options = res.data.data
                }
            })
        },
        onProgrammeChange(e) {
            console.log(e)
            this.difficulty_options_id = ''
            this.physiology_options_id = ''
            this.programme_options_id = e

            this.$axios.post('api/common/emotion_detail', this.$qs.stringify({program_id: this.programme_options_id})).then(res => {
                if (res.data.code === 1) {
                    this.gameList = res.data.data
                }
                console.log(this.gameList)
            })

            this.$axios.post('api/common/physiology_param', this.$qs.stringify({emotion_id: this.programme_options_id})).then(res => {
                if (res.data.code === 1) {
                    this.physiologyList = res.data.data
                }
                console.log(this.physiologyList)
            })

        },
        onPhysiology(e) {
            console.log(e)
            this.physiology_options_id = e
            this.$axios.post('api/common/emotion_level_lst', this.$qs.stringify({
                program_id: this.programme_options_id,
                type: this.physiology_options_id
            })).then(res => {
                console.log(res.data)
                if (res.data.code === 1) {
                    this.difficulty_options = res.data.data
                }
                console.log(this.difficulty_options)
            })

        },
        onDifficulty(e) {
            console.log(e)
            this.difficulty_options_id = e
        },

        qrcode(row) {
            this.currentRow = row;
            this.qrDialog = true;
        },
        add() {
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
.dialog-footer {
    margin-left: 50px;
}
::v-deep {
    .el-dialog__wrapper {
        background: rgba(0, 11,26, 0.9);
    }
    .el-table tr {
        background: #02174d;
        color: #ffffff;
        font-size: 16px;
    }
    .el-table th {
        background: #022358;
    }
    .el-table__empty-block {
        width: 100% !important;
        background: #021841;
    }
    .el-table .el-table__row:hover > td {
        background-color: #022358 !important;
    }
    .el-table th.is-leaf, .el-table td {
        border-bottom: none !important;
    }
    .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #022358;
        border-bottom: none;
    }
    .el-table--group, .el-table--border {
        background: #021841;
        border: 1px solid #01C2F4;
    }
    .el-table--border th, .el-table--border td {
        background: #021841;
        border: 1px solid #01C2F4;
    }
    .el-table::before, .el-table--group::after, .el-table--border::after {
        background: none;
    }
    .dialog .slider_btm::-webkit-scrollbar-track, .dialog .el-table__body-wrapper::-webkit-scrollbar-track {
        background: none !important;
    }
    .dialog .slider_btm::-webkit-scrollbar-thumb,  .dialog .el-table__body-wrapper::-webkit-scrollbar-thumb {
        background: none !important;
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
        border-color: #2085EF;
    }
    .el-select .el-input.is-focus .el-input__inner {
        border-color: #2085EF;
    }
    .el-button--warning {
        border-color: #33D196;
        background-color: #33D196;
    }
    .el-button--primary {
        border-color: #2085EF;
        background-color: #2085EF;
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        border-color: #2085EF;
        background-color: #2085EF;
    }
    .el-dialog {
        width: 736px;
        background: rgba(8, 51, 145, 0.3);
        border: 1px solid #01C2F4;
    }
    .el-input--suffix .el-input__inner {
        background: #021841;
        border-color: #01B2E4 !important;
        padding-right: 20px!important;
    }

}
/*弹框*/
::v-deep .dialog {
    //display: flex;
    flex-direction: column;

    .el-dialog__header {
        padding: 20px 40px 0 40px;
    }

    .el-dialog__title {
        font-size: 28px;
        font-weight: 600;
        color: #333333;
        line-height: 40px;
        width: 100%;
        margin-bottom: 22px;
    }

    .el-dialog__body {
        flex: 1;
        overflow: auto;
        padding: 30px 39px;

        .dialog_con {
            border-radius: 4px;
            border: 1px solid #2085EF;
            height: 100%;

            .dialog_left, .dialog_right {
                p {
                    font-size: 24px;
                    font-weight: 600;
                    color: #333333;
                    line-height: 33px;
                }
            }

            .el-select {
                //width: 100%;
            }


            .el-form-item {
                font-size: 24px;
                font-weight: 600;
                color: #ffffff;
            }

            .el-form-item__label {
                text-align: left;
                font-size: 24px;
                font-weight: 600;
                color: #ffffff;
            }

            .line {
                height: 1px;
                color: #CDCDCD;
                margin: 0 6px;
                line-height: 35px;
            }


            .slider_btm {
                width: 100%;
                height: 300px;
                margin-top: 25px;
                overflow: auto;
                cursor: pointer;

                .scrollbar {
                    width: 100%;
                    height: 100%;
                    margin: 0 auto;

                    .slider_list {
                        div {
                            width: 100%;
                            height: 100%;
                            float: left;
                            text-align: center;
                            line-height: 60px;
                            margin-bottom: 15px;

                            img {
                                width: 100%;
                                height: 105px;
                                display: block;
                            }

                            p {
                                width: 100%;
                                height: 30px;
                                text-align: center;
                                font-size: 16px;
                                font-weight: 400;
                                color: #2085EF;
                                border: 1px solid #DCEDFE;
                                background: #DCEDFE;
                                line-height: 30px;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 1;
                                overflow: hidden;
                            }
                        }

                    }

                    .slider_list div:nth-child(odd) {
                        margin-right: 15px;
                    }

                    .slider_list:nth-child(even) {
                        margin-right: 5px;
                    }

                }
            }
        }

        .new-evaluationPatient_add {
            width: 90%;
            height: 35px;
            background: #01B2E4;
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.02);
            border-radius: 2px;
            font-size: 16px;
            font-weight: bold;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            margin-left: 10px;
            margin-top: 2px;
        }

        .el-form-item__content {
            margin-left: 0 !important;
        }

    }

    .el-table__body-wrapper {
        height: 100%;
        overflow: auto;
    }

    .el-table--border {
        width: 100%;
        height: 193px;
        overflow: auto;
    }

    .slider_btm::-webkit-scrollbar, .el-table__body-wrapper::-webkit-scrollbar {
        display: block;
        width: 9px;
        height: 1px;
    }

    .slider_btm::-webkit-scrollbar-thumb, .el-table__body-wrapper::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background: #D8D8D8;;
    }

    .slider_btm::-webkit-scrollbar-track, .el-table__body-wrapper::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        background: #F7F7F7;
        border-radius: 10px;
    }
}


</style>
