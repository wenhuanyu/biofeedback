import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user";
import ws from "./modules/ws";
import terminal from "./modules/terminal";
import createPersiste from 'vue-savedata'
import axios from "axios";

const persiste = createPersiste({
	// 加密存本地, 默认为false
	ciphertext: true,
	mode: 'SS',
	LS: {
		module: user,
		storePath: 'user'
	},
	SS: [{
		module: ws,
		storePath: 'ws'
	}, {
		module: terminal,
		storePath: 'terminal'
	}]
})
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		examObj: {},
		played: true,
		stop: false,
		auth: [],
		cmenu: '',
		mainMenus: [],
		ip: '',
        playednum:0,
        xiaoxi:0,
	},
	mutations: {
		webip(state, n) {
			state.ip = n
		},
		setExamObj(state, obj) {
			state.examObj = obj
		},
		setPlayed(state, flag) {
			console.log('played改变', flag)
			state.played = flag
		},
        setPlayedNum(state, flag) {
            state.playednum = flag
        },
		setStop(state, flag) {
			console.log('stop', flag)
			state.stop = flag;
		},
		setAuth(state, arr) {
			console.log('arr', arr)
			state.auth = arr
			state.mainMenus = arr.map(item => item.name)
		},
		setCmenu(state, menu) {
			state.cmenu = menu
		},
        sethospital_id(state,menu) {
            state.hospital_id = menu
        },
        setXiaoxi(state,menu) {
            state.xiaoxi = menu
        }

	},
	actions: {
		GetAuth({commit, state}) {
			return new Promise((resolve, reject) => {
				axios.post('api/setting/user_info').then(res => {
					if (res.data.code === 1) {
						commit('setAuth', res.data.data.role_list)
						const auth = res.data.data.role_list
						const names = []
						const sysMenuList = []
						auth.map(item => {
							if (item.name === '系统设置') {
								let child = []
								child = item.child
								child.map(item2 => {
									names.push(item2.name)
								})
							}
						})
						state.user.allMenuList.map(item => {
							if (names.includes(item.name)) {
								sysMenuList.push(item)
							}
						})
						commit('setSysMenuList', sysMenuList)
						resolve(res.data.data.role_list)
					}
				}).catch(err => reject(err))
			})
		},
        GetXiao({commit}) {
            return new Promise((resolve, reject) => {
                axios.post('/api/zip/zip_list', {type:1}).then(res => {
                    commit('setXiaoxi', res.data.data)
                    resolve(res.data.data)
                })
            })

        }
	},
	modules: {
		user,
		ws,
		terminal
	},
	getters: {
		allMenuList: state => state.user.allMenuList,
		sysMenuList: state => state.user.sysMenuList
	},
	plugins: [persiste],
})
