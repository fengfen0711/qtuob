<template>
	<div class="background">
		<p class="p">
			<span class="left">姓名</span>
			<input class="right" maxlength="10" type="text" placeholder="请输入姓名" v-model="list.custName" />
		</p>
		<p class="p">
			<span class="left">手机号</span>
			<input class="right" type="text" maxlength="11" placeholder="请输入手机号" v-on:input="inputFunc" v-model="list.custMobile" />
		</p>
		<p class="p">
			<span class="left">手机归属地</span>
			<span class="right">{{local}}</span>
		</p>
		<p class="p">
			<span class="left">电子邮箱</span>
			<input class="right" type="text" @blur="emailFunc" placeholder="请输入电子邮箱" v-model="list.custEmail" />
		</p>
		<p class="p">
			<span class="left">证件类型</span>
			<select class="right" name="name_car" v-model="cardType" @change="getCouponSelected">
				<option :value="coupon.id" v-for="coupon in couponList">{{coupon.name}}</option>
			</select>
			<!--<input class="right" type="text" v-model="list.custCertiType" />-->
		</p>
		<p class="p">
			<span class="left">证件号码</span>
			<input class="right Idcard" type="text" placeholder="请输入证件号码" v-model="list.custIdNo" v-on:input="cardnum" />
		</p>
		<p class="p">
			<span class="left">出生日期</span>
			<input class="right" type="date" placeholder="请输入出生年月日" v-model="list.custBirthday" />
		</p>
		<div class="p p1">
			<span class="left">性别</span>
			<div class="nv" @click="handleClicknv">
				<img class="imgSex" v-if="nv" src="/static/img/icon_select2_unfocu.png" />
				<img class="imgSex" v-if="!nv" src="/static/img/icon_select1_focus@2x.png" />
				<span>
					女
				</span>
			</div>
			<div class="nan" @click="handleClicknan">
				<img class="imgSex" v-if="nan" src="/static/img/icon_select2_unfocu.png" />
				<img class="imgSex" v-if="!nan" src="/static/img/icon_select1_focus@2x.png" />
				<span>
					男
				</span>
			</div>
			<!--<input class="right" type="text" v-model="sex" />-->
		</div>
		<p class="p">
			<span class="left">职业</span>
			<input class="right" maxlength="10" placeholder="请输入职业" type="text" v-model="list.occDetailType" />
		</p>
		<p class="p">
			<span class="left">常住地址</span>
			<input class="right" maxlength="50" type="text" placeholder="请输入常住地址" v-model="list.custHomeAddr" />
		</p>
		<p class="p">
			<span class="left">年收入(万元)</span>
			<input class="right" type="number" placeholder="请输入年收入" v-model="list.yearIncome" />
		</p>
		<p class="p">
			<span class="left">身高(cm)</span>
			<input class="right" type="number" placeholder="请输入身高" v-model="list.custHeight" />
		</p>
		<p class="p">
			<span class="left">体重(kg)</span>
			<input class="right" type="number" placeholder="请输入体重" v-model="list.custWeight" />
		</p>
		<div class="btn" @click="handleClickBtn">
			保存
		</div>
	</div>
</template>

