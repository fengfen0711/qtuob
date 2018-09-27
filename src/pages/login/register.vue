<template>
	<div>
		<Logo></Logo>
		<div class="input_w">
			<input type="number" class="input_text" v-model="phoneNum" placeholder="手机号" />
			<div @click="handleClickNext" class="btn">
				下一步
			</div>
			<p class="bottom">
				<span class="no" @click="handleClickYe">已有帐号？立即登录</span>
			</p>
		</div>
	</div>
</template>

<script>
	import Logo from "./logo.vue";
	import { MessageBox } from 'mint-ui';
	export default {
    	name: "Register",
    	data () {
      		return {
      			phoneNum:""
      		}
    	},
    	methods:{
    		handleClickYe(){
    			this.$router.push("/login")
    		},
    		handleClickClosetxt(){
    			if(this.opentext){
    				this.opentext=false
    			}else{
    				this.opentext=true
    			}
    			
    		},
    		handleClickNext(){
    			var regPhone=/^(13|14|15|16|17|18)\d{9}$/;
    			if(this.phoneNum==""){
    				MessageBox('','手机号不能为空，请输入您的手机号');
    			}else if(regPhone.test(this.phoneNum)==false){
    				MessageBox('','手机号格式不正确，请输入正确格式的手机号');
    			}else{
    				var data={
						"phoneNo": this.phoneNum
					}
	    			console.log(data)
	    			this.$http.post(this.$store.state.link+'/sso/validatePhone', data,{headers: {'Content-Type': 'application/json'}}
	    			).then(response => {
	    				console.log(response.data)
						if(response.data.code=="SYS_S_000"){
							this.$router.push('/code?phone='+this.phoneNum)
						}else{
							MessageBox('',response.data.desc);
						}
						//this.$router.push('/code?phone='+this.phoneNum)
			        },response => {
			        	console.log(JSON.stringify(response.data))
//			        	console.log("手机号校验错误");
			        	//this.$router.push('/code?phone='+this.phoneNum)
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
		position: relative;
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
		margin-top: .48rem;
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