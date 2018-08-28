<template>
	<div class="twoCon">
		<div class="policyHolder">
			<p class="title_twoCon clearFloat">
				<span class="left">身故受益人{{item.name}}</span>
				<span v-if="item.isD" @click="deletepeople(item.id)" class="right title_twoCon1">清除</span>
			</p>
			<div class="policyHolder">
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>是被保险人的</label>
					<select class="inputText inputWidth left" v-model="insured">
						<option value="N">请选择</option>
						<option :value="nexus.dicCode" v-for="nexus in nexusList">{{nexus.dicName}}</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>姓名</label>
					<input type="text" class="inputText inputWidth left" placeholder="请输入姓名" v-model="benname" />
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>证件类型</label>
					<select class="left inputText inputWidth" v-model="bencard" @change="bentype">
						<option value="N">请选择</option>
						<option :value="coupon.dicCode" v-for="coupon in couponList">{{coupon.dicName}}</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>证件号码</label>
					<input type="text" maxlength="18" class="inputText inputWidth left" placeholder="请输入证件号码" v-model="bencardnum" v-on:input="bencardnumclick" />
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>性别</label>
					<span class="inputText inputSpan left">
						<span class="sex sexM" @click="bensex">
							<img src="/static/img/sexNo.png" class="sexImg" v-show="!sexShow" />
							<img src="/static/img/sexS.png" class="sexImg" v-show="sexShow" />
							<label>男</label>
						</span>
						<span class="sex sexF" @click="bensex1">
							<img src="/static/img/sexNo.png" class="sexImg" v-show="sexShow" />
							<img src="/static/img/sexS.png" class="sexImg" v-show="!sexShow" />
							<label>女</label>
						</span>
					</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>出生日期</label>
					<input type="date" id="birthD7" class="inputText inputWidth left" v-model="bendata" />
					<label class="dateB" for="birthD7">
						<img src="/static/upDown.png" class="upDownImg" />
					</label>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>证件是否长期有效</label>
					<span class="inputText inputSpan left">
						<span class="sex sexM" @click="benshouyi">
							<img src="/static/img/sexNo.png" class="sexImg" v-show="longShow" />
							<img src="/static/img/sexS.png" class="sexImg" v-show="!longShow" />
							<label>是</label>
						</span>
						<span class="sex sexF" @click="benshouyi1">
							<img src="/static/img/sexNo.png" class="sexImg" v-show="!longShow" />
							<img src="/static/img/sexS.png" class="sexImg" v-show="longShow" />
							<label>否</label>
						</span>
					</span>
				</p>
				<p class="inputGrop clearFloat" v-if="valiuntil">
					<label class="inputLabel left">
						<label class="star">*</label>证件有效期至</label>
					<input type="date" id="birthD8" class="inputText inputWidth left" placeholder="请选择证件有效期" v-model="benvaliduntil" />
					<label class="dateB" for="birthD8">
						<img src="/static/upDown.png" class="upDownImg" />
					</label>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>国籍</label>
					<select class="left inputText inputWidth" v-model="bennation">
						<option value="N">请选择</option>
						<option :value="nexus.dicCode" v-for="nexus in nationalityarr">{{nexus.dicName}}</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>受益顺序</label>
					<select class="left inputText inputWidth" v-model="benefitorder">
						<option value="N">请选择</option>
						<option>1</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">
						<label class="star">*</label>受益比例（%）</label>
					<input type="text" class="inputText inputWidth left" placeholder="请输入受益比例" v-model="incomeratio" />
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { Dictionaries } from "../../assets/js/counry.js";
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui'
export default {
	name: "benChild",
	props: ['peopledetail', 'item', 'nexusList', 'couponList', 'nationalityarr', 'addData', 'index', 'addIndex'],
	data() {
		return {
			sexShow: true,
			longShow: true,
			valiuntil: true, //证件有效期至
			insured: "N",//是被保人的
			benname: "",//姓名
			bencard: "N",//证件类型
			bencardnum: "",//证件号码
			bendata: "",//出生日期
			benvaliduntil: "",//证件有效期
			bennation: "37",//国籍
			benefitorder: "N",//受益顺序
			incomeratio: "",//受益比例
			sex: "",//性别
			isvalidity: "",//是否长期有效
			certfEnduringFlag: "",
			dictionaries: '',
			age:''  //年龄
		}
	},
	watch: {
		item: function(val) { //总数据
			console.log(JSON.stringify(val))
		},
	},
	created() {
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

		//			console.log(this.couponList)
		//this.sex="M";
		//this.isvalidity="N";
		//this.certfEnduringFlag="N";
		//this.bennation="37";
		//			this.init_props();
		//this.benname = this.addData;
		//			if(!this.addIndex) {
		if (!this.addIndex) {
			if (this.addData.length > 0) {
				this.bencard = this.addData[this.index].certfType;
				this.benname = this.addData[this.index].bnfName;
				this.bencardnum = this.addData[this.index].certfCode;//证件号码
				this.incomeratio = this.addData[this.index].bnfShare;//受益比例
				this.insured = this.addData[this.index].relatoInsured;//关系
				this.bennation = this.addData[this.index].nationality;//国籍
				this.benefitorder = this.addData[this.index].bnfSeq;//受益顺序
				if (this.addData[this.index].gender == "F") {
					this.sexShow = false;
					this.sex = "F"

				} else {
					this.sexShow = true;
					this.sex = "M"

				}
				this.bendata = this.addData[this.index].birthday;//出生日期
				if (this.addData[this.index].certfEnduringFlag == "N") {
					this.longShow = true
					this.isvalidity = "N"
					this.certfEnduringFlag = "N"
					this.valiuntil = true;

				} else {
					this.longShow = false
					this.isvalidity = "Y"
					this.valiuntil = false;
					this.certfEnduringFlag = "Y"

				}
				this.benvaliduntil = this.addData[this.index].certfEndTime;//证件有效期至

			}
		}
		//			}

	},
	watch: {
		addData: function(val) {
			if (!this.addIndex) {
				if (this.addData.length > 0) {
					this.bencard = this.addData[this.index].certfType;
					this.benname = this.addData[this.index].bnfName;
					this.bencardnum = this.addData[this.index].certfCode;//证件号码
					this.incomeratio = this.addData[this.index].bnfShare;//受益比例
					this.insured = this.addData[this.index].relatoInsured;//关系
					this.bennation = this.addData[this.index].nationality;//国籍
					this.benefitorder = this.addData[this.index].bnfSeq;//受益顺序
					if (this.addData[this.index].gender == "F") {
						this.sexShow = false;
						this.sex = "F"

					} else {
						this.sexShow = true;
						this.sex = "M"

					}
					this.bendata = this.addData[this.index].birthday;//出生日期
					if (this.addData[this.index].certfEnduringFlag == "N") {
						this.longShow = true
						this.isvalidity = "N"
						this.certfEnduringFlag = "N"
						this.valiuntil = true;

					} else {
						this.longShow = false
						this.isvalidity = "Y"
						this.valiuntil = false;
						this.certfEnduringFlag = "Y"

					}
					this.benvaliduntil = this.addData[this.index].certfEndTime;//证件有效期至

				}
			}
		}
	},
	methods: {
		init_props() {
			this.benname = this.addData[0].bnfName;//姓名
			this.bencardnum = this.addData[0].certfCode;//证件号码
			this.incomeratio = this.addData[0].bnfShare;//受益比例

			this.insured = this.addData[0].relatoInsured;//关系
			this.bencard = this.addData[0].certfType;//证件类型
			this.bennation = this.addData[0].nationality;//国籍
			this.benefitorder = this.addData[0].bnfSeq;//受益顺序

			//性别
			if (this.addData[0].gender == "F") {
				this.sexShow = false;
				this.sex = "F"
				this.$emit('child_saya1', false);
			} else {
				this.sexShow = true;
				this.sex = "M"
				this.$emit('child_saya1', false);
			}
			this.bendata = this.addData[0].birthday;//出生日期
			//证件是否长期
			if (this.addData[0].certfEnduringFlag == "N") {
				this.longShow = true
				this.isvalidity = "N"
				this.certfEnduringFlag = "N"
				this.valiuntil = true;
				this.$emit('child_saya1', false);
			} else {
				this.longShow = false
				this.isvalidity = "Y"
				this.valiuntil = false;
				this.certfEnduringFlag = "Y"
				this.$emit('child_saya1', false);
			}
			this.benvaliduntil = this.addData[0].certfEndTime;//证件有效期至
			// var data = {
			// 	"token": this.$store.state.token,
			// 	"userId": this.$store.state.userId,
			// 	"head": {
			// 		"channelCode": "qtb_h5",
			// 		"deptCode": this.$route.query.cmpCode,
			// 		"oprCode": this.$store.state.userId,
			// 		"prodCode": this.$route.query.prodCode

			// 	},
			// 	"opt": "APPL,MAIN,BNF,INSRNT",
			// 	"pkgNo": this.$route.query.orderNo, //订单号
			// }
			// this.$http.post(this.$store.state.link5 + '/trd/order/v1/queryorder', data)
			// 	.then(res => {
			// 		//console.log(JSON.stringify(res.data));
			// 		console.log(this.addData[0]);


			// 	})
		},
		deletepeople(data) {
			this.$emit('deletId', data);
		},
		bensex() {
			this.sexShow = true;
			this.sex = "M"
			this.$emit('child_saya1', false);

		},
		bensex1() {
			this.sexShow = false;
			this.sex = "F"
			this.$emit('child_saya1', false);

		},
		benshouyi() {
			this.longShow = false
			this.isvalidity = "Y"
			this.valiuntil = false;
			this.certfEnduringFlag = "Y"
			this.$emit('child_saya1', false);
		},
		benshouyi1() {
			this.longShow = true
			this.isvalidity = "N"
			this.certfEnduringFlag = "N"
			this.valiuntil = true;
			this.$emit('child_saya1', false);
		},
		bentype() {
			console.log(this.bencard)
		},
		isCardID(sId) {
			var iSum = 0;
			var info = "";
			if (!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
			sId = sId.replace(/x$/i, "a");
			//			if(aCity[parseInt(sId.substr(0, 2))] == null) return "你的身份证地区非法";
			var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
			var d = new Date(sBirthday.replace(/-/g, "/"));
			if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
			for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
			if (iSum % 11 != 1) return "你输入的身份证号非法";
			return "true";
		},
		bencardnumclick() {
			if (this.bencardnum.length >= 18) {
				this.age=this.bencardnum.substring(6, 14)
				var ageyear=this.age.substring(0,4)+"-"+this.age.substring(4,6)+"-"+this.age.substring(6,8)
				if(this.bencard == "D"){
						if(this.jsGetAge(ageyear)>=18){							
							Toast("受益人需要提供其他有效证件");
								this.$emit('child_saya1', true);
								return;
						}
				}
				if (this.bencard == "A" || this.bencard == "C" || this.bencard == "D") {
					
													
					var data = {
						"idcard": this.bencardnum,
						"idtype": this.bencard,
						"token": this.$store.state.token,
						"userId": this.$store.state.userId
					}
					this.$http.post(this.$store.state.link + '/cut/cut/validIDCard', data).then(response => {
						console.log(response.data);
						if (response.data.code == "SYS_S_000") {
							if (response.data.output.valid == true) {
								var tip = "";
								var pass = true;
								var str = this.isCardID(this.bencardnum);
								if (str == "true") {
									var Idcard = this.bencardnum.substring(6, 14); //截取生日字符串
									Idcard = Idcard.substring(0, 4) + "-" + Idcard.substring(4, 6) + "-" + Idcard.substring(6, 9);
									this.bendata = Idcard;
									if (parseInt(this.bencardnum.substr(16, 1)) % 2 == 1) {
										this.sexShow = true;
										this.sex = "M"

									} else {
										this.sexShow = false;
										this.sex = "F"
									}
								}

							} else {
								this.sexShow = true;
								this.sex = "M";
								this.bendata = "";
								Toast("证件号码不合法");

							}
						} else {
							this.sexShow = true;
							this.sex = "M";
							this.bendata = "";
						}
					}, response => {
						console.log("ajax error");
					});
					
				
				}
			} else {
				this.sexShow = true;
				this.sex = "M";
				this.bendata = "";
				if(this.bencardnum.length >=7){
					if(this.bencard=="L"){
						if(this.bencard.length>10){
							Toast("受益人证件号码有误");
						}
					}
				}
				if(this.bencardnum.length >=3){
					if(this.bencard=="N"){
						if(this.bencard.length>20){
							Toast("受益人证件号码有误");
						}
					}
				}
				
			}
		},
		childSay() {
			var re = /[^\u4e00-\u9fa5]/; //姓名校验
			var patrn = /^[0-9]*$/;
			var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
    			regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
			if (this.insured == "N") {
				Toast("是被保人的关系不能为空");
				this.$emit('child_saya1', true);
				return;
			} else if (this.benname == "") {
				Toast("受益人姓名不能为空");
				this.$emit('child_saya1', true);
				return;

			} else if (re.test(this.benname)) {
				Toast("受益人姓名必须为汉字");
				this.$emit('child_saya1', true);
				return;
			}else if(this.benname.length<2){
				Toast("受益人姓名需大于两个汉字");
				this.$emit('child_saya1', true);
				return;
			}else if(this.benname.length>50){
				Toast("受益人姓名需小于等于50个汉字");
				this.$emit('child_saya1', true);
				return;
			}
			else if (this.bencard == "N") {
				Toast("证件类型不能为空");
				this.$emit('child_saya1', true);
				return;
			} else if (this.bencardnum == "") {
				Toast("证件号码不能为空");
				this.$emit('child_saya1', true);
				return;
			}else if(regEn.test(this.bencardnum)||regCn.test(this.bencardnum)){
				Toast("受益人证件号码不能有特殊字符");
				this.$emit('child_saya1', true);
				return;
			}
			else if (this.bendata == "") {
				Toast("出生日期不能为空");
				this.$emit('child_saya1', true);
				return;
			} else if (this.isvalidity == "N") {
				if (this.benvaliduntil == "") {
					Toast("证件有效期不能为空");
					this.$emit('child_saya1', true);
					return;
				}
			} else if (this.bennation == "N") {
				Toast("请选择国籍");
				this.$emit('child_saya1', true);
				return;
			} else if (this.benefitorder == "N") {
				Toast("请选择受益顺序");
				this.$emit('child_saya1', true);
				return;
			} else if (this.incomeratio == "") {
				Toast("请填写受益比例");
				this.$emit('child_saya1', true);
				return;
			}
			//				else{

			var bnfReq = {
				"age": this.jsGetAge(this.bendata),
				"relatoInsured": this.insured, //受益人是被保人关系
				"bnfName": this.benname, //受益人姓名
				"certfType": this.bencard, //证件类型
				"certfCode": this.bencardnum, //证件号码
				"gender": this.sex, //受益人性别
				"birthday": this.bendata, //出生日期
				"certfEnduringFlag": this.certfEnduringFlag,//证件是否长期有效
				"certfEndTime": this.benvaliduntil, //证件有效期至
				"nationality": this.bennation, //国籍
				"bnfSeq": this.benefitorder, //受益顺序
				"bnfShare": this.incomeratio, //受益比例
				"bnfType": "1", //受益人类别 : 1-身故受益人;2-生存受益人;3-红利受益人;4-未知 ,
				"bnfGrade": "1" //受益等级
			}
			console.log("ddeee" + JSON.stringify(bnfReq))
			this.$emit('child_saya', bnfReq);

			//				}
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

			if (nowYear == birthYear) {
				returnAge = 0;
			} else {
				var ageDiff = nowYear - birthYear;
				if (ageDiff > 0) {
					if (nowMonth == birthMonth) {
						var dayDiff = nowDay - birthDay;
						if (dayDiff < 0) {
							returnAge = ageDiff - 1;
						} else {
							returnAge = ageDiff;
						}
					} else {
						var monthDiff = nowMonth - birthMonth;
						if (monthDiff < 0) {
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

.star {
	color: #EB7760;
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
	padding-bottom: 0.64rem;
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
	color: #C9141E;
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

.inputLabel {
	display: block;
	width: 3.22rem;
	height: 0.88rem;
	line-height: 0.88rem;
	color: #555555;
}

.inputText {
	height: 0.88rem;
	font-size: 0.28rem;
	color: #666666;
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

.pushBox {
	margin: 0.4rem 0 0.92rem 0;
}

.pushBtn {
	display: block;
	width: 6.7rem;
	height: 0.88rem;
	line-height: 0.88rem;
	margin: 0 auto;
	font-size: 0.28rem;
	color: #FFFFFF;
	background: #C9141E;
	border-radius: 0.16rem;
	text-align: center;
}
</style>