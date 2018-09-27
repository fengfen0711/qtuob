<template>
	<div class="regBox">
		<p class="regTitle clearFloat">
			<img src="/static/imgNew/logo3.png" class="logoImg" />
			<span class="titletText">欢迎注册趣投保</span>
		</p>
		<div class="inputBox">
			<p class="inputGrop clearFloat">
				<span class="inputLabel">
					<span class="spanLable">+86</span>
				</span>
				<input type="tel" maxlength="11" class="inputText" v-model="phoneNum" placeholder="请输入手机号" />
			</p>
			<p class="inputGrop clearFloat">
				<span class="inputLabel"></span>
				<input type="tel" maxlength="6" class="inputText" v-model="code" placeholder="请输入验证码" />
				<span class="codeBtn" @click="handleClickGetCode">{{codeText}}</span>
			</p>
			<p class="inputGrop clearFloat" v-show="eyeShow">
				<span class="inputLabel"></span>
				<input type="password" maxlength="12" class="inputText" @keyup.13=handleClickRegister() v-model="passWord" placeholder="请输入密码（6-12位数字和字母）" />
				<img src="/static/imgNew/eye_open3.png" class="eyeBtn" @click="eyeClick" />
			</p>
			<p class="inputGrop clearFloat" v-show="!eyeShow">
				<span class="inputLabel"></span>
				<input type="text" maxlength="12" class="inputText" @keyup.13=handleClickRegister() v-model="passWord" placeholder="请输入密码（6-12位数字和字母）" />
				<img src="/static/imgNew/eye_close3.png" class="eyeBtn" @click="eyeClick" />
			</p>
			<div class="btnBox">
				<span class="nextBtn" @click="handleClickRegister">注册</span>
			</div>
			<p class="bottomBox" ref="styles">
				<span class="bottomSpan" @click="handleClickToLog">已有帐号？立即登录</span>
			</p>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		name: "regNew",
		data() {
			return {
				eyeShow: true,
				phoneNum: "",
				code: '',
				codeText: "获取验证码",
				passWord:'',
				codeShow: true,
				count: '',
				timer: null,
				regPhone: /^(13|14|15|16|17|18)\d{9}$/,
				regPass: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,
				question: 0,
				size: 0,
			}
		},
		created() {
			this.size = document.documentElement.clientHeight;
    		this.common.noShare();
		},
		mounted() {
			const that = this
			window.onresize = function temp() {
				that.question = document.documentElement.clientHeight;
				that.styleSet()
			}
		},
		methods: {
			handleClickToLog() {
				this.$router.push("/logNew");
			},
			styleSet() {
				if(parseInt(this.size) <= parseInt(this.question)) {
					this.$refs.styles.style.display = "block"
				} else {
					this.$refs.styles.style.display = "none"
				}
			},
			handleClickGetCode() {
				if(this.phoneNum == "") {
					MessageBox('提示', '手机号不能为空，请输入您的手机号');
				} else if(this.regPhone.test(this.phoneNum) == false) {
					MessageBox('提示', '手机号格式不正确，请输入正确格式的手机号');
				} else {
					var phoneInfo = {
						"phoneNo": this.phoneNum
					}
					this.$http.post(this.$store.state.link + '/sso/validatePhone', phoneInfo, {
						headers: {'Content-Type': 'application/json'}
					}).then(response => {
//						console.log(response.data)
						if(response.data.code == "SYS_S_000") {
							this.getCode();
						} else {
							MessageBox('提示', response.data.desc);
						}
					}, response => {
						console.log(response.data)
						console.log("手机号校验错误");
					});
				}
			},
			eyeClick() {
				this.eyeShow = !this.eyeShow
			},
			handleGetCode() {
				var codeInfo = {
					"groupCode": "QTB",
					"mobile": this.phoneNum,
					"sceneCode": "registerSms",
					"exSystem": "QTBApp",
					"exSeq": new Date().getTime(),
					"sendWhen": "I",
					"param": {}
				}
				this.$http.post(this.$store.state.link + '/sms/sendsmscode', codeInfo).then(response => {
					console.log(response.data)
				}, response => {
					console.log("ajax error");
				});
			},
			getCode() {
				this.handleGetCode()
				const TIME_COUNT = 60;
				if(!this.timer) {
					Toast('验证码已发送至' + this.phoneNum + '请注意查收');
					this.count = TIME_COUNT;
					this.codeText = "获取验证码"
					this.codeShow = false;
					this.timer = setInterval(() => {
						if(this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
							this.codeText = this.count + 's后获取'
						} else {
							this.codeShow = true;
							clearInterval(this.timer);
							this.timer = null;
							this.codeText = "获取验证码"
						}
					}, 1000)
				}
			},
			handleClickRegister() {
				if(this.phoneNum == "") {
					Toast('手机号不能为空，请输入您的手机号');
					return;
				} else if(this.regPhone.test(this.phoneNum) == false) {
					Toast('手机号格式不正确，请输入正确的手机号');
					return;
				}
				if(this.code == "") {
					Toast('验证码不能为空');
					return;
				}
				if(this.regPass.test(this.passWord) == false) {
					Toast('密码必须6~12位字符，且同时包含字母和数字')
					return;
				}
				if(this.regPass.test(this.passWord) == false) {
					Toast('密码必须6~12位字符，且同时包含字母和数字')
					return;
				} else {
					var regInfo = {
						"exSystem": "QTBApp",
						"loginNme": this.phoneNum,
						"loginPwd": this.passWord,
						"loginType": "A",
						"smsCode": this.code
					}
					this.$http.post(this.$store.state.link + '/sso/doregister', regInfo).then(response => {
//						console.log(response.data)
						if(response.data.code == "SYS_S_000") {
							this.$router.push('/logNew?phoneNum=' + this.phoneNum)
						} else {
							MessageBox('提示', response.data.desc);
						}
					}, response => {
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
		/*font-weight: 100;*/
	}
	input:-ms-input-placeholder {
		color: #B2B2B2;
		/*font-weight: 100;*/
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
		display: block;
		text-decoration: underline;
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