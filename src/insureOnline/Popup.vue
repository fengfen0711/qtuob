<template>
	<div class="popup" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="popupBg" v-show="popShow" @click="handleClickPopHide"></div>
		<div class="popupCon" v-show="popShow">
			<p class="popupP">
				<span class="sSpan" @click="sBoxGoPdf1">1、《投保须知》</span>
				<span class="sSpan" @click="sBoxGoPdf2">2、《保险条款》</span>
				<span class="sSpan" @click="sBoxGoPdf3">3、《人身保险投保提示书》</span>
				<span class="sSpan" @click="sBoxGoPdf4">4、《责任免除条款》</span>
				<span class="sSpan" @click="sBoxGoPdf5">5、《银行自动转账授权声明》</span>
				<span class="sSpan" @click="sBoxGoPdf6">6、《投保人与被保人告知声明》</span>
			</p>
		</div>
	</div>
</template>
	
<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
	  	name: 'Popup',
	  	props:['popupShow'],
	  	data(){
	  		return {
	  			popShow:true,
	  			message:''
	  		}
	  	},
	  	created(){
	  		this.popShow = this.popupShow
	  	},
	  	methods:{
	  		handleClickPopHide(){
	  			this.popShow = false;
	  			this.$emit('popup_say',this.popShow);
	  		},
    		sBoxGoPdf1(){
    			window.location.href = "http://h5.qtoubao.cn:8012/onlinePreview?url=http://h5.qtoubao.cn:9900/group1/M00/00/10/rBUQCFraDJyAKk0SABNVRm9ye70235.pdf";
    		},
    		sBoxGoPdf2(){
    			window.location.href = "http://h5.qtoubao.cn:8012/onlinePreview?url=http://h5.qtoubao.cn:9900/group1/M00/00/10/rBUQCFraDJyAKk0SABNVRm9ye70235.pdf";
    		},
    		sBoxGoPdf3(){
    			window.location.href = "http://h5.qtoubao.cn:8012/onlinePreview?url=http://h5.qtoubao.cn:9900/group1/M00/00/10/rBUQCFraDJyAKk0SABNVRm9ye70235.pdf";
    		},
    		sBoxGoPdf4(){
    			window.location.href = "http://h5.qtoubao.cn:8012/onlinePreview?url=http://h5.qtoubao.cn:9900/group1/M00/00/10/rBUQCFraDJyAKk0SABNVRm9ye70235.pdf";
    		},
    		sBoxGoPdf5(){
    			window.location.href = "http://h5.qtoubao.cn:8012/onlinePreview?url=http://h5.qtoubao.cn:9900/group1/M00/00/10/rBUQCFraDJyAKk0SABNVRm9ye70235.pdf";
    		},
    		sBoxGoPdf6(){
    			window.location.href = "http://h5.qtoubao.cn:8012/onlinePreview?url=http://h5.qtoubao.cn:9900/group1/M00/00/10/rBUQCFraDJyAKk0SABNVRm9ye70235.pdf";
    		},
	  	},
	  	watch:{
	  		popupShow:function(val){
	  			this.popShow = this.popupShow
	  		}
	  	}
	}
</script>

<style scoped="scoped">
	.left {
		float: left;
	}
	.right {
		float: right;
	}
	input, button {
		background: none;
		border: none;
	}
	input, button {
		outline: none;
	}
	input {
		font-weight: 100;
	}
	input::-ms-clear {
		display: none;
		width: 0;
		height: 0;
	}
	input::-ms-reveal {
		display: none;
	}
	textarea::-webkit-input-placeholder, input::-webkit-input-placeholder {
		color: #B2B2B2;
		font-weight: 100;
	}
	input:-ms-input-placeholder {
		color: #B2B2B2;
		font-weight: 100;
	}
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.popupBg {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.2);
	}
	.popupCon {
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 6rem;
		height: 6.5rem;
		margin: auto;
		background: rgba(0, 0, 0, 0.7);
		border-radius: 0.1rem;
		background: #FFFFFF;
	}
	.popupP {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 101;		
		width: 5.2rem;
		padding: 0.64rem 0.4rem;
	}
	.sSpan {
		display: block;
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
		color: #6BD1CF;
		overflow: hidden;
		border-bottom: solid 0.01rem #C8C7CC;
		background: none;
		background: url(/static/img/detail.png) no-repeat right center;
		background-size: 0.45rem 0.45rem;
	}
	.popupP .sSpan:first-child{
		border-top: solid 0.01rem #C8C7CC;
	}
</style>