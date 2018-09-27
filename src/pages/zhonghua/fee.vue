<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div v-show="!boxShow" class="ctc_div_mask"></div>
		<div v-show="!boxShow" class="ctc_div_maskitem">
			<span class="span_cancel">取消</span>
			<span class="span_ok">确定</span>
			<div class="ctc_div_title">附加险列表</div>
			<div class="ctc_div_list">
				<div class="ctc_div_listitemall">
					<img class="pr_img_item" src="/static/qijianwei/icon_select1_unfocus1.png" />
					<div class="ctc_div_listitemleft">数据库贷款的福克斯</div>
				</div>
			</div>
		</div>
		<div v-show="boxShow">
			<div class="twoCon">
				<p class="title_twoCon">被保险人信息</p>
				<div class="recognizee">
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">被保险人出生日期</label>
						<!--<input type="date"  class="inputText inputWidth left" v-model="birthday"/>-->
						<input type="date" id="birthD6" class="inputText inputWidth left" v-model="birthday" @change="feedata" />
						<label class="dateB" for="birthD6">
							<img src="/static/upDown.png" class="upDownImg" />
						</label>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">被保险人性别</label>
						<span class="inputText inputSpan left" v-model="sex">
							<span class="sex sexM" @click="sexfeal">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="!sexShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="sexShow" />
								<label>男</label>
							</span>
						<span class="sex sexF" @click="sexfeal1">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="sexShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="!sexShow" />
								<label>女</label>
							</span>
						</span>
					</p>
				</div>
			</div>
			<div class="twoCon">
				<p class="title_twoCon">主险信息</p>
				<p class="title_twoCon title_twoCon1">中华尊重大疾病保险</p>
				<div class="policyHolder">
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">缴费方式</label>
						<select class="inputText inputWidth left" v-model="paymentmethpay" @change="payclick">
							<option value="q">请选择</option>
							<option :value="item.freqyNo" v-for="item in paymentmeth">{{item.freqyRmk}}</option>
						</select>
					</P>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">缴费期间</label>
						<select class="inputText inputWidth left" v-model="peripaymentpay" @change="payclick1">
							<option value="q">请选择</option>
							<option :value="item.payNo" v-for="item in peripayment">{{item.payRmk}}</option>
						</select>
					</P>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">保险期间</label>
						<select class="inputText inputWidth left" v-model="periodinsurancepay" @change="payclick2">
							<option value="q">请选择</option>
							<option :value="item.insuNo" v-for="item in periodinsurance">{{item.insuRmk}}</option>
						</select>
					</P>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">基本保险保费（元）</label>
						<input type="number" class="inputText inputWidth left" v-model="coverage" name="text" placeholder="请输入保费" v-on:input="amuntall" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">保额（元）</label>
						<span class="inputText inputSpan inputWidth left">{{covermoney}}</span>
					</p>

				</div>
			</div>
			<!--<Addrisk></Addrisk> 中华暂时没有附加险暂时注掉
			<p class="pushBox">
				<span class="pushBtn">添加附加险</span>
			</p>-->
			<!--<div class="twoCon">
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">合计保费（元）</label>
					<span class="inputText inputSpan inputWidth left">合计保费</span>
				</p>
			</div>-->
			<p class="btnBox">
				<span class="btn btn1" @click="toGoFeeShow">保存并分享</span>
				<span class="btn" @click="toGoApplicant">下一步</span>
			</p>
		</div>
	</div>
</template>

