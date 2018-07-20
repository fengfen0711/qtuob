<template>
	<div>

	</div>
</template>

<script>
	export default {
		name: "",
		data() {
			return {
			
			}
		},
		created() {
			window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe0edd70ecc490238&redirect_uri=http://outer.qtoubao.cn/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
		}
	}
</script>

<style scoped="scoped">

</style>