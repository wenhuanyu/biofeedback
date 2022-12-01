<template>
    <div class="content" :style="{height:$route.meta.title == '系统设置'?'calc(100vh - 255px) !important' : 'calc(100vh - 150px) !important'}">
        <div class="content_top" style="overflow: hidden" v-if="$route.meta.title !== '系统设置'" >
            <div style="display: flex;" >
                <router-link to="/"><div class="flex" style="width: 139px; height: 50px; background: #022358; border-radius: 25px; margin-top: 20px; margin-bottom: 20px; margin-left: 10px;">
                    <div><img style="width: 30px; height: 30px; margin-top: 10px;  margin-left: 18px;" src="../assets/images/zym.png"></div>
                    <div style="font-size: 20px; font-weight: 500; color: #ffffff; line-height: 50px; margin-left: 10px;">主页面</div>
                </div></router-link>
                <b></b>
<!--                <p @click="jump($event)">{{ $route.meta.title }}</p>-->
                <div style="margin-top: 35px; margin-left: 20px;"><img src="../assets/images/zuo.png"></div>
                <p style="display: block; margin-top: 30px; margin-left: 20px;color: #1E87F0; font-size: 20px;" v-if="$route.meta.subtitle">
                    {{ $route.meta.subtitle }}</p>
            </div>
            <el-form class="search-bar" ref="form" :inline="true" :model="form" style="display: flex;">
                <template v-if="customSearch.length>0">
                    <el-form-item v-for="(item,index) in customSearch"
                                  :key="item + index"
                                  :prop="item.prop">
                        <el-input v-model="form[item.prop]"
                                  :placeholder="item.placeholder"
                                  clearable>
                        </el-input>
                    </el-form-item>
                </template>
                <el-select v-if="emotionId" v-model="program_id" placeholder="请选择" class="state_title" @change="emotionChange($event)"
                           clearable @clear="setValueNullprogram" style="width: 100%;">
                    <el-option
                        v-for="item in programList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
                <el-select v-if="emotionId" v-model="threshold_id" placeholder="请选择" class="state_title" @change="thresholdChange($event)"
                           clearable @clear="setValueNullthreshold" style="width: 100%;">
                    <el-option
                        v-for="item in thresholdList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
                <el-form-item v-if="emotionId">
                    <el-button type="primary" @click="copySubmit" style="margin-left: 10px!important;">复制</el-button>
                </el-form-item>
                <el-select v-if="state_title" v-model="form.status" placeholder="全部" class="state_title" clearable>
                    <el-option
                        v-for="item in state_title_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
                <el-form-item v-if="(form.keyword&& searchInput )|| (form.keyword == ''&& searchInput)"  prop="keyword">
                    <el-input v-model="form.keyword" placeholder="输入关键词" clearable></el-input>
                </el-form-item>

                <div class="date-search">
                    <el-col :span="11">
                        <el-form-item v-if="searchTime" prop="start_time">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.start_time"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1" v-if="searchTime">-</el-col>
                    <el-col :span="11">
                        <el-form-item v-if="searchTime" prop="end_time">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.end_time"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </div>
                <el-form-item v-if="searchBtn">
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-form-item>

                <el-form-item v-if="back">
                    <el-button class="pink" plain @click="backPage" icon="el-icon-arrow-left" style="background: #60A7EB;border: none!important;color: #ffffff !important;">
                        {{ back.text ? back.text : '返回上一页' }}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table class=""
                  v-loading="loading"
                  element-loading-spinner = "el-icon-loading"
                  element-loading-background="rgba(8, 51, 145, 0.8)"
                  stripe
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  @selection-change="handleSelectionChange">
            <el-table-column v-if="tableCheckbox"
                             center
                             type="selection"
                             align="center"
                             width="100">
            </el-table-column>
            <el-table-column v-for="item in tableTitle"
                             :key="item.name"
                             :prop="item.value"
                             :label="item.name"
                             :width="item.width"
                             :align="item.align || 'left'  "
                             :formatter="item.formatter">
            </el-table-column>
            <el-table-column v-if="setting" :label="operation" width="300" align="left">
                <template slot-scope="scope">
                    <div style="display: inline-block;min-width: 100px;" v-if="operationLeft">
                        <el-button v-if="InfoHref && (isAssess == false || (isAssess == true && scope.row.status==3))"
                                   @click="handleClick(scope.row)" type="text" size="small">
                            <template v-if="info.text">{{ info.text }}</template>
                            <template v-else-if="info.icon">
                                <img src="../assets/images/look.png">
                            </template>
                            <template v-else>
