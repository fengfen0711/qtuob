<template>
	<div class="background">
		<div class="bg"></div>
		<div class="top">
			<img class="logo" src="/static/img/sign/mdlogo.png" alt="" />
		</div>
		<p class="title">重要提示</p>
		<div class="center">
			<div class="first1">
				<p class="first">1.后续所签署的保险委托销售合同仅代表申请人个人具有签署意愿。待后续审核通过后，合同方可生效。未经公司同意或证件信息有误的，后台审核不予通过。</p>
			</div>
			<div class="two">
				<p class="first">2.整个签约的过程需要5-10分钟，<span class="label_p">且无法中途保存</span>，退出再进入签约界面将会重置填写的内容，所以请保证填写过程安静不被打扰，以免信息填写错误，填写时可能会出现页面加载不出来的情况，稍等片刻即好。</p>
			</div>
			<div class="three">
				<p class="weight first">3.签约前请准备好本人的身份证、银行卡、学历证书等证件。</p>
			</div>
			<div class="four">
				<p class="first">4.如在填写过程中遇到其他问题，请及时联系您的邀请人。</p>
			</div>
		</div>

		<div ref="styles" class="btn" @click="handleClickNext">
			<span class="bian">确定</span>
		</div>
		<div ref="styles1" class="bot"></div>
	</div>
</template>

<script>
	export default {
		name: "sign",
		data() {
			return {

			}
		},
		created() {},
		methods: {
			handleClickNext() {
				this.$router.push('/phone')
			}

		}
	}
</script>

<style scoped="scoped">
	.disb{
		display: inline-block;
	}
	.weight{
		font-weight: bold;
	}
	.first{
		/*font-family: STSongti-SC-Regular;*/
		font-size: 0.3rem;
		line-height: 0.4rem;
		display: inline-block;
		
	}
	.label_p{
		font-weight: bold;
	}
	.two{
		font-size: 0.4rem;
		line-height: 0.6rem;
	}
	.three{
		font-size: 0.4rem;
		line-height: 0.6rem;
	}
	.four{
		font-size: 0.4rem;
		line-height: 0.6rem;
	}
	.background {
		width: 100%;
		height: 100%;
		background-size: cover;
		overflow: hidden;
		font-family: "宋体";
		padding-bottom: .38rem;
	}
	
	.bg {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: url(/static/img/sign/bg.png) no-repeat;
		background-size: cover;
		z-index: -1;
	}
	
	.top {
		width: 6.86rem;
		height: 1.52rem;
		background: url(/static/img/sign/top.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		margin-top: .38rem;
		position: relative;
	}
	
	.logo {
		position: absolute;
		bottom: .14rem;
		width: .68rem;
		height: .52rem;
		left: 3.1rem;
	}
	
	.title {
		font-family: STSongti-SC-Regular;
		font-size: .48rem;
		color: #000000;
		letter-spacing: 0;
		text-align: center;
		margin-top: .02rem;
	}
	
	.center {
		margin-top: .48rem;
		margin-bottom: 2.06rem;
	}
	
	.center div {
		width: 5.6rem;
		line-height: .32rem;
		font-size: .2rem;
		margin: 0 auto;
		margin-top: .32rem;
		text-align: justify;
	}
	
	.btn {
		width: 5.34rem;
		height: 1.24rem;
		background: url(/static/img/sign/btn.png) no-repeat;
		background-size: contain;
		/*position: absolute;*/
  	bottom: 2.02rem;
  	left: 1.08rem;
		margin: 0 auto;
		margin-top: 1.8rem;
		text-align: center;
		line-height: 1.24rem;
		font-size: .48rem;
	}
	.bian{
		background: -webkit-linear-gradient(45deg, #B19A2E , #DAC947,#AF9C33,#E5D54C,#B1A62F);     /* 背景色渐变 */
  -webkit-background-clip: text;         /* 规定背景的划分区域 */
  -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
	}
	.bot {
		width: 6.86rem;
		/*position: absolute;*/
  		bottom: .32rem;
		height: 1.52rem;
		background: url(/static/img/sign/bot.png) no-repeat;
		background-size: contain;
		left: .32rem;
		margin: 0 auto;
		margin-top: .84rem;
		overflow: hidden;
	}
	
	.insuracce {
		text-align: center;
		line-height: .34rem;
		margin-top: .12rem;
	}
	
	body {
		font-family: "宋体";
	}
</style>