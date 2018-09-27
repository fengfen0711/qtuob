<template>
	<div class="one" :class="{opa0:!hui}" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="twoCon">
			<div class="twoCon2" :class="{borderNone:policyHolderShow}">
				<p v-if="hui" class="title_twoCon">
					<label class="titleLable_twoCon">受益人类型</label>
				</p>
				<p class="inputGrop clearFloat">
					<img src="/static/muhaha/Noben.png" class="btnImg" v-show="!policyHolderShow" @click="policyHolderShowHide()" />
					<img src="/static/muhaha/ben.png" class="btnImg" v-show="policyHolderShow" @click="policyHolderShowHide()" />
					<label class="inputText inputSpan left">法定受益人</label>
				</p>
				<p class="inputGrop clearFloat">
					<img src="/static/muhaha/Noben.png" class="btnImg" v-show="policyHolderShow" @click="policyHolderShowHide()" />
					<img src="/static/muhaha/ben.png" class="btnImg" v-show="!policyHolderShow" @click="policyHolderShowHide()" />
					<label class="inputText inputSpan left">指定受益人</label>
				</p>
			</div>
		</div>
		<Beneficiary ref="getBen" @child_saya1="listenToMyChild1" @child_saya="listenToMyChild" v-for="(item,index) in addBen" :key="index" @deletId="deletBen" v-show="!policyHolderShow" v-bind:peopledetail="item,index,nexusList,couponList,benefitArr,nationalityarr,addData,addIndex"></Beneficiary>
		<p v-if="!addFlag" class="pushBox">
			<span @click="addBen1('1')" class="pushBtn">添加受益人</span>
		</p>
		<p v-if="hui" class="btnBox clearFloat" :class="{btnBox1:policyHolderShow}">
			<span class="btn btn1 left" @click="handleClickUp">上一步</span>
			<span class="btn left" @click="handleClickNext">下一步</span>
		</p>
	</div>
</template>