<!--                                <img src="../assets/images/baobiao.png">-->
                                <div style="width: 57px; height: 30px; line-height:30px; text-align:center;
                                color: #FFFFFF;background: #01B2E4;border-radius: 3px;">详情</div>
                            </template>
                        </el-button>
                        <template v-if="userSelectTerminal">
                        <span v-for="userI in userSelectTerminal" :key="userI.user.id"
                              v-if="userI.user.id == scope.row.id">
                                {{ userI.terminal.nickname }}
                        </span>
                        </template>
                        <el-button v-if="(edit && scope.row.hospital_id !==0) && check('编辑')" @click="$emit('edit', scope.row)" type="text"
                                   size="small">
                            <div style="width: 57px; height: 30px; line-height:30px; text-align:center;
                                color: #FFFFFF;background: #01B2E4;border-radius: 3px;">
                                编辑
                            </div>
                        </el-button>
                        <el-button v-else-if="(detailHref && scope.row.hospital_id !==0) && check('编辑')" @click="handleDetail(scope.row)" type="text"
                                   size="small">
                            <div style="width: 57px; height: 30px; line-height:30px; text-align:center;
                                color: #FFFFFF;background: #01B2E4;border-radius: 3px;">
                                编辑
                            </div>
                        </el-button>
                        <template v-if="isAssess">
                            <el-button v-if="isAssess" type="text" size="small" @click="$emit('details',scope.row)">
                                <div  style="width: 57px; height: 30px; line-height:30px; text-align:center;
<!--                                color: #FFFFFF; background: #01B2E4;border-radius: 3px;">详情</div>
                            </el-button>
                            <el-button v-if="scope.row.status == 0 || scope.row.status == 2"
                                       @click="handleStart(scope.row)"
                                       type="text"
                                       size="small">
<!--                                <img src="../assets/images/play.png">-->
                                <div style="width: 57px; height: 30px; line-height:30px; text-align:center;
                                color: #FFFFFF;background: #7C43B7;border-radius: 3px;">开始</div>
                            </el-button>
                            <el-button v-if="scope.row.status == 1"
                                       @click="handleStop(scope.row)"
                                       type="text"
                                       size="small">
<!--                                <img src="../assets/images/pause.png">-->
                                <div style="width: 57px; height: 30px; line-height:30px; text-align:center;
                                color: #FFFFFF;background: #083793;border-radius: 3px;">暂停</div>
                            </el-button>
                            <el-button v-if="scope.row.status == 1 || scope.row.status == 2"
                                       @click="handleEnd(scope.row)" type="text"
                                       size="small">
