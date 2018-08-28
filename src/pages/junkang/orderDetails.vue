<template>
	<div class="bg">
		<h1>我是产品详情</h1>
		<div class="btnBox" @click="handleClick">马上购买</div>
		<div class="babe" v-show="!babe">
			<div class="babe1">可供您选择的产品如下：</div>
			<div class="babe2">产品一</div>
			<div class="babe3">产品二</div>
		</div>
	</div>
</template>
    
<script>
	import { Toast } from 'mint-ui'
	export default{
		data(){
			return{	
				babe:true
			}
		},
		methods:{
			handleClick(){
				if(this.babe){
					this.babe = false
				}else{
					this.babe = true
				}
				
			}
		}
	}
</script>

<style scoped="scoped">
	.bg{
		position: absolute;
		width:100%;
		min-height: 100%;
	}
	.bg h1{
		text-align: center;
		font-size: 0.36rem;
	}
	.btnBox{
		position: fixed;
		bottom: 0;
		width:100%;
		height:1.06rem;
		font-size: 0.34rem;
		color: #FFFFFF;
		line-height: 1.06rem;
		text-align: center;
		background: #C9141E;
	}
	.babe{
		/*display: flex;*/
		width:5rem;
		height:3rem;
		margin: 3rem auto;
		background: #3F464C;
	}
	.babe1{
		width:5rem;
		height:1.5rem;
		/*background: #008000;*/
		color: #F19667;
		font-size: 0.44rem;
		line-height: 3em;
		text-align: center;
		border: 0.01rem solid #666666;
	}
	.babe2{
		float: left;
		width:2.49rem;
		height:1.5rem;
		/*background: #00AFC7;*/
		color: #FFFFFF;
		font-size: 0.44rem;
		line-height: 3em;
		text-align: center;
		border-right: 0.01rem solid #666666;
	}
	.babe3{
		float: left;
		width:2.5rem;
		height:1.5rem;
		/*background: #25A4BB;*/
		color: #FFFFFF;
		font-size: 0.44rem;
		line-height: 3em;
		text-align: center;
	}
</style>