<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="policyHolder">
			<div class="inputGrop1 clearFloat" @click="goInsuranceTips">
				<img class="pdf" src="/static/img/cc/PDF.png" alt="" />
				<label class="inputLabel left">人生保险投保提示书</label>
				<img class="nextImg" src="/static/img/detail.png" alt="" />
			</div>
			<div class="inputGrop1 clearFloat">
				<img class="pdf" src="/static/img/cc/PDF.png" alt="" />
				<label class="inputLabel left">投保须知</label>
				<img class="nextImg" src="/static/img/detail.png" alt="" />
			</div>
			<div class="inputGrop1 clearFloat">
				<img class="pdf" src="/static/img/cc/PDF.png" alt="" />
				<label class="inputLabel left">保险费自动转账授权书</label>
				<img class="nextImg" src="/static/img/detail.png" alt="" />
			</div>
			<div class="inputGrop clearFloat">
				<img class="pdf" src="/static/img/cc/PDF.png" alt="" />
				<label class="inputLabel left">投保人、被保险人或法定监护人授权和声明</label>
				<img class="nextImg" src="/static/img/detail.png" alt="" />
			</div>
		</div>
		<div class="recepit_all">
			<div class="recepit_div">
				<p class="recepit_policy">
					投保人（签名）
				</p>
				<div class="recepit_div_all">
					<div class="recepit_confirm">
						<p>点击签名</p>
					</div>
				</div>
			</div>
		</div>

		<div class="day">签署日期：2018年8月21日（当天）</div>

		<div class="recepit_all1">
			<div class="recepit_div">
				<p class="recepit_policy">
					被保险人/法定监护人（签名）
				</p>
				<div class="recepit_div_all">
					<div class="recepit_confirm">
						<p>点击签名</p>
					</div>
				</div>
				<p class="recepit_policy1">
					分享签名
					<img class="nextImg1" src="/static/img/detail.png" alt="" />
				</p>
			</div>
		</div>

		<div class="day">签署日期：2018年8月21日（当天）</div>
		<div class="recepit_all">
			<div class="recepit_div">
				<p class="recepit_policy">
					见证代理人（签名）
				</p>
				<div class="recepit_div_all">
					<div class="recepit_confirm">
						<p>点击签名</p>
					</div>
				</div>
			</div>
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

		}
	},
	watch: {

	},
	created() {

	},
	methods: {
		handleClickLast() {
			console.log(123)
		},
		handleClickNext() {
			var data = {
				"token": this.$store.state.token,
				"userId": this.$store.state.userId,
				"head": {
					"channelCode": "qtb_h5",
					"deptCode": this.$route.query.cmpCode,
					"oprCode": this.$store.state.userId,
					"oprStep": "",
					"prodCode": this.$route.query.prodCode
				},
				"pkgNo": this.$route.query.orderNo //订单号
			}
			console.log(JSON.stringify(data))
			Indicator.open();
			this.$http.post(this.$store.state.link6 + "/uc/v1/underwrite", data)
				.then(res => {
					Indicator.close();
					console.log(res.data);
					// console.log(JSON.stringify(res.data))

				}, res => {
					Indicator.close();
					console.log(res.data);
				})
		},
		goInsuranceTips() {
			this.$router.push('/insuranceTips?prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode)
		}
	}

}
</script>

<style scoped="scoped">
.one {
	width: 100%;
	height: 100%;
	background: #F3F3F3;
}

.recepit_all {
	width: 100%;
	height: 100%;
	background: #F3F3F3;
	/*position: fixed;*/
	padding: 0.32rem 0.52rem 0 0.52rem;
}

.recepit_all1 {
	width: 100%;
	height: 100%;
	background: #F3F3F3;
	/*position: fixed;*/
	padding: 0rem 0.52rem 0 0.52rem;
}

.recepit_div {
	/*width: 100%;*/
	/*height: 3.56rem;*/
	width: 6.44rem;
	background: #FFFFFF;
	border-radius: 0.16rem;
	padding: ;
}

.recepit_policy {
	font-size: 0.28rem;
	color: #555555;
	text-align: center;
	height: 0.7rem;
	line-height: 0.7rem;
	border-bottom: 0.01rem solid #EEEEEE;
}

.recepit_policy1 {
	font-size: 0.28rem;
	color: #EB7760;
	/*text-align: center;*/
	height: 0.7rem;
	line-height: 0.7rem;
	border-top: 0.01rem solid #EEEEEE;
	padding-left: 0.32rem;
}

.recepit_div_all {
	padding: 0.2rem 0.52rem 0.64rem 0.1rem;
}

.recepit_confirm {
	height: 1.48rem;
	line-height: 0.5rem;
	margin-left: 0.32rem;
	/*margin-right: 0.24rem;*/
	width: 5.6rem;
	font-size: 0.28rem;
	color: #777777;
}

.day {
	font-size: 0.28rem;
	color: #777777;
	line-height: 0.4rem;
	margin-top: 0.32rem;
	margin-left: 0.54rem;
	margin-bottom: 0.34rem;
}

.yzm {
	color: #C9141E;
}

.inputGrop1 {
	position: relative;
	height: 0.88rem;
	font-size: 0.28rem;
	border-bottom: solid 0.01rem #C8C7CC;
	margin-top: 0.22rem;
}

.inputGrop {
	position: relative;
	font-size: 0.28rem;
	/*border-bottom: solid 0.01rem #C8C7CC;*/
	margin-top: 0.22rem;
}

.inputLabel {
	/*display: block;*/
	font-size: 0.28rem;
	color: #555555;
	letter-spacing: 0;
	line-height: 0.88rem;
	vertical-align: middle;
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
	padding-left: 0.6rem;
	border: none;
	border-radius: 0;
}

.boderbo1 {
	padding-left: 0.74rem;
	border: none;
	border-radius: 0;
}

.twoCon {
	width: 6.7rem;
	height: auto;
	margin: 0.2rem auto;
}

.pdf {
	display: inline-block;
	width: 0.6rem;
	height: 0.6rem;
	line-height: 0.88rem;
}

.twoCon p {
	font-size: 0.28rem;
	color: #444444;
	letter-spacing: 0;
	line-height: 0.44rem;
}

.nextImg {
	width: 0.56rem;
	height: 0.56rem;
	float: right;
	margin-right: 0.07rem;
	margin-top: 0.2rem;
}

.nextImg1 {
	width: 0.56rem;
	height: 0.56rem;
	float: right;
	margin-right: 0.07rem;
	margin-top: 0.07rem;
}

.btnBox {
	width: 6.64rem;
	height: 0.88rem;
	left: 0.44rem;
	margin: 0.64rem auto;
	padding-bottom: 0.64rem;
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