<script>
	import { Toast } from "mint-ui"
	
	export default {
		name: 'all',
		data() {
			return {
				custId: this.$route.query.custId,
				newPeo: this.$route.query.newPeo,
				cardType: "",
				list: {
					custName: "",
					custMobile: "",
					mobileArea: "",
					custEmail: "",
					custCertiType: "",
					custIdNo: "",
					custBirthday: "",
					occDetailType: "",
					custHomeAddr: "",
					yearIncome: "",
					custHeight: "",
					custWeight: ""
				},
				local: "",
				sex: "",
				nan: true,
				nv: true,
				couponList: [{
						id: "A",
						name: "身份证"
					},
					{
						id: "B",
						name: "临时身份证"
					},
					{
						id: "C",
						name: "户口簿"
					},
					{
						id: "D",
						name: "出生证明"
					},
					{
						id: "E",
						name: "港澳通行证"
					},
					{
						id: "F",
						name: "护照"
					},
					{
						id: "G",
						name: "军官证"
					},
					{
						id: "H",
						name: "警官证"
					},
					{
						id: "I",
						name: "士兵证"
					},
					{
						id: "J",
						name: "驾照"
					},
					{
						id: "M",
						name: "营业执照"
					},
					{
						id: "O",
						name: "其他"
					}
				]
			}
		},
		created() {
			console.log(this.$route.query.name)
			if(this.newPeo == undefined) {
				var data = {
					"custId": this.custId
				}
				this.$http.post(this.$store.state.link + "/cut/cut/queryCustInfo", data).then(response => {

					this.list = response.data.output
					console.log(this.list.custCertiType == "0")
					//this.cardType=this.list.custCertiType
					console.log(this.list.custCertiType == "0")
					if (this.list.custCertiType == undefined || this.list.custCertiType == "0") {
						this.cardType = this.couponList[0].id;
					}else{
						this.cardType = this.list.custCertiType
					}
						
					if(this.list.custGender == "M") {
						this.nan = false
					} else if(this.list.custGender == "F") {
						this.nv = false
					}
					this.inputFunc()
				}, response => {

					console.log("ajax error");
				});
			}

		},
		methods: {
			
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
			if(this.list.custIdNo.length >= 18){
				if(this.cardType == "A" || this.cardType == "B" || this.cardType == "C") {
					if(this.list.custIdNo != "") {
						var data = {
							"idcard": this.list.custIdNo,
							"idtype": this.cardType
						}
						this.$http.post(this.$store.state.link + '/cut/cut/validIDCard', data).then(response => {
							console.log(response.data);
							if(response.data.code == "SYS_S_000") {
								if(response.data.output.valid == true) {
//										if(this.list.custIdNo.length >= 18) {
											var tip = "";
											var pass = true;
											var str = this.isCardID(this.list.custIdNo);
											if(str == "true") {
												var Idcard = this.list.custIdNo.substring(6, 14); //截取生日字符串
												Idcard=Idcard.substring(0,4)+"-"+Idcard.substring(4,6)+"-"+Idcard.substring(6,9);
												this.list.custBirthday=Idcard;
												if(parseInt(this.list.custIdNo.substr(16, 1)) % 2 == 1) {
													this.nan=false;
													this.nv=true;
													this.list.custGender = "F"
													
												}else{
													this.nan=true;
													this.nv=false;
													this.list.custGender = "M"
												}
											}
//										}
								} 
								else {
//									this.list.custIdNo  = "";
									Toast("身份不合法");
								}
							} else {
								Toast("身份不合法");
							}
						}, response => {
							console.log("ajax error");
						});
					}
				}
			
			}else{
				this.list.custBirthday="";
											this.nan=true;
											this.nv=true;
			}
			
		},

			emailFunc() {　
				var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
				if(reg.test(this.list.custEmail)) {

				} else {
					Toast('邮箱格式错误')
				}
			},
			inputFunc() {
				var regPhone = /^(11|12|13|14|15|16|17|18|19|10)\d{9}$/;
				if(this.list.custMobile.length >= 11) {
					if(regPhone.test(this.list.custMobile) == false) {
						Toast('手机号格式有误')
					} else {
						this.$http.get('/gui' + this.list.custMobile).then(response => {
							this.local = response.data.response[this.list.custMobile].location
						}, response => {
							Toast("暂未找到您的手机号归属地，请您核实手机是否正确")
							console.log("归属地查询错误");
						});
					}

				}
			},
			getCouponSelected() {
				console.log(this.cardType)
			},
			addPeo() {
				if(this.list.custName == "") {
					Toast("用户名不能为空")
				} else {
					var data = {
						"addr": this.list.custHomeAddr,
						"age": "",
						"brokerId": localStorage.BrokerId,
						"area": this.list.local,
						"birth": this.list.custBirthday,
						"cName": this.list.custName,
						"certiType": this.list.custCertiType,
						"email": this.list.custEmail,
						"height": this.list.custHeight,
						"idNo": this.list.custIdNo,
						"job": this.list.occDetailType,
						"mobile": this.list.custMobile,
						"pic": "",
						"sex": this.list.custGender,
						"userId": localStorage.userId,
						"weight": this.list.custWeight,
						"yearIncome": this.list.yearIncome
					}
					console.log(data)
					this.$http.post(this.$store.state.link + "/cut/cut/addCust", data).then(response => {
						console.log(response.data)
						if(response.data.code = "SYS_S_000") {
							this.$router.push('/manage?custId=' + this.custId)
						} else {
							Toast(response.data.desc)
						}
					}, response => {

						console.log("ajax error");
					});
				}
			},
			changePeo() {
				var data = {
					"addr": this.list.custHomeAddr,
					"age": "",
					"area": this.list.mobileArea,
					"birth": this.list.custBirthday,
					"cName": this.list.custName,
					"certiType": this.list.custCertiType,
					"custId": this.custId,
					"email": this.list.custEmail,
					"height": this.list.custHeight,
					"idNo": this.list.custIdNo,
					"job": this.list.occDetailType,
					"mobile": this.list.custMobile,
					"pic": "",
					"sex": this.list.custGender,
					"userId": localStorage.userId,
					"weight": this.list.custWeight,
					"yearIncome": this.list.yearIncome
				}
				console.log(data)
				this.$http.post(this.$store.state.link + "/cut/cut/updateCust", data).then(response => {
					console.log(response.data)
					if(response.data.code = "SYS_S_000") {
						this.$router.push('/manage?custId=' + this.custId)
					}
				}, response => {

					console.log("ajax error");
				});
			},
			handleClicknan() {
				if(this.nan) {
					this.nan = false
					this.nv = true
					this.list.custGender = "M"
				} else {
					this.nan = true
				}
			},
			handleClicknv() {
				if(this.nv) {
					this.nv = false
					this.nan = true
					this.list.custGender = "F"
				} else {
					this.nv = true
				}
			},
			handleClickBtn() {
				//  		var a={}
				//  		a=this.list
				this.list.custCertiType = this.cardType

				if(this.newPeo == 1) {
					this.addPeo()
				} else {
					this.changePeo()
				}

			},
			
		},
		
		filters: {
			capitalize: function(value) {
				if(value == "M") {
					return value = "男"
				} else if(value == "F") {
					return value = "女"
				}
			},
			capitalize1: function(value) {
				if(value == "A") {
					return value = "身份证"
				} else if(value == "B") {
					return value = "临时身份证"
				} else if(value == "C") {
					return value = "户口簿"
				} else if(value == "D") {
					return value = "出生证明"
				} else if(value == "E") {
					return value = "港澳通行证"
				} else if(value == "F") {
					return value = "护照"
				} else if(value == "G") {
					return value = "军官证"
				} else if(value == "H") {
					return value = "警官证"
				} else if(value == "I") {
					return value = "士兵证"
				} else if(value == "J") {
					return value = "驾照"
				} else if(value == "K") {
					return value = "回乡证"
				} else if(value == "O") {
					return value = "其他"
				} else if(value == "M") {
					return value = "营业执照"
				}
			}
		}
	}
