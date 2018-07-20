<template>
	<div>
		<Logo></Logo>
		<div class="input_w">
			<div class="code">
				<input type="number" class="input_code" v-model="code" placeholder="验证码" />
				<div class="getCode" @click="getCode" v-show="show">
					重新获取
				</div>
				<div class="getCode" v-show="!show">
					{{count}}s后重发
				</div>
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
			<div @click="handleClickRegister" class="btn">
				注册
			</div>
			<p class="bottom">
				<span class="no" @click="handleClickYe">已有帐号？立即登录</span>
			</p>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import Logo from "./logo.vue"
	export default {
    	name: "Code",
    	data () {
      		return {
      			phoneNum:this.$route.query.phone,
      			code:"",
      			password:"",
      			opentext:true,
      			show: true,
			   	count: '',
			   	timer: null
      		}
    	},
    	created(){
    	 	if (typeof WeixinJSBridge == "undefined") { 
    if (document.addEventListener) { 
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false); 
    } else if (document.attachEvent) { 
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady); 
    } 
	} else { 
	    this.onBridgeReady(); 
	}
    	},
    	mounted(){
    		this.getCode()
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
    		handleGetCode(){
    			var data={
						"groupCode":"QTB",
						"mobile":this.phoneNum,
						"sceneCode":"registerSms",
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
    		getCode(){
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
			            this.show = true;
			            clearInterval(this.timer);
			            this.timer = null;
			            }
			        }, 1000)
		        }
    		},
    		handleClickRegister(){
    			var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    			if(reg.test(this.password)==false){
    				Toast('密码必须6~12位字符，且同时包含字母和数字。')
    			}else{
    				var data={
    					"exSystem":"QTBApp",
						"loginNme":this.phoneNum,
						"loginPwd":this.password,
						"loginType":"A",
						"smsCode":this.code
					}
	    			console.log(data)
	    			this.$http.post(this.$store.state.link+'/sso/doregister',data
	    			).then(response => {
						if(response.data.code=="SYS_S_000"){
							this.$router.push('/login?phoneNum='+this.phoneNum)
						}else{
							MessageBox('',response.data.desc);
						}
			        },response => {
			        	console.log("ajax error");
			      	});	
    			}
    		},
	    	onBridgeReady() { 
				   WeixinJSBridge.call('hideOptionMenu'); 
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
		margin-top:.48rem;
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
	.describe{
		width: 6.94rem;
		margin: 0 auto;
		font-size: .26rem;
		color: #888;
		margin-top: .23rem;
		line-height: .36rem;
	}
</style>