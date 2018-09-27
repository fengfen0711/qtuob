<template>
	<div class="recepit_all">
		<div>
			<img src="/static/img/zhonghua/failpay.png" class="relay_img" v-show="fail" />
			<img src="/static/img/zhonghua/successImg.png" class="relay_img" v-show="!fail" />
			<!--<p class="feedpay" v-show="fail">支付失败</p>
			<p class="feedpay" v-show="!fail">支付成功</p>-->
			<p class="feedrom">{{message}}</p>
			<div class="feedpay_div">
				<!--<p class="feed_div_p">
					<label class="feed_order">投保单号</label>
					<span class="feed_number">12345678890876338</span>
				</p>-->
				<p class="feed_div_p1">
					<label class="feed_order">投保时间</label>
					<span class="feed_number">{{issutime}}</span>
				</p>
				<p class="feed_div_p1">
					<label class="feed_order">投保人姓名</label>
					<span class="feed_number">{{applicant}}</span>
				</p>
				<p class="feed_div_p1">
					<label class="feed_order">被保险人姓名</label>
					<span class="feed_number">{{insuredname}}</span>
				</p>
				<p class="feed_div_p1">
					<label class="feed_order">主险名称</label>
					<span class="feed_number">{{mainrisk}}</span>
				</p>
				<!--<p class="feed_div_p1">
					<label class="feed_order">附加险名称</label>
					<span class="feed_number">名称</span>
				</p>-->
				<p class="feed_div_p1">
					<label class="feed_order">合计保费</label>
					<span class="feed_number">{{premall}}</span>
				</p>
			</div>
			<div class="feed_div">
				<span class="feedorder" @click="queryOrder">查看订单详情</span>
				<span class="feedindex" @click="backHome">返回首页</span>
			</div>
		</div>
	</div>

</template>

<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		name: "Feedbackpayment",
		data() {
			return {
				fail: false,
				message: '',
				issutime: '', //投保时间
				applicant: '', //投保人姓名
				insuredname: '',
				mainrisk: '',
				premall: ''
			}
		},
		created() {
			if(this.$route.query.payType == 'Y') {
				this.fail = false;
			} else if(this.$route.query.payType == 'N') {
				this.fail = true;
			}
			this.message = this.$route.query.message
			this.init();
		},
		methods: {
			queryOrder() {
				this.$router.push('/mylifeOrder')
			},
			backHome() {
				this.$router.push('/')
			},
			init() {
				var data = {
					"head": {
						"oprStep": "inforUpload",
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode
					},
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"opt": "ALL",
					"pkgNo": this.$route.query.orderNo
				}
				Indicator.open();
				this.$http.post(this.$store.state.link5 + "/trd/order/v1/queryorder", data).then(res => {
					Indicator.close();
					console.log(res.data);
					if(res.data.code == "SYS_S_000") {
						this.issutime = res.data.output.mainResp.issueTime;
						this.applicant = res.data.output.applntResp.applName;
						this.insuredname = res.data.output.insrntResp.insrntName;
						this.mainrisk = res.data.output.mainResp.prodName;
						this.premall = res.data.output.mainResp.sumPrem;
					}

				}, res => {
					Indicator.close();
					console.log("2===失败1" + res.data)
				});

			},
		},

	}
</script>

<style scoped="scoped">
	.relay_img {
		width: 2.4rem;
		height: 2.4rem;
		display: block;
		margin: 0 auto;
		margin-top: 0.16rem;
	}
	
	.feedpay {
		font-size: 0.34rem;
		color: #222222;
		text-align: center;
		margin-top: 0.2rem;
	}
	
	.feedrom {
		font-size: 0.28rem;
		color: #222222;
		text-align: center;
		margin-top: 0.24rem;
	}
	
	.feed_div {
		position: fixed;
		bottom: 1.16rem;
		left: 0.52rem;
	}
	
	.feedorder {
		font-size: 0.32rem;
		color: #C9141E;
		border: 0.01rem solid #C9141E;
		border-radius: 0.44rem;
		width: 3.12rem;
		height: 0.88rem;
		display: inline-block;
		text-align: center;
		line-height: 0.88rem;
	}
	
	.feedindex {
		font-size: 0.32rem;
		color: #C9141E;
		background: #C9141E;
		color: #FFFFFF;
		border-radius: 0.44rem;
		width: 3.12rem;
		height: 0.88rem;
		display: inline-block;
		text-align: center;
		line-height: 0.88rem;
		margin-left: 0.26rem;
	}
	
	.div_feed {
		background: #F3F3F3;
		padding: 0.32rem 0.4rem;
		margin-top: 0.36rem;
	}
	
	.feedpay_div {
		padding: 0.32rem 0.4rem;
		background: #F3F3F3;
		margin-top: 0.36rem;
	}
	
	.feed_div_p {
		height: 0.44rem;
	}
	
	.feed_div_p1 {
		height: 0.44rem;
		margin-top: 0.32rem;
		clear: both;
	}
	
	.feed_order {
		height: 0.44rem;
		font-size: 0.28rem;
		color: #555555;
		width: 1.4rem;
		line-height: 0.44rem;
	}
	
	.feed_number {
		margin-left: 2.52rem;
		font-size: 0.28rem;
		color: #555555;
		float: right;
		display: inline-block;
		line-height: 0.44rem;
	}
</style>