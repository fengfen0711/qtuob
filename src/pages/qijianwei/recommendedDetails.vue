<template>
	<div class="rd_div_body">
		<div class="rd_div_all">
			<img class="rd_div_img" src="/static/qijianwei/body_bg.png" />
		</div>
		<div class="rd_div_card">
			<div class="rd_div_title">亲爱的：</div>
			<div class="rd_div_content">{{name}}{{day}}就是您的生日啦~~！我们的经纪代理人 {{agentName}} 为您甄选了以下几款产品；在您生日前购买<span class="rd_span_color">{{amountGuarantee}}</span>保障额度的以下产品，将节省约共计<span class="rd_span_color">{{money}}</span>元</div>
		</div>
		<div v-for="(item,index) in itemData">
			<div class="rd_div_proall">
				<img class="rd_div_iconname" :src="item.prdPic" />
				<div class="rd_div_insurancename">{{item.prdName}}</div>
				<div class="rd_div_companyname">{{item.prdComp}}</div>
				<div class="rd_div_result">购买方案：</div>
				<div class="rd_div_termall2">
					<div class="rd_div_money marleft_item">生日前购买</div>
					<div class="rd_div_money">生日后购买</div>
				</div>
				<div class="rd_div_termall1">
					<!--<div class="rd_div_termall2">
						<div class="rd_div_money marleft_item">生日前购买</div>
						<div class="rd_div_money">生日后购买</div>
					</div>-->
					<div class="rd_div_termall" v-for="(item1,index1) in itemData[index].actFeeList">
						<div class="rd_div_term">{{item1.payType}}:</div>
						<div class="rd_div_moneydiscount">￥{{item1.actFee}}</div>
						<div class="rd_div_money">￥{{item1.oriFee}}</div>
					</div>
				</div>
				<!--<div class="rd_div_bottom">
					<div class="rd_div_bir">马上<span class="pr_span_add">涨</span><span class="pr_span_add1">涨</span><span class="pr_span_add2">涨</span></div>
					<div class="rd_div_percentage">{{"￥"+item.actPre}}</div>
				</div>-->
				<div class="pr_div_bir">投保示例：以10万保额,{{itemData[index].actFeeList[itemData[index].actFeeList.length-1].payType}}费为例</div>
				<div class="pr_div_bir1">生日前购买合计交费 {{itemData[index].actFeeList[itemData[index].actFeeList.length-1].yearCode}}*{{itemData[index].actFeeList[itemData[index].actFeeList.length-1].actFee}}={{itemData[index].allMoney1}}</div>
				<div class="pr_div_bir1">生日后购买合计交费 {{itemData[index].actFeeList[itemData[index].actFeeList.length-1].yearCode}}*{{itemData[index].actFeeList[itemData[index].actFeeList.length-1].oriFee}}={{itemData[index].allMoney2}}</div>
				<div class="pr_div_bottom">
					<div class="pr_div_bir3">
						<span class="pr_div_bir2">马上</span><span class="pr_span_add">涨</span><span class="pr_span_add1">涨</span><span class="pr_span_add2">涨</span>
					</div>
					<span class="pr_span_right">{{"￥"+item.actPre}}</span>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import wx from 'weixin-js-sdk'
	export default {
		name: 'Login',
		data() {
			return {
				itemData: [],
				name: "",
				agentName: "",
				amountGuarantee: "",
				money: "",
				seq: '',
				day: ''
			}
		},
		methods: { //方法
			accMul(arg1, arg2) {
				var m = 0,
					s1 = arg1.toString(),
					s2 = arg2.toString();
				try {
					m += s1.split(".")[1].length
				} catch(e) {}
				try {
					m += s2.split(".")[1].length
				} catch(e) {}
				return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
			},
			weChat() {
				//分享
				var data = {
					"shareUrl": window.location.href.split('#')[0]
				}
				console.log(data)
				var share_url = window.location.href.split('/')[2] + "/static/router.html?type=recommendedDetails&code=recommendedDetails&seq=" + this.$route.query.seq + "&custId=" + this.$route.query.custId + "&userId=" + this.$route.query.userId;

				Indicator.open();
				this.$http.post(this.$store.state.wx_share, data).then(res => {
					Indicator.close();
					console.log("分享回来的数据" + JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {
						wx.config({
							debug: false, // 开启调试模式,开发时可以开启  
							appId: res.data.output.appId, // 必填，公众号的唯一标识   由接口返回
							timestamp: res.data.output.timestamp, // 必填，生成签名的时间戳 由接口返回
							nonceStr: res.data.output.nonceStr, // 必填，生成签名的随机串 由接口返回
							signature: res.data.output.signature, // 必填，签名 由接口返回
							jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 此处填你所用到的方法 
						});

						wx.onMenuShareAppMessage({ // 分享给朋友
							title: "优惠产品", // 分享标题
							desc: "你猜你在生日前买能省多少钱？", // 分享描述
							link: share_url, // 分享链接 默认以当前链接
							imgUrl: this.$store.state.imgUrl, // 分享图标
							type: '', // 分享类型,music、video或link，不填默认为link
							dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
							// 用户确认分享后执行的回调函数
							success: function() {
								// 用户确认分享后执行的回调函数
								Toast("分享成功")
							},
							cancel: function() {
								// 用户取消分享后执行的回调函数
								console.log('分享到朋友取消');
							}
						});
						//分享到朋友圈
						wx.onMenuShareTimeline({});
						wx.error(function(res) {
							console.log("验证失败返回的信息:==" + JSON.stringify(res))
						});
					} else {
						if(res.data.desc != undefined) {} else {
							console.log("分享接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					console.log("2===分享失败" + res.data)
				});

			}
		},

		created() {
			var data = {
				"userId": this.$route.query.userId,
				"token": this.$route.query.token
			};

			console.log("data==" + JSON.stringify(data));
			Indicator.open();
			this.$http.post(this.$store.state.link + "/pct/seloneselfinfo", data).then(res => {
				Indicator.close();
				//				console.log("总数据" + JSON.stringify(res.data))
				if(res.data.code == "SYS_S_000") {

					if(res.data.output.userName != undefined) {
						this.agentName = res.data.output.userName;
					} else {
						this.agentName = "";
					}
				} else {
					if(res.data.desc != undefined) {
						//						Toast(res.data.desc);
					} else {
						console.log("登录接口undefined");
					}
				}
			}, res => {
				Indicator.close();
				console.log("2===" + res.data)
			})

			this.seq = this.$route.query.seq;
			var data = {
				"batchSeq": this.seq,
				"custId": this.$route.query.custId
			};
			console.log("data===" + JSON.stringify(data))
			this.$http.post(this.$store.state.link + "/cut/cut/queryProdInfo", data).then(res => {
				console.log("详细信息===" + JSON.stringify(res.data))
				if(res.data.code == "SYS_S_000") {
					this.name = res.data.output.cName;
					this.amountGuarantee = res.data.output.totalInsAmt;
					this.money = res.data.output.totalDissAmt;
					this.itemData = res.data.output.prodList;
					for(var k = 0; k < this.itemData.length; k++) {
						console.log("===2" + this.itemData[k].actFeeList[this.itemData[k].actFeeList.length - 1].actFee)
						this.itemData[k].allMoney1 = this.accMul(parseFloat(this.itemData[k].actFeeList[this.itemData[k].actFeeList.length - 1].actFee), parseInt(this.itemData[k].actFeeList[this.itemData[k].actFeeList.length - 1].yearCode));
						this.itemData[k].allMoney2 = this.accMul(parseFloat(this.itemData[k].actFeeList[this.itemData[k].actFeeList.length - 1].oriFee), parseInt(this.itemData[k].actFeeList[this.itemData[k].actFeeList.length - 1].yearCode))
					}
					if(res.data.output.birthCount == "0") {
						this.day = "今天";
					} else {
						this.day = "再过" + res.data.output.birthCount + "天";
					}

				} else {
					if(res.data.desc != undefined) {

					} else {
						console.log("登录接口undefined");
					}
				}
			}, res => {
				console.log("2===" + res.data)
			});

			this.weChat();
		}
	}
</script>

<style scoped="scoped ">
	.marleft_item {
		margin-left: 1.35rem;
	}
	
	.rd_div_body {
		overflow: hidden;
		background-size: contain;
	}
	
	.rd_div_all {
		width: 100%;
	}
	
	.rd_div_img {
		width: 100%;
		z-index: -1;
		position: fixed;
	}
	
	.div_class {
		height: 5rem;
	}
	
	.rd_div_card {
		width: 5.72rem;
		height: 3.24rem;
		background: url(/static/qijianwei/card_bg.png) no-repeat;
		background-size: contain;
		padding-top: 1.9rem;
		padding-left: 1.4rem;
	}
	
	.rd_div_title {}
	
	.pr_span_add {
		color: #EB6067;
		font-size: 0.34rem;
		line-height: 0.48rem;
	}
	
	.pr_div_bir {
		margin-left: 1rem;
		/*height: 0.34rem;*/
		font-size: 0.24rem;
		color: #555555;
		margin-top: 0.1rem;
		line-height: 0.48rem;
	}
	
	.pr_div_bir1 {
		margin-left: 1rem;
		/*height: 0.34rem;*/
		font-size: 0.24rem;
		color: #555555;
		line-height: 0.48rem;
	}
	
	.pr_span_right {
		display: block;
		float: right;
		color: #EB6067;
		font-size: 0.68rem;
		line-height: 0.84rem;
		margin-right: 0.1rem;
	}
	
	.pr_div_bir3 {
		display: block;
		float: left;
	}
	
	.rd_div_content {
		width: 4.54rem;
		margin-left: 0.26rem;
		margin-top: 0.04rem;
		font-size: 0.24rem;
		color: #222222;
		line-height: 0.34rem;
		text-indent: 2em;
	}
	
	.rd_div_proall {
		width: 6.32rem;
		height: 10.22rem;
		background: url(/static/qijianwei/product_bg.png);
		background-size: cover;
		margin: 0 auto;
		margin-bottom: 0.332rem;
	}
	
	.rd_div_iconname {
		width: 2.4rem;
		height: 1.42rem;
		border-radius: 6px;
		margin-top: 1.328rem;
		margin-left: 1.3rem;
	}
	
	.pr_div_bottom {
		width: 5.9rem;
		height: 0.8rem;
		margin-top: 0.2rem;
		/*position: relative;*/
		/*background: #669900;*/
	}
	
	.pr_div_bir2 {
		margin-left: 1rem;
		font-size: 0.24rem;
		color: #555555;
		line-height: 0.8rem;
	}
	
	.rd_div_insurancename {
		width: 4rem;
		height: 0.34rem;
		font-size: 0.24rem;
		color: #222222;
		line-height: 0.34rem;
		margin-left: 1.3rem;
		margin-top: 0.24rem;
	}
	
	.pr_img_up {
		display: block;
		float: right;
		width: 0.78rem;
		height: 0.48rem;
		margin-top: 0.48rem;
	}
	
	.rd_div_companyname {
		width: 4rem;
		font-size: 0.24rem;
		color: #555555;
		line-height: 0.34rem;
		margin-left: 1.3rem;
		margin-top: 0.24rem;
	}
	
	.rd_div_result {
		margin-top: 0.16rem;
		margin-left: 0.2rem;
		font-size: 0.24rem;
		color: #555555;
		line-height: 0.34rem;
		margin-left: 1.3rem;
		margin-bottom: 0.02rem;
	}
	
	.rd_div_termall {
		margin-top: 0.04rem;
		height: 0.5rem;
		margin-left: 0.6rem;
	}
	
	.rd_div_termall2 {
		margin-top: 0.04rem;
		height: 0.4rem;
		margin-left: 1.8rem;
	}
	
	.rd_div_termall1 {
		width: 6rem;
		height: 2.4rem;
		overflow-y: scroll;
	}
	
	.rd_div_term {
		display: block;
		float: left;
		width: 1.2rem;
		height: 0.4;
		font-size: 0.24rem;
		color: #555555;
		line-height: 0.4rem;
		text-align: right;
	}
	
	.rd_div_moneydiscount {
		display: block;
		float: left;
		width: 1.75rem;
		/*background: #669900;*/
		font-size: 0.28rem;
		color: #EB6067;
		line-height: 0.4rem;
		margin-left: 0.16rem;
		text-align: center;
	}
	
	.rd_div_money {
		display: block;
		float: left;
		height: 0.4rem;
		width: 1.75rem;
		/*background: #669900;*/
		font-size: 0.28rem;
		line-height: 0.4rem;
		margin-left: 0.16rem;
		font-size: 0.24rem;
		color: #222222;
		text-align: center;
		/*text-decoration: line-through;*/
	}
	
	.rd_div_bottom {
		width: 6.2rem;
		height: 0.96rem;
		position: relative;
		/*margin-top: 0.28rem;*/
		background: #669900;
	}
	
	.rd_div_bir {
		display: block;
		float: left;
		height: 0.96rem;
		font-size: 0.24rem;
		color: #555555;
		margin-top: 0.22rem;
		margin-left: 1rem;
	}
	
	.pr_span_add1 {
		color: #EB6067;
		font-size: 0.4rem;
		line-height: 0.8rem;
	}
	
	.pr_span_add2 {
		color: #EB6067;
		font-size: 0.48rem;
		line-height: 0.8rem;
	}
	
	.rd_div_percentage {
		display: block;
		float: right;
		margin-right: 0.25rem;
		font-size: 0.68rem;
		color: #EB6067;
		line-height: 0.96rem;
	}
	
	.rd_span_color {
		color: #EB6067;
	}
</style>