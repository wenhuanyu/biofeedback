<template>
    <div class="menu">
        <router-link v-for="(item ,index) in sysMenuList" :key="item.name" :to="item.path" :class="{'active':path=== item.path}">
					<img :src="item.img" alt="" >
					<p>{{ item.name }}</p>
        </router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "systemBar",
    data() {
        return {
            name:[],
            menuList: [],
						allMenuList: [
							{path: '/SettingUser', name: '医院用户管理'},
							{path: '/SettingRole', name: '权限管理'},
							{path: '/SettingConfig', name: '医院设置'},
							// {path: '/DepartmentWard', name: '科室设置'},
							{path: '/SettingWard', name: '病区设置'},
							// {path: '/SettingGrouping', name: '分组设置'},
							{path: '/SettingPlanQ', name: '训练方案设置'},
							{path: '/SettingDoctorSayInfo', name: '医生建议'},
							{path: '/SettingDoctorSayInfoDB', name: '训练治疗对比结论'},
						],
        };
    },
    computed: {
			...mapGetters(['sysMenuList']),
			path(){
				return this.$route.path
			},
			
		},
    watch: {},
    mounted() {
			
    },
    methods: {
			
    }
}
</script>

<style scoped>
.menu {
    box-sizing: border-box;
    min-width: 330px;
    height: 100%;
    background: rgba(8, 51, 145, 0.3);
    border: 1px solid #01C2F4;
    background-size: 100%;
    margin-right: 20px;
}
.menu a {
    position: relative;
    height: 70px;
    line-height: 70px;
    display: flex;
    align-items: center;
    color: #FFF;
    font-size: 16px;
    padding-left: 20px;
}

.menu a.active {
    background: #01B2E4;
}

.menu a img:first-child {
    margin-right: 30px;
}

.menu a img:last-child {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 35px;
}
</style>
