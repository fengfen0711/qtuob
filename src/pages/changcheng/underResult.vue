<template>
	<div class="result_bg">
		<img class="resultimg" src="/static/img/zhonghua/icon_falsess.png" />
		<p class="resultname">核保失败</p>
		<p class="result_gener">被拒保的理由</p>

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
		name: "underResult",
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
		/*padding: 0 0.4rem;*/

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
	.btn{
        width: 100%;    
        margin-top: 7rem;
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