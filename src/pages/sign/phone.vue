<template>
	<div class="background">
		<div class="bg">

		</div>
		<div v-if="!cust_Seven" class="custseven_sattus" @touchmove.prevent>
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">提示</div>
				<div class="cs_div_openiput1">
					<p class="cust_p">
						您已经是我们的签约经纪人，无需再次申请。
					</p>
				</div>
				<div class="cs_btn_bootom">
					<div class="cs_btn_cancercust" @click="backno">确定</div>
				</div>
			</div>
		</div>
		<div class="top">
			<img class="logo" src="/static/img/sign/mdlogo.png" alt="" />
		</div>
		<p class="title">验证您的手机号：</p>
		<div class="code_w">
			<div class="code">
				<div class="yao">
					手机号：
				</div>
				<input class="name" maxlength="11" type="number" v-model="phone" placeholder="请输入手机号" />
			</div>
			<div class="code">
				<div class="yao">
					验证码：
				</div>
				<input class="name name1" type="number" v-model="validate" placeholder="请输入验证码"/>
				<span class="codenumber" v-show="show" @click="getCode">{{resettxt}}</span>
				<span class="codenumber" v-show="!show" @click="getCode">{{count}}s后重发</span>
			</div>

		</div>
		<div class="btn">
			<div class="left" @click="handleClickUp">
				上一步
			</div>
			<div class="right" @click="handleClickNext">
				下一步
			</div>
		</div>
		<div ref="styles" class="bot"></div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		name: "sign",
		data() {
			return {
				cust_Seven: true,
				show: true,
				question: 0,
				size: 0,
				count: '',
				timer: null,
				resettxt: "获取验证码",
				phone: "",
				validate: ""

			}
		},
		created() {
			this.size = document.documentElement.clientHeight
		},

		mounted() {
			const that = this
			window.onresize = function temp() {
				that.question = document.documentElement.clientHeight;
				that.styleSet()
			}
		},
		methods: {
			backno() {
				WeixinJSBridge.call('closeWindow');
				this.cust_Seven = true;
			},
			mobilephone() {
				var mobiledata = {
					"brokerMobile": this.phone,
				}
				this.$http.post(this.$store.state.link + '/core/broker/findBrokerByBrokerMobile', mobiledata).then(response => {
					console.log(response.data)
					
					if(response.data.code == "SYS_S_000") {

					}else if(dataCode=="CORE_E_204"){
							this.cust_Seven=false;
					}else if(dataCode=="CORE_E_207"){
						this.$router.push('/hasregistered');
					}
					else {
						Toast("该手机号已被使用");
					}
				}, response => {
					console.log("ajax error");
				});

			},
			handleClickNext() {
				var myreg = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
				if(this.phone == "") {
					Toast("请输入手机号");
				} else if(myreg.test(this.phone) == false) {
					Toast("手机号格式错误");
				} else if(this.validate == "") {
					Toast("请输入验证码");
				} else {
					var telCode = {
						"mobile": this.phone,
						"exSystem": "QTBApp",
						"code": this.validate,
					}
					console.log(telCode);
					this.$http.post(this.$store.state.link + '/sms/validatesmscode', telCode).then(response => {
						console.log(response.data)
						if(response.data.code == "SYS_S_000") {
							var phonedata = {
								"brokerMobile": this.phone
							}

							this.$store.dispatch("changeMobile", phonedata)
							this.$router.push('/sign')
						}else{
							Toast(response.data.desc);
						}
					}, response => {
						console.log("ajax error");
					});

				}

			},
			handleClickUp() {
				window.history.go(-1)
			},
			styleSet() {
				if(parseInt(this.size) <= parseInt(this.question)) {
					this.$refs.styles.style.display = "block"
				} else {
					this.$refs.styles.style.display = "none"
				}
			},
			handleGetCode() {
				var data = {
					"groupCode": "QTB",
					"mobile": this.phone,
					"sceneCode": "registerSms",
					"exSystem": "QTBApp",
					"exSeq": new Date().getTime(),
					"sendWhen": "I",
					"param": {}
				}
				console.log(data)
				this.$http.post(this.$store.state.link + '/sms/sendsmscode', data).then(response => {
					console.log(response.data)
				}, response => {
					console.log("ajax error");
				});
			},
			getCode() {
				var myreg = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
				if(this.phone == "") {
					Toast('手机号码不能为空，请输入您的手机号')
				} else if(this.phone != "") {
					var mobiledata = {
						"brokerMobile": this.phone
					}
					console.log(mobiledata);
					this.$http.post(this.$store.state.link + '/core/broker/findBrokerByBrokerMobile', mobiledata).then(response => {
						console.log(response.data)
						if(response.data.code == "SYS_S_000") {
							if(myreg.test(this.phone) == true) {
								this.handleGetCode()
								const TIME_COUNT = 60;
								if(!this.timer) {
									Toast('验证码已发送至' + this.phone + '请注意查收');
									this.count = TIME_COUNT;
									this.show = false;
									this.timer = setInterval(() => {
										if(this.count > 0 && this.count <= TIME_COUNT) {
											this.count--;
										} else {
											this.resettxt = "重新获取";
											this.show = true;
											clearInterval(this.timer);
											this.timer = null;
										}
									}, 1000)
								}
							} else {
								Toast("手机号格式不正确");
							}
						}
						else {
								Toast(response.data.desc);
															}
					}, response => {
						console.log("ajax error");
					});
				}
				//  	else if(myreg.test(this.phone)){
				//  		this.handleGetCode()
				//		    	const TIME_COUNT = 60;
				//		        if (!this.timer) {
				//		        	Toast('验证码已发送至'+this.phone+'请注意查收');
				//			        this.count = TIME_COUNT;
				//			        this.show = false;
				//			        this.timer = setInterval(() => {
				//			        if (this.count > 0 && this.count <= TIME_COUNT) {
				//			            this.count--;
				//			        } else {
				//			        	this.resettxt="重新获取";
				//			            this.show = true;
				//			            clearInterval(this.timer);
				//			            this.timer = null;
				//			            }
				//			        }, 1000)
				//		        }
				//  	}else{
				//  		Toast('手机号码格式不正确，请输入正确的手机号')
				//  	}

			}

		},

	}
