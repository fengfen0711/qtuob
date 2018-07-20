<template>
	<div class="fail">
		<img src="/static/failImg.png" class="failImg" />
		<p class="failImgTitle">核保失败</p>
		<p class="failImgDes">{{message}}</p>
		<p class="btnBox">
			<span class="btn btn1" @click="handleClickProducts">修改信息</span>
			<span class="btn" @click="handleClickProducts1">重新选购</span>
		</p>
		
	</div>
</template>

<script>
	export default {
    	name: "UWfail",
    	data () {
      		return {
      			message:this.$route.query.message
      		}
    	},
    	methods:{
    		handleClickProducts1(){
    			this.$router.push('/produch')
			},
			handleClickProducts(){
    			this.$router.push('/cvrgInfo?prodCode='+this.$route.query.prodCode+'&prodNo='+this.$route.query.prodNo+'&orderNo='+this.$route.query.orderNo+'&cmpCode='+this.$route.query.cmpCode)
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
	.btnBox {
		padding: 2.64rem 0.4rem;
		text-align: center;
	}
	.btn {
		display: inline-block;
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		border: 0.01rem solid #EB7760;
		box-shadow: inset 0 0.01rem 0.03rem 0 rgba(255,255,255,0.50);
		border-radius: 0.5rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
	}
	.btn1 {
		margin-right: 0.3rem;
	}
</style>