<!--                                <img src="../assets/images/zanting.png">-->
                                <div style="width: 57px; height: 30px; line-height:30px; text-align:center;
                                color: #FFFFFF;background: #2085EF;border-radius: 3px;">结束</div>
                            </el-button>
                        </template>
                        <el-button
                            v-if="(deleteUrl && scope.row.hospital_id !==0 ) && check('删除') && (isAssess== false || (isAssess == true && scope.row.status!=3))"
                            @click="handleDel(scope.row)"
                            type="text"
                            size="small">
                            <div style="width: 57px; height: 30px; line-height:30px; text-align:center;
                                color: #FFFFFF;background: #B12C54;border-radius: 3px;">
                                删除
                            </div>
                        </el-button>
                        <el-button
                            v-if="levelUrl && scope.row.hospital_id !==0"
                            @click="handleLevel(scope.row)"
                            type="text"
                            size="small">
                            <div style="width: 57px; height: 30px; line-height:30px; text-align:center;
                                color: #FFFFFF;background: #01B2E4;border-radius: 3px;">
                                级别
                            </div>
                        </el-button>
                    </div>
                    <el-button v-if="statistics && scope.row.policy_id !== ''"
                               @click="handleJump(statisHref, scope.row)" type="text" size="small">
                        <img src="../assets/images/statistics.png" style="width: 22px;height: 22px">
                    </el-button>

                    <div v-if="statistics_ && scope.row.policy_id === ''"
                         style="display: inline-block; width: 30px"></div>

                    <el-button @click="$emit('operation-click',scope.row,item.method)" type="text" size="small"
                               v-for="(item,index) in operationList"
                               :key="index">
                        <img :src="require(`../assets/images/${item.img}`)"
                             style="width: 22px;height: 22px;object-fit: contain">
                    </el-button>

                    <el-button v-if="qrcode && scope.row.terminal_id ==0"
                               @click="$emit('qrcode',scope.row)"
                               type="text"
                               size="small">
                        <img src="../assets/images/qrcode.png" style="width: 22px;height: 22px">
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <div class="bottom_bottom" >
            <div>
                <div class="content_top_left">
                    <a v-if="add && check('添加')" @click="$emit('add')" style="background: #01B2E4;">
                        <div style="width: 109px; display: flex; margin-top: 7px; margin-left: 20px;">
                            <div><img src="../assets/images/top_add.png" alt=""></div>
                            <div style="font-size: 18px;color: #ffffff; margin-left: 7px; margin-top: 6px;">添加</div>
                        </div>
                    </a>
                    <router-link v-else-if="addHref  && check('添加')" :to="addHref"  style="background: #01B2E4;">
                        <div style="width: 109px; display: flex; margin-top: 7px; margin-left: 20px;">
                            <div><img src="../assets/images/top_add.png" alt=""></div>
                            <div style="font-size: 18px;color: #ffffff; margin-left: 7px; margin-top: 6px;">添加</div>
                        </div>
                    </router-link>
                    <a v-if="deleteUrl && check('删除')" @click="deleteBtn" class="all_del" href="javascript:; " style="background: #B12C54;">
                        <div style="width: 109px; display: flex; margin-top: 7px; margin-left: 20px;">
                            <div><img src="../assets/images/top_del.png" alt=""></div>
                            <div style="font-size: 18px;color: #ffffff; margin-left: 7px; margin-top: 6px;">删除</div>
                        </div>

                    </a>
                    <a v-if="refresh" @click="onRefresh" class="reload" href="javascript:;"  style="background: #01B2E4;">
                        <div style="width: 109px; display: flex; margin-top: 7px; margin-left: 20px;">
                            <div><img src="../assets/images/top_refresh.png" alt=""></div>
                            <div style="font-size: 18px;color: #ffffff; margin-left: 7px; margin-top: 6px;">刷新</div>
                        </div>
                    </a>
                    <a class="report" href="javascript:;" @click="contrast" v-if="con" style="background: #01B2E4;color: #ffffff;">生成对比报告</a>
                    <!--                <a v-if="report" class="report" href="javascript:">生成对比报告</a>-->
                </div>
            </div>
            <div style="display: flex" v-if="pageFooter">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="form.page"
                    :pager-count="9"
                    layout="prev, pager, next, jumper"
                    :hide-on-single-page="true"
                    :total="searchData.total_count">
                </el-pagination>
                <div class="right-btn" v-if="rightBtn">
                    <el-button @click="backPage">取消</el-button>
                    <el-button @click="submitDetail">确认</el-button>
                </div>
                <div class="page_total_wrap" style="margin-left: 20px;">
                    <div class="page_total">
                        <span class="total-count">共{{ searchData.total_count }}项</span>
                        <span
                            class="total-tip">
                        当前显示{{ searchData.start_count }}到{{ searchData.end_count }}项，共{{ searchData.end_count }}项
                    </span>
                    </div>
                    <div class="page_button" v-if="bottomButton.length > 0">
                        <el-button type="primary" round v-for="item in bottomButton" :key="item.text"
                                   @click="$emit('bottomClick',item.method)">
                            {{ item.text }}
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Table",
    props: {
        tableType: Number,
        tableTitle: Array,
        searchUrl: String,
        startUrl: String,
        levelUrl:String,
        endUrl: String,
        suspendUrl: String,
        deleteUrl: String,
        addHref: String,
        reportHref: String,
        InfoHref: String,
        detailHref: String,
        setting: {
            default: true,
            type: Boolean
        },
        searchInput: {
            default: true,
            type: Boolean
        },
        emotionId: {
            default: false,
            type: Boolean
        },
        qrcode: {
            default: false,
            type: Boolean
        },
        report: {
            default: false,
            type: Boolean
        },
        rightBtn: {
            default: false,
            type: Boolean
        },
        statistics: {
            default: false,
            type: Boolean
        },
        statistics_: {
            default: false,
            type: Boolean
        },
        statisHref: String,
        operationList: Array,
        info: {
            default: () => {
                return {
                    icon: false,
                    jumpData: ['id']
                }
            },
            type: Object
        },
        state_title: {
            default: false,
            type: Boolean
        },
        isAssess: {
            default: false,
            type: Boolean
        },
        searchTime: {
            default: true,
            type: Boolean
        },
        refresh: {
            default: true,
            type: Boolean
        },
        tableCheckbox: {
            default: true,
            type: Boolean
        },
        InfoText: {
            type: String
        },
        userSelectTerminal: Array,
        add: Boolean,
        edit: Boolean,
        searchBtn: {
            default: true,
            type: Boolean
        },
        bottomButton: {
            default: () => {
                return []
            }, type: Array
        },
        back: Object,
        operation: {
            default: '操作',
            type: String
        },
        form: {
            default: () => {
                return {
                    keyword: '',
                    start_time: '',
                    end_time: '',
                    page: 1,
                    limit: 10,
                    status: '',
                }
            },
            type: Object
        },
        pageFooter: {
            default: false,
            type: Boolean
        },
        customSearch: {
            default: () => {
                return []
            },
            type: Array
        },
        operationLeft: {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
            searchData: [],
            tableData: [],
            loading: false,
            multipleSelection: [],
            multipleSelection1: [],
            multipleSelection2: [],
            multipleSelection3: [],
            state_title_list: [
                {
                    id: 0,
                    name: '未开始'
                }, {
                    id: 1,
                    name: '执行中'
                }, {
                    id: 3,
                    name: '已完成'
                }
            ],
            among_list: [],
            con: false,
            program_id:'',
            threshold_id:'',
            programList:[],
            thresholdList:[],

        };
    },
    computed: {},
    watch: {},
    mounted() {
        //获取权限列表
        this.$store.dispatch('GetAuth')
        //消息接口
        this.$store.dispatch('GetXiao')
        for (const key in this.form) {
            if (this.$route.query[key]) {
                this.form[key] = this.$route.query[key]
            }
        }
        if (this.$route.query.id) {
            this.form.id = this.$route.query.id
        }
        if (this.$route.query.patient_id) {
            this.form.patient_id = this.$route.query.patient_id
        }
        if (this.tableType) {
            this.con = true
        }
        // if(sessionStorage.getItem('detail')) {
        //
        // } else {
        //     this.onSubmit()
        // }
        this.getLastPage()
        this.ProgramList()
    },
    methods: {
        getLastPage() {
            if(sessionStorage.getItem('detail')) {
                this.form.page = sessionStorage.getItem("currentPage")
                this.handleCurrentChange(sessionStorage.getItem("currentPage")-0||1)
                sessionStorage.removeItem("detail")
            } else {
                this.form.page = 1
                this.handleCurrentChange(1)
            }
        },
        jump: function (event) {
            var e = event.currentTarget;
            if (e.innerHTML === '系统设置') {
                this.$router.push('/SystemSetting')
            }
            if (e.innerHTML === '患者管理') {
                this.$router.push('/PatientManagement')
            }
            if (e.innerHTML === '训练治疗') {
                this.$router.push('/Emotion')
            }
            if (e.innerHTML === '终端监控') {
                this.$router.push('/TermMonitor')
            }
        },
        //检测按钮权限
        async check(_name) {
            let show = false
            if (['报告中心','终端监控','系统设置','医院用户管理','权限管理','科室设置','病区设置','分组设置','训练方案设置','医生建议','训练治疗对比结论'].includes(this.$store.state.cmenu)){
                return true
            }
            this.$store.state.auth.map(item => {
                if (item.name === this.$store.state.cmenu) {
                    let child = item.child
                    child.map(item2 => {
                        if (_name === item2.name) {
                            show = true
                        }
                    })
                }
            })
            return show
        },
        // 生成对比报告点击
        contrast() {
            if (this.tableType == 3) {
                if (this.multipleSelection.length <= 1) {
                    this.$message({
                        type: 'info',
                        message: '至少选择两条信息'
                    });
                    return;
                }
                if (this.multipleSelection.length > 10) {
                    this.$message({
                        type: 'info',
                        message: '只能选择十条数据'
                    });
                    return;
                }
                if (this.multipleSelection.length > 0 && this.multipleSelection.length <= 10) {
                    this.$router.replace({name: "EmotionDetailContrast", query: {ids: this.multipleSelection,time: this.multipleSelection3,patient_id:this.$route.query.patient_id}})
                    return;
                }
                return;
            }
            if (this.tableType == 1) {
                if (this.multipleSelection.length <= 1) {
                    this.$message({
                        type: 'info',
                        message: '至少选择两条信息'
                    });
                    return;
                }
                if (this.multipleSelection.length > 2) {
                    this.$message({
                        type: 'info',
                        message: '只能选择两条数据'
                    });
                    return;
                }
                if (this.multipleSelection.length == 2) {
                    if (this.multipleSelection1[0] === this.multipleSelection1[1]) {
                        this.$router.replace({
                            name: "AssessDetailContrast",
                            query: {
                                ids: this.multipleSelection,
                                test: this.multipleSelection1,
                                time: this.multipleSelection2
                            }
                        })
                        return;
                    }
                    if (this.multipleSelection1[0] != this.multipleSelection1[1]) {
                        this.$message({
                            type: 'info',
                            message: '只能选择相同的报表进行对比'
                        });
                        return;
                    }
                    return
                }
                return;
            }
        },
        //方案选择
        emotionChange(eve) {
            this.program_id = eve
        },
        //生理参数选择
        thresholdChange(eve) {
            this.threshold_id = eve
        },
        setValueNullprogram() {
            this.program_id = ''
        },
        setValueNullthreshold() {
            this.threshold_id = ''
        },
        //复制接口
        async copySubmit() {
            if(this.program_id =='') {
                this.$message({
                    type: 'info',
                    message: '请先选择方案'
                });
                return
            }
            if(this.threshold_id =='') {
                this.$message({
                    type: 'info',
                    message: '请先选择生理参数'
                });
                return
            }
            await this.$axios.post('api/emotion_policy/copy_level', this.$qs.stringify({
                program_id:this.program_id,
                emotion_id:this.form.id,
                type:this.threshold_id
            })).then(res => {
                this.setValueNullprogram()
                this.setValueNullthreshold()
                this.InterfaceList()
            })
        },
        //方案接口
        async ProgramList() {
            await this.$axios.post('api/emotion_policy/get_child_emotion_program').then(res => {
                if (res.data.code == 1) {
                    this.programList =  res.data.data
                }
            })
            await this.$axios.post('api/common/physiology_param').then(res => {
                if (res.data.code == 1) {
                    this.thresholdList = res.data.data
                }
            })
        },
        async handleStart(val) {
            await this.$axios.post(this.startUrl, this.$qs.stringify({id: val.id})).then(res => {
                this.InterfaceList()
            })
        },
        async handleStop(val) {
            await this.$axios.post(this.suspendUrl, this.$qs.stringify({id: val.id})).then(res => {
                this.InterfaceList()
            })
        },
        async handleEnd(val) {
            await this.$axios.post(this.endUrl, this.$qs.stringify({id: val.id})).then(res => {
                this.InterfaceList()
            })
        },
        handleCurrentChange(val) {
            if (this.form.page) {
                this.form.page = val;
                setTimeout(() =>{
                    if(sessionStorage.getItem('detail')) {
                    } else {
                        sessionStorage.setItem('currentPage', val)
                    }
                },1000)
            }
            this.InterfaceList()
        },
        // 搜索
        onSubmit() {
            this.form.page = 1
            this.InterfaceList()
        },
        InterfaceList() {
            if(this.emotionId) {
                this.form.emotion_id = this.form.id
            }
            this.$axios.post(this.searchUrl, this.$qs.stringify(
                this.form,
                // this.form.start_time ? this.form.start_time = this.form.start_time.getFullYear() + '-' +(this.form.start_time.getMonth() + 1) + '-' + this.form.start_time.getDate() :this.form.start_time
            )).then(res => {
                console.log("~ this.form,", this.form)
                let data = res.data.data;
                this.searchData = data;
                this.tableData = data.list;
                console.log("~ this.tableData", this.tableData)
                if (data.list == null) {
                    this.tableData = data;
                }
                setTimeout(() => {
                    this.loading = false
                },2000)
            })
            // this.form.status = ''
        },

        // 删除接口
        delete(id) {
            if(this.emotionId) {
                this.$axios.post(this.deleteUrl, this.$qs.stringify({level_id: id})).then(res => {
                    this.handleCurrentChange(1)
                })
            } else {
                this.$axios.post(this.deleteUrl, this.$qs.stringify({id: id})).then(res => {
                    console.log('res.data.data.name',res.data.data.name)
                    if(res.data.data.name) {
                        this.$emit('delinfo',res.data,id)
                    } else {
                        this.handleCurrentChange(1)
                    }
                })
            }

        },
        // 删除多条
        deleteBtn() {
            if (this.multipleSelection.length === 0) {
                this.$message({
                    type: 'info',
                    message: '请先选择一条信息'
                });
                return;
            }
            this.$confirm('是否选中删除该信息', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delete(this.multipleSelection.join(','));
            }).catch(() => {
                // this.$message({
                //     type    : 'info',
                //     message : '已取消删除'
                // });
            });
        },
        handleSelectionChange(val) {
            let ids = val.map(item => {
                return item.id
            })
            let dbid = val.map(item => {
                return item.test_paper_id
            })
            let sj = val.map(item => {
                return item.create_at
            })
            let sj1 =val.map(item => {
                return item.create_time
            })
            this.multipleSelection = ids;
            this.multipleSelection1 = dbid;
            this.multipleSelection2 = sj;
            this.multipleSelection3 = sj1;
            console.log('this.multipleSelection3',this.multipleSelection3)
            this.among_list = ids
        },
        // 报表图标点击
        handleClick(val) {
            console.log('val',val)
            let query = {};
            for (const key in val) {
                if (key.indexOf(this.info.jumpData) > -1) {
                    query[key] = val[key];
                }
            }
            this.$router.push({
                name: this.InfoHref, query: query
            })
        },
        handleDetail(val) {
            this.$router.push({
                name: this.detailHref, query: {
                    id: val.id
                }
            })
        },
        //训练方案级别跳转
        handleLevel(val) {
            this.$router.push({
                name: this.levelUrl, query: {
                    id: val.id
                }
            })
        },
        // 跳转
        handleJump(href, val) {
            this.$router.push({
                name: href, query: {
                    id: val.id,
                }
            })
        },
        // 删除单条数据
        handleDel(val) {
            this.$confirm('是否选中删除该信息', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delete(val.id);
            }).catch(() => {

            });
        },
        // 返回上一页
        backPage() {
            if(this.back.text =='返回报告中心') {
                this.$router.push('/ReportCenter')
            } else {
                this.$router.go(-1);//返回上一层
            }
        },
        // 刷新
        onRefresh() {
            this.loading = true
            this.form.page = 1
            console.log('this.$refs.form !== undefined',this.$refs.form !== undefined,this.$refs.form)
            if (this.$refs.form !== undefined) this.$refs.form.resetFields()
            this.InterfaceList()
        },
        submitDetail() {
            // console.log(this.among_list)
            if (this.among_list.length === 0) {
                this.$message({
                    type: 'info',
                    message: '请先选择一条信息'
                });
            } else {
                this.$router.push('/AddAmong')
            }
        }
    },
}
</script>

