<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div>
			<div class="twoCon">
				<p class="title_twoCon clearFloat">
					<label class="title_twoCon2 left">被保险人信息</label>
				</p>
				<div class="policyHolder">
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>是投保人的</label>
						<select v-model="nexusType" class="inputText inputWidth left">
							<option>请选择</option>
							<option :value="nexus.dicCode" v-for="nexus in nexusList">{{nexus.dicName}}</option> 
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>姓名</label>
						<input type="text" v-model="appName" class="inputText inputWidth left" maxlength="20" placeholder="请输入姓名" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>证件类型</label>
						<select v-model="cardType" class="left inputText inputWidth">
							<option value="q">请选择</option>
							 <option :value="certfType.dicCode" v-for="certfType  in couponList">{{certfType.dicName}}</option> 
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>证件号码</label>
						<input type="text" v-model="IDnum" @input="idIdnum" maxlength="18" class="inputText inputWidth left" placeholder="请输入证件号码" v-on:input="changeCount"/>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>性别</label>
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
						<label class="inputLabel left"><label class="star">*</label>出生日期</label>
						<input type="date" v-model="birthDate" id="birthD7" class="inputText inputWidth left"/>
						<label class="dateB" for="birthD7">
							<img src="/static/upDown.png" class="upDownImg" />
						</label>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>证件是否长期有效</label>
						<span class="inputText inputSpan left" @click="dataClick">
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
						<input type="date" v-model="termValidityDate" id="birthD8" class="inputText inputWidth left" placeholder="请选择证件有效期" @click="termValidityDateSel"/>
						<label class="dateB" for="birthD8">
							<img src="/static/upDown.png" class="upDownImg" />
						</label>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>国籍/户籍</label>
						<select v-model="reHighs" class="left inputText inputWidth">
							 <option value="q">请选择</option>
							 <option :value="c.dicCode" v-for="c in nationalityarr">{{c.dicName}}</option> 
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>婚姻状况</label>
						<select v-model="marType" class="left inputText inputWidth">
							<option value="q">请选择</option>
							<option :value="mar.dicCode" v-for="mar in marList">{{mar.dicName}}</option> 
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>教育程度</label>
						<select v-model="eduType" class="left inputText inputWidth">
							<option value="q">请选择</option>
							<option :value="education.dicCode" v-for="education in eduList">{{education.dicName}}</option> 
						</select>
					</p>
                    <p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>手机号码</label>
						<input type="text" v-model="phone"  maxlength="11" class="inputText inputWidth left" placeholder="请输入手机号码" />
					</p>
                    <p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star"></label>邮箱地址</label>
						<input type="email" v-model="email" class="inputText inputWidth left" placeholder="请输入邮箱地址" />
					</p>
					<div class="inputGrop1 clearFloat">
						<p class="inputP">
							<label class="inputLabel1 left">
								<label class="star">*</label>常住地址</label>
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
						<label class="inputLabel left"><label class="star">*</label>镇(乡)街道</label>
						<input type="text" v-model="add" class="inputText inputWidth left" placeholder="请输入镇乡街道" />
					</p>
                   <p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>工作单位/学校</label>
						<input type="text" v-model="work_address" class="inputText inputWidth left" placeholder="请输入工作单位/学校" />
					</p>
					<!--<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>单位/学校地址</label>
						<input type="text" v-model="workAddress"  class="inputText inputWidth left" placeholder="请输入单位/学校地址" />
					</p>-->
					<div class="inputGrop1 clearFloat">
						<p class="inputP">
							<label class="inputLabel1 left"><label class="star">*</label>单位/学校地址</label>
							<select class="inputText1 inputWidth left" v-model="provinceType1" @change="provinceA1('select')">
								<option value="q">请选择</option>
								<option :value="[province1.cnCode,province1.cnName]" v-for="(province1,index) in provinceList1">{{province1.cnName}}</option>
							</select>
						</p>
						<p class="inputP">
							<select class="inputText1 inputText2 inputWidth left" v-model="cityType1" @change="cityB1('select')">
								<option value="q">请选择</option>
								<option :value="[city1.cnCode,city1.cnName]" v-for="city1 in cityList1">{{city1.cnName}}</option>
							</select>
						</p>
						<p class="inputP">
							<select class="inputText1 inputText2 inputWidth left" v-model="countyType1">
								<option value="q">请选择</option>
								<option :value="[county1.cnCode,county1.cnName]" v-for="county1 in countyList1">{{county1.cnName}}</option>
							</select>
						</p>
					</div>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>详细地址</label>
						<input type="text" v-model="address "  class="inputText inputWidth left" placeholder="请输入单位/学校地址" />
					</p>
                    <p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>兼职</label>
						<input type="text" v-model="partTime" class="inputText inputWidth left" placeholder="请输入兼职" />
					</p>
                    <p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>身高（cm）</label>
						<input type="text" v-model="height"  class="inputText inputWidth left" placeholder="请输入身高" />
					</p>		
                    <p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>体重（kg）</label>
						<input type="text" v-model="weight"  class="inputText inputWidth left" placeholder="请输入体重" />
					</p>		
                   <p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>是否有社保</label>
						<select v-model="socialType" class="left inputText inputWidth">
							<option value="q">请选择</option>
							<option :value="social.dicCode" v-for="social in socialList">{{social.dicName}}</option> 
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left"><label class="star">*</label>纳税身份</label>
						<select class="left inputText inputWidth" v-model="zoneType">
							<option :value="zone.id" v-for="zone in zoneList">{{zone.name}}</option>
						</select>
					</p>
				</div>
			</div>
			<p class="btnBox">
				<span class="btn btn1" @click="getLastClick">上一步</span>
				<span class="btn" @click="getNextClick">下一步</span>
			</p>
		</div>
	</div>
