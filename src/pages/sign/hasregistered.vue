<template>
	<div class="confirmation_all">
		<div class="bg"></div>
		<div class="top">
			<img class="logo" src="/static/img/sign/mdlogo.png" alt="" />
		</div>
		<div class="information_p">
			<p class="information_succss">提交申请成功</p>
			<p class="informaton_descrip">
				您已经注册过趣投保 App 账号
				为方便查询申请进度，请前往趣投保 App 或
				趣投保科技官方微信公众号（qutoubaokj），登陆查
				询申请进度。
			</p>
			
			<!--<p class="information_reconi">
				下载趣投保 App<br/>关注趣投保科技官方微信公众号（趣投保科技）<br/>登陆后即可查询申请进度。
			</p>
			<a class="information_look">查看演示</a>-->
		</div>
		
		<div class="btn" ref="styles"@click="backgo" >
			返回
		</div>
		<div class="bottom" ref="styles1">
		</div>
	</div>

</template>

<script>
	export default {
		name: "informaReconfirm",
		data() {
			return {
				question:0,
         	size:0
			}
		},
		created() {
			this.size=document.documentElement.clientHeight
		},
		mounted(){
      	const that=this
 		window.onresize = function temp() {
        that.question = document.documentElement.clientHeight;
        	that.styleSet()
      }
     },
		methods: {
			styleSet(){
      	 if(this.size < this.question){
     	 this.$refs.styles.style.display="block"
     	 this.$refs.styles1.style.display="block"
	   }else{
	      this.$refs.styles.style.display="none"
	      this.$refs.styles1.style.display="none"
	   }   
    },
	    backgo(){
				WeixinJSBridge.call('closeWindow');
			}
		}
		
	}
	
</script>

<style scoped="scoped">
	.confirmation_all {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.bg{
		position: fixed;
	  	top: 0;
	  	bottom: 0;
	  	left: 0;
	  	right: 0;
	  	background: url(/static/img/sign/bg.png) no-repeat;
	  	background-size:cover ;
	  	z-index: -1;
	}
	.top {
		width: 6.86rem;
		height: 1.52rem;
		background: url(/static/img/sign/top.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		margin-top: .38rem;
		position: relative;
	}
	
	.logo {
		position: absolute;
		bottom: .14rem;
		width: .68rem;
		height: .52rem;
		left: 3.1rem;
	}
	.left,
	.right {
		width: 3.17rem;
		height: 1rem;
		font-size: .32rem;
		line-height: 1rem;
		float: left;
	}
	
	.bottom {
		width: 6.86rem;
		height: 1.52rem;
		background: url(/static/img/sign/bot.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		margin-top: .52rem;
		position: relative;
			position: absolute;
  	bottom: .32rem;
  	left: .32rem;
		
	}
	.btn {
		width: 5.34rem;
		height: 1.24rem;
		background: url(/static/img/sign/btn.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		position: relative;
		margin-top: 2rem;
		text-align: center;
		line-height: 1.24rem;
		font-size: .4rem;
		color: #222222;
		position: absolute;
  	bottom: 2.6rem;
  	left: 1.08rem;
	}
	.information_p{
		margin-top: 0.5rem;
		padding: 0 0.94rem;
	}
	.information_succss{
		font-size: 0.48rem;
		color: #000000;
		margin: 0 auto;
		text-align: center;
		line-height: 0.4rem;
	}
	.informaton_descrip{
		font-size: 0.28rem;
		color: #000000;
		line-height: 0.4rem;
		margin-top: 0.48rem;
	}
	.code_w {
		width: 5.6rem;
		/*height: 1.7rem;*/
		margin: 0 auto;
		margin-top: .22rem;
	}
	
	.code {
		width: 5.6rem;
		height: .8rem;
		text-align: center;
		background: url(/static/img/sign/line.png) no-repeat;
		background-size: contain;
		background-position-y: 100%;
		margin-top: .1rem;
	}
	.yao {
		float: left;
		width: 1.4rem;
		text-align: right;
		font-size: .28rem;
		color: #000000;
		line-height: .8rem;
	}
	 .name{
  	width: 3.5rem;
  	height: .8rem;
  	float: left;
  	margin-left: 1.46rem;
  	font-size: .28rem;
  	border: none;
  	background: none;
  	margin: 0 auto;
  	/*line-height: .8rem;*/
  }
  .information_reconi{
  	font-size: 0.24rem;
	color: #000000;
	line-height: 0.4rem;
  }
  .information_look{
  	font-size: 0.24rem;
	color: #D0021B;
	margin-top: 0.04rem;
	text-decoration:underline;
  }
</style>