</script>

<style scoped="scoped">
	input, button {
		background: none;
		border: none;
	}
	input, button {
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
	textarea::-webkit-input-placeholder, input::-webkit-input-placeholder {
		color: #B2B2B2;
		font-weight: 100;
	}
	input:-ms-input-placeholder {
		color: #B2B2B2;
		font-weight: 100;
	}
	select {
		border: none;
		background: none;
		outline: none;
	}
	.Idcard {
		width: 4rem;
	}
	
	.background {
		padding-bottom: .35rem;
	}
	
	.p {
		height: 1.03rem;
		line-height: 1.03rem;
		border-bottom: .001rem solid #C8C7CC;
		margin-left: .32rem;
		overflow: hidden;
	}
	
	.left {
		float: left;
		margin-left: .08rem;
		font-size: .36rem;
		color: #222222;
	}
	
	.right {
		text-align: right;
		height: 1rem;
		line-height: 1rem;
		border: none;
		float: right;
		margin-right: .4rem;
		font-size: .32rem;
		color: #555555;
	}
	
	.btn {
		display: block;
		width: 6.04rem;
		height: 1rem;
		margin: 0 auto;
		line-height: 1rem;
		text-align: center;
		font-size: 0.32rem;
		color: #EB7760;
		border: solid 0.01rem #EB7760;
		border-radius: 0.5rem;
		margin-top: .6rem;
		margin-bottom: .8rem;
	}
	
	.nan {
		height: 1rem;
		line-height: 1rem;
		width: 1.4rem;
		float: right;
		position: relative;
	}
	
	.nan span {
		display: inline-block;
		height: 1rem;
		line-height: 1.04rem;
		font-size: .34rem;
		margin-left: .6rem;
	}
	
	.nv span {
		display: inline-block;
		height: 1rem;
		line-height: 1rem;
		font-size: .34rem;
		margin-left: .6rem;
	}
	
	.nv {
		width: 1.4rem;
		float: right;
		font-size: .34rem;
		position: relative;
	}
	
	.imgSex {
		width: .48rem;
		height: .48rem;
		position: absolute;
		top: .26rem;
	}
</style>