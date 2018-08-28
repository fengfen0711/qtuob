<template>
	<div class="userInfo" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="userInfoUp">
			<p class="userHeader clearFloat">
				<span class="title">
					保单信息
				</span>
			</p>
			<p class="inputGrop">
				<label class="inputLabel">投保单号</label>
				<input type="text" maxlength="20" class="inputText" placeholder="" disabled="disabled" v-model="numbers" />
			</p>
			<p class="inputGrop">
				<label class="inputLabel">总保费(元)</label>
				<input type="text" maxlength="20" class="inputText" placeholder="" disabled="disabled" v-model="money" />
			</p>
			<p class="inputGrop">
				<label class="inputLabel">支付方式</label>
				<select class="left inputText inputWidth" v-model="paymethType" disabled="true">
					<option :value="paymeth.dicCode" v-for="paymeth in paymethList">{{paymeth.deptDicName}}</option>
				</select>
				<!--<input type="text" maxlength="20" class="inputText" placeholder="实时" disabled="disabled" v-model="paymethType" />-->
			</p>
		</div>
		<div class="userInfoMid">
			<p class="userHeader clearFloat">
				<span class="title">
					险种信息
				</span>
			</p>
			<div class="" v-for="(item,index) in arrList" :key="index">
				<p class="inputGrop">
					<label class="inputLabel">主险</label>
					<input type="text" maxlength="20" class="inputText" disabled="disabled" v-model="item.cvrgName" />
				</p>
				<p class="inputGrop">
					<label class="inputLabel">保险金额/份数</label>
					<input type="text" maxlength="20" class="inputText" placeholder="100000.00" disabled="disabled" v-model="item.amnt" />
				</p>
				<p class="inputGrop">
					<label class="inputLabel">期交保费</label>
					<input type="text" maxlength="20" class="inputText" placeholder="1959.00" disabled="disabled" v-model="item.prem" />
				</p>
				<p class="inputGrop">
					<label class="inputLabel">保险期间</label>
					<label class="inputLabelRight">{{item,allRiskData | guarantee}}</label>
					<!--<input type="text" maxlength="20" class="inputText" placeholder="年交" disabled="disabled" v-model="item.insuNo" />-->
				</p>
				<p class="inputGrop">
					<label class="inputLabel">交费方式</label>
					<!--<input type="text" maxlength="20" class="inputText" placeholder="实付" disabled="disabled" v-model="payType" />-->
					<label class="inputLabelRight">{{item,allRiskData | paymentType}}</label>
				</p>
				<p class="inputGrop">
					<label class="inputLabel">交费期间</label>
					<label class="inputLabelRight">{{item,allRiskData | payment}}</label>
					<!--<input type="text" maxlength="20" class="inputText" placeholder="20年交" disabled="disabled" v-model="item.insuFlag" />-->
				</p>
			</div>

		</div>

		<div class="userInfoMid">
			<p class="userHeader clearFloat">
				<span class="title">
					投保人信息
				</span>
			</p>
			<p class="inputGrop">
				<label class="inputLabel">姓名</label>
				<input type="text" maxlength="20" class="inputText" disabled="disabled" v-model="appName" />
			</p>
			<p class="inputGrop">
				<label class="inputLabel">性别</label>
				<input type="text" maxlength="20" class="inputText" disabled="disabled" v-model="appNex" />
			</p>
			<p class="inputGrop">
				<label class="inputLabel">出生日期</label>
				<input type="text" maxlength="20" class="inputText" disabled="disabled" v-model="appDay" />
			</p>
			<p class="inputGrop">
				<label class="inputLabel">证件类型</label>
				<select class="left inputText inputWidth" v-model="cardType" disabled="true">
					<option :value="card.dicCode" v-for="card in cardList">{{card.deptDicName}}</option>
				</select>
				<!--<input type="text" maxlength="20" class="inputText" placeholder="140623199610072028" disabled="disabled" v-model="cardType" />-->
			</p>
			<p class="inputGrop">
				<label class="inputLabel">证件号码</label>
				<input type="text" maxlength="20" class="inputText" disabled="disabled" v-model="appIDnum" />
			</p>
		</div>
		<div class="userInfoMid">
			<p class="userHeader clearFloat">
				<span class="title">
					被保人信息
				</span>
			</p>
			<p class="inputGrop">
				<label class="inputLabel">姓名</label>
				<input type="text" maxlength="20" class="inputText" disabled="disabled" v-model="insuerName" />
			</p>
			<p class="inputGrop">
				<label class="inputLabel">性别</label>
				<input type="text" maxlength="20" class="inputText" disabled="disabled" v-model="insuerNex" />
			</p>
			<p class="inputGrop">
				<label class="inputLabel">出生日期</label>
				<input type="text" maxlength="20" class="inputText" disabled="disabled" v-model="insuerDay" />
			</p>
			<p class="inputGrop">
				<label class="inputLabel">证件类型</label>
				<select class="left inputText inputWidth" v-model="cardInType" disabled="true">
					<option :value="cardIn.dicCode" v-for="cardIn in cardInList">{{cardIn.deptDicName}}</option>
				</select>
				<!--<input type="text" maxlength="20" class="inputText" placeholder="140623199610072028" disabled="disabled" v-model="cardInType" />-->
			</p>
			<p class="inputGrop">
				<label class="inputLabel">证件号码</label>
				<input type="text" maxlength="20" class="inputText" disabled="disabled" v-model="insuerIDnum" />
			</p>
		</div>
		<div class="userInfoMid" v-if="benshow">
			<p class="userHeader clearFloat">
				<span class="title">
					受益人信息
				</span>
			</p>
			<p class="inputGrop">
				<label class="inputLabel">受益人类型</label>
				<input type="text" maxlength="20" class="inputText" disabled="disabled" v-model="benType" />
			</p>
		</div>
		<div class="userInfoMid" v-if="!benshow">
			<p class="userHeader clearFloat">
				<span class="title">
					受益人信息
				</span>
			</p>
			<p class="inputGrop">
				<label class="inputLabel">受益人类型</label>
				<input type="text" maxlength="20" class="inputText" disabled="disabled" v-model="benType" />
			</p>
			<div class="" v-for="(item,index) in addList" :key="index">
				<p class="inputGrop">
					<label class="inputLabel">姓名</label>
					<input type="text" maxlength="20" class="inputText" disabled="disabled" v-model="item.bnfName" />
				</p>
				<p class="inputGrop">
					<label class="inputLabel">性别</label>
					<!--<input type="text" maxlength="20" class="inputText"  disabled="disabled" v-model="item.gender" />-->
					<span class="inputText" disabled="disabled">{{item.gender|statu}}</span>
				</p>
				<p class="inputGrop">
					<label class="inputLabel">出生日期</label>
					<input type="text" maxlength="20" class="inputText" disabled="disabled" v-model="item.birthday" />
				</p>
				<p class="inputGrop">
					<label class="inputLabel">证件类型</label>
					<select class="left inputText inputWidth" v-model="item.certfType" disabled="true">
						<option :value="cardBen.dicCode" v-for="cardBen in cardBenList">{{cardBen.deptDicName}}</option>
					</select>
					<!--<input type="text" maxlength="20" class="inputText" placeholder="140623199610072028" disabled="disabled" v-model="cardBenType" />-->
				</p>
				<p class="inputGrop">
					<label class="inputLabel">证件号码</label>
					<input type="text" maxlength="20" class="inputText" disabled="disabled" v-model="item.certfCode" />
				</p>
				<p class="inputGrop">
					<label class="inputLabel">受益顺序</label>
					<input type="text" maxlength="20" class="inputText" disabled="disabled" v-model="item.bnfType" />
				</p>
				<p class="inputGrop">
					<label class="inputLabel">受益比例</label>
					<input type="text" maxlength="20" class="inputText" disabled="disabled" v-model="item.bnfShare" />
				</p>
			</div>
		</div>
		<div class="userInfoMid">
			<p class="userHeader clearFloat">
				<span class="title">
					缴费信息
				</span>
			</p>
			<p class="inputGrop">
				<label class="inputLabel">开户行</label>
				<select class="left inputText inputWidth" v-model="paycard" disabled="true">
					<option :value="bank.dicCode" v-for="bank in bankList">{{bank.deptDicName}}</option>
				</select>
			</p>
			<p class="inputGrop">
				<label class="inputLabel">户名</label>
				<input type="text" class="inputText1" disabled="disabled" v-model="humin" />
			</p>
			<p class="inputGrop1">
				<label class="inputLabel">账号</label>
				<input type="text" class="inputText1" disabled="disabled" v-model="num" />
			</p>

		</div>
		<p class="bottom"></p>
		<!--<trialCalculation></trialCalculation>-->
		<div class="buyButton">
			<span class="buyLeft">保费：
				<span>￥{{allPrem}}元</span>
			</span>
			<span class="buyRight" @click="goSecondsubmit">下一步</span>
		</div>
		<div class="wrap_aut" v-if="!wrap_aut">
			<div class="box_aut">
				<div class="box_top">险种[主险名称/附加险名称]核保规则校验失败，规则：累计重疾险风险保额体检规则校验失败，是否转入人工核保？</div>
				<p class="box_bottom">
					<span id="box_left" @click="goFee">重新指定投保计划</span>
					<span id="box_right" @click="goFeedsubmit">转人工核保</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Exif from 'exif-js'
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	import trialCalculation from '@/components/button.vue'
	import { Dictionaries } from "../../assets/js/counry.js";
	export default {
		data() {
			return {
				allPrem: '',
				benshow: false,
				addList: [],
				insuNo: '',
				insuNoList: [],
				arrList: [],
				numbers: '',
				//交费期间
				insuFlag: '',
				insuList: [],
				money: '',
				paymethType: '',
				designation: '',
				quantum: '',
				periodInsur: '',
				periodType: '',
				payType: '',
				bankList: [],
				dataType: '',
				appName: '',
				appNex: '',
				appDay: '',
				cardType: '',
				appIDnum: '',
				insuerName: '',
				insuerNex: '',
				insuerDay: '',
				cardInType: '',
				insuerIDnum: '',
				benType: '',
				benName: '',
				benNex: '',
				benDay: '',
				cardBenType: '',
				cardBenList: [],
				benIDnum: '',
				benOrder: '',
				benProp: '',
				paycard: '',
				humin: '',
				num: '',
				paymethList: [],
				allRiskData: [],
				gender: '',
				wrap_aut: true,
			}
		},
		filters: {
			statu: function(value) {
				if(value == "F") {
					return value = "女"
				} else {
					return value = "男"
				}
			},

			guarantee: function(value, value1) {
				for(var i = 0; i < value1.length; i++) {
					if(value1[i].cvrgCode == value.cvrgCode) {
						for(var z = 0; z < value1[i].insuPeriodList.length; z++) {
							if(value1[i].insuPeriodList[z].insuFlag == value.insuFlag) {
								return value1[i].insuPeriodList[z].insuRmk
							}
						}
					}
				}
			},
			payment: function(value, value1) {
				for(var i = 0; i < value1.length; i++) {
					if(value1[i].cvrgCode == value.cvrgCode) {
						for(var z = 0; z < value1[i].payPeriodList.length; z++) {
							if(value1[i].payPeriodList[z].payNo == value.payNo) {
								return value1[i].payPeriodList[z].payRmk
							}
						}
					}
				}
			},
			paymentType: function(value, value1) {
				for(var i = 0; i < value1.length; i++) {
					if(value1[i].cvrgCode == value.cvrgCode) {
						for(var z = 0; z < value1[i].payFreqyList.length; z++) {
							if(value1[i].payFreqyList[z].freqyNo == value.freqyNo) {
								return value1[i].payFreqyList[z].freqyRmk
							}
						}
					}
				}
			}
		},
		created() {
			this.cvrgList_init();
			if(localStorage.dataList != undefined) {
				this.dictionaries = JSON.parse(localStorage.dataList)
			} else {
				var _this = this
				Dictionaries(this.$store.state.link5).then((res) => {
					_this.dictionaries = res.output
				})
			}
			this.allType()

		},
		methods: {
			goFeedsubmit() {
				this.$router.push('/feedsubmit');
			},
			goFee() {
				this.$router.push('/fee');
			},
			goSecondsubmit() {
				var data = {
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"oprStep": "",
						"prodCode": this.$route.query.prodCode
					},
					"pkgNo": this.$route.query.orderNo //订单号
				}
				console.log(JSON.stringify(data))
				Indicator.open();
				this.$http.post(this.$store.state.link5 + "/trd/uc/v1/underwrite", data)
					.then(res => {
						Indicator.close();
						console.log(JSON.stringify(res.data))
						if(res.data.code == "SYS_S_000") {
							console.log(this.$store.state.AUC_TWO)
							if(res.data.output.uwStatus == this.$store.state.AUC_TWO) {
								this.goIssue();
							} else {
								Toast("res.data.output.message")
							}
						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					})
			},
			goIssue() {
				var data = {
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"oprStep": "",
						"prodCode": this.$route.query.prodCode
					},
					"pkgNo": this.$route.query.orderNo //订单号
				}

				console.log(JSON.stringify(data))
				Indicator.open();
				this.$http.post(this.$store.state.link5 + "/trd/ply/v1/create", data)
					.then(res => {
						console.log(res.data);
						Indicator.close();
						if(res.data.code == "SYS_S_000") {
							if(res.data.output.code == "UDR") {
								//								Toast("出单成功");
								this.$router.push('/feedbackpayment?payType=Y&message=' + res.data.output.message+'&prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode);
							} else if(res.data.output.code == "UDR_FAL") {
								this.$router.push('/feedbackpayment?payType=N&message=' + res.data.output.message+'&prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode);
							} else {
								Toast("res.data.output.message")
							}
							//							Toast("出单成功");
							//this.$router.push('/feedbackpayment');
						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					})
			},
			cvrgList_init() {

				var data = {
					"cvrgExtType": "3",
					"prodCode": this.$route.query.prodCode,
				}
				Indicator.open();
				this.$http.post(this.$store.state.link5 + "/prd/cvrg/cvrglist", data).then(res => {
					Indicator.close();
					if(res.data.code == "SYS_S_000") {
						this.allRiskData = res.data.output;
						console.log("111" + JSON.stringify(this.allRiskData));
						this.echo()
					}

				}, res => {
					Indicator.close();
					console.log("2===失败1" + res.data)
				});
			},
			echo() {
				var data = {
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode,
					},
					"opt": "ALL",
					"pkgNo": this.$route.query.orderNo,

				}
				//				console.log("====回显====" + JSON.stringify(data))
				this.$http.post(this.$store.state.link5 + '/trd/order/v1/queryorder', data).then(res => {
					console.log("====回显====" + JSON.stringify(res.data))
					var dataCode = res.data.code;
					var state = res.data.output
					if(dataCode == "SYS_S_000") {
						this.allPrem = state.mainResp.prem;
						this.numbers = state.mainResp.pkgNo;
						this.money = state.mainResp.prem;
						this.paymethType = state.paymentResp.payMode; //支付方式
						this.arrList = state.cvrgResp
						this.designation = state.cvrgResp[0].cvrgName;
						//					保险金额/份数
						//					期交保费
						this.periodType = state.cvrgResp[0].insuNo;
						//交费方式
						this.dataType = state.cvrgResp[0].insuFlag;
						//投保人
						this.appName = state.applntResp.applName;
						if(state.applntResp.gender == "M") {
							this.appNex = "男";
						} else if(state.applntResp.gender == "F") {
							this.appNex = "女";
						}

						this.appDay = state.applntResp.birthday;
						this.cardType = state.applntResp.certfType;
						this.appIDnum = state.applntResp.certfCode;
						//被保人
						this.insuerName = state.insrntResp.insrntName;
						if(state.insrntResp.gender == "M") {
							this.insuerNex = "男";
						} else if(state.insrntResp.gender == "F") {
							this.insuerNex = "女";
						}
						this.insuerDay = state.insrntResp.birthday;
						this.cardInType = state.insrntResp.certfType;
						this.insuerIDnum = state.insrntResp.certfCode;
						//受益人
						this.addList = state.bnfResp
						if(this.addList.length > 0) {
							this.benType = "指定"
							this.benshow = false;
						} else {
							this.benType = "法定"
							this.benshow = true;
						}
						console.log("======" + JSON.stringify(res.data.output.bnfResp[0]))
						// if (res.data.output.bnfResp[0].gender == "F") {
						// 	this.gender = "女"
						// }
						this.benName = state.bnfResp.bnfName;

						this.benDay = state.bnfResp.birthday;
						this.benIDnum = state.bnfResp.certfCode;
						this.benOrder = state.bnfResp.bnfSeq;
						this.benProp = state.bnfResp.bnfNo;
						//交费信息
						this.paycard = state.paymentResp.bankCode;
						this.humin = state.paymentResp.accName;
						console.log(state.paymentResp.accName)
						this.num = state.paymentResp.accNo

					} else {

					}
				}, res => {
					console.log(res.data);
				})
			},
			allType() {
				//				console.log(JSON.stringify(this.dictionaries))
				this.bankList = this.dictionaries.bankCode.codeList;
				this.cardBenList = this.dictionaries.certfType.codeList;
				this.cardInList = this.dictionaries.certfType.codeList;
				this.cardList = this.dictionaries.certfType.codeList;
				this.paymethList = this.dictionaries.payMode.codeList;
			}

		},

		components: {
			trialCalculation
		}
	}
</script>

<style scoped="scoped">
	.title {
		font-size: 0.32rem;
		color: #222222;
		letter-spacing: 0;
		line-height: 0.88rem;
		font-weight: 600;
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
		/*padding-right: 0.48rem;*/
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
	
	.userInfo {
		width: 100%;
		overflow: hidden;
		background: #F3F3F3;
	}
	
	.userInfoUp {
		width: 6.7rem;
		padding: 0 0.4rem;
		background: #FFFFFF;
		font-size: 0.36rem;
		color: #222222;
		overflow: hidden;
	}
	
	.userHeader {
		position: relative;
		height: 0.88rem;
		margin-top: 0.16rem;
		border-bottom: solid 0.01rem #D8D8D8;
	}
	
	.bottom {
		width: 100%;
		height: 1.3rem;
		background: #F3F3F3;
		margin-bottom: 0.5rem;
	}
	
	#file {
		position: absolute;
		top: 0.29rem;
		right: 0;
		opacity: 0;
		z-index: 1;
		width: 1.2rem;
		height: 1.2rem;
	}
	
	.userHeaderText {
		display: block;
		margin: 0.38rem 0 0.3rem 0;
		height: 0.44rem;
		line-height: 0.44rem;
	}
	
	.userHeaderTextDes {
		display: block;
		height: 0.44rem;
		line-height: 0.44rem;
		font-size: 0.28rem;
		color: #969696;
	}
	
	.userHeaderImg {
		display: block;
		width: 1.12rem;
		height: 1.12rem;
		margin-top: 0.28rem;
		border: solid 0.04rem #000000;
		border-radius: 50%;
	}
	
	.inputGrop {
		height: 0.88rem;
		margin-top: 0.16rem;
		border-bottom: solid 0.01rem #D8D8D8;
	}
	
	.inputLabel {
		display: inline-block;
		line-height: 0.88rem;
		font-size: 0.28rem;
	}
	
	.inputLabelRight {
		display: inline-block;
		line-height: 0.88rem;
		font-size: 0.28rem;
		float: right;
	}
	
	.inputText {
		float: right;
		height: 0.88rem;
		font-size: 0.32rem;
		color: #555555;
		text-align: right;
		border: none;
		background: none;
		line-height: 0.88rem;
	}
	
	.spanIn {
		line-height: 0.88rem;
		color: #969696;
	}
	
	.userInfoUp .inputGrop:last-child {
		border: none;
	}
	
	.userInfoMid {
		width: 6.7rem;
		padding: 0 0.4rem;
		margin-top: 0.56rem;
		background: #FFFFFF;
		font-size: 0.36rem;
		color: #222222;
		overflow: hidden;
	}
	
	.userInfoMid .inputGrop:last-child {
		border: none;
	}
	
	.userInfoDown {
		width: 6.7rem;
		padding: 0 0.4rem;
		margin-top: 0.56rem;
		background: #FFFFFF;
		font-size: 0.36rem;
		color: #222222;
		overflow: hidden;
	}
	
	.inputGrop1 {
		height: 0.88rem;
		margin-top: 0.16rem;
		/*padding-bottom: 1.5rem;*/
		/*border-bottom: solid 0.01rem #D8D8D8;*/
	}
	
	.inputText1 {
		float: right;
		width: 4rem;
		height: 0.88rem;
		font-size: 0.32rem;
		color: #555555;
		text-align: right;
		border: none;
		background: none;
	}
	
	.inputLabel1 {
		display: block;
		margin: 0.38rem 0 0.24rem;
	}
	
	.userSign {
		width: 100%;
		line-height: 0.34rem;
		font-size: 0.24rem;
		border: none;
		outline: none;
	}
	
	.keepBox {
		margin-top: 0.6rem;
		margin-bottom: 1.5rem;
	}
	
	.keepBtn {
		display: block;
		width: 6.04rem;
		height: 0.95rem;
		margin: 0 auto;
		line-height: 0.95rem;
		text-align: center;
		font-size: 0.32rem;
		color: #EB7760;
		border: solid 0.01rem #EB7760;
		border-radius: 0.51rem;
	}
	
	select {
		border: none;
		background: none;
		outline: none;
	}
	
	.select_right {
		direction: rtl;
	}
	
	.inputWidth {
		width: 4rem;
		direction: rtl;
	}
	
	.buyButton {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1.06rem;
	}
	
	.buyLeft {
		display: inline-block;
		width: 50%;
		height: inherit;
		background: #FFFFFF;
		float: left;
		font-size: 0.36rem;
		color: #333333;
		line-height: 1.06rem;
		text-align: center;
	}
	
	.buyLeft span {
		color: #C9141E;
	}
	
	.buyRight {
		display: inline-block;
		width: 50%;
		height: inherit;
		background: #C9141E;
		float: right;
		font-size: 0.36rem;
		color: #FFFFFF;
		line-height: 1.06rem;
		text-align: center;
	}
	
	.wrap_aut {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 10;
	}
	
	.box_aut {
		width: 5.42rem;
		height: 3.56rem;
		margin: 0 auto;
		margin-top: 50%;
		border-radius: 0.16rem;
		background: #ffffff;
		z-index: 15;
	}
	
	.box_top {
		width: 95%;
		height: 1rem;
		padding: 0.2rem 0.2rem;
		line-height: 0.45rem;
		font-size: 0.32rem;
		color: #222222;
	}
	
	.box_bottom {
		width: 100%;
		height: 1rem;
		display: flex;
		justify-content: space-between;
	}
	
	.box_bottom span {
		display: block;
		width: 50%;
		height: 1rem;
		line-height: 1rem;
		border: 1px solid #ccc;
		text-align: center;
		font-weight: bold;
		margin-top: 1.13rem;
		border-bottom: none;
	}
	
	#box_left {
		border-left: none;
	}
	
	#box_right {
		border-right: none;
		color: red;
	}
</style>