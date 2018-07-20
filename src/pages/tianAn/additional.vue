<template>
	<div class="twoCon">
		<div r class="policyHolder">
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">附加险</label>
				<span class="inputTextRisk left">{{peopledetail.cvrgName}}</span>
				<span @click="deleteAddRisk" class="btnImg">清除</span>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">缴费期间</label>
				<select ref="selectpayRmk" class="inputText inputWidth left select1" @change="Premium" v-model="payPeriodList" disabled="disabled">
					<option :value="[little.payNo,little.payFlag]" v-for="little in peopledetail.payPeriodList">{{little.payRmk}}</option>
				</select>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">保险期间</label>
				<select ref="selectinsuRmk" class="inputText inputWidth left select1" @change="Premium" v-model="insuPeriodList" disabled="disabled">
					<option :value="[little.insuNo,little.insuFlag]" v-for="little in peopledetail.insuPeriodList">{{little.insuRmk}}</option>
				</select>
			</p>
			<p v-if="ifbirthAmtList(peopledetail.birthAmtList)" class="inputGrop clearFloat">
				<label class="inputLabel left">祝寿金领取年龄</label>
				<select ref="selectbirthAmtRmk" class="inputText inputWidth left" @change="Premium" v-model="birthAmtNo">
					<option :value="little.birthAmtNo" v-for="little in peopledetail.birthAmtList">{{little.birthAmtRmk}}</option>
				</select>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">保额(元)</label>
				<input ref="inputs" type="text" class="inputText left" name="text" id="text" placeholder="请在主险保额处输入保额" @change="Premium" @blur="Premium" v-model="amnt" disabled="disabled" />
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">保费(元)</label>
				<span class="inputText1 left">{{yeeFee}}</span>
			</p>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui'
	export default {
		name: "Additional",
		props: ['peopledetail', 'gender1', 'InsuredBr', 'additionalRiskEcho', 'mainCvrgno', 'addIndex','amnt','mainInsuPeriodList','mainPayPeriodList'],
		data() {
			return {
				yeeFee: '',
				payPeriodList: [],
				insuPeriodList: [],
				birthAmtNo: '',
			}
		},
		watch: {
			peopledetail: function(val) { //总数据
				console.log(this.mainPayPeriodList+','+this.mainInsuPeriodList)
				for(var i = 0; i < this.peopledetail.payPeriodList.length; i++) {
					if(this.mainPayPeriodList == this.peopledetail.payPeriodList[i].payNo) {
						this.payPeriodList = [this.peopledetail.payPeriodList[i].payNo, this.peopledetail.payPeriodList[i].payFlag]
					}
				}
				for(var i = 0; i < this.peopledetail.insuPeriodList.length; i++) {
					if(this.mainInsuPeriodList == this.peopledetail.insuPeriodList[i].insuNo) {
						this.insuPeriodList = [this.peopledetail.insuPeriodList[i].insuNo, this.peopledetail.insuPeriodList[i].insuFlag]
					}
				}
				if(this.peopledetail.birthAmtList.length > 0) {
					this.birthAmtNo = this.peopledetail.birthAmtList[0].birthAmtNo;
				}
			},
			mainPayPeriodList:function(val){
				for(var i = 0; i < this.peopledetail.payPeriodList.length; i++) {
					if(val == this.peopledetail.payPeriodList[i].payNo) {
						this.payPeriodList = [this.peopledetail.payPeriodList[i].payNo, this.peopledetail.payPeriodList[i].payFlag]
					}
				}
				if (this.amnt>=10000) {
					this.Premium()
				}
			},
			mainInsuPeriodList:function(val){
				for(var i = 0; i < this.peopledetail.insuPeriodList.length; i++) {
					if(val == this.peopledetail.insuPeriodList[i].insuNo) {
						this.insuPeriodList = [this.peopledetail.insuPeriodList[i].insuNo, this.peopledetail.insuPeriodList[i].insuFlag]
					}
				}
				if (this.amnt>=10000) {
					this.Premium()
				}
			},
			amnt:function(val){
				this.amnt = val
				if (this.amnt>=10000) {
					this.Premium()
				}else{
					this.yeeFee = ""
				}
			}
		},
		created() {
			for(var i = 0; i < this.peopledetail.payPeriodList.length; i++) {
				if(this.mainPayPeriodList == this.peopledetail.payPeriodList[i].payNo) {
					this.payPeriodList = [this.peopledetail.payPeriodList[i].payNo, this.peopledetail.payPeriodList[i].payFlag]
				}
			}
			for(var i = 0; i < this.peopledetail.insuPeriodList.length; i++) {
				if(this.mainInsuPeriodList == this.peopledetail.insuPeriodList[i].insuNo) {
					this.insuPeriodList = [this.peopledetail.insuPeriodList[i].insuNo, this.peopledetail.insuPeriodList[i].insuFlag]
				}
			}
			if(this.peopledetail.birthAmtList.length > 0) {
				this.birthAmtNo = this.peopledetail.birthAmtList[0].birthAmtNo;
			}
			if(!this.addIndex) {
				for(var i = 0; i < this.additionalRiskEcho.length; i++) {
					if(this.additionalRiskEcho[i].cvrgCode == this.peopledetail.cvrgCode) {
						for(var z = 0; z < this.peopledetail.payPeriodList.length; z++) {
							if(this.additionalRiskEcho[i].payNo == this.peopledetail.payPeriodList[z].payNo) {
								this.payPeriodList = [this.peopledetail.payPeriodList[z].payNo, this.peopledetail.payPeriodList[z].payFlag]
							}
						}
//						console.log("==2=" + JSON.stringify(this.additionalRiskEcho))
						this.birthAmtNo = this.additionalRiskEcho[i].receiveYear;
						this.amnt = this.additionalRiskEcho[i].amnt;
						this.yeeFee = this.additionalRiskEcho[i].prem;
					}
				}
			}
			this.Premium()
		},
		methods: {
			aaa() {
				this.$emit('ievent', this.peopledetail);
			},
			bbb() {
				var freqyNo;
				if(this.payPeriodList[0] == "B1") {
					freqyNo = "A"
				} else {
					freqyNo = "B"
				}
				var data = {
					"mainCvrgNo": this.mainCvrgno, //每个险种都要
					"amnt": this.amnt, //保额 
					"prem": this.yeeFee, //保费  
					"cvrgNo": this.peopledetail.cvrgNo,
					"cvrgCode": this.peopledetail.cvrgCode, //险种编码 
					"cvrgName": this.peopledetail.cvrgName, //险种名称  
					"cvrgType": "A", //主附险标志 : M主险；A附加险; 
					"payNo": this.payPeriodList[0], //交费期间编码 
					"payFlag": this.payPeriodList[1],
					"insuNo": this.insuPeriodList[0], //保险期间编码 
					"insuFlag": this.insuPeriodList[1],
					"freqyNo": freqyNo,
					"mult": "", //份数
					//					"fullBonusGetmode": this.birthAmtNo,
					"receiveYear": this.birthAmtNo
				}
				this.$emit('ievent1', data);
			},
			deleteAddRisk() {
				this.$emit('deletId', this.peopledetail);
			},
			ifbirthAmtList(arrList) {
				if(arrList.length == 0) {
					return false;
				} else {
					return true;
				}
			},
			Premium() {
				if(this.amnt != "") {
					var patrn = /^[0-9]*$/;
					if(!patrn.test(this.amnt)) {
						Toast("保额必须为纯数字")
						if(this.peopledetail.cvrgExtInfo.calcPremType == "2") {
							this.yeeFee = "";
							this.peopledetail.yeeFee = ""
						} else if(this.peopledetail.cvrgExtInfo.calcPremType == "1") {
							this.yeeFee = "";
							this.peopledetail.yeeFee = ""
						}
						this.aaa();
						return;
					}
					var data;
					var lifeAmtAge;
					if(this.$refs.selectbirthAmtRmk == undefined || this.$refs.selectbirthAmtRmk == "") {
						lifeAmtAge = "";
					} else {
						lifeAmtAge = this.$refs.selectbirthAmtRmk.value;
					}
					if(this.peopledetail.cvrgExtInfo.calcPremType == "1") { //保费算保额
						data = {
							"list": [{
								"cvrgCode": this.peopledetail.cvrgCode,
								"birthDays": this.InsuredBr,
								"prodId": this.$route.query.prodCode,
								"coverage": 0,
								"age": this.jsGetAge(this.InsuredBr),
								"yearFee": this.amnt,
								"cvrgName": this.peopledetail.cvrgName,
								"sex": this.gender1,
								"year": this.payPeriodList[0],
								"safeGuard": this.insuPeriodList[0],
								"lifeAmtAge": this.birthAmtNo,
								"freqyNo": ""
							}]
						}
					} else if(this.peopledetail.cvrgExtInfo.calcPremType == "2") { //保额算保费
						data = {
							"list": [{
								"cvrgCode": this.peopledetail.cvrgCode,
								"birthDays": this.InsuredBr,
								"prodId": this.$route.query.prodCode,
								"coverage": this.amnt,
								"age": this.jsGetAge(this.InsuredBr),
								"yearFee": 0,
								"cvrgName": this.peopledetail.cvrgName,
								"sex": this.gender1,
								"year": this.payPeriodList[0],
								"safeGuard": this.insuPeriodList[0],
								"lifeAmtAge": this.birthAmtNo,
								"freqyNo": ""
							}]
						}
					}
					console.log("sadas==" + JSON.stringify(data))
					Indicator.open();
					this.$http.post(this.$store.state.link + '/ppt/count/queryCoverageFee', data)
						.then(res => {
							Indicator.close();
							var dataCode = res.data.code;
							if(dataCode == "SYS_S_000") {
								if(this.peopledetail.cvrgExtInfo.calcPremType == "2") {
									this.yeeFee = res.data.output.coverageFeeList[0].yearFee;
									this.peopledetail.yeeFee = res.data.output.coverageFeeList[0].yearFee
								} else if(this.peopledetail.cvrgExtInfo.calcPremType == "1") {
									this.yeeFee = res.data.output.coverageFeeList[0].coverage;
									this.peopledetail.yeeFee = res.data.output.coverageFeeList[0].coverage
								}
								this.aaa();
							} else {
								Toast(res.data.desc);
								if(this.peopledetail.cvrgExtInfo.calcPremType == "2") {
									this.yeeFee = "";
									this.peopledetail.yeeFee = ""
								} else if(this.peopledetail.cvrgExtInfo.calcPremType == "1") {
									this.yeeFee = "";
									this.peopledetail.yeeFee = ""
								}
								this.aaa();
							}
						}, res => {
							Indicator.close();
							console.log(res.data);
						})
				}
			},
			Premium1(sex, InsuredBr) {
				if(this.amnt != "") {
					var patrn = /^[0-9]*$/;
					if(!patrn.test(this.amnt)) {
						return;
					}
					var data;
					var lifeAmtAge;
					if(this.$refs.selectbirthAmtRmk == undefined || this.$refs.selectbirthAmtRmk == "") {
						lifeAmtAge = "";
					} else {
						lifeAmtAge = this.$refs.selectbirthAmtRmk.value;
					}
					if(this.peopledetail.cvrgExtInfo.calcPremType == "1") { //保费算保额
						data = {
							"list": [{
								"cvrgCode": this.peopledetail.cvrgCode,
								"birthDays": InsuredBr,
								"prodId": this.$route.query.prodCode,
								"coverage": 0,
								"age": this.jsGetAge(InsuredBr),
								"yearFee": this.amnt,
								"cvrgName": this.peopledetail.cvrgName,
								"sex": sex,
								"year": this.payPeriodList[0],
								"safeGuard": this.insuPeriodList[0],
								"lifeAmtAge": this.$refs.selectbirthAmtRmk.value,
								"freqyNo": ""
							}]
						}
					} else if(this.peopledetail.cvrgExtInfo.calcPremType == "2") { //保额算保费

						data = {
							"list": [{
								"cvrgCode": this.peopledetail.cvrgCode,
								"birthDays": InsuredBr,
								"prodId": this.$route.query.prodCode,
								"coverage": this.amnt,
								"age": this.jsGetAge(InsuredBr),
								"yearFee": 0,
								"cvrgName": this.peopledetail.cvrgName,
								"sex": sex,
								"year": this.payPeriodList[0],
								"safeGuard": this.insuPeriodList[0],
								"lifeAmtAge": lifeAmtAge,
								"freqyNo": ""
							}]
						}
					}
					console.log("sadas==" + JSON.stringify(data))
					Indicator.open();
					this.$http.post(this.$store.state.link + '/ppt/count/queryCoverageFee', data)
						.then(res => {
							Indicator.close();
							var dataCode = res.data.code;
							if(dataCode == "SYS_S_000") {
								if(this.peopledetail.cvrgExtInfo.calcPremType == "2") {
									this.yeeFee = res.data.output.coverageFeeList[0].yearFee;
									this.peopledetail.yeeFee = res.data.output.coverageFeeList[0].yearFee
								} else if(this.peopledetail.cvrgExtInfo.calcPremType == "1") {
									this.yeeFee = res.data.output.coverageFeeList[0].coverage;
									this.peopledetail.yeeFee = res.data.output.coverageFeeList[0].coverage
								}
								this.aaa();
							} else {
								Toast(res.data.desc);
								if(this.peopledetail.cvrgExtInfo.calcPremType == "2") {
									this.yeeFee = "";
									this.peopledetail.yeeFee = ""
								} else if(this.peopledetail.cvrgExtInfo.calcPremType == "1") {
									this.yeeFee = "";
									this.peopledetail.yeeFee = ""
								}
								this.aaa();
							}
						}, res => {
							Indicator.close();
							console.log(res.data);
						})
				}
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
							if(dayDiff < 0) {
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
	
	.btnImg {
		display: inline-block;
		float: right;
		font-size: 0.32rem;
		font-weight: bold;
		color: #EB7760;
		line-height: 0.88rem;
	}
	
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	
	.twoCon {
		margin-top: 0.4rem;
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
	}
	
	.inputGrop {
		position: relative;
		/*height: 0.88rem;*/
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
	}
	
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
	}
	
	.inputWidth {
		width: 4.66rem;
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
	select.select1 {
		background: none;
		background-size: auto;
	}
	.inputText1 {
		display: block;
		width: 3.6rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
		/*overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;*/
	}
	
	.inputTextRisk {
		display: block;
		width: 3.8rem;
		line-height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
	}
	
	.upDownImg {
		position: absolute;
		right: 0;
		top: 0.22rem;
		z-index: 3;
		width: 0.4rem;
		height: 0.44rem;
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
</style>