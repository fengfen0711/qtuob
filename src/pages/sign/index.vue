<template>
	<div class="background">
		<div class="bg">

		</div>
		<div v-if="!cust_Seven" class="custseven_sattus" @touchmove.prevent>
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">提示</div>
				<div class="cs_div_openiput1">
					<p class="cust_p">
						您身边一定有上海明大优秀的经纪人，请多问问哦~
					</p>
				</div>
				<div class="cs_btn_bootom">
					<div class="cs_btn_cancercust" @click="index_know">确定</div>
				</div>
			</div>
		</div>
		<div v-if="!indexerror" class="custseven_sattus" @touchmove.prevent>
			<div class="cs_div_centen1">
				<div class="cs_div_opentitle">提示</div>
				<div class="cs_div_openiput1">
					<p class="cust_p">
						邀请码错误
					</p>
				</div>
				<div class="cs_btn_bootom">
					<div class="cs_btn_cancercust" @click="inviteknow">确定</div>
				</div>
			</div>
		</div>
		<div class="top">
			<img class="logo" src="/static/img/sign/mdlogo.png" alt="" />
		</div>
		<p class="title">加入明大保险经纪</p>
		<div class="code_w">
			<div class="code">
				<div class="yao">
					邀请码：
				</div>
				<input class="name" maxlength="8" type="number" v-model="code" v-on:input="invitecode" />
				<img class="que" src="/static/img/sign/que.png" @click="invite" />
			</div>
			<div v-if="index_phone">
				<div class="code">
					<div class="yao">
						邀请人：
					</div>
					<input class="name" type="text" v-model="name" readonly="readonly" />
				</div>
				<div class="code">
					<div class="yao">
						手机号：
					</div>
					<input class="name" type="number" maxlength="11" v-model="phone" readonly="readonly"/>
				</div>
			</div>

		</div>
		<div ref="styles" class="btn" @click="handleClickNext">
			马上签约
		</div>
		<div ref="styles1" class="bot">
			<p class="insuracce">您可能会收到上海明大的短信通知</br>
				该通知可随时退订</p>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: "sign",
		data() {
			return {
				question: 0,
				size: 0,
				cust_Seven: true,
				index_phone: false,
				code: "",
				index_invitenum: "",
				index_invitephone: "",
				indexerror: true,
				flagstatus: false

			}
		},
		created() {
			this.size = document.documentElement.clientHeight
			//		if(localStorage.getItem("brokerCode")!=""&&localStorage.getItem("brokerCode")!=null){
			//			this.index_invitecode=localStorage.getItem("brokerCode");
			//			//this.code="10000012";
			//			var data={
			//			"brokerCode":localStorage.getItem("brokerCode");
			//			}
			//			Indicator.open();
			//			this.$http.post(this.$store.state.link + "/core/broker/findByBrokerCode", data).then(res => {
			//						Indicator.close();
			//						console.log(res.data);
			//						if(res.data.code == "SYS_S_000") {
			//						this.index_phone=false;
			//						this.name=res.data.output.brokerName;
			//						this.phone=res.data.output.mobile;
			//
			//						} else if(res.data.code =="CORE_E_206") {
			////							this.indexerror=false
			//							Toast(res.data.desc)
			//						}
			//					}, res => {
			//						Indicator.close();
			//						console.log("2===失败1" + res.data)
			//					});
			//		}

		},

		mounted() {
			const that = this
			window.onresize = function temp() {
				that.question = document.documentElement.clientHeight;
				that.styleSet()
			}
		},
		methods: {
			handleClickNext() {
				if(this.code == "") {
					Toast("请输入邀请码");
				} else if(this.code.length < 8) {
					Toast("请正确输入邀请码");
				} else {
					var indexdata = {
						"brokerCode": this.code
					}
					this.$store.dispatch("changeinviteCode", indexdata)
					this.$router.push('/mast')
				}

			},
			styleSet() {
				if(parseInt(this.size) <= parseInt(this.question)) {
					this.$refs.styles.style.display = "block"
					this.$refs.styles1.style.display = "block"
				} else {
					this.$refs.styles.style.display = "none"
					this.$refs.styles1.style.display = "none"
				}
			},
			invite() {
				this.cust_Seven = false;
			},
			index_know() {
				this.cust_Seven = true;
			},
			inviteknow() {
				this.indexerror = true
			},
			invitecode() {
				if(this.code.length >= 8) {
					var invitecode = {
						"brokerCode": this.code
					};
					Indicator.open();
					this.$http.post(this.$store.state.link + "/core/broker/findByBrokerCode", invitecode).then(res => {
						Indicator.close();
						console.log(res.data);
						if(res.data.code == "SYS_S_000") {
							this.index_phone = true;
							this.name = res.data.output.brokerName;
							this.phone = res.data.output.mobile;
						} else if(res.data.code == "CORE_E_206") {
							this.indexerror = false

						} else if(res.data.code == "CORE_E_203") {
							this.indexerror = false

						}
					}, res => {
						Indicator.close();
						console.log("2===失败1" + res.data)
					});
				} else {
					this.index_phone = false
				}
			}

		}
	}
