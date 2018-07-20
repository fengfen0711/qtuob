<template>
	<div>
		<!--<div class="qtb_tittle">
			<span class="about_title">关于趣投保</span>
		</div>-->
		<div class="about_div">
			<img class="about_qtb_img" src="/static/img/red.png"/>
			<p class="about_p">
				深圳市趣投保科技有限公司成立于2017年12月，由被誉为“最熟悉中国银行业的IT专家”——深圳市长亮科技股份有限公司（A股代码：300348）出资成立，公司运营总部设在北京，是一家互联网保险科技公司，致力于为保险代理人、投保人提供高价值的运营服务。
			</p>
		</div>
	</div>
</template>

<script>
	export default {
    	name: "Login",
    	data () {
      		return {
      			
      		}
    	}
   }
</script>

<style scoped="scoped">
	.qtb_tittle{
		background: #F8F8F8;
		padding: 0.2rem 0 0.28rem 0.4rem;
	}
	.about_title{
		font-size: 0.68rem;
		color: #222222;
	}
	.about_div{
		padding: 0.32rem 0.44rem 0 0.4rem;
	}
	.about_qtb_img{
		width: 0.2rem;
		height: 0.2rem;
		float: left;
	}
	.about_p{
		/*height: 1.7rem;*/
		font-size:0.24rem;
		color: #222222;
		width: 95%;
		float: left;
		margin-left: 0.08rem;
		line-height: 0.48rem;
	}
</style>