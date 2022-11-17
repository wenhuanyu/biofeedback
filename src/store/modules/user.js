import fa from "element-ui/src/locale/lang/fa";

export default {
	state: {
		token: '',
		loginStatus: false,
		userInfo: '',
		account: '',
		username: '',
		terminal: {
			loginStatus: false,
			userInfo: '',
			account: '',
			username: '',
			profile: {},
		},
		sysMenuList:[],//系统菜单
		allMenuList: [{
				path: '/SettingUser',
				name: '医院用户管理'
			},
			{
				path: '/SettingRole',
				name: '权限管理'
			},
			{
				path: '/SettingConfig',
				name: '医院设置'
			},
			// {path: '/DepartmentWard', name: '科室设置'},
			{
				path: '/SettingWard',
				name: '病区设置'
			},
			// {path: '/SettingGrouping', name: '分组设置'},
			{
				path: '/SettingPlanQ',
				name: '训练方案设置'
			},
			{
				path: '/SettingDoctorSayInfo',
				name: '医生建议'
			},
			{
				path: '/SettingDoctorSayInfoDB',
				name: '训练治疗对比结论'
			},
		],
		hospital: {},
		isClient: false,
	},
	getters: {},
	mutations: {
		setUserInfo(state, userinfo) {
			state.loginStatus = userinfo.status;
			state.userInfo = userinfo.data;
			state.username = userinfo.username;
			state.sysMenuList = userinfo.sysMenuList;
		},
		setSysMenuList(state, sysMenuList){
			state.sysMenuList = sysMenuList
		},

		setAccount(state, account) {
			state.account = account;
		},

		setTerminalUserInfo(state, userinfo) {
			state.terminal.loginStatus = userinfo.status;
			state.terminal.userInfo = userinfo.data;
			state.terminal.username = userinfo.username;
		},

		setTerminalAccount(state, account) {
			state.terminal.account = account;
		},

		setTerminalProfile(state, profile) {
			state.terminal.profile = profile;
		},

		setHospital(state, hospital) {
			state.hospital = hospital;
		},

		setToken(state, token) {
			state.token = token;
		},

		setClient(state, isClient) {
			state.isClient = isClient
		}
	},
	actions: {}
}
