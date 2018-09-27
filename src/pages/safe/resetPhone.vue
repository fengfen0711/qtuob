<template>
	<div>
		<p class="reset">
			<span class="left">原手机号</span>
			<span class="right" v-model="phoneNum">{{phoneNum}}</span>
		</p>
		<p class="reset">
			<span class="left">登录密码</span>
			<input class="right" v-model="password" type="text" placeholder="请输入登录密码"/>
		</p>
		<p class="describe">一个手机号码只能作为一个账号的登录名</p>
		<div class="btn" @click="handleClickNext">
			下一步
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
    	name: "Login",
    	data () {
      		return {
      			phoneNum:localStorage.phoneNum,
      			password:""
      		}
    	},
    	created(){
    		this.phoneNum=localStorage.getItem("phoneNum");
    	},
    	methods:{
    		handleClickNext(){
    			if(this.phoneNum==""){
    				Toast("请输入您的手机号");
    			}else if(this.password==""){
    				Toast("请输入登录密码");
    			}else{
    				Indicator.open()
    				var regInfo = {
					  	"exSystem": "QTBApp",
					  	"loginCome": "A",
					  	"loginName": this.phoneNum,
					  	"loginPwd": this.password,
					  	"loginType": "2",
					  	"smsCode": "",
					  	"weChatInfo": this.wechatInfo
					}
//					console.log(regInfo)
					this.$http.post(this.$store.state.link + '/sso/v2/dologin', regInfo).then(response => {
						console.log(response.data)
						Indicator.close()
						if(response.data.code == "SYS_S_000") {
							this.$router.push('/newPhone')
						} else {
							Toast(response.data.desc);
							console.log(response.data.desc);
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
	.reset{
		width: 6.94rem;
		height: 1.2rem;
		line-height: 1.2rem;
		border-bottom:  0.02rem solid #eeeeee;
		margin: 0 auto;
		font-size: .34rem;
		color: #000;
	}
	.left{
		float: left;
	}
	.right{
		height: 1.16rem;
		float: right;
		color: #999999;
		border: none;
		text-align: right;
		font-size: 0.28rem;
	}
	.describe{
		width: 6.94rem;
		margin: 0 auto;
		font-size: .26rem;
		color: #888;
		margin-top: .23rem;
	}
	.btn{
		width: 6.04rem;
		height: 1rem;
		border: .01rem solid #EB7760;
		box-shadow: inset 0 .01rem .3rem 0 rgba(255,255,255,0.50);
		border-radius: .5rem;
		text-align: center;
		line-height: 1rem;
		font-size: 16px;
		color: #EB7760;
		margin: 0 auto;
		margin-top: 4rem;
	}
</style>