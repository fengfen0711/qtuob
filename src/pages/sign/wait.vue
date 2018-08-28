<template>
	<div class="background">
		<div class="cover">
			<img class="wait_img" src="/static/img/sign/icon.png" alt="" />
			
		</div>
		<p class="wait_word">等待处理</p>
		<p class="wait_content">您提交的申请正在审核中……静候佳音</p>
		<div class="waitdiv" id="waitdiv" v-show="waitdiv">
			<div class="cir1 cir_one clear"><div class="cir2 cir_two"></div></div><span class="zt">已提交</span>
			<div class="hr"></div>
			<div class="cir1 boo cir_one clear"><div class="cir2 cir_two "></div></div><span class="zt zt1">团队总监审批</span>
			<div class="cir1 boo1 cir_one clear"><div class="cir2 cir_two "></div></div><span class="zt zt2">分公司审批</span>
		</div>
		<div class="waitdiv1" id="waitdiv1" v-show="waitdiv1">
			<div class="cir1 cir_one clear" ><div class="cir2 cir_two"></div></div><span class="zt">已提交</span>
			<div class="hr"></div>
			<div class="cir1 booss cir_one clear"><div class="cir2 cir_two "></div></div><span class="zt zt1">团队总监审批</span>
			<div class="cir1 boo1 cir_one clear"><div class="cir2 cir_two "></div></div><span class="zt zt2">分公司审批</span>
		</div>
		<div class="waitdiv2" id="waitdiv2" v-show="waitdiv2">
			<div class="cir1 cir_one clear" ><div class="cir2 cir_two"></div></div><span class="zt">已提交</span>
			<div class="hr"></div>
			<div class="cir1 booss cir_one clear"><div class="cir2 cir_two "></div></div><span class="zt zt1">团队总监审批</span>
			<div class="cir1 boo1ss cir_one clear"><div class="cir2 cir_two "></div></div><span class="zt zt2">分公司审批</span>
		</div>
	
	</div>
</template>

<script>
	export default {

		data(){
			return{
				waitdiv:false,
				waitdiv1:false,
				waitdiv2:false,
			}
			
		},
		methods:{
	
		},
		created(){
		},
		mounted(){
			if(this.$route.query.regStatus=="CN"){
			
				document.getElementById("waitdiv").style.display="none";
				document.getElementById("waitdiv1").style.display="block"
				document.getElementById("waitdiv2").style.display="none";
			}else if(this.$route.query.regStatus=="TN"){
				document.getElementById("waitdiv").style.display="block";
				document.getElementById("waitdiv1").style.display="none"
				document.getElementById("waitdiv2").style.display="none";
			}else if(this.$route.query.regStatus=="ZN"){
				document.getElementById("waitdiv").style.display="none";
				document.getElementById("waitdiv1").style.display="none"
				document.getElementById("waitdiv2").style.display="block";
			}
		},
	}
</script>

<style scoped="scoped">
	.clear{
		clear: both;
	}
	.background{
		  	width: 100%;
		  	height: 100%;
		  	position: fixed;
		  	/*background: url(../../../static/img8/body_bg@2x.png) no-repeat;*/
		  	background-size:cover ;
		  	overflow: hidden;
  	}
  	.cover{
  		margin: 1.44rem auto 0.36rem;
  		width:1.76rem;
  		height:1.76rem;
  	}
  	.wait_img{
  		width:1.76rem;
  		height:1.76rem;
  	}
  	.wait_word{
  		margin-bottom:0.16rem ;
  		font-size: 0.36rem;
  		text-align: center;
		color: #222222;
		line-height: 0.36rem;
  	}
  	.wait_content{
  		margin-bottom: 0.8rem;
		font-size: 0.24rem;
		text-align: center;
		color: #555555;
		line-height: 0.36rem;  		
  	}
  	.cir1{
  		position: relative;
  		left: 1.2rem;
  		width:0.48rem;
  		height:0.48rem;
  		border-radius:52% ;
  		border:0.01rem solid #000000;
  	}
  	.cir2{
  		position: absolute;
  		top:0;
  		bottom: 0;
  		left: 0;
  		right:0;
  		margin: auto;
  		width:0.24rem;
  		height:0.24rem;
  		border-radius:52% ;
  		border:0.01rem solid #000000;
  	}
  	.cir_one{	
  		background: #EB7760;
  	}
  	.cir_two{	
  		background: #FFFFFF;;
  	}
  	.zt{
  		position: absolute;
  		top:5.35rem;
  		left:1.88rem;
  	}
  	.zt1{
  		position: absolute;
  		top:6.8rem;
  		left:1.88rem;
  	}
  	.zt2{
  		position: absolute;
  		top:8.24rem;
  		left:1.88rem;
  	}
  	.hr{
  		margin-left: 1.42rem;
  		width:0.04rem;
  		height:2.8rem;
  		background:#000000;
  	}
  	.boo{
  		margin-top: -1.84rem;
  		background: #D8D8D8;
  	}
  	.booss{
  		margin-top: -1.84rem;
  		background: #EB7760;
  	}
  	.boo1{
  		margin-top: 0.92rem;
  		background: #D8D8D8;
  	}
  	.boo1ss{
  		margin-top: 0.92rem;
  		background: #EB7760;
  	}
  	.waitdiv{
  		display: none;
  	}
  	.waitdiv1{
  		display: none;
  	}
  	.waitdiv2{
  		display: none;
  	}
</style>