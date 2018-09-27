<template>
	<div class="fail">
		<img src="/static/successImg.png" class="failImg" />
		<p class="failImgTitle">提交成功</p>
		<p class="mi">您的投保信息已经提交保险公司进行人工核保请耐心</br>等待！您也可以前往订单中心查看订单状态</p>
		<!--<p class="failImgDes">内容详情，根据实际文案安排</p>-->
		<p class="btnBox clearFloat">
			<span class="btn btn1" @click="handleClickMyOrder">我的订单</span>
			<span class="btn" @click="handleClickIndex">返回首页</span>
		</p>

	</div>
</template>

<script>
	export default {
		name: "PaySucess",
		data() {
			return {}
		},
		methods: {
			handleClickMyOrder() {
				this.$router.push('/mylifeOrder')
			},
			handleClickIndex() {
				this.$router.push('/')
			}
		}
	}
</script>

<style scoped="scoped">
	.mi{
		margin-top: .3rem;
		width: 100%;
		text-align: center;
		line-height: .45rem;
	}
	.left {
		float: left;
	}
	
	.right {
		float: right;
	}
	
	input,
	button {
		background: none;
		border: none;
	}
	
	input,
	button {
		outline: none;
	}
	
	input::-ms-clear {
		display: none;
		width: 0;
		height: 0;
	}
	
	input::-ms-reveal {
		display: none;
	}
	
	textarea::-webkit-input-placeholder,
	input::-webkit-input-placeholder {
		color: #B2B2B2;
	}
	
	input:-ms-input-placeholder {
		color: #B2B2B2;
	}
	
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	
	.fail {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	
	.failImg {
		display: block;
		width: 2rem;
		margin: 0 auto;
		margin-top: 0.76rem;
	}
	
	.failImgTitle {
		height: 0.48rem;
		line-height: 0.48rem;
		font-size: 0.34rem;
		color: #222222;
		text-align: center;
	}
	
	.failImgDes {
		height: 0.4rem;
		margin-top: 0.24rem;
		line-height: 0.4rem;
		font-size: 0.28rem;
		color: #222222;
		text-align: center;
	}
	
	.red {
		color: #EB7760;
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