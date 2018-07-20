<template>
	<div class="footerBox">
		<p class="footerP">
			请确认上述问题的答案是：
		</p>
		<div class="footBtnBox">
			<div class="figure" id="tab1" @click="handleClickFail">
		    	部分为是
		  	</div>
		  	<div class="figure figure2" id="tab2" @click="handleClickNext">
		    	以上皆否	    	
		  	</div>
		</div>
	</div>
</template>

<script>
	export default {
	  	name: 'Footer',
	  	data(){
	  		return {	  			
	  		}
	  	},
	  	methods:{
	  		handleClickFail(){
	  			this.$router.push('/fail')
	  		},
	  		handleClickNext(){
	  			
	  			var saveInfo = {
	  				"noticeReq": [
				        {
				            "noticeAnswer1": "N",
				            "quesNo": "1",
				        },
						{
				            "noticeAnswer1": "N",
				            "quesNo": "2",
				        }
				    ]
	  			}
	  			console.log(JSON.stringify(saveInfo))
//	  			this.$http.post(this.$store.state.link+'/trd/order/v1/saveorder', saveinfo)
  				this.$http.post('http://192.168.171.12:9009/order/v1/saveorder', saveinfo)
				.then(res =>{
				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.$router.push('/popupInfo2?prodCode='+this.$route.query.prodCode+'&orderNo='+this.$route.query.orderNo+'&cmpCode='+this.$route.query.cmpCode+'&userId='+this.$route.query.userId)
					}else{
						Toast(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
	  			
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
	.footerBox {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		width: 100%;
		height: 1.96rem;
		border-top: solid 0.01rem #CFCFCF;
		background: #FFFFFF;
	}
	.footBtnBox {
		display: flex;		
		height: 1.04rem;
	}
	.footerP {
		height: 0.92rem;
		padding-left: 0.4rem;
		line-height: 0.92rem;
		font-size: 0.28rem;
		color: #666666;
	}
	.figure {
		flex: 1;
		line-height: 1.04rem;
		font-size: 0.36rem;
		color: #666666;
		background: #EEEEEE;
		text-align: center;
	}
	.figure2 {
		color: #FFFFFF;
		background: #E7A128;
	}
</style>