<template>
	<div>
		<p class="reset">
			<span class="left">登录账号</span>
			<span class="right">{{phoneNum}}</span>
		</p>
		<p class="reset">
			<span class="left">旧密码</span>
			<input class="right" v-model="oldpd" type="password" placeholder="输入旧密码"/>
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
      			oldpd:"",
      			newpd:"",
      			resepd:""
      		}
    	},
    	methods:{
    		handleClickNext(){
    			var reg=/^[a-zA-Z0-9]{6,20}$/
    			if(this.oldpd==""){
    				Toast("旧密码不能为空");
    			}else if(this.newpd==""){
    				Toast("新密码不能为空");
    			}else if(this.resepd==""){
    				Toast("请再次输入密码");
    			}else if(reg.test(this.newpd)==false){
    				Toast("密码格式不正确，请重新输入");
    			}else if(this.newpd!=this.resepd){
    				Toast("两次密码不一致，请重新输入");
    			}else{
    				var data={
						"loginNme":this.phoneNum,
						"loginOldPwd":this.oldpd,
						"loginNewPwd":this.newpd,
						"type":"B"
					}
	    			console.log(data)
	    			this.$http.post(this.$store.state.link+'/sso/updatepd',data
	    			).then(response => {
						console.log(response.data)
						if(response.data.code=="SYS_S_000"){
							MessageBox.confirm('',{
							  	title: '提示',
							  	message: '密码修改成功',
							  	confirmButtonText: '确定',  
							  	showCancelButton: false
							}).then(action => {
								window.localStorage.removeItem("userId");
								if (this.$store.state.brokerInfo && this.$store.state.brokerInfo.brokerId) {
									window.localStorage.removeItem("BrokerId");
								}
								this.$store.dispatch("changeToken", '')
								this.$store.dispatch("changeUserId", '')
								this.$store.dispatch("changeUserInfoData", {})
								this.$store.dispatch("changeBrokerInfoData", {})
								this.getToken();
								this.$router.push('/pasLog?phoneNum='+this.phoneNum)
							})
						}else{
							Toast(response.data.desc);
							console.log(response.data.desc);
						}
			        },response => {
			        	console.log("ajax error");
			      	});
    			}
    			
    		},
			getToken(){
    			var sceneInfo = {
					"sceneCode": "s001"
				}
	  			this.$http.post(this.$store.state.link + '/sso/v2/applytoken', sceneInfo)
				.then(res =>{
					Indicator.close()
				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						window.localStorage.token = res.data.output.token;
						this.$store.dispatch("changeToken", res.data.output.token);
						this.$store.dispatch("changeLoginId", res.data.output.userType);
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