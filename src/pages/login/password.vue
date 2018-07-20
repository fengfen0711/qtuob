<template>
	<div>
		<Logo></Logo>
		<div class="input_w">
			<div class="input_text" v-if="!opentext">
				<input type="text" class="input_num" v-model="password" placeholder="新密码" />
				<div class="close" @click="handleClickClosetxt">
					<img class="close_img" src="/static/img/open_login.png"/>	
				</div>
			</div>
			<div class="input_text" v-if="opentext">
				<input type="password" class="input_num" v-model="password" placeholder="新密码" />
				<div class="close" @click="handleClickClosetxt">
					<img class="close_img" src="/static/img/close_login.png"/>	
				</div>
			</div>
			<div class="input_text" v-if="!opentext_re">
				<input type="text" class="input_num" v-model="password_re" placeholder="重复密码" />
				<div class="close" @click="handleClickClosetxt_re">
					<img class="close_img" src="/static/img/open_login.png"/>	
				</div>
			</div>
			<div class="input_text" v-if="opentext_re">
				<input type="password" class="input_num" v-model="password_re" placeholder="重复密码" />
				<div class="close" @click="handleClickClosetxt_re">
					<img class="close_img" src="/static/img/close_login.png"/>	
				</div>
			</div>
			<div @click="handleClickReset" class="btn">
				确定
			</div>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import Logo from "./logo.vue"
	export default {
    	name: "Login",
    	data () {
      		return {
      			password:"",
      			password_re:"",
      			opentext:true,
      			opentext_re:true,
      			phoneNum:this.$route.query.phoneNum,
      			code:this.$route.query.code
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
    		handleClickClosetxt_re(){
    			if(this.opentext_re){
    				this.opentext_re=false
    			}else{
    				this.opentext_re=true
    			}
    		},
    		handleClickReset(){
    			var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    			if(reg.test(this.password)==false){
    				Toast("密码必须6~12位字符，且同时包含字母和数字。");
    			}else if(this.password==this.password_re){
    				Indicator.open()
    				var data={
    					"exSystem":"QTBApp",
						"loginNme":this.phoneNum,
						"loginNewPwd":this.password,
						"smsCode":this.code,
						"type":"A"
					}
	    			console.log(data)
	    			this.$http.post(this.$store.state.link+'/sso/updatepd',data
	    			).then(response => {
	    				Indicator.close()
						if(response.data.code=="SYS_S_000"){
							this.$router.push('/login?phoneNum='+this.phoneNum)
						}else{
							Toast(response.data.desc);
						}
			        },response => {
			        	Indicator.close()
			        	console.log("ajax error");
			      	});
    			}else{
    				Toast("两次密码不一致");
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
		margin-bottom: .48rem;
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
	}
	.describe{
		width: 6.94rem;
		margin: 0 auto;
		font-size: .26rem;
		color: #888;
		line-height: .36rem;
		margin-top: .1rem;
	}
</style>