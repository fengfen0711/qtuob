<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div v-if="pdfFlag">
			<div class="oneChild">
				<div class="threeBox">
					<p class="prodName">{{prodName}}</p>
					<p class="inputGrop1 clearFloat">
						<label class="inputLabel left">首期保费(元)</label>
						<span class="inputSpan selected left">{{price}}</span>
					</p>
				</div>
				<p class="payTitle"></p>
				<!--<p class="payTitle">查看支付限额</p>-->
				<div class="twoCon">
					<div class="inputDiv clearFloat">
						<p class="inputP">
							<label class="inputLabel inputLabel1">开户行所在省市</label>
						</p>
						<p class="inputP1 clearFloat">
							<select class="left inputText1 inputWidth1" v-model="provinceBox" @change="provinceChange">
								<option :value="[province.accCode,province.accName]" v-for="province in provinceList">{{province.accName}}</option>
							</select>
							<select class="left inputText1 inputWidth1 inputWidth2" v-model="cityBox" @change="cityChange">
								<option :value="[city.accCode,city.accName]" v-for="city in cityList">{{city.accName}}</option>
							</select>
						</p>
					</div>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">开户行</label>
						<select class="inputText inputWidth left" v-model="bankTypeBox" @change="bankChange">
							<option :value="[bank.bankCode,bank.bankName]" v-for="bank in bankList">{{bank.bankName}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">持卡人姓名</label>
						<input type="text" class="inputText inputWidth left" maxlength="10" v-model="userName" placeholder="请输入持卡人真实姓名" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">银行卡号</label>
						<input type="tel" maxlength="20" class="inputText inputWidth left" v-model="bankCardNum" placeholder="请输入银行卡号" />
					</p>
				</div>
				<p class="sBox clearFloat" @click="sBoxShowHide">
					<img src="/static/noSelected.png" class="sImg left" v-show="sBoxShow" />
					<img src="/static/selected.png" class="sImg left" v-show="!sBoxShow" />
					<span class="sDes">我已查看并同意
						<span class="sSpan" @click.stop="sBoxGoPdf1">《银行自动转账授权声明》</span>。</span>
				</p>
			</div>
			<p class="btnBox" v-show="hidshow">
				<span class="btn" @click="handleClickGoPay">确认支付</span>
			</p>
		</div>
		<div v-if="!pdfFlag" class="ctc_div_mask">
			<Pdf :pdf="PDFUrl" @pdfClose="pdfClose"></Pdf>
		</div>
	</div>
</template>

<script>
import Pdf from '@/components/pdf.vue'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
	name: "PayInfo",
	data() {
		return {
			a: true,
			prodName: '',
			price: '',
			userName: this.$route.query.userName,
			bankCardNum: '',
			sBoxShow: true,
			provinceBox: [],
			provinceType: '',
			provinceName: '',
			provinceList: [],
			cityBox: [],
			cityType: '',
			cityName: '',
			cityList: [],
			bankTypeBox: [],
			bankType: '',
			bankName: '',
			bankList: [],
			screenHeight: '',
			hidshow: true,
			PDFUrl: '',
			pdfFlag: true,
		}
	},
	created() {
		this.OrderInfoAjax()
		this.bankAjax()
		this.pro()
		this.sBoxGoPdf()
		// this.init()
	},
	methods: {
		init() {
			var OrderInfo = {
				"head": {
					"channelCode": "qtb_h5",
					"deptCode": this.$route.query.cmpCode,
					"oprCode": this.$store.state.userId,
					"prodCode": this.$route.query.prodCode
				},
				"token": this.$store.state.token,
				"userId": this.$store.state.userId,
				"opt": "MAIN,CVRG,PAY",
				"pkgNo": this.$route.query.orderNo
			}
			this.$http.post(this.$store.state.link + '/trd/order/v1/queryorder', OrderInfo)
			//this.$http.post(this.$store.state.link5 + '/trd/order/v1/queryorder', OrderInfo)
				.then(res => {
					console.log(JSON.stringify(res.data));
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.allData = res.data.output;
						this.userName = this.allData.paymentResp.accName;//姓名
						this.price = this.allData.paymentResp.payPrem;//保费
						this.bankCardNum = this.allData.paymentResp.accNo;//银行卡号
						this.bankTypeBox = this.allData.paymentResp.bankName;//开户行
						this.provinceBox = this.allData.paymentResp.provinceCode;//省
						this.cityBox = this.allData.paymentResp.cityCode;//市
					} else {
						Toast(res.data.desc);
					}
				}, res => {
					console.log(res.data);
				})
		},
		// init() {
		// 	var OrderInfo = {
		// 		"head": {
		// 			"channelCode": "qtb_h5",
		// 			"deptCode": this.$route.query.cmpCode,
		// 			"oprCode": this.$store.state.userId,
		// 			"prodCode": this.$route.query.prodCode
		// 		},
		// 		"token": this.$store.state.token,
		// 		"userId": this.$store.state.userId,
		// 		"opt": "MAIN,CVRG,PAY",
		// 		"pkgNo": this.$route.query.orderNo
		// 	}
		// 	this.$http.post(this.$store.state.link + '/trd/order/v1/queryorder', OrderInfo)
		// 		.then(res => {
		// 			console.log(JSON.stringify(res.data));
		// 			var dataCode = res.data.code;
		// 			if (dataCode == "SYS_S_000") {
		// 				this.allData = res.data.output;
		// 				this.userName = this.allData.paymentResp.accName;//姓名
		// 				this.price = this.allData.paymentResp.payPrem;//保费
		// 				this.bankCardNum = this.allData.paymentResp.accNo;//银行卡号
		// 				this.bankTypeBox = this.allData.paymentResp.bankName;//开户行
		// 				this.provinceBox = this.allData.paymentResp.provinceCode;//省
		// 				this.cityBox = this.allData.paymentResp.cityCode;//市
		// 			} else {
		// 				Toast(res.data.desc);
		// 			}
		// 		}, res => {
		// 			console.log(res.data);
		// 		})
		// },
		pdfClose(...data) {
			this.pdfFlag = data[0]
		},
		sBoxGoPdf1() {
			this.pdfFlag = false;
			//  			console.log(this.PDFUrl)
			//  			window.location.href = this.PDFUrl
		},
		sBoxGoPdf() {
			let prodCodeInfo = {
				"prodCode": this.$route.query.prodCode
			}
			this.$http.post(this.$store.state.link + '/prd/prod/attachlist', prodCodeInfo)
				.then(res => {
					console.log(JSON.stringify(res.data));
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.PDFUrl = res.data.output[2].attachUrl
					} else {
						Toast(res.data.desc);
						console.log(res.data.desc);
					}
				}, res => {
					console.log(res.data);
				})
		},
		OrderInfoAjax() {
			var OrderInfo = {
				"head": {
					"channelCode": "qtb_h5",
					"deptCode": this.$route.query.cmpCode,
					"oprCode": this.$store.state.userId,
					"prodCode": this.$route.query.prodCode
				},
				"token": this.$store.state.token,
				"userId": this.$store.state.userId,
				"opt": "MAIN,CVRG,PAY",
				"pkgNo": this.$route.query.orderNo
			}
			this.$http.post(this.$store.state.link + '/trd/order/v1/queryorder', OrderInfo)
				.then(res => {
					console.log(JSON.stringify(res.data));
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.allData = res.data.output
						this.prodName = this.allData.mainResp.prodName
						this.price = this.allData.mainResp.firstPremium
					} else {
						Toast(res.data.desc);
					}
				}, res => {
					console.log(res.data);
				})
		},
		bankAjax() {
			var bankinfo = {
				"dicReq": this.$route.query.cmpCode
			}
			this.$http.post(this.$store.state.link + '/dic/findBankByOrgCode', bankinfo)
				.then(res => {
					//				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.bankList = res.data.output
						this.bankTypeBox = [this.bankList[0].bankCode, this.bankList[0].bankName];
						this.bankType = this.bankList[0].bankCode
						this.bankName = this.bankList[0].bankName
					} else {
						Toast(res.data.desc);
					}
				}, res => {
					console.log(res.data);
				})
		},
		pro() {
			var provinceinfo = {
				"code": "0",
				"orgCode": this.$route.query.cmpCode
			}
			this.$http.post(this.$store.state.link + '/dic/findAccountByOrgCode', provinceinfo)
				.then(res => {
					//				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.provinceList = res.data.output
						this.provinceBox = [this.provinceList[0].accCode, this.provinceList[0].accName]
						this.provinceType = this.provinceList[0].accCode;
						this.provinceName = this.provinceList[0].accName;
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
				"code": this.provinceType,
				"orgCode": this.$route.query.cmpCode
			}
			this.$http.post(this.$store.state.link + '/dic/findAccountByOrgCode', cityinfo)
				.then(res => {
					//				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.cityList = res.data.output
						this.cityBox = [this.cityList[0].accCode, this.cityList[0].accName]
						this.cityType = this.cityList[0].accCode;
						this.cityName = this.cityList[0].accName;
					} else {
						Toast(res.data.desc);
					}
				}, res => {
					console.log(res.data);
				})
		},
		bankChange() {
			//  			console.log(this.bankType)
		},
		provinceChange() {
			this.provinceType = this.provinceBox[0]
			this.provinceName = this.provinceBox[1]
			this.city()
		},
		cityChange() {
			this.cityType = this.cityBox[0]
			this.cityName = this.cityBox[1]
		},
		sBoxShowHide() {
			this.sBoxShow = !this.sBoxShow
		},
		handleClickGoPay() {
			if (this.userName == "") {
				Toast("银行账户名字不能为空~")
				return
			} else {
				if (this.userName != this.$route.query.userName) {
					Toast("银行账户名字必须和投保人姓名一致~")
					return
				}
			}
			if (this.bankCardNum == "") {
				Toast("银行卡号不能为空~")
				return
			}
			if (this.sBoxShow == true) {
				Toast("请点击查看《银行自动转账授权声明》~")
				return
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
				"pkgNo": this.$route.query.orderNo,
				"paymentReq": {
					"payMode": "K",//支付方式
					"cardType": "0",//卡or折子
					"accName": this.userName,
					"bankCode": this.bankType,
					"bankName": this.bankName,
					"cityCode": this.cityType,
					"cityName": this.cityName,
					"accNo": this.bankCardNum,
					"provinceCode": this.provinceType,
					"provinceName": this.provinceName,
					"payPrem": this.price,
					"payType": "1",
					"policyDeliveryFee": 0
				}
			}
			Indicator.open();
			console.log(JSON.stringify(saveInfo))
			this.$http.post(this.$store.state.link + '/trd/pay/v1/payment', saveInfo)
				.then(res => {
					console.log(res.data);
					Indicator.close();
					let dataCode = res.data.code;
					let dataPayStatus = res.data.output.code;
					if (dataCode == "SYS_S_000") {
						if (dataPayStatus == this.$store.state.orderState.PAY) {
							this.$router.push('/paySucess')
						} else {
							Toast(res.data.output.message);
							this.$router.push('/payFail?message=' + res.data.output.message)
						}
					} else {
						Toast(res.data.desc);
					}
				}, res => {
					Indicator.close();
					console.log(res.data);
				})
		}
	},
	components: {
		Pdf: Pdf
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
	display: flex;
	flex-direction: column;
	position: absolute;
	background: #F3F3F3;
}

