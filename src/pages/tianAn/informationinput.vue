<template>
	<div class="information_all">
		<div class="information_text">			
			<label class="information_label">本人声明</label>
			<select class="information_select">
				<option>仅为中国税收居民</option>
			</select>
			<img src="/static/img/upDown.png" class="information_img"/>
		</div>
		<div class="information_bottom_btn">
			<span class="information_bottom" @click="handleClickback">上一步</span>
			<span class="information_next" @click="next">下一步</span>
		</div>
		
	</div>
	
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
    	name: "informationinput",
    	data () {
      		return {
      			
      		}
    	},
    	created() {
    		
    	},
    	
    	methods:{
    		next(){
    			this.$router.push("/insuranceadvice");
    		},
    		handleClickback(){
    			window.history.go(-1)
    		}
    	}
    	
    	
    		
    }
</script>

<style scoped="scoped">
	.information_all{
		background: #F3F3F3;
		width: 100%;
		height: 100%;
		position: absolute;
		
	}
	.information_text{
		height: 0.88rem;
		background: #FFFFFF;
		padding: 0 0.4rem 0 0.4rem;
		line-height: 0.88rem;
		position: relative;
	}
	.information_label{
		font-size: 0.28rem;
		color: #555555;
		width: 1.12rem;
	}
	.information_select{
		width: 4.54rem;
		height: 0.52rem;
		font-size: 0.28rem;
		line-height: 0.5rem;
		margin-left: 0.76rem;
		background: #FFFFFF;
		color: #666666;
		border: none;
	}
	select {   
      /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/  
      border: solid 1px #000;   
      /*很关键：将默认的select选择框样式清除*/  
      appearance:none;   
      -moz-appearance:none;   
      -webkit-appearance:none;   
      /*在选择框的最右侧中间显示小箭头图片*/  
      background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll rightright center transparent;   
      /*为下拉小箭头留出一点位置，避免被文字覆盖*/  
      padding-right: 14px;   
    }   
    /*清除ie的默认选择框样式清除，隐藏下拉箭头*/  
	select::-ms-expand { display: none;
	 } 
	 .information_img{
	 	width: 0.4rem;
	 	height: 0.44rem;
	 	position: absolute;
	 	top:0.22rem;
	 	right: 0.6rem;
	 	bottom: 0.22;
	 
	 }
	 .information_bottom{
	 	
	 	width: 3.12rem;
	 	height: 0.88rem;
	 	border: 0.01rem solid #EB7760;
		border-radius: 0.44rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
		line-height: 0.88rem;
		display: inline-block;
	 }
	 .information_next{
	 
	 	width: 3.12rem;
	 	height: 0.88rem;
	 	border: 0.01rem solid #EB7760;
		border-radius: 0.44rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
		line-height: 0.88rem;
		display: inline-block;
		margin-left: 0.3rem;
		
		
	 }
	 .information_bottom_btn{
	 	padding: 0 0 0 0.48rem;
	 	vertical-align: bottom;
	 	height: 0.88rem;
	 
	 position: fixed;
	 bottom: 0;
	 right: 0;
	 left: 0;
	 margin-bottom: 0.56rem;
	 
	 }
</style>