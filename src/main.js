import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import {
	Message
} from "element-ui";
import qs from 'qs'
import MyLoading from './plugs/loading'
import Print from 'vue-print-nb'
import * as echarts from 'echarts'
import ElementUI from 'element-ui';
import './assets/css/element-variables.scss';

// 请求处理
axios.defaults.baseURL = 'http://swfk.shoupinkangda.com/'
// axios.defaults.baseURL = 'http://192.168.8.189:84/'
// axios.defaults.baseURL = 'http://192.168.2.189/'
axios.interceptors.request.use(config => {
	let token = ((store.state || {}).user || {}).token;
	if (token) {
		config.headers.token = token;
	}

	return config;
}, error => {
	return error;
});
axios.interceptors.response.use(
	response => {
		switch (parseInt(response.data.code)) {
			case 1:
				// 成功
				if (response.data.info && response.data.info !== 'success') {
					response.config.url.indexOf('term') !== 0 && Message.success(response.data.info)
				}
				return response;

			case 3020001:
				Message.error('请登录后操作');

				// 需要登录
				store.commit('setToken', '');
				if (sessionStorage.getItem('usertype') !== 'center') {
					store.commit('setTerminalUserInfo', {
						data: '',
						status: false
					});
					router.push('/TerminalLogin')
				} else {
					store.commit('setUserInfo', {
						data: '',
						status: false
					});
					router.push('/Login')
				}

				return response;

			default:
                if(response.config.url == 'term/index/user') {

                } else {
                    // 失败
                    Message.error(response.data.info);
                }

				return response
		}
	},

	error => {
		Message.error('网络异常，请稍后再试')
		return error;
	}
);

// 路由处理
router.beforeEach(async (to, from, next) => {
	// 路由发生变化修改页面title
	if (to.meta.title) {
		document.title = to.meta.title
	}

	if (to.name === 'Login' || to.name === 'TerminalLogin') {
		if (to.name === 'Login') {
			sessionStorage.setItem('usertype', 'center');
		} else if (to.name === 'TerminalLogin') {
			sessionStorage.setItem('usertype', 'term');
		}
		next();
	} else {
        if(window.location.hash.match('EmotionDetailReport')) {
            next()
        } else {
            if (store.state.user.loginStatus) {
                if (to.name === "SystemSetting") {
                    if (store.getters.sysMenuList.length === 0) {
                        await store.dispatch('GetAuth')
                    }
                    store.commit('setCmenu', '系统设置')
                    next(store.getters.sysMenuList[0].path)
                } else {
                    next()
                }
            } else {
                if (sessionStorage.getItem('usertype') === 'center') {
                    next('/Login')
                } else {
                    if (store.state.user.isClient) {
                        next()
                    } else {
                        next('/TerminalLogin');
                    }
                }
            }
        }



		/*if (to.meta.type === 'terminal' || window.isTerminal) {
		    if (store.state.user.terminal.loginStatus) {
		        next()
		    } else {
		        next('/TerminalLogin');
		    }
		} else {
		    if (store.state.user.loginStatus) {
		        next()
		    } else {
		        next('/Login')
		    }
		}*/
	}
});

Vue.use(MyLoading)
Vue.use(Print);
Vue.prototype.$qs = qs;
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$bus = new Vue()

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