.oneChild {
	flex: 1;
}

.twoCon {
	padding: 0 0.4rem;
	font-size: 0.32rem;
	color: #222222;
	background: #FFFFFF;
	overflow: scroll;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
}

.btnBox {
	position: relative;
	padding-bottom: 0.64rem;
	text-align: center;
}

.btn {
	display: inline-block;
	width: 6.04rem;
	height: 1rem;
	line-height: 1rem;
	border: 0.02rem solid #EB7760;
	box-shadow: inset 0 0.01rem 0.03rem 0 rgba(255, 255, 255, 0.50);
	border-radius: 0.5rem;
	font-size: 0.32rem;
	color: #EB7760;
	text-align: center;
}

.inputGrop1 {
	height: 0.88rem;
	font-size: 0.28rem;
}

.inputGrop {
	position: relative;
	height: 0.88rem;
	font-size: 0.28rem;
	border-bottom: solid 0.01rem #C8C7CC;
}

.inputGropP {
	position: relative;
	height: 0.68rem;
	font-size: 0.28rem;
}

.inputLabel {
	display: inline-block;
	width: 2.5rem;
	height: 0.88rem;
	line-height: 0.88rem;
	font-weight: bold;
	color: #555555;
}

.inputLabel1 {
	height: 0.28rem;
	padding-bottom: 0.3rem;
	font-size: 0.28rem;
	line-height: 0.28rem;
}

