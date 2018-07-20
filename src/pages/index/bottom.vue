<template>
	<div class="footer">
		<div @click="handleClickFirst">
			<img v-if="!seen" class="tag_img" src="/static/img/home_unfocus.png">
		    <img v-if="seen" class="tag_img" src="/static/img/home_focus.png">	
		    	<span>首页</span>
		</div>
		<div @click="handleClickMy">
			<img v-if="seen" class="tag_img" src="/static/img/my_unfocus.png">
			<img v-if="!seen" class="tag_img" src="/static/img/my_focus.png">
		    	<span>我的</span>
		</div>
	</div>
</template>

<script>
	export default {
	  	name: 'Index',
	  	props:['seen'],
	  	data(){
	  		return {
	  		}
	  	},
	  	methods:{
	  		handleClickFirst(){
	  			this.$router.push('/')
	  		},
	  		handleClickMy(){
	  			this.$router.push('/my')
	  		}
	  	}
	  }
</script>

<style scoped="scoped">
	.footer{
		width: 100%;
		height: 1.24rem;
		position: fixed;
		bottom: 0;
		display: flex;
		background: #fff;
	}
	.footer div{
		padding-top: .16rem;
		width: 50%;
		float: left;
		text-align: center;
	}
	.tag_img{
		width: .44rem;
		height: .44rem;
		display: block;
		margin: 0 auto;
		margin-bottom: .08rem;
	}
	.tag_img1{
		width: .56rem;
		height: .52rem;
	}
</style>