</script>

<style scoped="scoped">
	.background {
		width: 100%;
		height: 100%;
		background-size: cover;
		overflow: hidden;
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
		width: 5.6rem;
		margin: 0 auto;
		font-family: STSongti-SC-Regular;
		font-size: .24rem;
		color: #222;
		letter-spacing: 0;
		text-align: left;
		margin-top: .3rem;
	}
	
	.code_w {
		width: 5.6rem;
		height: 1.7rem;
		margin: 0 auto;
		margin-top: .22rem;
	}
	
	.code {
		width: 5.6rem;
		height: .8rem;
		text-align: center;
		background: url(/static/img/sign/line.png) no-repeat;
		background-size: contain;
		background-position-y: 100%;
		margin-top: .1rem;
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
		font-size: .28rem;
		border: none;
		background: none;
		margin: 0 auto;
		/*line-height: .8rem;*/
	}
	
	.name1 {
		width: 2rem;
	}
	
	.codenumber {
		display: inline-block;
		height: .8rem;
		line-height: .8rem;
		float: right;
	}
	
	.que {
		float: right;
		width: .36rem;
		height: .36rem;
		margin-right: .2rem;
		margin-top: .2rem;
	}
	
	.btn {
		width: 6.34rem;
		height: .96rem;
		background: url(/static/img/sign/btn2.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		position: relative;
		margin-top: 1.72rem;
		text-align: center;
		line-height: 1.24rem;
		font-size: .48rem;
	}
	
	.left,
	.right {
		width: 3.17rem;
		height: 1rem;
		font-size: .32rem;
		line-height: .96rem;
		float: left;
	}
	
	.bot {
		width: 6.86rem;
		position: absolute;
		bottom: .32rem;
		height: 1.52rem;
		background: url(/static/img/sign/bot.png) no-repeat;
		background-size: contain;
		left: .32rem;
		overflow: hidden;
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