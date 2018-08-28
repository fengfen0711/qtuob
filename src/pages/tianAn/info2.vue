<template>
	<div class="one" :class="{opa1:!hui}" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<!--<div class="oneTitle">
			<img src="../../../static/img/ranch2.png" class="ranchImg" />
			<p class="oneTitleText clearFloat">
				<span class="oneTitleTextSpan1 left selected">投保人信息</span>
				<span class="oneTitleTextSpan2 left selected">被保险人信息</span>
				<span class="oneTitleTextSpan3 right">受益人信息</span>
			</p>
		</div>-->
		<div class="twoCon">
			<p v-if="hui" class="title_twoCon clearFloat" :class="{borderNone:!policyHolderShow}">
				<label class="titleLable_twoCon left">被保险人信息</label>
				<img src="/static/img/leftImg.png" class="btnImg right" v-show="!policyHolderShow" @click="policyHolderShowHide" />
				<img src="/static/img/downImg.png" class="btnImg right" v-show="policyHolderShow" @click="policyHolderShowHide" />
			</p>
			<div class="policyHolder" v-show="policyHolderShow">
				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="startopacity left">*</label>与投保人关系</label>
					<select v-model="nexusType" class="left inputText inputWidth" @change="nexChange" :disabled="disabled">z
						<option :value="nexus.code" v-for="nexus in nexusList">{{nexus.name}}</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="startopacity left">*</label>姓名</label>
					<input type="text" class="inputText left" maxlength="20" v-model="policyHolderName" placeholder="请输入真实姓名" :disabled="disabled" />
					<!--<span class="sumBtn">+</span>-->
				</p>
				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>
					<input type="date" class="inputText dateInput left" v-model="birthDate" placeholder="请选择出生日期" :disabled="disabled" />
					<span class="dateBox1"></span>
					<!--<img src="/static/img/upDown.png" class="upDownImg upDownImg2" />-->
				</p>
				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="startopacity left">*</label>被保险人性别</label>
					<span class="inputText inputSpan left">
							<input type="text" class="inputText left" maxlength="20" v-model="gender" placeholder="请输入真实姓名" :disabled="disabled" />
							<!--<label class="labsex">{{gender}}</label>-->
					</span>
				</p>

				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="start left">*</label>证件类型</label>
					<select name="name_car" v-model="cardType" class="left inputText inputWidth" @change="cardnum">
						<option :value="certfType.code" v-for="certfType  in couponList">{{certfType.name}}</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="start left">*</label>证件号码</label>
					<input @input="cardnum" type="text" maxlength="18" class="inputTextCard left" v-model="IDnum" placeholder="请输入证件号码" />
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>证件有效期至</label>
					<span class="brspanbo " :class="{opa0:spanFlag}">请选择证件有效期</span>
					<input type="date" id="dateTime1" class="inputText dateInput dateInput1 left" :class="{opa0:!spanFlag}" placeholder="请选择证件有效期" v-model="termValidityDate" @click="termValidityDateSel" @change="termValidityDateSel" />
					<span class="dateBox" @click="dateSel">
						<img src="/static/img/sexNo.png" class="selImg" v-show="termValidityDateShow" />
						<img src="/static/img/selected.png" class="selImg" v-show="!termValidityDateShow" />
						<span>长期</span>
					</span>
					<!--<img src="/static/img/upDown.png" class="upDownImg upDownImg2" />-->
					<label class="dateB" for="dateTime1">
						<img src="/static/upDown.png" class="upDownImg3" />
					</label>
				</p>

				<!--<p class="inputGrop clearFloat">
					<label class="inputLabel left">国籍</label>
					<input type="tel" maxlength="11" class="inputText left" v-model="contry" placeholder="请输入国籍" />
				</p>-->
				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="start left">*</label>国籍</label>
					<select v-model="reHighs" class="inputLabel inputWidth left">
						<option :value="c.code" class="inputText left" v-for="c in nationalityarr">{{c.name}}</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>婚姻状况</label>
					<!--<select class="inputText inputselect pro inputWidth left" v-model="marType">
						<option :value="mar.code" v-for="mar in marList">{{mar.name}}</option>
					</select>-->
					<select v-model="marType" class="inputLabel inputWidth left">
						<option :value="mar.code" v-for="mar in marList">{{mar.name}}</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>手机号码</label>
					<input type="tel" maxlength="11" class="inputText left" v-model="phone" placeholder="请输入手机号码" />
				</p>
				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="startopacity left">*</label>固定电话</label>
					<input type="tel" v-model="tel" maxlength="11" class="inputText left" placeholder="请输入固定电话" />
				</p>
				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="startopacity left">*</label>邮箱地址</label>
					<input type="text" class="inputText left" v-model="email1" placeholder="请输入邮箱" />
				</p>
				<div class="inputGrop1 clearFloat">
					<p class="inputselectP">
						<label class="inputLabel3 inputLabel1 left"><label class="start left">*</label>联系地址</label>
						<select class="inputText inputselect pro inputWidth left" v-model="provinceType" @change="pullProvince">
							<option :value="[province.cnCode,province.cnName]" v-for="(province,index) in provinceList">{{province.cnName}}</option>
						</select>
					</p>
					<p class="inputselectP">
						<select class="inputText1 inputWidth" v-model="cityType" @change="pullCity">
							<option :value="[city.cnCode,city.cnName]" v-for="city in cityList">{{city.cnName}}</option>
						</select>
					</p>
					<p class="inputselectP padleftitem">
						<select class="inputText1 inputWidth" v-model="countyType">
							<option :value="[county.cnCode,county.cnName]" v-for="county in countyList">{{county.cnName}}</option>
						</select>
					</p>
				</div>
				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="start left">*</label>详细地址</label>
					<input type="text" class="inputText inputWidth inputWidth11 left" v-model="add" placeholder="请输入详细地址" />
				</p>
				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="start left">*</label>邮编</label>
					<input type="text" maxlength="6" class="inputText left" v-model="zipCode " placeholder="请输入邮编" />
				</p>
				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="start left">*</label>工作单位</label>
					<input type="text" class="inputText left" v-model="work_address" placeholder="请输入工作单位" />
				</p>
				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="start left">*</label>职业</label>
					<input type="text" class="inputText left" v-model="occName" placeholder="" :disabled="disabled" />
				</p>

				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="start left">*</label>身高（cm）</label>
					<input type="tel" maxlength="3" class="inputText left" v-model="reHigh" placeholder="请输入身高" />
				</p>
				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="start left">*</label>体重（kg）</label>
					<input type="tel" maxlength="3" class="inputText left" v-model="reWeight" placeholder="请输入体重" />
				</p>
				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="start left">*</label>固定年收入(万元)</label>
					<input type="tel" maxlength="11" v-model="pos_money" class="inputText left" placeholder="请输入固定年收入" />
				</p>
			</div>
		</div>
		<div class="twoCon twoCon1">

			<p class="inputGrop inputSpan"><label class="start left">*</label>您的主要收入来源是什么？</p>
			<div class="signBox clearFloat">
				<span :class="{selectedSign:index === currentIndex}" v-for="(list ,index) in sourceList" @click="hand(index)" :key="index">{{list.name}}</span>
				<label v-if="!addtest" class="inputLabel2 left bg">请填写</label>
				<input v-if="!addtest" type="text" class="inputText2 left boderbo bg bg1" placeholder="请填写主要收入来源" naxlength="20" v-model="source" />
			</div>
			<!--<p v-if="!addtest" class="inputGrop inputSpan">
				<label class="inputLabel2 left">请填写</label>
				<input type="text" class="inputText left boderbo" placeholder="请填写主要收入来源" naxlength="20" v-model="source" />
			</p>-->
		</div>
		<p v-if="hui" class="btnBox clearFloat" :class="{btnBox1:!policyHolderShow}">
			<span class="btn btn1 left" @click="handleClickUp">上一步</span>
			<span class="btn left" @click="handleClickNext">下一步</span>
		</p>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "Info2",
		props: ['backview'],
		data() {
			return {
				idCardFlag: false,
				spanFlag: false,
				disabled: true,
				currentIndex: 0,
				policyHolderShow: true,
				//证件类型
				cardType: '',
				//国籍
				reHighs: "",
				nationalityarr: [],

				sexShow: false,
				//与投保人关系
				nexusType: '',
				nexusList: [],
				//收入来源
				sourceList: [],
				marType: '',
				marList: [],
				couponList: [],
				certfType: '',
				policyHolderName: '',
				IDnum: '',
				termValidityDateShow: true,
				termValidityDate: '',
				birthDate: '',
				phone: '',
				tel: '',
				zipCode: '',
				email1: '',
				work_address: '',
				add: '',
				gender: '', //性别
				city: '',
				county: '',
				province: '',
				contry: '',
				mar: '',
				reHigh: '',
				reWeight: '',
				provinceType: [],
				provinceList: [],
				cityType: [],
				cityList: [],
				countyType: [],
				countyList: [],
				bigType: '',
				bigName: '',
				bigList: [],
				middleType: '',
				middleName: '',
				middleList: [],
				littleType: '',
				littleName: '',
				littleList: [],
				money: '',
				addtest: true,
				pos_money: '',
				occName: '',
				allData: [], //页面总数据
				source: '',
				hui: true,
				sameDay: ''
			}
		},
		created() {
			if(this.backview == "hui") {
				this.hui = false;
				this.disabled = false;
			}
			var myDate1 = new Date();
			var dayd = myDate1.getDate();
			if(myDate1.getMonth() < 10) {
				var monthm = "0" + (myDate1.getMonth() + 1);
			}
			if(myDate1.getDate() < 10) {
				dayd = "0" + myDate1.getDate();
			}
			var datewd = myDate1.getFullYear() + "-" + monthm + "-" + dayd;
			this.sameDay = datewd.toString();

			this.Sourceofincome(); //收入来源
			this.getCouponSelected();
			this.marryChange();
			this.nexChange();
			this.nationalitySelect();
			this.pullArea(); //城市
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
			//          三级联动
			var data = {
				"code": "orgCode",
				"orgCode": "000034",
			}
			var data = {
				"token": this.$route.query.token,
				"userId": this.$route.query.userId,
				"head": {
					"channelCode": "qtb_h5",
					"deptCode": this.$route.query.cmpCode,
					"oprCode": this.$route.query.userId,
					"prodCode": this.$route.query.prodCode

				},
				"opt": "APPL,INSRNT",
				"pkgNo": this.$route.query.orderNo, //订单号
			}
			//回显数据
			this.$http.post(this.$store.state.link + '/trd/order/v1/queryorder', data)
				.then(res => {
					console.log(res.data);
					var dataCode = res.data.code;
					if(dataCode == "SYS_S_000") {
						this.allData = res.data.output;
						//						this.nexusType = res.data.output.applntResp.relationToInsured;

						this.occName = res.data.output.insrntResp.occDetailType + "  " + res.data.output.insrntResp.occName; //职业名称
						if(res.data.output.insrntResp.gender == "M") {
							this.gender = "男"
						} else {
							this.gender = "女"
						}
						this.policyHolderName = res.data.output.insrntResp.insrntName; //姓名

						if(res.data.output.insrntResp.certfCode != undefined) {
							if(res.data.output.insrntResp.certfCode.length == 0) {
								this.idCardFlag = false;
							} else {
								this.idCardFlag = true;
							}
						}
						this.IDnum = res.data.output.insrntResp.certfCode; //证件号码

						//						this.termValidityDate = res.data.output.insrntResp.certfEndTime; //证件有效期
						if(res.data.output.insrntResp.certfEnduringFlag != undefined) {
							if(res.data.output.insrntResp.certfEnduringFlag == "Y") {
								this.termValidityDateShow = false;
								this.spanFlag = false;
							} else {
								this.spanFlag = true
								this.termValidityDateShow = true;
								this.termValidityDate = res.data.output.insrntResp.certfEndTime //  证件有效期
							}
						} else {
							this.spanFlag = false;
						}
						this.birthDate = res.data.output.insrntResp.birthday; //出生年月日

						this.contry = res.data.output.insrntResp.nationality; //国籍

						this.phone = res.data.output.insrntResp.mobile; //手机号码

						this.tel = res.data.output.insrntResp.tel; //固定号码

						this.add = res.data.output.insrntResp.fullAddr; //详细地址

						this.zipCode = res.data.output.insrntResp.zipCode; //邮编

						this.email1 = res.data.output.insrntResp.email; //邮箱

						this.work_address = res.data.output.insrntResp.workCompany; //工作地点

						this.reWeight = res.data.output.insrntResp.weight; //体重

						this.reHigh = res.data.output.insrntResp.height; //身高

						this.pos_money = res.data.output.insrntResp.salary; // 固定收入
						if(res.data.output.insrntResp.incomeSource == "" || res.data.output.insrntResp.incomeSource == undefined) {} else {
							this.hand(res.data.output.insrntResp.incomeSource - 1)
						}

						if(res.data.output.insrntResp.province == "" || res.data.output.insrntResp.province == undefined) {} else {
							this.pullArea1();
						}

					} else {
						Toast(res.data.desc);
					}
				}, res => {
					console.log(res.data);
				})
		},
		methods: {
			Sourceofincome() {
				var data = { //天安人寿
					"orgCode": "000034",
					"type": "1"
				}

				this.$http.post(this.$store.state.link + '/dic/findDicTotalByOrgCode', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.sourceList = res.data.output;
							//							for(var i = 0; i < this.sourceList.length; i++) {
							//								if(this.sourceList[i].name == this.allData.insrntResp.incomeSource) {
							//									this.hand(i);
							//								}
							//							}
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			hand(index) {
				console.log(index)
				this.currentIndex = index
				if(index == 6) {
					this.addtest = false;
				} else {
					this.addtest = true;
				}
			},
			getCouponSelected() {
				//          证件类型
				var data = {
					"orgCode": "000034",
					"type": "5",

				}
				this.$http.post(this.$store.state.link + '/dic/findDicTotalByOrgCode', data).then(res => {
					//				console.log("===="+JSON.stringify(res.data.output));
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
			marryChange() {
				//          婚姻状况类型
				var data = {
					"orgCode": "000034",
					"type": "2",

				}
				this.$http.post(this.$store.state.link + '/dic/findDicTotalByOrgCode', data).then(res => {
					//				console.log("===="+JSON.stringify(res.data.output));
					var dataCode = res.data.code;
					if(dataCode == "SYS_S_000") {
						this.marList = res.data.output;
					} else {
						Toast(res.data.desc);
					}
				}, res => {
					console.log(res.data);
				})
			},
			nexChange() {
				var data = {
					"type": "A"
				}

				this.$http.post(this.$store.state.link + '/dic/findCustomerTypeForTianAn', data)
					.then(res => {
						//					console.log("====" + JSON.stringify(res.data.output));
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.nexusList = res.data.output;
							//	            	console.log("====sasa"+JSON.stringify( this.marList));
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
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			pullArea() {
				var data = {
					"code": "0",
					"orgCode": "000034"
				}

				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							// this.provinceType = res.data.output.cnName
							this.provinceList = res.data.output;
							this.provinceType = [res.data.output[0].cnCode, res.data.output[0].cnName];
							this.pullProvince();
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			pullArea1() {
				var data = {
					"code": "0",
					"orgCode": "000034"
				}
				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							//调取所有的省份
							this.provinceList = res.data.output;
							for(var i = 0; i < this.provinceList.length; i++) {
								if(this.provinceList[i].cnCode == this.allData.insrntResp.province) {
									this.provinceType = [this.allData.insrntResp.province, this.provinceList[i].cnName];
								}
							}
							this.pullProvince1();
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			pullProvince(orgCode) {

				var data = {
					"code": this.provinceType[0],
					"orgCode": "000034"
				}

				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)

					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.cityList = res.data.output;
							this.cityType = [res.data.output[0].cnCode, res.data.output[0].cnName];
							this.pullCity();
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			pullProvince1() {
				//用省调取所有的市
				var data = {
					"code": this.provinceType[0],
					"orgCode": "000034"
				}
				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.cityList = res.data.output;
							for(var i = 0; i < this.cityList.length; i++) {
								if(this.cityList[i].cnCode == this.allData.insrntResp.city) {
									this.cityType = [this.allData.insrntResp.city, this.cityList[i].cnName];
								}
							}
							this.pullCity1();
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			pullCity() {
				var data = {
					"code": this.cityType[0],
					"orgCode": "000034"
				}

				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)

					.then(res => {
						//          console.log("asdasdasd==="+JSON.stringify(res.data))
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.countyList = res.data.output;
							this.countyType = [res.data.output[0].cnCode, res.data.output[0].cnName];
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			pullCity1() {
				var data = {
					"code": this.cityType[0],
					"orgCode": "000034"
				}

				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.countyList = res.data.output;
							for(var i = 0; i < this.countyList.length; i++) {
								if(this.countyList[i].cnCode == this.allData.insrntResp.county) {
									this.countyType = [this.allData.insrntResp.county, this.countyList[i].cnName];
								}
							}

						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			isCardID(sId) {
				var iSum = 0;
				var info = "";
				if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
				sId = sId.replace(/x$/i, "a");
				//			if(aCity[parseInt(sId.substr(0, 2))] == null) return "你的身份证地区非法";
				var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
				var d = new Date(sBirthday.replace(/-/g, "/"));
				if(sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
				for(var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
				if(iSum % 11 != 1) return "你输入的身份证号非法";
				return "true";
			},
			cardnum() {
				if(this.cardType == "0" && this.termValidityDateShow == false) {
					if(this.jsGetAge(this.birthDate) < 46) {
						this.termValidityDate = "";
						this.termValidityDateShow = true;
						this.spanFlag = false;
					}
				}
				if(this.IDnum == "" || this.IDnum == undefined) {
					return;
				}
				if(this.IDnum.length == 18) {
					if(this.cardType == "0" || this.cardType == "4" || this.cardType == "C") {
						if(this.IDnum != "") {
							var data = {
								"idcard": this.IDnum,
								"idtype": this.cardType
							}
							Indicator.open();
							this.$http.post(this.$store.state.link + '/cut/cut/validIDCard', data).then(response => {
								console.log(response.data);
								Indicator.close();
								if(response.data.code == "SYS_S_000") {
									if(response.data.code == "SYS_S_000" && response.data.output.valid == true) {
										this.idCardFlag = true;
									} else {
										this.idCardFlag = false;
									}
								} else {
									Toast("身份不合法");
								}
							}, response => {
								Indicator.close();
								this.idCardFlag = false;
								console.log("ajax error");
							});
						}
					}

				} else {}

			},
			policyHolderShowHide() {
				this.policyHolderShow = !this.policyHolderShow
			},
			dateSel() {
				if(this.cardType == "0") {
					if(this.jsGetAge(this.birthDate) >= 46) {
						if(this.termValidityDateShow) {
							//选中
							this.termValidityDate = ""
							this.spanFlag = false;
							this.termValidityDateShow = false;
						} else {
							this.termValidityDateShow = true;
						}
					} else {}
				} else {
					if(this.termValidityDateShow) {
						//有效
						this.termValidityDate = "";
						this.termValidityDateShow = false;
						this.spanFlag = false;
					} else {
						this.termValidityDateShow = true;
					}
				}

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
				if(this.termValidityDate == "") {
					this.spanFlag = false;
				} else {
					this.spanFlag = true;
				}
				this.termValidityDateShow = true;
			},
			handleClickUp() {
				//				this.$router.push('/info1?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
				window.history.go(-1)
			},
			handleClickNext() {
				var patrn = /^[0-9]*$/;
				//身份证
				var regCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				//手机号
				var regPh = /^1[0-9]{10}$/; //手机号
				var regT = /^0\d{2,3}[1-9]\d{6,7}$/ //固定号码
				//邮箱
				var regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/; //邮箱地址
				//邮编
				var regEm = /^[1-9][0-9]{5}$/; //邮编
				//详细地址
				var regAdd = /^[\u4e00-\u9fa5]{9,}$/;
				var isNum = /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/; //金额校验
				var chinese = /[\u4E00-\u9FA5]/i;
				var addLength = this.provinceType[1] + this.cityType[1] + this.countyType[1] + this.add;

				if(this.IDnum == "" || this.IDnum == undefined) {
					Toast('请输入您的证件号码');
					return;
				} else {
					if(chinese.test(this.IDnum)) {
						Toast('请输入正确的证件号码');
						return;
					}
					if(this.cardType == "0" || this.cardType == "4" || this.cardType == "C") {
						if(this.IDnum.length != 18) {
							Toast('证件号码位数不正确')
							return;
						}
						if(!this.idCardFlag) {
							Toast('证件号码格式不正确')
							return;
						}
					}
				}
				if(this.cardType == "0" || this.cardType == "4" || this.cardType == "C") {
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
					if(this.gender != sex) {
						Toast('证件号码和性别不匹配')
						return;
					}
				}
				if(this.termValidityDateShow) {
					if(this.termValidityDate == "" || this.termValidityDate == undefined) {
						Toast('请选择证件有效期')
						return;
					}
				}

				if(this.cardType == "4" || this.cardType == "F") {
					if(this.termValidityDateShow == true) {
						Toast('证件类型为户口本、出生证明时,证件有效期只能为长期')
						return;
					}
				}
				if(this.cardType == "C") {
					if(!this.termValidityDateShow) {
						Toast('证件类型为临时身份证，有效期不能大于三个月')
						return;
					}
					if(this.termValidityDateShow) {
						var date1 = this.sameDay.split("-");
						var date2 = this.termValidityDate.split("-");
						var year1 = parseInt(date1[0]);
						var month1 = parseInt(date1[1]);
						var year2 = parseInt(date2[0]);
						var month2 = parseInt(date2[1]);
						var day1 = parseInt(date1[2]);
						var day2 = parseInt(date2[2]);
						var months = (year2 - year1) * 12 + (month2 - month1);
						if(day2 > day1) {
							months = months + 1
						}
						if(months > 3) {
							Toast('证件类型为临时身份证，有效期不能大于三个月')
							return
						}
					}
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
				if(this.telPhone == "" || this.telPhone == undefined) {} else {
					if(!patrn.test(this.telPhone)) {
						Toast("固定号码格式不正确")
						return;
					}
				}
				//				if(this.email1 == "" || this.email1 == undefined) {
				//					Toast('请输入您的邮箱');
				//					return;
				//				}
				if(this.email1 != "" && this.email1 != undefined && !regEmail.test(this.email1)) {
					Toast('邮箱格式不正确');
					return;
				}
				if(addLength.length < 16) {
					Toast('省市县地址+详细地址长度应大于16个字')
					return;
				}
				if(this.add == "" || this.add == undefined) {
					Toast('请输入您的详细地址');
					return;
				}
				if(this.zipCode == '' || this.zipCode == undefined) {
					Toast('请输入邮编地址')
					return;
				}
				if(this.zipCode != '' && !regEm.test(this.zipCode)) {
					Toast('邮编地址格式不正确')
					return;
				}
				if(this.work_address == "" || this.work_address == undefined) {
					Toast('请输入您的工作单位');
					return;
				}
				if(this.reHigh == "" || this.reHigh == undefined) {
					Toast('请输入您的身高');
					return;
				}
				if(isNum.test(this.reHigh) == false) {
					Toast('身高格式不正确');
					return;
				}
				if(this.reWeight == "" || this.reWeight == undefined) {
					Toast('请输入您的体重');
					return;
				}
				if(isNum.test(this.reWeight) == false) {
					Toast('体重格式不正确');
					return;
				}

				if(this.pos_money == "" || this.pos_money == undefined) {
					Toast('请输入您的固定收入');
					return;
				}
				if(isNum.test(this.pos_money) == false) {
					Toast('固定收入格式不正确');
					return;
				}

				var myDate = new Date();
				var day = myDate.getDate();
				if(myDate.getMonth() < 10) {
					var month = "0" + (myDate.getMonth() + 1);
				}
				if(myDate.getDate() < 10) {
					day = "0" + myDate.getDate();
				}
				var datew = (myDate.getFullYear()) + "-" + month + "-" + day;
				var datew1 = datew.toString();
				var d1 = datew.replace(/\-/g, "\/");
				var d2 = this.termValidityDate.replace(/\-/g, "\/");
				if(datew != "" && this.termValidityDate != "" && d1 > d2) {
					Toast('有效期时间不可以选择今天之前')
					return;
				}

				var certfEnduringFlag; //有效期NY
				var addcertfEndTime; //有效期时间
				if(this.termValidityDateShow) {
					certfEnduringFlag = "N";
					addcertfEndTime = this.termValidityDate
				} else {
					certfEnduringFlag = "Y";
					addcertfEndTime = "9999-09-09"
				}

				var msg = {
					"address": this.add, //地址街道 
					"age": this.jsGetAge(this.birthDate), //年龄
					"birthday": this.birthDate, //出生年月 : 格式yyyy-MM-dd ,
					"certfCode": this.IDnum, //证件号码 ,
					"certfEndTime": addcertfEndTime, //证件有效期 : 格式yyyy-MM-dd ,
					"certfEnduringFlag": certfEnduringFlag, //证件长期有效标志 : Y-是;N-否 ,
					"certfType": this.cardType, //证件类型 ,
					"city": this.cityType[0], //地址市
					"county": this.countyType[0], //地址区县 
					"email": this.email1, //邮箱
					"fullAddr": this.add, //详细地址
					"gender": this.allData.insrntResp.gender, //性别 : M-男;F-女 ,
					"height": this.reHigh, //身高 ,
					"incomeSource": this.currentIndex + 1, //收入来源 ,
					"insrntName": this.policyHolderName, //被保人姓名 ,
					//					"insuNo": "string", //被投保人编号 ,
					//					"insuRelationToMaininsu": this.nexusType, //被保人与主被保人关系
					//					"insuRelationToMaininsu": "00", //被保人与主被保人关系
					//					"language": "string", //语言 
					//					"mainInsured": "0", //主被保人标志 ,
					"maritalStatus": this.marType, //婚姻状态 ,
					"mobile": this.phone, //联系电话 
					"nationality": this.reHighs, //国籍
					//					"occCate": "0", //职业类别 
					"occDetailType": this.allData.insrntResp.occDetailType, // 职业中类 ,
					"occDetailTypeNo": this.allData.insrntResp.occDetailTypeNo, //职业中类代码
					"occName": this.allData.insrntResp.occName, //职业名称
					"occNo": this.allData.insrntResp.occNo, //职业名称代码 
					"occType": "", //职业大类
					"occTypeNo": "", //职业大类代码 ,
					//					"peersInsuredAmt": 0, //同业保额 
					"province": this.provinceType[0], // 地址省 ,
					"relaToAppnt": this.nexusType, //与投保人关系 ,
					//					"relaToAppnt": "00", //与投保人关系 ,
					"salary": this.pos_money, //年收入
					//					"socialsecurityStatus": "Y", // 社保状态 : Y-是;N-否 ,
					"tel": this.tel, //固定电话
					"weight": this.reWeight, //体重
					"workCompany": this.work_address, //工作单位 ,
					"zipCode": this.zipCode, //邮编 ,
					//					"zoneType": "string" //居民类型
					"custIdentity": "1"
				}
				var data = {
					"token": this.$route.query.token,
					"userId": this.$route.query.userId,
					"mark": "UC",
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$route.query.userId,
						"prodCode": this.$route.query.prodCode
					},
					"opt": "INSRNT",
					"pkgNo": this.$route.query.orderNo, //订单号
					"insrntReq": msg
				}
				Indicator.open();
				this.$http.post(this.$store.state.link + '/trd/order/v1/saveorder', data)
					.then(res => {
						Indicator.close();
						console.log("响应数据=====" + JSON.stringify(res.data))
						if(res.data.code == "SYS_S_000") {
							this.$router.push('/info3?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					})
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
			},
			reSexChose() {
				this.sexShow = !this.sexShow
				if(this.sexShow) {
					this.gender = "F";
					Toast(this.gender)
				} else {
					this.gender = "M";
					Toast(this.gender)
				}
			},
		},
		watch: {
			allData: function(val) { //总数据
				for(var i = 0; i < this.sourceList.length; i++) {
					if(this.sourceList[i].name == this.allData.insrntResp.incomeSource) {
						this.hand(i);
					}
				}
				if(this.allData.insrntResp.certfType == "" || this.allData.insrntResp.certfType == undefined) {} else {
					this.cardType = this.allData.insrntResp.certfType; //证件类型
				}
				if(this.allData.insrntResp.maritalStatus == "" || this.allData.insrntResp.maritalStatus == undefined) {} else {
					this.marType = this.allData.insrntResp.maritalStatus; //婚姻状况
				}
				if(this.allData.insrntResp.nationality == "" || this.allData.insrntResp.nationality == undefined) {
					this.reHighs = "37" //国籍  this.allData.insrntResp.nationality
				} else {
					this.reHighs = this.allData.insrntResp.nationality; //婚姻状况
				}
				this.nexusType = this.allData.applntResp.relationToInsured; //关系  this.allData.insrntResp.relationToInsured
			},
			sourceList: function(val) { //主要收入
				if(this.allData.length > 0) {
					for(var i = 0; i < this.sourceList.length; i++) {
						if(this.sourceList[i].name == this.allData.insrntResp.incomeSource) {
							this.hand(i);
						}
					}
				}
			},
			couponList: function(val) { //证件类型
				if(this.allData.length > 0) {
					this.cardType = this.allData.insrntResp.certfType; //证件类型

				} else {
					this.cardType = this.couponList[0].code
				}
			},
			marList: function(val) { //证件类型
				if(this.allData.length > 0) {
					this.marType = this.allData.insrntResp.maritalStatus; //婚姻状况
				} else {
					this.marType = this.marList[this.marList.length - 1].code; //婚姻状况
				}
			},
			nationalityarr: function(val) { //证件类型
				//				if(this.allData.length > 0) {
				//					this.reHighs = "37" //国籍  this.allData.insrntResp.nationality
				//				}
			},
			nexusList: function(val) { //证件类型
				if(this.allData.length > 0) {
					this.nexusType = this.allData.applntResp.relationToInsured; //关系  this.allData.insrntResp.relationToInsured
				}
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
	
	.labsex {
		color: #C8C7CC;
	}
	
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	
	.inputLabel2 {
		display: block;
		/*width: 1rem;*/
		height: 0.88rem;
		line-height: 0.88rem;
		/*font-weight: bold;*/
		color: #555555;
	}
	
	.brspanbo {
		display: block;
		position: absolute;
		left: 2.3rem;
		top: 0;
		height: 0.88rem;
		line-height: 0.88rem;
		color: #B2B2B2;
		/*background: red;*/
	}
	
	.opa0 {
		opacity: 0;
	}
	
	.one {
		width: 100%;
		min-height: 100%;
		position: absolute;
		background: #F3F3F3;
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
	
	.start {
		display: block;
		height: 0.88rem;
		line-height: 0.88rem;
		color: red;
	}
	
	.startopacity {
		display: block;
		height: 0.88rem;
		line-height: 0.88rem;
		color: red;
		opacity: 0;
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
		width: 0.56rem;
		height: 0.56rem;
		margin-top: 0.275rem;
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
		border: 0.02rem solid #EB7760;
		box-shadow: inset 0 0.01rem 0.03rem 0 rgba(255, 255, 255, 0.50);
		border-radius: 0.5rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
	}
	
	.btn1 {
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
		padding-left: 0;
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
	
	.padleftitem {
		padding-left: 0.25rem;
	}
	
	.inputLabel1 {
		line-height: 0.68rem;
	}
	
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
		padding-left: 0;
	}
	
	.inputText2 {
		width: 2.7rem;
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
	
	.inpuDate {
		width: 3rem;
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
	
	.dateBox {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 1;
		display: block;
		height: 0.87rem;
		padding: 0 0.2rem;
		line-height: 0.88rem;
		background: #FFFFFF;
		border-left: solid 0.01rem #C8C7CC;
	}
	
	.dateB {
		position: absolute;
		right: 1.78rem;
		top: 0;
		z-index: -1;
		width: 0.4rem;
		height: 0.87rem;
		background: #FFFFFF;
	}
	
	.upDownImg3 {
		display: block;
		width: 0.4rem;
		height: 0.44rem;
		margin-top: 0.22rem;
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
		color: #666666;
		padding-left: 0;
	}
	
	.pro {
		width: 3.6rem;
	}
	
	.dateInput {
		width: 2.7rem;
	}
	
	.dateInput1 {
		/*background: #669900;*/
		z-index: 1;
	}
	
	.inputWidth {
		width: 4.4rem;
	}
	
	.inputWidth11 {
		width: 4.4rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
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
		width: 0.4rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.6rem;
		text-align: center;
		color: #EB7760;
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
		color: #555555;
		text-align: center;
		border: solid 0.02rem #54CCC1;
		border-radius: 0.34rem;
		margin-right: 0.2rem;
	}
	
	.marR {
		margin-right: 0.233rem;
	}
	/*.signBox span:first-child {
		margin-right: 0.233rem;
	}
	
	.signBox span:nth-child(2) {
		margin-right: 0.233rem;
	}
	
	.signBox span:nth-child(3) {
		margin-right: 0.233rem;
	}
	
	.signBox span:nth-child(4) {
		margin-right: 0.233rem;
	}
	
	.signBox span:nth-child(5) {
		margin-right: 0.233rem;
	}*/
	
	.selectedSign {
		background: #54CCC1;
		color: #FFFFFF;
	}
	
	.opa1 {
		z-index: 2;
	}
</style>