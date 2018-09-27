<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div v-show="boxShow">
			<div class="twoCon">
				<p class="title_twoCon clearFloat">
					<label class="title_twoCon2 left">被保险人信息</label>
					<span class="title_twoCon1 right" @click="toGoIdCard">身份证识别</span>
				</p>
				<div class="policyHolder">
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>投被保险人关系</label>
						<select v-model="nexusType" class="inputText inputWidth left selectp" disabled="disabled">
							<option selected="selected" value="tp">请选择</option>
							<option :value="nexus.dicCode" v-for="nexus in nexusList">{{nexus.dicName}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>姓名</label>
						<input type="text" class="inputText inputWidth left" v-model="appName" placeholder="请输入姓名" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>证件类型</label>
						<select class="left inputText inputWidth" v-model="cardType">
							<option selected="selected" value="tp">请选择</option>
							<option :value="certfType.dicCode" v-for="certfType  in couponList">{{certfType.dicName}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>证件号码</label>
						<input type="text" maxlength="18" v-model="IDnum" @input="idIdnum" class="inputText inputWidth left" placeholder="请输入证件号码" v-on:input="changeCount" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>性别</label>
						<span class="inputText inputSpan left" v-model="gender" @click="genderClick">
							<span class="sex sexM">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="sexShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="!sexShow" />
								<label>男</label>
							</span>
							<span class="sex sexF">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="!sexShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="sexShow" />
								<label>女</label>
							</span>
						</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>出生日期</label>
						<input type="date" id="birthD7" class="inputText inputWidth left" v-model="birthDate" disabled="disabled" />
						<label class="dateB" for="birthD7">
							<img src="/static/upDown.png" class="upDownImg" />
						</label>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>证件是否长期有效</label>
						<span class="inputText inputSpan left">
							<span class="sex sexM" @click="reChose">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="term" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="!term" />
								<label>是</label>
							</span>
							<span class="sex sexF" @click="reChose">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="!term" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="term" />
								<label>否</label>
							</span>
						</span>
					</p>
					<p class="inputGrop clearFloat" v-show="term">
						<label class="inputLabel left">
							<label class="star">*</label>证件有效期至</label>
						<input type="date" id="birthD8" v-model="termValidityDate" class="inputText inputWidth left" placeholder="请选择证件有效期" />
						<label class="dateB" for="birthD8">
							<img src="/static/upDown.png" class="upDownImg" />
						</label>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>国籍</label>
						<select class="left inputText inputWidth" v-model="reHighs">
							<option :value="c.dicCode" v-for="c in nationalityarr">{{c.dicName}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>婚姻状况</label>
						<select class="left inputText inputWidth" v-model="marType">
							<option selected="selected" value="tp">请选择</option>
							<option :value="mar.dicCode" v-for="mar in marList">{{mar.dicName}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>职业大类</label>
						<select class="left inputText inputWidth" v-model="tbigType" @change="tlittleChange">
							<option selected="selected" value="tp">请选择</option>
							<option :value="tbig.plCode" v-for="tbig in tbigList">{{tbig.plName}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>职业小类</label>
						<select class="left inputText inputWidth" v-model="tlittleType">
							<option selected="selected" value="tp">请选择</option>
							<option :value="tlittle.plCode" v-for="tlittle in tlittleList">{{tlittle.plName}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>工作单位</label>
						<input type="text" class="inputText inputWidth left" v-model="work_address" placeholder="请输入工作单位" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star"></label>固定电话</label>
						<input type="text" class="inputText inputWidth left" v-model="tel" placeholder="请输入固定电话" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>手机号码</label>
						<input type="text" maxlength="11" v-model="phone" class="inputText inputWidth left" placeholder="请输入手机号码" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>邮箱地址</label>
						<input type="text" class="inputText inputWidth left" v-model="email1" placeholder="请输入邮箱" />
					</p>
					<div class="inputGrop1 clearFloat">
						<p class="inputP">
							<label class="inputLabel1 left">
								<label class="star">*</label>所在区域</label>
							<select class="inputText1 inputWidth left" v-model="provinceType" @change="citya">
								<option selected="selected" value="tp">请选择</option>
								<option :value="[province.cnCode,province.cnName]" v-for="(province,index) in provinceList">{{province.cnName}}</option>
							</select>
						</p>
						<p class="inputP">
							<select class="inputText1 inputText2 inputWidth left" v-model="cityType" @change="cityb">
								<option selected="selected" value="tp">请选择</option>
								<option :value="[city.cnCode,city.cnName]" v-for="city in cityList">{{city.cnName}}</option>
							</select>
						</p>
						<p class="inputP">
							<select class="inputText1 inputText2 inputWidth left" v-model="countyType">
								<option selected="selected" value="tp">请选择</option>
								<option :value="[county.cnCode,county.cnName]" v-for="county in countyList">{{county.cnName}}</option>
							</select>
						</p>
					</div>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>通讯地址</label>
						<input type="text" v-model="add" class="inputText inputWidth left" placeholder="请输入通讯地址" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>邮编</label>
						<input type="text" v-model="zipCode" maxlength="6" class="inputText inputWidth left" placeholder="请输入邮编" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>居民税收类型</label>
						<select class="left inputText inputWidth" v-model="zoneType">
							<option v-for="zone in zoneList" :value="zone.value">{{zone.text}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">
							<label class="star">*</label>年收入（万元）</label>
						<input type="text" v-model="pos_money" maxlength="6" class="inputText inputWidth left" placeholder="请输入年收入" />
					</p>
				</div>
			</div>
			<div class="twoCon twoCon1">
				<p class="inputGrop inputSpan money">
					<label class="start left">*</label>您的主要收入来源是什么？</p>
				<div ref="sourceIncome" class="signBox clearFloat">
					<!--<span :class="{selectedSign:index === currentIndex}" v-for="(list ,index) in sourceList" @click="hand(index)" :key="index">{{list.name}}</span>-->
					<span class="selectedSign2" v-for="(list ,index) in sourceList" @click="hand(list.index)" :key="index">{{list.name}}</span>
					<!--<label v-if="!addtest" class="inputLabel2 left bg">请填写</label>
							<input v-if="!addtest" type="text" class="inputText22 left boderbo bg bg1" placeholder="请填写主要收入来源" naxlength="20" v-model="source" />-->
				</div>
			</div>
			<p class="btnBox">
				<span class="btn btn1" @click="toGoApplicant">上一步</span>
				<span class="btn" @click="toGoBen">下一步</span>
			</p>
		</div>
	</div>
</template>

<script>
import { Dictionaries } from "../../assets/js/counry.js";
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
	name: "insured",
	data() {
		return {
			arraySourceIncome: [],
			boxShow: true,
			sexShow: true,
			currentIndex: 0, //收入 
			addtest: true,
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
			//居民类型
			zoneType: '1',
			zoneList: [{
				text: '中国税收居民',
				value: '1'
			},
			{
				text: '非居民',
				value: '2'
			},
			{
				text: '既是中国税收居民又是其他国家（地区）税收居民',
				value: '3'
			}
			],
			//职业大类
			tbigType: '',
			tbigList: [],
			//职业小类
			tlittleType: '',
			tlittleList: [],
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
			//证件有效期
			termValidityDate: '',
			//固定电话
			tel: '',
			//手机号
			phone: '',
			//邮箱
			email1: '',
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
			source: '',
			pos_money: '',
			//性别
			gender: '',
			//居民税收类型
			allData: {},
			main: '',
			dictionaries: ''
		}
	},
	created() {
		console.log(this.$route.query);
		var a = JSON.parse(localStorage.dataList)
		console.log(a)
		if (a != undefined) {
			this.dictionaries = JSON.parse(localStorage.dataList)
		} else {
			var _this = this
			Dictionaries().then((res) => {
				_this.dictionaries = res
			})
		}
		this.birthDate = ""
		if (this.$route.query.status == "2") {
			console.log(this.$route.query.birthday);
			this.appName = this.$route.query.name
			this.birthDate = this.$route.query.birthadty
			this.IDnum = this.$route.query.cardNo
			this.add = this.$route.query.address
			this.termValidityDate = this.$route.query.expiryDates
			// if (this.$route.query.expiryDates == "长期") {
			// 	this.term = false
			// }
			if (this.$route.query.sex == "M") {
				this.sexShow = false
			} else if (this.$route.query.sex == "F") {
				this.sexShow = true
			}
			
		}

		this.echo();
	},
	methods: {
		//回显数据  
		echo() {
			var data = {
				"token": this.$store.state.token,
				"userId": this.$store.state.userId,
				"head": {
					"channelCode": "qtb_h5",
					"deptCode": this.$route.query.cmpCode,
					"oprCode": this.$store.state.userId,
					"prodCode": this.$route.query.prodCode
				},
				"opt": "INSRNT,APPL",
				"pkgNo": this.$route.query.orderNo, //订单号
			}
			this.$http.post(this.$store.state.link5 + '/trd/order/v1/queryorder', data)
				.then(res => {
					console.log(res.data);
					var dataCode = res.data.code;
					console.log("www====" + JSON.stringify(res.data))

					if (dataCode == "SYS_S_000") {

						this.allData = res.data.output;
						this.main = res.data.output.mainResp;
						this.nexChange();
						this.chengshi();
						this.tbigChange();
						//this.zoneType = this.zoneList[0].value;

						if (!this.$route.query.status) {
							this.appName = res.data.output.insrntResp.insrntName; //姓名
							this.IDnum = res.data.output.insrntResp.certfCode; //证件号码
							//this.birthDate = res.data.output.insrntResp.birthday; //出生年月日
							this.birthDate = this.$route.query.birthadty;
							//this.termValidityDate = res.data.output.insrntResp.certfEndTime; //  证件有效期
							this.add = res.data.output.insrntResp.fullAddr; //详细地址
							if (this.$route.query.sex == "M") {
								this.gender = "M" //性别
								this.sexShow = false
							} else if (this.$route.query.sex == "F") {
								this.gender = "F" //性别
								this.sexShow = true
							}
							console.log(this.sexShow)
						}
						console.log(this.sexShow)
						console.log(this.nexusType)

						this.gender = res.data.output.insrntResp.gender;

						if (res.data.output.insrntResp.certfEnduringFlag != undefined) {
							if (res.data.output.insrntResp.certfEnduringFlag == "Y") {
								this.term = false;
							} else {
								this.term = true;
								this.termValidityDate = res.data.output.insrntResp.certfEndTime //  证件有效期
							}
						}

						this.contry = res.data.output.insrntResp.nationality; //国籍

						this.phone = res.data.output.insrntResp.mobile; //手机号码

						this.tel = res.data.output.insrntResp.tel; //固定号码

						this.zipCode = res.data.output.insrntResp.zipCode; //邮编

						this.email1 = res.data.output.insrntResp.email; //邮箱

						this.work_address = res.data.output.insrntResp.workCompany; //工作地点

						if (res.data.output.insrntResp.custIdentity != undefined) {
							this.zoneType = res.data.output.insrntResp.custIdentity
						}

						this.pos_money = res.data.output.insrntResp.salary; // 年收入

						this.tbigType = res.data.output.insrntResp.occType; // 职位大类

						this.tlittleType = res.data.output.insrntResp.occTypeNo; // 职位小类

						this.provinceType = res.data.output.insrntResp.province; // 省

						this.cityType = res.data.output.insrntResp.city; // 市

						this.countyType = res.data.output.insrntResp.county; // 县

						//收入来源
						if (res.data.output.insrntResp.incomeSource == "" || res.data.output.insrntResp.incomeSource == undefined) { } else {

							for (var z = 0; z < res.data.output.insrntResp.incomeSource.split("####").length; z++) {
								if (res.data.output.insrntResp.incomeSource.split("####")[z] == "1") {
									this.hand(z);
								}
							}
							//								this.hand(res.data.output.insrntResp.incomeSource - 1)
						}

					} else {
						this.nexChange();
						Toast(res.data.desc);
					}
				}, res => {
					console.log(res.data);
				})
		},

		//是否
		reChose() {
			if (this.term) {
				this.term = false
			} else {
				this.term = true
			}
		},
		//点击变色  收入来源
		hand(index) {
			if (this.$refs.sourceIncome.childNodes[index].className == "selectedSign2") {
				this.$refs.sourceIncome.childNodes[index].className = "selectedSign1"
				this.arraySourceIncome.push(index)
			} else {
				this.$refs.sourceIncome.childNodes[index].className = "selectedSign2"
				for (var i = 0; i < this.arraySourceIncome.length; i++) {
					if (this.arraySourceIncome[i] == index) {
						this.arraySourceIncome.splice(i, 1);
					}
				}
			}
		},
		toGoApplicant() {
			window.history.go(-1);
		},
		toGoIdCard() {
			this.$router.push('/inIdCard?prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode)
		},
		//性别
		genderClick() {
			// if (this.sexShow) {
			// 	//this.gender = "F";
			// 	this.sexShow = false;
			// } else {
			// 	//this.gender = "M";
			// 	this.sexShow = true;
			// }
		},
		changeCount() {
			console.log(this.cardType);
			if (this.IDnum.length >= 18) {
				if (this.cardType == "A" || this.cardType == "B" || this.cardType == "C") {
					var data = {
						"idcard": this.IDnum,
						"idtype": this.cardType,
						"token": this.$store.state.token,
						"userId": this.$store.state.userId
					}
					this.$http.post(this.$store.state.link + '/cut/cut/validIDCard', data).then(response => {
						console.log(response.data.output);
						if (response.data.code == "SYS_S_000") {
							if (response.data.output.valid == true) {

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
			}else{
					// this.birthDate = "",
					//this.sexShow = false
				}

		},
		nexChange() {
			//关系
			console.log(this.dictionaries)
			this.nexusList = this.dictionaries.relaToAppnt.codeList;
			//console.log(this.allData.applntResp.relationToInsured)
			if (this.allData.applntResp.relationToInsured != undefined) {
				this.nexusType = this.allData.applntResp.relationToInsured;
			} else {
				this.nexusType = "tp";
			}

			// 证件类型
			this.couponList = this.dictionaries.certfType.codeList;
			if (this.allData.insrntResp.certfType != undefined) {
				this.cardType = this.allData.insrntResp.certfType;
			} else {
				this.cardType = "tp";
			}
			// 国籍
			this.nationalityarr = this.dictionaries.nationality.codeList;
			//this.reHighs = this.nationalityarr[27].dicCode;
			console.log(this.nationalityarr)
			this.reHighs = "37";
			// 婚姻状况
			this.marList = this.dictionaries.maritalStatus.codeList;
			if (this.allData.insrntResp.maritalStatus != undefined) {
				this.marType = this.allData.insrntResp.maritalStatus;
			} else {
				this.marType = "tp";
			}
		},

		tbigChange() {
			//职业大类
			var data = {
				"code": "0",
				"orgCode": "000303"
			}
			this.$http.post(this.$store.state.link + '/dic/findProfessionalByOrgCode', data)
				.then(res => {
					//console.log("====" + JSON.stringify(res.data.output));
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.tbigList = res.data.output;
						this.tbigType = "tp";
						if (this.allData.insrntResp.occType != undefined) {
							this.tbigType = this.allData.insrntResp.occType;
						} else {
							this.tbigType = "tp";
						}
						this.tlittleChange();
					} else {
						Toast(res.data.desc);
					}
				}, res => {
					console.log(res.data);
				})
		},
		tlittleChange() {
			var data = {
				"code": this.tbigType,
				"orgCode": "000303"
			}
			this.$http.post(this.$store.state.link + '/dic/findProfessionalByOrgCode', data)
				.then(res => {
					//console.log(JSON.stringify(res.data.output));	
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.tlittleList = res.data.output;
						this.tlittleType = "tp";
						if (this.allData.insrntResp.occTypeNo != undefined) {
							this.tlittleType = this.allData.insrntResp.occTypeNo;
						} else {
							this.tlittleType = "tp";
						}
					} else {

					}
				}, res => {
					console.log(res.data);
				})
		},
		chengshi() {
			var data = {
				"code": "0",
				"orgCode": "000034"
			}
			this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)
				.then(res => {
					//console.log("===" + JSON.stringify(res.data.output));
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.provinceList = res.data.output;
						if (this.allData.insrntResp.province != undefined) {
							for (var i = 0; i < this.provinceList.length; i++) {
								if (this.provinceList[i].cnCode == this.allData.insrntResp.province) {
									this.provinceType = [this.provinceList[i].cnCode, this.provinceList[i].cnName];
								}
							}

						} else {
							this.provinceType = "tp";
						}
						this.citya();
					} else {
						Toast(res.data.desc);
					}
				}, res => {
					console.log(res.data);
				})

		},
		cityb() {
			var data = {
				"code": this.cityType[0],
				"orgCode": "000034"
			}

			this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)
				.then(res => {
					//						console.log("==="+JSON.stringify(res.data))
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.countyList = res.data.output;
						if (this.allData.insrntResp.county != undefined) {
							for (var i = 0; i < this.countyList.length; i++) {
								if (this.countyList[i].cnCode == this.allData.insrntResp.county) {
									this.countyType = [this.countyList[i].cnCode, this.countyList[i].cnName];
								}
							}
						} else {
							this.countyType = "tp";
						}
					} else {

					}
				}, res => {
					console.log(res.data);
				})

		},
		citya(orgCode) {
			var data = {
				"code": this.provinceType[0],
				"orgCode": "000034"
			}
			this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)
				.then(res => {
					//						console.log("===" + JSON.stringify(res.data.output));
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.cityList = res.data.output;
						if (this.allData.insrntResp.city != undefined) {
							for (var i = 0; i < this.cityList.length; i++) {
								console.log(this.cityList[i].cnCode == this.allData.insrntResp.city)
								if (this.cityList[i].cnCode == this.allData.insrntResp.city) {
									this.cityType = [this.cityList[i].cnCode, this.cityList[i].cnName];
								}
							}
						} else {
							this.cityType = "tp";
							this.countyType = "q";
						}
						this.cityb();
					} else {

					}
				}, res => {
					console.log(res.data);
				})

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
		//下一步
		toGoBen() {

			var patrn = /^[0-9]*$/; //固定号码
			//身份证
			var regCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
			var regPh = /^1[0-9]{10}$/; //手机号
			var regT = /^0\d{2,3}[1-9]\d{6,7}$/ //固定号码
			var regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/; //邮箱地址
			var regEm = /^[1-9][0-9]{5}$/; //邮编
			//详细地址
			var regAdd = /^[\u4e00-\u9fa5]{9,}$/;
			var isNum = /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/; //金额校验
			var chinese = /[\u4E00-\u9FA5]/i;
			var myReg = /^([\u4E00-\u9FA5]{2,})+$/;
			
			if (this.appName == "" || this.appName == undefined) {
					Toast('请输入您的姓名');
					return;
			}else if(!myReg.test(this.appName)) {
						Toast("被保险人的姓名必须为汉字，并且需大于等于两个汉字")
						return
			}else if(this.appName.length>50){
						Toast("被保险人的姓名必须小于50个汉字")
			}
			if (this.cardType == "tp") {
				Toast("请选择证件类型")
				return;
			}
			if(this.cardType == "A" || this.cardType == "C" || this.cardType == "D") {
					var Idcard1 = this.IDnum.substring(6, 14); //截取生日字符串
					Idcard1 = Idcard1.substring(0, 4) + "-" + Idcard1.substring(4, 6) + "-" + Idcard1.substring(6, 9);
					
					if(Idcard1 != this.$route.query.birthadty) {
						Toast('证件号码和生日不匹配')
						return;
					}
					
					// var Idcard2 = this.IDnum.substring(16, 17); //截取生日字符串
					// var sex;
					// if(Idcard2 % 2 == 0) {
					// 	sex = "F"
					// } else {
					// 	sex = "M"
					// }
			}
			if(this.cardType == "L"){
					if(this.IDnum.length >10 || this.IDnum.length <7 ){
						Toast('被保险人证件号码有误')
						return
					}
					
				}
				if(this.cardType == "N"){
					if(this.IDnum.length >20 || this.IDnum.length <3 ){
						Toast('被保险人证件号码有误')
						return
					}
					
				}
				if(this.cardType == "P"){
					if(this.IDnum.length >10 || this.IDnum.length <8 ){
						Toast('被保险人证件号码有误')
						return
					}
					
				}
				if(this.cardType == "G" || this.cardType == "I"){
					if(this.IDnum.length >18 || this.IDnum.length <10 ){
						Toast('被保险人证件号码有误')
						return
					}
					
				}
				if(this.cardType == "S"){
					if(this.IDnum.length !=15 ){
						Toast('被保险人证件号码有误')
						return
					}
					
				}
				if(this.cardType == "Q"){
					var regCard = /^[a-zA-Z\d]{11}$/;
					if(!regCard.test(this.IDnum)){
						Toast('被保险人证件号码有误')
						return
					}
					
			}
			if (this.provinceType == "tp" || this.cityType == "tp" || this.countyType == "tp") {
				Toast("请选择城市")
				return;
			}
			var addLength = this.provinceType[1] + this.cityType[1] + this.countyType[1] + this.add;
			if (addLength.length < 16) {
				Toast('省市县地址+详细地址长度应大于16个字')
				return;
			}
			
			
			if (this.IDnum == "" || this.IDnum == undefined) {
				Toast('请输入您的证件号码');
				return;
			} else {
				if (chinese.test(this.IDnum)) {
					Toast('请输入正确的证件号码');
					return;
				}

				if (this.IDnum.length != 18) {
					Toast('证件号码不合法')
					return;
				}
			}
			if (this.term) {
				if (this.termValidityDate == "" || this.termValidityDate == undefined) {
					Toast('请选择证件有效期')
					return;
				}
			}
			if (this.reHighs == "" || this.reHighs == undefined) {
				Toast('请选择您的国籍');
				return;
			}
			if (this.marType == "tp") {
				Toast("请选择婚姻状况")
				return;
			}
			if (this.phone == "" || this.phone == undefined) {
				Toast('请输入您的手机号');
				return;
			}
			if (this.phone != "" && this.phone != undefined && !regPh.test(this.phone)) {
				Toast('手机号码格式不正确');
				return;
			}
			if (this.tel == "" || this.tel == undefined) { } else {
				if (!patrn.test(this.tel)) {
					Toast("固定号码格式不正确")
					return;
				}
			}
			if (this.email1 == "" || this.email1 == undefined) {
				Toast('请输入邮箱地址');
				return;
			}
			if (this.email1 != "" && this.email1 != undefined && !regEmail.test(this.email1)) {
				Toast('邮箱格式不正确');
				return;
			}
			var addLength = this.provinceType[1] + this.cityType[1] + this.countyType[1] + this.add;
				if(addLength.length < 16) {
					Toast('省市县地址+通讯地址长度应大于16个字')
					return;
			}
			if (this.add == "" || this.add == undefined) {
				Toast('请输入您的详细地址');
				return;
			}
			if (this.zipCode == '' || this.zipCode == undefined) {
				Toast('请输入邮编地址')
				return;
			}
			if (this.zipCode != '' && this.zipCode != undefined && !regEm.test(this.zipCode)) {
				Toast('邮编地址格式不正确');
				return;
			}
			if (this.tbigType == "tp" || this.tlittleType == "tp") {
				Toast("请选择职业类别")
				return;
			}
			if (this.work_address == "" || this.work_address == undefined) {
				Toast('请输入您的工作单位');
				return;
			}
			if (this.pos_money == "" || this.pos_money == undefined) {
				Toast('请输入您的固定收入');
				return;
			}
			if (isNum.test(this.pos_money) == false) {
				Toast('固定收入格式不正确');
				return;
			}
			if (this.arraySourceIncome.length == 0) {
				Toast('请选择收入来源');
				return;
			}
			var incomeSource = ""
			var incomeSourceA = "0";
			var incomeSourceB = "0"
			var incomeSourceC = "0"
			var incomeSourceD = "0"
			for (var k = 0; k < this.arraySourceIncome.length; k++) {
				if (this.arraySourceIncome[k] == "0") {
					incomeSourceA = "1"
				}
				if (this.arraySourceIncome[k] == "1") {
					incomeSourceB = "1"
				}
				if (this.arraySourceIncome[k] == "2") {
					incomeSourceC = "1"
				}
				if (this.arraySourceIncome[k] == "3") {
					incomeSourceD = "1"
				}
			}
			incomeSource = incomeSourceA + "####" + incomeSourceB + "####" + incomeSourceC + "####" + incomeSourceD;
			var certfEnduringFlag; //有效期NY
			var addcertfEndTime; //有效期时间
			if (this.term) {
				certfEnduringFlag = "N";
				addcertfEndTime = this.termValidityDate
			} else {
				certfEnduringFlag = "Y";
				addcertfEndTime = "9999-09-09"
			}

			var msg = {
				"birthday": this.birthDate, //出生年月 : 格式yyyy-MM-dd ,
				"certfCode": this.IDnum, //证件号码 ,
				"certfEndTime": addcertfEndTime, //证件有效期 : 格式yyyy-MM-dd ,
				"certfEnduringFlag": certfEnduringFlag, //证件长期有效标志 : Y-是;N-否 ,
				"certfType": this.cardType, //证件类型 ,
				"province": this.provinceType[0], // 地址省 ,
				"city": this.cityType[0], //地址市
				"county": this.countyType[0], //地址区县 
				"email": this.email1, //邮箱
				"fullAddr": this.add, //通讯地址
				"gender": this.gender, //性别 : M-男;F-女 ,
				"incomeSource": incomeSource, //收入来源 ,
				"insrntName": this.appName, //被保险人姓名 ,
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
				"occName": "1010100",//工作
			}
			if (this.$route.query.status == "2") {
				var msg1 = [
					{
						"docFileName": "被保险人身份证正面",//单证文件名 
						"docType": "00401011", //单证类型
						"fileSerialNo": this.$route.query.insuredcardno,//文件序列号 : 文件在影像系统唯一标识 
						"remark": "",//备注 
						"showOrder": 3 //显示顺序
					},
					{
						"docFileName": "被保险人身份证反面",//单证文件名 
						"docType": "00401012", //单证类型
						"fileSerialNo": this.$route.query.insuredsite,//文件序列号 : 文件在影像系统唯一标识 
						"remark": "",//备注 
						"showOrder": 4 //显示顺序
					}
				]
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
					"opt": "INSRNT,DOC",
					"mainReq": this.mainResp,
					"pkgNo": this.$route.query.orderNo, //订单号
					"insrntReq": msg,
					"docReq": msg1//影像
				}
				Indicator.open();
				console.log("请求数据==" + JSON.stringify(data));
				this.$http.post(this.$store.state.link5 + '/trd/order/v1/saveorder', data)
					.then(res => {
						Indicator.close();
						console.log("响应数据=====" + JSON.stringify(res.data))
						if (res.data.code == "SYS_S_000") {
							this.$router.push('/ben?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&prodNo=" + this.$route.query.prodNo)
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						Indicator.close();
						//console.log(res.data);
					})
			} else {
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
					"opt": "INSRNT",
					"mainReq": this.mainResp,
					"pkgNo": this.$route.query.orderNo, //订单号
					"insrntReq": msg
				}
				Indicator.open();
				console.log("请求数据==" + JSON.stringify(data));
				this.$http.post(this.$store.state.link5 + '/trd/order/v1/saveorder', data)
					.then(res => {
						Indicator.close();
						console.log("响应数据=====" + JSON.stringify(res.data))
						if (res.data.code == "SYS_S_000") {
							this.$router.push('/ben?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&prodNo=" + this.$route.query.prodNo)
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						Indicator.close();
						//console.log(res.data);
					})
			}


		},
		isCardID(sId) {
			var iSum = 0;
			var info = "";
			if (!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
			sId = sId.replace(/x$/i, "a");
			var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
			var d = new Date(sBirthday.replace(/-/g, "/"));
			if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
			for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
			if (iSum % 11 != 1) return "你输入的身份证号非法";
			return "true";
		},
		idIdnum() {
			var str = this.isCardID(this.IDnum);
			if (str == "true") {
				var Idcard = this.IDnum.substring(6, 14); //截取生日字符串
				Idcard = Idcard.substring(0, 4) + "-" + Idcard.substring(4, 6) + "-" + Idcard.substring(6, 9);
				//this.birthDate = Idcard;
				// if (parseInt(this.IDnum.substr(16, 1)) % 2 == 1) {
				// 	this.sexShow = false
				// } else {
				// 	this.sexShow = true
				// }
			}
		}

	},
	components: {

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

.selectp {
	padding-right: 0.48rem;
	border: none;
	background: none;
	/* background: url(/static/upDown.png) no-repeat right center; */
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
	border-bottom: solid 0.01rem #C8C7CC;
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
	color: #333333;
}

.inputText1 {
	height: 0.68rem;
	font-size: 0.28rem;
	color: #333333;
}

.inputText2 {
	margin-left: 3.22rem;
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

.inputLabel2 {
	display: block;
	/*width: 1rem;*/
	height: 0.88rem;
	line-height: 0.88rem;
	/*font-weight: bold;*/
	color: #555555;
}

.bg {
	margin-top: 0.2rem;
}

.boderbo {
	/*width: 5.5rem;*/
	border: none;
	border-radius: 0;
	border-bottom: 0.02rem solid #979797;
	/*margin-bottom: 0.32rem;*/
}

.bg1 {
	margin-left: 0.2rem;
}

.inputText22 {
	width: 2.7rem;
	height: 0.88rem;
	font-size: 0.28rem;
	color: #333333;
	padding-left: 0;
}

.start {
	display: block;
	height: 0.88rem;
	line-height: 0.88rem;
	color: red;
}

.money {
	width: 100%;
}

.signBox {
	padding-bottom: 0.32rem;
	/*margin-bottom: 0.64rem;*/
}



/*.signBox span {
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
	
	.signBox span.selectedSign {
		background: #54CCC1;
		color: #FFFFFF;
	}*/

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
</style>