<template>
	<div class="feedbg_all">
		<img src="/static/img/zhonghua/state_successss.png" class="relay_img"/>
		<p class="feedwrite">提交完成</p>
		<p class="feedcontext">您的投保信息已提交保险公司进行<label style="color: #C9141E ;">人工核保</label>，请耐心等待！您也可以前往订单中心查</p>
		<div class="feed_div">
			<span class="feedorder">重新制定投保计划</span>
			<span class="feedindex">返回首页</span>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		name: "Feedsubmit",
		data() {
			return {
				
			}
		},
		
		methods: {
		},
		
	}
</script>

<style scoped="scoped">
	.feedbg_all{
		width: 100%;
		height: 100%;	
	}
	.relay_img{
		width: 1.76rem;
		height: 1.76rem;
		display: block;
		margin: 0 auto;
		margin-top: 0.6rem;
	}
	.feedwrite{
		font-size: 0.34rem;
		color: #222222;
		text-align: center;
		margin-top: 0.4rem;
	}
	.feedcontext{
		font-size: 0.28rem;
		color: #222222;
		line-height: 0.4rem;
		width: 6.16rem;
		margin: 0 auto;
		margin-top: 0.24rem;
	}
	.feed_div{
		position: fixed;
		bottom: 1.16rem;
		left: 0.52rem;
		width: 100%;
		height: 0.88rem;
	}
	.feedorder{
		font-size: 0.32rem;
		color: #C9141E;
		border: 0.01rem solid #C9141E;
		border-radius: 0.44rem;
		/*padding:0.22rem 0.92rem ;*/
		width: 3.12rem;
		height: 0.88rem;
		display: inline-block;
		text-align: center;
		line-height: 0.88rem;
	}
	.feedindex{
		font-size: 0.32rem;
		color: #C9141E;
		border: 0.01rem solid #C9141E;
		border-radius: 0.44rem;
		width: 3.12rem;
		height: 0.88rem;
		margin-left: 0.26rem;
		display: inline-block;
		text-align: center;
		line-height: 0.88rem;
	}
</style>