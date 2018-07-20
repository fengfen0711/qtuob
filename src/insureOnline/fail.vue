<template>
	<div class="fail">
		<img src="/static/failImg.png" class="failImg" />
		<p class="failImgTitle">投保失败</p>
		<p class="failImgDes">被保险人不符合<span class="red">健康告知</span>中的情况</p>
		<span class="btn" @click="handleClickProducts">选购其他产品</span>
	</div>
</template>

<script>
	export default {
    	name: "Fail",
    	data () {
      		return {
      		}
    	},
    	methods:{
    		handleClickProducts(){
    			this.$router.push('/produch')
			}
    	}
   }
</script>

<style scoped="scoped">
	.left {
		float: left;
	}
	.right {
		float: right;
	}
	input, button {
		background: none;
		border: none;
	}
	input, button {
		outline: none;
	}
	input {
		font-weight: 100;
	}
	input::-ms-clear {
		display: none;
		width: 0;
		height: 0;
	}
	input::-ms-reveal {
		display: none;
	}
	textarea::-webkit-input-placeholder, input::-webkit-input-placeholder {
		color: #B2B2B2;
		font-weight: 100;
	}
	input:-ms-input-placeholder {
		color: #B2B2B2;
		font-weight: 100;
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
	}
	.failImg {
		display: block;
		width: 2rem;
		margin: 0 auto;
		margin-top: 0.76rem;
		margin-bottom: 0.462rem;
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
	.btn {
		position: absolute;
		bottom: 2.68rem;
		left: 0.74rem;
		z-index: 1;
		display: block;
		width: 6.04rem;
		height: 1rem;
		line-height: 1rem;
		border: 0.01rem solid #EB7760;
		box-shadow: inset 0 0.01rem 0.03rem 0 rgba(255,255,255,0.50);
		border-radius: 0.5rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
	}
</style>