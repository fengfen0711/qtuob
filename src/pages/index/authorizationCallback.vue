<template>
	<div>

	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "",
		data() {
			return {
				openId: ''
			}
		},
		created() {
			this.$router.push('/reglog')
//			var code = this.getUrlParms("code")
//			console.log(code);
//			var wxUrl = "http://outer.qtoubao.cn/wx/getOAuth2UserInfo";
//			Indicator.open()
//			var data = {
//				"code": code
//			}
//			console.log("data数据1==" + JSON.stringify(data));
//			this.$http.post(wxUrl, data).then(response => {
//				console.log("初始化数据成功==" + JSON.stringify(response.data));
//				Indicator.close()
//				if(response.data.result) {
//					//拿到nionID掉王璇接口
//					var data = {
//						"unionId": response.data.datum.openId
//					}
//					this.openId = response.data.datum.openId;
//					this.$http.post(this.$store.state.link + '/sso/dolgother', data).then(response => {
//						console.log("王璇接口调用接口成功1" + JSON.stringify(response.data))
//						Indicator.close()
//						if(response.data.code == "SYS_S_000") {
//							//如果nionID有绑定账号用nionID掉登录接口
//							var uniondata = {
//								"unionId": this.openId
//							}
//							console.log("uniondata==" + JSON.stringify(uniondata))
//							this.$http.post(this.$store.state.link + '/sso/dolgother', uniondata).then(response => {
//								console.log("王璇接口调用接口成功2" + JSON.stringify(response.data))
//								Indicator.close()
//								if(response.data.code == "SYS_S_000") {
//									//如果nionID有绑定账号用nionID掉登录接口
//									window.localStorage.token = response.data.output.token;
//									window.localStorage.userId = response.data.output.userId;
//									this.$router.push('/home')
//
//								} else {
//									this.$router.push('/login？unionId=' + this.openId)
//								}
//							}, response => {
//								Indicator.close()
//								console.log("王璇接口调用接口失败1" + JSON.stringify(response.data))
//								this.$router.push('/login')
//							});
//
//						} else {
//							//nionID没有绑定账号 跳login传nionID绑定当前账号
//							this.$router.push('/login？unionId=' + this.openId)
//						}
//					}, response => {
//						Indicator.close()
//						console.log("王璇接口调用接口失败2" + JSON.stringify(response.data))
//						Toast('网络繁忙')
//					});
//
//				} else {
//					//直接跳login
//					this.$router.push('/login')
//				}
//			}, response => {
//				Indicator.close()
//				console.log("初始化的数据失败===" + JSON.stringify(response.data))
//				console.log("ajax error");
//			});
		},
		methods:{
			getUrlParms(name){
			   var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			   var r = window.location.search.substr(1).match(reg);
			   if(r!=null)
			   return unescape(r[2]);
			   return null;
			}
		}
	}
</script>

<style scoped="scoped">

</style>