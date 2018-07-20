<template>
	<div class="confirmation_all">
		<div class="bg"></div>
		<div class="top">
			<img class="logo" src="/static/img/sign/mdlogo.png" alt="" />
		</div>
		<div class="confirm_message_div">
			<div class="code_w">
				<div class="code">
					<p class="yao">真实姓名：</p>
					<input class="name" type="text" v-model="realname"  readonly="readonly"/>
				</div>
			</div>
			<div class="code_w">
				<div class="code">
					<p class="yao">证件号码：</p>
					<input class="name" type="text" v-model="cardnum" readonly="readonly"/>
				</div>
			</div>
			<div class="code_w">
				<div class="code">
					<p class="yao">手机号码：</p>
					<input class="name" type="text" v-model="phone" readonly="readonly"/>
				</div>
			</div>
			<div class="code_w">
				<div class="code">
					<p class="yao">现居地址：</p>
					<div class="name maxInput" readonly="readonly">
						<span class="confirmame" v-model="provice1" >{{provice1}}</span>
						<span class="confirmame1" v-model="procity1">{{procity1}}</span>
						<span class="confirmame2" v-model="procounty1">{{procounty1}}</span>
					</div>
					
				</div>
			</div>
		</div>

		<div class="btn">
			<div class="left" @click="confirm_message_up" >
				上一步
			</div>
			<div class="right confirm" @click="confirm_message_next" >
				确认提交
			</div>
		</div>
		<div class="bottom">
		</div>
	</div>

