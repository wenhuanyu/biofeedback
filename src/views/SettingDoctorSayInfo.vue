<template>
    <div>
        <Table ref="list"
               :search-btn="false"
               :tableTitle="tableTitle"
               :search-time="false"
               :searchBtn="false"
               :searchUrl="url"
               :form="form"
               :back="back"
               :deleteUrl="deleteUrl"
        >
        </Table>

    </div>
</template>

<script>
import Table from '../components/Table';

export default {
    name: "SettingDoctorSayInfo",
    components: {
        Table
    },
    data() {
        return {
            tableTitle: [
                {
                    name: '医生建议',
                    value: 'content',
                },
            ],
            form: { type: '9'},
            back: {
                text: '返回列表'
            },
            url: 'api/template/lst',
            tableData: [],
            deleteUrl: 'api/template/delete',
            dialogFormVisible: false
        };
    },
    mounted() {
        console.log(this.$route.query.type)
        //消息接口
        this.$store.dispatch('GetXiao')

    },
    created() {
        if(this.$route.query.type == 2){
            this.tableTitle[0].name = '提示或建议'
        }else if(this.$route.query.type == 5){
            this.tableTitle[0].name = '测评医生建议'
        }else if(this.$route.query.type == 6){
            this.tableTitle[0].name = '总结与印象'
        }else if(this.$route.query.type == 7){
            this.tableTitle[0].name = '建议'
        }else if(this.$route.query.type == 9){
            this.tableTitle[0].name = '训练治疗医生建议'
        }else if(this.$route.query.type == 11){
            this.tableTitle[0].name = '训练治疗对比结论'
        }
    },
    methods:{

    },
    computed: {},
    watch: {},
    beforeRouteEnter(to, from, next) {
        console.log(to.meta.title);
        if(to.query.type == 2){
            to.meta.title = '提示或建议'
        }else if(to.query.type == 5){
            to.meta.title = '测评医生建议'
        }else if(to.query.type == 6){
            to.meta.title = '总结与印象'
        }else if(to.query.type == 7){
            to.meta.title = '建议'
        }else if(to.query.type == 9){
            to.meta.title = '训练治疗医生建议'
        }else if(to.query.type == 11){
            to.meta.title = '训练治疗对比结论'
        }
        next();
    }
}
</script>

<style scoped>

</style>
