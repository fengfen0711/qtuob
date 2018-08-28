<template>
	<div class="bg">
		<div class="buyButton">
			<span class="buyLeft">保费：<span>￥1000.00元起</span></span>	
			<span class="buyRight">下一步</span>	
		</div>
	</div>
</template>

<script>
</script>

<style>
	.buyButton{
		position: fixed;
		left: 0;
		bottom: 0;
		width:100%;
		height:1.06rem;
	}
	.buyLeft{
		display: inline-block;
		width:50%;
		height:inherit;
		background: #FFFFFF;
		float: left;
		font-size: 0.36rem;
		color: #333333;
		line-height: 1.06rem;
		text-align: center;
	}
	.buyLeft span{
		color:  #C9141E;
	}
	.buyRight{
		display: inline-block;
		width:50%;
		height:inherit;
		background: #C9141E;
		float: right;
		font-size: 0.36rem;
		color:#FFFFFF;
		line-height: 1.06rem;
		text-align: center;
	}
</style>