<template>
	<div class="regBox">
		<p class="regTitle clearFloat">
			<img src="/static/imgNew/logo3.png" class="logoImg" />
			<span class="titletText">欢迎使用趣投保.请登录</span>
		</p>
		<div class="inputBox">
			<p class="inputGrop clearFloat">
				<span class="inputLabel">
					<span class="spanLable">+86</span>
				</span>
				<input type="tel" maxlength="11" class="inputText" v-model="phoneNum" placeholder="请输入手机号" />
			</p>
			<p class="inputGrop clearFloat" v-show="eyeShow">
				<span class="inputLabel"></span>
				<input type="password" maxlength="12" class="inputText" @keyup.13=handleClickLogin() v-model="passWord" placeholder="请输入密码（6-12位数字和字母）" />
				<img src="/static/imgNew/eye_open3.png" class="eyeBtn" @click="eyeClick" />
			</p>
			<p class="inputGrop clearFloat" v-show="!eyeShow">
				<span class="inputLabel"></span>
				<input type="text" maxlength="12" class="inputText" v-model="passWord" @keyup.13=handleClickLogin() placeholder="请输入密码（6-12位数字和字母）" />
				<img src="/static/imgNew/eye_close3.png" class="eyeBtn" @click="eyeClick" />
			</p>
			<div @click="handleClickLogin" class="btnBox">
				<span class="nextBtn">登录</span>
			</div>
			<p class="bottomBox" ref="styles">
				<span class="bottomSpan" @click="handleClickToRew">忘记密码</span>
				<span class="bottomSpan1">|</span>
				<span class="bottomSpan" @click="handleClickToReg">注册账号</span>
			</p>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
    	name: "regNew",
    	data () {
      		return {
      			eyeShow:true,
      			phoneNum:'',
      			passWord:'',
      			regPhone: /^(13|14|15|17|18)\d{9}$/,
				regPass: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,
				question: 0,
				size: 0,
      		}
    	},
    	created(){
    		this.size = document.documentElement.clientHeight;
    		if(this.$route.query.phoneNum != undefined) {
				this.phoneNum = this.$route.query.phoneNum
			}
    	},
		mounted() {
			const that = this
			window.onresize = function temp() {
				that.question = document.documentElement.clientHeight;
				that.styleSet()
			}
		},
    	methods:{
    		handleClickToRew(){
    			this.$router.push("/rewNew")
    		},
    		handleClickToReg(){
    			this.$router.push("/regNew")
    		},
    		eyeClick() {
				this.eyeShow = !this.eyeShow
			},
			styleSet() {
				if(parseInt(this.size) <= parseInt(this.question)) {
					this.$refs.styles.style.display = "block"
				} else {
					this.$refs.styles.style.display = "none"
				}
			},
    		handleClickLogin(){
    			if(this.phoneNum == "") {
					MessageBox('提示', '手机号不能为空，请输入您的手机号');
				} else if (this.regPhone.test(this.phoneNum) == false) {
					MessageBox('提示', '手机号格式不正确，请输入正确格式的手机号');
				} else {
	    			var logInfo = {
						"loginNme": this.phoneNum,
						"loginPwd": this.passWord,
						"loginType": "A",
						"unionId": this.$route.query.unionId
					}
	    			Indicator.open()
					this.$http.post(this.$store.state.link + '/sso/dologin', logInfo).then(response => {
						console.log(response.data)
						Indicator.close()
						if(response.data.code == "SYS_S_000") {
							this.$store.dispatch("changeLoginId", "1")
							window.localStorage.token = response.data.output.token;
							window.localStorage.userId = response.data.output.userId;
							window.localStorage.phoneNum = this.phoneNum;
							this.$store.dispatch("changeToken", response.data.output.token)
							this.$store.dispatch("changeUserId", response.data.output.userId)
							this.$store.dispatch("changeUserInfoData", {})
							this.$store.dispatch("changeUserInfoData", response.data.output.userInfo)
							this.$store.dispatch("changeBrokerInfoData", {})
							this.$store.dispatch("changeBrokerInfoData", response.data.output.brokerInfo)
							console.log("store1==" + JSON.stringify(this.$store.state.userInfo))
							console.log("store2==" + JSON.stringify(this.$store.state.brokerInfo))
							window.localStorage.BrokerId = this.$store.state.brokerInfo.brokerId;
							this.$router.push('/newIndex/home')
						} else {
							Toast(response.data.desc);
						}
					}, response => {
						Indicator.close()
						console.log("ajax error");
					});	
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
	.regBox {
		position: absolute;
		width: 100%;
		min-height: 100%;
		background: #FFFFFF;
	}
	.regTitle {
		height: 0.54rem;
		padding-left: 0.48rem;
		margin-top: 1.28rem;
	}
	.logoImg {
		display: block;
		float: left;
		width: 0.46rem;
		height: 0.48rem;
		margin-top: 0.03rem;
		margin-right: 0.16rem;
	}
	.titletText {
		display: block;
		float: left;
		line-height: 0.54rem;
		font-size: 0.48rem;
		color: #222222;
	}
	.inputGrop {
		position: relative;
		height: 0.6rem;
		padding-top: 0.46rem;
		padding-left: 0.48rem;
	}
	.inputLabel {
		display: block;
		float: left;
		width: 0.8rem;
		height: 0.6rem;
		margin-right: 0.32rem;
		text-align: center;
	}
	.spanLable {
		display: block;
		line-height: 0.6rem;
		font-size: 0.32rem;
		color: #B2B2B2;
		border-bottom: solid 0.01rem #ECECEC;
	}
	.inputText {
		float: left;
		width: 5.54rem;
		height: 0.6rem;
		font-size: 0.32rem;
		color: #222222;
		border-bottom: solid 0.01rem #ECECEC;
	}
	.codeBtn {
		position: absolute;
		bottom: 0.06rem;
		right: 0.48rem;
		z-index: 1;
		width: 1.6rem;
		height: 0.52rem;
		line-height: 0.52rem;
		font-size: 0.24rem;
		color: #FFFFFF;
		text-align: center;
		background: #E73748;
		border-radius: 0.08rem;
	}
	.btnBox {
		width: 100%;
		margin-top: 0.64rem;
		text-align: center;
	}
	.nextBtn {
		display: inline-block;
		width: 6.66rem;
		height: 0.72rem;
		line-height: 0.72rem;
		font-size: 0.24rem;
		color: #FFFFFF;
		text-align: center;
		background: #E73748;
		border-radius: 0.08rem;
	}
	.bottomBox {
		position: fixed;
		bottom: 0.64rem;
		left: 0;
		z-index: 1;
		width: 100%;
		font-size: 0.32rem;
		color: #222222;
		text-align: center;
	}
	.bottomSpan {
		display: inline-block;
		text-decoration: underline;
		padding: 0 0.16rem;
	}
	.bottomSpan1 {
		display: inline-block;
	}
	.eyeBtn {
		position: absolute;
		bottom: 0.06rem;
		right: 0.48rem;
		z-index: 1;
		width: 0.48rem;
		height: 0.48rem;
	}
</style>