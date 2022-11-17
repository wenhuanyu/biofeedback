<template>
    <div class="content">
        <div class="content_top" style="overflow: hidden" v-if="$route.meta.subtitle !== '系统用户' && $route.meta.subtitle !== '权限管理' && $route.meta.subtitle !== '患者来源'
            && $route.meta.subtitle !== '科室设置'">
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
            <el-form class="search-bar" ref="form" :inline="true" :model="form">
                <template v-if="customSearch.length>0">
                    <el-form-item v-for="(item,index) in customSearch" :key="item + index" :prop="item.prop">
                        <el-input v-model="form[item.prop]" :placeholder="item.placeholder" clearable></el-input>
                    </el-form-item>
                </template>
                <el-form-item v-if="form.keyword || form.keyword == ''" prop="keyword">
                    <el-input v-model="form.keyword" placeholder="输入关键词" clearable></el-input>
                </el-form-item>
                <el-form-item v-if="searchBtn">
                    <el-button type="primary" round @click="onSubmit"
                               style="background: #01B2E4;width:119px;border:none">搜索
                    </el-button>
                </el-form-item>
                <el-form-item v-if="back">
                    <el-button class="pink" plain @click="backPage" icon="el-icon-arrow-left">
                        {{ back.text ? back.text : '返回上一页' }}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
            v-loading="loading"
            element-loading-text = "加载中，请稍后..."
            element-loading-spinner = "el-icon-loading"
            element-loading-background="rgba(8, 51, 145, 0.8)"
            class=""
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
            <el-table-column v-for="item in tableTitle" :key="item.name"
                             :prop="item.value"
                             :label="item.name"
                             :width="item.width"
                             :align="item.align || 'left'  "
                             :formatter="item.formatter">
            </el-table-column>
            <el-table-column v-if="setting" :label="operation" width="600" align="center">
                <template slot-scope="scope">
                    <div style="display: inline-block;min-width: 100px;" v-if="operationLeft">
                        <template v-if="userSelectTerminal">
                        <span v-for="userI in userSelectTerminal" :key="userI.user.id"
                              v-if="userI.user.id == scope.row.id">
                                {{ userI.terminal.nickname }}
                        </span>
                        </template>
                        <el-row>
                            <el-button v-if="check('训练治疗')" @click="EmotionDetail(scope.row)" style="background: #01B2E4;border:none!important;color: #fff;font-size: 16px">
                                训练报告
                            </el-button>
                        </el-row>
                    </div>
                </template>
            </el-table-column>

        </el-table>

        <div class="bottom_bottom" v-if="pageFooter">
            <div>
                <div class="content_top_left">