<style scoped lang="scss">
::v-deep {
    .el-select .el-input .el-select__caret {
        margin-right: 0!important;
    }
    .el-button--text {
        color: #ffffff;
    }
    .el-pagination .btn-prev .el-icon, .el-pagination .btn-next .el-icon {
        color: #ffffff;
    }
    .el-pagination button:hover {
        color: #60A7EB ;
    }
    .el-pagination__editor.el-input .el-input__inner {
        border-radius: 2px;
        border: 1px solid #60A7EB;
        color: #ffffff;
    }

    .el-pager li {
        background: none;
        color: #FFFFFF;
    }
    .el-pagination .btn-prev, .el-pagination .btn-next {
        background: none;
    }
    .el-pagination button:disabled {
        background: none;
    }
    .el-table__header {
        width: 100% !important;
    }
    .el-table__body {
        width: 100% !important;
    }
    .el-table tr {
        height: 76px;
        background: #02174d;
        color: #ffffff;
        font-size: 16px;
    }
    .el-table th {
        background: #022358;
    }
    .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #022358;
        border-bottom: none;
    }
    .el-table th.is-leaf, .el-table td {
        border-bottom: none !important;
    }
    .el-table .el-table__row:hover > td {
        background-color: #022358 !important;
    }
    .el-button--primary {
        background-color: #01B2E4;
        border-color: #01B2E4;
        border-radius: 25px;
        font-size: 16px;
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #1E87F0;
        border-color: #1E87F0;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
        background: #01B2E4;
        border-color: #60A7EB;;
    }
    .el-input__inner {
        width: 100%!important;
        background: #022358!important;
        border: #022358!important;
        border-radius: 25px;
        border: 1px solid #022358;
    }
    .el-input__suffix {
        right: 10px;
    }
}
.state_title {
    vertical-align: top;
    margin-right: 10px;
}

