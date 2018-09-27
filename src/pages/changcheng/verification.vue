<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="policyHolder">
				<div class="inputGrop1 clearFloat">
					<label class="inputLabel left">手机号码
						<input type="tel" class="inputText1 left boderbo"  v-model="moPhone" maxlength="11" />
						<label class="yzm" v-show="showCode" @click="handleGetCode">{{resettxt}}</label>
						<label class="yzm" v-show="!showCode" @click="handleGetCode">{{count}}s后重发</label>
					</label>
				</div>
				<div class="inputGrop clearFloat">
					<label class="inputLabel left">验证码
						<input type="tel" class="inputText1 left boderbo1"  naxlength="16"  placeholder="请输入验证码"/>
					</label>
				</div>
		</div>
		<div class="twoCon">
			<p>温馨提示<br>
				1.点击“获取验证码”，系统将通过短信向您发送验证码。<br>
				2.如您在3分钟内没有收到短信验证码，请点击“获取验证码”重新获取。<br>
				3.输入验证码后，点击“签字”，进入电子签名界面。<br>
				4.如您一直无法收到验证码，可返回投保单信息界面修改手机号码。</p>
		</div>	
		<div class="btnBox clearFloat">
			<div class="boxLast" @click="handleClickLast">上一步</div>
			<div class="boxNext" @click="handleClickNext">下一步</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "accInfo",

		data() {
			return {
				show: true,
				moPhone:'18634932091',
				showCode:true,
				resettxt:'获取验证码',
				count: '',
				status:'1',

			}
		},
		watch: {

		},
		created() {

		},
		methods: {
			handleGetCode() {
				var data = {
					"groupCode": "QTB",
					"mobile": this.moPhone,
					"sceneCode": "tiananReceipt",
					"exSystem": "QTBApp",
					"exSeq": new Date().getTime(),
					"sendWhen": "I",
					"param": {}
				}
				console.log(data)
				this.$http.post(this.$store.state.link + '/sms/sendsmscode', data).then(response => {
					if(response.data.code == "SYS_S_000") {
						console.log(data)
						this.smsvalidata=response.data.output
						const TIME_COUNT = 60;
						if(!this.timer) {
							Toast('验证码已发送至' + this.moPhone, +'请注意查收');
							this.count = TIME_COUNT;
							this.showCode = false;
							this.timer = setInterval(() => {
								if(this.count > 0 && this.count <= TIME_COUNT) {
									this.count--;
								} else {
									this.resettxt = "重新获取";
									this.showCode = true;
									clearInterval(this.timer);
									this.timer = null;
								}
							}, 1000)
						}
					}
				}, response => {
					console.log(response.data.desc);
					console.log("ajax error");
				})
			},
			handleClickLast(){
				console.log(123)
			},
			handleClickNext(){
				this.$router.push('/insuranceTips?prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode + '&status=1')
			}
		}

	}
</script>

<style scoped="scoped">
	.one {
		width: 100%;
		min-height: 100%;
		position: absolute;
		background: #F3F3F3;
	}
	.yzm{
		color: #C9141E;
	}
	.inputGrop1{
		position: relative;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
		margin-top: 0.22rem;
	}
	.inputGrop1{
		position: relative;
		font-size: 0.28rem;
		/*border-bottom: solid 0.01rem #C8C7CC;*/
		margin-top: 0.22rem;
	}
	.inputLabel {
		display: block;
		font-size: 0.28rem;
		color: #555555;
		letter-spacing: 0;
		line-height: 0.44rem;
	}
	.policyHolder {
		padding: 0.2rem 0.4rem;
		background: #FfFFFF;
	}
	.inputText1 {
		width: 3.4rem;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
		padding-left: 0;
	}
	.boderbo {
		/*width: 5.5rem;*/
		padding-left:0.6rem ;
		border: none;
		border-radius: 0;
	}
	.boderbo1 {
		/*width: 5.5rem;*/
		padding-left:0.9rem ;
		border: none;
		border-radius: 0;
	}
	.twoCon{
		width:6.7rem;
		height:auto;
		/*background: #008000;*/
		margin: 0.2rem auto;
	}
	.twoCon p{
			font-size: 0.28rem;
			color: #444444;
			letter-spacing: 0;
			line-height: 0.44rem;
	}
	.btnBox {
		position: absolute;
		bottom: 0.64rem;
		width: 6.64rem;
		height: 0.88rem;
		left: 0.44rem;
	}
	
	.boxLast {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #c9141e;
		letter-spacing: 0;
		border: 0.01rem solid #c9141e;
		border-radius: .44rem;
		float: left;
		margin-right: 0.3rem;
	}
	
	.boxNext {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #fff;
		background: #c9141e;
		letter-spacing: 0;
		/*border:0.01rem solid #c9141e;*/
		border-radius: .44rem;
		float: right;
	}
	
</style>