<!--                    <a v-if="deleteUrl && check('删除')" @click="deleteBtn" class="all_del" href="javascript:"><img-->
<!--                        src="../assets/images/top_del.png" alt=""></a>-->
                    <a v-if="refresh" @click="onRefresh" class="reload" href="javascript:;"  style="background: #01B2E4;">
                        <div style="width: 109px; display: flex; margin-top: 7px; margin-left: 20px;">
                            <div><img src="../assets/images/top_refresh.png" alt=""></div>
                            <div style="font-size: 18px;color: #ffffff; margin-left: 7px; margin-top: 6px;">刷新</div>
                        </div>
                    </a>
                    <a class="reload" href="javascript:;" @click="AdeleteClick" v-if="Adelete" style="background: #B12C54;width: 140px;">
                        <div style="width: 140px; display: flex; margin-top: 7px; margin-left: 20px;">
                            <div><img src="../assets/images/top_del.png" alt=""></div>
                            <div style="font-size: 18px;color: #ffffff; margin-left: 7px; margin-top: 6px;">一键删除</div>
                        </div>

                    </a>
                    <a class="reload" href="javascript:;" @click="AdownloadClick" v-if="Adownload" style="background: #39CBE9;width: 140px;">
                        <div style=" display: flex; margin-top: 7px; margin-left: 20px;">
                            <div><img src="../assets/images/top_download.png" alt=""></div>
                            <div style="font-size: 18px;color: #ffffff; margin-left: 7px; margin-top: 6px;">一键下载</div>
                        </div>

                    </a>
                </div>
            </div>
            <div style="display: flex">
                <el-pagination
                    :current-page.sync="form.page"
                    :pager-count="9"
                    :hide-on-single-page="true"
                    :total="searchData.total_count"
                    layout="prev, pager, next, jumper"
                    @current-change="handleCurrentChange" background>
                </el-pagination>
                <div class="page_total_wrap">
                    <div class="page_total">
                        <span class="total-count">共{{ searchData.total_count }}项</span>
                        <span class="total-tip">
                        当前显示{{ searchData.start_count }}到{{ searchData.end_count }}项，共{{ searchData.end_count }}项</span>
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
        deleteUrl: String,
        addHref: String,
        InfoHref: String,
        detailHref: String,
        Adelete: {
            default:false,
            type:Boolean
        },
        Adownload: {
            default:false,
            type:Boolean
        },
        setting: {
            default: true,
            type: Boolean
        },
        qrcode: {
            default: false,
            type: Boolean
        },
        statistics: {
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
            // eslint-disable-next-line vue/require-valid-default-prop
            default: () => {
                return {
                    keyword: '',
                    start_time: '',
                    end_time: '',
                    page: 1,
                    limit: 10,
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
        }
    },
    data() {
        return {
            loading: false,
            searchData: [],
            tableData: [],
            multipleSelection: []
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
        // if(sessionStorage.getItem('detail_')) {
        //
        // } else {
        //     this.onSubmit()
        // }
        this.getLastPage()
    },
    methods: {
        AdeleteClick() {
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
            });
        },
        AdownloadClick() {
            if (this.multipleSelection.length === 0) {
                this.$message({
                    type: 'info',
                    message: '请先选择一条信息'
                });
                return;
            }
            this.$emit('zip_add', this.multipleSelection)
            if(this.tableType == 1) {
                this.$axios.post('api/zip/zip_add', this.$qs.stringify({
                    patient_id: this.multipleSelection
                })).then(res => {

                })
            } else {
                this.$axios.post('api/zip/zip_add', this.$qs.stringify({
                    exam_id: this.multipleSelection
                })).then(res => {

                })
            }

        },
        getLastPage() {
            if(sessionStorage.getItem('detail_')) {
                this.form.page = sessionStorage.getItem("currentPage_")
                this.handleCurrentChange(sessionStorage.getItem("currentPage_")-0||1)
                sessionStorage.removeItem("detail_")
            } else {
                this.form.page = 1
                this.handleCurrentChange(1)
            }
        },
        check(_name) {
            console.log('_name',_name)
            let show = false
            if (['报告中心'].includes(this.$store.state.cmenu)){
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
        async handleStart(val) {
            await this.$axios.post('api/exam/start', this.$qs.stringify({id: val.id})).then(res => {
                this.InterfaceList()
            })
        },
        async handleStop(val) {
            await this.$axios.post('api/exam/suspend', this.$qs.stringify({id: val.id})).then(res => {
                this.InterfaceList()
            })
        },
        async handleEnd(val) {
            await this.$axios.post('api/exam/end', this.$qs.stringify({id: val.id})).then(res => {
                this.InterfaceList()
            })
        },
        handleCurrentChange(val) {
            if (this.form.page) {
                this.form.page = val;
                setTimeout(() =>{
                    if(sessionStorage.getItem('detail_')) {
                    } else {
                        sessionStorage.setItem('currentPage_', val)
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
            this.$axios.post(this.searchUrl, this.$qs.stringify(this.form)).then(res => {
                let data = res.data.data;
                this.searchData = data;
                this.tableData = data.list;
                if (data.list == null) {
                    this.tableData = data;
                }
                setTimeout(() => {
                    this.loading = false
                },2000)
            })
        },
        delete(id) {
            this.$axios.post(this.deleteUrl, this.$qs.stringify({id: id})).then(res => {
                if(res.data.data.name) {
                    this.$emit('delinfo',res.data,this.multipleSelection,id)
                } else {
                    this.handleCurrentChange(1)
                }
            })
        },
        // 删除图标（左上）
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
            });
        },
        handleSelectionChange(val) {
            let ids = val.map(item => {
                return item.id
            })
            this.multipleSelection = ids;
        },
        handleClick(val) {
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
        handleJump(href, val) {
            this.$router.push({
                name: href, query: {
                    id: val.id
                }
            })
        },
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
            this.$router.go(-1);
        },
        // 刷新（左上）
        onRefresh() {
            this.loading = true
            this.$refs.form.resetFields()
            this.form.page = 1
            this.InterfaceList()
        },
        // 训练治疗报告按钮
        EmotionDetail(val) {
            this.$router.replace({name: "EmotionRegulation",query:{patient_id:val.id,type:2}})
        },
    },
}
</script>

<style scoped lang="scss">
::v-deep {
    .el-pagination .btn-prev .el-icon, .el-pagination .btn-next .el-icon {
        color: #ffffff;
    }

    .el-pagination button:hover {
        color: #60A7EB;
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
        background: none !important;
    }
    .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next, .el-pagination.is-background .el-pager li {
        background: none !important;
    }

    .el-pagination button:disabled {
        background: none !important;
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
        background: #022358;
        border: #022358;
        border-radius: 25px;
    }
}
.content {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 150px) !important;
}


.content_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    border: 1px solid #01C2F4;
}

.content_top_left a {
    display: inline-block;
    width: 109px;
    height: 50px;
    margin-right: 15px;
    border-radius: 25px;
    cursor: pointer;
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
    background: #FFF;
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
    color: #1E86EF;
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
    color: #1E86EF;
    border: 1px solid #1E86EF;
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
    background: #1E86EF;
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
</style>
