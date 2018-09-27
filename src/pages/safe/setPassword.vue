<template>
	<div>
		<p class="reset">
			<span class="left">登录账号</span>
			<span class="right">{{phoneNum}}</span>
		</p>
		<p class="reset">
			<span class="left">新密码</span>
			<input class="right" v-model="newpd" type="password" placeholder="输入新密码"/>
		</p>
		<p class="reset">
			<span class="left">再次输入密码</span>
			<input class="right" v-model="resepd" type="password" placeholder="再次输入密码"/>
		</p>
		
		
		<p class="describe">密码必须6~20位字符，且同时包含字母和数字。</p>
		<div class="btn" @click="handleClickNext">
			完成
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
    	name: "Login",
    	data () {
      		return {
      			phoneNum:localStorage.phoneNum,
      			newpd:"",
      			resepd:"",
      			regPass: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
      		}
    	},
    	methods:{
    		handleClickNext(){
    			if(this.newpd==""){
    				Toast("新密码不能为空");
    			}else if(this.regPass.test(this.newpd)==false){
    				Toast("密码格式不正确，请重新输入");
    			}else if(this.resepd==""){
    				Toast("请再次输入密码");
    			}else if(this.regPass.test(this.resepd)==false){
    				Toast("密码格式不正确，请重新输入");
    			}else if(this.newpd!=this.resepd){
    				Toast("两次密码不一致，请重新输入");
    			}else{
    				var logInfo = {
					  	"loginPwd": this.newpd,
					  	"userId": this.$store.state.userInfo.userId
					}
	    			Indicator.open()
					this.$http.post(this.$store.state.link + '/sso/v2/bindPassword', logInfo).then(response => {
						console.log(response.data)
						Indicator.close()
						if(response.data.code == "SYS_S_000") {
							MessageBox.confirm('',{
							  	title: '提示',
							  	message: '密码设置成功',
							  	confirmButtonText: '确定',  
							  	showCancelButton: false
							}).then(action => {
								this.tokenRefresh();
								this.$router.push('/safe');
							})
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
    		tokenRefresh(){
    			var tokenInfo = {
					"token": this.$store.state.token
				}
	  			this.$http.post(this.$store.state.link + '/sso/v2/refreshToken', tokenInfo)
				.then(res =>{
					Indicator.close()
				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						window.localStorage.token = res.data.output.token;
						this.$store.dispatch("changeLoginId", res.data.output.userInfo.userType);
						if (res.data.output.userInfo.userId) {
							window.localStorage.userId = res.data.output.userInfo.userId;
							window.localStorage.phoneNum = res.data.output.userInfo.userPhone;
							if (res.data.output.brokerInfo && res.data.output.brokerInfo.brokerId) {
								window.localStorage.BrokerId = res.data.output.brokerInfo.brokerId;
							}
							this.$store.dispatch("changeToken", res.data.output.token);
							this.$store.dispatch("changeUserId", res.data.output.userInfo.userId);
							this.$store.dispatch("changeUserInfoData", {});
							this.$store.dispatch("changeUserInfoData", res.data.output.userInfo);
							this.$store.dispatch("changeBrokerInfoData", {});
							this.$store.dispatch("changeBrokerInfoData", res.data.output.brokerInfo);
						}
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc)
					}
				},res =>{
					Indicator.close()
					console.log(res.data);
				})
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
		font-size:.28rem;
	}
	.right_code{
		width: 1.7rem;
		height: 1.16rem;
		float: right;
		color: #999999;
		border: none;
		font-size:.28rem;
		margin-right: .46rem;
	}
	.code{
		height: 1.2rem;
		float: right;
		color: #EB7760;
		font-size: .3rem;
	}
	.describe{
		width: 6.94rem;
		margin: 0 auto;
		font-size: .26rem;
		color: #888;
		margin-top: .23rem;
		line-height: .36rem;
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
		margin-top: .85rem;
	}
</style>