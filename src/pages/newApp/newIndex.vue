<template>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: "authorization",
		data() {
			return {
				code:'',
				urlWechart:'',
			}
		},
		created() {
//			window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx841a97238d9e17b2&redirect_uri=http://outer.qtoubao.cn/#/newIndex&response_type=code&scope=snsapi_base&state=type%3Dquan%2Curl%3Dhttp%3A%2F%2Fmm.dianping.com%2Fweixin%2Faccount%2Fhome"
//			window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe0edd70ecc490238&redirect_uri=http://outer.qtoubao.cn/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
			this.code = this.$route.query.response_type;
			console.log(this.code)
			Toast(this.code);
			this.urlWechart = this.$store.state.link3 + "/getOAuth2UserInfo";
			this.titleAjax()
		},
		methods: {
			titleAjax() {
				var titleInfo = {
					"code": this.code
				}
//				this.$http.post(this.$store.state.link + "/cnt/atc/queryArticleType", titleInfo)
				this.$http.post(this.urlWechart, titleInfo)
					.then(res => {
						console.log(res.data)
						if(res.data.code == "SYS_S_000") {
							Toast(this.code)
//							if (data.result) {
//	                        	window.open("index1.html","_self");
//	                        }else{
//	                        	Toast("微信授权失败，请重试！");
//	                        }
						}
					}, res => {
						console.log(res.data)
					})
			},
		}
	}
</script>

<style>
</style>