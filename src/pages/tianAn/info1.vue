<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;z-index: 2;">
		<div class="twoCon">
			<p v-if="hui" class="title_twoCon clearFloat" :class="{borderNone:!policyHolderShow}">
				<label class="titleLable_twoCon left">投保人信息</label>
				<img src="/static/img/leftImg.png" class="btnImg right" v-show="!policyHolderShow" @click="policyHolderShowHide" />
				<img src="/static/img/downImg.png" class="btnImg right" v-show="policyHolderShow" @click="policyHolderShowHide" />
			</p>
			<div class="policyHolder" v-show="policyHolderShow">
				<!--姓名-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="startopacity left">*</label>姓名</label>
					<input type="text" class="inputText left" v-model="policyHolderName" placeholder="请输入真实姓名" :disabled="disabled" />
					<!--<span class="sumBtn">+</span>-->
				</p>
				<!--生日日期-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="startopacity left">*</label>出生日期</label>
					<input type="date" class="inputText inputWidth left" v-model="birthDate" placeholder="请选择出生日期" :disabled="disabled" />
					<span class="dateBox1"></span>
					<!--<img src="/static/img/upDown.png" class="upDownImg upDownImg2" />-->
				</p>
				<!--性别-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="startopacity left">*</label>投保险人性别</label>
					<input type="text" class="inputText left" v-model="sex" placeholder="" :disabled="disabled" />
					<!--<span class="inputText inputSpan left">
						<span class="sex sexM" @click="sexChose">
							
							<label class="labsex">{{sex}}</label>
						</span>
					</span>-->
				</p>
				<!--证件类型-->
				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="start left">*</label>证件类型</label>
					<select name="name_car" v-model="cardType" class="left inputText inputWidth" @change="getCouponSelected">
						<option :value="coupon.code" v-for="coupon in couponList">{{coupon.name}}</option>
					</select>
				</p>
				<!--证件号码-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>证件号码</label>
					<input type="text" maxlength="18" class="inputTextCard inputWidth left" v-model="IDnum" placeholder="请输入证件号码" @input="cardnum" />
				</p>
				<!--证件有效期-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>证件有效期至</label>
					<span class="brspanbo dateInput" :class="{opa0:spanFlag}">请选择证件有效期</span>
					<input type="date" id="dateTime1" class="inputText dateInput dateInput1 left" :class="{opa0:!spanFlag}" placeholder="请选择证件有效期" v-model="termValidityDate" @click="termValidityDateSel" @change="termValidityDateSel" />
					<span class="dateBox" @click="dateSel">
						<img src="/static/img/sexNo.png" class="selImg" v-show="termValidityDateShow"/>
						<img src="/static/img/selected.png" class="selImg" v-show="!termValidityDateShow"/>
						<span>长期</span>
					</span>
					<label class="dateB" for="dateTime1">
						<img src="/static/upDown.png" class="upDownImg3" />
					</label>
				</p>
				<!--国籍-->
				<!--<p class="inputGrop clearFloat">
					<label class="inputLabel left">国籍</label>
					<input type="tel" maxlength="11" class="inputText left" v-model="reHighs" placeholder="请输入国籍" />
				</p>-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>国籍</label>
					<select v-model="reHighs" class="inputLabel inputWidth left">
						<option :value="c.code" class="inputText left" v-for="c in nationalityarr">{{c.name}}</option>
					</select>
				</p>
				<!--婚姻状况-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>婚姻状况</label>
					<select class="inputLabel inputWidth left" v-model="reMarry">
						<option :value="c.code" class="inputText left" v-for="c in marryList">{{c.name}}</option>
					</select>
				</p>
				<!--手机号-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>手机号码</label>
					<input type="tel" maxlength="11" class="inputText inputWidth left" v-model="phone" placeholder="请输入手机号码" />
				</p>
				<!--固定电话-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="startopacity left">*</label>固定电话</label>
					<input type="tel" maxlength="11" class="inputText inputWidth left" placeholder="请输入固定电话" v-model="telPhone" />
				</p>
				<!--邮箱地址-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>邮箱地址</label>
					<input type="text" class="inputText inputWidth left" v-model="reEmail" placeholder="请输入邮箱地址" />
				</p>

				<!--联系地址-->
				<div class="inputGrop1 clearFloat">
					<p class="inputselectP">
						<label class="inputLabel3 inputLabel1 left"><label class="start left">*</label>联系地址</label>
						<select class="inputText inputselect pro inputWidth left" v-model="provinceType" @change="aaa">
							<option :value="[province.cnCode,province.cnName]" v-for="(province,index) in provinceList">{{province.cnName}}</option>
						</select>
					</p>
					<p class="inputselectP">
						<select class="inputText1 inputWidth" v-model="cityType" @change="bbb">
							<option :value="[city.cnCode,city.cnName]" v-for="city in cityList">{{city.cnName}}</option>
						</select>
					</p>
					<p class="inputselectP padleftitem">
						<select class="inputText1 inputWidth" v-model="countyType">
							<option :value="[county.cnCode,county.cnName]" v-for="county in countyList">{{county.cnName}}</option>
						</select>
					</p>
				</div>
				<!--详细地址-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>详细地址</label>
					<input type="text" class="inputText inputWidth left" v-model="add" placeholder="请输入详细地址" />
				</p>
				<!--邮编-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>邮编</label>
					<input type="text" class="inputText inputWidth left" v-model="email" placeholder="请输入邮编" maxlength="6" />
				</p>
				<!--工作单位-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>工作单位</label>
					<input type="text" class="inputText inputWidth left" v-model="address" placeholder="请输入工作单位" maxlength="100" minlength="10" />
				</p>

				<!--职业-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>职业</label>
					<input type="text" class="inputText inputWidth left" :disabled="disabled" v-model="occupation">
				</p>
				<!--身高-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>身高（cm）</label>
					<input type="tel" maxlength="3" class="inputText inputWidth left" v-model="reHigh" placeholder="请输入身高" />
				</p>
				<!--体重-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>体重（kg）</label>
					<input type="tel" maxlength="3" class="inputText inputWidth left" v-model="reWeight" placeholder="请输入体重" />
				</p>
				<!--固定收入-->
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>固定年收入(万元)</label>
					<input type="tel" maxlength="11" class="inputText inputWidth left" placeholder="请输入固定年收入" v-model="income" />
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
			<!--<p v-if="!addtest" class="inputGrop inputSpan bg">
				<label class="inputLabel2 left ">请填写</label>
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
		name: "Info1",
		props: ['backview'],
		data() {
			return {
				idCardFlag: false,
				spanFlag: false,
				occupation: '',
				disabled: true,
				currentIndex: 0,
				custId: this.$route.query.custId,
				newPeo: this.$route.query.newPeo,
				sexShow: true, //性别选择
				policyHolderShow: true,
				cardType: '', //证件类型
				//婚姻状况
				marryList: [],
				couponList: [], //证件类型
				//收入来源
				sourceList: [],
				policyHolderName: '',
				IDnum: '', //证件号码
				termValidityDateShow: true,
				termValidityDate: '',
				birthDate: '',
				addbirthDate: '',
				phone: '',
				telPhone: '',
				email: '',
				add: '',
				reHigh: '',
				reWeight: '',
				provinceType: [],
				provinceList: [],
				cityType: [],
				cityList: [],
				countyType: [],
				countyList: [],
				bigType: '',
				bigList: [],
				middleType: '',
				middleList: [],
				littleType: '',
				littleList: [],
				source: '',
				income: '',
				address: '',
				reMarry: "",
				reHighs: "",
				sex: '',
				nan: true,
				nv: true,
				reEmail: '',
				cnCode: 0,
				allData: {},
				nationalityarr: [],
				addtest: true,
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
			this.$http.post(this.$store.state.link + '/trd/order/v1/queryorder', data)
				.then(res => {
					//					console.log("data==" + JSON.stringify(res.data))
					var dataCode = res.data.code;
					if(dataCode == "SYS_S_000") {
						this.allData = res.data.output;
						this.documentType();
						this.marriageType();
						// this.pro()
						//						this.cardnum()
						//						this.isCardID()
						// this.policyHolderName=res.data.output.insrntResp.insrntName;
						// this.cardType =res.data.output.insrntResp.certfType;
						this.policyHolderName = res.data.output.applntResp.applName //投保人姓名

						this.IDnum = res.data.output.applntResp.certfCode //证件号码
						if(res.data.output.applntResp.certfCode != undefined) {
							if(res.data.output.applntResp.certfCode.length == 0) {
								this.idCardFlag = false;
							} else {
								this.idCardFlag = true;
							}
						}
						if(res.data.output.applntResp.certfEnduringFlag != undefined) {
							if(res.data.output.applntResp.certfEnduringFlag == "Y") {
								this.termValidityDateShow = false;
								this.spanFlag = false;
							} else {
								this.spanFlag = true
								this.termValidityDateShow = true;
								this.termValidityDate = res.data.output.applntResp.certfEndTime //  证件有效期
							}
						} else {
							this.spanFlag = false;
						}

						this.birthDate = res.data.output.applntResp.birthday //  出生日期

						//						this.reHighs = res.data.output.applntResp.nationality //  国籍
						this.reHighs = "37" //  国籍

						this.phone = res.data.output.applntResp.mobile //  手机号码
						this.telPhone = res.data.output.applntResp.tel //  固定号码
						if(res.data.output.applntResp.province == "" || res.data.output.applntResp.province == undefined) {} else {
							this.ccc1();
						}
						//this.provinceType =res.data.output.applntResp.province//  联系地址
						//this.cityType = res.data.output.applntResp.city
						//this.countyType = res.data.output.applntResp.county
						this.add = res.data.output.applntResp.fullAddr //详细地址
						this.email = res.data.output.applntResp.zipCode //  邮编
						this.address = res.data.output.applntResp.workCompany //  工作单位
						this.bigType = res.data.output.applntResp.occType //职业大类
						this.bigList = res.data.output.applntResp.occTypeNo //  职业大类代码
						this.middleType = res.data.output.applntResp.occDetailType //  职业中类
						this.middleType = res.data.output.applntResp.occDetailTypeNo //  职业中类代码
						this.littleType = res.data.output.applntResp.occName //  职业小类
						this.littleList = res.data.output.applntResp.occNo //  职业小类代码
						this.littleList = res.data.output.applntResp.occNo //  职业名称代码
						this.occupation = res.data.output.applntResp.occDetailType + "  " + res.data.output.applntResp.occName;
						this.reHigh = res.data.output.applntResp.height //  身高
						this.reWeight = res.data.output.applntResp.weight //  体重
						this.income = res.data.output.applntResp.salary //  固定收入
						if(res.data.output.applntResp.gender == "M") {
							this.sex = "男" //性别
						} else if(res.data.output.applntResp.gender == "F") {
							this.sex = "女" //性别
						}
						this.reEmail = res.data.output.applntResp.email //邮箱
						if(res.data.output.applntResp.incomeSource == "" || res.data.output.applntResp.incomeSource == undefined) {} else {
							this.hand(res.data.output.applntResp.incomeSource - 1)
						}
					} else {
						Toast(res.data.desc);
					}
				}, res => {
					console.log(res.data);
				})

			//  根据数字字典调省市区
			this.ccc();
			this.nationalitySelect();
			this.Sourceofincome();
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
			documentType() {
				var data = {
					"orgCode": "000034",
					"type": "5",
				}

				this.$http.post(this.$store.state.link + '/dic/findDicTotalByOrgCode', data)
					.then(res => {
						console.log(res.data)
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.couponList = res.data.output;
							if(this.allData.applntResp.certfType == "" || this.allData.applntResp.certfType == undefined) {
								this.cardType = this.couponList[0].code;
							} else {
								this.cardType = this.allData.applntResp.certfType //证件类型
							}
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			marriageType() {
				var data = {
					"orgCode": "000034",
					"type": "2"
				}
				this.$http.post(this.$store.state.link + '/dic/findDicTotalByOrgCode', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.marryList = res.data.output;
							if(this.allData.applntResp.maritalStatus == "" || this.allData.applntResp.maritalStatus == undefined) {
								this.reMarry = this.marryList[this.marryList.length - 1].code;
							} else {
								this.reMarry = this.allData.applntResp.maritalStatus //  婚姻状况
							}
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			//点击变色  收入来源
			hand(index) {
				this.currentIndex = index;
				if(index == 6) {
					this.addtest = false;
				} else {
					this.addtest = true;
				}
			},
			ccc() {
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
							this.provinceType = [res.data.output[0].cnCode, res.data.output[0].cnName];
							this.aaa();
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			ccc1() {
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
								if(this.provinceList[i].cnCode == this.allData.applntResp.province) {
									this.provinceType = [this.allData.applntResp.province, this.provinceList[i].cnName];
								}
							}
							this.aaa1();
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			aaa(orgCode) {
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

							this.cityType = [res.data.output[0].cnCode, res.data.output[0].cnName];
							this.bbb();
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			aaa1() {
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
								if(this.cityList[i].cnCode == this.allData.applntResp.city) {
									this.cityType = [this.allData.applntResp.city, this.cityList[i].cnName];
								}
							}
							this.bbb1();
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			//用市调取所有的县
			bbb() {
				var data = {
					"code": this.cityType[0],
					"orgCode": "000034"
				}

				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)

					.then(res => {
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
			bbb1() {
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
								if(this.countyList[i].cnCode == this.allData.applntResp.county) {
									this.countyType = [this.allData.applntResp.county, this.countyList[i].cnName];
								}
							}
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			//判断性别
			sexChose() {
				this.sexShow = !this.sexShow
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
				if(this.IDnum == "" || this.IDnum == undefined) {
					return;
				}
				if(this.IDnum.length == 18) {
					if(this.cardType == "0" || this.cardType == "4" || this.cardType == "C") {
						var data = {
							"idcard": this.IDnum,
							"idtype": this.cardType
						}
						Indicator.open();
						console.log("===" + JSON.stringify(data));
						this.$http.post(this.$store.state.link + '/cut/cut/validIDCard', data).then(response => {
							console.log("===" + JSON.stringify(response.data));
							Indicator.close();
							if(response.data.code == "SYS_S_000" && response.data.output.valid == true) {
								this.idCardFlag = true;
							} else {
								this.idCardFlag = false;
							}
						}, response => {
							this.idCardFlag = false;
							Indicator.close();
							console.log("ajax error");
						});
					}
				} else {}

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
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},

			policyHolderShowHide() {
				this.policyHolderShow = !this.policyHolderShow
			},
			getCouponSelected() {
				if(this.cardType == "0" && this.termValidityDateShow == false) {
					if(this.jsGetAge(this.birthDate) < 46) {
						this.termValidityDate = "";
						this.termValidityDateShow = true;
						this.spanFlag = false;
					}
				}
				this.cardnum();
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
						this.birthDate = ""
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
				//				this.$router.push('/intoInfo?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
				window.history.go(-1)
			},
			handleClickNext() {
				var patrn = /^[0-9]*$/;
				var regCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; //证件
				var regPh = /^1[0-9]{10}$/; //手机号
				var regT = /^0\d{2,3}[1-9]\d{6,7}$/ //固定号码
				var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/; //邮箱地址
				var rezipCode = /^[1-9][0-9]{5}$/; //邮编
				var isNum = /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/; //金额校验
				var chinese = /[\u4E00-\u9FA5]/i;

				if(this.IDnum == "" || this.IDnum == undefined) {
					Toast('请输入证件号码')
					return;
				} else {
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

				if(chinese.test(this.IDnum)) {
					Toast('证件号码格式不正确')
					return;
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
					if(this.sex != sex) {
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
				if(this.reHighs == '' || this.reHighs == undefined) {
					Toast('请选择国籍')
					return;
				}
				if(this.reMarry == '' || this.reMarry == undefined) {
					Toast('请选择婚姻状况')
					return;
				}
				if(this.phone == '' || this.phone == undefined) {
					Toast('请输入手机号码')
					return;
				}
				if(regPh.test(this.phone) == false) {
					Toast('手机号码格式不正确')
					return;
				}

				if(this.reEmail == '' || this.reEmail == undefined) {
					Toast('请输入邮箱')
					return;
				}
				if(reg.test(this.reEmail) == false) {
					Toast('邮箱格式不正确')
					return;
				}
				if(this.telPhone == "" || this.telPhone == undefined) {} else {
					if(!patrn.test(this.telPhone)) {
						Toast("固定号码格式不正确")
						return;
					}
				}

				if(this.add == '' || this.add == undefined) {
					Toast('请输入详细地址')
					return;
				}
				var addLength = this.provinceType[1] + this.cityType[1] + this.countyType[1] + this.add;
				if(addLength.length < 16) {
					Toast('省市县地址+详细地址长度应大于16个字')
					return;
				}

				if(this.email == '' || this.email == undefined) {
					Toast('请输入邮编地址')
					return;
				}
				if(!rezipCode.test(this.email)) {
					Toast('邮编地址格式不正确')
					return;
				}
				if(this.address == '' || this.email == undefined) {
					Toast('请输入工作单位信息')
					return;
				}

				if(this.reWeight == '' || this.reWeight == undefined) {
					Toast('请输入体重信息')
					return;
				}

				if(!isNum.test(this.reWeight)) {
					Toast('体重信息格式不正确')
					return;
				}

				if(this.reHigh == '' || this.reHigh == undefined) {
					Toast('请输入身高信息')
					return;
				}
				if(!isNum.test(this.reHigh)) {
					Toast('身高信息格式不正确')
					return;
				}
				if(this.income == '' || this.income == undefined) {
					Toast('请输入固定收入信息')
					return;
				}
				if(!isNum.test(this.income)) {
					Toast('请输入固定收入信息格式不正确')
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

				var message = {
					"address": this.add, //联系地址
					"age": this.jsGetAge(this.birthDate), //年龄
					"applName": this.policyHolderName, //姓名
					"birthday": this.birthDate, //出生日期
					"certfCode": this.IDnum, //证件号码 ,
					"certfEndTime": addcertfEndTime, //证件有效期
					"certfEnduringFlag": certfEnduringFlag, //证件长期有效标志 : Y-是;N-否 
					"certfType": this.cardType, //证件类型 ,
					"city": this.cityType[0], //地址市 
					"county": this.countyType[0], //地址区县
					"email": this.reEmail, //邮箱
					"fullAddr": this.add, //详细地址
					"gender": this.allData.applntResp.gender, //性别
					"height": this.reHigh, //  身高
					"incomeSource": this.currentIndex + 1, // 收入来源 
					//						"language": "string", //语言
					"maritalStatus": this.reMarry, //婚姻状态 ,
					"mobile": this.phone, // 联系电话
					"nationality": this.reHighs, //国籍 
					//					"occCate": "0", // 职业类别
					"occDetailType": this.allData.applntResp.occDetailType, //职业中类 
					"occDetailTypeNo": this.allData.applntResp.occDetailTypeNo, //职业中类代码 
					"occName": this.allData.applntResp.occName, //职业名称
					"occNo": this.allData.applntResp.occNo, //职业名称代码 
					"occType": "", //职业大类 
					"occTypeNo": "", //职业大类代码
					//						"proposerNo": "string", //投保人编号 
					"province": this.provinceType[0], //地址省
					"relationToInsured": this.allData.applntResp.relationToInsured, //投保人与被保人关系  后期从接口拉取
					//						"relationToInsured": "00", //投保人与被保人关系  后期从接口拉取
					"salary": this.income, //年收入
					//						"socialsecurityStatus": "Y", //社保状态 : Y-是;N-否 
					"tel": this.telPhone, //固定电话
					"weight": this.reWeight, //体重
					"workCompany": this.address, //工作单位 
					"zipCode": this.email, //邮编
					//						"zoneType": "string" //居民类型
				}

				var info3msg = {
					"address": this.add, //联系地址
					"age": this.jsGetAge(this.birthDate), //年龄
					"birthday": this.birthDate, //出生日期
					"certfCode": this.IDnum, //证件号码 ,
					"certfEndTime": addcertfEndTime, //证件有效期 : 格式yyyy-MM-dd ,
					"certfEnduringFlag": certfEnduringFlag, //证件长期有效标志 : Y-是;N-否 ,
					"certfType": this.cardType, //证件类型 ,
					"city": this.cityType[0], //地址市
					"county": this.countyType[0], //地址区县 
					"email": this.reEmail, //邮箱
					"fullAddr": this.add, //详细地址
					"gender": this.allData.applntResp.gender, //性别 : M-男;F-女 ,
					"height": this.reHigh, //身高 ,
					"incomeSource": this.currentIndex + 1, //收入来源 ,
					"insrntName": this.policyHolderName, //被保人姓名 ,
					//					"insuNo": "string", //被投保人编号 ,
					//					"insuRelationToMaininsu": this.nexusType, //被保人与主被保人关系
					//					"insuRelationToMaininsu": "00", //被保人与主被保人关系
					//					"language": "string", //语言 
					//					"mainInsured": "0", //主被保人标志 ,
					"maritalStatus": this.reMarry, //婚姻状态 ,
					"mobile": this.phone, //联系电话 
					"nationality": this.reHighs, //国籍
					//					"occCate": "0", //职业类别 
					"occDetailType": this.allData.applntResp.occDetailType, // 职业中类 ,
					"occDetailTypeNo": this.allData.applntResp.occDetailTypeNo, //职业中类代码
					"occName": this.allData.applntResp.occName, //职业名称
					"occNo": this.allData.applntResp.occNo, //职业名称代码 
					"occType": "", //职业大类
					"occTypeNo": "", //职业大类代码 ,
					//					"peersInsuredAmt": 0, //同业保额 
					"province": this.provinceType[0], // 地址省 ,
					"relaToAppnt": this.allData.applntResp.relationToInsured, //与投保人关系 ,
					//					"relaToAppnt": "00", //与投保人关系 ,
					"salary": this.income, //年收入
					//					"socialsecurityStatus": "Y", // 社保状态 : Y-是;N-否 ,
					"tel": this.telPhone, //固定电话
					"weight": this.reWeight, //体重
					"workCompany": this.address, //工作单位 ,
					"zipCode": this.email, //邮编 ,
					//					"zoneType": "string" //居民类型
				}
				//				var info3data = {
				//					"token": this.$route.query.token,
				//					"userId": this.$route.query.userId,
				//					"mark": "UC",
				//					"head": {
				//						"channelCode": "qtb_h5",
				//						"deptCode": this.$route.query.cmpCode,
				//						"oprCode": this.$route.query.userId,
				//						"prodCode": this.$route.query.prodCode
				//					},
				//					"opt": "INSRNT",
				//					"pkgNo": this.$route.query.orderNo, //订单号
				//					"insrntReq": info3msg
				//				}
				var data;
				if(this.allData.applntResp.relationToInsured == "00") { //是本人传俩个
					data = {
						"token": this.$route.query.token,
						"userId": this.$route.query.userId,
						"mark": "UC",
						"head": {
							"channelCode": "qtb_h5",
							"deptCode": this.$route.query.cmpCode,
							"oprCode": this.$route.query.userId,
							"prodCode": this.$route.query.prodCode
						},
						"opt": "APPL,INSRNT",
						"pkgNo": this.$route.query.orderNo, //订单号
						"applntReq": message,
						"insrntReq": info3msg
					}
				} else { //传一个
					data = {
						"token": this.$route.query.token,
						"userId": this.$route.query.userId,
						"mark": "UC",
						"head": {
							"channelCode": "qtb_h5",
							"deptCode": this.$route.query.cmpCode,
							"oprCode": this.$route.query.userId,
							"prodCode": this.$route.query.prodCode
						},
						"opt": "APPL",
						"pkgNo": this.$route.query.orderNo, //订单号
						"applntReq": message
					}
				}
				Indicator.open();
				console.log("请求报文==2===" + JSON.stringify(data))
				this.$http.post(this.$store.state.link + '/trd/order/v1/saveorder', data)
					.then(res => {
						Indicator.close();
						console.log(res.data)
						if(res.data.code == "SYS_S_000") {
							if(this.allData.applntResp.relationToInsured == "00") { //是本人
								this.$router.push('/info3?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
							} else {
								this.$router.push('/info2?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
							}
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					})
			},
			pushInfo3() {

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
				this.ccc()
			},
			cityChange() {
				this.aaa()
			},
			countyChange() {
				this.bbb()
			}
		}
	}
</script>

<style scoped="scoped">
	.sex img {
		display: inline-block;
		width: 0.48rem;
		height: 0.48rem;
	}
	
	.left {
		float: left;
	}
	
	.right {
		float: right;
	}
	
	.opa0 {
		opacity: 0;
		z-index: -1;
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
	
	.marleftall {
		margin-left: 0.1rem;
	}
	
	.padleftall {
		padding-left: 0.1rem;
	}
	
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	
	.bg {
		margin-top: 0.2rem;
	}
	
	.bg1 {
		margin-left: 0.2rem;
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
	
	.oneTitleTextSpan1 {
		margin-left: 0.2rem;
	}
	
	.oneTitleTextSpan2 {
		margin-left: 1.5rem;
	}
	
	.oneTitleTextSpan3 {
		margin-right: 0.2rem;
	}
	
	.labsex {
		color: #C8C7CC;
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
	
	.boderbo {
		/*width: 5.5rem;*/
		border: none;
		border-radius: 0;
		border-bottom: 0.02rem solid #979797;
		/*margin-bottom: 0.32rem;*/
	}
	
	.inputSpan {
		line-height: 0.88rem;
		color: #555555;
		font-weight: bold;
	}
	
	.inputLabel {
		display: block;
		width: 2.4rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		/*background: #669900;*/
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
	
	.inputLabel2 {
		display: block;
		/*width: 1rem;*/
		height: 0.88rem;
		line-height: 0.88rem;
		/*font-weight: bold;*/
		color: #555555;
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
	
	.inputText1 {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
		padding-left: 0;
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
	}
	
	.pro {
		width: 3.6rem;
	}
	
	.dateInput {
		width: 2.7rem;
	}
	.dateInput1 {
		z-index: 1;
	}
	.inputWidth {
		width: 4.4rem;
		/*background: #669900;*/
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
	
	.dateB {
		position: absolute;
		right: 1.74rem;
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
	
	.brspanbo {
		display: block;
		position: absolute;
		left: 2.3rem;
		top: 0;
		height: 0.88rem;
		line-height: 0.88rem;
		color: #B2B2B2;
	}
	
	.brspanbo1 {
		display: block;
		position: absolute;
		left: 2.3rem;
		top: 0.3rem;
		opacity: 0;
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
	/*.signBox span:first-child {
		margin-right: 0.233rem;
	}
	
	.signBox span:nth-child(2) {
		margin-right: 0.233rem;
	}
	
	.signBox span:nth-child(4) {
		margin-right: 0.233rem;
	}
	
	.signBox span:nth-child(5) {
		margin-right: 0.233rem;
	}*/
	
	.signBox span.selectedSign {
		background: #54CCC1;
		color: #FFFFFF;
	}
</style>