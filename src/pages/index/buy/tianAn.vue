<template>
	<div class="popup" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="iconBox">
			<div class="figure figure2" id="tab2" @click="insureruleAjax">
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
		name: 'TianAn',
		props: ['prodNo', 'prodInfo', 'saleStatus', 'unSaleDes', 'cmpCode'],
		data() {
			return {
				prodCode: this.$route.query.prodCode,
				brokerCode: '10000001',
				brokeName: '',
				orderNo: '',
				stoken: ''
			}
		},
		created() {
			if(localStorage.token == "" || localStorage.token == undefined) {} else {
				this.stoken = localStorage.token;
			}
		},
		methods: {
			checkAgent() { //代理人校验
				var data = { //订单查询   订单状态:10-暂存单 20-自核成功 30-已撤单 40-承保成功 60-犹豫期退保 01-自核交易失败 02-自核不通过 03-人工核保中 04-人工核保成功 05-人核未进核心 06-人核失败 07-人核失败并发送通知书 08-收费中 09-收费成功 11-收费失败 12-收费交易失败 13-承保失败 14-承保交易失败 15-保单生效已回执状态 16-退保 17-已删除 18-承保收费成功 19-拒保 21-其他 ,
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"agentCode": "10000015", //代理人代码 
					"agentName": "高薇", //代理人名称 
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.cmpCode,
						"oprCode": this.$route.query.userId,
						"prodCode": this.prodCode
					}
				}
				Indicator.open();
				console.log("===aa" + JSON.stringify(data))
				this.$http.post(this.$store.state.link + '/trd/agent/v1/checkagent', data)
					.then(res => {
						Indicator.close();
						console.log("===" + JSON.stringify(res.data))
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.tianAnisOrderAjax()
							//代理人校验成功
						} else {
							Toast(res.data.desc);
							//代理人校验成功（后期不校验）
							this.tianAnisOrderAjax()
						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					})
			},
			insureruleAjax() { //规则
				if (this.$store.state.loginId == "0") {
					MessageBox.confirm('',{
					  	title: '提示',
					  	message: '请您登陆后再进行查看哦',
					  	confirmButtonText: '登录', 
						cancelButtonText: '暂不登录', 
					  	showCancelButton: true
					}).then(action => {
						this.$router.push('/logNew')
					})
				} else {
					if(this.saleStatus == 1) {
						//this.checkAgent(); //校验
						this.tianAnisOrderAjax() //规则
					} else if(this.saleStatus == 0) {
						MessageBox.confirm('', {
							title: '温馨提示',
							message: this.unSaleDes,
							confirmButtonText: '确定',
							showCancelButton: false
						}).then(action => {
	
						})
					}
				}
				//订单号
				//				var insureruleInfo = {
				//					"prodCode": this.prodCode
				//				}
				//				//	  			this.$http.post(this.$store.state.link+'/trd/agent/v1/insurerule', insureruleInfo)
				//				this.$http.post('http://192.168.171.12:9009/agent/v1/insurerule', insureruleInfo)
				//					.then(res => {
				//						console.log(res.data);
				//						var dataCode = res.data.code;
				//						if(dataCode == "SYS_S_000") {
				//							//						if (res.data.output[0].type=="0") {
				//							//							
				//							//						}
				//							//						this.tianAnAjax()
				//						} else {
				//							Toast(res.data.desc);
				//						}
				//					}, res => {
				//						console.log(res.data);
				//					})
			},
			tianAnAjax() {
				var brokerInfo = {
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.cmpCode,
						"oprCode": this.$route.query.userId,
						"prodCode": this.prodCode
					},
					"agentCode": this.brokerCode,
					"agentName": this.brokerName
				}
				console.log(orderNoInfo)
				//	  			this.$http.post(this.$store.state.link+'/trd/agent/v1/checkagent', brokerInfo)
				this.$http.post(this.$store.state.link + '/agent/v1/checkagent', brokerInfo)
					.then(res => {
						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.tianAnisOrderAjax()
						} else {
							
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			tianAnisOrderAjax() {
				var tianAnisOrderInfo = {
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.cmpCode,
						"oprCode": this.$route.query.userId,
						"prodCode": this.prodCode
					}
				}
				//				var tianAnisOrderInfo = {
				//					"token": this.$store.state.token,
				//					"userId": this.$store.state.userId,
				//					"head": {
				//						"channelCode": "qtb_h5",
				//						"deptCode": "000034",
				//						"oprCode": "275218",
				//						"oprStep": "",
				//						"prodCode": "P000034001001"
				//					}
				//				}

				console.log(tianAnisOrderInfo)
				//	  			this.$http.post(this.$store.state.link+'/trd/order/v1/checkpkg', tianAnisOrderInfo)
				this.$http.post(this.$store.state.link + '/trd/order/v1/checkpkg', tianAnisOrderInfo)
					.then(res => {
						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							if(res.data.output.orderCount == 0) {
								this.tianAncreateorderAjax()
							} else if(res.data.output.orderCount == 1) {
								MessageBox.confirm('', {
									title: '温馨提示',
									message: '你有一笔未完成订单，点击立即前往完善信息，点击取消生成新订单',
									confirmButtonText: '立即前往',
									showCancelButton: true
								}).then(action => {
									if(action == 'confirm') {
										this.orderNo = res.data.output.orderList[0].pkgNo
										this.$router.push('/intoInfo?prodCode=' + this.prodCode + '&prodNo=' + this.prodNo + '&orderNo=' + this.orderNo + '&cmpCode=' + this.cmpCode + '&userId=' + this.$route.query.userId)
									}
								}).catch(err => {
									if(err == 'cancel') {
										this.tianAncreateorderAjax()
									}
								})
							} else if(res.data.output.orderCount > 1) {
								MessageBox.confirm('', {
									title: '温馨提示',
									message: '你有多笔未完成订单，要前往我的订单完善信息吗？',
									confirmButtonText: '立即前往',
									cancelButtonText: '取消',
									showCancelButton: true
								}).then(action => {
									this.$router.push('/mylifeOrder?userId=' + this.$route.query.userId)
								}).catch(err => {
									this.tianAncreateorderAjax()
								})
							}
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			tianAncreateorderAjax() {
				var tianAnorderNoInfo = {
					"token": this.stoken,
					"userId": this.$route.query.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.cmpCode,
						"oprCode": this.$route.query.userId,
						"prodCode": this.prodCode
					}
				}
				this.$http.post(this.$store.state.link + '/trd/order/v1/createorder', tianAnorderNoInfo)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.orderNo = res.data.output;
							this.$router.push('/intoInfo?prodCode=' + this.prodCode + '&prodNo=' + this.prodNo+ '&up=1&orderNo=' + this.orderNo + '&cmpCode=' + this.cmpCode + '&userId=' + this.$route.query.userId + '&token=' + this.stoken + '&prodName=' + this.prodInfo.prodName)
						} else {
							Toast(res.data.desc);
						}
					}, res => {
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
	
	input,
	button {
		background: none;
		border: none;
	}
	
	input,
	button {
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
	
	textarea::-webkit-input-placeholder,
	input::-webkit-input-placeholder {
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
		background: rgba(0, 0, 0, 0.2);
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
		color: #666666;
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
		border: none;
		background: none;
		outline: none;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
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
		z-index: -1;
		/*下箭头隐藏变1*/
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
</style>