</template>

<script>
	import { Dictionaries1 } from "../../assets/js/country.js";
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "applicant",
		data() {
			return {
				sexShow: false,
				longShow: true,
				term: true,
				//关系
				nexusType: '',
				nexusList: [],
				//姓名
				appName: '',
				//证件类型
				cardType: '',
				certfType: '',
				couponList: [],
				//证件号码
				IDnum:'',
				//性别
				gender:'',
				//出生日期
				birthDate:'',
				//证件有效期至
				termValidityDate:'',
				//国籍
				reHighs:'',
				nationalityarr:[],
				//婚姻状况
				marType: '',
				marList: [],
				//教育程度
				eduType:[],
				eduList:[],
				//手机号码
				phone:'',
				//邮箱地址
				email:'',
				//家庭电话
				tel:'',
				//现住址
				provinceType: [],
				provinceList: [],
				cityType: [],
				cityList: [],
				countyType: [],
				countyList: [],
				provinceType1: [],
				provinceList1: [],
				cityType1: [],
				cityList1: [],
				countyType1: [],
				countyList1: [],
				//镇乡街道
				add:'',
				//邮编
				zipCode:'',
				//工作单位
				work_address:'',
				//工作职务
				wordPost:'',
				//工作地址
				workAddress:'',
				//职业
				occName:'',
				//职业代码
				occNo:'',
				//兼职
				partTime:'',
				//身高
				height:'',
				//体重
				weight:'',
				//社保
				socialType:[],
				socialList:[],
				//详细地址
				address:'',
				//居民税收类型
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
				allData1: {},
				dictionaries: "",
			}
		},
		created() {
			var _this = this
				Dictionaries1('http://192.168.171.12:9005').then((res) => {
					_this.dictionaries = res.output
			})
			this.echo();
		},
		methods: {
			echo(){
				var data = {
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"head": {
						"channelCode": "qtb_h5",
						 "deptCode": "000095",
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode,
					},
					"opt": "INSRNT",
					"pkgNo": this.$route.query.orderNo,
				}
				console.log("====请求报文====" + JSON.stringify(data))
				this.$http.post('http://192.168.171.12:9009' + '/order/v1/queryorder', data).then(res => {
					var dataCode = res.data.code;
					if(dataCode == "SYS_S_000") {
//						console.log("=回显="+JSON.stringify(res.data.output.insrntResp.height))
						this.allType();
						this.chengshi(); //城市
						this.chengshi1(); //城市
						this.allData1 = res.data.output;
						this.main = res.data.output.mainResp;
						this.occName = this.$route.query.occupation1
						this.occNo = this.$route.query.occupaCode1
						this.nexusType = res.data.output.insrntResp.relaToAppnt  //关系
						this.appName = this.$route.query.appNamea
						if(this.allData1.insrntResp.certfType != undefined) {
							this.cardType = res.data.output.insrntResp.certfType //证件类型
						} else {
							this.cardType = "q";
						}
						
						this.IDnum = res.data.output.insrntResp.certfCode //证件号码
						if(res.data.output.insrntResp.gender == 'M') {
							this.sexShow = false
						} else if(res.data.output.insrntResp.gender == 'F') {
							this.sexShow = true
						}
						this.birthDate = res.data.output.insrntResp.birthday //  出生日期
						if(res.data.output.insrntResp.certfEnduringFlag == 'Y') {
							this.dataClick()
						} else if(res.data.output.insrntResp.certfEnduringFlag == 'N') {}
						this.termValidityDate = res.data.output.insrntResp.certfEndTime //证件有效期
						if(this.allData1.insrntResp.nationality != undefined) {
							this.reHighs = res.data.output.insrntResp.nationality //  国籍
						} else {
							this.reHighs = "q";
						}
						if(this.allData1.insrntResp.maritalStatus != undefined) {
							this.marType =  res.data.output.insrntResp.maritalStatus;//婚姻状况
						} else {
							this.marType = "q";
						}
						if(this.allData1.insrntResp.insrntDegree != undefined) {
							this.eduType = res.data.output.insrntResp.insrntDegree //教育程度
						} else {
							this.eduType = "q";
						}
						this.phone = res.data.output.insrntResp.mobile //  手机号码
						this.email = res.data.output.insrntResp.email //  邮箱
						this.add = res.data.output.insrntResp.fullAddr //  乡镇地址
						this.work_address = res.data.output.insrntResp.workCompany// 工作单位
						this.address = res.data.output.insrntResp.address
						this.wordPost =  res.data.output.insrntResp.position// 工作职务
						if(this.allData1.insrntResp.socialsecurityStatus != undefined) {
							this.socialType = res.data.output.insrntResp.socialsecurityStatus  //社保
						} else {
							this.socialType = "q";
						}
						this.partTime = res.data.output.insrntResp.insrntPlurality //兼职
						this.height = res.data.output.insrntResp.height
						this.weight = res.data.output.insrntResp.weight
					} else {
						this.allType();
						this.chengshi(); //城市
						this.chengshi1(); //城市
					}
				}, res => {
					console.log(res.data);
				})
			},
			allType(){
				console.log(this.cardType)
				this.nexusList = this.dictionaries.relaToAppnt.codeList;
				this.couponList = this.dictionaries.certfType.codeList;
				this.marList = this.dictionaries.maritalStatus.codeList;
				this.eduList = this.dictionaries.educationType.codeList;
				this.nationalityarr = this.dictionaries.nationality.codeList;
				this.socialList = this.dictionaries.socialsecurityStatus.codeList;
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
						if (this.allData1.insrntResp.province != undefined) {
							for (var i = 0; i < this.provinceList.length; i++) {
								if (this.provinceList[i].cnCode == this.allData1.insrntResp.province) {
									this.provinceType = [this.provinceList[i].cnCode, this.provinceList[i].cnName];
								}
							}

						}else {
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
						if (this.allData1.insrntResp.county != undefined) {
							for (var i = 0; i < this.countyList.length; i++) {
								if (this.countyList[i].cnCode == this.allData1.insrntResp.county) {
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
						if (this.allData1.insrntResp.city != undefined) {
							for (var i = 0; i < this.cityList.length; i++) {
//								console.log(this.cityList[i].cnCode == this.allData.insrntResp.city)
								if (this.cityList[i].cnCode == this.allData1.insrntResp.city) {
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
		chengshi1() {
				var data = {
					"code": "0",
					"orgCode": "000034"
				}
				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)
					.then(res => {
						var dataCode = res.data.code;
						console.log(this.allData1.insrntResp.workAddress.split(',')[0])
						if(dataCode == "SYS_S_000") {
							this.provinceList1 = res.data.output;
							if(this.allData1.insrntResp.workAddress!= undefined) {
								for(var i = 0; i < this.provinceList1.length; i++) {
									if(this.provinceList1[i].cnCode == this.allData1.insrntResp.workAddress.split(",")[0]) {
										this.provinceType1 = [this.provinceList1[i].cnCode, this.provinceList1[i].cnName];	
									}
								}
							} else {
								this.provinceType1 = "q";
							}
							this.provinceA1();
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			provinceA1(index) {
				var data = {
					"code": this.provinceType1[0],
					"orgCode": "000034"
				}
				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.cityList1 = res.data.output;
							if(index == "select") {
								this.cityType1 = "q";
								this.countyType1 = "q";
							} else {
								if(this.allData1.insrntResp.workAddress!= undefined){
									for(var i = 0; i < this.cityList1.length; i++) {
										if(this.cityList1[i].cnName == this.allData1.insrntResp.workAddress.split(",")[3]) {
											this.cityType1 = [this.cityList1[i].cnCode, this.cityList1[i].cnName];	
										}
									}
								}else {
									this.cityType1 = "q";
									this.countyType1 = "q";
								}
							}
							this.cityB1();
						} else {}
					}, res => {
						console.log(res.data);
					})

			},
			cityB1(index) {
				var data = {
					"code": this.cityType1[0],
					"orgCode": "000034"
				}

				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.countyList1 = res.data.output;
							if(index == "select") {
								this.countyType1 = "q";
							} else {
								if(this.allData1.insrntResp.workAddress!= undefined) {
									for(var i = 0; i < this.countyList1.length; i++) {
										if(this.countyList1[i].cnName == this.allData1.insrntResp.workAddress.split(",")[5]) {
											this.countyType1 = [this.countyList1[i].cnCode, this.countyList1[i].cnName];
										}
									}
								} else {
									this.countyType1 = "q";
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
			changeCount() {
				if(this.IDnum.length >= 18) {
					if(this.cardType == "A" || this.cardType == "D" || this.cardType == "C") {
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
			//上一步
			getLastClick(){
				window.history.go(-1)
			},
			//下一步
			getNextClick(){
				alert(this.nexusType)
				var  myReg  =  /^([\u4E00-\u9FA5]{2,})+$/; //验证姓名
				if(this.appName == "" || this.appName == undefined) {
					Toast('请输入您的姓名');
					return;
				} else if(!myReg.test(this.appName))  {
					Toast("投保人的姓名必须为汉字，并且需大于等于两个汉字")
					return
				} else if(this.appName.length > 50) {
					Toast("投保人的姓名必须小于50个汉字")
				}
				if(this.IDnum == ''){
					Toast('被保险人人证件号码不能为空');
					return
				}else if(this.IDnum =='A'){
					if(this.IDnum.length != 18){
						Toast('被保险人身份证的号码位数不为18位');
						return
					}
				}else if(this.cardType == "q"){
					Toast('请选择被保险人证件类型')
					return
				}else if(this.cardType == "H" || this.cardType == "G") {
					if(this.IDnum.length < 6) {
						Toast('被保险人证件为军官证或警官证时，证件号码位数必须必须不少于6个字符')
						return
					}
				}else if(this.cardType == "F" ) {
					if(this.IDnum.length < 3) {
						Toast('被保险人证件为护照时，证件号码位数必须不少于3个字符')
						return
					}
				}else if(this.cardType == "W" ) {
					if(this.IDnum.length < 8) {
						Toast('被保险人证件为港澳台回乡证时，证件号码位数必须不少于8个字符')
						return
					}
				}else if(this.cardType == "D" || this.cardType == "C") {
					if(this.IDnum.length <3) {
						Toast('被保险人证件为出生证或户口本号码时，证件号码位数必须不少于3个字符')
						return
					}
				}
				if(this.reHighs == "q"){
					Toast('请选择被保险人国籍')
					return
				}
				if(this.marType == "q"){
					Toast('请选择被保险人婚姻状况')
					return
				}
				if(this.eduType == "q"){
					Toast('请选择被保险人教育程度')
					return
				}
				if(this.provinceType == "q" || this.cityType == "q" || this.countyType == "q") {
					Toast("请选择城市")
					return;
				}
				if(this.socialType == "q"){
					Toast('请选择被保险人是否有社保')
					return
				}
				var regPh = /^1[0-9]{10}$/;//手机号
				if(this.phone == "" || this.phone == undefined) {
					Toast('请输入您的手机号');
					return;
				}
				if(this.phone != "" && this.phone != undefined && !regPh.test(this.phone)) {
					Toast('手机号码格式不正确');
					return;
				}
				var regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/; //邮箱地址
				if(this.email != "" || this.email != undefined){}else{
					if(!regEmail.test(this.email)){
						Toast('邮箱格式不正确');
					return;
					}
				}
			    if(this.work_address.length <= 0){
					Toast("工作单位/学校不得为空")
					return
				}
				var  addReg  =  /^([\u4E00-\u9FA5]{8,})+$/; //验证街道
				if(!addReg.test(this.add))  {
					Toast("街道信息不低于8个汉字")
					return
				}else{
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
						var msg = {
							"relaToAppnt": this.nexusType, //投保人与被保险人关系 ,
							"insrntName": this.appName, //投保人姓名 ,
							"certfType": this.cardType, //证件类型 ,
							"certfCode": this.IDnum, //证件号码 ,
							"gender": genderFlag, //性别 : M-男;F-女
							"birthday": this.birthDate, //出生年月 : 格式yyyy-MM-dd ,
							"certfEnduringFlag": certfEnduringFlag, //证件长期有效标志 : Y-是;N-否 ,
							"certfEndTime": this.termValidityDate, //证件有效期 : 格式yyyy-MM-dd ,
							"nationality": this.reHighs, //国籍 ,
							"maritalStatus": this.marType, //婚姻状态 ,
							"insrntDegree":this.eduType,//教育程度
							"mobile": this.phone, //联系电话 ,
							"email": this.email, //邮箱 ,
							"tel": this.tel, //固定电话 ,
							"province": this.provinceType[0], // 地址省 ,
							"city": this.cityType[0], //地址市
							"county": this.countyType[0], //地址区县 
							"fullAddr": this.add, //详细地址 ,	
							"zipCode": this.zipCode, //邮编 ,
							"workCompany": this.work_address, //工作单位 /学校,
							"address":this.address,
							"position":this.wordPost,//工作职务/学校内容,
							"workAddress":this.provinceType1+','+this.cityType1+','+this.countyType1,
							"occName": this.occName, //职业
							"occNo": this.occNo,//职业代码
							'height':this.height,
							'weight':this.weight,
							"custIdentity": this.zoneType, //居民税收类型
							"socialsecurityStatus":this.socialType,
							"insrntPlurality":this.partTime,
						}
					var msg2 = {
									"agentCode": "test",
									"agentName": "test", //代理人名称 
									"deptCode": "000095",
									"agentDeptCode": "长城人寿保险", //代理机构
									// "amnt": ": this.covermoney,
									"cmpCode": this.$route.query.cmpCode,
									// "prem": ": this.coverage,
									"prodCode": this.$route.query.prodCode,
									// "prodName": ": this.plantename,
									"prodNo": this.$route.query.prodNo,
									// "sumAmnt": ": this.covermoney, /y, //保额合计 ,
									// "sumPrem": ": this.coverage, //, //保费合计 
									// "lowFlag": "A", //法定受益人标识 A-是;B-否 
									"userId": this.$store.state.userId
									}
					var data ={
							"token": this.$store.state.token,
							"userId": this.$store.state.userId,
							"head": { 
								"channelCode": "qtb_h5",
								 "deptCode": "000095",
								 "oprCode": this.$store.state.userId,
								 "prodCode": this.$route.query.prodCode,
							},
							"mark": "UC",
							"opt": "INSRNT,MAIN",
							"pkgNo": this.$route.query.orderNo,
							"insrntReq": msg,
							"mainReq": msg2
					}
					
					console.log('123'+JSON.stringify(data))
					Indicator.open();
					this.$http.post('http://192.168.171.12:9009' + '/order/v1/saveorder', data)
							.then(res => {
								Indicator.close();
								console.log("====保存===="+JSON.stringify(res.data))
								if(res.data.code == "SYS_S_000") {
									console.log("====成功===="+JSON.stringify(res.data))
									this.$router.push('/benProp?prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode);
								} else {
									console.log("====失败===="+JSON.stringify(res.data))
									Toast(res.data.desc);
								}
							}, res => {
								Indicator.close();
								//							console.log(res.data);
							})
				}
			},
		genderClick(){
				this.sexShow = !this.sexShow
			},
		dataClick(){
				if(this.longShow) {
					this.longShow = false
					this.term = false
				} else {
					this.longShow = true
					this.term = true
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
				this.birthDate = Idcard;
				 if (parseInt(this.IDnum.substr(16, 1)) % 2 == 1) {
				 	this.sexShow = false
				 } else {
				 	this.sexShow = true
				 }
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
		color: #333333;
	}
	
	.inputText1 {
		height: 0.68rem;
		font-size: 0.28rem;
		color: #333333;
	}
	
	.inputText22 {
		width: 2.7rem;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
		padding-left: 0;
	}
	
	.inputText2 {
		margin-left: 3.22rem;
	}
	
	.inputText22 {
		width: 2.7rem;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
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