<template>
	<div class="one">
		<div class="oneTitle">
			<img src="/static/ranch.png" class="ranchImg" />
			<p class="oneTitleText clearFloat">
				<span class="oneTitleTextSpan1 left selected">投保告知</span>
				<span class="oneTitleTextSpan2 left">投保信息</span>
				<span class="oneTitleTextSpan3 right">订单核对</span>
			</p>
		</div>
		<p class="titleP">&nbsp;</p>
		<div class="oneCon">
			<p class="oneConP1">&nbsp;</p>
			<p class="oneConP" v-for="oneConList in oneConLists" v-html="oneConList.quesNo +'. '+ oneConList.quesCont">{{oneConList.quesNo +'. '+ oneConList.quesCont}}</p>
			<p class="conPlast">&nbsp;</p>
		</div>
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
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
    	name: "PopupInfo1",
    	data () {
      		return {
      			oneConLists:[]
      		}
    	},
    	created(){
    		var oneCon = {
			  	"prodCode": this.$route.query.prodCode
			}
    		
    		this.$http.post(this.$store.state.link+'/prd/prod/heallist', oneCon)
			.then(res =>{
//			    console.log(res.data);
			    Indicator.close();
				var dataCode = res.data.code;
				if (dataCode == "SYS_S_000") {
					this.oneConLists = res.data.output
				}else{
					Toast(res.data.desc);
				}
			},res =>{
				Indicator.close();
				console.log(res.data);
			})
			this.OrderInfoAjax()
    	},
    	methods:{
    		OrderInfoAjax(){
    			var OrderInfo = {
				  	"head": {
					    "channelCode": "qtb_h5",
					    "deptCode": this.$route.query.cmpCode,
					    "oprCode": this.$store.state.userId,
					    "prodCode": this.$route.query.prodCode
				  	},
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
				  	"opt": "",
				  	"pkgNo": this.$route.query.orderNo
				}
				this.$http.post(this.$store.state.link+'/trd/order/v1/queryorder', OrderInfo)
				.then(res =>{
				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						
					}else{
						Toast(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
    		},
    		handleClickFail(){
	  			this.$router.push('/fail')
	  		},
	  		handleClickNext(){
	  			let a="",
	  				arr=[];
	  			for (let i = 0; i< this.oneConLists.length; i++) {
	  				a={
	  					"noticeAnswer1": "N",
				        "quesNo": i+1,
				        "noticeSubject":"1"
	  				}
	  				arr.push(a)
	  			}
	  			var saveInfo = {
	  				"head": {
					    "channelCode": "qtb_h5",
					    "deptCode": this.$route.query.cmpCode,
					    "oprCode": this.$store.state.userId,
					    "prodCode": this.$route.query.prodCode
					},
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
				  	"opt": "INSNOT",
				  	"pkgNo": this.$route.query.orderNo,
				  	"mark":"UC",
	  				"noticeReq": arr
	  			}
	  			console.log(JSON.stringify(saveInfo))
	  			this.$http.post(this.$store.state.link+'/trd/order/v1/saveorder', saveInfo)
				.then(res =>{
				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
//						if () {
//							
//						}
						this.$router.push('/popupInfo2?prodCode='+this.$route.query.prodCode+'&prodNo='+this.$route.query.prodNo+'&orderNo='+this.$route.query.orderNo+'&cmpCode='+this.$route.query.cmpCode)
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
	}
	input:-ms-input-placeholder {
		color: #B2B2B2;
	}
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.one{
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.oneTitle {
		width: 100%;
		height: 1.28rem;		
		padding-top: 0.32rem;
		background: #FFFFFF;
	}
	.oneTitleText {
		height: 0.34rem;
		line-height: 0.34rem;
		font-size: 0.26rem;
		color: #999999;
	}
	.oneTitleTextSpan1 {
		margin-left: 0.32rem;
	}
	.oneTitleTextSpan2 {
		margin-left: 2rem;
	}
	.oneTitleTextSpan3 {
		margin-right: 0.32rem;
	}
	.ranchImg {
		display: block;
		width: 6.4rem;
		height: 0.48rem;
		margin: 0 auto;
		margin-bottom: 0.2rem;
	}
	.selected {
		color: #EB7760;
	}
	.titleP {
		width: 100%;
		height: 0.4rem;
		background: #F3F3F3;
	}
	.oneCon {
		height: 9.6rem;
		padding: 0 0.4rem;
		line-height: 0.48rem;
		font-size: 0.32rem;
		color: #222222;
		overflow: scroll;
	    overflow-y: auto;
	    -webkit-overflow-scrolling: touch;
	}
	.oneCon::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: #fff;
	}
	.conPlast {
		height: 1.82rem;
	}
	.oneConP{
		/*text-indent: 2em;*/
		margin-bottom: 0.2rem;
	}
	.oneConP1 {
		height: 0.32rem;
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
		color: #333333;
	}
	.figure {
		flex: 1;
		line-height: 1.04rem;
		font-size: 0.36rem;
		color: #333333;
		background: #EEEEEE;
		text-align: center;
	}
	.figure2 {
		color: #FFFFFF;
		background: #E7A128;
	}
</style>