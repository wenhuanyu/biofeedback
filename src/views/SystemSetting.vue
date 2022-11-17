<template>
	<div class="layout_">
		<div class="content_top">
			<div style="display: flex;">
				<router-link to="/">
					<div class="flex"
						style="width: 139px; height: 50px; background: #022358; border-radius: 25px; margin-top: 20px; margin-bottom: 20px; margin-left: 10px;">
						<div><img style="width: 30px; height: 30px; margin-top: 10px;  margin-left: 18px;"
								src="../assets/images/zym.png"></div>
						<div
							style="font-size: 20px; font-weight: 500; color: #ffffff; line-height: 50px; margin-left: 10px;">
							主页面</div>
					</div>
				</router-link>
				<b></b>
				<!--                <p @click="jump($event)">{{ $route.meta.title }}</p>-->
				<div style="margin-top: 35px; margin-left: 20px;"><img src="../assets/images/zuo.png"></div>
				<p style="display: block; margin-top: 30px; margin-left: 20px;color: #1E87F0; font-size: 20px;"
					v-if="$route.meta.title">
					{{ $route.meta.title }}
				</p>
			</div>
		</div>
		<div class="container">
			<systemBar ref="systemBar"></systemBar>
			<div class="content ">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
	import systemBar from '../components/systemBar'
	export default {
		name: "SystemSetting",
		components: {
			systemBar
		},
		data() {
			return {};
		},
		computed: {},
		watch: {},
		mounted() {
            //消息接口
            this.$store.dispatch('GetXiao')
			// this.$store.dispatch('GetAuth')

		},
		methods: {

		},
	}
</script>

<style scoped>
	.container {
		height: calc(100vh - 255px);
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.content {
		width: 100%;
		height: 100%;
		border-radius: 5px;
		overflow: hidden;
		overflow-y: auto;
		border-bottom: 1px solid #01C2F4;
	}

	.content_top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
		border: 1px solid #01C2F4;
	}
</style>
