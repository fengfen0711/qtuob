<template>
	<div class="my_body">
		<div v-if="!cust_status" class="custseven_sattus" @touchmove.prevent>
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">温馨提示</div>
				<div class="cs_div_openiput1">
					<p class="cust_p">
						非保险从业人员，无法通过本平台做产品推广，请联系我们的客服马上办理从业资格认证。
					</p>
				</div>
				<div class="cs_btn_bootom">
					<div class="cs_btn_cancer1" @click="notopen">取消</div>
					<div class="cs_btn_bg"></div>
					<a class="cs_btn_cancer2" @click="notopenknow" :href="'tel:' +  phoneNum1 ">马上联系</a>
				</div>
			</div>
		</div>
		<div v-if="!indexstatus" class="custseven_sattus" @touchmove.prevent>
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">温馨提示</div>
				<div class="cs_div_openiput1">
					<p class="cust_p">
						您还没有提交上岗申请
					</p>
				</div>
				<div class="cs_btn_bootom">
					<div class="cs_btn_cancer1" @click="notcan">取消</div>
					<div class="cs_btn_bg"></div>
					<a class="cs_btn_cancer2" @click="notopenknow" :href="'tel:' +  phoneNum1 ">马上联系</a>
				</div>
			</div>
		</div>
		<div v-if="!mark_flag" class="ctc_div_mask" @click="cancel" @touchmove.prevent>
			<div class="ctc_div_maskitem">
				<div class="ctc_div_labtitle1">退出登陆</div>
				<div class="index_bottom">
					<div class="index_con">取消</div>
					<div class="index_canel" v-on:click="confirm">确定</div>
				</div>

			</div>
		</div>
		<div class="my_div_icon">
			<div class="my_div_icontop" @click="userinfo">
				<img class="my_img_icon" :src="headImg" />
			</div>
			<div class="my_div_name" v-model="phoneNum">{{phoneNum}}</div>
		</div>
		<div class="index_top">
			<div class="my_div_itemall" @click="myConfirmation">
				<img class="my_img_itemicon" src="/static/qijianwei/my_Insurance_icon.png" />
				<div class="my_img_itemname">我的客户确认书</div>
				<img class="my_img_itemnext" src="/static/qijianwei/btn_next.png" />
			</div>
			<div class="my_bg"></div>
			<!--<div class="my_div_itemall">
			<img class="my_img_itemicon" src="/static/qijianwei/baodanguanli.png" />
			<div class="my_img_itemname">保单管理</div>
			<img class="my_img_itemnext" src="/static/qijianwei/btn_next.png" />
		</div>
		<div class="my_bg"></div>-->
			<!--<div class="my_div_itemall">
			<img class="my_img_itemicon" src="/static/qijianwei/jihuashu.png" />
			<div class="my_img_itemname">我的计划书</div>
			<img class="my_img_itemnext" src="/static/qijianwei/btn_next.png" />
		</div>
		<div class="my_bg"></div>-->
			<!--<div class="my_div_itemall">
			<img class="my_img_itemicon" src="/static/qijianwei/shouru.png" />
			<div class="my_img_itemname">我的收入</div>
			<img class="my_img_itemnext" src="/static/qijianwei/btn_next.png" />
		</div> 
		<div class="my_bigbg"></div>-->
			<div class="my_div_itemall" @click="opinionFan">
				<img class="my_img_itemicon" src="/static/qijianwei/fankui.png" />
				<div class="my_img_itemname">意见反馈</div>
				<img class="my_img_itemnext" src="/static/qijianwei/btn_next.png" />
			</div>
			<div class="my_bg"></div>
			<div class="my_div_itemall" @click="safe">
				<img class="my_img_itemicon" src="/static/qijianwei/anquan.png" />
				<div class="my_img_itemname">账户安全</div>
				<img class="my_img_itemnext" src="/static/qijianwei/btn_next.png" />
			</div>
			<div class="my_bg"></div>
			<div class="my_div_itemall" @click="aboutqtb">
				<img class="my_img_itemicon" src="/static/qijianwei/gengduo.png" />
				<div class="my_img_itemname">关于趣投保</div>
				<img class="my_img_itemnext" src="/static/qijianwei/btn_next.png" />
			</div>
			<div class="my_bg"></div>
			<div class="my_div_itemall" @click="mylifeorder">
				<img class="my_img_itemicon" src="/static/qijianwei/gengduo.png" />
				<div class="my_img_itemname">我的订单</div>
				<img class="my_img_itemnext" src="/static/qijianwei/btn_next.png" />
			</div>
			<div class="my_div_itemall" @click="proginquiry">
				<img class="my_img_itemicon" src="/static/qijianwei/gengduo.png" />
				<div class="my_img_itemname">申请进度查询</div>
				<img class="my_img_itemnext" src="/static/qijianwei/btn_next.png" />
			</div>
		</div>

		<div class="my_div_out" v-on:click="exitYes">退出登录</div>
		<Bottom :seen="seen"></Bottom>
	</div>
