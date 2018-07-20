<template>
	<div class="bg">
		<img class="success" src="/static/img/successImg.png" alt="" />
		<span class="words">需要转接人工核保</span>
		<span class="content">
			{{message}}
		</span>
		<p class="btnBox clearFloat">
			<span @click="cancel" class="btn btn1">返回修改</span>
			<span @click="addCard" class="btn">继续上传证件</span>
		</p>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		data() {
			return {
				message: ''
			}
		},
		created() {
			if(this.$route.query.message == "" || this.$route.query.message == undefined) {
				this.message = ""
			} else {
				this.message = this.$route.query.message.replace(/aaa/g, '%');
			}
			if(this.message == undefined) {
				this.message = "";
			}
		},
		methods: {
			cancel() {
				this.$router.push('/intoInfo?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$store.state.token)
			},
			addCard() {
				this.$router.push('/inforUpload?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&state=1&token=" + this.$store.state.token)
			}
		}
	}
</script>

<style scoped="scoped">
	.bg {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	.success {
		width: 2.4rem;
		height: 2.4rem;
		display: block;
		margin: 0 auto;
		margin-top: 0.16rem;
	}
	
	.words {
		display: block;
		text-align: center;
		font-size: 0.34rem;
		line-height: 0.48rem;
		color: #222222;
	}
	
	.content {
		display: block;
		width: 7rem;
		margin: 0 auto;
		font-size: 0.28rem;
		line-height: 0.52rem;
		color: #222222;
		text-align: center;
	}
	
	.btnBox {
		position: absolute;
		bottom: 0.64rem;
		left: 0.48rem;
		z-index: 1;
	}
	
	.btn {
		display: inline-block;
		float: left;
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		border: 0.02rem solid #EB7760;
		box-shadow: inset 0 0.01rem 0.03rem 0 rgba(255, 255, 255, 0.50);
		border-radius: 0.5rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
	}
	
	.btn1 {
		margin-right: 0.3rem;
	}
</style>