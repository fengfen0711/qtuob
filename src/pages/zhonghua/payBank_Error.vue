<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="twoCon">
			<p class="title_twoCon clearFloat">
				<label class="titleLable_twoCon left">银行账户信息</label>
				<!-- <span class="selfTimer" @click="bankClick">试试拍照自动识别</span> -->
			</p>
			<div class="policyHolder">
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left">付款银行</label>
					<select name="name_car" class="left inputText inputWidth" v-model="paycard" @change="paycardxx">
						<option value="q">请选择</option>
						<option :value="item.dicCode" v-for="item in paycardlist">{{item.deptDicName}}</option>
					</select>
				</p>
				<div class="inputGrop1 clearFloat">
					<p class="inputP1 clearFloat">
						<label class="inputLabel left">开户省市</label>
						<!--</p>
						<p class="inputP1 clearFloat">-->
						<select class="left inputText13 inputWidth1 sele" v-model="provicecounty" @change="county">
							<option value="q">请选择</option>
							<option :value="item.cnCode" v-for="item in provicecity">{{item.cnName}}</option>
						</select>
						<select class="left inputText13 inputWidth1 inputWidth2 sele" v-model="countypriy">
							<option value="q">请选择</option>
							<option :value="item.cnCode" v-for="item in countylist">{{item.cnName}}</option>
						</select>
					</p>
				</div>
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left">支付方式</label>
					<select name="name_car" class="left inputText inputWidth" v-model="paycardTypes">
						<option value="q">请选择</option>
						<option :value="item.dicCode" v-for="item in paycardType">{{item.deptDicName}}</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left">银行卡号</label>
					<input type="text" maxlength="23" class="inputTextCard left" placeholder="请输入付款账号" v-model="bankNumber" @input="checknumber" />
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left">持卡人</label>
					<input type="text" class="inputText left" maxlength="20" placeholder="请输入真实姓名" v-model="cardname" readonly="readonly" />
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left">证件类型</label>
					<select name="name_car" class="left inputText inputWidth" v-model="idcard" @change="cardtype">
						<option value="q">请选择</option>
						<option :value="item.dicCode" v-for="item in idcardlist">{{item.dicName}}</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left">证件号码</label>
					<input type="text" class="inputTextCard left" placeholder="请输入证件号码" v-model="cardnum" maxlength="18" v-on:input="cardnumtype" readonly="readonly" />
				</p>
			</div>

		</div>
		<div class="sBox clearFloat " @click="openClick">
			<img src="/static/noSelected.png" class="sImg left" v-if="sBoxShow" />
			<img src="/static/selected.png" class="sImg left" v-if="!sBoxShow" />
			<span class="sDes">请阅读并确认
				<span class="book" style="color: #310000;" @click="authorization">《投保人及被保险人声明与授权》</span>。</span>
		</div>
        <p class="btnBox">
			<span class="btn" @click="handleClickGoPay">确认支付</span>
		</p>
		<!-- <div class="btnBox clearFloat">
			<div class="boxLast" @click="handleClickLast">上一步</div>
			<div class="boxNext" @click="handleClickNext">下一步</div>
		</div> -->

		<!-- <div v-if="!pdfFlag" class="ctc_div_mask">
			<Pdf :pdf="pdf" @pdfClose="pdfClose"></Pdf>
		</div> -->
	</div>
</template>

