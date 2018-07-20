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
    		handleClickPhone(){
    			this.$router.push('/resetPassword')
    		},
    		handleClickPass(){
    			this.$router.push('/resetPhone')
    		},
    		handleClickNext(){
    			if(this.phoneNum==""){
    				Toast("手机号不能为空，请输入你的手机号");
    			}else if(this.password==""){
    				Toast("密码不能为空，请输入你的登录密码");
    			}else{
    				Indicator.open()
	    			var data={
		    			"loginNme":this.phoneNum,
		    			"loginPwd":this.password,
		    			"loginType":"A"
		    		}
	    			this.$http.post(this.$store.state.link+'/sso/dologin',data
	    			).then(response => {
	    				console.log(response.data)
	    				Indicator.close()
						if(response.data.code=="SYS_S_000"){
							window.localStorage.token=response.data.output.token;
							window.localStorage.userId=response.data.output.userId;
							window.localStorage.phoneNum=this.phoneNum;
							this.$router.push('/newPhone')
						}else{
							Toast(response.data.desc);
						}
			        },response => {
			        	Indicator.close()
			        	console.log("ajax error");
			      	});
			    }
    			
    		}
			  
    	}
   }
</script>

<style scoped="scoped">
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
		border: .001rem solid #EB7760;
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