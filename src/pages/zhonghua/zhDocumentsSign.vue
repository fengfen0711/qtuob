<template>
	<div>
		<p class="title_twoCon">
			<img class="imgLeftPdf" src="../../../static/img/zhonghua/zhPdfIcon.png" />
			<span class="spanTitleName">人身保险投保提示书</span>
			<img class="imgsuccess" src="../../../static/img/zhonghua/success.png" />
			<span class="spanInsureName">投保人签名</span>
			<img class="imgNext" src="../../../static/img/zhonghua/imgNext.png" />
		</p>
		<p class="title_twoCon1">
			<img class="imgLeftPdf" src="../../../static/img/zhonghua/zhPdfIcon.png" />
			<span class="spanTitleName">电子投保单</span>
			<img class="imgsuccess" src="../../../static/img/zhonghua/success.png" />
			<span class="spanInsureName1">投保人暨被保人签名</span>
			<img class="imgNext" src="../../../static/img/zhonghua/imgNext.png" />
		</p>
		<div class="feed_div">
			<span class="feedorder" @click="goAccInformation">上一步</span>
			<span class="feedindex" @click="goInformationCon">下一步</span>
		</div>
		<div class="wrap_aut" v-if="!wrap_aut">
			<div class="box_aut">
				<div class="box_top">险种[主险名称/附加险名称]核保规则校验失败，规则：累计重疾险风险保额体检规则校验失败，是否转入人工核保？</div>
				<p class="box_bottom">
					<span id="box_left" @click="goFee">重新指定投保计划</span>
					<span id="box_right" @click="goFeedsubmit">转人工核保</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui'
export default {
	name: "zhDocumentsSign",
	data() {
		return {
			wrap_aut: true,
		}
	},
	created() {
		//console.log(this.$store.state.zhOrderState)
		var data = {
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode,
					},
					"opt": "ALL",
					"pkgNo": this.$route.query.orderNo,

				}

					this.$http.post(this.$store.state.link5 + '/trd/order/v1/queryorder', data)
					.then(res => {
						console.log(res.data);
						var dataCode = res.data.code;
						console.log("www====" + JSON.stringify(res.data));
						//console.log(res.data.output.cvrgResp[0].payNo);
						if(dataCode == "SYS_S_000") {
							
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
	},
	methods: {
		goAccInformation() {
			window.history.go(-1)
		},
		goInformationCon() {
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
			this.$http.post(this.$store.state.link5 + "/trd/uc/v1/underwrite", data)
				.then(res => {
					Indicator.close();
					console.log(res.data);
					if (res.data.code == "SYS_S_000") {
						console.log(this.$store.state.zhOrderState)
						if (res.data.output.uwStatus == this.$store.state.zhOrderState.AUC) {
							Toast("核保成功");
							this.$router.push('/informationCon?prodCode='+ this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&prodNo=" + this.$route.query.prodNo);
						} else if (res.data.output.uwStatus == this.$store.state.zhOrderState.AUT) {
							this.wrap_aut = false;
						} else {
							this.$router.push('/relayfeedback');
						}
					}
				}, res => {
					Indicator.close();
					console.log(res.data);
				})
			//				this.$router.push('/informationCon')
		},
		goFeedsubmit() {
			this.$router.push('/feedsubmit');
		},
		goFee() {
			this.$router.push('/fee');
		},
	}
}
</script>

<style scoped="scoped">
.feed_div {
	position: absolute;
	width: 6.84rem;
	height: 0.88rem;
	bottom: 1.36rem;
	left: 0.43rem;
}

.feedorder {
	font-size: 0.32rem;
	color: #C9141E;
	border: 0.01rem solid #C9141E;
	border-radius: 0.44rem;
	display: inline-block;
	width: 3.12rem;
	height: 0.88rem;
	text-align: center;
	line-height: 0.88rem;
}

.feedindex {
	font-size: 0.32rem;
	color: #fff;
	border: 0.01rem solid #C9141E;
	border-radius: 0.44rem;
	width: 3.12rem;
	height: 0.88rem;
	display: inline-block;
	margin-left: 0.3rem;
	text-align: center;
	line-height: 0.88rem;
	background: #C9141E;
}

.title_twoCon {
	width: 7.16rem;
	height: 1rem;
	line-height: 1rem;
	border-bottom: 0.02rem solid#C8C7CC;
	margin-left: 0.34rem;
}

.title_twoCon1 {
	width: 7.16rem;
	height: 1rem;
	line-height: 1rem;
	border-bottom: 0.02rem solid#C8C7CC;
	padding-left: 0.34rem;
}

.imgLeftPdf {
	width: 0.6rem;
	height: 0.6rem;
	margin-right: 0.16rem;
}

.imgsuccess {
	width: 0.6rem;
	height: 0.24rem;
}

.imgNext {
	width: 0.56rem;
	height: 0.56rem;
}

.spanTitleName {
	font-size: 0.28rem;
	color: #555555;
	line-height: 1rem;
	margin-right: 0.2rem;
}

.spanInsureName {
	font-size: 0.26rem;
	color: #BFBFBF;
	line-height: 1rem;
	margin-left: 0.62rem;
}

.spanInsureName1 {
	font-size: 0.26rem;
	color: #BFBFBF;
	line-height: 1rem;
	margin-left: 0.7rem;
}

.wrap_aut {
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	z-index: 10;
}

.box_aut {
	width: 5.42rem;
	height: 3.56rem;
	margin: 0 auto;
	margin-top: 50%;
	border-radius: 0.16rem;
	background: #ffffff;
	z-index: 15;
}

.box_top {
	width: 95%;
	height: 1rem;
	padding: 0.2rem 0.2rem;
	line-height: 0.45rem;
	font-size: 0.32rem;
	color: #222222;
}

.box_bottom {
	width: 100%;
	height: 1rem;
	display: flex;
	justify-content: space-between;
}

.box_bottom span {
	display: block;
	width: 50%;
	height: 1rem;
	line-height: 1rem;
	border: 1px solid #ccc;
	text-align: center;
	font-weight: bold;
	margin-top: 1.13rem;
	border-bottom: none;
}

#box_left {
	border-left: none;
}

#box_right {
	border-right: none;
	color: red;
}
</style>