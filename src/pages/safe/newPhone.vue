<template>
	<div>
		<p class="reset">
			<span class="left">原手机号</span>
			<span class="right">{{phoneNum}}</span>
		</p>
		<p class="reset">
			<span class="left">+86</span>
			<input class="right" v-model="newPhoneNum" type="number" placeholder="请输入新手机号码"/>
		</p>
		<p class="reset">
			<span class="left">验证码</span>
			<span class="code" v-show="show"  @click="getCode">{{resettxt}}</span>
			<span class="code" v-show="!show"  @click="getCode">{{count}}s后重发</span>
			<!--<div class="getCode" @click="getCode" :class="{getCodeActive:active}" v-show="show">
					{{resettxt}}
				</div>
				<div class="getCode" v-show="!show">
					{{count}}s后重发
				</div>-->
			<input class="right_code" type="number" v-model="code" placeholder="请输入验证码"/>
		</p>
		<p class="describe">更换手机后，下次登录可实用新手机号登录，当前手机</br>号为：{{phoneNum}}</p>
		<div class="btn" @click="handleClickNext">
			下一步
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
    	name: "Login",
    	data () {
      		return {
      			resettxt:"获取验证码",
      			phoneNum:localStorage.phoneNum,
      			newPhoneNum:"",
      			code:"",
      			show: true,
			   	count: '',
			   	timer: null
      		}
    	},
    	methods:{
    		handleClickPhone(){
    			this.$router.push('/resetPassword')
    		},
    		handleClickPass(){
    			this.$router.push('/resetPhone')
    		},
    		handleClickNext(){
    			if(this.phoneNum==this.newPhoneNum){
    				Toast("新手机号与原手机号一致，请重新输入");
    			}else if(this.newPhoneNum==""){
    				Toast("手机号不能为空");
    			}else if(this.code==""){
    				Toast("验证码不能为空");
    			}else{
    				var data={
						"userId":localStorage.userId,
						"userPhone":this.newPhoneNum,
						"smsCode":this.code,
						"token":localStorage.token,
						"exSystem":"QTBApp"
					}
	    			console.log(data)
	    			this.$http.post(this.$store.state.link+'/pct/updphone',data
	    			).then(response => {
						console.log(response.data)
						if(response.data.code=="SYS_S_000"){
							this.$router.push('/login?phoneNum='+this.newPhoneNum)
						}else{
							Toast(response.data.desc);
						}
			        },response => {
			        	console.log("ajax error");
			      	});
    			}
    			
    		},
    		handleGetCode(){
				var data={
						"groupCode":"QTB",
						"mobile":this.newPhoneNum,
						"sceneCode":"updatePhoneSms",
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
		        	Toast('验证码已发送至'+this.newPhoneNum+'请注意查收');
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
			  
    	}
   }
</script>

<style scoped="scoped">
	.reset{
		width: 6.94rem;
		height: 1.2rem;
		line-height: 1.2rem;
		border-bottom: .001rem solid #BFBFBF;	
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
		border: .001rem solid #EB7760;
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