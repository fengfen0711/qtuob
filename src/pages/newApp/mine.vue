<template>
		<div class="blur_all" :class="{blur_all1:!cust_status,blur_all2:!indexstatus}">
			<div class="my_div_icon">
				<div class="clearFloat">
					<div class="my_div_icontop left" @click="userinfo">
						<img class="my_img_icon" :src="headImg" />
					</div>
					<div class="headNameBox left" @click="userinfo">
						<p class="headName1">{{nickName}}</p>
					</div>
				</div>
				<div class="signBox">
					<img :src="signImg" class="signImg" />
					<!--<span class="signTxt">{{signText}}</span>-->
				</div>
			</div>
			<div class="index_top">
				<div class="my_div_itemall" @click="mylifeorder">
					<img class="my_img_itemicon" src="/static/imgNew/icon_order3.png" />
					<div class="my_img_itemname">我的投保单</div>
					<img class="my_img_itemnext" src="/static/imgNew/icon_next3.png" />
				</div>
				<div class="my_div_itemall" @click="myConfirmation">
					<img class="my_img_itemicon" src="/static/imgNew/icon_Commission3.png" />
					<div class="my_img_itemname">客户委托书</div>
					<img class="my_img_itemnext" src="/static/imgNew/icon_next3.png" />
				</div>
				<div class="my_div_itemall" @click="lookAhead">
					<img class="my_img_itemicon" src="/static/imgNew/icon_assist3.png" />
					<div class="my_img_itemname">展业辅助</div>
					<img class="my_img_itemnext" src="/static/imgNew/icon_next3.png" />
				</div>
				<div class="my_div_itemall" @click="proginquiry">
					<img class="my_img_itemicon" src="/static/imgNew/icon_clock23.png" />
					<div class="my_img_itemname">审批进度查询</div>
					<img class="my_img_itemnext" src="/static/imgNew/icon_next3.png" />
				</div>
				<div class="my_div_itemall set" @click="mySet">
					<img class="my_img_itemicon" src="/static/imgNew/icon_setting3.png" />
					<div class="my_img_itemname">设置</div>
					<img class="my_img_itemnext" src="/static/imgNew/icon_next3.png" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		name: 'mine',
		data() {
			return {
				mineShow:true,
				headImg: "/static/img/userImg.png",
				nickName: "",
				phoneNum: "",
				mark_flag: true,
				cust_status: true,
				indexstatus: true,
				phoneNum1: "010-86220865",
				failure: "",
				signText:"立即申请",
				signStatus:'',
				signImg:'/static/imgNew/label13.png'
			}
		},
		created() {
			this.getBroInfo()
			this.old();
			this.common.noShare()
		},
		methods: { //方法
			old(){
//				if(localStorage.getItem("phoneNum") && (localStorage.getItem("phoneNum") != -"")) {
//					this.phoneNum = localStorage.getItem("phoneNum").slice(0, 3) + "****" + localStorage.getItem("phoneNum").slice(7, 11);
//				}
				var data = {
					"userId": localStorage.getItem("userId"),
					"token": localStorage.getItem("token")
				};
				Indicator.open();
				this.$http.post(this.$store.state.link + "/pct/seloneselfinfo", data).then(res => {
					Indicator.close();
//					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						if(res.data.output.headImg && res.data.output.headImg != "") {
							this.headImg = res.data.output.headImg;
						}
						if (res.data.output.absName && res.data.output.absName != "") {
							this.nickName = res.data.output.absName;
						}
						window.localStorage.BrokerId = res.data.output.brokerId;
					} else {
						if(res.data.desc != undefined) {
							console.log(res.data.desc)
						} else {
							console.log("登录接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					console.log(res.data)
				})
			},
	  		path(pathAdd){
	  			if (this.signStatus == "ZS") {
					this.$router.push(pathAdd)
				} else  if (this.signStatus == "") {
					MessageBox.confirm('',{
					  	title: '提示',
					  	message: '您尚未与上海明大保险经纪有限公司签约，无法使用此功能。',
					  	confirmButtonText: '签约', 
						cancelButtonText: '暂不签约', 
					  	showCancelButton: true
					}).then(action => {
						this.$router.push('/guader')
						this.quit()
					})
				} else  if (this.signStatus == "NE" || this.signStatus == "CE" || this.signStatus == "ZE") {
					MessageBox.confirm('',{
					  	title: '提示',
					  	message: '您的签约审核失败，是否修改信息',
					  	confirmButtonText: '修改', 
						cancelButtonText: '暂不修改', 
					  	showCancelButton: true
					}).then(action => {
						this.$router.push('/failindex?brokerId='+ this.$store.state.brokerInfo.brokerId+'&failure=' + this.failure)//审核失败
					})
				} else  if (this.signStatus == "TN" || this.signStatus == "CN" || this.signStatus == "ZN") {
					MessageBox.confirm('',{
					  	title: '提示',
					  	message: '您的签约合伙人正在审核中，不要着急哦',
					  	confirmButtonText: '查看进度', 
						cancelButtonText: '暂不查看', 
					  	showCancelButton: true
					}).then(action => {
						this.$router.push('/waitindex?regStatus='+ this.signStatus)//审核中
					})
				}
	  		},
	  		getBroInfo(){
	  			if (this.$store.state.brokerInfo.isSignEnum == 'Y' && this.$store.state.brokerInfo.brokerCode != '') {
					this.signImg = '/static/imgNew/label43.png';
				}else{
		  			var broInfo = {
						"brokerId": this.$store.state.brokerInfo.brokerId,
					}
	//	  			console.log(this.$store.state.brokerInfo.brokerId)
					this.$http.post(this.$store.state.link + "/core/broker/brokerRegStatus", broInfo)
					.then(res => {
						console.log(res.data)
						if(res.data.code == "SYS_S_000") {
							if (res.data.output.brokerReg && res.data.output.brokerReg.regStatus) {
								if (res.data.output.brokerReg.status == 'Y') {
									this.signStatus = res.data.output.brokerReg.regStatus
									this.failure = res.data.output.tblBrokerRegHis.regRemarks;
									this.signClick();
								}
							}else{
								this.signStatus = ""
							}
						}
					}, res => {
						console.log(res.data)
					})
				}
	  		},
			proginquiry() {
				if (this.$store.state.brokerInfo.isSignEnum == 'Y' && this.$store.state.brokerInfo.brokerCode != '') {
					this.$router.push('/step?brokerId='+ this.$store.state.brokerInfo.brokerId)
				}else{
					if (this.signStatus == "ZS") {
						this.$router.push('/step?brokerId='+ this.$store.state.brokerInfo.brokerId)//已签约并审核成功
					} else  if (this.signStatus == "") {
						this.$router.push('/guader')
						this.quit()
					} else  if (this.signStatus == "NE" || this.signStatus == "CE" || this.signStatus == "ZE") {
						this.$router.push('/failindex?brokerId='+ this.$store.state.brokerInfo.brokerId+'&failure=' + this.failure)//审核失败
					} else  if (this.signStatus == "TN" || this.signStatus == "CN" || this.signStatus == "ZN") {
						this.$router.push('/waitindex?regStatus='+ this.signStatus)//审核中
					}
				}
			},
			userinfo() {
				this.$router.push('/userNew')
			},
			mylifeorder() {
				this.$router.push('/mylifeOrder')
//				MessageBox.confirm('',{
//				  	title: '温馨提示',
//				  	message: '我们正在努力中，敬请期待~',
//				  	confirmButtonText: '确定',
//				  	showCancelButton: false
//				}).then(action => {
//					
//				})
			},
			myConfirmation() {
				if (this.$store.state.brokerInfo.isSignEnum == 'Y' && this.$store.state.brokerInfo.brokerCode != '') {
					this.$router.push('/custConfirmation')
				}else{
					this.path('/custConfirmation')
				}
			},
			lookAhead(){
				this.$router.push('/tool')
			},
			mySet() {
				this.$router.push('/mineSet')
			},
			signClick(){
				if (this.$store.state.brokerInfo.isSignEnum == 'Y' && this.$store.state.brokerInfo.brokerCode != '') {
					this.signImg = '/static/imgNew/label43.png';
				}else{
					if (this.signStatus == "ZS") {
						this.signImg = '/static/imgNew/label43.png';
					} else  if (this.signStatus == "") {
						this.signImg = '/static/imgNew/label13.png';
					} else  if (this.signStatus == "NE" || this.signStatus == "CE" || this.signStatus == "ZE") {
						this.signImg = '/static/imgNew/label33.png';
					} else  if (this.signStatus == "TN" || this.signStatus == "CN" || this.signStatus == "ZN") {
						this.signImg = '/static/imgNew/label23.png';
					}
				}
			},
			quit() {
				var data = {
					"loginNme": this.$store.state.userInfo.userPhone,
					"loginType": "A",
					"token": this.$store.state.token,
					"userId": this.$store.state.userId
				};
				this.$http.post(this.$store.state.link + "/sso/dologout", data).then(res => {
					Indicator.close();
//					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						window.localStorage.removeItem("phoneNum");
						window.localStorage.removeItem("token");
						this.$store.dispatch("changeToken", '')
						this.$store.dispatch("changeUserId", '')
						this.$store.dispatch("changeUserInfoData", {})
						this.$store.dispatch("changeBrokerInfoData", {})
					} else {
						window.localStorage.removeItem("phoneNum");
						window.localStorage.removeItem("token");
						this.$store.dispatch("changeToken", '')
						this.$store.dispatch("changeUserId", '')
						this.$store.dispatch("changeUserInfoData", {})
						this.$store.dispatch("changeBrokerInfoData", {})
					}
				}, res => {
					Indicator.close();
					console.log(res.data)
				})
			},
		}
	}
