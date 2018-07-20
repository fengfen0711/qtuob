<template>
	<div class="">
		<div class="confirm_text">
			<div class="confirm_div">
				<span class="confirm_name">真实姓名</span>
				<span class="confirm_span_must">*</span>
				<input type="text" v-model="name" class="confirm_inp" placeholder="请输入客户姓名" />
				<!--<img class="confirm_add" src="/static/img/icon_add_my.png"/>-->
			</div>
		</div>
		<div class="confirm_text">
			<div class="confirm_div">
				<span class="confirm_name">证件类型</span>
				<select name="name_car" v-model="card" value="" class="confirm_card" @change="getCouponSelected">
					<option :value="coupon.id" v-for="coupon in couponList">{{coupon.name}}</option>
				</select>

			</div>
		</div>
		<div class="confirm_text">
			<div class="confirm_div">
				<span class="confirm_name">证件号码</span>
				<input class="confirm_num" v-model="confirm_cardnum" maxlength="18" type="text" placeholder="请输入证件号码" v-on:blur="changeCount()" />
			</div>
		</div>
		<div class="confirm_text">
			<div class="confirm_div">
				<span class="confirm_name">联系电话</span>
				<span class="confirm_span_must">*</span>
				<input class="confirm_num" v-model="confirm_tel" type="tel" maxlength="11" placeholder="请输入手机号码" />
			</div>
		</div>
		<div class="confirm_share" @click="sharenext" id="confirm_id">
			保存
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
				name: '',
				card: '',
				confirm_cardnum: '',
				confirm_tel: '',
				couponList: [
					{
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
			this.card = this.couponList[0].id;
			this.weChat();
			pkInsureId = "";
			this.weChat();
			this.share_wx();
		},
		methods: {
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
			changeCount() {
				console.log(this.card);
				//  			if(this.card=="A"){	
				if(this.confirm_cardnum != "") {
					var data = {
						"idcard": this.confirm_cardnum
					}
					this.$http.post(this.$store.state.link + '/cut/cut/validIDCard', data).then(response => {
						console.log(response.data);
						if(response.data.code == "SYS_S_000") {
							
							if(response.data.output.valid == true) {

							} else {
								this.confirm_cardnum = "";
								Toast("身份不合法");
							}
						} else {
							Toast("身份不合法");
						}
					}, response => {
						console.log("ajax error");
					});
				}
				//  			}
			},
			sharenext() {
				if(this.name == "") {
					Toast("真实姓名不能为空");
					return;
				} else if(this.confirm_tel == "") {
					Toast("联系电话不能为空");
					return;
				} else if(!this.isPoneAvailable(this.confirm_tel)) { 
					Toast("手机号格式不正确");
					return;
				}
				var data = {
					"applicantName": this.name, //真实姓名
					"certiCode": this.confirm_cardnum, //证件号码
					"certiType": this.card, //证件类型
					"mobileNo": this.confirm_tel, //联系电话
					"fkBrokerId": localStorage.getItem("userId"), //user_id
					"pkInsureId": pkInsureId, //主键ID
					"token": localStorage.getItem("token"),
				}
				console.log("22233"+JSON.stringify(data))
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
			},
			shareclick() {
				var data1 = {
					"pkInsureId": pkInsureId,
					"beforeOrderStatus": "N"
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
	.confirm_span_must {
		color: #EB7760;
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