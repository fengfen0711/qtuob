<template>
	<div class="regBox">
		<p class="regTitle clearFloat">
			<span class="titletText">设置密码<sub class="subText">6-20位数字和字母</sub></span>
		</p>
		<div class="inputBox">
			<p class="inputGrop clearFloat" v-show="eyeShow">
				<input type="password" maxlength="20" class="inputText" @keyup.13=handleClickLogin() v-model="passWord" placeholder="请输入新密码" />
				<img src="/static/imgNew/eye_open3.png" class="eyeBtn" @click="eyeClick" />
			</p>
			<p class="inputGrop clearFloat" v-show="!eyeShow">
				<input type="text" maxlength="20" class="inputText" v-model="passWord" @keyup.13=handleClickLogin() placeholder="请输入新密码" />
				<img src="/static/imgNew/eye_close3.png" class="eyeBtn" @click="eyeClick" />
			</p>
			<div @click="handleClickLogin" class="btnBox">
				<span class="nextBtn">完成</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
    	name: "regNew",
    	data () {
      		return {
      			eyeShow:true,
      			passWord:'',
				regPass: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
      		}
    	},
    	methods:{
    		eyeClick() {
				this.eyeShow = !this.eyeShow
			},
    		handleClickLogin(){
    			if(this.regPass.test(this.passWord) == false) {
					Toast('密码必须由6~20位字母和数字组成')
					return;
				}
				if(this.regPass.test(this.passWord) == false) {
					Toast('密码必须由6~20位字母和数字组成')
					return;
				} else {
	    			var logInfo = {
					  	"loginPwd": this.passWord,
					  	"userId": this.$store.state.userInfo.userId
					}
	    			Indicator.open()
					this.$http.post(this.$store.state.link + '/sso/v2/bindPassword', logInfo).then(response => {
						console.log(response.data)
						Indicator.close()
						if(response.data.code == "SYS_S_000") {
							this.$router.push('/')
						} else {
							Toast(response.data.desc);
							console.log(response.data.desc);
						}
					}, response => {
						Indicator.close()
						console.log("ajax error");
					});	
    			}
    		},
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
	.subText {
		margin-left: 0.1rem;
		font-size: 0.24rem;
		color: #C2C2C2;
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
		width: 6.54rem;
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
		margin-top: 1.74rem;
		text-align: center;
	}
	.rewBox {
		padding: 0.2rem 0.48rem;
		padding-bottom: 0.44rem;
		font-size: 0.32rem;
		color: #222222;
		text-align: right;
	}
	.nextBtn {
		display: inline-block;
		width: 6.66rem;
		height: 0.76rem;
		line-height: 0.76rem;
		font-size: 0.28rem;
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
		right: 0.48rem;
		z-index: 1;
		width: 0.48rem;
		height: 0.48rem;
	}
</style>