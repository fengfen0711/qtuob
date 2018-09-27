<template>
	<div class="twoCon" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="policyHolder">
			<p class="title_twoCon">
				<label class="titleLable_twoCon">受益人信息1</label>
				<span v-if="peopledetail.isD" @click="deletepeople(peopledetail.id)" class="delBtn">删除</span>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">姓名</label>
				<input type="text" class="inputText inputWidth left" placeholder="请输入真实姓名" v-model="name" maxlength="10" />
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">证件类型</label>
				<select name="name_car" class="left inputText inputWidth" v-model="cardType" @change="cardnum">
					<option :value="coupon.code" v-for="coupon in couponList">{{coupon.name}}</option>
				</select>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">证件号码</label>
				<input type="text" @input="cardnum" maxlength="19" class="inputTextCard inputWidth left" placeholder="请输入证件号码" v-model="IDnum" v-on:input="Idcard"/>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">证件有效期至</label>
				<span class="brspanbo" :class="{opa0:spanFlag}">请选择证件有效期</span>
				<input type="date" id="dateTime2" class="inputText dateInput left" :class="{opa0:!spanFlag}" placeholder="请选择证件有效期" v-model="cardTime" @click="brdate" @change="brdate" />
				<span class="dateBox" @click="validity">
					<img src="/static/img/sexNo.png" class="selImg" v-show="termValidityDateShow" />
					<img src="/static/img/selected.png" class="selImg" v-show="!termValidityDateShow" />
					<span>长期</span>
				</span>
				<label class="dateB" for="dateTime2">
					<img src="/static/upDown.png" class="upDownImg3" />
				</label>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">受益人性别</label>
				<span class="inputText inputSpan left">
						<span class="sex sexM" @click="sexChose">
							<img src="/static/img/sexNo.png" class="sexImg" v-show="reSexShow" />
							<img src="/static/img/sexS.png" class="sexImg" v-show="!reSexShow" />
							<label>男</label>
						</span>
				<span class="sex sexF" @click="sexChose">
							<img src="/static/img/sexNo.png" class="sexImg" v-show="!reSexShow" />
							<img src="/static/img/sexS.png" class="sexImg" v-show="reSexShow" />
							<label>女</label>
						</span>
				</span>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">出生日期</label>
				<span class="brspanbo" :class="{opa0:birthSpanFlag}">请选择出生日期</span>
				<input type="date" id="dateTime3" class="inputText inputWidth left" :class="{opa0:!birthSpanFlag}" v-model="birthDate" placeholder="请选择出生日期" :disabled="disableclick()" @click="birthDateSel" @change="birthDateSel" />
				<label class="dateB1" for="dateTime3">
					<img src="/static/upDown.png" class="upDownImg3" />
				</label>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">国籍</label>
				<select class="left inputText inputWidth" v-model="nationality">
					<option :value="nexus.code" v-for="nexus in nationalityarr">{{nexus.name}}</option>
				</select>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">与被保险人关系</label>
				<select class="left inputText inputWidth" v-model="relationship">
					<option :value="nexus.code" v-for="nexus in nexusList">{{nexus.name}}</option>
				</select>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">受益顺序</label>
				<!--<label v-model="order" class="inputLabel left">{{index+1}}</label>-->
				<input type="text" class="inputTextCard inputWidth left" placeholder="请输入受益顺序" v-model="Proportion1" />
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">受益比例</label>
				<select class="left inputText inputWidth" v-model="Proportion">
					<option :value="nexus.code" v-for="nexus in benefitArr">{{nexus.name}}</option>
				</select>
			</p>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "Beneficiary",
		props: ['peopledetail', 'index', 'nexusList', 'couponList', 'benefitArr', 'nationalityarr', 'addData', 'addIndex'],
		data() {
			return {
				birthSpanFlag: false,
				spanFlag: false,
				termValidityDateShow: true,
				cardType: 0,
				IDnum: '',
				birthDate: '',
				custGender: '',
				name: '',
				cardTime: '',
				nationality: '37',
				relationship: "00",
				order: '',
				Proportion: "1",
				reSexShow: false,
				disabled: false,
				Proportion1: ''
			}
		},
		created() {
			console.log("1====" + JSON.stringify(this.addIndex));
			console.log("1==qq1122=" + JSON.stringify(this.addData));
			if(!this.addIndex) {
				if(this.addData.length > 0) {
					this.name = this.addData[this.index].bnfName;
					this.cardType = this.addData[this.index].certfType;
					this.IDnum = this.addData[this.index].certfCode;
					this.Proportion = this.addData[this.index].bnfShare;
					this.Proportion1 = this.addData[this.index].bnfGrade;
					this.relationship = this.addData[this.index].relatoInsured;
					if(this.addData[this.index].certfEnduringFlag == "Y") {
						this.termValidityDateShow = false;
					} else {
						this.cardTime = this.addData[this.index].certfEndTime;
						this.spanFlag = true;
					}
				}
				if(this.cardType == "0" || this.cardType == "4" || this.cardType == "C") {
					this.cardnum();
				}
			}

		},
		watch: {
			addData: function(val) { //总数据
				console.log("2====" + JSON.stringify(this.addIndex));
				console.log("2==qq1122=" + JSON.stringify(this.addData));
				if(!this.addIndex) {
					if(this.addData.length > 0) {
						this.name = this.addData[this.index].bnfName;
						this.cardType = this.addData[this.index].certfType;
						this.IDnum = this.addData[this.index].certfCode;
						this.Proportion = this.addData[this.index].bnfShare;
						this.Proportion1 = this.addData[this.index].bnfGrade;
						this.relationship = this.addData[this.index].relatoInsured;
						if(this.addData[this.index].certfEnduringFlag == "Y") {
							this.termValidityDateShow = false;
						} else {
							this.cardTime = this.addData[this.index].certfEndTime;
							this.spanFlag = true;
						}
					}
					if(this.cardType == "0" || this.cardType == "4" || this.cardType == "C") {
						this.cardnum();
					}
				}

			},
		},
		methods: {
			Idcard(){
				if(this.IDnum.length>=18){
					if(this.cardType=="A"||this.cardType=="B"||this.cardType=="C"){
						
					}
				}
			},
			disableclick() {
				if(this.cardType == "0" || this.cardType == "4" || this.cardType == "C") {
					return true;
				} else {
					return false;
				}
			
			},
			birthDateSel(){
				var pdate = this.birthDate;
		        var d = new Date;
		        var today = new Date(d.getFullYear (), d.getMonth (), d.getDate ());
		        var reg = /\d+/g;
		        var temp = pdate.match (reg);
		        if(temp){
		         	var foday = new Date (temp[0], parseInt (temp[1]) - 1, temp[2]);
			        if (foday > today){
			            Toast ('受益人出生日期不可选择今天之后的日期');
			            this.birthDate = ""
			        }
		        }
		        if(this.birthDate == ""){
    				this.birthSpanFlag = false
    			}else{
    				this.birthSpanFlag = true
    			}
			},
			brdate() {
    			var pdate = this.cardTime;
		        var d = new Date;
		        var today = new Date(d.getFullYear (), d.getMonth (), d.getDate ());
		        var reg = /\d+/g;
		        var temp = pdate.match (reg);
		        if(temp){
		        	var foday = new Date (temp[0], parseInt (temp[1]) - 1, temp[2]);
			        if (foday < today){
			            Toast ('受益人证件有效期不可选择今天之前的日期');
			            this.cardTime = ""
			        }
		        }
				if(this.cardTime == "") {
					this.spanFlag = false;
				} else {
					this.spanFlag = true;
				}

				this.termValidityDateShow = true;
			},
			sexChose() {
				if(this.cardType == "0" || this.cardType == "4" || this.cardType == "C") {

				} else {
					if(this.reSexShow) {
						this.reSexShow = false;
					} else {
						this.reSexShow = true;
					}
				}

			},
			validity() {
				//			this.termValidityDateShow
				if(this.jsGetAge(this.birthDate) > 46) {
					if(this.termValidityDateShow) {
						//有效
						this.cardTime = "请选择证件有效期";
						this.termValidityDateShow = false;
						this.spanFlag = false;
					} else {
						this.termValidityDateShow = true;
					}
				} else {}

			},
			childSay() {
				var re = /[^\u4e00-\u9fa5]/; //姓名校验
				var patrn = /^[0-9]*$/;
				if(this.Proportion1 == "" || this.Proportion1 == undefined) {
					Toast('受益顺序不得为空')
					this.$emit('child_saya1', true);
					return;
				} else {
					if(!patrn.test(this.Proportion1)) {
						Toast("受益顺序格式不正确")
						this.$emit('child_saya1', true);
						return;
					}
					if(this.Proportion1 <= 0) {
						Toast("受益顺序格式不正确")
						this.$emit('child_saya1', true);
						return;
					}
				}
				if(this.Proportion == "" || this.Proportion == undefined) {
					Toast('受益比例不得为空')
					this.$emit('child_saya1', true);
					return;
				}

				if(this.name == "") {
					Toast('名字不得为空')
					this.$emit('child_saya1', true);
					return;
				}
				if(re.test(this.name)) {
					Toast("受益人人姓名必须为纯中文");
					this.$emit('child_saya1', true);
					return;
				}
				if(this.IDnum == "") {
					Toast('证件号码格式不正确')
					this.$emit('child_saya1', true);
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
				var d2 = this.cardTime.replace(/\-/g, "\/");
				if(this.termValidityDateShow) {
					if(this.cardTime == "" || this.cardTime == undefined) {
						Toast('请选择证件有效期')
						this.$emit('child_saya1', true);
						return;
					} else {
						if(datew != "" && this.cardTime != "" && d1 > d2) {
							Toast('有效期时间不可以选择今天之前')
							this.$emit('child_saya1', true);
							return;
						}
					}
				}
				if(this.nationality == "") {
					this.$emit('child_saya1', true);
					Toast('国籍不得为空')
					return;
				}
				if(this.Proportion == 0) {
					this.$emit('child_saya1', true);
					Toast('请选择受益比例')
					return;
				}
				var certfEnduringFlag;
				var certfEndTime;
				if(this.termValidityDateShow) {
					certfEnduringFlag = "N";
					//不是长期
					if(this.birthDate == "") {
						Toast("请选择证件有效期")
						this.$emit('child_saya1', true);
						return;
					} else {
						certfEndTime = this.cardTime;
					}

				} else {
					certfEnduringFlag = "Y";
					certfEndTime = "";
					//长期
				}
				var sex;
				if(!this.reSexShow) {
					sex = "M"
				} else {
					sex = "F"
				}
				this.$emit('child_saya1', false);
				var bnfReq = {
					"age": this.jsGetAge(this.birthDate), //年龄 ,
					"birthday": this.birthDate, //出生年月 : 格式yyyy-MM-dd ,
					"bnfName": this.name, //受益人姓名 ,
					"bnfSeq": this.Proportion1, //受益顺序
					"bnfShare": this.Proportion, //受益比例 : 整数如50%则传50 ,
					"certfCode": this.IDnum, //证件号码 ,
					"certfEndTime": certfEndTime, // 证件有效期 : 格式yyyy-MM-dd ,
					"certfEnduringFlag": certfEnduringFlag, //证件长期有效标志 : Y-是;N-否 ,
					"certfType": this.cardType, //证件类型 ,
					"gender": sex, //性别 : M-男;F-女 ,
					"nationality": this.nationality, //国籍
					"relatoInsured": this.relationship, // 受益人与被保险人关系 ,
					"bnfType": "1", //受益人类别 : 1-身故受益人;2-生存受益人;3-红利受益人;4-未知 ,
					"bnfGrade": "1" //受益等级
				}
				this.$emit('child_saya', bnfReq);
			},
			deletepeople(data) {
				this.$emit('deletId', data);
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
			cardnum() {
			
				if(this.cardType == "0" || this.cardType == "4" || this.cardType == "C") {
					if(this.IDnum.length == 18) {
						Indicator.open();
						if(this.IDnum != "") {
							var data = {
								"idcard": this.IDnum,
								"idtype": this.cardType
							}
							this.$http.post(this.$store.state.link + '/cut/cut/validIDCard', data).then(response => {
								Indicator.close();
								if(response.data.code == "SYS_S_000") {
									if(response.data.output.valid == true) {
										var tip = "";
										var pass = true;
										var str = this.isCardID(this.IDnum);
										if(str == "true") {
											var Idcard = this.IDnum.substring(6, 14); //截取生日字符串
											Idcard = Idcard.substring(0, 4) + "-" + Idcard.substring(4, 6) + "-" + Idcard.substring(6, 9);
											this.birthDate = Idcard;
											this.birthSpanFlag = true;
											if(parseInt(this.IDnum.substr(16, 1)) % 2 == 1) {
												this.reSexShow = false
											} else {
												this.reSexShow = true
											}
										}
									} else {
										this.birthSpanFlag = false;
										Toast("身份不合法");
										return
									}
								} else {
									this.birthSpanFlag = false;
									Toast("身份不合法");
									return
								}
							}, response => {
								this.birthSpanFlag = false;
								Indicator.close();
								console.log("ajax error");
							})
						}
					} else {
						this.birthSpanFlag = false;
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
	
	.pushBtn {
		display: block;
		width: 6.7rem;
		height: 0.88rem;
		margin: 0.4rem auto;
		line-height: 0.88rem;
		font-size: 0.28rem;
		color: #FFFFFF;
		background: #54CCC1;
		border-radius: 0.16rem;
		text-align: center;
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
	
	.opa0 {
		opacity: 0;
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
	
	.delBtn {
		display: block;
		float: right;
		font-size: 0.3rem;
		color: #EB7760;
	}
	
	.selected {
		color: #EB7760;
	}
	
	.twoCon {
		margin-top: 0.4rem;
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
	
	.twoCon2 {
		border-bottom: solid 0.01rem #C8C7CC;
	}
	
	.borderNone {
		border: none;
	}
	
	.sexImg {
		display: inline-block;
		float: left;
		margin-top: 0.2rem;
		width: 0.48rem;
		height: 0.48rem;
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
		overflow: hidden;
	}
	
	.sexM {
		margin-right: 0.46rem;
	}
	
	.titleLable_twoCon {
		display: inline-block;
		font-size: 0.34rem;
		font-weight: bold;
		color: #222222;
	}
	
	.btnImg {
		display: inline-block;
		float: left;
		width: 0.56rem;
		height: 0.56rem;
		margin-top: 0.14rem;
		margin-right: 0.1rem;
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
	
	.brspanbo {
		display: block;
		position: absolute;
		left: 2.05rem;
		top: 0.3rem;
		color: #B2B2B2;
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
		/*		background: #669900;
*/
	}
	
	.inputLabel1 {
		line-height: 0.68rem;
	}
	
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
		padding-left: 0;
	}
	
	.inputTextCard {
		width: 3rem;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
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
		height: 0.88rem;
		padding: 0 0.26rem;
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
		color: #333333;
	}
	
	.pro {
		width: 3.6rem;
	}
	
	.dateInput {
		width: 2.85rem;
	}
	
	.inputWidth {
		width: 4.66rem;
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
	.dateB {
		position: absolute;
		right: 1.86rem;
		top: 0;
		z-index: -1;
		width: 0.4rem;
		height: 0.87rem;
		background: #FFFFFF;
	}
	.dateB1 {
		position: absolute;
		right: 0rem;
		top: 0;
		z-index: -1;
		width: 0.4rem;
		height: 0.87rem;
		background: #FFFFFF;
	}
	.upDownImg3 {
		width: 0.4rem;
		height: 0.44rem;
		margin-top: 0.22rem;
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
		width: 0.5rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.6rem;
		text-align: center;
		color: #EB7760;
	}
	
	.signBox {
		padding-bottom: 0.32rem;
		margin-bottom: 0.64rem;
	}
	
	.signBtn {
		display: inline-block;
		float: left;
		width: 2.04rem;
		height: 0.68rem;
		line-height: 0.68rem;
		margin-top: 0.32rem;
		font-size: 0.28rem;
		color: #555555;
		text-align: center;
		border: solid 0.02rem #54CCC1;
		border-radius: 0.34rem;
	}
	
	.marR {
		margin-right: 0.233rem;
	}
	
	.selectedSign {
		background: #54CCC1;
		color: #FFFFFF;
	}
</style>