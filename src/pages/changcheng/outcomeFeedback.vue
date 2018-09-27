<template>
	<div class="result_bg">
		<img class="resultimg" src="/static/img/zhonghua/state_successss.png" />
		<p class="resultname">签名完成</p>
		<p class="result_gener">您的签名已经完成，请及时告知您的代理人。</p>
		<p class="resultmess">经纪人信息</p>
		<div id="" class="result_div">
			<div class="resultback" >
				<img class="resulthead" src="/static/img/zhonghua/resultimg.png"/>
				<div class="resultform_div" >
					<p>
						<span>经纪人:柴富强</span>
						<span class="right">工号:10000165</span>
					</p>
					<p class="result_p">
						<span>手机号：13466670107</span>
					</p>
				</div>
			</div>
		<div class="btn">
            <span class="btn_left" @click="againClick">查看订单详情</span>
            <span class="btn_left btn_right" @click="homeClick">返回首页</span>
        </div>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		name: "OutcomeFeedback",
		data() {
			return {
				
			}
		},
		
		methods: {
			againClick(){
				console.log(111)
			},
			homeClick(){
				console.log(222)
			}
			
		},
		
	}
</script>

<style scoped="scoped">
	.result_bg{
		width: 100%;
		height: 100%;
		padding: 0 0.4rem;

	}
	.resultimg{
		width: 1.76rem;
		height: 1.76rem;
		display:block;
		margin: 0 auto;
		margin-top: 0.6rem;
	}
	.resultname{
		font-size:0.34rem;
		color: #222222;
		text-align: center;
		margin-top: 0.4rem;
		line-height: 0.4rem;
	}
	.result_gener{
		font-size: 0.28rem;
		color: #222222;
		line-height: 0.3rem;
		text-align: center;
		margin-top: 0.24rem;
	}
	.resultmess{
		font-size:0.28rem;
		color: #555555;
		line-height: 0.4rem;
		margin-top: 0.92rem;
		font-weight:600;
	}
	.result_div{
		width: 6.7rem;
		height: 1.52rem;
		margin-top: 0.2rem;
		background: #FFFFFF;
		box-shadow: 0 0.04rem 0.08rem 0 rgba(219,219,219,0.50);
		border-radius: 0.16rem;
		/*padding: 0.3rem 0.28rem 0.26rem 0.28rem;*/
	}
	.resulthead{
		width: 0.96rem;
		height: 0.96rem;
		display: inline-block;
		margin-left: 0.28rem;
		margin-top: -0.5rem;
		margin-right: 0.32rem;
		/*margin-top: 0.3rem;
		margin-left: 0.28rem;*/
	}
	.resultform_div{
		display: inline-block;
		font-size: 0.28rem;
		color: #222222;	
		
	}
	.resultform_div p{
		margin-top: 0.32rem;
		margin-bottom: 0.12rem;
	}
	.resultback{
		/*margin: 0.3rem;*/
		margin-top: 0.3rem;
	}
	.result_p{
		/*margin-top: 0.12rem;*/
	}
	.right{
		margin-left: 0.2rem;
	}
	.btn{
        width: 100%;    
        margin-top: 4rem;
        padding-top: 0.7rem;
        padding-bottom: 0.5rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .btn_left{
        width: 30%;
        padding: 0.3rem 0.3rem;
        border: 1px solid #c9141e;
        text-align: center;
        color: #c9141e;
        border-radius: 1rem;
    }
     .btn_right{
     	 background: #c9141e;
     	 color: #FFFFFF;
     }
</style>