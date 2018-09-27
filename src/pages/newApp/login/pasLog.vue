<template>
	<div class="regBox">
		<p class="regTitle clearFloat">
			<img src="/static/imgNew/logo3.png" class="logoImg" />
			<span class="titletText">密码登录</span>
		</p>
		<div class="inputBox">
			<p class="inputGrop clearFloat">
				<span class="inputLabel">
					<span class="spanLable">+86</span>
				</span>
				<span class="spanInput">
					<input type="tel" maxlength="11" class="inputText" v-model="phoneNum" placeholder="请输入手机号" />
				</span>
			</p>
			<p class="inputGrop clearFloat" v-show="eyeShow">
				<span class="inputLabel"></span>
				<span class="spanInput">		
					<input type="password" maxlength="20" class="inputText" @keyup.13=handleClickLogin() v-model="passWord" placeholder="请输入密码（6-20位数字和字母）" />
				</span>
				<img src="/static/imgNew/eye_open3.png" class="eyeBtn" @click="eyeClick" />
			</p>
			<p class="inputGrop clearFloat" v-show="!eyeShow">
				<span class="inputLabel"></span>
				<span class="spanInput">
					<input type="text" maxlength="20" class="inputText" v-model="passWord" @keyup.13=handleClickLogin() placeholder="请输入密码（6-20位数字和字母）" />
				</span>
				<img src="/static/imgNew/eye_close3.png" class="eyeBtn" @click="eyeClick" />
			</p>
			<p class="rewBox">
				<span @click="handleClickToRew">忘记密码</span>
			</p>
			<div @click="handleClickLogin" class="btnBox">
				<span class="nextBtn">登录</span>
			</div>
			<p class="bottomBox">
				<span @click="handleClickToReg">免密登录</span>
			</p>
			<!--<div class="moreBox" ref="styles">
				<p class="footerTitle clearFloat">
					<span class="spanBorder"></span>
					<span class="spanFoot">其他方式登录</span>
					<span class="spanBorder"></span>
				</p>
				<div class="dlBox clearFloat">
					<dl class="dlChild" @click="wechartLog">
						<dt><img src="/static/imgNew/wechart.png" class="weImg"/></dt>
						<dd class="dd">微信</dd>
					</dl>
				</div>
			</div>-->
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
    	name: "regNew",
    	data () {
      		return {
      			eyeShow:true,
      			phoneNum:'',
      			passWord:'',
      			regPhone: /^(13|14|15|16|17|18)\d{9}$/,
				regPass: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
				wechatInfo: {}
      		}
    	},
    	created(){
    		if (localStorage.phoneNum) {
				this.phoneNum = localStorage.phoneNum;
			}
    	},
    	methods:{
    		handleClickToRew(){
    			this.$router.push("/rewNew")
    		},
    		handleClickToReg(){
    			this.$router.push("/regLog")
    		},
    		eyeClick() {
				this.eyeShow = !this.eyeShow
			},
    		handleClickLogin(){
    			if(this.phoneNum == "") {
					Toast('请输入您的手机号');
				} else if (this.regPhone.test(this.phoneNum) == false) {
					Toast('请输入正确的手机号');
				} else {
					if (this.passWord != "") {
						if (localStorage.subscribe) {
							this.wechatInfo = {
								'subscribe':localStorage.subscribe,
								'openId':localStorage.openId,
								'nickName':localStorage.nickName,
								'sex':localStorage.sex,
								'language':localStorage.language,
								'city':localStorage.city,
								'province':localStorage.province,
								'country':localStorage.country,
								'headImgUrl':localStorage.headImgUrl,
								'subscribeTime':localStorage.subscribeTime,
								'unionId':localStorage.unionId,
								'remark':localStorage.remark,
								'groupId':localStorage.groupId,
								'subscribeScene':localStorage.subscribeScene,
								'qrScene':localStorage.qrScene,
								'qrSceneStr':localStorage.qrSceneStr,
							}
						}
						var regInfo = {
						  	"exSystem": "QTBApp",
						  	"loginCome": "A",
						  	"loginName": this.phoneNum,
						  	"loginPwd": this.passWord,
						  	"loginType": "2",
						  	"smsCode": "",
						  	"weChatInfo": this.wechatInfo
						}
						console.log(regInfo)
						this.$http.post(this.$store.state.link + '/sso/v2/dologin', regInfo).then(response => {
							console.log(response.data)
							if(response.data.code == "SYS_S_000") {
								window.localStorage.token = response.data.output.token;
								window.localStorage.userId = response.data.output.userInfo.userId;
								window.localStorage.phoneNum = this.phoneNum;
								window.localStorage.isBindWeChat = response.data.output.userInfo.isBindWeChat;
								if (response.data.output.brokerInfo && response.data.output.brokerInfo.brokerId) {
									window.localStorage.BrokerId = response.data.output.brokerInfo.brokerId;
								}
								this.$store.dispatch("changeLoginId", response.data.output.userInfo.userType);
								this.$store.dispatch("changeToken", response.data.output.token);
								this.$store.dispatch("changeUserId", response.data.output.userInfo.userId);
								this.$store.dispatch("changeUserInfoData", {});
								this.$store.dispatch("changeUserInfoData", response.data.output.userInfo);
								this.$store.dispatch("changeBrokerInfoData", {});
								this.$store.dispatch("changeBrokerInfoData", response.data.output.brokerInfo);
								this.$router.push('/');
							} else {
								Toast(response.data.desc);
								console.log(response.data.desc);
							}
						}, response => {
							console.log("ajax error");
						});
	    			}else{
	    				Toast('请输入密码');
	    			}
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
		margin-top: -0.02rem;
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
		height: 0.6rem;
		line-height: 0.6rem;
		font-size: 0.32rem;
		color: #B2B2B2;
		border-bottom: solid 0.01rem #ECECEC;
	}
	.inputText {
		width: 5.48rem;
		height: 0.6rem;
		font-size: 0.32rem;
		color: #222222;
	}
	.spanInput {
		display: block;
		float: left;
		width: 5.48rem;
		height: 0.6rem;
		border-bottom: solid 0.01rem #ECECEC;
	}
	.codeBtn {
		position: absolute;
		bottom: 0.06rem;
		right: 0.42rem;
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
		text-align: center;
	}
	.rewBox {
		padding: 0.2rem 0.48rem;
		padding-bottom: 0.44rem;
		font-size: 0.28rem;
		color: #222222;
		text-align: right;
	}
	.nextBtn {
		display: inline-block;
		width: 6.66rem;
		height: 0.76rem;
		line-height: 0.76rem;
		font-size: 0.32rem;
		color: #FFFFFF;
		text-align: center;
		background: #E73748;
		border-radius: 0.08rem;
	}
	.bottomBox {
		width: 100%;
		margin-top: 0.32rem;
		font-size: 0.32rem;
		color: #222222;
		text-align: center;
	}
	.eyeBtn {
		position: absolute;
		bottom: 0.06rem;
		right: 0.42rem;
		z-index: 1;
		width: 0.48rem;
		height: 0.48rem;
	}
	.moreBox {
		position: fixed;
		bottom: 0.5rem;
		left: 0;
		z-index: 1;
		width: 100%;
	}
	.footerTitle {
		height: 0.72rem;
		padding-left: 0.51rem;
	}
	.spanBorder {
		display: block;
		float: left;
		width: 2.08rem;
		height: 0.02rem;
		margin-top: 0.145rem;
		background: #EEEEEE;
	}
	.spanFoot {
		display: block;
		float: left;
		width: 2.32rem;
		height: 0.32rem;
		font-size: 0.32rem;
		color: #A4A4A4;
		text-align: center;
	}
	.dlBox {
		width: 100%;
		display: flex;
	}
	.dlChild {
		float: left;
		flex: 1;
		text-align: center;
	}
	.weImg {
		display: block;
		width: 0.92rem;
		height: 0.88rem;
		margin: 0 auto;
	}
	.dd {
		
		margin-top: 0.12rem;
		font-size: 0.32rem;
		color: #A4A4A4;
	}
</style>