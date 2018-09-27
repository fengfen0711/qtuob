<template>
	<div>
		<div class="feed_back">
			<p class="feedback_text">方法一:意见反馈</p>
			<div class="feed_textarea">
				<textarea class="feed_text" rows="4" maxlength="100" v-model="items.text" ref="count" placeholder="请输入您要反馈的问题，限100字数"></textarea>
				<p class="feedback_p">{{number}}/100</p>
			</div>
			<input type="text" class="feed_phone" v-model="phone" placeholder="请输入手机号或邮箱" />
		</div>
		<div class="feedback_div" v-on:click="commite">
			提交
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		name: "Login",
		data() {
			return {
				number: '0',
				items: {
					text: '',
				},
				phone: ''
			}
		},
		created(){
    		this.common.noShare();
		},
		watch: {
			items: {
				handler: function() {
					var _this = this;
					_this.number = _this.$refs.count.value.length;
				},
				deep: true
			}
		},
		methods: {
			isPoneAvailable(phoneNum) {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!myreg.test(phoneNum)) {
					return false;
				} else {
					return true;
				}
			},
			check_email_address(phoneNum) { 
				var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;  
				if(regex.test(phoneNum)) {       
					var user_name = phoneNum.replace(regex, "$1");   
					var domain_name = phoneNum.replace(regex, "$2");   
					return true;  
				}  
				else   {   
					return false;  
				} 
			},
			commite() {
				if(this.items.text == "") {
					Toast("请输入反馈信息");
					return;
				}
				if(this.phone != "") {
					if(this.check_email_address(this.phone) || this.isPoneAvailable(this.phone)) {
						this.subAjax()
					}else{
						Toast("格式不正确");
					}
				}else{
					Indicator.open()
					this.subAjax()
				}
			},
			subAjax(){
				var data = {
					"backCont": this.items.text,
					"contactWay": this.phone,
					"userId":localStorage.getItem("userId"),
					"token":localStorage.getItem("token"),
					
				}
				this.$http.post(this.$store.state.link + '/pct/propose', data).then(response => {
					if(response.data.code=="SYS_S_000"){
						Indicator.close();
						Toast("提交成功");
						this.$router.push('/mine')
					}
				}, response => {
					Indicator.close()
					console.log("ajax error");
					Toast("提交失败，请稍后再试");
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.feed_back {
		padding: 0.33rem 0.3rem 0 0.3rem;
	}
	
	.feedback_text {
		font-size: 0.32rem;
		color: #000000;
	}
	
	.feed_textarea {
		width: 100%;
		height: 2.3rem;
		background: #F8F8F8;
		margin-top: 0.21rem;
		border-radius: 0.1rem;
		margin-bottom: 0.17rem;
		position: relative;
	}
	
	.feed_text {
		background: #F8F8F8;
		width: 6.5rem;
		padding: 0 0.2rem;
		line-height: 0.5rem;
		border: none;
		border-radius: 0.1rem;
		font-size: 0.28rem;
		color: #888888;
	}
	
	.feedback_p {
		position: absolute;
		top: 2rem;
		right: 0.2rem;
		font-size: 0.24rem;
	}
	
	.feed_phone {
		background: #F8F8F8;
		padding: 0 0.2rem;
		width: 6.5rem;
		height: 0.92rem;
		border-radius: 0.1rem;
		border: none;
		margin-top: 0.17rem;
	}
	
	.feedback_div {
		width: 6.04rem;
		height: 1rem;
		border: solid 0.01rem #E73748;
		border-radius: 1rem;
		margin: 2.77rem auto;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
		line-height: 1rem;
	}
</style>