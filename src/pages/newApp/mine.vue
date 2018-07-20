<template>
	<div class="my_body" v-show="mineShow">
		<div v-if="!cust_status" class="custseven_sattus" @touchmove.prevent>
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">温馨提示</div>
				<div class="cs_div_openiput1">
					<p class="cust_p">
						非保险从业人员，无法通过本平台做产品推广，请联系我们的客服马上办理从业资格认证。
					</p>
				</div>
				<div class="cs_btn_bootom">
					<div class="cs_btn_cancer1" @click="notopen">取&nbsp;消</div>
					<div class="cs_btn_bg"></div>
					<a class="cs_btn_cancer2" @click="notopenknow" :href="'tel:' +  phoneNum1 ">马上联系</a>
				</div>
			</div>
		</div>
		<div v-if="!indexstatus" class="custseven_sattus" @touchmove.prevent>
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">温馨提示</div>
				<div class="cs_div_openiput1">
					<p class="cust_p cust_p1">
						您还没有提交上岗申请
					</p>
				</div>
				<div class="cs_btn_bootom">
					<div class="cs_btn_cancer1" @click="notcan">取&nbsp;消</div>
					<div class="cs_btn_bg"></div>
					<a class="cs_btn_cancer2" @click="notopenknow" :href="'tel:' +  phoneNum1 ">马上联系</a>
				</div>
			</div>
		</div>
		<div class="blur_all" :class="{blur_all1:!cust_status,blur_all2:!indexstatus}">
			<div class="my_div_icon clearFloat">
				<div class="my_div_icontop left" @click="userinfo">
					<img class="my_img_icon" :src="headImg" />
				</div>
				<div class="headNameBox left">
					<p class="headName1">{{nickName}}</p>
					<p class="headName2" v-model="phoneNum">{{phoneNum}}</p>
				</div>
			</div>
			<div class="index_top">
				<div class="my_div_itemall" @click="mylifeorder">
					<img class="my_img_itemicon" src="/static/imgNew/icon_order3.png" />
					<div class="my_img_itemname">订单中心</div>
					<img class="my_img_itemnext" src="/static/imgNew/icon_next3.png" />
				</div>
				<div class="my_div_itemall" @click="myConfirmation">
					<img class="my_img_itemicon" src="/static/imgNew/icon_planbook_243.png" />
					<div class="my_img_itemname">我的计划书</div>
					<img class="my_img_itemnext" src="/static/imgNew/icon_next3.png" />
				</div>
				<div class="my_div_itemall" @click="myConfirmation">
					<img class="my_img_itemicon" src="/static/imgNew/icon_seal3.png" />
					<div class="my_img_itemname">客户确认书</div>
					<img class="my_img_itemnext" src="/static/imgNew/icon_next3.png" />
				</div>
				<div class="my_div_itemall" @click="proginquiry">
					<img class="my_img_itemicon" src="/static/imgNew/icon_clock23.png" />
					<div class="my_img_itemname">审批进度查询</div>
					<img class="my_img_itemnext" src="/static/imgNew/icon_next3.png" />
				</div>
				<div class="my_div_itemall set" @click="proginquiry">
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
	export default {
		name: 'mine',
		props: ['mineShow'],
		data() {
			return {
				headImg: "/static/img/userImg.png",
				nickName: "",
				phoneNum: "",
				mark_flag: true,
				cust_status: true,
				indexstatus: true,
				phoneNum1: "010-86220865",
				failure: "",
			}
		},
		created() {
			if(localStorage.getItem("phoneNum") != -"") {
				this.phoneNum = localStorage.getItem("phoneNum").slice(0, 3) + "****" + localStorage.getItem("phoneNum").slice(7, 11);
			}
			var data = {
				"userId": localStorage.getItem("userId"),
				"token": localStorage.getItem("token")
			};
			Indicator.open();
			this.$http.post(this.$store.state.link + "/pct/seloneselfinfo", data).then(res => {
				Indicator.close();
				console.log(res.data)
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
						Toast(res.data.desc);
					} else {
						console.log("登录接口undefined");
					}
				}
			}, res => {
				Indicator.close();
				console.log(res.data)
			})
		},
		methods: { //方法
			notcan() {
				this.indexstatus = true;
			},
			proginquiry() {
				var progdata = {
					"brokerId": localStorage.BrokerId
				}
				Indicator.open();
				this.$http.post(this.$store.state.link + "/core/broker/brokerRegStatus", progdata).then(res => {
					Indicator.close();
					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						if(typeof(res.data.output.tblBrokerRegHis) == "undefined") {
							if(res.data.output.brokerReg.regStatus == "TN" ) {
								this.$router.push('/waitindex')
							}
						} else {
							this.indexstatus = false;
							if(typeof(res.data.output.brokerReg) != "undefined") {
								if(res.data.output.brokerReg.regStatus == "NE" || res.data.output.brokerReg.regStatus == "ZE" || res.data.output.brokerReg.regStatus == "CE") {
									this.failure = res.data.output.tblBrokerRegHis.regRemarks;
									this.$router.push('/failindex?failure=' + this.failure + "&brokerId=" + localStorage.BrokerId)
								}else if(res.data.output.brokerReg.regStatus == "CN" || res.data.output.brokerReg.regStatus == "ZN"){
									this.$router.push('/waitindex')
								}else if(res.data.output.brokerReg.regStatus == "ZS") {
									this.$router.push('/step?brokerId=' + localStorage.BrokerId)
								}
							}
						}
					}
				}, res => {
					Indicator.close();
					console.log(res.data)
				})
			},
			notopenknow() {
				this.cust_status = true;
			},
			notopen() {
				this.cust_status = true;
			},
			userinfo() {
				//个人中心
				this.$router.push('/userInfo')
			},
			mylifeorder() {
				//订单中心
				this.$router.push('/mylifeOrder')
			},
			myConfirmation() {
				//客户确认书
				var data = {
					"brokerId": localStorage.BrokerId
				};
				Indicator.open();
				this.$http.post(this.$store.state.link + "/core/broker/findBrokerByBrokId", data).then(res => {
					Indicator.close();
					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						var brokerCodehas = res.data.output.tblBroker.hasOwnProperty("brokerCode");
						if(brokerCodehas == true) {
							this.$router.push('/custConfirmation')
						} else {
							this.cust_status = false;
						}
					} else {
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
							console.log(res.data.desc);
						} else {
							console.log("登录接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					console.log(res.data)
				})
			},
			mySet() {
				//设置
				this.$router.push('/mine-set')
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
	.my_body {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #FFFFFF;
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
		width: 0.96rem;
		height: 0.96rem;
		margin: 1.02rem 0.16rem 0 0.4rem;
	}
	
	.my_img_icon {
		display: block;
		width: 0.96rem;
		height: 0.96rem;
		border-radius: 50%;
	}
	.headNameBox {
		margin-top: 1.08rem;
		margin-right: 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		font-weight: bold;
	}
	.headName1 {
		margin-bottom: 0.16rem;
		font-size: 0.36rem;
	}
	.my_div_name {
		margin-top: 0.32rem;
		font-size: 0.48rem;
		color: #222222;
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
		font-size: 0.24rem;
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
	
	.my_bg {
		width: 100%;
		height: 0.02rem;
		background: #eeeeee;
	}
	
	.my_bigbg {
		width: 100%;
		height: 0.48rem;
		background: #eeeeee;
	}
	
	.my_div_out {
		display: block;
		width: 6.04rem;
		height: 1rem;
		margin: 0 auto;
		border-radius: 1rem;
		background-image: linear-gradient(90deg, #FF8B62 0%, #FF7CA4 100%);
		box-shadow: inset 0 0.01rem 0.03rem 0 rgba(255, 255, 255, 0.50);
		text-align: center;
		margin-top: 0.8rem;
		color: #ffffff;
		line-height: 1rem;
		font-size: 0.32rem;
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
		width: 5.44rem;
		height: 3.6rem;
		background: #ffffff;
		margin: 0 auto;
		margin-top: 50%;
		border-radius: 0.16rem;
		padding-top: 0.28rem;
	}
	
	.ctc_div_labtitle {
		width: 100%;
		margin: 0 auto;
		font-size: 0.32rem;
		text-align: center;
		color: #555555;
	}
	
	.ctc_div_labtitle1 {
		width: 100%;
		margin: 0 auto;
		font-size: 0.4rem;
		text-align: center;
		color: #555555;
		margin-top: 0.5rem;
	}
	
	.ctc_div_labcontent {
		width: 90%;
		margin: 0 auto;
		font-size: 0.32rem;
		line-height: 0.4rem;
		text-align: left;
		color: #555555;
		margin-top: 0.18rem;
	}
	
	.ctc_div_labbottom {
		width: 100%;
		height: 1.28rem;
		margin-top: 0.5rem;
	}
	
	.ctc_div_ok {
		width: 2rem;
		height: 0.8rem;
		margin: 0 auto;
		margin-top: 0.8rem;
		font-size: 0.4rem;
		text-align: center;
		color: #FFFFFF;
		line-height: 0.8rem;
		border-radius: 0.5rem;
		background: #EB7760;
	}
	
	.index_con {
		width: 2rem;
		height: 0.8rem;
		font-size: 0.4rem;
		text-align: center;
		color: #FFFFFF;
		line-height: 0.8rem;
		border-radius: 0.5rem;
		background: #EB7760;
		float: left;
		margin-top: 0.8rem;
	}
	
	.index_canel {
		width: 2rem;
		height: 0.8rem;
		font-size: 0.4rem;
		text-align: center;
		color: #FFFFFF;
		line-height: 0.8rem;
		border-radius: 0.5rem;
		background: #EB7760;
		float: right;
		margin-top: 0.8rem;
	}
	
	.index_bottom {
		padding: 0 0.4rem;
	}
	
	.index_top {
		margin-top: -0.1rem;
		padding-left: 0.4rem;
	}
	
	.custseven_sattus {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		z-index: 100;
		background: rgba(0, 0, 0, 0.20);
	}
	
	.cs_div_centen {
		overflow: hidden;
		width: 5.42rem;
		height: 3.56rem;
		margin: 0 auto;
		margin-top: 50%;
		border-radius: 0.16rem;
		background: rgba(248, 248, 248, 0.91);
		border-radius: 0.26rem;
		position: relative;
	}
	
	
	.cs_div_openiput {
		width: 4.76rem;
		height: 1.23rem;
		margin: 0 auto;
		margin-top: 0.38rem;
		border: 0.01rem solid #8E8E93;
	}
	
	.cs_btn_bootom {
		width: 5.42rem;
		height: 0.89rem;
		position: absolute;
		bottom: 0;
		border-top: 0.01rem solid #CCCCCC;
	}
	
	.cs_btn_cancercust {
		display: block;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
		border-right: 0.01rem solid #CCCCCC;
	}
	
	
	.cust_p {
		line-height: 0.4rem;
		text-align: justify;
	}
	
	.cs_div_opentitle {
		width: 100%;
		height: 0.36rem;
		text-align: center;
		font-size: 0.32rem;
		color: #222222;
		font-weight: bold;
		margin-top: 0.32rem;
	}
	
	.cs_div_openiput1 {
		width: 4.76rem;
		height: 1.23rem;
		margin: 0 auto;
		margin-top: 0.24rem;
		padding: 0 0.3rem 0 0.3rem;
	}
	
	.cust_p1 {
		padding-top: 0.1rem;
		text-align: center;
	}
	
	
	.cs_btn_cancer1 {
		display: block;
		float: left;
		width: 2.69rem;
		height: 0.88rem;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
		border-right: 0.01rem solid #CCCCCC;
	}
	
	.cs_btn_bg {
		display: block;
		float: left;
		height: 0.88rem;
		width: 0.01rem;
		background: #CCCCCC;
	}
	
	.cs_btn_cancer2 {
		display: block;
		float: left;
		width: 2.69rem;
		height: 0.88rem;
		font-size: 0.3rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
		font-weight: bold;
	}
	.set {
		margin-top: 0.48rem;
	}
</style>