<script>
	import Beneficiary from './components/taBeneficiary.vue'
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "ben",
		props: ['backview'],
		data() {
			return {
				addIndex: true,
				firstIndex: 1,
				nationalityarr: [],
				addBen: [{
					"isD": false,
					"id": 0
				}],
				nexusList: [],
				addFlag: true,
				policyHolderShow: true,
				cardType: '',
				couponList: [],
				policyHolderName: '',
				IDnum: '',
				termValidityDateShow: true,
				termValidityDate: '',
				birthDate: '',
				phone: '',
				email: '',
				add: '',
				reHigh: '',
				reWeight: '',
				provinceType: '',
				provinceList: [],
				cityType: '',
				cityList: [],
				countyType: '',
				countyList: [],
				bigType: '',
				bigList: [],
				middleType: '',
				middleList: [],
				littleType: '',
				littleList: [],
				addNumber: 0,
				benefitArr: [],
				allData: [],
				nextFlag: false,
				addData: [],
				addData1: {},
				hui: true
			}
		},
		components: {
			Beneficiary: Beneficiary
		},
		created() {
			if(this.backview == "hui") {
				this.hui = false;
			}
			var myDate = new Date();
			var day = myDate.getDate();

			if(myDate.getMonth() < 10) {
				var month = "0" + (myDate.getMonth() + 1);
			}
			if(myDate.getDate() < 10) {
				day = "0" + myDate.getDate();
			}
			var datew = myDate.getFullYear() + "-" + month + "-" + day;
			var datew = datew.toString();
			if(this.termValidityDateShow == true) {
				this.termValidityDate = datew;
			}
			this.birthDate = datew;
			this.relationship(); //关系
			this.idCardType();
//			this.benefit();
			this.nationalitySelect();
			this.init();
		},
		methods: {
			init() {
				var data = {
					"token": this.$route.query.token,
					"userId": this.$route.query.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$route.query.userId,
						"prodCode": this.$route.query.prodCode

					},
					"opt": "APPL,MAIN,BNF,INSRNT",
					"pkgNo": this.$route.query.orderNo, //订单号
				}
				this.$http.post(this.$store.state.link + '/trd/order/v1/queryorder', data)
					.then(res => {
						//						console.log("===" + JSON.stringify(res.data));
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.addData1 = res.data.output;
							if(res.data.output.bnfResp.length > 0) {
								this.addData = res.data.output.bnfResp;
							} else {
								this.addData = [];
							}

							if(res.data.output.bnfResp.length > 0) {
								this.policyHolderShow = false;
								this.addIndex = false;
								if(res.data.output.bnfResp.length > 5) {
									this.addFlag = true;
								} else {
									this.addFlag = false;
								}
							}
							for(var i = 1; i < res.data.output.bnfResp.length; i++) {
								this.addBen1('2');
							}

							//							if(this.addBen.length == 6) {
							//								this.addFlag = true;
							//							}
							//							this.addBen1()
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			nationalitySelect() {

				var data = { //天安人寿
					"orgCode": "000034",
					"type": "6"
				}

				this.$http.post(this.$store.state.link + '/dic/findDicTotalByOrgCode', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.nationalityarr = res.data.output;
							console.log(res.data.output)
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			listenToMyChild(...aaa) {

				this.allData.push(aaa[0])
			},
			listenToMyChild1(...aaa) {
				this.nextFlag = aaa[0];
			},
			deletBen(...data) {
				for(var i = 0; i < this.addBen.length; i++) {
					if(this.addBen[i].id == data[0]) {
						this.addBen.splice(i, 1);
					}
				}
				if(this.addBen.length < 6) {
					this.addFlag = false;
				}
			},
			addBen1(index) {
				if(index == 1) {
					this.addIndex = true;
				}

				this.addNumber++;
				this.addBen.push({
					"isD": true,
					"id": this.addNumber
				})
				if(this.addBen.length == 3) {
					this.addFlag = true;
				}
				console.log(JSON.stringify(this.addBen))
			},
			benefit() {
				var data = { //天安人寿
					"orgCode": "QTBSYBLTA",
					"type": "1"
				}

				this.$http.post(this.$store.state.link + '/dic/findDicTotalByOrgCode', data)
					.then(res => {
						//						console.log("=====asdasdas===" + JSON.stringify(res.data))
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							console.log(res.data.output)
							this.benefitArr = res.data.output;
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			idCardType() {
				var data = { //天安人寿
					"orgCode": "000034",
					"type": "5"
				}

				this.$http.post(this.$store.state.link + '/dic/findDicTotalByOrgCode', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.couponList = res.data.output;
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			relationship() {
				var data = {
					"type": "C"
				}

				this.$http.post(this.$store.state.link + '/dic/findCustomerTypeForTianAn', data)
				.then(res => {
					console.log(res.data)
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.nexusList = res.data.output;
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			pro() {
				var provinceinfo = {
					"": ""
				}
				this.$http.post(this.$store.state.link + '/dic/findTblProvince', provinceinfo)
					.then(res => {
						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.provinceList = res.data.output
							this.provinceType = this.provinceList[0].pkProvinceId;
							this.city()
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			city() {
				var cityinfo = {
					"dicReq": this.provinceType
				}
				this.$http.post(this.$store.state.link + '/dic/findCityId', cityinfo)
					.then(res => {
						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.cityList = res.data.output
							this.cityType = this.cityList[0].pkCityId;
							this.coun()
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			coun() {
				var countyinfo = {
					"dicReq": this.cityType
				}
				console.log(countyinfo)
				this.$http.post(this.$store.state.link + '/dic/findCountyId', countyinfo)
					.then(res => {
						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.countyList = res.data.output
							this.countyType = this.countyList[0].pkCountyId;
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			big() {
				var biginfo = {
					"": ""
				}
				this.$http.post(this.$store.state.link + '/dic/findOccTp', biginfo)
					.then(res => {
						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.bigList = res.data.output
							this.bigType = this.bigList[0].pkOccTypeId;
							this.middle()
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			middle() {
				var middleinfo = {
					"dicReq": this.bigType
				}
				this.$http.post(this.$store.state.link + '/dic/findOccCatByTypeId', middleinfo)
					.then(res => {
						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.middleList = res.data.output
							this.middleType = this.middleList[0].pkOccCatId;
							this.little()
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			little() {
				var littleinfo = {
					"dicReq": this.middleType
				}
				this.$http.post(this.$store.state.link + '/dic/findOccDtByCatId', littleinfo)
					.then(res => {
						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.littleList = res.data.output
							this.littleType = this.littleList[0].pkOccDetailId;
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			policyHolderShowHide(index) {
				this.policyHolderShow = !this.policyHolderShow;
				if(this.addBen.length == 6) {
					this.addFlag = true;
				} else {
					if(this.policyHolderShow) {
						this.addFlag = true;
					} else {
						this.addFlag = false;
					}
				}

			},
			dateSel() {
				this.termValidityDateShow = false
				this.termValidityDate = ""
			},
			termValidityDateSel() {
				this.termValidityDateShow = true
			},
			handleClickUp() {
				this.$router.push('/recognizee');
			},
			handleClickNext() {
				this.$router.push('/questionnaire');
//				if(this.policyHolderShow) {
//					//法定
//					var data = {
//						"token": this.$route.query.token,
//						"userId": this.$route.query.userId,
//						"mark": "UC",
//						"head": {
//							"channelCode": "qtb_h5",
//							"deptCode": this.$route.query.cmpCode,
//							"oprCode": this.$route.query.userId,
//							"prodCode": this.$route.query.prodCode
//						},
//						"opt": "BNF",
//						"pkgNo": this.$route.query.orderNo, //订单号
//						"bnfReq": []
//					}
//					//					console.log("data1===" + JSON.stringify(data))
//					Indicator.open();
//					this.$http.post(this.$store.state.link + '/trd/order/v1/saveorder', data)
//						.then(res => {
//							Indicator.close();
//							//							console.log("data2===" + JSON.stringify(res.data))
//							var dataCode = res.data.code;
//							if(dataCode == "SYS_S_000") {
//								if(this.addData1.applntResp.relationToInsured == "00") {
//									this.$router.push('/insuranceadvice?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&code=" + "1" + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
//								} else {
//									this.$router.push('/insuranceadvice1?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
//								}
//							} else {
//								Toast(res.data.desc);
//							}
//						}, res => {
//							Indicator.close();
//							console.log(res.data);
//						})
//
//				} else {
//					//指定
//					this.allData = [];
//					for(var i = 0; i < this.addBen.length; i++) {
//						this.$refs.getBen[i].childSay()
//					}
//					//					console.log("===22===" + JSON.stringify(this.allData))
//					var Proportion = 0;
//					var ProportionArray = [];
//					for(var i = 0; i < this.allData.length; i++) {
//						if(ProportionArray.length == 0) {
//							ProportionArray.push(this.allData[i].bnfSeq)
//						} else {
//							var flag = true;
//							for(var z = 0; z < ProportionArray.length; z++) {
//								if(ProportionArray[z] == this.allData[i].bnfSeq) {} else {
//									flag = false;
//								}
//							}
//							if(!flag) {
//								ProportionArray.push(this.allData[i].bnfSeq)
//							}
//						}
//					}
//					var ProportionFlag = true
//					for(var i = 0; i < ProportionArray.length; i++) {
//						var ProportionMoney = 0
//						for(var k = 0; k < this.allData.length; k++) {
//							if(ProportionArray[i] == this.allData[k].bnfSeq) {
//								ProportionMoney += parseInt(this.allData[k].bnfShare);
//							}
//						}
//						if(ProportionMoney != 100) {
//							ProportionFlag = false;
//						}
//					}
//					
//					var allcertfCode = [];
//					console.log(this.allData.length)
//					if(this.allData.length > 1) {
//						console.log("=11==" + JSON.stringify(this.allData))
//						for(var i = 0; i < this.allData.length; i++) {
//							if(allcertfCode.length == 0) {
//								allcertfCode.push(this.allData[i].certfCode)
//							} else {
//								for(var z = 0; z < allcertfCode.length; z++) {
//									if(allcertfCode[z] == this.allData[i].certfCode) {
//										Toast("受益人不得重复")
//										return;
//									}
//								}
//							}
//						}
//					}
//					if(this.nextFlag) { //子组件return
//						return;
//					}else if(!ProportionFlag) {
//						Toast("请检查同一顺序下的受益比例之和是否等于100")
//						return;
//					}
//					//					if(Proportion != 100) {
//					//						Toast("受益人比例之和不等于100%")
//					//						return;
//					//					}
//					var addMainData = {
//						"agentCode": this.addData1.mainResp.agentCode, //代理人代码 
//						"agentName": this.addData1.mainResp.agentName, //代理人名称 
//						"amnt": this.addData1.mainResp.amnt, //保额
//						"deptCode": this.addData1.mainResp.deptCode, //机构代码   
//						"deptName": this.addData1.mainResp.deptName, //机构名称
//						"agentDeptCode": this.addData1.mainResp.agentDeptCode, //代理机构
//						"expireProcessMode": this.addData1.mainResp.expireProcessMode, //到期处理方式
//						"firstPremium": this.addData1.mainResp.firstPremium, //首期保费 
//						"flightNo": this.addData1.mainResp.flightNo, //航班号 
//						"initialPremamt": this.addData1.mainResp.initialPremamt, //首次缴费金额 
//						"issueTime": this.addData1.mainResp.issueTime, //签单日期 
//						"lowFlag": "B", //法定受益人标识 A-是;B-否 
//						"oprCode": this.addData1.mainResp.oprCode, //录单员代码 
//						"oprName": this.addData1.mainResp.oprName, //录单员姓名 
//						"plcyEffcTime": this.addData1.mainResp.plcyEffcTime, //保单生效时间 
//						"plcyInvalidTime": this.addData1.mainResp.plcyInvalidTime, //保单失效时间 
//						"plcySts": this.addData1.mainResp.plcySts, //保单状态 
//						"autoPayFlag": this.addData1.mainResp.autoPayFlag,
//						"prem": this.addData1.mainResp.prem, //保费 
//						"prodCode": this.addData1.mainResp.prodCode, //产品编码 
//						"prodNo": this.addData1.mainResp.prodNo, //产品代码 
//						//						"prodName": this.$route.query.prodName, //产品名称 
//						"prodName": this.addData1.mainResp.prodName, //产品名称 
//						"productPeriod": this.addData1.mainResp.productPeriod, //产品期限 
//						"productPeriodFlag": this.addData1.mainResp.productPeriodFlag, //产品期限标志
//						"relaApplNo": this.addData1.mainResp.relaApplNo, //万能险关联投保单号
//						"sumAmnt": this.addData1.mainResp.sumAmnt, //保额合计 ,
//						"sumPrem": this.addData1.mainResp.sumPrem, //保费合计 
//						"withdrawalDate": this.addData1.mainResp.withdrawalDate, //撤单申请日期 
//						"withdrawalTime": this.addData1.mainResp.withdrawalTime, //撤单申请时间
//						"applName": this.addData1.applntResp.applName,
//						"insrntName": this.addData1.insrntResp.insrntName,
//						"userId": this.$route.query.userId
//					}
//					var data = {
//						"token": this.$route.query.token,
//						"userId": this.$route.query.userId,
//						"mark": "UC",
//						"head": {
//							"channelCode": "qtb_h5",
//							"deptCode": this.$route.query.cmpCode,
//							"oprCode": this.$route.query.userId,
//							"prodCode": this.$route.query.prodCode
//						},
//						"opt": "MAIN,BNF",
//						"pkgNo": this.$route.query.orderNo, //订单号
//						"bnfReq": this.allData,
//						"mainReq": addMainData
//					}
//					console.log("data===" + JSON.stringify(data))
//					Indicator.open();
//					this.$http.post(this.$store.state.link + '/trd/order/v1/saveorder', data)
//						.then(res => {
//							Indicator.close();
//							//							console.log("==222==" + JSON.stringify(res.data));
//							var dataCode = res.data.code;
//							if(dataCode == "SYS_S_000") {
//								if(this.addData1.applntResp.relationToInsured == "00") {
//									this.$router.push('/insuranceadvice?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&code=" + "1" + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
//								} else {
//									this.$router.push('/insuranceadvice1?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
//								}
//							} else {
//								Toast(res.data.desc);
//							}
//						}, res => {
//							Indicator.close();
//							console.log(res.data);
//						})
//				}
			},
			provinceChange() {
				console.log(this.provinceType)
				this.city()
			},
			cityChange() {
				console.log(this.cityType)
				this.coun()
			},
			countyChange() {
				console.log(this.countyType)
			},
			bigChange() {
				console.log(this.bigType)
				this.middle()
			},
			middleChange() {
				console.log(this.middleType)
				this.little()
			},
			littleChange() {
				console.log(this.littleType)
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
	
	.pushBtn {
		display: block;
		width: 6.7rem;
		height: 0.88rem;
		margin: 0.4rem auto;
		line-height: 0.88rem;
		font-size: 0.28rem;
		color: #FFFFFF;
		background: #C9141E;
		border-radius: 0.16rem;
		text-align: center;
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
	
	.one {
		width: 100%;
		min-height: 100%;
		position: absolute;
		background: #F3F3F3;
	}
	.btn1{
		margin-right: 0.3rem;
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
		margin-left: 0.2rem;
	}
	
	.oneTitleTextSpan2 {
		margin-left: 1.5rem;
	}
	
	.oneTitleTextSpan3 {
		margin-right: 0.2rem;
	}
	
	.ranchImg {
		display: block;
		width: 6.3rem;
		margin: 0 auto;
		margin-bottom: 0.2rem;
	}
	
	.selected {
		color: #EB7760;
	}
	
	.twoCon {
		/*margin-top: 0.4rem;*/
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
		overflow: scroll;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	
	.twoCon::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: #fff;
	}
	
	.title_twoCon {
		height: 1.11rem;
		line-height: 1.11rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	
	.twoCon2 {
		/*border-bottom: solid 0.01rem #C8C7CC;*/
	}
	
	.borderNone {
		border: none;
	}
	
	.titleLable_twoCon {
		display: inline-block;
		font-size: 0.34rem;
		font-weight: bold;
		color: #222222;
	}
	
	.btnImg {
		display: inline-block;
		float: left;
		width: 0.56rem;
		height: 0.56rem;
		margin-top: 0.14rem;
		margin-right: 0.1rem;
	}
	
	.btnBox {
		padding: 0.64rem 0.4rem;
		text-align: center;
	}
	
	.btnBox1 {
		position: absolute;
		left: 0;
		bottom: 0.64rem;
		padding-bottom: 0;
	}
	
	.btn {
		display: inline-block;
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		border: 0.02rem solid #C9141E;
		box-shadow: inset 0 0.01rem 0.03rem 0 rgba(255, 255, 255, 0.50);
		border-radius: 0.5rem;
		font-size: 0.32rem;
		color: #C9141E;
		text-align: center;
	}
	
	.border-top: 1px; {
		margin-right: 0.3rem;
	}
	
	.inputGrop1 {
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	
	.inputGrop {
		position: relative;
		height: 0.88rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	
	.inputSpan {
		line-height: 0.88rem;
		color: #555555;
		font-weight: bold;
	}
	
	.inputLabel {
		display: block;
		width: 2.04rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
	}
	
	.inputLabel1 {
		line-height: 0.68rem;
	}
	
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
	}
	
	.inpuDate {
		width: 3rem;
	}
	
	select {
		border: none;
		background: none;
		outline: none;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}
	
	.dateBox {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 1;
		display: block;
		height: 0.88rem;
		padding: 0 0.26rem;
		line-height: 0.88rem;
		background: #FFFFFF;
		border-left: solid 0.01rem #C8C7CC;
	}
	
	.dateBox1 {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 1;
		display: block;
		width: 1.8rem;
		height: 0.87rem;
		padding: 0 0.26rem;
		line-height: 0.88rem;
		background: #FFFFFF;
	}
	
	.selImg {
		display: block;
		float: left;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: 0.2rem;
		margin-right: 0.26rem;
	}
	
	.selectBox {
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
	}
	
	.inputText1 {
		display: block;
		width: 3.6rem;
		height: 0.68rem;
		margin-left: 2.04rem;
		font-size: 0.28rem;
		color: #333333;
	}
	
	.pro {
		width: 3.6rem;
	}
	
	.dateInput {
		width: 3.4rem;
	}
	
	.inputWidth {
		width: 4.66rem;
	}
	
	.inputWidth1 {
		width: 3rem;
	}
	
	.inputWidth2 {
		width: 3.5rem;
	}
	
	.inputselect {
		height: 0.68rem;
	}
	
	.sBox {
		padding: 0 0.4rem;
		margin-top: 0.34rem;
		margin-bottom: 0.88rem;
		font-size: 0.28rem;
		line-height: 0.4rem;
	}
	
	.sImg {
		display: block;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: -0.04rem;
	}
	
	.sDes {
		margin-left: 0.16rem;
	}
	
	.sSpan {
		color: #6BD1CF;
	}
	
	.inputselectP {
		position: relative;
		height: 0.68rem;
	}
	
	.upDownImg {
		position: absolute;
		right: 0;
		top: 0.22rem;
		z-index: 3;
		width: 0.4rem;
		height: 0.44rem;
	}
	
	.upDownImg1 {
		top: 0.12rem;
	}
	
	.upDownImg2 {
		right: 2rem;
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
	
	.twoCon .inputGrop:last-child {
		border: none;
	}
	
	.twoCon1 {
		margin-top: 0.4rem;
	}
	
	.sumBtn {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 3;
		width: 0.5rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.6rem;
		text-align: center;
		color: #EB7760;
	}
	
	.signBox {
		padding-bottom: 0.32rem;
		margin-bottom: 0.64rem;
	}
	
	.signBtn {
		display: inline-block;
		float: left;
		width: 2.04rem;
		height: 0.68rem;
		line-height: 0.68rem;
		margin-top: 0.32rem;
		font-size: 0.28rem;
		color: #555555;
		text-align: center;
		border: solid 0.02rem #54CCC1;
		border-radius: 0.34rem;
	}
	
	.marR {
		margin-right: 0.233rem;
	}
	
	.selectedSign {
		background: #54CCC1;
		color: #FFFFFF;
	}
	
	.opa0 {
		z-index: 2;
	}
</style>