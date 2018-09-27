<template>
	<div class="confirm_all">

		<div v-if="!mark_flag" class="ctc_div_mask" @click="cancel">
			<div class="ctc_div_maskitem">
				<div class="ctc_div_title">客户列表</div>
				<div class="ctc_div_list">
					<div v-for="(item,index) in alldata" @click.stop="detal_item(index)" class="ctc_div_listitemall">
						<div class="ctc_div_listitemleft">{{item.custName}}</div>
						<div class="ctc_div_listitemcen">{{item.custAge}}</div>
						<div class="ctc_div_listitemright">{{item.custIdNo}}</div>
					</div>
				</div>
			</div>
		</div>
		<div id="blur_all">
			<div class="confirm_text">
				<div class="confirm_div">
					<span class="confirm_name">真实姓名</span>
					<img v-if="flag" @click="addCust" class="confirm_add" src="/static/img/icon_add_my.png" />
					<input type="text" v-model="name" class="confirm_inp" placeholder="请输入客户姓名" />

				</div>
			</div>
			<div class="confirm_text">
				<div class="confirm_div">
					<span class="confirm_name">证件类型</span>
					<select name="name_car" v-model="card" value="" class="confirm_card" @change="changeCounttt">
						<option :value="coupon.id" v-for="coupon in couponList">{{coupon.name}}</option>
					</select>
					</select>

				</div>
			</div>
			<div class="confirm_text">
				<div class="confirm_div">
					<span class="confirm_name">证件号码</span>
					<input class="confirm_num" v-model="confirm_cardnum" maxlength="18" type="text" placeholder="请输入证件号码" v-on:input="changeCount" />
				</div>
			</div>
			<div class="confirm_text">
				<div class="confirm_div">
					<span class="confirm_name">联系电话</span>
					<input class="confirm_num" v-model="confirm_tel" type="tel" maxlength="11" placeholder="请输入手机号码" />
				</div>
			</div>
			<div class="confirm_share" @click="sharenext" id="confirm_id">
				保存
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import wx from 'weixin-js-sdk'
	var pkInsureId = "";
	var shareURL1 = "";
	export default {
		name: "confirmed",
		data() {
			return {
				flag: true,
				name: '',
				card: '',
				confirm_cardnum: '',
				mark_flag: true,
				confirm_tel: '',
				alldata: [],
				couponList: [{
						id: "0",
						name: "请选择"
					},
					{
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
			console.log("this.$route.query.custId====" + this.$route.query.custId)
			this.card = this.couponList[0].id;
			pkInsureId = "";
			if(this.$route.query.custId == "" || this.$route.query.custId == undefined || this.$route.query.custId == null) {} else {
				this.flag = false;
				//查出数据
				var data = {
					"beginAge": "",
					"userId": localStorage.userId,
					"cityCode": "",
					"custIds": [
						""
					],
					"endAge": "",
					"latelyBir": "",
					"provinceCode": "",
					"name": "",
					"token": localStorage.token,
					"userId": localStorage.userId
				};
				this.$http.post(this.$store.state.link + '/cut/cut/selectList', data).then(response => {
					console.log("data==" + JSON.stringify(response.data));
					if(response.data.code == "SYS_S_000") {
						this.alldata = response.data.output;
						for(var i = 0; this.alldata.length; i++) {
							if(this.alldata[i].custId == this.$route.query.custId) {
								this.name = this.alldata[i].custName;
								this.confirm_cardnum = this.alldata[i].custIdNo;
								this.confirm_tel = this.alldata[i].custMobileNo;
								if(this.alldata[i].custCertiType == undefined) {
									this.card = "0";
								} else {
									this.card = this.alldata[i].custCertiType;
								}
							}
						}

					} else {

					}
				}, response => {
					console.log("ajax error");
				});
			}
		},
		methods: {
			detal_item(index) {
				this.mark_flag = true;
				console.log(JSON.stringify(this.alldata[index]))
				this.name = this.alldata[index].custName;
				this.confirm_cardnum = this.alldata[index].custIdNo;
				this.confirm_tel = this.alldata[index].custMobileNo;
				if(this.alldata[index].custCertiType == undefined) {
					this.card = "0";
				} else {
					this.card = this.alldata[index].custCertiType;
				}
				console.log(this.alldata[index].custCertiType)

			},
			cancel() {
				this.mark_flag = true;
			},
			getCouponSelected() {
				console.log(this.card)
			},
			isPoneAvailable(phoneNum) {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!myreg.test(phoneNum)) {
					return false;
				} else {
					return true;
				}
			},
			addCust() {
				this.mark_flag = false;
				var data = {
					"beginAge": "",
					"userId": localStorage.userId,
					"cityCode": "",
					"custIds": [
						""
					],
					"endAge": "",
					"latelyBir": "",
					"provinceCode": "",
					"name": "",
					"token": localStorage.token,
					"userId": localStorage.userId
				};
				this.$http.post(this.$store.state.link + '/cut/cut/selectList', data).then(response => {
					console.log("data==" + JSON.stringify(response.data));
					if(response.data.code == "SYS_S_000") {
						this.alldata = response.data.output;
					} else {

					}
				}, response => {
					console.log("ajax error");
				});

			},
			changeCounttt() {
				console.log(this.card);
			},
			changeCount() {
				//				console.log(this.card);
				if(this.confirm_cardnum.length >= 18) {
					if(this.card == "A" || this.card == "B" || this.card == "C") {
						//					if(this.card != ""&&this.card !=0) {
						var data = {
							"idcard": this.confirm_cardnum,
							"idtype": this.card,
							"token": localStorage.token,
							"userId": localStorage.userId
						}
						this.$http.post(this.$store.state.link + '/cut/cut/validIDCard', data).then(response => {
							console.log(response.data);
							if(response.data.code == "SYS_S_000") {
								if(response.data.output.valid == true) {} else {
									Toast("证件号码不合法");
								}
							} else {

							}
						}, response => {
							console.log("ajax error");
						});
						//					}
					}
				}

			},
			sharenext() {
				//				if(this.name == "") {
				//					Toast("真实姓名不能为空");
				//					return;
				//				} else if(this.confirm_tel == "") {
				//					Toast("联系电话不能为空");
				//					return;
				//				} else 
				if(this.confirm_tel != "") {
					if(!this.isPoneAvailable(this.confirm_tel)) {
						Toast("手机号格式不正确");
						return;
					}
				}
				if(this.confirm_cardnum != "") {
					if(this.card == "" || this.card == "0") {
						Toast("请选择证件类型");
						return;
					}
				}
				console.log(this.card)
				if(this.card != "" && this.card != "0") {
					if(this.confirm_cardnum == "") {
						Toast("请输入证件号码");
						return;
					}
					//					else if(this.confirm_cardnum.length < 18) {
					//						Toast("请输入正确的证件号码");
					//						return;
					//					} 
					else {
						this.changeCount();
						var data = {
							"applicantName": this.name, //真实姓名
							"certiCode": this.confirm_cardnum, //证件号码
							"certiType": this.card, //证件类型
							"mobileNo": this.confirm_tel, //联系电话
							"fkBrokerId": this.$store.state.brokerInfo.brokerId, //BrokerId
							"pkInsureId": pkInsureId, //主键ID
							"token": localStorage.token,
							"userId": localStorage.userId
						}
						console.log("1111" + JSON.stringify(data))
						document.getElementById("confirm_id").style.disabled = "true";
						this.$http.post(this.$store.state.link + '/core/order/addInsureInput', data).then(response => {
							console.log(response.data);
							document.getElementById("confirm_id").style.disabled = "false";
							if(response.data.code == "SYS_S_000") {
								pkInsureId = response.data.output.pkInsureId;
								//							shareURL1=response.data.output.h5Url+"?pkInsureId="+response.data.output.pkInsureId+"&beforeOrderStatus="+response.data.output.beforeOrderStatus+"&userId="+localStorage.getItem("userId")+"&token="+localStorage.getItem("token");
								//	 						this.shareclick();
								this.$router.push('/custConfirmationdetails?beforeOrderStatus=' + response.data.output.beforeOrderStatus + "&pkInsureId=" + response.data.output.pkInsureId + "&h5Url=" + response.data.output.h5Url)
								console.log("1111" + shareURL);
							} else {
								Toast("保存失败");
							}
						}, response => {
							console.log("ajax error");
							Toast("网络错误");
							document.getElementById("confirm_id").style.disabled = "false";
						});

					}
				} else {
					var data = {
						"applicantName": this.name, //真实姓名
						"certiCode": this.confirm_cardnum, //证件号码
						"certiType": this.card, //证件类型
						"mobileNo": this.confirm_tel, //联系电话
						"fkBrokerId": localStorage.getItem("BrokerId"), //BrokerId
						"pkInsureId": pkInsureId, //主键ID
						"token": localStorage.token,
						"userId": localStorage.userId
					}
					console.log("1111" + JSON.stringify(data))
					document.getElementById("confirm_id").style.disabled = "true";
					this.$http.post(this.$store.state.link + '/core/order/addInsureInput', data).then(response => {
						console.log(response.data);
						document.getElementById("confirm_id").style.disabled = "false";
						if(response.data.code == "SYS_S_000") {
							pkInsureId = response.data.output.pkInsureId;
							//							shareURL1=response.data.output.h5Url+"?pkInsureId="+response.data.output.pkInsureId+"&beforeOrderStatus="+response.data.output.beforeOrderStatus+"&userId="+localStorage.getItem("userId")+"&token="+localStorage.getItem("token");
							//	 						this.shareclick();
							this.$router.push('/custConfirmationdetails?beforeOrderStatus=' + response.data.output.beforeOrderStatus + "&pkInsureId=" + response.data.output.pkInsureId + "&h5Url=" + response.data.output.h5Url)
							console.log("1111" + shareURL);
						} else {
							Toast("保存失败");
						}
					}, response => {
						console.log("ajax error");
						Toast("网络错误");
						document.getElementById("confirm_id").style.disabled = "false";
					});
				}
				//					this.changeCount();

			},
			shareclick() {
				var data1 = {
					"pkInsureId": pkInsureId,
					"beforeOrderStatus": "N",
					"token": localStorage.token,
					"userId": localStorage.userId
				};

				this.$http.post(this.$store.state.link + '/core/order/addInsureInput', data1).then(response => {
					console.log(response.data);
					if(response.data.code == "SYS_S_000") {
						//							this.share();
					} else {

					}
				}, response => {
					console.log("ajax error");
					Toast("网络错误");
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.confirm_all {
		background: #FFFFFF;
	}
	.ctc_div_listitemleft {
		width: 3.2rem;
		display: block;
		float: left;
		line-height: 0.8rem;
	}
	.blur_all {
		filter: blur(0);
	}
	.blur_all1 {
		filter: blur(0.18rem);
	}
	.ctc_div_listitemcen {
		display: block;
		float: left;
		line-height: 0.8rem;
	}
	.ctc_div_listitemright {
		/*width: 3rem;*/
		display: block;
		float: right;
		line-height: 0.8rem;
	}
	.ctc_div_listitemall {
		width: 90%;
		height: 0.8rem;
		margin: 0 auto;
		background: #F3F3F3;
		border-bottom: 0.01rem solid #8E8E93;
	}
	.confirm_span_must {
		color: #EB7760;
	}
	.ctc_div_list {
		margin-top: 0.3rem;
		width: 100%;
		height: 6rem;
		overflow-y: scroll;
		border-top: 0.01rem solid #8E8E93;
		/*background: #669900;*/
	}
	.ctc_div_title {
		width: 100%;
		margin: 0 auto;
		font-size: 0.32rem;
		text-align: center;
		color: #555555;
	}
	.ctc_div_mask {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		background: rgba(0, 0, 0, 0.40);
		z-index: 100;
	}
	.ctc_div_maskitem {
		width: 100%;
		height: 7rem;
		background: #ffffff;
		position: absolute;
		bottom: 0;
		/*margin: 0 auto;
		margin-top: 50%;*/
		/*border-radius: 0.16rem;*/
		padding-top: 0.28rem;
	}
	.confirm_text {
		height: 0.88rem;
		padding: 0 0.2rem;
	}
	.confirm_div {
		height: 0.88rem;
		width: 100%;
		border-bottom: 0.01rem solid;
		border-bottom-color: #E3E3E3;
	}
	.confirm_name {
		line-height: 0.88rem;
		font-size: 0.36rem;
		color: #222222;
	}
	.confirm_inp {
		font-size: 0.28rem;
		text-align: right;
		border: none;
		height: 0.52rem;
		margin-bottom: 0.15rem;
		width: 70%;
		color: #888888;
		float: right;
		margin-top: 0.18rem;
		background: #FFFFFF;
	}
	.confirm_add {
		width: 0.48rem;
		height: 0.48rem;
		line-height: 0.88rem;
		float: right;
		margin-top: 0.2rem;
	}
	.confirm_card {
		font-size: 0.24rem;
		color: #EB7760;
		height: 0.52rem;
		width: 2.12rem;
		line-height: 0.52rem;
		border-radius: 0.08rem;
		float: right;
		margin-top: 0.18rem;
		/*direction: rtl;
		border: none;*/
		text-align: center;
		text-align-last: center;
		background: #FFFFFF;
	}
	.confirm_num {
		width: 74%;
		float: right;
		height: 0.52rem;
		margin-top: 0.18rem;
		text-align: right;
		border: none;
		font-size: 0.28rem;
		color: #888888;
		background: #FFFFFF;
	}
	.confirm_share {
		font-size: 0.32rem;
		color: #EB7760;
		font-style: bold;
		background-image: url(/static/img/btn_div.png);
		background-size: cover;
		width: 6.04rem;
		height: 1rem;
		margin: 0.32rem auto;
		line-height: 1rem;
		text-align: center;
	}
</style>