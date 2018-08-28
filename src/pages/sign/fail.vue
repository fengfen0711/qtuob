<template>
	<div class="background">
		<div class="cover">
			<img class="wait_img" src="/static/img/sign/iconerror.png" alt="" />
		</div>
			<p class="wait_word">审批不通过</p>
			<p class="wait_content">由于以下原因，驳回您的审批申请</p>
			<div v-for="item in failarr">
				
				<div class="cirle clear"></div><p class="c_p">{{item}}</p>
			</div>
			
			<div class="btn">
				<div @click="handleClick" class="last">返回首页</div>
				<div class="next" @click="perfectin">完善信息</div>
			</div>
	</div>
</template>

<script>
	export default {

		data(){
			return{
				failreason:"",  //失败原因
				failarr:[],
				failarrnew:[]
			}
			
		},
		methods:{
			handleClick(){
			//返回首页	
//				this.$router.push("/")
				window.history.go(-1)
			},
			perfectin(){
				this.$router.push("/sign?brokerId="+this.$route.query.brokerId+"&status="+"2")
			},
		},
//		mounted() {
//			let canvas = this.$refs.canvasF;
//			canvas.height = this.$refs.canvasHW.offsetHeight
//			canvas.width = this.$refs.canvasHW.offsetWidth
//			this.canvasTxt = canvas.getContext("2d");
//		},
		created() {
			this.failreason=this.$route.query.failure
			this.failarr=this.failreason.split(",")
			console.log(this.failarr);
			for(var i=0;i<this.failarr.length;i++){
				
				if(this.failarr[i].length==""||typeof(this.failarr[i])=="undefined"){
					this.failarr.splice(i,1);
					i--
					
					
				}
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
		  	/*background-size:cover ;
		  	overflow: hidden;*/
		  	
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
  	.cirle{
  		float: left;
  		margin-left: 0.9rem;
  		margin-bottom: 0.32rem;
  		width:0.16rem;
  		height:0.16rem;
  		border-radius: 50%;
  		background: #D0021B;
  	}
  	.c_p{
  		float: left;
  		margin-left: 0.16rem;
  		margin-top: -0.06rem;
  		width: 70%;
  		line-height: 0.4rem;
  	}
  	.btn{
  		margin: 0 auto;
  		width:6.54rem;
  		height:0.88rem;
  		font-size: 0.32rem;
  		line-height: 0.88rem;
  		text-align: center;
  		position: fixed;
  		bottom: 1.2rem;
  		left: 0.48rem;
		
  	}
  	.btn .last{
  		float: left;
  		width:3.12rem;
  		height:0.88rem;
  		color: #EB7760;
  		border: 0.01rem solid #EB7760;
  		border-radius: 0.44rem;
  	}
  	.btn .next{
  		float: right;
  		width:3.12rem;
  		height:0.88rem;
  		background: #EB6067;
  		color: #FFFFFF;
  		border: 0.01rem solid #EB7760;
  		border-radius: 0.44rem;
  	}
</style>