</template>

<script>
	import Bottom from "./bottom.vue"
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'Login',
		data() {
			return {
				seen: false,
				headImg: "/static/img/userImg.png",
				phoneNum: "",
				mark_flag: true,
				cust_status: true,
				indexstatus: true,
				phoneNum1: "010-86220865",
				failure: "",
			}
		},
		methods: { //方法
			notcan() {
				this.indexstatus = true;
			},
			proginquiry() {
				var progdata = {

					"brokerId": localStorage.BrokerId
					//					"brokerId": "1475362" //驳回
					//										"brokerId":"1475180" 
					//										"brokerId":"1525009"

					// 成功
					//  未审批
				}
				console.log(progdata);
				Indicator.open();
				this.$http.post(this.$store.state.link + "/core/broker/brokerRegStatus", progdata).then(res => {
					Indicator.close();
					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						if(typeof(res.data.output.tblBrokerRegHis) == "undefined") {
							if(res.data.output.brokerReg.regStatus == "TN" ) {
								this.$router.push('/waitindex?regStatus='+res.data.output.brokerReg.regStatus)
							} 
							

						} else {
							this.indexstatus = false;
							if(typeof(res.data.output.brokerReg) != "undefined") {
								if(res.data.output.brokerReg.regStatus == "NE" || res.data.output.brokerReg.regStatus == "ZE" || res.data.output.brokerReg.regStatus == "CE") {
									this.failure = res.data.output.tblBrokerRegHis.regRemarks;
									this.$router.push('/failindex?failure=' + this.failure + "&brokerId=" + localStorage.BrokerId)
								}else if(res.data.output.brokerReg.regStatus == "CN" || res.data.output.brokerReg.regStatus == "ZN"){
									this.$router.push('/waitindex?regStatus='+res.data.output.brokerReg.regStatus)
								}else if(res.data.output.brokerReg.regStatus == "ZS") {
								this.$router.push('/step?brokerId=' + localStorage.BrokerId)
								}
							}

						}

					} else {

					}
				}, res => {
					Indicator.close();

					console.log("2===" + res.data)
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
			opinionFan() {
				//意见反馈
				this.$router.push('/feedback')
			},
			aboutqtb() {
				//关于趣投保
				this.$router.push('/workbench')
			},
			mylifeorder() {
				//我的订单
				this.$router.push('/mylifeOrder')
			},
			myConfirmation() {
				//我的客户确认书
				var data = {
					"brokerId": localStorage.BrokerId
				};
				console.log(data)
				Indicator.open();
				this.$http.post(this.$store.state.link + "/core/broker/findBrokerByBrokId", data).then(res => {
					Indicator.close();
					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						var brokerCodehas = res.data.output.tblBroker.hasOwnProperty("brokerCode");
						if(brokerCodehas == true) {
							this.$router.push('/custConfirmation')
						} else {
							//							Toast("尚未获得经纪人资格，快去申请经纪人资格吧");
							this.cust_status = false;
						}

					} else {
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {
							console.log("登录接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					console.log("2===" + res.data)
				})

			},
			safe() {
				//账户安全
				this.$router.push('/safe')
			},
			exitYes() {
				//退出登录

				this.mark_flag = false;
			},
			confirm() {
				var data = {
					"loginNme": localStorage.getItem("phoneNum"),
					"loginType": "A",
					"token": localStorage.getItem("token"),
					"userId": localStorage.getItem("userId")
				};
				this.$http.post(this.$store.state.link + "/sso/dologout", data).then(res => {
					Indicator.close();
					console.log("总数据" + JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {
						window.localStorage.removeItem("phoneNum");
						window.localStorage.removeItem("token");
						this.$router.push('/login');

					} else {
						window.localStorage.removeItem("phoneNum");
						window.localStorage.removeItem("token");
						this.$router.push('/login');
					}
				}, res => {
					Indicator.close();
					Toast('222')
					console.log("2===" + res.data)
				})
			},
			cancel() {
				this.mark_flag = true;
			}

		},
		created() {
			console.log("ssss1=" + localStorage.getItem("userId"))
			console.log("ssss2=" + localStorage.getItem("token"))
			if(localStorage.getItem("phoneNum") != -"") {
				this.phoneNum = localStorage.getItem("phoneNum").slice(0, 3) + "****" + localStorage.getItem("phoneNum").slice(7, 11);
			}
			var data = {
				"userId": localStorage.getItem("userId"),
				"token": localStorage.getItem("token")
			};
			console.log("data==" + JSON.stringify(data));
			Indicator.open();
			this.$http.post(this.$store.state.link + "/pct/seloneselfinfo", data).then(res => {
				Indicator.close();
				console.log("总数据" + JSON.stringify(res.data))
				if(res.data.code == "SYS_S_000") {
					if(res.data.output.headImg != "") {
						this.headImg = res.data.output.headImg;
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
				Toast('222')
				console.log("2===" + res.data)
			})
		},
		components: {
			Bottom: Bottom
		}

	}
</script>

<style scoped="scoped">
	.my_body {
		/*	position: absolute;*/
		background: #f8f8f8;
		width: 100%;
		height: 100%;
		padding-bottom: 1.7rem;
	}
	
	.my_div_icon {
		width: 100%;
		height: 3.4rem;
		background: #f8f8f8;
		padding-top: 0.5rem;
	}
	
	.my_div_icontop {
		width: 2.2rem;
		height: 2.2rem;
		display: block;
		margin: 0 auto;
	}
	
	.my_img_icon {
		display: block;
		width: 2.2rem;
		height: 2.2rem;
		border: 0.04rem solid #000000;
		border-radius: 50%;
		box-shadow: 0rem 0.2rem 0.2rem #eeeeee;
	}
	
	.my_div_name {
		margin-top: 0.32rem;
		text-align: center;
		font-size: 0.48rem;
		color: #222222;
	}
	
	.my_div_itemall {
		width: 100%;
		height: 1.12rem;
		background: #ffffff;
		border-bottom: 0.01rem solid #EEEEEE;
	}
	
	.my_img_itemicon {
		display: block;
		float: left;
		margin-top: 0.22rem;
		width: 0.68rem;
		height: 0.68rem;
		margin-left: 0.4rem;
	}
	
	.my_img_itemname {
		display: block;
		float: left;
		font-size: 0.32rem;
		line-height: 1.12rem;
		margin-left: 0.26rem;
	}
	
	.my_img_itemnext {
		display: block;
		float: left;
		margin-top: 0.24rem;
		width: 0.64rem;
		height: 0.64rem;
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
		margin-top: 0.2rem;
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
		background: rgba(248, 248, 248, 0.90);
		border-radius: 0.26rem;
		position: relative;
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
	
	.cs_div_openiput1 {
		width: 4.76rem;
		height: 1.23rem;
		margin: 0 auto;
		margin-top: 0.38rem;
		padding: 0 0.3rem 0 0.3rem;
	}
	
	.cust_p {
		line-height: 0.4rem;
		text-align: justify;
	}
	
	.custseven_sattus {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		z-index: 100;
		background: rgba(0, 0, 0, 0.31);
	}
	
	.cs_div_centen {
		overflow: hidden;
		width: 5.42rem;
		height: 3.56rem;
		margin: 0 auto;
		margin-top: 50%;
		border-radius: 0.16rem;
		background: rgba(248, 248, 248, 0.90);
		border-radius: 0.26rem;
		position: relative;
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
		margin-top: 0.38rem;
		padding: 0 0.3rem 0 0.3rem;
	}
	
	.cust_p {
		text-align: justify;
	}
	
	.cs_btn_bootom {
		width: 5.42rem;
		height: 0.89rem;
		position: absolute;
		bottom: 0;
		border-top: 0.01rem solid #CCCCCC;
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
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
		font-weight: bold;
	}
	
	.blur_all {
		width: 100%;
		height: 100%;
	}
	
	.blur_all1 {
		filter: blur(0.18rem);
	}
</style>