</script>

<style scoped="scoped">
	.left{
		float: left;
	}
	.right{
		float: right;
	}
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.blur_all {
		width: 100%;
		height: 100%;
	}
	.blur_all1 {
		background-attachment: fixed;
	    -webkit-filter: blur(0.1rem);
	    filter: blur(0.1rem);
	}
	.blur_all2 {
		background-attachment: fixed;
	    -webkit-filter: blur(0.1rem);
	    filter: blur(0.1rem);
	}
	.my_div_icon {
		width: 100%;
		height: 3.3rem;
		background-image: url(/static/imgNew/bg_head3.png);
		background-size: cover;
	}
	.my_div_icontop {
		width: 0.8rem;
		height: 0.8rem;
		margin: 1.02rem 0.16rem 0 0.4rem;
	}
	.my_img_icon {
		display: block;
		width: 0.8rem;
		height: 0.8rem;
		border: solid #FFFFFF 0.04rem;
		border-radius: 50%;
	}
	.headNameBox {
		margin-top: 1.02rem;
		margin-right: 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		font-weight: bold;
	}
	.headName1 {
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.36rem;
	}
	.signBox {
		height: 0.28rem;
		padding-left: 0.4rem;
		line-height: 0.28rem;
		margin-top: 0.08rem;
	}
	.signImg {
		display: inline-block;
		width: 0.88rem;
	}
	.signTxt {
		margin-left: 0.12rem;
		line-height: 0.28rem;
		font-size: 0.2rem;
		color: #E73748;
		text-decoration: underline;
	}
	.my_div_itemall {
		width: 100%;
		height: 0.96rem;
		background: #ffffff;
		border-bottom: 0.01rem solid #D8D8D8;
	}
	.my_img_itemicon {
		display: block;
		float: left;
		margin-top: 0.24rem;
		width: 0.48rem;
		height: 0.48rem;
	}
	.my_img_itemname {
		display: block;
		float: left;
		font-size: 0.28rem;
		line-height: 0.96rem;
		margin-left: 0.24rem;
	}
	.my_img_itemnext {
		display: block;
		margin-top: 0.24rem;
		width: 0.48rem;
		height: 0.48rem;
		position: absolute;
		right: 0.4rem;
	}
	.index_top {
		margin-top: -0.1rem;
		padding-left: 0.4rem;
	}
	.set {
		padding-top: 0.48rem;
	}
</style>