.content {
    display: flex;
    flex-direction: column;
}

.content_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    border: 1px solid #01C2F4;
}
.content_top_left {
    display: flex;
}

.content_top_left a.report {
    width: 138px;
    line-height: 48px;
    text-align: center;
    color: #1E87F0;
    font-size: 18px;
}
.content_top_left a {
    display: inline-block;
    width: 109px;
    height: 50px;
    margin-right: 15px;
    border-radius: 25px;
    cursor: pointer;
}

.content_top_left a img {
    display: block;
    margin: 10px auto 0;
}

.content_top_right {
    display: flex;
    align-items: center;
}

.content_top_right input {
    height: 45px;
    line-height: 45px;
    background: #FFF;
    font-size: 14px;
    padding-left: 10px;
}

.content_top_right input.search {
    width: 290px;
    margin-right: 10px;
}

.content_top_right input.time {
    color: #666;
    width: 190px;
    background: #FFF url(../assets/images/rili.png) no-repeat 95% center;
}

.content_top_right input::-webkit-input-placeholder {
    color: #999;
}

.content_top_right p {
    margin: 0 10px;
}

.content_top_right a {
    display: block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    color: #FFF;
    text-align: center;
    font-size: 18px;
    background: #FE9834;
    box-shadow: 4px 7px 10px 0px rgba(254, 152, 52, 0.2);
    border-radius: 50px;
    margin-left: 20px;
}

