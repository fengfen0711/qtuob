<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="twoCon">
			<p class="title_twoCon clearFloat">
				<label class="title_twoCon2 left">身故受益人信息</label>
				<span class="title_twoCon1 left">最多可添加3个身故受益人</span>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">身故受益人类型</label>
				<select class="inputText inputWidth left" v-model="benType" @change="beneficiaryType">
					<option value="N">法定</option>
					<option value="Y">指定</option>
				</select>
			</p>
		</div>
		<BenChild v-show="!policyHolderShow" @child_saya1="listenToMyChild1" @child_saya="listenToMyChild" ref="getBen" v-for="(item,index) in addBen" :key="index" @deletId="deletBen" :item="item" :index="index" :nexusList="nexusList" :couponList="couponList" :nationalityarr="nationalityarr" :addData="addData" :addIndex="addIndex"></BenChild>
		<p v-if="!addFlag" class="pushBox">  
			<span @click="addBeneficiary('1')" class="pushBtn">添加受益人</span>
		</p>
		<p class="btnBox">
			<span class="btn btn1" @click="toGoInsured">上一步</span>
			<span class="btn" @click="toGoNext">下一步</span>
		</p>
	</div>
</template>

<script>
	import BenChild from './benChild.vue'
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "ben",
		data() {
			return {
				addIndex: false,
				addNumber: 0, //受益人的下标
				policyHolderShow: true, //受益人组件
				benType: 'N', //身故受益人类型
				addFlag: true, //添加受益人按钮
				
				addBen: [{
					"isD": false,
					"id": 0
				}],
				nexusList: [], //关系数组
				couponList: [], //证件类型数组
				nationalityarr: [], //国籍数组
				addData1: {},//回显数据
				nextFlag: false,
				allData: [],
				addData:[],
//				agentCode:"" ,//代理人代码
//				agentDeptCode:"",//代理人名称
			}
		},
		created() {
			this.relationship(); //关系
			this.init();
			this.initinto();
			
		},
		updated() {

		},
		methods: {
			listenToMyChild(...data) {
				console.log("data"+JSON.stringify(data))
				this.allData.push(data[0])
			},
			listenToMyChild1(...data) {
				this.nextFlag = data[0];
			},
			initinto(){
				var data = {
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode

					},
					"opt": "APPL,MAIN,BNF,INSRNT",
					"pkgNo": this.$route.query.orderNo, //订单号
				}
				this.$http.post(this.$store.state.link5 + '/trd/order/v1/queryorder', data)
					.then(res => {
					console.log(JSON.stringify(res.data));
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.addData1 = res.data.output;
							
							if(res.data.output.bnfResp.length > 0) {
								
								this.addData = res.data.output.bnfResp;
								this.policyHolderShow =false;
							} else {
								this.addData = [];
							}
							if(res.data.output.bnfResp.length > 0) {
								this.policyHolderShow = false;
								if(res.data.output.bnfResp.length > 2) {
									this.addFlag = true;

								} else {
									this.addFlag = false;
								}
							}
							if(res.data.output.mainResp.lowFlag == "A"){
								this.benType = "N";
								this.policyHolderShow =true;
								this.addFlag = true;
							} else {
								this.benType = "Y";
								this.policyHolderShow =false;
								this.addFlag = false;
							}
							for(var i = 1; i < res.data.output.bnfResp.length; i++) {
								this.addBeneficiary('2');
							}
							console.log(this.addBen)
							

						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			init() {
				this.beneficiaryType();
			},
			deletBen(...data) {
				for(var i = 0; i < this.addBen.length; i++) {
					if(this.addBen[i].id == data[0]) {
						this.addBen.splice(i, 1);
					}
				}
				if(this.addBen.length < 3) {
					this.addFlag = false;
				}
			},
			addBeneficiary(index) {
				
				if(index==1){
					
					this.addIndex = true;
				}
				this.addNumber++;
				var name = "";
				if(this.addBen.length == 1) {
					name = "二"
				} else if(this.addBen.length == 2) {
					name = "三"
				}
				this.addBen.push({
					"isD": true,
					"id": this.addNumber,
					"name": name
				});
				if(this.addBen.length == 3) {
					this.addFlag = true;
				}
			},
			beneficiaryType() {
				if(this.benType == "N") { //是法定
					this.policyHolderShow = true;
					this.addFlag = true;
				} else { //是指定
					this.policyHolderShow = false; //显示组件
					if(this.addBen.length <= 3) { //判断是否显示附加险
						this.addFlag = false;
					} else {
						this.addFlag = true;
					}
					if(this.addBen.length == 0) {
						this.addBen.push({
							"isD": false,
							"id": this.addNumber,
							"name": "一"
						})
					}
				}
			},
			relationship() {
				var data = {
					"deptCode": "000300"
				}
				this.$http.post('http://192.168.171.12:9005' + '/base/querybasedic', data)
					.then(res => {
						var dataCode = res.data.code;
						console.log(res.data);
						if(dataCode == "SYS_S_000") {
							// 关系
							this.nexusList = res.data.output.relatoInsured.codeList;
							console.log(this.nexusList)
							// 证件类型
							this.couponList = res.data.output.certfType.codeList;
							// 国籍
							this.nationalityarr = res.data.output.nationality.codeList;
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			toGoInsured() {
				window.history.go(-1)
			},
			toGoNext() {

				//法定受益人
				if(this.policyHolderShow){
					var addMainData = {
						"agentCode": this.addData1.mainResp.agentCode, //代理人代码 
						"agentName": this.addData1.mainResp.agentName, //代理人名称 
						"amnt": this.addData1.mainResp.amnt, //保额
						"deptCode": this.addData1.mainResp.deptCode, //机构代码   
//						"deptName": this.addData1.mainResp.deptName, //机构名称
						"agentDeptCode": this.addData1.mainResp.agentDeptCode, //代理机构
//						"expireProcessMode": this.addData1.mainResp.expireProcessMode, //到期处理方式
//						"firstPremium": this.addData1.mainResp.firstPremium, //首期保费 
//						"flightNo": this.addData1.mainResp.flightNo, //航班号 
//						"initialPremamt": this.addData1.mainResp.initialPremamt, //首次缴费金额 
//						"issueTime": this.addData1.mainResp.issueTime, //签单日期 
						"lowFlag": "A", //法定受益人标识 A-是;B-否 
//						"oprCode": this.addData1.mainResp.oprCode, //录单员代码 
//						"oprName": this.addData1.mainResp.oprName, //录单员姓名 
						"plcyEffcTime": this.addData1.mainResp.plcyEffcTime, //保单生效时间 
						"plcyInvalidTime": this.addData1.mainResp.plcyInvalidTime, //保单失效时间 
//						"plcySts": this.addData1.mainResp.plcySts, //保单状态 
//						"autoPayFlag": this.addData1.mainResp.autoPayFlag,
						"prem": this.addData1.mainResp.prem, //保费 
						"prodCode": this.addData1.mainResp.prodCode, //产品编码 
						"prodNo": this.addData1.mainResp.prodNo, //产品代码 
						//"prodName": this.$route.query.prodName, //产品名称 
						"prodName": this.addData1.mainResp.prodName, //产品名称 
//						"productPeriod": this.addData1.mainResp.productPeriod, //产品期限 
//						"productPeriodFlag": this.addData1.mainResp.productPeriodFlag, //产品期限标志
//						"relaApplNo": this.addData1.mainResp.relaApplNo, //万能险关联投保单号
						"sumAmnt": this.addData1.mainResp.sumAmnt, //保额合计 ,
						"sumPrem": this.addData1.mainResp.sumPrem, //保费合计 
//						"withdrawalDate": this.addData1.mainResp.withdrawalDate, //撤单申请日期 
//						"withdrawalTime": this.addData1.mainResp.withdrawalTime, //撤单申请时间
//						"applName": this.addData1.applntResp.applName,
						"insrntName": this.addData1.insrntResp.insrntName,
						"userId": this.$store.state.userId
					}
					var data = {
						"token": this.$store.state.token,
						"userId": this.$store.state.userId,
						"mark": "UC",
						"head": {
							"channelCode": "qtb_h5",
							"deptCode": this.$route.query.cmpCode,
							"oprCode": this.$store.state.userId,
							"prodCode": this.$route.query.prodCode
						},
						"opt": "BNF",
						"pkgNo": this.$route.query.orderNo, //订单号
						"bnfReq": [],
						"mainReq": addMainData
					}
					Indicator.open();
					this.$http.post(this.$store.state.link5 + '/trd/order/v1/saveorder', data)
						.then(res => {
							Indicator.close();
							console.log(res.data)
							var dataCode = res.data.code;
							if(dataCode == "SYS_S_000") {
								var relationToInsured = '';
								if(this.addData1.applntResp.relationToInsured == "00") {
									relationToInsured = "Y";
								} else {
									relationToInsured = "N";
								}
								if(this.$route.query.statuFlag=="Y"){
								this.$router.push('/healthTold1?prodCode=' + this.$route.query.prodCode + "&relationToInsured=" + relationToInsured + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode  + "&prodNo=" + this.$route.query.prodNo+"&one="+"1")	
								}else{
									this.$router.push('/healthTold?prodCode=' + this.$route.query.prodCode + "&relationToInsured=" + relationToInsured + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode  + "&prodNo=" + this.$route.query.prodNo)
								}
							
							} else {
								Toast(res.data.desc);
							}
						}, res => {  
							Indicator.close();
							console.log(res.data);
						})
				}else{
					this.allData = [];
					for(var i = 0; i < this.addBen.length; i++) {
						this.$refs.getBen[i].childSay()
					}
					var Proportion = 0;
					var ProportionArray = [];
					for(var i=0;i < this.allData.length; i++){
						if(ProportionArray.length == 0) {
							ProportionArray.push(this.allData[i].bnfSeq)
						}else{
							var flag = true;
							for(var z = 0; z < ProportionArray.length; z++) {
								if(ProportionArray[z] == this.allData[i].bnfSeq) {} else {
									flag = false;
								}
							}
							if(!flag) {
								ProportionArray.push(this.allData[i].bnfSeq)
							}
						}
					}
					var ProportionFlag = true
					for(var i = 0; i < ProportionArray.length; i++) {
						var ProportionMoney = 0
						for(var k = 0; k < this.allData.length; k++) {
							if(ProportionArray[i] == this.allData[k].bnfSeq) {
								ProportionMoney += parseInt(this.allData[k].bnfShare);
							}
						}
						if(ProportionMoney != 100) {
							ProportionFlag = false;
						}
					}
					var allcertfCode = [];
					//console.log(this.allData.length)
					if(this.allData.length > 1) {
						console.log("=11==" + JSON.stringify(this.allData))
						for(var i = 0; i < this.allData.length; i++) {
							if(allcertfCode.length == 0) {
								allcertfCode.push(this.allData[i].certfCode)
							} else {
								for(var z = 0; z < allcertfCode.length; z++) {
									if(allcertfCode[z] == this.allData[i].certfCode) {
										Toast("受益人不得重复")
										return;
									}
								}
							}
						}
					}
					if(this.nextFlag) { //子组件return
						return;
					}else if(!ProportionFlag) {
						Toast("受益人受益比例之和应为100%，请正确填写")
						return;
					}
					var addMainData = {
						"agentCode": this.addData1.mainResp.agentCode, //代理人代码 
//						"agentCode": "test", 
						"agentName": this.addData1.mainResp.agentName, //代理人名称 
						"amnt": this.addData1.mainResp.amnt, //保额
						"deptCode": this.addData1.mainResp.deptCode, //机构代码   
//						"deptName": this.addData1.mainResp.deptName, //机构名称
						"agentDeptCode": this.addData1.mainResp.agentDeptCode, //代理机构
//						"expireProcessMode": this.addData1.mainResp.expireProcessMode, //到期处理方式
//						"firstPremium": this.addData1.mainResp.firstPremium, //首期保费 
//						"flightNo": this.addData1.mainResp.flightNo, //航班号 
//						"initialPremamt": this.addData1.mainResp.initialPremamt, //首次缴费金额 
//						"issueTime": this.addData1.mainResp.issueTime, //签单日期 
						"lowFlag": "B", //法定受益人标识 A-是;B-否 
//						"oprCode": this.addData1.mainResp.oprCode, //录单员代码 
//						"oprName": this.addData1.mainResp.oprName, //录单员姓名 
						"plcyEffcTime": this.addData1.mainResp.plcyEffcTime, //保单生效时间 
						"plcyInvalidTime": this.addData1.mainResp.plcyInvalidTime, //保单失效时间 
//						"plcySts": this.addData1.mainResp.plcySts, //保单状态 
//						"autoPayFlag": this.addData1.mainResp.autoPayFlag,
						"prem": this.addData1.mainResp.prem, //保费 
						"prodCode": this.addData1.mainResp.prodCode, //产品编码 
						"prodNo": this.addData1.mainResp.prodNo, //产品代码 
						//						"prodName": this.$route.query.prodName, //产品名称 
						"prodName": this.addData1.mainResp.prodName, //产品名称 
//						"productPeriod": this.addData1.mainResp.productPeriod, //产品期限 
//						"productPeriodFlag": this.addData1.mainResp.productPeriodFlag, //产品期限标志
//						"relaApplNo": this.addData1.mainResp.relaApplNo, //万能险关联投保单号
						"sumAmnt": this.addData1.mainResp.sumAmnt, //保额合计 ,
						"sumPrem": this.addData1.mainResp.sumPrem, //保费合计 
//						"withdrawalDate": this.addData1.mainResp.withdrawalDate, //撤单申请日期 
//						"withdrawalTime": this.addData1.mainResp.withdrawalTime, //撤单申请时间
//						"applName": this.addData1.applntResp.applName,
						"insrntName": this.addData1.insrntResp.insrntName,
						"userId": this.$store.state.userId
						    
					}
					var data = {
						"token": this.$store.state.token,
						"userId": this.$store.state.userId,
						"mark": "UC",
						"head": {
							"channelCode": "qtb_h5",
							"deptCode": this.$route.query.cmpCode,
							"oprCode": this.$store.state.userId,
							"prodCode": this.$route.query.prodCode
						},
						"opt": "MAIN,BNF",
						"pkgNo": this.$route.query.orderNo, //订单号
						"bnfReq": this.allData,
						"mainReq": addMainData
					}
					console.log("data===" + JSON.stringify(data))
					Indicator.open();
					this.$http.post(this.$store.state.link5 + '/trd/order/v1/saveorder', data)
						.then(res => {
							Indicator.close();
							console.log(res.data);
							var dataCode = res.data.code;
							if(dataCode == "SYS_S_000") {
								var relationToInsured = '';
								if(this.addData1.applntResp.relationToInsured == "00") {
									relationToInsured = "Y";
								} else {
									relationToInsured = "N";
								}
								this.$router.push('/healthTold?prodCode=' + this.$route.query.prodCode + "&relationToInsured=" + relationToInsured + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)

								//								if(this.addData1.applntResp.relationToInsured == "00") {
								//									this.$router.push('/insuranceadvice?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&code=" + "1" + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
								//								} else {
								//									this.$router.push('/insuranceadvice1?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
								//								}
							} else {
								Toast(res.data.desc);
							}
						}, res => {
							Indicator.close();
							console.log(res.data);
						})
				}
			}
		},
		components: {
			BenChild: BenChild
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
	
	select {
		padding-right: 0.48rem;
		border: none;
		background: none;
		background: url(/static/upDown.png) no-repeat right center;
		background-size: 0.4rem 0.45rem;
		outline: none;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}
	
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	
	.one {
		position: absolute;
		width: 100%;
		min-height: 100%;
		background: #F3F3F3;
	}
	
	.twoCon {
		margin-top: 0.4rem;
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
	}
	
	.one .twoCon:first-child {
		margin-top: 0;
	}
	
	.title_twoCon {
		height: 0.84rem;
		line-height: 0.84rem;
		padding-top: 0.28rem;
		font-size: 0.32rem;
		font-weight: bold;
		color: #222222;
	}
	
	.title_twoCon1 {
		padding: 0;
		margin-left: 0.2rem;
		font-size: 0.28rem;
		color: #EB7760;
	}
	
	.inputGrop {
		position: relative;
		height: 0.88rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	
	.inputLabel {
		display: block;
		width: 3.22rem;
		height: 0.88rem;
		line-height: 0.88rem;
		color: #555555;
	}
	
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
	}
	
	.inputWidth {
		width: 3.48rem;
	}
	
	.twoCon .inputGrop:last-child {
		border-bottom: none;
	}
	
	.pushBox {
		margin: 0.4rem 0;
	}
	
	.pushBtn {
		display: block;
		width: 100%rem;
		height: 0.88rem;
		line-height: 0.88rem;
		margin: 0 auto;
		font-size: 0.28rem;
		font-weight: bold;
		color: #C9141E;
		background: #FFFFFF;
		border-radius: 0.16rem;
		text-align: center;
	}
	
	.btnBox {
		padding-top: 0.92rem;
		padding-bottom: 1.16rem;
		text-align: center;
	}
	
	.btn {
		display: inline-block;
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.32rem;
		border: 0.02rem solid #C9141E;
		border-radius: 0.88rem;
		background: #C9141E;
		color: #FFFFFF;
		text-align: center;
	}
	
	.btn1 {
		background: none;
		border: 0.02rem solid #C9141E;
		color: #C9141E;
		margin-right: 0.3rem;
	}
</style>