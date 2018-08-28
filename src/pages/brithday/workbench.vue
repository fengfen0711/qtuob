<template>
	<div class="about_company">
		<img class="about_img" src="/static/img/login_logo.png" />
		<!--<div class="about_list">
			<div class="about_text">
				<span class="about_gol">去评分</span>
				<img class="work_img" src="/static/img/detail.png" />
			</div>
		</div>-->
		<div class="about_list">
			<div class="about_text">
				<span class="about_gol">客服热线</span>
				<a class="about_tel" :href="'tel:' +  phoneNum ">{{ phoneNum }}</a>
			</div>
		</div>
		<div class="about_list">
			<div class="about_text">
				<span class="about_gol">电子邮件</span>
				<span class="about_tel" >cs@sunline.cn</span>
			</div>
		</div>
		<div class="about_list">
			<div class="about_text">
				<span class="about_gol">当前版本</span>
				<span class="about_tel" >1.1.8</span>
			</div>
		</div>
		<div class="about_list" v-on:click="qtb_detail">
			<div class="about_text">
				<span class="about_gol">趣投保介绍</span>
				<img class="work_img" src="/static/imgNew/icon_next3.png" />
			</div>
		</div>
		<div class="about_botto_div">
			<div class="about_bott">Copyright @ 2017</div>
			<div class="about_cont">深圳市长亮科技股份有限公司  保留所有版权</div>
		</div>
	</div>
</template>

<script>
	export default {
    	name: "Workbench",
    	data () {
      		return {
      			phoneNum:"010-86220865",
      		}
    	},
    	created(){
    		this.common.noShare();
		},
    	methods:{
    		qtb_detail(){
 				this.$router.push("/about_qtb")
			}
    	}

    
   }
</script>

<style scoped="scoped">
	.about_img{
		display: block;
		width:1.96rem;
		height: 2.28rem;
		margin: 0 auto;
		margin-top:0.74rem;
		margin-bottom: 0.32rem;
	}
	.about_list{
		height: 0.9rem;
		padding: 0 0.4rem 0 0.4rem;
		
	}
	.about_text{
		height: 0.9rem;
		border-bottom:0.01rem solid;
		border-bottom-color: #E3E3E3;
	}
	.about_gol{
		font-size: 0.32rem;
		color: #222222;
		display: inline-block;
		line-height: 0.9rem;
	}
	.work_img{
		width: 0.64rem;
		height: 0.64rem;
		display: inline-block;
		margin-top: 0.13rem;
		float: right;
	
	}
	.about_tel{
		font-size: 0.32rem;
		color: #969696;
		float: right;
		line-height: 0.9rem;
		margin-right: 0.3rem;
	}
	.about_botto_div{
		height: 0.6rem;
		position: fixed;
		bottom: 0.48rem;
		left: 0;	
		right: 0;
		
	}
	.about_cont{
		font-size: 0.26rem;
		color: #888888;
		text-align: center;
		margin-top: 0.06rem;
	}
	.about_bott{
		font-size: 0.26rem;
		color: #888888;
		text-align: center;
	}
</style>