.content_bottom {
    background: #FFF;
    height: 850px;
}


.bottom_top .el-table {
    height: 580px;
    overflow-y: auto;
}

.bottom_top .el-table::before {
    height: 0;
}

.table_list {
    border-collapse: collapse;
    width: 100%;
    text-align: center;
}

.el-table {
    width: 100%;
    background: rgba(8, 51, 145, 0.3);
    border: 1px solid #01C2F4;
    border-bottom: none;
    overflow-y: auto;
}
.table_list th {
    font-size: 16px;
}

.table_list td {
    font-size: 14px;
}

.table_list tr {
    height: 55px;
}

.table_list tr:nth-child(odd) {
    background: #F4F4F4;
}

.table_list th, td {
    width: 157px;
}

td:last-child {
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 35%;
}

.table_list img {
    display: block;
    margin-right: 10px;
}

.table_list img:last-child {
    margin: 0;
}


.page_top {
    display: flex;
    align-items: center;
    margin-top: 20px;
    color: #444;
    font-size: 14px;
}

.page_top span {
    background: #FEE7E6;
    color: #1E87F0;
    font-size: 14px;
    border-radius: 50px;
    height: 25px;
    line-height: 25px;
    width: 85px;
    text-align: center;
    margin-right: 15px;
}

.page_box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
}

