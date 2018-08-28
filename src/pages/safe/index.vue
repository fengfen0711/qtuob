<template>
	<div>
		<p class="reset" @click="handleClickPass">
			<span class="left">修改手机号码</span>
			<img class="my_img_itemnext" src="/static/imgNew/icon_next3.png" />
		</p>
		<p class="reset" @click="handleClickPhone">
			<span class="left">修改登录密码</span>
			<img class="my_img_itemnext" src="/static/imgNew/icon_next3.png" />
		</p>
	</div>
</template>

<script>
	
	export default {
    	name: "Safe",
    	data () {
      		return {
      		}
    	},
    	methods:{
    		handleClickPhone(){
    			this.$router.push('/resetPassword')
    		},
    		handleClickPass(){
    			this.$router.push('/resetPhone')
    		}
			  
    	}
   }
</script>

<style scoped="scoped">
	.reset{
		width: 6.94rem;
		height: 1.2rem;
		line-height: 1.2rem;
		border-bottom:  0.02rem solid #eeeeee;
		margin: 0 auto;
		font-size: .34rem;
		color: #000;
	}
	.left{
		float: left;
	}
	.right{
		float: right;
		color: #999999;
	}
	.my_img_itemnext {
		display: block;
		float: left;
		margin-top: 0.24rem;
		width: 0.64rem;
		height: 0.64rem;
		position: absolute;
		right: 0.4rem;
	}
</style>