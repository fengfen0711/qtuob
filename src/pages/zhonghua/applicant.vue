<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div v-show="boxShow">
			<div class="twoCon">
				<p class="title_twoCon clearFloat">
					<label class="title_twoCon2 left">投保人信息</label>
					<span class="title_twoCon1 right" @click="toGoIdCard">身份证识别</span>
				</p>
				<div class="policyHolder">
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>是被保人的</label>
						<select v-model="nexusType" class="inputText inputWidth left" @change="nexList">
							<option value="q">请选择</option>
							<option :value="nexus.dicCode" v-for="nexus in nexusList">{{nexus.dicName}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>姓名</label>
						<input type="text" class="inputText inputWidth left" v-model="appName" maxlength="20" placeholder="请输入姓名" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>证件类型</label>
						<select class="left inputText inputWidth" v-model="cardType" @change="changeCount">
							<option value="q">请选择</option>
							<option :value="certfType.dicCode" v-for="certfType  in couponList">{{certfType.dicName}}</option>
							<!--<option :value="CouponList.code" v-for="CouponList  in couponList">{{CouponList.name}}</option>-->
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>证件号码</label>
						<input type="text" maxlength="18" v-model="IDnum" class="inputText inputWidth left" placeholder="请输入证件号码" v-on:input="changeCount" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>性别</label>
						<span class="inputText inputSpan left">
							<span class="sex sexM" @click="genderClick">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="sexShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="!sexShow" />
								<label>男</label>
							</span>
						<span class="sex sexF" @click="genderClick1">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="!sexShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="sexShow" />
								<label>女</label>
							</span>
						</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>出生日期</label>
						<input type="date" v-model="birthDate" id="birthD7" class="inputText inputWidth left" :disabled="disabled"/>
						<label class="dateB" for="birthD7">
							<img src="/static/upDown.png" class="upDownImg" />
						</label>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>证件是否长期有效</label>
						<span class="inputText inputSpan left" @click="sexClick" >
							<span class="sex sexM">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="longShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="!longShow" />
								<label>是</label>
							</span>
						<span class="sex sexF">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="!longShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="longShow" />
								<label>否</label>
							</span>
						</span>
					</p>
					<p class="inputGrop clearFloat" v-show="term">
						<label class="inputLabel left"><label class="star">*</label>证件有效期至</label>
						<input type="date" id="birthD8" v-model="termValidityDate" class="inputText inputWidth left" placeholder="请选择证件有效期" @click="termValidityDateSel" />
						<label class="dateB" for="birthD8">
							<img src="/static/upDown.png" class="upDownImg" />
						</label>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>国籍</label>
						<select class="left inputText inputWidth" v-model="reHighs">
							<option :value="c.dicCode" v-for="c in nationalityarr">{{c.dicName}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>婚姻状况</label>
						<select class="left inputText inputWidth" v-model="marType">
							<option value="q">请选择</option>
							<option :value="mar.dicCode" v-for="mar in marList">{{mar.dicName}}</option>
							<!--<option :value="mar.code" v-for="mar in marList">{{mar.name}}</option>-->
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>职业大类</label>
						<select class="left inputText inputWidth" v-model="tbigType" @change="tlittleChange">
							<option value="q">请选择</option>
							<option :value="tbig.plCode" v-for="tbig in tbigList">{{tbig.plName}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>职业小类</label>
						<select class="left inputText inputWidth" v-model="tlittleType">
							<option value="q">请选择</option>
							<option :value="tlittle.plCode" v-for="tlittle in tlittleList">{{tlittle.plName}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>工作单位</label>
						<input type="text" v-model="work_address" class="inputText inputWidth left" placeholder="请输入工作单位" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star"></label>固定电话</label>
						<input type="text" v-model="tel" maxlength="11" class="inputText inputWidth left" placeholder="请输入固定电话" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>手机号码</label>
						<input type="text" v-model="phone" maxlength="11" class="inputText inputWidth left" placeholder="请输入手机号码" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>邮箱地址</label>
						<input type="email" v-model="email" class="inputText inputWidth left" placeholder="请输入邮箱地址" />
					</p>
					<div class="inputGrop1 clearFloat">
						<p class="inputP">
							<label class="inputLabel1 left"><label class="star">*</label>所在区域</label>
							<select class="inputText1 inputWidth left" v-model="provinceType" @change="provinceA('select')">
								<option value="q">请选择</option>
								<option :value="[province.cnCode,province.cnName]" v-for="(province,index) in provinceList">{{province.cnName}}</option>
							</select>
						</p>
						<p class="inputP">
							<select class="inputText1 inputText2 inputWidth left" v-model="cityType" @change="cityB('select')">
								<option value="q">请选择</option>
								<option :value="[city.cnCode,city.cnName]" v-for="city in cityList">{{city.cnName}}</option>
							</select>
						</p>
						<p class="inputP">
							<select class="inputText1 inputText2 inputWidth left" v-model="countyType">
								<option value="q">请选择</option>
								<option :value="[county.cnCode,county.cnName]" v-for="county in countyList">{{county.cnName}}</option>
							</select>
						</p>
					</div>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>通讯地址</label>
						<input type="text" v-model="add" class="inputText inputWidth left" placeholder="请输入通讯地址" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>邮编</label>
						<input type="text" v-model="zipCode " maxlength="6" class="inputText inputWidth left" placeholder="请输入邮编" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>居民税收类型</label>
						<select class="left inputText inputWidth" v-model="zoneType">
							<option :value="zone.id" v-for="zone in zoneList">{{zone.name}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>年收入（万元）</label>
						<input type="text" v-model="income " class="inputText inputWidth left" placeholder="请输入固定收入" />
					</p>
				</div>
			</div>
			<div class="twoCon twoCon1">
				<p class="inputGrop inputSpan money"><label class="start left">*</label>您的主要收入来源是什么？</p>
				<div ref="sourceIncome" class="signBox clearFloat">
					<span class="selectedSign2" v-for="(list ,index) in sourceList" @click="hand(list.index)" :key="index">{{list.name}}</span>
				</div>
			</div>
			<p class="btnBox">
				<span class="btn btn1" @click="toGoFee">上一步</span>
				<span class="btn" @click="toGoInsured">下一步</span>
			</p>
		</div>
	</div>
</template>

<script>
	import { Dictionaries } from "../../assets/js/counry.js";
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "applicant",
		data() {
			return {
				disabled:false,
				nextFlag: true,
				nextObj: {},
				arraySourceIncome: [],
				boxShow: true,
				sex: '',
				sexShow: true,
				longShow: true,
				//关系
				nexus: '',
				nexusList: [],
				nexusType: [],
				//证件有效期至
				term: true,
				appName: '',
				IDnum: '',
				//证件类型
				cardType: '',
				certfType: '',
				couponList: [],
				//国籍
				reHighs: "",
				nationalityarr: [],
				//婚姻
				marType: '',
				mar: '',
				marList: [],
				provinceType: [],
				provinceList: [],
				cityType: [],
				cityList: [],
				countyType: [],
				countyList: [],
				tbigType: '',
				tbigList: [],
				tmiddleType: '',
				tmiddleList: [],
				tlittleTypeBox: '',
				tlittleType: '',
				tlittleList: [],
				//证件有效期
				termValidityDate: '',
				//固定电话
				tel: '',
				//手机号
				phone: '',
				//邮箱
				email: '',
				//通讯地址
				add: '',
				//邮编
				zipCode: '',
				//出生日期
				birthDate: '',
				//工作单位
				work_address: '',
				//固定收入
				income: '',
				currentIndex: 0,
				//收入来源
				source: '',
				addtest: true, //
				sourceList: [{
					"name": "工资",
					"index": "0"
				}, {
					"name": "私营",
					"index": "1"
				}, {
					"name": "投资",
					"index": "2"
				}, {
					"name": "其他",
					"index": "3"
				}],
				main: '',
				allData: {},
				zoneType: '1',
				//居民类型
				zoneList: [{
						id: '1',
						name: '中国税收居民',
					},
					{
						id: '2',
						name: '非居民',
					},
					{
						id: '3',
						name: '既是中国税收居民又是其他国家（地区）税收居民',
					}
				],
				dictionaries: ""
			}
		},
		created() {
			if(localStorage.dataList != undefined) {
				this.dictionaries = JSON.parse(localStorage.dataList)
			} else {
				var _this = this
				Dictionaries(this.$store.state.link5).then((res) => {
					_this.dictionaries = res.output
				})
			}

			if(this.$route.query.status == "2") {
				this.appName = this.$route.query.name
				this.birthDate = this.$route.query.birthday
				this.IDnum = this.$route.query.cardNo
				this.add = this.$route.query.address
				this.termValidityDate = this.$route.query.expiryDates
				if(this.$route.query.expiryDates == "长期") {
					this.longShow = false
					this.term = false
				}
				if(this.$route.query.sex == "男") {
					this.genderFlag = "M" //性别
					this.sexShow = false
				} else if(this.$route.query.sex == "女") {
					this.genderFlag = "F" //性别
					this.sexShow = true
				}

			}
			this.echo();
		},
		methods: {
			
			//回显
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
				console.log(this.$route.query.birthadty)
				console.log(this.$route.query.sex)
				console.log("====请求报文====" + JSON.stringify(data))
				this.$http.post(this.$store.state.link5 + '/trd/order/v1/queryorder', data).then(res => {
					console.log("====回显====" + JSON.stringify(res.data))
					var dataCode = res.data.code;
					if(dataCode == "SYS_S_000") {
						this.allData = res.data.output;
						this.alltype()
						this.main = res.data.output.mainResp;
						this.chengshi(); //城市
						this.big(); //职业大类

						if(this.$route.query.status != "2") {
							this.appName = res.data.output.applntResp.applName //投保人姓名
							this.IDnum = res.data.output.applntResp.certfCode //证件号码
							this.birthDate = res.data.output.applntResp.birthday //  出生日期
							this.termValidityDate = res.data.output.applntResp.certfEndTime //证件有效期
							this.add = res.data.output.applntResp.fullAddr //详细地址
							if(res.data.output.applntResp.sex == "男") {
								this.genderFlag = "M" //性别
								this.sexShow = true
							} else if(res.data.output.applntResp.sex == "女") {
								this.genderFlag = "F" //性别
								this.sexShow = false
							}
							if(this.$route.query.expiryDates == "长期") {
								this.termValidityDateSel();
							}

						}
						//						console.log(res.data.output.applntResp.birthday)
						//						this.nexusType = res.data.output.applntResp.relaToAppnt; //关系
						this.reHighs = res.data.output.applntResp.nationality //  国籍
						this.occDetailType = res.data.output.applntResp.tbigType
						this.phone = res.data.output.applntResp.mobile //  手机号码
						this.tel = res.data.output.applntResp.tel //  固定号码
						this.email = res.data.output.applntResp.email //  邮编
						this.zipCode = res.data.output.applntResp.zipCode //  邮编
						this.work_address = res.data.output.applntResp.workCompany //  工作单位
						this.income = res.data.output.applntResp.salary //  固定收入
						if(res.data.output.applntResp.gender == 'M') {
							this.sexShow = false
						} else if(res.data.output.applntResp.gender == 'F') {
							this.sexShow = true
						}
						this.email = res.data.output.applntResp.email //邮箱
						this.tbigType = res.data.output.applntResp.occTypeNo //职业大类
						this.tlittleType = res.data.output.applntResp.occNo //职业小类
						if(res.data.output.applntResp.custIdentity != undefined) {
							this.zoneType = res.data.output.applntResp.custIdentity
						}
						//收入来源
						if(res.data.output.applntResp.incomeSource == undefined) {

						} else {
							for(var z = 0; z < res.data.output.applntResp.incomeSource.split("####").length; z++) {
								if(res.data.output.applntResp.incomeSource.split("####")[z] == "1") {
									this.hand(z);
								}
							}
							//							this.hand(res.data.output.applntResp.incomeSource - 1)
						}
						if(res.data.output.applntResp.certfEnduringFlag == 'Y') {
							this.sexClick()
							//							this.longShow = false
						} else if(res.data.output.applntResp.certfEnduringFlag == 'N') {
							//							this.longShow = true
						}

					} else {
						this.alltype();
						this.chengshi(); //城市
						this.big(); //职业大类
					}
				}, res => {
					console.log(res.data);
				})

			},
			big() {
				//职业大类
				var data = {
					"code": "0",
					"orgCode": "000303"
				}
				this.$http.post(this.$store.state.link + '/dic/findProfessionalByOrgCode', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							//							console.log("职业大类" + JSON.stringify(res.data))
							this.tbigList = res.data.output;
							if(this.allData.applntResp.occTypeNo != undefined) {
								this.tbigType = this.allData.applntResp.occTypeNo;
							} else {
								this.tbigType = "q";
							}
							this.tlittleChange();
						} else {
							//						Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},

			tlittleChange() {
				//职业小类
				var data = {
					"code": this.tbigType,
					"orgCode": "000303"
				}
//				console.log("职业小类==" + JSON.stringify(data))
				this.$http.post(this.$store.state.link + '/dic/findProfessionalByOrgCode', data)
					.then(res => {
						//											console.log("响应=="+JSON.stringify(res.data))
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.tlittleList = res.data.output;
							if(this.allData.applntResp.occNo != undefined) {
								this.tlittleType = this.allData.applntResp.occNo;
							} else {
								this.tlittleType = "q";
							}
						} else {
							//						Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			alltype() {
				//				console.log(JSON.stringify(this.dictionaries.certfType))
				//关系
				this.nexusList = this.dictionaries.relaToAppnt.codeList;
				if(this.allData.applntResp.relationToInsured != undefined) {
					this.nexusType = this.allData.applntResp.relationToInsured;
				} else {
					this.nexusType = "q";
				}
				// 证件类型
				this.couponList = this.dictionaries.certfType.codeList;
				if(this.allData.applntResp.certfType != undefined) {
					this.cardType = this.allData.applntResp.certfType;
				} else {
					this.cardType = "q";
				}
				// 国籍
				this.nationalityarr = this.dictionaries.nationality.codeList;
				//				this.reHighs = "37";
				// 婚姻状况
				this.marList = this.dictionaries.maritalStatus.codeList;
				if(this.allData.applntResp.maritalStatus != undefined) {
					this.marType = this.allData.applntResp.maritalStatus;
				} else {
					this.marType = "q";
				}
			},
			chengshi() {
				var data = {
					"code": "0",
					"orgCode": "000034"
				}
				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.provinceList = res.data.output;
							if(this.allData.applntResp.province != undefined) {
								for(var i = 0; i < this.provinceList.length; i++) {
									if(this.provinceList[i].cnCode == this.allData.applntResp.province) {
										this.provinceType = [this.provinceList[i].cnCode, this.provinceList[i].cnName];
									}
								}
							} else {
								this.provinceType = "q";
							}
							//							this.provinceType = "q";
							this.provinceA();
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			provinceA(index) {
				var data = {
					"code": this.provinceType[0],
					"orgCode": "000034"
				}
				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)
					.then(res => {
						//						console.log("*mjmj*" + JSON.stringify(res.data.output));
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.cityList = res.data.output;
							if(index == "select") {
								this.cityType = "q";
								this.countyType = "q";
							} else {
								if(this.allData.applntResp.city != undefined) {
									//									console.log("11===")
									for(var i = 0; i < this.cityList.length; i++) {
										//										console.log(this.cityList[i].cnCode == this.allData.applntResp.city)
										if(this.cityList[i].cnCode == this.allData.applntResp.city) {
											this.cityType = [this.cityList[i].cnCode, this.cityList[i].cnName];
										}
									}

								} else {
									this.cityType = "q";
									this.countyType = "q";
								}
							}

							//							this.cityType = "q";
							this.cityB();
						} else {
							//							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			cityB(index) {
				var data = {
					"code": this.cityType[0],
					"orgCode": "000034"
				}

				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)
					.then(res => {
						//						console.log("mjmj==="+JSON.stringify(res.data))
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.countyList = res.data.output;
							if(index == "select") {
								this.countyType = "q";
							} else {
								if(this.allData.applntResp.county != undefined) {
									for(var i = 0; i < this.countyList.length; i++) {
										//									console.log("2==="+this.countyList[i])
										if(this.countyList[i].cnCode == this.allData.applntResp.county) {
											this.countyType = [this.countyList[i].cnCode, this.countyList[i].cnName];
										}
									}
								} else {
									this.countyType = "q";
								}
							}

							//							this.countyType =  "q";
						} else {
							//							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			nexList() {
				if(this.nexusType == "A") {
					this.birthDate = this.$route.query.birthadty;
					if(this.$route.query.sex == "M") {
						this.genderFlag = "M" //性别
						this.sexShow = false
					} else if(this.$route.query.sex == "F") {
						this.genderFlag = "F" //性别
						this.sexShow = true
					}
				}else{
					this.birthDate=""
					//					this.birthDate = this.$route.query.birthadty;
					//					if(this.$route.query.sex == "M") {
					//						this.genderFlag = "M" //性别
					//						this.sexShow = false
					//					} else if(this.$route.query.sex == "F") {
					//						this.genderFlag = "F" //性别
					//						this.sexShow = true
					//					}
					this.idIdnum();
				}
				//					
				//					console.log(this.IDnum)
				//						var Idcard = this.IDnum.substring(6, 14); //截取生日字符串
				//						Idcard = Idcard.substring(0, 4) + "-" + Idcard.substring(4, 6) + "-" + Idcard.substring(6, 9);
				//						console.log(this.Idcard)
				//						this.birthDate = Idcard;

				//				
			},
			termValidityDateSel() {
				var pdate = this.termValidityDate;
				var d = new Date;
				var today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
				var reg = /\d+/g;
				var temp = pdate.match(reg);
				if(temp) {
					var foday = new Date(temp[0], parseInt(temp[1]) - 1, temp[2]);
					if(foday < today) {
						Toast('证件有效期不可选择今天之前的日期');
						this.termValidityDate = ""
					}
				}
			},
			//点击变色  收入来源
			hand(index) {
				//				arraySourceIncome
				if(this.$refs.sourceIncome.childNodes[index].className == "selectedSign2") {
					this.$refs.sourceIncome.childNodes[index].className = "selectedSign1"
					this.arraySourceIncome.push(index)
				} else {
					this.$refs.sourceIncome.childNodes[index].className = "selectedSign2"
					for(var i = 0; i < this.arraySourceIncome.length; i++) {
						if(this.arraySourceIncome[i] == index) {
							this.arraySourceIncome.splice(i, 1);
						}
					}
				}
			},
			cardChange(){
				if(this.cardType == "A" || this.cardType == "B" || this.cardType == "C"){
					alert(111)
//					this.disabled = true
				}	
			},
			changeCount() {
				if(this.IDnum.length >= 18) {
					if(this.cardType == "A" || this.cardType == "B" || this.cardType == "C") {
						var data = {
							"idcard": this.IDnum,
							"idtype": this.cardType,
							"token": this.$store.state.token,
							"userId": this.$store.state.userId
						}
						this.$http.post(this.$store.state.link + '/cut/cut/validIDCard', data).then(response => {
							console.log(response.data.output.valid);
							
							if(response.data.code == "SYS_S_000") {
								if(response.data.output.valid == true) {
									var Idcard = this.IDnum.substring(6, 14); //截取生日字符串
									Idcard = Idcard.substring(0, 4) + "-" + Idcard.substring(4, 6) + "-" + Idcard.substring(6, 9);
									this.birthDate = Idcard;
									var testSex = "";
									if(parseInt(this.IDnum.substr(16, 1)) % 2 == 1) { //男
										this.sexShow = false;
										//										testSex = "M"
									} else { //女
										//										testSex = "F"
										this.sexShow = true;
									}
									if(this.nexusType == "A") {
										this.idIdnum();
									}
								} else {
									Toast("证件号码不合法");
								}
							} else {

							}
						}, response => {
							console.log("ajax error");
						});
						//					}
					}
				} else {
					this.birthDate = "",
						this.sexShow = true
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
			genderClick() {
				if(this.sexShow) {
					this.sexShow = false
				} else {
					this.sexShow = true
				}
				this.idIdnum1();
			},
			genderClick1() {
				if(this.sexShow) {
					this.sexShow = false
				} else {
					this.sexShow = true
				}
				this.idIdnum1();
			},
			sexClick() {
				if(this.longShow) {
					this.longShow = false
					this.term = false
				} else {
					this.longShow = true
					this.term = true
				}
			},

			toGoFee() {
				window.history.go(-1)
			},
			//下一步
			toGoInsured() {
				//金额校验
				var isNum = /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
				//固定号码
				var patrn = /^[0-9]*$/;
				//手机号
				var regPh = /^1[0-9]{10}$/;
				//固定号码
				var regT = /^0\d{2,3}[1-9]\d{6,7}$/
				//邮箱
				var regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/; //邮箱地址
				//邮编
				var regEm = /^[0-9][0-9]{5}$/;
				//详细地址
				var regAdd = /^[\u4e00-\u9fa5]{9,}$/;
				var  myReg  =  /^([\u4E00-\u9FA5]{2,})+$/;
				if(this.nextFlag == false) {
					Toast("根据输入的生日和性别算费失败")
					return;
				}
				if(this.nexusType == "q") {
					Toast("请选择投保关系")
					return;
				}
				if(this.appName == "" || this.appName == undefined) {
					Toast('请输入您的姓名');
					return;
				} else if(!myReg.test(this.appName))  {
					Toast("投保人的姓名必须为汉字，并且需大于等于两个汉字")
					return
				} else if(this.appName.length > 50) {
					Toast("投保人的姓名必须小于50个汉字")
				}
				if(this.cardType == "q") {
					Toast("请选择证件类型")
					return;
				}
				if(this.cardType == "A" || this.cardType == "C" || this.cardType == "D") {
					var Idcard1 = this.IDnum.substring(6, 14); //截取生日字符串
					Idcard1 = Idcard1.substring(0, 4) + "-" + Idcard1.substring(4, 6) + "-" + Idcard1.substring(6, 9);
					if(Idcard1 != this.birthDate) {
						Toast('证件号码和生日不匹配')
						return;
					}
					var Idcard2 = this.IDnum.substring(16, 17); //截取生日字符串
					var sex;
					if(Idcard2 % 2 == 0) {
						sex = "女"
					} else {
						sex = "男"
					}
				}
				if(this.cardType == "L") {
					if(this.IDnum.length > 10 || this.IDnum.length < 7) {
						Toast('投保人证件号码有误')
						return
					}

				}
				if(this.cardType == "N") {
					if(this.IDnum.length > 20 || this.IDnum.length < 3) {
						Toast('投保人证件号码有误')
						return
					}

				}
				if(this.cardType == "P") {
					if(this.IDnum.length > 10 || this.IDnum.length < 8) {
						Toast('投保人证件号码有误')
						return
					}

				}
				if(this.cardType == "G" || this.cardType == "I") {
					if(this.IDnum.length > 18 || this.IDnum.length < 10) {
						Toast('投保人证件号码有误')
						return
					}

				}
				if(this.cardType == "S") {
					if(this.IDnum.length != 15) {
						Toast('投保人证件号码有误')
						return
					}

				}
				if(this.cardType == "Q") {
					var regCard = /^[a-zA-Z\d]{11}$/;
					if(!regCard.test(this.IDnum)) {
						Toast('投保人证件号码有误')
						return
					}

				}
				if(this.longShow == true) {
					if(this.termValidityDate == "" || this.termValidityDate == undefined) {
						Toast('请选择证件有效期')
						return
					}

				}

				if(this.marType == "q") {
					Toast("请选择婚姻状况")
					return;
				}
				if(this.tbigType == "q" || this.tlittleType == "q") {
					Toast("请选择职业类别")
					return;
				}
				if(this.provinceType == "q" || this.cityType == "q" || this.countyType == "q") {
					Toast("请选择城市")
					return;
				}
				var addLength = this.provinceType[1] + this.cityType[1] + this.countyType[1] + this.add;
				if(addLength.length < 16) {
					Toast('省市县地址+通讯地址长度应大于16个字')
					return;
				}
				if(this.add == "" || this.add == undefined) {
					Toast('请输入您的详细地址');
					return;
				}

				if(this.reHighs == "" || this.reHighs == undefined) {
					Toast('请选择您的国籍');
					return;
				}
				if(this.phone == "" || this.phone == undefined) {
					Toast('请输入您的手机号');
					return;
				}
				if(this.phone != "" && this.phone != undefined && !regPh.test(this.phone)) {
					Toast('手机号码格式不正确');
					return;
				}
				if(this.tel == "" || this.tel == undefined) {} else {
					if(!patrn.test(this.tel)) {
						Toast("固定号码格式不正确")
						return;
					}
				}
				if(this.IDnum == "") {
					Toast("投保人证件号码不能为空~")
					return
				} else {
					if(this.cardType == "0") {
						if(this.IDnum.length == 18 && this.IDtrue == true) {

						} else {
							var regCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; 
							if (!regCard.test(this.IDnum))  {
								Toast("投保人证件号码不合法~")
								return 
							}
						}
					}
				}

				if(this.email == "" || this.email == undefined) {
					Toast('请输入邮箱地址');
					return;
				}
				if(this.email != "" && this.email != undefined && !regEmail.test(this.email)) {
					Toast('邮箱格式不正确');
					return;
				}
				if(this.zipCode == '' || this.zipCode == undefined) {
					Toast('请输入邮编地址')
					return;
				}
				if(this.zipCode != '' && this.zipCode != undefined && !regEm.test(this.zipCode)) {
					Toast('邮编地址格式不正确')
					return;
				}
				if(this.work_address == "" || this.work_address == undefined) {
					Toast('请输入您的工作单位');
					return;
				}
				if(this.income == "" || this.income == undefined) {
					Toast('请输入您的固定收入');
					return;
				}
				if(isNum.test(this.income) == false) {
					Toast('固定收入格式不正确');
					return;
				} else {

				}
				if(this.arraySourceIncome.length == 0) {
					Toast('请选择收入来源');
					return;
				}
				var incomeSource = ""
				var incomeSourceA = "0";
				var incomeSourceB = "0"
				var incomeSourceC = "0"
				var incomeSourceD = "0"
				for(var k = 0; k < this.arraySourceIncome.length; k++) {
					if(this.arraySourceIncome[k] == "0") {
						incomeSourceA = "1"
					}
					if(this.arraySourceIncome[k] == "1") {
						incomeSourceB = "1"
					}
					if(this.arraySourceIncome[k] == "2") {
						incomeSourceC = "1"
					}
					if(this.arraySourceIncome[k] == "3") {
						incomeSourceD = "1"
					}
				}
				incomeSource = incomeSourceA + "####" + incomeSourceB + "####" + incomeSourceC + "####" + incomeSourceD;

				var certfEnduringFlag;
				if(this.longShow == true) {
					certfEnduringFlag = "N";
				} else {
					certfEnduringFlag = "Y";
				}
				var genderFlag;
				if(this.sexShow == true) {
					genderFlag = 'F'
				} else {
					genderFlag = 'M'
				}
				//如果是ocr识别
				var checkCvrgResp; //险种信息
				//				var checkInsrntResp; //被保人简单信息
				var checkInsuranceDutyResp; //责任信息
				var checkMainResp; //主险信息
				if(this.nextFlag == true) {
					this.allData.cvrgResp[0].amnt = this.nextObj.amnt;
					this.allData.cvrgResp[0].prem = this.nextObj.prem;
					checkCvrgResp = [
						this.allData.cvrgResp[0]
					];
					//					checkInsrntResp = {
					//						"age": this.jsGetAge(this.birthDate),
					//						"birthday": this.birthDate,
					//						"gender": (this.sexShow == false) ? "M" : "F"
					//					};
					this.allData.insuranceDutyResp.dutyAmnt = this.nextObj.amnt;
					this.allData.insuranceDutyResp.dutyPrem = this.nextObj.prem;
					checkInsuranceDutyResp = this.allData.insuranceDutyResp;
					this.allData.mainResp.amnt = this.nextObj.amnt;
					this.allData.mainResp.prem = this.nextObj.prem;
					this.allData.mainResp.sumAmnt = this.nextObj.amnt;
					this.allData.mainResp.sumPrem = this.nextObj.prem;
					checkMainResp = this.allData.mainResp;
				}
				console.log("1===" + JSON.stringify(checkCvrgResp))
				console.log("2===" + JSON.stringify(checkInsuranceDutyResp))
				console.log("3===" + JSON.stringify(checkMainResp))
				var checkTestSex;
				if(this.sexShow == false) {
					checkTestSex = "M"
				} else {
					checkTestSex = "F"
				}
				if(this.$route.query.status == "2") {
					//是本人
					if(this.nexusType == "A") {
						var msg1 = {
							"birthday": this.birthDate, //出生年月 : 格式yyyy-MM-dd ,
							"certfCode": this.IDnum, //证件号码 ,
							"certfEndTime": this.termValidityDate, //证件有效期 : 格式yyyy-MM-dd ,
							"certfEnduringFlag": certfEnduringFlag, //证件长期有效标志 : Y-是;N-否 ,
							"certfType": this.cardType, //证件类型 ,
							"province": this.provinceType[0], // 地址省 ,
							"city": this.cityType[0], //地址市
							"county": this.countyType[0], //地址区县 
							"email": this.email, //邮箱
							"fullAddr": this.add, //通讯地址
							"gender": genderFlag, //性别 : M-男;F-女 ,
							"incomeSource": incomeSource, //收入来源 ,
							"insrntName": this.appName, //被保人姓名 ,
							"maritalStatus": this.marType, //婚姻状态 ,
							"mobile": this.phone, //联系电话 
							"nationality": this.reHighs, //国籍
							"occType": this.tbigType, //职业大类
							"occTypeNo": this.tlittleType, //职业小类
							"occCate": "1",
							"relaToAppnt": this.nexusType, //与投保人关系 ,
							"salary": this.pos_money, //年收入
							"tel": this.tel, //固定电话
							"workCompany": this.work_address, //工作单位 ,
							"zipCode": this.zipCode, //邮编 ,
							"custIdentity": this.zoneType, //居民税收类型
							"occName": "1010100", //工作
						}
						var msg = {
							"applName": this.appName, //投保人姓名 ,
							"birthday": this.birthDate, //出生年月 : 格式yyyy-MM-dd ,
							"certfCode": this.IDnum, //证件号码 ,
							"certfEndTime": this.termValidityDate, //证件有效期 : 格式yyyy-MM-dd ,
							"certfEnduringFlag": certfEnduringFlag, //证件长期有效标志 : Y-是;N-否 ,
							"certfType": this.cardType, //证件类型 ,
							"city": this.cityType[0], //地址市 
							"county": this.countyType[0], //地址区县
							"province": this.provinceType[0], //地址省					
							"email": this.email, //邮箱 ,
							"fullAddr": this.add, //详细地址 ,
							"gender": genderFlag, //性别 : M-男;F-女
							"incomeSource": incomeSource, //收入来源 ,
							"maritalStatus": this.marType, //婚姻状态 ,
							"mobile": this.phone, //联系电话 ,
							"nationality": this.reHighs, //国籍 ,
							"relationToInsured": this.nexusType, //投保人与被保人关系 ,
							"salary": this.income, //年收入 ,
							"tel": this.tel, //固定电话 ,
							"workCompany": this.work_address, //工作单位 ,
							"zipCode": this.zipCode, //邮编 ,
							"occTypeNo": this.tbigType,
							"occNo": this.tlittleType,
							"occCate": "1", // 职业类别
							"custIdentity": this.zoneType, // 客户纳税身份
							"occName": "1010100", //工作
						}
						var data;
						if(this.$route.query.birthadty != this.birthDate || checkTestSex != this.$route.query.sex) {
							data = {
								"token": this.$store.state.token,
								"userId": this.$store.state.userId,
								"head": { 
									"channelCode": "qtb_h5",
									"deptCode": "000300",
									"oprCode": this.$store.state.userId,
									"prodCode": this.$route.query.prodCode,
								},
								"mark": "UC",
								"mainReq": checkMainResp,
								"cvrgReq": checkCvrgResp,
								"insuranceDutyReq": checkInsuranceDutyResp,
								"opt": "APPL,INSRNT,DOC,MAIN,CVRG,DUTY",
								"pkgNo": this.$route.query.orderNo,
								"applntReq": msg,
								"insrntReq": msg1,
								"docReq": [{
										"docFileName": "投保人身份证正面",
										"docType": "00401011",
										"fileSerialNo": this.$route.query.applicantcardno,
										"remark": "正",
										"showOrder": 1
									},
									{
										"docFileName": "投保人身份证反面",
										"docType": "00401012",
										"fileSerialNo": this.$route.query.applicantsite,
										"remark": "反",
										"showOrder": 2
									}
								],
							}
						} else {
							data = {
								"token": this.$store.state.token,
								"userId": this.$store.state.userId,
								"head": { 
									"channelCode": "qtb_h5",
									                        "deptCode": "000300",
									"oprCode": this.$store.state.userId,
									 "prodCode": this.$route.query.prodCode,
								},
								"mark": "UC",
								"mainReq": this.mainResp,
								"opt": "APPL,INSRNT,DOC",
								"pkgNo": this.$route.query.orderNo,
								"applntReq": msg,
								"insrntReq": msg1,
								"docReq": [{
										"docFileName": "投保人身份证正面",
										"docType": "00401011",
										"fileSerialNo": this.$route.query.applicantcardno,
										"remark": "正",
										"showOrder": 1
									},
									{
										"docFileName": "投保人身份证反面",
										"docType": "00401012",
										"fileSerialNo": this.$route.query.applicantsite,
										"remark": "反",
										"showOrder": 2
									}
								],
							}
						}
						console.log(JSON.stringify(data))
						Indicator.open();
						console.log("====保存====" + JSON.stringify())
						this.$http.post(this.$store.state.link5 + '/trd/order/v1/saveorder', data)
							.then(res => {
								Indicator.close();
								if(res.data.code == "SYS_S_000") {
									this.$router.push('/ben?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&prodNo=" + this.$route.query.prodNo + "&statuFlag=Y")
								} else {
									Toast(res.data.desc);
								}
							}, res => {
								Indicator.close();
								console.log(res.data);
							})
						//不是本人
					} else {

						var msg = {
							"applName": this.appName, //投保人姓名 ,
							"birthday": this.birthDate, //出生年月 : 格式yyyy-MM-dd ,
							"certfCode": this.IDnum, //证件号码 ,
							"certfEndTime": this.termValidityDate, //证件有效期 : 格式yyyy-MM-dd ,
							"certfEnduringFlag": certfEnduringFlag, //证件长期有效标志 : Y-是;N-否 ,
							"certfType": this.cardType, //证件类型 ,
							"city": this.cityType[0], //地址市 
							"county": this.countyType[0], //地址区县
							"province": this.provinceType[0], //地址省
							"email": this.email, //邮箱 ,
							"fullAddr": this.add, //详细地址 ,	
							"gender": genderFlag, //性别 : M-男;F-女
							"incomeSource": incomeSource, //收入来源 ,
							"maritalStatus": this.marType, //婚姻状态 ,
							"mobile": this.phone, //联系电话 ,
							"nationality": this.reHighs, //国籍 ,
							"relationToInsured": this.nexusType, //投保人与被保人关系 ,
							"salary": this.income, //年收入 ,
							"tel": this.tel, //固定电话 ,
							"workCompany": this.work_address, //工作单位 ,
							"zipCode": this.zipCode, //邮编 ,
							"occTypeNo": this.tbigType,
							"occNo": this.tlittleType,
							"occCate": "1",
							"custIdentity": this.zoneType, // 客户纳税身份
							"occName": "1010100", //工作
						}
						var data;
						//						if(this.nexusType == "A" && this.$route.query.birthadty != this.birthDate || checkTestSex != this.$route.query.sex) {
						//							data = {
						//								"token": this.$store.state.token,
						//								"userId": this.$store.state.userId,
						//								"head": { 
						//									"channelCode": "qtb_h5",
						//									                        "deptCode": "000300",
						//									"oprCode": this.$store.state.userId,
						//									 "prodCode": this.$route.query.prodCode,
						//								},
						//								"mark": "UC",
						//								"mainReq": checkMainResp,
						//								"cvrgReq": checkCvrgResp,
						//								"insuranceDutyReq": checkInsuranceDutyResp,
						//								"opt": "APPL,DOC,MAIN,CVRG,DUTY",
						//								"pkgNo": this.$route.query.orderNo,
						//								"applntReq": msg,
						//								"docReq": [{
						//										"docFileName": "投保人身份证正面",
						//										"docType": "00401011",
						//										"fileSerialNo": this.$route.query.applicantcardno,
						//										"remark": "正",
						//										"showOrder": 1
						//									},
						//									{
						//										"docFileName": "投保人身份证反面",
						//										"docType": "00401012",
						//										"fileSerialNo": this.$route.query.applicantsite,
						//										"remark": "反",
						//										"showOrder": 2
						//									}
						//								],
						//							}
						//						} else {
						data = {
							"token": this.$store.state.token,
							"userId": this.$store.state.userId,
							"head": { 
								"channelCode": "qtb_h5",
								                        "deptCode": "000300",
								"oprCode": this.$store.state.userId,
								 "prodCode": this.$route.query.prodCode,
							},
							"mark": "UC",
							"mainReq": this.mainResp,
							"opt": "APPL,DOC",
							"pkgNo": this.$route.query.orderNo,
							"applntReq": msg,
							"docReq": [{
									"docFileName": "投保人身份证正面",
									"docType": "00401011",
									"fileSerialNo": this.$route.query.applicantcardno,
									"remark": "正",
									"showOrder": 1
								},
								{
									"docFileName": "投保人身份证反面",
									"docType": "00401012",
									"fileSerialNo": this.$route.query.applicantsite,
									"remark": "反",
									"showOrder": 2
								}
							],
						}
						//						}
						Indicator.open();
						console.log("====保存====" + JSON.stringify(data))
						this.$http.post(this.$store.state.link5 + '/trd/order/v1/saveorder', data)
							.then(res => {
								Indicator.close();
								console.log("====保存====" + JSON.stringify(data))
								if(res.data.code == "SYS_S_000") {
									this.$router.push('/insured?prodCode=' +
										this.$route.query.prodCode + '&prodNo=' +
										this.$route.query.prodNo + '&orderNo=' +
										this.$route.query.orderNo + '&cmpCode=' +
										this.$route.query.cmpCode + '&birthadty=' +
										this.$route.query.birthadty + '&sex=' + this.$route.query.sex)
								} else {
									Toast(res.data.desc);
								}
							}, res => {
								Indicator.close();
								//							console.log(res.data);
							})

					}
					//不是ocr识别
				} else {
					//是本人
					if(this.nexusType == "A") {
						var msg1 = {
							"birthday": this.birthDate, //出生年月 : 格式yyyy-MM-dd ,
							"certfCode": this.IDnum, //证件号码 ,
							"certfEndTime": this.termValidityDate, //证件有效期 : 格式yyyy-MM-dd ,
							"certfEnduringFlag": certfEnduringFlag, //证件长期有效标志 : Y-是;N-否 ,
							"certfType": this.cardType, //证件类型 ,
							"province": this.provinceType[0], // 地址省 ,
							"city": this.cityType[0], //地址市
							"county": this.countyType[0], //地址区县 
							"email": this.email, //邮箱
							"fullAddr": this.add, //通讯地址
							"gender": genderFlag, //性别 : M-男;F-女 ,
							"incomeSource": incomeSource, //收入来源 ,
							"insrntName": this.appName, //被保人姓名 ,
							"maritalStatus": this.marType, //婚姻状态 ,
							"mobile": this.phone, //联系电话 
							"nationality": this.reHighs, //国籍
							"occType": this.tbigType, //职业大类
							"occTypeNo": this.tlittleType, //职业小类
							"occCate": "1",
							"relaToAppnt": this.nexusType, //与投保人关系 ,
							"salary": this.pos_money, //年收入
							"tel": this.tel, //固定电话
							"workCompany": this.work_address, //工作单位 ,
							"zipCode": this.zipCode, //邮编 ,
							"custIdentity": this.zoneType, //居民税收类型
							"occName": "1010100", //工作
						}
						var msg = {
							"applName": this.appName, //投保人姓名 ,
							"birthday": this.birthDate, //出生年月 : 格式yyyy-MM-dd ,
							"certfCode": this.IDnum, //证件号码 ,
							"certfEndTime": this.termValidityDate, //证件有效期 : 格式yyyy-MM-dd ,
							"certfEnduringFlag": certfEnduringFlag, //证件长期有效标志 : Y-是;N-否 ,
							"certfType": this.cardType, //证件类型 ,
							"city": this.cityType[0], //地址市 
							"county": this.countyType[0], //地址区县
							"province": this.provinceType[0], //地址省					
							"email": this.email, //邮箱 ,
							"fullAddr": this.add, //详细地址 ,
							"gender": genderFlag, //性别 : M-男;F-女
							"incomeSource": incomeSource, //收入来源 ,
							"maritalStatus": this.marType, //婚姻状态 ,
							"mobile": this.phone, //联系电话 ,
							"nationality": this.reHighs, //国籍 ,
							"relationToInsured": this.nexusType, //投保人与被保人关系 ,
							"salary": this.income, //年收入 ,
							"tel": this.tel, //固定电话 ,
							"workCompany": this.work_address, //工作单位 ,
							"zipCode": this.zipCode, //邮编 ,
							"occTypeNo": this.tbigType,
							"occNo": this.tlittleType,
							"occCate": "1", // 职业类别
							"custIdentity": this.zoneType, // 客户纳税身份
							"occName": "1010100", //工作
						}
						var data;
						if(this.$route.query.birthadty != this.birthDate || checkTestSex != this.$route.query.sex) {
							data = {
								"token": this.$store.state.token,
								"userId": this.$store.state.userId,
								"head": { 
									"channelCode": "qtb_h5",
									                        "deptCode": "000300",
									"oprCode": this.$store.state.userId,
									 "prodCode": this.$route.query.prodCode,
								},
								"mark": "UC",
								"mainReq": checkMainResp,
								"cvrgReq": checkCvrgResp,
								"insuranceDutyReq": checkInsuranceDutyResp,
								"opt": "APPL,INSRNT,MAIN,CVRG,DUTY",
								"pkgNo": this.$route.query.orderNo,
								"applntReq": msg,
								"insrntReq": msg1,
							}
						} else {
							data = {
								"token": this.$store.state.token,
								"userId": this.$store.state.userId,
								"head": { 
									"channelCode": "qtb_h5",
									                        "deptCode": "000300",
									"oprCode": this.$store.state.userId,
									 "prodCode": this.$route.query.prodCode,
								},
								"mark": "UC",
								"mainReq": this.mainResp,
								"opt": "APPL,INSRNT",
								"pkgNo": this.$route.query.orderNo,
								"applntReq": msg,
								"insrntReq": msg1,
							}
						}
						console.log(JSON.stringify(data))
						Indicator.open();
						console.log("====保存====" + JSON.stringify())
						this.$http.post(this.$store.state.link5 + '/trd/order/v1/saveorder', data)
							.then(res => {
								Indicator.close();
								//							console.log(res.data)
								if(res.data.code == "SYS_S_000") {
									this.$router.push('/ben?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&prodNo=" + this.$route.query.prodNo + "&statuFlag=Y" + '&birthadty=' +
										this.$route.query.birthadty + '&sex=' + this.$route.query.sex)
								} else {
									Toast(res.data.desc);
								}
							}, res => {
								Indicator.close();
								console.log(res.data);
							})
						//不是本人		
					} else {
						var msg = {
							"applName": this.appName, //投保人姓名 ,
							"birthday": this.birthDate, //出生年月 : 格式yyyy-MM-dd ,
							"certfCode": this.IDnum, //证件号码 ,
							"certfEndTime": this.termValidityDate, //证件有效期 : 格式yyyy-MM-dd ,
							"certfEnduringFlag": certfEnduringFlag, //证件长期有效标志 : Y-是;N-否 ,
							"certfType": this.cardType, //证件类型 ,
							"city": this.cityType[0], //地址市 
							"county": this.countyType[0], //地址区县
							"province": this.provinceType[0], //地址省
							"email": this.email, //邮箱 ,
							"fullAddr": this.add, //详细地址 ,	
							"gender": genderFlag, //性别 : M-男;F-女
							"incomeSource": incomeSource, //收入来源 ,
							"maritalStatus": this.marType, //婚姻状态 ,
							"mobile": this.phone, //联系电话 ,
							"nationality": this.reHighs, //国籍 ,
							"relationToInsured": this.nexusType, //投保人与被保人关系 ,
							"salary": this.income, //年收入 ,
							"tel": this.tel, //固定电话 ,
							"workCompany": this.work_address, //工作单位 ,
							"zipCode": this.zipCode, //邮编 ,
							"occTypeNo": this.tbigType,
							"occNo": this.tlittleType,
							"occCate": "1",
							"custIdentity": this.zoneType, // 客户纳税身份
							"occName": "1010100", //工作
						}
						var data;
						//						if(this.nexusType == "A" && this.$route.query.birthadty != this.birthDate || checkTestSex != this.$route.query.sex) {
						//							data = {
						//								"token": this.$store.state.token,
						//								"userId": this.$store.state.userId,
						//								"head": { 
						//									"channelCode": "qtb_h5",
						//									                        "deptCode": "000300",
						//									"oprCode": this.$store.state.userId,
						//									 "prodCode": this.$route.query.prodCode,
						//								},
						//								"mark": "UC",
						//								"mainReq": checkMainResp,
						//								"cvrgReq": checkCvrgResp,
						//								"insuranceDutyReq": checkInsuranceDutyResp,
						//								"opt": "APPL,MAIN,CVRG,DUTY",
						//								"pkgNo": this.$route.query.orderNo,
						//								"applntReq": msg,
						//							}
						//						} else {
						data = {
							"token": this.$store.state.token,
							"userId": this.$store.state.userId,
							"head": { 
								"channelCode": "qtb_h5",
								                        "deptCode": "000300",
								"oprCode": this.$store.state.userId,
								 "prodCode": this.$route.query.prodCode,
							},
							"mark": "UC",
							"mainReq": this.mainResp,
							"opt": "APPL",
							"pkgNo": this.$route.query.orderNo,
							"applntReq": msg,
						}
						//						}
						Indicator.open();
						console.log("====保存====" + JSON.stringify(data))
						this.$http.post(this.$store.state.link5 + '/trd/order/v1/saveorder', data)
							.then(res => {
								Indicator.close();
								//							console.log("====保存===="+JSON.stringify(data))
								if(res.data.code == "SYS_S_000") {
									this.$router.push('/insured?prodCode=' +
										this.$route.query.prodCode + '&prodNo=' +
										this.$route.query.prodNo + '&orderNo=' +
										this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode + '&birthadty=' +
										this.$route.query.birthadty + '&sex=' + this.$route.query.sex)
								} else {
									Toast(res.data.desc);
								}
							}, res => {
								Indicator.close();
								//							console.log(res.data);
							})

					}

				}

			},
			toGoIdCard() {
				this.$router.push('/idCard?prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode)
			},
			isCardID(sId) {
				var iSum = 0;
				var info = "";
				if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
				sId = sId.replace(/x$/i, "a");
				var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
				var d = new Date(sBirthday.replace(/-/g, "/"));
				if(sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
				for(var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
				if(iSum % 11 != 1) return "你输入的身份证号非法";
				return "true";
			},
			idIdnum() {
				if(this.birthDate == "" || this.birthDate == undefined) {
					return;
				}
				var testSex = "";
				if(this.sexShow == false) {
					testSex = "M"
				} else {
					testSex = "F"
				}
				if(this.$route.query.birthadty != this.birthDate || testSex != this.$route.query.sex) {
					//						Toast('您证件的出生日期或者性别与您输入的出生日或者性别不一致')
					this.calculation();
					return;
				}
			},
			idIdnum1() {
				if(this.nexusType == "A") {
					var testSex1 = ""
					if(this.sexShow == false) {
						testSex1 = "M"
					} else {
						testSex1 = "F"
					}
					if(testSex1 != this.$route.query.sex) {
						//						Toast('您证件的出生日期或者性别与您输入的出生日或者性别不一致')
						this.calculation();
						return;
					}
				}
			},
			calculation() {
				if(this.birthDate == "" || this.birthDate == undefined) {
					return;
				}
				var testSexFee = ""
				if(this.sexShow == false) {
					testSexFee = "M"
				} else {
					testSexFee = "F"
				}
				var data = {
					"cvrgResp": [{
						"cvrgCode": this.allData.cvrgResp[0].cvrgCode,
						"cvrgName": this.allData.cvrgResp[0].cvrgName,
						"cvrgNo": this.allData.cvrgResp[0].cvrgNo,
						"insuFlag": this.allData.cvrgResp[0].insuFlag,
						"insuNo": this.allData.cvrgResp[0].insuNo,
						"payFlag": this.allData.cvrgResp[0].payFlag,
						"payNo": this.allData.cvrgResp[0].payNo,
						"cvrgType": this.allData.cvrgResp[0].cvrgType,
						"prem": this.allData.cvrgResp[0].prem,
						"calcPremType": this.allData.cvrgResp[0].calcPremType,
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
						"age": this.jsGetAge(this.birthDate),
						"birthday": this.birthDate,
						"gender": testSexFee
					},
					"insuranceDutyResp": [{
						"calMode": this.allData.insuranceDutyResp[0].calMode,
						"clatmCoinsurance": "1",
						"cvrgNo": this.allData.insuranceDutyResp[0].cvrgNo,
						"dutyCode": this.allData.insuranceDutyResp[0].dutyCode,
						"dutyNo": this.allData.insuranceDutyResp[0].dutyNo,
						"dutyPrem": this.allData.insuranceDutyResp[0].dutyPrem,
						"mult": this.allData.insuranceDutyResp[0].mult,
					}],
					"mainResp": {
						"agentCode": this.allData.mainResp.agentCode,
						"deptCode": this.allData.mainResp.deptCode,
						"pkgNo": this.allData.mainResp.pkgNo,
						"prodCode": this.allData.mainResp.prodCode,
						"prodName": this.allData.mainResp.prodName,
						"prodNo": this.allData.mainResp.prodNo,

					}
				}

				Indicator.open();
				console.log(JSON.stringify(data))
				this.$http.post(this.$store.state.link5 + "/trd/calc/v1/prenium", data).then(res => {
					Indicator.close();
					console.log("2===成功" + JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {
						if(res.data.output.code == "SSE00001") {
							this.nextFlag = false;
						} else if(res.data.output.code == "SSI00000") {
							this.nextObj = res.data.output.dutyList[0];
							this.nextFlag = true;
						}
					} else {
						this.nextFlag = false;
					}
				}, res => {
					Indicator.close();
					this.nextFlag = false;
					console.log("2===失败1" + res.data)
				});

			}
		},

		components: {

		},
		watch: {
			nationalityarr(val) {
				if(val != "") {
					if(this.allData.applntResp.nationality != undefined) {
						this.reHighs = this.allData.applntResp.nationality;
					} else {
						this.reHighs = "37";
					}
					//					this.reHighs = "37";
				}
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
	
	.selectedSign2 {
		display: inline-block;
		float: left;
		width: 1.84rem;
		margin: 0 0.15rem;
		height: 0.68rem;
		line-height: 0.68rem;
		margin-top: 0.32rem;
		font-size: 0.28rem;
		color: #555555;
		text-align: center;
		border: solid 0.02rem #54CCC1;
		border-radius: 0.34rem;
		margin-right: 0.2rem;
	}
	
	.selectedSign1 {
		background: #54CCC1;
		display: inline-block;
		float: left;
		width: 1.84rem;
		margin: 0 0.15rem;
		height: 0.68rem;
		line-height: 0.68rem;
		margin-top: 0.32rem;
		font-size: 0.28rem;
		color: #FFFFFF;
		text-align: center;
		border: solid 0.02rem #54CCC1;
		border-radius: 0.34rem;
		margin-right: 0.2rem;
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
		font-size: 0.28rem;
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
	
	.inputGrop {
		position: relative;
		height: 0.88rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	
	.inputGrop1 {
		font-size: 0.28rem;
		/*border-bottom: solid 0.01rem #C8C7CC;*/
	}
	
	.inputP {
		height: 0.68rem;
	}
	
	.inputLabel {
		display: block;
		width: 3.22rem;
		height: 0.88rem;
		line-height: 0.88rem;
		color: #555555;
	}
	
	.inputLabel1 {
		display: block;
		width: 3.22rem;
		height: 0.68rem;
		line-height: 0.68rem;
		color: #555555;
	}
	
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
	}
	
	.inputText1 {
		height: 0.68rem;
		font-size: 0.28rem;
		color: #666666;
	}
	
	.inputText22 {
		width: 2.7rem;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
		padding-left: 0;
	}
	
	.inputText2 {
		margin-left: 3.22rem;
	}
	
	.inputText22 {
		width: 2.7rem;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
		padding-left: 0;
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
	
	.star {
		display: inline-block;
		width: 0.15rem;
		color: #C9141E;
	}
	
	.twoCon1 {
		margin-top: 0.4rem;
	}
	
	.selectedSign {
		background: #54CCC1;
		color: #FFFFFF;
	}
	
	.signBox {
		padding-bottom: 0.32rem;
		/*margin-bottom: 0.64rem;*/
	}
	
	.signBox span {
		display: inline-block;
		float: left;
		width: 1.84rem;
		margin: 0 0.15rem;
		height: 0.68rem;
		line-height: 0.68rem;
		margin-top: 0.32rem;
		font-size: 0.28rem;
		/*color: #555555;*/
		text-align: center;
		border: solid 0.02rem #54CCC1;
		border-radius: 0.34rem;
		margin-right: 0.2rem;
	}
	
	.inputLabel2 {
		display: block;
		/*width: 1rem;*/
		height: 0.88rem;
		line-height: 0.88rem;
		/*font-weight: bold;*/
		color: #555555;
	}
	
	.boderbo {
		/*width: 5.5rem;*/
		border: none;
		border-radius: 0;
		border-bottom: 0.02rem solid #979797;
	}
	
	.bg {
		margin-top: 0.2rem;
	}
	
	.bg1 {
		margin-left: 0.2rem;
	}
</style>