.page_box a {
    width: 35px;
    height: 35px;
    border: 1px solid #CCCCCC;
    font-size: 16px;
    color: #444;
    text-align: center;
    line-height: 35px;
    margin-right: 5px;
}

.page_box a.active {
    background: #FEE7E6;
    color: #1E87F0;
    border: 1px solid #1E87F0;
}

.page_box p {
    margin: 0 20px;
    font-size: 16px;
    color: #555;
}

.page_box p input {
    width: 35px;
    height: 35px;
    border: 1px solid #CCCCCC;
    font-size: 16px;
    color: #555;
    text-align: center;
    line-height: 35px;
}

.page_box .sure {
    display: block;
    width: 110px;
    text-align: center;
    color: #FFF;
    font-size: 16px;
    margin-left: 25px;
    height: 35px;
    line-height: 35px;
    background: #1E87F0;
    box-shadow: 2px 3px 5px 0px rgba(245, 96, 90, 0.2);
    border-radius: 50px;
}

::v-deep .el-form-item {
    margin-bottom: 0;
}

.line {
    color: #CCC;
    font-size: 20px;
    text-align: center;
    line-height: 40px;
}

.bottom_bottom {
    display: flex;
    justify-content: space-between;
    padding: 30px 45px;
    background: rgba(8, 51, 145, 0.3);
    border: 1px solid #01C2F4;
    border-top: none;
}


.bottom_bottom .page_total_wrap {
    margin-bottom: 11px;
    display: flex;
    justify-content: space-between;
}

.page_button {

}

.page_total {
    display: flex;
    align-items: center;
}

.bottom_bottom .total-count {
    background: none;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    margin-right: 5px;
    padding: 6px 14px;

}

.bottom_bottom .total-tip {
    font-size: 14px;
    color: #444444;
}

.bottom_bottom .el-pagination {
    display: flex;
    justify-content: center;
}

::v-deep .cell-class {
    text-align: center;
    font-size: 16px;
}

.date-search {
    display: inline-block;
}

.date-search ::v-deep .el-form-item {
    margin-right: 0;
}

::v-deep .el-table::before {
    height: 0;
}

.right-btn {
    float: right;

    .el-button {
        width: 149px;
        height: 50px;
        ont-size: 18px;
        color: #FFFFFF;
        border-radius: 25px;
    }

    .el-button:first-child {
        background: #F39334;
    }

    .el-button:last-child {
        background: #1E87F0;
    }
}
</style>
