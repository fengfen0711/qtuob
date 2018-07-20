<template>
	<div>
		<Logo></Logo>
		<div class="input_w">
			<div class="input_text">
				<input type="number" maxlength="11" class="input_num" v-model="phoneNum" placeholder="手机号" onkeyup="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" />
			</div>
			
			<div class="input_text" v-if="!opentext">
				<input type="text" class="input_num" v-model="password" placeholder="密码" />
				<div class="close" @click="handleClickClosetxt">
					<img class="close_img" src="/static/img/open_login.png"/>	
				</div>
			</div>
			<div class="input_text" v-if="opentext">
				<input type="password" class="input_num" v-model="password" placeholder="密码" />
				<div class="close" @click="handleClickClosetxt">
					<img class="close_img" src="/static/img/close_login.png"/>	
				</div>
			</div>
			<div @click="handleClickLogin" class="btn">
				登录
			</div>
			<p class="bottom">
				<span class="no" @click="handleClickNo">没有帐号？立即注册</span>
				<span class="forget" @click="handleClickForget">忘记密码？</span>
			</p>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import Logo from "./logo.vue"
	import { Toast } from 'mint-ui';
	export default {
    	name: "Login",
    	data () {
      		return {
      			phoneNum:"",
      			password:"",
      			opentext:true
      		}
    	},
    	created(){
    		console.log(this.$route.query.phoneNum)
    		if(this.$route.query.phoneNum!=undefined){
    			this.phoneNum=this.$route.query.phoneNum
    		}
    	},
    	methods:{
    		handleClickNo(){
    			this.$router.push("/register")
    		},
    		handleClickForget(){
    			this.$router.push("/forget")
    		},
    		handleClickClosetxt(){
    			if(this.opentext){
    				this.opentext=false
    			}else{
    				this.opentext=true
    			}
    		},
    		handleClickLogin(){
    			if(this.phoneNum==""){
    				Toast("手机号不能为空，请输入您的手机号");
    			}else if(this.password==""){
    				Toast("密码不能为空，请输入您的登录密码");
    			}else{
    				Indicator.open()
	    			var data={
		    			"loginNme":this.phoneNum,
		    			"loginPwd":this.password,
		    			"loginType":"A",
		    			"unionId": this.$route.query.unionId
		    		}
	    			this.$http.post(this.$store.state.link+'/sso/dologin',data
	    		).then(response => {
	    				console.log(response.data)
	    				Indicator.close()
						if(response.data.code=="SYS_S_000"){
							window.localStorage.token=response.data.output.token;
							window.localStorage.userId=response.data.output.userId;
							window.localStorage.phoneNum=this.phoneNum;
							this.$store.dispatch("changeToken",response.data.output.token)
							this.$store.dispatch("changeUserId",response.data.output.userId)
							this.$router.push('/')
						}else{
							Toast(response.data.desc);
						}
			        },response => {
			        	Indicator.close()
			        	console.log("ajax error");
			      	});
			   }
    		}
    	},
    	components:{
    		Logo : Logo
    	}
   }
</script>

<style scoped="scoped">
	.input_w{
		text-align: center;
	}
	.input_text{
		width: 6.04rem;
		height: 1rem;
		border-radius:1rem;
		border: .001rem solid #bbb;
		text-align: center;
		margin: 0 auto;
		margin-bottom: .28rem;
		position: relative;
	}
	.input_num{
		width: 100%;
		height: 100%;
		border: none;
		border-radius:1rem ;
		text-align: center;
	}
	.close{
		width: .48rem;
		height: .48rem;
		position: absolute;
		right: .36rem;
		bottom: .26rem;
	}
	.close_img{
		width: .48rem;
		height: .48rem;
	}
	.btn{
		margin: 0 auto;
		width: 6.04rem;
		height: 1rem;
		line-height: 1rem;
		border-radius:1rem;
		background:url(/static/img/btn_login.png) no-repeat;
		background-image: linear-gradient(90deg, #FF8B62 0%, #FF7CA4 100%);
		box-shadow: inset 0 .001rem .03rem 0 rgba(255,255,255,0.50);
		font-size: .32rem;
		color: #fff;
		margin-top: 1.08rem;
	}
	.bottom{
		width: 6.04rem;
		height: 1rem;
		margin: 0 auto;
		margin-top: .4rem;
		font-size: .3rem;
	}
	.no{
		float: left;
	}
	.forget{
		float: right;
		text-decoration: underline;
	}
</style>