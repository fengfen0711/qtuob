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
				<!--select1-->
				<select ref="selectpayRmk" class="inputText inputWidth left " @change="Premium('10')" v-model="payPeriodList" :disabled="riskDis">
					<option :value="[little.payNo,little.payFlag]" v-for="little in peopledetail.payPeriodList">{{little.payRmk}}</option>
				</select>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">保险期间</label>
				<select ref="selectinsuRmk" class="inputText inputWidth left" @change="Premium('9')" v-model="insuPeriodList">
					<option :value="[little.insuNo,little.insuFlag]" v-for="little in peopledetail.insuPeriodList">{{little.insuRmk}}</option>
				</select>
			</p>
			<p v-if="ifbirthAmtList(peopledetail.birthAmtList)" class="inputGrop clearFloat">
				<label class="inputLabel left">祝寿金领取年龄</label>
				<select ref="selectbirthAmtRmk" class="inputText inputWidth left" @change="Premium('8')" v-model="birthAmtNo">
					<option :value="little.birthAmtNo" v-for="little in peopledetail.birthAmtList">{{little.birthAmtRmk}}</option>
				</select>
			</p>
			<p v-if="edu" class="inputGrop clearFloat">
				<!--<label class="inputLabel left">基本保险金额(元)</label>-->
				<label class="inputLabel left">{{peopledetail.cvrgCode | filAmntTitle}}</label>
				<input ref="inputs" type="text" class="inputText inputWidth left" name="text" id="text" :placeholder="peopledetail.cvrgCode | filAmnt" @blur="Premium('7')" v-model="addamnt" :disabled="riskAmnt" />
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
		props: ['peopledetail', 'gender', 'gender1', 'InsureBr', 'InsuredBr', 'additionalRiskEcho', 'mainCvrgno', 'addIndex', 'amnt', 'mainInsuPeriodList', 'mainPayPeriodList', 'mainYearFee', 'nexusType'],
		data() {
			return {
				addamnt: '',
				riskAmnt: true,
				riskDis: true,
				yeeFee: '',
				payPeriodList: [],
				insuPeriodList: [],
				birthAmtNo: '',
				edu: true,
				stateYearF: this.$store.state.yearF,
				addMainPayPeriodList: ''
			}
		},
		computed: {
			//			amnt: {
			//				get: function() {
			//				},
			//				set: function(value) {
			//				}
			//			}
		},
		filters: {
			filAmnt: function(value) {
				if(value == "C000034010290") { //费用医疗
					return '请输入基本保险金额'
				} else if(value == "C000034010291") { //费用医疗
					return '请输入份数'
				} else {
					return '请在主险基本保险金额处输入基本保险金额'
				}
			},
			filAmntTitle: function(value) {
				if(value == "C000034010291") { //津贴医疗
					return '份数'
				} else {
					return '基本保险金额(元)'
				}
			},
			//			editAmnt: function(value) {
			//				if(value == "C000034010290") {
			//					return value
			//				} else {
			//					return value
			//				}
			//			}
		},
		created() {
			if(this.peopledetail.cvrgCode == "C000034000114" || this.peopledetail.cvrgCode == "C000034010290" || this.peopledetail.cvrgCode == "C000034010291") {
				if(this.peopledetail.cvrgCode == "C000034000114") {
					this.addamnt = this.$store.state.yearF
				}

			} else {
				this.addamnt = this.amnt;
			}

			if(this.peopledetail.cvrgCode == "C000034010290" || this.peopledetail.cvrgCode == "C000034010291") {
				this.riskDis = false;
				this.riskAmnt = false;
			} else {
				this.riskDis = true;
				this.riskAmnt = true;
			}
			if(this.peopledetail.cvrgCode == "C000034000114") {
				this.edu = false
				if(this.mainPayPeriodList.indexOf("C") != "-1") {
					if(this.mainPayPeriodList.substr(1, this.mainPayPeriodList.length) == 3) {
						this.payPeriodList = [this.peopledetail.payPeriodList[0].payNo, this.peopledetail.payPeriodList[0].payFlag]
					} else {
						var substrNumber = parseInt(this.mainPayPeriodList.substr(1, this.mainPayPeriodList.length)) - 1;
						var substrNumber1 = "C" + substrNumber.toString();
						for(var i = 0; i < this.peopledetail.payPeriodList.length; i++) {
							if(substrNumber1 == this.peopledetail.payPeriodList[i].payNo) {
								this.payPeriodList = [this.peopledetail.payPeriodList[i].payNo, this.peopledetail.payPeriodList[i].payFlag]
							}
						}
					}
				} else {
					this.payPeriodList = [this.peopledetail.payPeriodList[0].payNo, this.peopledetail.payPeriodList[0].payFlag]
				}
			} else if(this.peopledetail.cvrgCode == "C000034010290" || this.peopledetail.cvrgCode == "C000034010291") { //住院费用医疗保险
				this.payPeriodList = [this.peopledetail.payPeriodList[0].payNo, this.peopledetail.payPeriodList[0].payFlag]

			} else {

				for(var i = 0; i < this.peopledetail.payPeriodList.length; i++) {
					if(this.mainPayPeriodList == this.peopledetail.payPeriodList[i].payNo) {
						this.payPeriodList = [this.peopledetail.payPeriodList[i].payNo, this.peopledetail.payPeriodList[i].payFlag]
					}
				}
			}

			if(this.peopledetail.cvrgCode == "C000034010308") {
				for(var i = 0; i < this.peopledetail.insuPeriodList.length; i++) {
					this.insuPeriodList = [this.peopledetail.insuPeriodList[i].insuNo, this.peopledetail.insuPeriodList[i].insuFlag]
				}
			} else if(this.peopledetail.cvrgCode == "C000034010290" || this.peopledetail.cvrgCode == "C000034010291") { //住院费用医疗保险
				this.insuPeriodList = [this.peopledetail.insuPeriodList[0].insuNo, this.peopledetail.insuPeriodList[0].insuFlag]
			} else {
				for(var i = 0; i < this.peopledetail.insuPeriodList.length; i++) {
					if(this.mainInsuPeriodList == this.peopledetail.insuPeriodList[i].insuNo) {
						this.insuPeriodList = [this.peopledetail.insuPeriodList[i].insuNo, this.peopledetail.insuPeriodList[i].insuFlag]
					}
				}
			}
			if(this.peopledetail.birthAmtList.length > 0) {
				this.birthAmtNo = this.peopledetail.birthAmtList[0].birthAmtNo;
			}
			if(!this.addIndex) {
				for(var i = 0; i < this.additionalRiskEcho.length; i++) {
					//					console.log("测试====" + JSON.stringify(this.additionalRiskEcho[i]))
					if(this.additionalRiskEcho[i].cvrgCode == this.peopledetail.cvrgCode) {
						for(var z = 0; z < this.peopledetail.payPeriodList.length; z++) {
							if(this.additionalRiskEcho[i].payNo == this.peopledetail.payPeriodList[z].payNo) {
								this.payPeriodList = [this.peopledetail.payPeriodList[z].payNo, this.peopledetail.payPeriodList[z].payFlag]
							}
							//							if(this.additionalRiskEcho[i].insuNo == this.peopledetail.payPeriodList[z].insuNo) {
							this.insuPeriodList = [this.additionalRiskEcho[i].insuNo, this.additionalRiskEcho[i].insuFlag]
							//							}
						}
						//						console.log("==2=" + JSON.stringify(this.additionalRiskEcho))
						this.birthAmtNo = this.additionalRiskEcho[i].receiveYear;
						this.addamnt = this.additionalRiskEcho[i].amnt;
						this.yeeFee = this.additionalRiskEcho[i].prem;
					}
				}
			}
			this.Premium("1")
		},
		updated() {},
		watch: {
			peopledetail: function(val) { //总数据
				//				console.log(this.mainPayPeriodList+','+this.mainInsuPeriodList)
				//				if(this.peopledetail.cvrgName == "附加投保人豁免保险费 C 款重大疾病保险") {
				if(this.peopledetail.cvrgCode == "C000034000114") {
					this.edu = false
					//					for(var i = 0; i < this.peopledetail.payPeriodList.length; i++) {
					//						this.payPeriodList = [this.peopledetail.payPeriodList[i].payNo, this.peopledetail.payPeriodList[i].payFlag]
					//					}
					if(this.mainPayPeriodList.indexOf("C") != "-1") {
						if(this.mainPayPeriodList.substr(1, this.mainPayPeriodList.length) == 3) {
							this.payPeriodList = [this.peopledetail.payPeriodList[0].payNo, this.peopledetail.payPeriodList[0].payFlag]
						} else {
							var substrNumber = parseInt(this.mainPayPeriodList.substr(1, this.mainPayPeriodList.length)) - 1;
							var substrNumber1 = "C" + substrNumber.toString();
							for(var i = 0; i < this.peopledetail.payPeriodList.length; i++) {
								if(substrNumber1 == this.peopledetail.payPeriodList[i].payNo) {
									this.payPeriodList = [this.peopledetail.payPeriodList[i].payNo, this.peopledetail.payPeriodList[i].payFlag]
								}
							}
						}
					} else {
						this.payPeriodList = [this.peopledetail.payPeriodList[0].payNo, this.peopledetail.payPeriodList[0].payFlag]
					}
					//					console.log("====期间2===" + JSON.stringify(this.payPeriodList))
				} else {
					for(var i = 0; i < this.peopledetail.payPeriodList.length; i++) {
						if(this.mainPayPeriodList == this.peopledetail.payPeriodList[i].payNo) {
							this.payPeriodList = [this.peopledetail.payPeriodList[i].payNo, this.peopledetail.payPeriodList[i].payFlag]
						}
					}
				}
				//				if(this.peopledetail.cvrgName == "天安人寿附加健康源（悦享）两全保险") {
				if(this.peopledetail.cvrgCode == "C000034010308") {
					for(var i = 0; i < this.peopledetail.insuPeriodList.length; i++) {
						this.insuPeriodList = [this.peopledetail.insuPeriodList[i].insuNo, this.peopledetail.insuPeriodList[i].insuFlag]
					}
				} else {
					for(var i = 0; i < this.peopledetail.insuPeriodList.length; i++) {
						if(this.mainInsuPeriodList == this.peopledetail.insuPeriodList[i].insuNo) {
							this.insuPeriodList = [this.peopledetail.insuPeriodList[i].insuNo, this.peopledetail.insuPeriodList[i].insuFlag]
						}
					}
				}
				if(this.peopledetail.birthAmtList.length > 0) {
					this.birthAmtNo = this.peopledetail.birthAmtList[0].birthAmtNo;
				}
				this.Premium('2')
			},
			mainPayPeriodList: function(val) {
				this.addMainPayPeriodList = val;
				for(var i = 0; i < this.peopledetail.payPeriodList.length; i++) {
					if(val == this.peopledetail.payPeriodList[i].payNo) {
						this.payPeriodList = [this.peopledetail.payPeriodList[i].payNo, this.peopledetail.payPeriodList[i].payFlag]
					}
					//					if(this.peopledetail.cvrgName == "附加投保人豁免保险费 C 款重大疾病保险") {
					if(this.peopledetail.cvrgCode == "C000034000114") {
						if(val.indexOf("C") != "-1") {
							if(val.substr(1, val.length) == 3) {} else {
								var substrNumber = parseInt(val.substr(1, val.length)) - 1;
								var substrNumber1 = "C" + substrNumber.toString();
								if(substrNumber1 == this.peopledetail.payPeriodList[i].payNo) {
									this.payPeriodList = [this.peopledetail.payPeriodList[i].payNo, this.peopledetail.payPeriodList[i].payFlag]
								}
							}
						} else {
							this.payPeriodList = [this.peopledetail.payPeriodList[0].payNo, this.peopledetail.payPeriodList[0].payFlag]
						}
					}
				}
			},
			mainInsuPeriodList: function(val) {
				for(var i = 0; i < this.peopledetail.insuPeriodList.length; i++) {
					if(val == this.peopledetail.insuPeriodList[i].insuNo) {
						this.insuPeriodList = [this.peopledetail.insuPeriodList[i].insuNo, this.peopledetail.insuPeriodList[i].insuFlag]
					}
				}
				//				if(this.amnt >= 10000) {
				this.Premium('3')
				//				}
			},
			amnt: function(val) {

				//				this.addamnt = val;
				if(this.peopledetail.cvrgCode == "C000034010290" || this.peopledetail.cvrgCode == "C000034010291") {
					//					this.amnt = ""
				} else {
					this.addamnt = val;
				}
			},
			stateYearF: function(val) {
				if(this.peopledetail.cvrgCode == "C000034010290" || this.peopledetail.cvrgCode == "C000034010291") {} else {
					this.Premium('4')
				}

			},
			nexusType: function(val) {
				this.Premium('12');
			}
		},
		methods: {
			calculationAllFee() {
				this.$emit('ievent', this.peopledetail);
			},
			bulerFee() {
				if(this.peopledetail.cvrgCode == "C000034010290" || this.peopledetail.cvrgCode == "C000034010291") {

				} else {
					this.Premium('5')
				}

			},
			checkAddData() {
				var freqyNo;
				if(this.payPeriodList[0] == "B1") {
					freqyNo = "A"
				} else {
					freqyNo = "B"
				}
				var addmult = "";
				if(this.peopledetail.cvrgCode == "C000034010291") {
					addmult = this.addamnt;
				}
				var data = {
					"mainCvrgNo": this.mainCvrgno, //每个险种都要
					"cvrgShortName": this.peopledetail.cvrgShortName,
					"amnt": this.addamnt, //基本保险金额 
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
					"mult": addmult, //份数
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
			Premium(index) {
//				console.log("1====1=1==1==" + index)
				if(index == "6") {
					if(this.peopledetail.cvrgCode == "C000034010290" || this.peopledetail.cvrgCode == "C000034010291") {
						return;
					}
				}
				if(!this.edu) {
					if(this.nexusType == "00") {
						this.yeeFee = "";
						return;
					}
					//					if(this.peopledetail.cvrgName == "天安人寿附加投保人豁免保险费C款重大疾病保险") {
					if(this.peopledetail.cvrgCode == "C000034000114") {
						if(this.addMainPayPeriodList == "B1" || this.addMainPayPeriodList == "C3") {
							this.yeeFee = "";
							return;
						}
						if(this.mainPayPeriodList == "B1" || this.mainPayPeriodList == "C3") {
							this.yeeFee = "";
							return;
						}
					}
				}
				if(this.addamnt != "") {
					//					var patrn = /^[0-9]*$/;
					var patrn = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/; //金额
					if(this.peopledetail.cvrgCode == "C000034010291") { //份数只能是整数
						var patrninteger = /^[0-9]*$/; //整数
						if(!patrninteger.test(this.addamnt)) {
							Toast("份数必须为整数")
							return;
						}
					}
					if(!patrn.test(this.addamnt)) {
						console.log("===基本保险金额" + this.addamnt)
						Toast("基本保险金额必须为纯数字")
						if(this.peopledetail.cvrgExtInfo.calcPremType == "2") {
							this.yeeFee = "";
							this.peopledetail.yeeFee = ""
						} else if(this.peopledetail.cvrgExtInfo.calcPremType == "1") {
							this.yeeFee = "";
							this.peopledetail.yeeFee = ""
						}
						this.calculationAllFee();
						return;
					}
					var addYLFlag = true;
					if(this.peopledetail.cvrgCode == "C000034010290") {
						if(this.addamnt > 50000 || this.addamnt < 10000 || this.addamnt % 1000 != 0 || this.amnt / 2 < this.addamnt) {
							addYLFlag = false;
							this.$emit('addAllRiskCheck', "C000034010290");
						}
					}
					if(addYLFlag == false) {
						return;
					}
					var data;
					var lifeAmtAge;
					if(this.$refs.selectbirthAmtRmk == undefined || this.$refs.selectbirthAmtRmk == "") {
						lifeAmtAge = "";
					} else {
						lifeAmtAge = this.$refs.selectbirthAmtRmk.value;
					}
					var mult = 0;
					if(this.peopledetail.cvrgCode == "C000034010291") {
						mult = this.addamnt;
					}
					var sexadd = this.gender1;
					if(this.peopledetail.cvrgCode == "C000034010290" || this.peopledetail.cvrgCode == "C000034010291") {
						var sexadd = "";
					}
					if(this.peopledetail.cvrgCode == "C000034000114") {
						sexadd = this.gender;
					}
					if(this.edu) {

						if(this.peopledetail.cvrgExtInfo.calcPremType == "1") { //保费算基本保险金额

							data = {
								"list": [{
									"cvrgCode": this.peopledetail.cvrgCode,
									"birthDays": this.InsuredBr,
									"prodId": this.$route.query.prodCode,
									"coverage": 0,
									"age": this.jsGetAge(this.InsuredBr),
									"yearFee": this.addamnt,
									"cvrgName": this.peopledetail.cvrgName,
									"sex": sexadd,
									"year": this.payPeriodList[0],
									"safeGuard": this.insuPeriodList[0],
									"lifeAmtAge": this.birthAmtNo,
									"freqyNo": "",
									"mult": mult,
									"mainFee": this.mainYearFee,
									"mainCoverage": this.amnt,
									"isWho": this.nexusType
								}]
							}
						} else if(this.peopledetail.cvrgExtInfo.calcPremType == "2") { //基本保险金额算保费

							data = {
								"list": [{
									"cvrgCode": this.peopledetail.cvrgCode,
									"birthDays": this.InsuredBr,
									"prodId": this.$route.query.prodCode,
									"coverage": this.addamnt,
									"age": this.jsGetAge(this.InsuredBr),
									"yearFee": 0,
									"cvrgName": this.peopledetail.cvrgName,
									"sex": sexadd,
									"year": this.payPeriodList[0],
									"safeGuard": this.insuPeriodList[0],
									"lifeAmtAge": this.birthAmtNo,
									"freqyNo": "",
									"mult": mult,
									"mainFee": this.mainYearFee,
									"mainCoverage": this.amnt,
									"isWho": this.nexusType
								}]
							}
						}
					} else {
						//						console.log(this.peopledetail.cvrgExtInfo.calcPremType)
						//						if(this.peopledetail.cvrgExtInfo.calcPremType == "1") { //保费算基本保险金额
						//													console.log('s')

						//						console.log("总费==" + JSON.stringify(this.additionalRiskEcho))
						//						var hmMoneyadd = 0
						//						for(var z = 0; z < this.additionalRiskEcho.length; z++) {
						//							if(this.additionalRiskEcho[z].cvrgCode == "C000034010308") {
						//								hmMoneyadd = this.additionalRiskEcho[z].prem;
						//							}
						//						}
						data = {
							"list": [{
								"cvrgCode": this.peopledetail.cvrgCode,
								"birthDays": this.InsureBr,
								"prodId": this.$route.query.prodCode,
								"coverage": this.$store.state.yearF,
								"age": this.jsGetAge(this.InsureBr),
								"yearFee": 0,
								"cvrgName": this.peopledetail.cvrgName,
								"sex": sexadd,
								"year": this.payPeriodList[0],
								"safeGuard": this.insuPeriodList[0],
								"lifeAmtAge": this.birthAmtNo,
								"freqyNo": "",
								"mult": mult,
								"mainFee": this.mainYearFee,
								"mainCoverage": this.amnt,
								"isWho": this.nexusType
							}]
						}
						console.log("豁免C===" + JSON.stringify(data))
						//						} else if(this.peopledetail.cvrgExtInfo.calcPremType == "2") { //基本保险金额算保费
						//							console.log('m')
						//							data = {
						//								"list": [{
						//									"cvrgCode": this.peopledetail.cvrgCode,
						//									"birthDays": this.InsureBr,
						//									"prodId": this.$route.query.prodCode,
						//									"coverage": 0,
						//									"age": this.jsGetAge(this.InsureBr),
						//									"yearFee": this.$store.state.yearF,
						//									"cvrgName": this.peopledetail.cvrgName,
						//									"sex": this.gender,
						//									"year": this.payPeriodList[0],
						//									"safeGuard": this.insuPeriodList[0],
						//									"lifeAmtAge": this.birthAmtNo,
						//									"freqyNo": ""
						//								}]
						//							}
						//						}
					}

					//					console.log("saas1==" + JSON.stringify(data))
					Indicator.open();
					this.$http.post(this.$store.state.link + '/ppt/count/queryCoverageFee', data)
						.then(res => {
							Indicator.close();
							var dataCode = res.data.code;
							if(dataCode == "SYS_S_000") {
								console.log("算费回来的数据" + JSON.stringify(res.data.output))
								console.log(res.data.output.coverageFeeList[0].yearFee)
								if(this.edu) {
									if(this.peopledetail.cvrgExtInfo.calcPremType == "2") {
										this.yeeFee = res.data.output.coverageFeeList[0].yearFee;
										this.peopledetail.yeeFee = res.data.output.coverageFeeList[0].yearFee
									} else if(this.peopledetail.cvrgExtInfo.calcPremType == "1") {
										this.yeeFee = res.data.output.coverageFeeList[0].coverage;
										this.peopledetail.yeeFee = res.data.output.coverageFeeList[0].coverage
									}
								} else {
									this.yeeFee = res.data.output.coverageFeeList[0].yearFee;
									this.peopledetail.yeeFee = res.data.output.coverageFeeList[0].yearFee
									//									if(this.peopledetail.cvrgExtInfo.calcPremType == "2") {
									//										this.yeeFee = res.data.output.coverageFeeList[0].yearFee;
									//										this.peopledetail.yeeFee = res.data.output.coverageFeeList[0].yearFee
									//									} else if(this.peopledetail.cvrgExtInfo.calcPremType == "1") {
									//										this.yeeFee = res.data.output.coverageFeeList[0].coverage;
									//										this.peopledetail.yeeFee = res.data.output.coverageFeeList[0].coverage
									//									}
								}
								if(!this.edu) {
									if(this.nexusType == "00") {
										this.yeeFee = "";
									}
									if(this.peopledetail.cvrgCode == "C000034000114") {
										if(this.addMainPayPeriodList == "B1" || this.addMainPayPeriodList == "C3") {
											this.yeeFee = "";
										}
										if(this.mainPayPeriodList == "B1" || this.mainPayPeriodList == "C3") {
											this.yeeFee = "";
										}
									}
								}
								this.calculationAllFee();
							} else {
								Toast(res.data.desc);
								if(this.peopledetail.cvrgExtInfo.calcPremType == "2") {
									this.yeeFee = "";
									this.peopledetail.yeeFee = ""
								} else if(this.peopledetail.cvrgExtInfo.calcPremType == "1") {
									this.yeeFee = "";
									this.peopledetail.yeeFee = ""
								}
								this.calculationAllFee();
							}
						}, res => {
							Indicator.close();
							console.log(res.data);
						})
				}
			},
			Premium1(sex, InsuredBr, sex1, InsureBr) {
				if(sex1 == "") {
					return;
				}
				if(this.addamnt != "") {
					var patrn = /^[0-9]*$/;
					if(!patrn.test(this.addamnt)) {
						return;
					}
					var data;
					var lifeAmtAge;
					if(this.$refs.selectbirthAmtRmk == undefined || this.$refs.selectbirthAmtRmk == "") {
						lifeAmtAge = "";
					} else {
						lifeAmtAge = this.$refs.selectbirthAmtRmk.value;
					}
					var mult = 0;
					if(this.peopledetail.cvrgCode == "C000034010291") {
						mult == this.addamnt;
					}

					if(this.edu) {
						var sexadd = sex;
						if(this.peopledetail.cvrgCode == "C000034010290" || this.peopledetail.cvrgCode == "C000034010291") {
							sexadd = "";
						}
						if(this.peopledetail.cvrgCode == "C000034000114") {
							sexadd = this.gender;
						}
						if(this.peopledetail.cvrgExtInfo.calcPremType == "1") { //保费算基本保险金额
							data = {
								"list": [{
									"cvrgCode": this.peopledetail.cvrgCode,
									"birthDays": InsuredBr,
									"prodId": this.$route.query.prodCode,
									"coverage": 0,
									"age": this.jsGetAge(InsuredBr),
									"yearFee": this.addamnt,
									"cvrgName": this.peopledetail.cvrgName,
									"sex": sexadd,
									"year": this.payPeriodList[0],
									"safeGuard": this.insuPeriodList[0],
									"lifeAmtAge": lifeAmtAge,
									"freqyNo": "",
									"mult": mult,
									"mainFee": this.mainYearFee,
									"mainCoverage": this.amnt,
									"isWho": this.nexusType
								}]
							}
						} else if(this.peopledetail.cvrgExtInfo.calcPremType == "2") { //基本保险金额算保费

							data = {
								"list": [{
									"cvrgCode": this.peopledetail.cvrgCode,
									"birthDays": InsuredBr,
									"prodId": this.$route.query.prodCode,
									"coverage": this.addamnt,
									"age": this.jsGetAge(InsuredBr),
									"yearFee": 0,
									"cvrgName": this.peopledetail.cvrgName,
									"sex": sexadd,
									"year": this.payPeriodList[0],
									"safeGuard": this.insuPeriodList[0],
									"lifeAmtAge": lifeAmtAge,
									"freqyNo": "",
									"mult": mult,
									"mainFee": this.mainYearFee,
									"mainCoverage": this.amnt,
									"isWho": this.nexusType
								}]
							}
						}
					} else {
						//						if(this.peopledetail.cvrgExtInfo.calcPremType == "1") { //保费算基本保险金额
						//							data = {
						//								"list": [{
						//									"cvrgCode": this.peopledetail.cvrgCode,
						//									"birthDays": InsureBr,
						//									"prodId": this.$route.query.prodCode,
						//									"coverage": 0,
						//									"age": this.jsGetAge(InsureBr),
						//									"yearFee": this.$store.state.yearF,
						//									"cvrgName": this.peopledetail.cvrgName,
						//									"sex": sex1,
						//									"year": this.payPeriodList[0],
						//									"safeGuard": this.insuPeriodList[0],
						//									"lifeAmtAge": lifeAmtAge,
						//									"freqyNo": ""
						//								}]
						//							}
						//						} else if(this.peopledetail.cvrgExtInfo.calcPremType == "2") { //基本保险金额算保费
						var sexadd = sex1;
						if(this.peopledetail.cvrgCode == "C000034010290" || this.peopledetail.cvrgCode == "C000034010291") {
							sexadd = "";
						}
						data = {
							"list": [{
								"cvrgCode": this.peopledetail.cvrgCode,
								"birthDays": InsureBr,
								"prodId": this.$route.query.prodCode,
								"coverage": this.$store.state.yearF,
								"age": this.jsGetAge(InsureBr),
								"yearFee": 0,
								"cvrgName": this.peopledetail.cvrgName,
								"sex": sexadd,
								"year": this.payPeriodList[0],
								"safeGuard": this.insuPeriodList[0],
								"lifeAmtAge": lifeAmtAge,
								"freqyNo": "",
								"mult": mult,
								"mainFee": this.mainYearFee,
								"mainCoverage": this.amnt,
								"isWho": this.nexusType
							}]
						}
						//						}
					}
					console.log("sadas2==" + JSON.stringify(data))
					Indicator.open();
					this.$http.post(this.$store.state.link + '/ppt/count/queryCoverageFee', data)
						.then(res => {
							Indicator.close();
							var dataCode = res.data.code;
							if(dataCode == "SYS_S_000") {
								console.log('算费结果==' + JSON.stringify(res.data.output))
								//								if(this.peopledetail.cvrgExtInfo.calcPremType == "2") {
								this.yeeFee = res.data.output.coverageFeeList[0].yearFee;
								this.peopledetail.yeeFee = res.data.output.coverageFeeList[0].yearFee
								//								} else if(this.peopledetail.cvrgExtInfo.calcPremType == "1") {
								//									this.yeeFee = res.data.output.coverageFeeList[0].coverage;
								//									this.peopledetail.yeeFee = res.data.output.coverageFeeList[0].coverage
								//								}
								this.calculationAllFee();
							} else {
								Toast(res.data.desc);
								if(this.peopledetail.cvrgExtInfo.calcPremType == "2") {
									this.yeeFee = "";
									this.peopledetail.yeeFee = ""
								} else if(this.peopledetail.cvrgExtInfo.calcPremType == "1") {
									this.yeeFee = "";
									this.peopledetail.yeeFee = ""
								}
								this.calculationAllFee();
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
		width: 2.64rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
	}
	
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
	}
	
	.inputWidth {
		width: 4.06rem;
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
		color: #333333;
		/*overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;*/
	}
	
	.inputTextRisk {
		display: block;
		width: 3.8rem;
		line-height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
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