<script>
	import { Dictionaries } from "../../assets/js/counry.js";
	import { wxShare } from "../../assets/js/wxShare.js";
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	import Pdf from '@/components/pdf.vue'
	export default {
		name: "acc",

		data() {
			return {
				pdf: '',
				pdfFlag: true,
				showPdf: false,
				bankNumber: '6228480402560000', //银行卡
				sBoxShow: true,
				falg: true, //是否查看条款标志
				paycard: "", //付款账号
				paycardlist: [],
				paycardType: [],
				paycardTypes: "",
				idcard: "",
				idcardlist: [],
				cardnum: "",
				cardname: "",
				provicecounty: "",
				provicecity: [], //查询省
				countypriy: "", //市
				countylist: [],
				bankName: "", //银行名称
				provinceName: "",
				cityName: "",
				flage: false, //银行账户
				flage1: false, //开户省市
				flage2: false, //证件类型
				dictionaries: '',
				wxSharedataList: '',
				iphone: '',
				prem: '',
				bannamelist: [], //银行卡数组
				bankName: '' //银行卡名
			}
		},
		watch: {
			wxSharedataList: function(val) {
				//				console.log(JSON.parse(localStorage.wxSharedataList).appId)
				//				console.log(JSON.parse(localStorage.wxSharedataList).nonceStr)
				//				console.log(JSON.parse(localStorage.wxSharedataList).timestamp)
				//				console.log(JSON.parse(localStorage.wxSharedataList).signature)
				//				console.log(localStorage.wxSharedataList)
			}
		},
		created() {
			var a = JSON.parse(localStorage.dataList)
			console.log(a)
			if(a != undefined) {
				this.dictionaries = JSON.parse(localStorage.dataList)

				console.log(this.dictionaries)
			} else {
				var _this = this
				Dictionaries().then((res) => {
					_this.dictionaries = res
				})
			}
			this.checknumber(); //写死账号需要执行方法 后期删掉即可
			this.provice();
			if(this.$route.query.status == "1") {
				this.bankNumber = this.$route.query.cardNo;

			}

			this.datadictionary(); //数据字典
		},
		methods: {
			//PDF预览
			authorization() {
				var data = [{
					"tmId": "TM0009"
				}]
				console.log("请求==" + JSON.stringify(data))
				this.$http.post(this.$store.state.link + '/css/css/queryTemplateByTmIdList', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.pdf = res.data.output[0].tmFmsUrl;
							this.pdfFlag = false
							console.log("响应==" + JSON.stringify(res.data.output))
						} else {
							console.log("响应1==" + JSON.stringify(res.data))
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			pdfClose(...data) {
				this.pdfFlag = data[0]
			},
			datadictionary() {
				this.paycardlist = this.dictionaries.bankCode.codeList;
				this.paycard = "q"
				for(let i = 0; i < this.paycardlist.length; i++) {
					if(this.paycard == this.paycardlist[i].dicCode) {
						this.bankName = this.paycardlist[i].dicName
					}
				}
				this.paycardType = this.dictionaries.payMode.codeList;
				this.paycardTypes = "q"
				this.idcardlist = this.dictionaries.certfType.codeList;
				this.idcard = "q"

				this.init();

			},
			init() {
				var data = {
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode
					},
					"opt": "APPL,PAY,CVRG",
					"pkgNo": this.$route.query.orderNo, //订单号
				}
				console.log(JSON.stringify(data));
				this.$http.post(this.$store.state.link5 + '/trd/order/v1/queryorder', data)
					.then(res => {
						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.provice();
							this.allData = res.data.output;
							if(res.data.output.paymentResp.accNo != undefined) {
								this.bankNumber = res.data.output.paymentResp.accNo.replace(/\s/g, "").replace(/(\d{4})(?=\d)/g, "$1 "); //银行卡号
							}
							// this.bankName = res.data.output.paymentResp.bankName;
							this.cardname = res.data.output.applntResp.applName; //姓名
							// this.prem = res.data.output.cvrgResp[0].prem; //支付金额
							// this.iphone = res.data.output.applntResp.mobile; //手机号
							this.cardnum = res.data.output.applntResp.certfCode; //身份证号码
							// if(res.data.output.paymentResp.bankCode != undefined) {
							// 	this.paycard = res.data.output.paymentResp.bankCode; //付款银行
							// } else {
							// 	this.paycard = "q"
							// }
							// if(res.data.output.paymentResp.payMode != undefined) {
							// 	this.paycardTypes = res.data.output.paymentResp.payMode; //支付方式
							// } else {
							// 	this.paycardTypes = "q"
							// }

							// if(res.data.output.paymentResp.provinceCode != undefined) {
							// 	this.provicecounty = res.data.output.paymentResp.provinceCode; //开户省
							// } else {
							// 	this.provicecounty = "q"
							// }

							// this.countypriy = res.data.output.paymentResp.cityCode; //开户市
							//								this.county();
							if(res.data.output.applntResp.certfType != undefined) {
								this.idcard = res.data.output.applntResp.certfType; //证件类型
							} else {
								this.idcard = "q"
							}
						}

					}, res => {
						console.log(res.data);
					})
			},
			//省市
			provice() {
				var data = {
					"code": "0",
					"orgCode": "000034",
				}
				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data).then(res => {
					Indicator.close();
					var dataCode = res.data.code;

					if(dataCode == "SYS_S_000") {
						this.provicecity = res.data.output
						if(this.provicecounty == "") {
							this.provicecounty = "q";
						} else {
							for(var i = 0; i < this.provicecity.length; i++) {
								if(this.provicecounty == res.data.output[i].cnCode) {
									this.provicecounty = res.data.output[i].cnCode
									this.county();
								}
							}

						}

					} else {
						Toast(res.data.desc);
					}
				}, res => {
					Indicator.close();
					console.log(res.data);
				})
			},
			county() {

				var data = {
					"code": this.provicecounty,
					"orgCode": "000034",
				}
				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data).then(res => {
					Indicator.close();
					var dataCode = res.data.code;
					console.log(res.data)
					if(dataCode == "SYS_S_000") {
						this.countylist = res.data.output
						console.log(this.countypriy);
						if(this.countypriy == undefined || this.countypriy == "") {
							this.countypriy = "q"
						} else {
							for(var i = 0; i < this.countylist.length; i++) {
								if(this.countypriy == res.data.output[i].cnCode) {
									this.countypriy = res.data.output[i].cnCode
									this.cityName = res.data.output[i].cnName
								}

							}
						}

					} else {
						Toast(res.data.desc);
					}
				}, res => {
					Indicator.close();
					console.log(res.data);
				})
			},
			//银行卡输入规则
			checknumber() {
				this.bankNumber = this.bankNumber.replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
			},
			//已经阅读
			openClick() {
				this.sBoxShow = !this.sBoxShow;
				this.falg = false;
			},
			bankClick() {
				this.$router.push('faceAcc?prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode);
			},
			//上一步
			// handleClickLast() {
			// 	//				this.$router.push('healthTold');
			// 	window.history.go(-1)
			// },
			//下一步
			handleClickGoPay() {
				var re = /[^\u4e00-\u9fa5]/; //姓名校验
				var num = /^\d*$/; //全数字
				var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
				if(this.paycard == "q") {
					Toast("请选择付款银行");
				} else if(this.provicecounty == "q") {
					Toast("请选择省");
				} else if(this.countypriy == "q") {
					Toast("请选择市");
				} else if(this.paycardTypes == "q") {
					Toast("请选择支付方式");
				} else if(this.bankNumber == "") {
					Toast("请填写银行卡号");
				} else if(this.bankNumber.replace(/\s/g, "").length < 16 || this.bankNumber.replace(/\s/g, "").length > 19) {
					Toast("银行卡号长度必须在16到19之间");
					return;
				}
				//				else if(!num.exec(this.bankNumber)) {
				//					Toast("银行卡号必须是纯数字");
				//				}
				else if(strBin.indexOf(this.bankNumber.substring(0, 2)) == -1) {
					Toast("银行卡号开头6位不符合规范");
				} else if(this.cardname.length <= 1) {
					Toast("持卡人姓名格式不正确");
				} else if(re.test(this.cardname)) {
					Toast("持卡人姓名必须为纯中文");
				} else if(this.idcard == "q") {
					Toast("请选择证件类型");
				} else if(this.cardnum == "") {
					Toast("证件号码不能为空");
				} else if(this.falg == true) {
					Toast("请先勾选声明与授权协议书");
				} else {

					this.cardnumtype();
					var data = {
						"head": {
							"channelCode": "qtb_h5",
							"deptCode": this.$route.query.cmpCode,
							"oprCode": this.$store.state.userId,
							"prodCode": this.$route.query.prodCode
						},
						"userId": this.$store.state.userId,
						"token": this.$store.state.token,
						"opt": "PAY",
						"paymentReq": {
							"accName": this.cardname,
							"accNo": this.bankNumber.replace(/\s/g, ""),
							"bankCode": this.paycard,
							"certfCode": this.cardnum,
							"certfType": this.idcard,
							"cityCode": this.countypriy,
							"payMode": this.paycardTypes, //支付方式
							"mark": "1",
							"provinceCode": this.provicecounty,
							"payType": "1",
							"mobile": this.iphone,
							"payPrem": this.prem,
                            "bankName": this.bankName,
                            "cardType": "0",
                            "policyDeliveryFee": 0
						},
						"mark": "UC",
						"pkgNo": this.$route.query.orderNo,
					}
					console.log("121212" + JSON.stringify(data));
					Indicator.open();
					this.$http.post(this.$store.state.link5 + '/trd/pay/v1/payment', data).then(res => {
                        console.log(res.data);
						Indicator.close();
						let dataCode = res.data.code;
                        let dataPayStatus = res.data.output.code;
                        if (dataCode == "SYS_S_000") {
                            if (dataPayStatus == this.$store.state.orderState.PAY) {
                                this.$router.push('/informationupload?payType=Y&message=' + res.data.output.message+'&prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode);
                            } else {
                                Toast(res.data.output.message);
                                this.$router.push('/feedbackpayment?payType=N&message=' + res.data.output.message+'&prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode);
                            }
                        } else {
                            Toast(res.data.desc);
                        }
                        // this.$router.push('/informationupload?prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode);
					}, res => {
						Indicator.close();
						console.log(res.data);
					})
					//					
				}

			},
			paycardxx() {
				for(var i = 0; i < this.paycardlist.length; i++) {
					if(this.paycard == this.paycardlist[i].dicCode) {
						this.bankName = this.paycardlist[i].dicName
					}
				}
			},
			cardtype() {
				alert(this.idcard)
				console.log(this.idcard)
			},

			cardnumtype() {
				if(this.cardnum.length >= 18) {
					if(this.idcard == "A" || this.idcard == "B" || this.idcard == "C") {
						var data = {
							"idcard": this.cardnum,
							"idtype": this.idcard,
							"userId": this.$store.state.userId,
							"token": this.$store.state.token,
						}
						console.log(data)
						Indicator.open();
						this.$http.post(this.$store.state.link + '/cut/cut/validIDCard', data).then(response => {
							Indicator.close();
							console.log(response.data);
							if(response.data.code == "SYS_S_000") {
								if(response.data.output.valid == true) {

								} else {
									Toast("证件号码不合法");
								}
							} else {

							}
						}, response => {
							Indicator.close();
							console.log("ajax error");
						});
					}
				}
			},

			//付款银行
			//			paymentcard() {
			//				var data = {
			//					"": ""
			//				}
			//				Indicator.open();
			//				this.$http.post(this.$store.state.link + '/dic/findBank', data)
			//					.then(res => {
			//						Indicator.close();
			//						if(res.data.code == "SYS_S_000") {
			//							this.paycardlist = res.data.output;
			//							this.paycard = "q"
			//							if(this.$route.query.status == "1") {
			//								for(var i = 0; i < this.paycardlist.length; i++) {
			//									if(this.paycardlist[i].bankName == this.$route.query.bankName) {
			//										this.paycard = this.paycardlist[i].pkBankId;
			//										this.bankName = this.paycardlist[i].bankName
			//										this.flage=true
			//										
			//									}
			//								}
			//							}
			//						}
			//					}, res => {
			//						Indicator.close();
			//						console.log("==2" + res.data);
			//					})
			//			},
		},
		components: {
			Pdf: Pdf
		}
	}
</script>

<style scoped="scoped">
	.ctc_div_mask {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #c9141e;
		background: rgba(0, 0, 0, 0.40);
		z-index: 10;
	}
	
	.left {
		float: left;
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
	
	.one {
		width: 100%;
		min-height: 100%;
		position: absolute;
		background: #F3F3F3;
	}
	
	.start {
		display: block;
		height: 0.88rem;
		line-height: 0.88rem;
		color: red;
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
	
	.titleLable_twoCon {
		display: inline-block;
		font-size: 0.34rem;
		font-weight: bold;
		color: #222222;
	}
	
	.btnImg {
		display: inline-block;
		width: 0.56rem;
		height: 0.56rem;
		margin-top: 0.275rem;
	}
	
	.btnBox1 {
		position: absolute;
		left: 0;
		bottom: 0.64rem;
		padding-bottom: 0;
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
	
	.inputGrop {
		position: relative;
		height: 0.88rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	
	.inputLabel3 {
		display: block;
		width: 2.3rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		/*background: #669900;*/
	}
	
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
		padding-left: 0;
	}
	
	.inputTextCard {
		width: 3rem;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
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
		color: #666666;
		padding-left: 0;
	}
	
	..inputText13 {
		font-size: 0.28rem;
		color: #666666;
	}
	
	.inputWidth {
		width: 4.4rem;
	}
	
	.inputselect {
		height: 0.68rem;
	}
	
	.twoCon .inputGrop:last-child {
		border: none;
		line-height: 0.88rem;
	}
	
	.sex {
		margin-left: 1rem;
	}
	
    .btnBox {
        position: relative;
        padding-bottom: 0.64rem;
        text-align: center;
        padding-top: 1.5rem;
    }   

	.boxLast {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #c9141e;
		letter-spacing: 0;
		border: 0.01rem solid #c9141e;
		border-radius: .44rem;
		float: left;
		margin-right: 0.3rem;
	}
	
	.boxNext {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #fff;
		background: #c9141e;
		letter-spacing: 0;
		/*border:0.01rem solid #c9141e;*/
		border-radius: .44rem;
		float: right;
	}
	
	.selfTimer {
		font-size: 0.28rem;
		color: #EB7760;
		letter-spacing: 0;
		line-height: 0.44rem;
		margin-left: 0.2rem;
	}
	
	.inputGrop1 {
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	
	.inputLabel {
		display: block;
		width: 2.04rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		/*background: #669900;*/
	}
	
	.inputP1 {
		/*position: relative;*/
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.28rem;
	}
	
	.inputWidth1 {
		/*padding-left: 0.65rem;*/
		/*	color: #EB7760;*/
		width: 2rem;
		height: 0.88rem;
		margin-left: 0.16rem;
	}
	
	.inputWidth2 {
		margin-left: 0.5rem;
	}
	
	.sBox {
		/*padding: 0 0.4rem;*/
		margin-top: 0.34rem;
		margin-left: 0.4rem;
		margin-bottom: 0.44rem;
		font-size: 0.28rem;
		line-height: 0.4rem;
	}
	
	.sImg {
		display: block;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: -0.04rem;
	}
	
	.book {
		font-size: 0.28rem;
		letter-spacing: 0;
		line-height: 0.4rem;
	}
</style>