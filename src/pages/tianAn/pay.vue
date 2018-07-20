<template>
	<div class="bg">
		<div class="aa" id="blur_all">
			<img class="wait" src="/static/img/loading.png" alt="" @click="tankuang"/>
			<div class="djs">等待支付结果{{count}}秒</div>
		</div>
		
		
		<div v-if="flag" class="bg-2" >
			<div class="msg">
				<div class="msg-top">温馨提示</div>
				<div class="msg-ye">余额不足，是否需要修改银行帐号？</div>
				<div class="hr"></div>
				<div @click="quxiao" class="quxiao">取消</div>
				<div class="ok">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{	
				flag: false,
				count: '',
			   	timer: null
			}
		},
		created(){
			const TIME_COUNT = 5;
		        if (!this.timer) {
			        this.count = TIME_COUNT;
			        this.timer = setInterval(() => {
			        if (this.count > 0 && this.count <= TIME_COUNT) {
			            this.count--;
			        } else {
			        	
			            clearInterval(this.timer);
			            this.timer = null;
			            this.$router.push('/results')
			            }
			        }, 1000)
		        }
		},
		methods:{
			tankuang(){
				if(this.flag){
					this.flag=false;
					
				}else{
					this.flag=true;
					var blur_all = document.getElementById("blur_all");
					blur_all.setAttribute("class", "fb");
				}
				
			},
			quxiao(){
				this.flag=false;
				var blur_all = document.getElementById("blur_all");
					blur_all.setAttribute("class", "fb1");
			}
		}
	}
</script>

<style scoped="scoped">
	.aa{
		width: 100%;
		height: 100%;
	}
	.bg{
		position: fixed;
	    height:100%;
	    width:100%;
		background: #F3F3F3;
		overflow: hidden;

	}
	.fb{
		filter: blur(0.18rem);
	}
	
	.fb1{
		filter: blur(0);
	}
	.wait{
		display: block;
		width:2.2rem;
		height:2.2rem;
		margin: 1.08rem auto 0.48rem;
	}
	.djs{
		text-align: center;
		font-family: PingFangSC-Regular;
		font-size: 0.32rem;
		color: #000000;
	}
	.bg-2{
		position: fixed;
		top: 0;
		width:100%;
		height:100%;
		/*background: rgba(0,0,0,0.20);*/

		
	}
	.msg{
		position: absolute;
		width:5.42rem;
		height:3.56rem;
		background: rgba(248,248,248,0.90);
		border-radius: 13px;
		margin: 4.84rem 1.06rem;
	}
	.msg-top{
		margin-top:0.32rem ;
		font-family: PingFangSC-Medium;
		font-size: 0.32rem;
		color: #222222;
		letter-spacing: -0.1px;
		text-align: center;
	}
	.msg-ye{
		margin-top: 0.38rem;
		margin-left: 0.46rem;
		margin-bottom: 1.22rem;
	}
	.hr{
		border: 0.01rem solid #CCCCCC;
	}
	.quxiao{
		width:2.69rem;
		height:0.86rem;
		line-height: 0.86rem;
		text-align: center;
		float: left;
		font-family: PingFangSC-Regular;
		font-size: 0.32rem;
		color: #EB6067;
	}
	.ok{
		width:2.69rem;
		height:0.86rem;
		line-height: 0.86rem;
		text-align: center;
		border-left: 0.01rem solid #CCCCCC;
		float: left;
		font-size: 0.32rem;
		color: #EB6067;
	}
</style>