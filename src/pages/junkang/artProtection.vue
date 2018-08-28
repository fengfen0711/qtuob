<template>
	 <div class="one">
	 	<img class="human" src="/static/muhaha/Human.png" alt="" />
	 	<p class="cont">需要转接人工核保</p>
	 	<p class="contText">提示需要进行人工核保，人工核保也有可能核保失败，是否需要继续上传证件</p>
	 	<div  class="btnBox clearFloat" >
			<div class="boxLast">重新制定投保计划</div>
			<div class="boxNext">继续上传证件</div>
		</div>
	 </div>
</template>

<script>
</script>

<style scoped="scoped">
	.one {
		width: 100%;
		min-height: 100%;
		position: absolute;
		/*background: #F3F3F3;*/
	}
	.human{
		display: block;
		width:1.6rem;
		height:1.6rem;
		margin: 0.4rem auto;
	}
	.cont{
		text-align: center;
		font-size:0.34rem;
		color: #222222;
		letter-spacing: 0;
	}
	.contText{
		width:3.78rem;
		height:0.4rem;
		margin: 0.4rem auto;
		line-height: 0.4rem;
		/*text-align: center;*/
		font-size: 0.28rem;
		color: #222222;
		letter-spacing: 0;
	}
	.btnBox {
		position: absolute;
		width:6.64rem;
		height:0.88rem;
		bottom: 0.9rem;
		left: 0.48rem;
	}
	.boxLast {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #EB7760;
		letter-spacing: 0;
		border: 1px solid #c9141e;
		border-radius: .44rem;
		float: left;
		margin-right: 0.3rem;
	}
	
	.boxNext {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #fff;
		background: #c9141e;
		letter-spacing: 0;
		border: 1px solid #EB7760;
		border-radius: .44rem;
		float: right;
	}
</style>