.inputSpan {
	display: block;
	width: 4.18rem;
	height: 0.88rem;
	line-height: 0.88rem;
	font-size: 0.28rem;
	color: #333333;
}

.inputText {
	height: 0.88rem;
	font-size: 0.28rem;
	color: #333333;
}

.inputText1 {
	font-size: 0.28rem;
	color: #333333;
}

.selected {
	color: #EB7760;
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
	-webkit-appearance: none;
	-moz-appearance: none;
}

.selImg {
	display: block;
	float: left;
	width: 0.48rem;
	height: 0.48rem;
	margin-top: 0.2rem;
	margin-right: 0.26rem;
}

.sBox {
	padding: 0 0.4rem;
	margin-top: 0.34rem;
	margin-bottom: 2rem;
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

.threeBox {
	padding: 0 0.4rem;
	background: #FFFFFF;
}

.prodName {
	height: 0.88rem;
	padding-top: 0.15rem;
	padding-bottom: 0.05rem;
	line-height: 0.88rem;
	font-size: 0.34rem;
	color: #222222;
	font-weight: bold;
	border-bottom: solid 0.01rem #C8C7CC;
}

.twoCon .inputGrop:last-child {
	border: none;
}

.payTitle {
	height: 0.72rem;
	line-height: 0.72rem;
	padding-right: 0.4rem;
	font-size: 0.28rem;
	color: #EB7760;
	text-align: right;
	background: #F3F3F3;
}

.inputTel {
	width: 2.2rem;
}

.codeBtn {
	height: 0.88rem;
	padding: 0 0.15rem;
	line-height: 0.88rem;
	font-size: 0.3rem;
	color: #EB7760;
}

.inputWidth {
	width: 4.2rem;
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
	top: 0;
	left: 2.7rem;
}

.upDownImg2 {
	top: 0rem;
}

.inputDiv {
	padding: 0.3rem 0;
	border-bottom: solid 0.01rem #C8C7CC;
}

.inputP1 {
	position: relative;
	font-size: 0.28rem;
}

.inputWidth1 {
	width: 3.1rem;
}

.inputWidth2 {
	margin-left: 0.5rem;
}

.ctc_div_mask {
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	background: #000000;
	background: rgba(0, 0, 0, 0.40);
	z-index: 100;
}
</style>