</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "handCard",
		data() {
			return {
				realname: "",
				cardnum: "",
				phone: "",
				//				address:"",
				mowaddress: "",
				provice1: "",
				procity1: "",
				procounty1: "",
				phone:"",
				password:""

			}
		},
		created() {
			this.realname = this.$store.state.card.brokerName;
			this.cardnum = this.$store.state.card.brokerCertiCode;
			this.phone = this.$store.state.mobile.brokerMobile;
			this.provice1 = this.$store.state.card.province;
			this.procity1 = this.$store.state.card.urban;
			this.procounty1 = this.$store.state.card.area;
			this.province11();
			this.procity11();
			this.procounty11();
		},

		methods: {
			confirm_message_up() {
				window.history.go(-1);
			},
			confirm_message_next() {
				var broker = Object.assign(this.$store.state.sign, this.$store.state.invitecode, this.$store.state.mobile, this.$store.state.card, this.$store.state.record,this.$store.state.bank,this.$store.state.information)
				var confirmdata = {
					broker,
					"brokerSurety": {

					}
				}
				console.log(confirmdata);
				Indicator.open();
				this.$http.post(this.$store.state.link + '/core/broker/weChatbrokerRegister', confirmdata)
					.then(res => {
						console.log(res.data);
						var dataCode = res.data.code;
						Indicator.close();
						if(dataCode == "SYS_S_000") {
							this.phone=res.data.output.loginName;
							this.password=res.data.output.loginPwd;
							this.$router.push('/informaReconfirm?phone='+this.phone+"&password="+this.password);
						} else if(dataCode=="CORE_E_005") {
							this.$router.push('/hasregistered');
						}else if(dataCode=="CORE_E_204"){
							this.$router.push('/hasregistered');
						}else if(dataCode=="SYS_E_998"){
							Toast(res.data.desc);
						}else if(dataCode=="SYS_E_000"){
							Toast(res.data.desc);
						}else if(dataCode=="CORE_E_207"){
							Toast(res.data.desc);
						}
						else{
							Toast(res.data.desc);
						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					});
			},
			province11() {
				let reproinfo = {
					"code": "0",
					"orgCode": "999999"
				}
				Indicator.open();
				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', reproinfo)
					.then(res => {
						var dataCode = res.data.code;
						Indicator.close();
						console.log(res.data)
						if(dataCode == "SYS_S_000") {
							
							for(let i = 0; i < res.data.output.length; i++) {
								if(this.provice1 == res.data.output[i].cnCode) {
									this.provice1 = res.data.output[i].cnName
									

								}
							}
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					});

			},
			procity11() {
				let recityinfo = {
					"code": this.provice1,
					"orgCode": "999999"
				}
				console.log(recityinfo)
				Indicator.open();
				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', recityinfo)
					.then(res => {
						Indicator.close();
						var dataCode = res.data.code;

						if(dataCode == "SYS_S_000") {
							for(let i = 0; i < res.data.output.length; i++) {
								if(this.procity1 == res.data.output[i].cnCode) {
									this.procity1 = res.data.output[i].cnName

								}
							}
						} else {
							//								Toast(res.data.desc);
						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					})
			},
			procounty11() {
				let recountyinfo = {
					"code": this.procity1,
					"orgCode": "999999"

				}
				Indicator.open();
				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', recountyinfo)
					.then(res => {
						Indicator.close();
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {

							for(let i = 0; i < res.data.output.length; i++) {
								if(this.procounty1 == res.data.output[i].cnCode) {
									this.procounty1 = res.data.output[i].cnName
								}
							}
						} else {
						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					})

			}
		}
	}
</script>

<style scoped="scoped">
	.maxInput {
		max-width: 3.5rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.confirmation_all {
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding-bottom: 0.48rem;
	}
	
	.bg {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: url(/static/img/sign/bg.png) no-repeat;
		background-size: cover;
		z-index: -1;
	}
	
	.top {
		width: 6.86rem;
		height: 1.52rem;
		background: url(/static/img/sign/top.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		margin-top: .38rem;
		position: relative;
	}
	
	.logo {
		position: absolute;
		bottom: .14rem;
		width: .68rem;
		height: .52rem;
		left: 3.1rem;
	}
	
	.information_div {
		margin-top: 0.3rem;
		padding: 0 0.94rem;
	}
	
	.hand_phone {
		background: url(/static/img/sign/handcard.png) no-repeat;
		background-size: contain;
		width: 5.52rem;
		height: 2.98rem;
		margin: 0 auto;
		margin-top: 0.32rem;
	}
	
	.btn {
		width: 6.34rem;
		height: .96rem;
		background: url(/static/img/sign/btn2.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		margin-top: 2.54rem;
		text-align: center;
		line-height: 1.24rem;
		font-size: .48rem;
		overflow: hidden;
	}
	
	.left {
		width: 3.17rem;
		height: .96rem;
		font-size: .32rem;
		line-height: .96rem;
		float: left;
		
	}
	
	.right {
		width: 3.1rem;
		height: .96rem;
		line-height: .96rem;
		font-size: 0.32rem;
		float: left;
	
	}
	
	.bottom {
		width: 6.86rem;
		height: 1.52rem;
		background: url(/static/img/sign/bot.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		margin-top: .32rem;
		position: absolute;
		bottom: .32rem;
		left: .32rem;
	}
	
	.code_w {
		width: 5.6rem;
		margin: 0 auto;
		margin-top: .22rem;
	}
	
	.code {
		width: 5.6rem;
		height: .8rem;
		text-align: center;
		background: url(/static/img/sign/line.png) no-repeat;
		background-size: contain;
		background-position-y: 100%;
		margin-top: .1rem;
	}
	
	.yao {
		float: left;
		width: 1.68rem;
		text-align: right;
		font-size: .28rem;
		color: #000000;
		line-height: .8rem;
	}
	
	.name {
		width: 3.5rem;
		height: .8rem;
		float: left;
		margin-left: 1.46rem;
		font-size: .28rem;
		border: none;
		background: none;
		margin: 0 auto;
	}
	.confirmame{
		height: .8rem;
		font-size: 0.28rem;
		display: inline-block;
		float: left;
		line-height: 0.8rem;
		
	}
	.confirmame1{
		height: .8rem;
		font-size: 0.28rem;
		float: left;
		line-height: 0.8rem;
		display: inline-block;
		
	}
	.confirmame2{
		height: .8rem;
		font-size: 0.28rem;
		display: inline-block;
		line-height: 0.8rem;
		float: left;
		
	}
	.confirm_message_div {
		margin-top: 0.38rem;
	}
	
	.confirm {
		font-size: 0.32rem;
		background: linear-gradient(to left, #B19A2E, #DAC947, #AF9C33, #E5D54C, #B1A62F);
		-webkit-background-clip: text;
		color: transparent;
		
	}
</style>