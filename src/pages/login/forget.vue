<template>
	<div>
		<Logo></Logo>
		<div class="input_w">
			<div class="input_text">
				<input type="number" maxlength="11" class="input_num" v-on:input ="inputFunc" v-model="phoneNum" placeholder="手机号" />
			</div>
			<div class="code">
				<input type="number" class="input_code" v-model="code" placeholder="验证码" />
				<div class="getCode" @click="getCode" :class="{getCodeActive:active}" v-show="show">
					{{resettxt}}
				</div>
				<div class="getCode" v-show="!show">
					{{count}}s后重发
				</div>
			</div>
			<div @click="handleClickNext" class="btn">
				下一步
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import Logo from "./logo.vue"
	export default {
    	name: "Login",
    	data () {
      		return {
      			active:true,
      			resettxt:"获取验证码",
      			phoneNum:"",
      			password:"",
      			opentext:true,
      			code:"",
      			show: true,
			   	count: '',
			   	timer: null
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
    		inputFunc(){
				if(this.phoneNum.length>=11){
					this.active=false
				}else{
					this.active=true
				}    			
    		},
    		handleGetCode(){
    			var data={
						"groupCode":"QTB",
						"mobile":this.phoneNum,
						"sceneCode":"backPwdSms",
						"exSystem":"QTBApp",
						"exSeq": new Date().getTime(),
						"sendWhen":"I",
						"param":{
					  	}
					}
    			console.log(data)
    			this.$http.post(this.$store.state.link+'/sms/sendsmscode',data
    			).then(response => {
					console.log(response.data)
		        },response => {
		        	console.log("ajax error");
		      	});
    		},
    		handleClickNext(){
    			this.$router.push('/password?phoneNum='+this.phoneNum+"&code="+this.code)
    		},
    		getCode(){
    			if(!this.active){
	    			this.handleGetCode()
			    	const TIME_COUNT = 60;
			        if (!this.timer) {
			        	Toast('验证码已发送至'+this.phoneNum+'请注意查收');
				        this.count = TIME_COUNT;
				        this.show = false;
				        this.timer = setInterval(() => {
				        if (this.count > 0 && this.count <= TIME_COUNT) {
				            this.count--;
				        } else {
				        	this.resettxt="重新获取";
				            this.show = true;
				            clearInterval(this.timer);
				            this.timer = null;
				            }
				        }, 1000)
			        }
			    }
    		},
    	},
    	components:{
    		Logo : Logo
    	}
   }
</script>

<style scoped="scoped">
	.input_w{
		text-align: center;
		color:#222;
	}
	.code{
		width: 6.04rem;
		height: 1rem;
		margin: 0 auto;
		margin-bottom: .28rem;
	}
	.getCode{
		width: 2.06rem;
		height: 1rem;
		border: .001rem solid #F25858;
		border-radius: 1rem;
		float: left;
		text-align: center;
		line-height: 1rem;
		color:#F25858 ;
		margin-left: .16rem;
	}
	.getCodeActive{
		width: 2.06rem;
		height: 1rem;
		border: .001rem solid #bbb;
		border-radius: 1rem;
		float: right;
		text-align: center;
		line-height: 1rem;
		color:#bbb;
		background: #eee;
		margin-left: .16rem;
	}
	.input_code{
		width: 3.44rem;
		height: 1rem;
		float: left;
		border-radius:1rem;
		border: .001rem solid #bbb;
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
		margin-top: .48rem;
	}
</style>