<template>
	<div class="popup" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="iconBox">
		  	<div class="figure figure2" @click="handleClickGoPopInfo">
		    	马上购买	    	
		  	</div>
		</div>
	</div>
</template>
	
<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	import { MessageBox } from 'mint-ui'
	export default {
	  	name: 'changCheng',
	  	props:['prodNo','saleStatus','unSaleDes','cmpCode'],
	  	data(){
	  		return {
			  	prodCode:this.$route.query.prodCode,
	  		}
	  	},
	  	created(){
	  		
	  	},
	  	methods:{
	  		handleClickGoPopInfo(){
	  			if (this.$store.state.loginId == "0") {
					MessageBox.confirm('',{
					  	title: '提示',
					  	message: '请您登陆后再进行查看哦',
					  	confirmButtonText: '登录', 
						cancelButtonText: '暂不登录', 
					  	showCancelButton: true
					}).then(action => {
						this.$router.push('/regLog')
					})
				} else {
		  			if(this.saleStatus == 1){
			  			//this.insureruleAjax()
			  			//this.checkagent();
			  			this.isOrderAjax()
		  			}
		  			else if(this.saleStatus == 0){
		  				MessageBox.confirm('',{
						  	title: '温馨提示',
						  	message: this.unSaleDes,
						  	confirmButtonText: '确定',
						  	showCancelButton: false
						}).then(action => {
							
						})
		  			}
		  		}	
	  		},
	  		checkagent(){
	  			var data={
	  				
				 "token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"agentCode": "10000015", //代理人代码 
					"agentName": "高薇", //代理人名称 
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.prodCode
					}
					}
	  			this.$http.post(this.$store.state.link+'/trd/agent/v1/checkagent', data)
				.then(res =>{
					console.log(JSON.stringify(res.data));
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						
					}else{
						
						console.log(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
	  			
	  		},
	  		insureruleAjax(){
  				var insureruleInfo = {
					"prodCode": this.prodCode,
					"token": this.$store.state.token,
					"userId": this.$store.state.userId
				}
  				console.log(JSON.stringify(insureruleInfo))
	  			this.$http.post(this.$store.state.link+'/trd/agent/v1/insurerule', insureruleInfo)
				.then(res =>{
					console.log(JSON.stringify(res.data));
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						if (res.data.output[0].type=="0") {
							this.isOrderAjax()
						}
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
	  		},
	  		isOrderAjax(){
	  			var isOrderInfo = {
				  	"head": {
					    "channelCode": "qtb_h5",
					    "deptCode": this.cmpCode,
					    "oprCode": this.$store.state.userId,
					    "prodCode": this.prodCode
				  	},
					"token": this.$store.state.token,
					"userId": this.$store.state.userId
				}
//				console.log(isOrderInfo)
				console.log(JSON.stringify(isOrderInfo))
	  			this.$http.post(this.$store.state.link+'/trd/order/v1/checkpkg', isOrderInfo)
				.then(res =>{
				    console.log("1111"+JSON.stringify(res.data));
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						if (res.data.output.orderCount == 0) {
							this.createorderAjax()
						}else if (res.data.output.orderCount == 1) {
							MessageBox.confirm('',{
							  	title: '温馨提示',
							  	message: '你有一笔未完成订单，要前往完善信息吗？',
							  	confirmButtonText: '立即前往',
							  	showCancelButton: true
							}).then(action => {
								if (action == 'confirm') {
									this.orderNo = res.data.output.orderList[0].pkgNo
									this.$router.push('/basicInformation?prodCode='+this.prodCode+'&prodNo='+this.prodNo+'&orderNo='+this.orderNo+'&cmpCode='+this.cmpCode)
								}
							}).catch(err => {
								if (err == 'cancel') {
									this.createorderAjax()
								}
							})
						}else if (res.data.output.orderCount > 1) {
							MessageBox.confirm('',{
							  	title: '温馨提示',
							  	message: '你有多笔未完成订单，要前往我的订单完善信息吗？',
							  	confirmButtonText: '立即前往', 
								cancelButtonText: '取消', 
							  	showCancelButton: true
							}).then(action => {
								this.$router.push('/mylifeOrder')
							}).catch(err => {
								this.createorderAjax()
							})
						}
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
	  		},
	  		createorderAjax(){
	  			var orderNoInfo = {
				  	"head": {
					    "channelCode": "qtb_h5",
					    "deptCode": this.cmpCode,
					    "oprCode": this.$store.state.userId,
					    "prodCode": this.prodCode
				  	},
					"token": this.$store.state.token,
					"userId": this.$store.state.userId
				}
  				console.log(orderNoInfo)
	  			this.$http.post(this.$store.state.link5+'/trd/order/v1/createorder', orderNoInfo)
				.then(res =>{
				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.orderNo = res.data.output
						this.$router.push('/basicInformation?prodCode='+this.prodCode+'&prodNo='+this.prodNo+'&orderNo='+this.orderNo+'&cmpCode='+this.cmpCode)
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
	  		},
	  	},
	  	watch:{
	  		prodNo:function(val){
		    	this.prodNo = val
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
		bottom: 1.06rem;
		left: 0;
		z-index: 2;
		width: 6.9rem;
		padding: 0 0.3rem;
		background: #FFFFFF;
	}
	.inputGrop {
		position: relative;
		height: 0.88rem;
		overflow: hidden;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.popupCon .inputGrop:last-child {
		border: none;
	}
	.inputLabel {
		float: left;
		width: 2.5rem;
		margin-left: 0.1rem;				
		line-height: 0.88rem;
		font-size: 0.32rem;
		color: #333333;
	}
	.sexImg {
		display: inline-block;
		float: left;
		margin-top: 0.2rem;
		width: 0.48rem;
		height: 0.48rem;
		margin-right: 0.06rem;
	}
	.sex label {
		display: inline-block;
		float: left;
	}
	.sex {
		display: inline-block;
		height: 0.88rem;
		margin-right: 0.46rem;
		overflow: hidden;
	}
	.sexM {
		margin-right: 0.46rem;
	}
	.inputText {
		float: left;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
	}
	.inputSpan {
		display: inline-block;
		line-height: 0.88rem;
	}
	.inputSpan2 {
		padding-left: 0.1rem;
	}
	select {
		padding: 0;
		margin: 0;
		padding-right: 0.48rem;
		border: none;
		background: none;
		background: url(/static/upDown.png) no-repeat right center;
		background-size: 0.4rem 0.45rem;
		outline: none;
		appearance: none;
		-webkit-appearance:none;
		-moz-appearance:none;
	}
	.width3 {
		width: 4.3rem;
	}
	.iconBox {
		display: flex;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		width: 100%;
		height: 1.06rem;
		line-height: 1.06rem;
		border-top: solid 0.01rem #C8C7CC;
		background: #FFFFFF;
	}
	.figure {
		flex: 1;
		font-size: 0.36rem;
		color: #222222;		
		text-align: center;
	}
	.figure2 {
		font-size: 0.36rem;
		color: #FFFFFF;
		background: #E7A128;
	}
	.price {
		color: #EB6069;
	}
	.upDownImg {
		width: 0.4rem;
		height: 0.44rem;
		margin-top: 0.2rem;
	}
	.dateInput {
		width: 4.3rem;
	}
	.upDownImg1 {
		position: absolute;
		right: 0;
		top: 0.2rem;
		z-index: -1;
		width: 0.4rem;
		height: 0.44rem;
	}
	.dateB {
		position: absolute;
		right: 0;
		top: 0rem;
		z-index: 1;/*下箭头隐藏变1*/
		width: 0.5rem;
		height: 0.88rem;
		background: #FFFFFF;
	}
	input[type=date]::-webkit-inner-spin-button { 
		visibility: hidden;
	} 
	input[type=date]::-webkit-calendar-picker-indicator {
		width: 0;
		height: 0;
		opacity: 0;
	} 
	input[type=date]::-webkit-clear-button { 
		visibility: hidden;
	} 
	.inputGrop1 {
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputselectP {
		height: 0.68rem;
	}
	.inputLabel1 {
		height: 0.68rem;
		line-height: 0.68rem;
	}
	.inputText1 {
		display: block;
		float: left;
		width: 3.6rem;
		height: 0.68rem;
		font-size: 0.28rem;
		color: #333333;
	}
	.inputWidth {
		width: 4.3rem;
	}
	.inputselect {
		height: 0.68rem;
	}
</style>