</script>

<style scoped="scoped">
	.background {
		width: 100%;
		height: 100%;
		background-size: cover;
		/*overflow: hidden;*/
		font-family: "宋体";
	}
	
	.bg {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: url(/static/img/sign/bg.png) no-repeat;
		background-size: cover;
		z-index: -1;
	}
	
	.top {
		width: 6.86rem;
		height: 1.52rem;
		background: url(/static/img/sign/top.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		margin-top: .38rem;
		position: relative;
	}
	
	.logo {
		position: absolute;
		bottom: .14rem;
		width: .68rem;
		height: .52rem;
		left: 3.1rem;
	}
	
	.title {
		font-family: STSongti-SC-Regular;
		font-size: .48rem;
		color: #000000;
		letter-spacing: 0;
		text-align: center;
		margin-top: .02rem;
	}
	
	.code_w {
		width: 5.6rem;
		height: .8rem;
		margin: 0 auto;
		margin-top: 1.64rem;
	}
	
	.code {
		width: 5.6rem;
		height: .8rem;
		text-align: center;
		background: url(/static/img/sign/line.png) no-repeat;
		background-size: contain;
		background-position-y: 100%;
	}
	
	.yao {
		float: left;
		width: 1.46rem;
		text-align: left;
		font-size: .36rem;
		color: #000;
		line-height: .8rem;
	}
	
	.name {
		width: 3.5rem;
		height: .8rem;
		float: left;
		margin-left: 1.46rem;
		font-size: .36rem;
		border: none;
		background: none;
		margin: 0 auto;
		/*line-height: .8rem;*/
	}
	
	.que {
		float: right;
		width: .36rem;
		height: .36rem;
		margin-right: .2rem;
		margin-top: .2rem;
	}
	
	.btn {
		width: 5.34rem;
		height: 1.24rem;
		background: url(/static/img/sign/btn.png) no-repeat;
		background-size: contain;
		position: absolute;
		bottom: 3.32rem;
		left: 1.08rem;
		margin: 0 auto;
		margin-top: 3.15rem;
		text-align: center;
		line-height: 1.24rem;
		font-size: .48rem;
	}
	
	.bot {
		width: 6.86rem;
		position: absolute;
		bottom: .32rem;
		height: 1.52rem;
		background: url(/static/img/sign/bot.png) no-repeat;
		background-size: contain;
		left: .32rem;
		margin: 0 auto;
		margin-top: 1.64rem;
		overflow: hidden;
	}
	
	.insuracce {
		text-align: center;
		line-height: .34rem;
		margin-top: .12rem;
	}
	
	body {
		font-family: "宋体";
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
	
	.custseven_sattus1 {
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
		background: rgba(248, 248, 248, 0.95);
		border-radius: 0.26rem;
		position: relative;
	}
	
	.cs_div_centen1 {
		overflow: hidden;
		width: 5.42rem;
		height: 3rem;
		margin: 0 auto;
		margin-top: 50%;
		border-radius: 0.16rem;
		background: rgba(248, 248, 248, 0.95);
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
		text-align: center;
		line-height: 0.5rem;
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
</style>