<script>
	import Addrisk from './addrisk.vue'
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "fee",
		data() {
			return {
				boxShow: true,
				sexShow: true,
				paymentmeth: "", //缴费方式
				peripayment: "", //缴费期间
				periodinsurance: "", //保险期间
				birthday: "", //被保险人出生日期
				paymentmethpay: "", //缴费方式值
				peripaymentpay: "", //缴费期间值
				periodinsurancepay: "", //保险期间值
				coverage: "", //基本保额
				plantename: "", //险种名称
				cvrgCode: "", //险种代码
				cmpCode: "", //产品编码
				sex: "",
				covermoney: "", //保费
				cvrgNo: "",
				atmnum: "", //份数
				payFlag: "", //交费年期单位
				insuFlag: "", //保险期间单位
				dutyNo: "",
				main: '',
				mainCvrgno: '', //主险mainCvrgno
			}
		},
		created() {
			this.cvrgList_init();
			this.sex = "M";

		},
		methods: {
			feedata() {
				if(this.paymentmethpay != "q" && this.periodinsurancepay != "q" && this.periodinsurancepay != "q" && this.coverage != "") {
					this.feement();
				}
			},
			init() {
				console.log(this.$store.state.userId)
				var data = {
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						                    "oprCode": this.$store.state.userId,
						                    "prodCode": this.$route.query.prodCode
					},
					"opt": "INSRNT,CVRG,MAIN",
					"pkgNo": this.$route.query.orderNo, //订单号
				}
				console.log(JSON.stringify(data))
				this.$http.post(this.$store.state.link5 + '/trd/order/v1/queryorder', data)
					.then(res => {
						console.log(res.data);
						var dataCode = res.data.code;
						console.log("www====" + JSON.stringify(res.data));
						//console.log(res.data.output.cvrgResp[0].payNo);
						if(dataCode == "SYS_S_000") {
							this.allData = res.data.output;
							this.main = res.data.output.mainResp;
							//console.log(res.data.output.mainResp);

							this.birthday = res.data.output.insrntResp.birthday; //出生日期

							//this.sex = res.data.output.insrntResp.gender;//性别
							if(res.data.output.insrntResp.gender == "M") {
								this.sexShow = true
								this.sex = "M"
							} else if(res.data.output.insrntResp.gender == "F") {
								this.sexShow = false
								this.sex = "F"
							}

							this.paymentmethpay = res.data.output.cvrgResp[0].freqyNo; //缴费方式
							this.peripaymentpay = res.data.output.cvrgResp[0].payNo; //缴费期间

							this.periodinsurancepay = res.data.output.cvrgResp[0].insuNo; //保险期间

							this.coverage = res.data.output.cvrgResp[0].prem; //基本保险费

							this.covermoney = res.data.output.cvrgResp[0].amnt; //保额
							//							this.amuntall();
						} else if(dataCode == "TRD_E_909") {

						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			sexfeal() {
				this.sexShow = true
				this.sex = "M"
				if(this.birthday != "" && this.paymentmethpay != "q" && this.periodinsurancepay != "q" && this.periodinsurancepay != "q" && this.coverage != "") {
					this.feement();
				}
			},
			sexfeal1() {

				this.sexShow = false
				this.sex = "F"
				if(this.birthday != "" && this.paymentmethpay != "q" && this.periodinsurancepay != "q" && this.periodinsurancepay != "q" && this.coverage != "") {
					this.feement();
				}
			},
			toGoFeeShow() {
				this.$router.push('/feeShow')
			},
			payclick() {
				if(this.birthday != "" && this.periodinsurancepay != "q" && this.periodinsurancepay != "q" && this.coverage != "") {
					this.feement();
				}
			},
			payclick1() {
				for(var i = 0; i < this.peripayment.length; i++) {
					if(this.peripayment[i].payNo == this.peripaymentpay) {
						this.insuFlag = this.peripayment[i].payFlag
					}
				}
				if(this.birthday != "" && this.paymentmethpay != "q" && this.periodinsurancepay != "q" && this.coverage != "") {
					this.feement();
				}

			},
			payclick2() {
				for(var i = 0; i < this.periodinsurance.length; i++) {
					if(this.periodinsurance[i].insuNo == this.periodinsurancepay) {
						this.payFlag = this.periodinsurance[i].insuFlag

					}
				}
				if(this.birthday != "" && this.paymentmethpay != "q" && this.periodinsurancepay != "q" && this.coverage != "") {
					this.feement();
				}
			},
			toGoApplicant() {
				if(this.birthday == "") {
					Toast("请填写出生日期");
				} else if(this.paymentmethpay == "q") {
					Toast("请选择缴费方式");
				} else if(this.peripaymentpay == "q") {
					Toast("请选择缴费期间");
				} else if(this.periodinsurancepay == "q") {
					Toast("请选择保险期间");
				} else if(this.coverage == "") {
					Toast("请输入基本保险保费");
				} else if(this.covermoney == "") {
					Toast("保额不能为空");
				} else {
					this.payclick1();
					this.payclick2();
					var mainAgentCode = "";
					var mainAgentName = "";
					var mainDeptCode = "";
					var mainAgentDeptCode = "";
					if(this.$store.state.brokerInfo.brokerCode != undefined) {
						mainAgentCode = this.$store.state.brokerInfo.brokerCode
					}
					if(this.$store.state.brokerInfo.brokerName != undefined) {
						mainAgentName = this.$store.state.brokerInfo.brokerName
					}
					if(this.$store.state.brokerInfo.brokerUp != undefined) {
						for(var i = 0; i < this.$store.state.brokerInfo.brokerUp.length; i++) {
							if(this.$store.state.brokerInfo.brokerUp[i].insuranceCode == "000300") {
								if(this.$store.state.brokerInfo.brokerUp[i].insuranceCode != undefined) {
									mainDeptCode = this.$store.state.brokerInfo.brokerUp[i].insuranceCode
								}
								if(this.$store.state.brokerInfo.brokerUp[i].brokerCode != undefined) {
									mainAgentDeptCode = this.$store.state.brokerInfo.brokerUp[i].brokerCode
								}
							}
						}
					}
					var data = {
						"head": {
							"channelCode": "qtb_h5",
							"deptCode": this.$route.query.cmpCode,
							"oprCode": this.$store.state.userId,
							"prodCode": this.$route.query.prodCode
						},
						"userId": this.$store.state.userId,
						"token": this.$store.state.token,
						"insrntReq": {

							"age": this.jsGetAge(this.birthday),
							"birthday": this.birthday,
							"gender": this.sex

						},
						"cvrgReq": [{
							"mainCvrgNo": this.mainCvrgno,
							"amnt": this.covermoney,
							"cvrgCode": this.cvrgCode,
							"cvrgName": this.plantename,
							"cvrgNo": this.cvrgNo,
							"cvrgType": "M",
							"freqyNo": this.paymentmethpay,
							"insuFlag": this.insuFlag,
							"insuNo": this.periodinsurancepay,
							"payFlag": this.payFlag,
							"payNo": this.peripaymentpay,
							"cvrgType": "M",
							"prem": this.coverage,
							"calcPremType": "1"
						}],
						"mainReq": {
							//						    "agentCode": this.$store.state.brokerInfo.brokerId,
							//						    "agentDeptCode": this.$store.state.brokerInfo.brokerName,
							//							"agentCode": mainAgentCode, //代理人代码 
							"agentCode": "test",
							//							"agentName": mainAgentName, //代理人名称 
							//							"deptCode": "000300",
							//							"agentDeptCode": this.$store.state.userInfo.brokerId, //代理机构
							"agentName": "test", //代理人名称 
							"deptCode": "000300",
							"agentDeptCode": "中华人寿保险", //代理机构
							"amnt": this.covermoney,
							"cmpCode": this.$route.query.cmpCode,
							"prem": this.coverage,
							"prodCode": this.$route.query.prodCode,
							"prodName": this.plantename,
							"prodNo": this.$route.query.prodNo,
							"sumAmnt": this.covermoney, //保额合计 ,
							"sumPrem": this.coverage, //保费合计 
							"lowFlag": "A", //法定受益人标识 A-是;B-否 
							"userId": this.$store.state.userId

						},
						"insuranceDutyReq": [{
							"calMode": "1",
							"clatmCoinsurance": "1",
							"cvrgNo": this.$route.query.prodNo,
							"dutyCode": this.$route.query.prodCode,
							"dutyNo": "017B30",
							"dutyPrem": this.coverage,
							"dutyAmnt": this.covermoney,
							"mult": "1",
						}],
						"mark": "CALC",
						"opt": "INSRNT,CVRG,MAIN,DUTY",
						"pkgNo": this.$route.query.orderNo,

					}
					console.log(JSON.stringify(data))
					Indicator.open();
					this.$http.post(this.$store.state.link5 + "/trd/order/v1/saveorder", data).then(res => {
						Indicator.close();
						console.log(res.data);
						if(res.data.code == "SYS_S_000") {
							this.$router.push('/applicant?prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.cmpCode + '&birthadty=' + this.birthday + '&sex=' + this.sex)
						}
					}, res => {
						Indicator.close();
						console.log("2===失败1" + res.data)
					});
					//					this.$router.push('/applicant')
				}

			},
			cvrgList_init() {
				var data = {
					"cvrgExtType": "3",
					"prodCode": this.$route.query.prodCode,
				}
				Indicator.open();

				this.$http.post(this.$store.state.link5 + "/prd/cvrg/cvrglist", data).then(res => {

					//				this.$http.post(this.$store.state.link + "/prd/cvrg/cvrglist", data).then(res => {

					Indicator.close();
					console.log("111" + JSON.stringify(res.data));
					if(res.data.code == "SYS_S_000") {
						this.paymentmeth = res.data.output[0].payFreqyList; //缴费方式
						this.paymentmethpay = "q";
						this.peripayment = res.data.output[0].payPeriodList; //缴费期间
						this.peripaymentpay = "q"
						this.periodinsurance = res.data.output[0].insuPeriodList; //保险期间
						this.periodinsurancepay = "q"
						this.plantename = res.data.output[0].cvrgName;
						this.cvrgCode = res.data.output[0].cvrgCode;
						this.cmpCode = res.data.output[0].cmpCode;
						this.cvrgNo = res.data.output[0].cvrgNo
						for(var i = 0; i < res.data.output.length; i++) { //默认
							if(res.data.output[i].cvrgType == "M") {
								this.mainCvrgno = res.data.output[i].cvrgNo;
							}
						}
						this.init();
					}
				}, res => {
					Indicator.close();
					console.log("2===失败1" + res.data)
				});
			},
			jsGetAge(strBirthday) {
				var returnAge;
				var strBirthdayArr = strBirthday.split("-");
				var birthYear = strBirthdayArr[0];
				var birthMonth = strBirthdayArr[1];
				var birthDay = strBirthdayArr[2];
				var d = new Date();
				var nowYear = d.getFullYear();
				var nowMonth = d.getMonth() + 1;
				var nowDay = d.getDate();

				if(nowYear == birthYear) {
					returnAge = 0;
				} else {
					var ageDiff = nowYear - birthYear;
					if(ageDiff > 0) {
						if(nowMonth == birthMonth) {
							var dayDiff = nowDay - birthDay;
							if(dayDiff <= 0) {
								returnAge = ageDiff - 1;
							} else {
								returnAge = ageDiff;
							}
						} else {
							var monthDiff = nowMonth - birthMonth;
							if(monthDiff < 0) {
								returnAge = ageDiff - 1;
							} else {
								returnAge = ageDiff;
							}
						}
					} else {
						returnAge = -1;
					}
				}
				return returnAge;
			},
			amuntall() {
				var patrn = /^[0-9]*$/;
				if(this.birthday == "") {
					Toast("请填写出生日期");
				} else if(this.paymentmethpay == "q") {
					Toast("请选择缴费方式");
				} else if(this.peripaymentpay == "q") {
					Toast("请选择缴费期间");
				} else if(this.periodinsurancepay == "q") {
					Toast("请选择保险期间");
				} else if(this.coverage == "") {
					Toast("请输入基本保险保费");
				} else if(!patrn.test(this.coverage)) {
					Toast("保费必须为纯数字");
					return;
				} else {
					if(this.coverage.length >= 5) {
						if(parseInt(this.coverage % 1000) == 0) {
							this.atmnum = parseInt(this.coverage / 1000)
							this.feement();
						} else {
							Toast("保额应为1000的整数倍");
						}

					} else {
						this.covermoney = "";
					}

				}
			},
			feement() {
				var patrn = /^[0-9]*$/;
				if(this.coverage == "") {
					return;
				}
				if(!patrn.test(this.coverage)) {
					Toast("保额必须为纯数字")
					return;
				}
				var data = {

					"cvrgResp": [{
						//								"amnt": this.coverage,
						"cvrgCode": this.cvrgCode,
						"cvrgName": this.plantename,
						"cvrgNo": this.cvrgNo,
						"insuFlag": this.insuFlag,
						"insuNo": this.periodinsurancepay,
						"payFlag": this.payFlag,
						"payNo": this.peripaymentpay,
						"cvrgType": "M",
						"prem": this.coverage,
						"calcPremType": "1"
					}],
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode,

					},
					"userId": this.$store.state.userId,
					"token": this.$store.state.token,
					"insrntResp": {
						"age": this.jsGetAge(this.birthday),
						"birthday": this.birthday,
						"gender": this.sex
					},
					"insuranceDutyResp": [{
						"calMode": "1",
						"clatmCoinsurance": "1",
						"cvrgNo": this.$route.query.prodNo,
						"dutyCode": this.$route.query.prodCode,
						"dutyNo": "017B30",
						"dutyPrem": this.coverage,
						"mult": "1",
					}],
					"mainResp": {
						"agentCode": "test",
						"deptCode": this.$route.query.cmpCode,
						"pkgNo": this.$route.query.orderNo,
						"prodCode": this.$route.query.prodCode,
						"prodName": this.plantename,
						"prodNo": this.$route.query.prodNo,
						"userId": this.$store.state.userId
					}

				}
				Indicator.open();
				console.log(JSON.stringify(data))
				this.$http.post(this.$store.state.link5 + "/trd/calc/v1/prenium", data).then(res => {
					Indicator.close();
					console.log(res.data);
					if(res.data.code == "SYS_S_000") {
						if(res.data.output.code == "SSE00001") {
							Toast(res.data.output.message);
						} else if(res.data.output.code == "SSI00000") {
							this.covermoney = res.data.output.dutyList[0].amnt;
							this.dutyNo = res.data.output.dutyList[0].dutyNo;
						}
					} else {
						Toast(res.data.desc)
					}
				}, res => {
					Indicator.close();
					console.log("2===失败1" + res.data)
				});

			},

		}

	}
</script>

<style scoped="scoped">
	.ctc_div_listitemleft {
		float: left;
		display: block;
	}
	
	.pr_img_item {
		margin-top: 0.07rem;
		display: block;
		float: left;
		width: 0.64rem;
		height: 0.64rem;
	}
	
	.ctc_div_listitemall {
		width: 90%;
		height: 0.8rem;
		line-height: 0.8rem;
		margin: 0 auto;
		border-bottom: 0.01rem solid #8E8E93;
	}
	
	.ctc_div_list {
		margin-top: 0.3rem;
		width: 100%;
		height: 6rem;
		overflow-y: scroll;
		border-top: 0.01rem solid #8E8E93;
	}
	
	.span_cancel {
		display: block;
		float: left;
		margin-left: 0.4rem;
		font-size: 0.32rem;
		color: #EB6067;
	}
	
	.span_ok {
		display: block;
		float: right;
		margin-right: 0.4rem;
		font-size: 0.32rem;
		color: #EB6067;
	}
	
	.ctc_div_mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.40);
	}
	
	.ctc_div_maskitem {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 2;
		width: 100%;
		height: 7rem;
		padding-top: 0.32rem;
		background: #ffffff;
	}
	
	.ctc_div_title {
		width: 100%;
		margin: 0 auto;
		font-size: 0.32rem;
		text-align: center;
		color: #555555;
	}
	
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
		color: #EB7760;
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
		color: #333333;
	}
	
	.inputSpan {
		display: inline-block;
		line-height: 0.88rem;
	}
	
	.inputWidth {
		width: 3.48rem;
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
	
	.upDownImg {
		width: 0.4rem;
		height: 0.44rem;
		margin-top: 0.2rem;
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
	
	.sexImg {
		float: left;
		display: inline-block;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: 0.2rem;
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
	}
	
	.sexM {
		margin-right: 0.46rem;
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
</style>