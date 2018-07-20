<template>
	<div class="rd_div_body">
		<div class="rd_div_all">
			<img class="rd_div_img" src="/static/qijianwei/body_bg.png" />
		</div>
		<div class="rd_div_card">
			<div class="rd_div_title">亲爱的{{name}}:</div>
			<div class="rd_div_content"> {{day}}就是您的生日啦~~！明大经纪人 {{agentName}} 送您一张生日贺卡，感谢您对我的信任，接下来的日子里，我将一直守护你！真诚祝您生日快乐！</div>
		</div>
		<div class="rd_div_proall">
			<!--<span class="rd_span_name">亲爱的{{name}}：</span>-->
			<div class="rd_span_name">亲爱的{{name}}：</div>
			<!--<span>不是每一次邂逅都有结果，不是每一个流年都有美丽传说，您知道吗？12月31日，也是历史名人 xxx 的生日，希望您像他一样，事业步步高升，离成功更进一步！真诚的祝愿您生日快乐，身体健康！</span>-->
			<div class="rd_span_ed">不是每一次邂逅都有结果，不是每一个流年都有美丽传说，您知道吗？{{brday}}，也是历史名人 {{famName}} 的生日，希望您像他一样，事业步步高升，离成功更进一步！真诚的祝愿您生日快乐，身体健康！</div>
			<p class="rd_span_ed11">{{famName}}</p>
			<div class="rd_div_edit">{{data_vb}}</div>
		</div>

	</div>
</template>

<script>
	import wx from 'weixin-js-sdk'
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: "preview",
		data() {
			return {
				itemData: [],
				name: "",
				agentName: "",
				amountGuarantee: "",
				money: "",
				seq: '',
				day: '',
				data_vb: '',
				famName: '',
				brday: ''
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
				console.log("总数据" + JSON.stringify(res.data))
				if(res.data.code == "SYS_S_000") {

					if(res.data.output.userName != undefined) {
						this.agentName = res.data.output.userName;
					} else {
						this.agentName = "";
					}
				} else {
					if(res.data.desc != undefined) {
						Toast(res.data.desc);
					} else {
						console.log("登录接口undefined");
					}
				}
			}, res => {
				Indicator.close();
				Toast('222')
				console.log("2===" + res.data)
			})

			//			this.agentName=localStorage.userName;
			var data = {
				"custId": this.$route.query.custId,
				"userId": this.$route.query.userId
			}
			this.$http.post(this.$store.state.link + "/cut/cut/queryCelBirthInfo", data).then(res => {
				console.log("1===" + JSON.stringify(res.data))
				if(res.data.code == "SYS_S_000") {
					this.name = res.data.output.custName + "    ";
					this.brday = res.data.output.birthday;
					this.name = res.data.output.custName;
					if(res.data.output.nextBirthday == "0") {
						this.day = "  今天"
					} else {
						this.day = "  再过" + res.data.output.nextBirthday + "天"
					}
					for(var i = 0; i < res.data.output.celBirthList.length; i++) {
						if(res.data.output.celBirthList[i].celId == this.$route.query.celId) {
							this.data_vb = res.data.output.celBirthList[i].famDesc;
							this.famName = res.data.output.celBirthList[i].famName;
						}
					}
				} else {
					if(res.data.desc != undefined) {

					} else {

					}
				}
			}, res => {
				console.log("2===" + res.data)
			})

			this.weChat()
		},
		methods: {
			weChat() {
				var data = {
					"shareUrl": window.location.href.split('#')[0]
				}
				console.log(data)
				var share_url = window.location.href.split('/')[2] + "/static/router.html?type=preview&code=preview&celId=" + this.$route.query.celId + "&custId=" + this.$route.query.custId + "&userId=" + this.$route.query.userId;

				Indicator.open();
				this.$http.post(this.$store.state.wx_share, data).then(res => {
					Indicator.close();
					console.log("分享回来的数据" + JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {
						console.log(111)
						wx.config({
							debug: false, // 开启调试模式,开发时可以开启  
							appId: res.data.output.appId, // 必填，公众号的唯一标识   由接口返回
							timestamp: res.data.output.timestamp, // 必填，生成签名的时间戳 由接口返回
							nonceStr: res.data.output.nonceStr, // 必填，生成签名的随机串 由接口返回
							signature: res.data.output.signature, // 必填，签名 由接口返回
							jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 此处填你所用到的方法 
						});
						wx.onMenuShareAppMessage({ // 分享给朋友
							title: "生日名人堂", // 分享标题
							desc: "快来看看你和谁同一天过生日!", // 分享描述
							link: share_url, // 分享链接 默认以当前链接
							imgUrl: this.$store.state.imgUrl, // 分享图标
							type: '', // 分享类型,music、video或link，不填默认为link
							dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
							// 用户确认分享后执行的回调函数
							success: function() {
								// 用户确认分享后执行的回调函数
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
						if(res.data.desc != undefined) {
						} else {
							console.log("分享接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					console.log("2===分享失败" + res.data)
				});
			},

		}

	}

	//  }
</script>

<style scoped="scoped">
	.rd_div_edit {
		width: 3.84rem;
		margin-left: 1.5rem;
		margin-top: 0.16rem;
		color: #555555;
		font-size: 0.24rem;
		line-height: 0.34rem;
	}
	
	.rd_span_name {
		height: 0.2rem;
		font-size: 0.28rem;
		color: #222222;
		line-height: 0.2rem;
		margin-left: 1.2rem;
	}
	
	.rd_span_ed {
		width: 4.12rem;
		margin-left: 1.5rem;
		font-size: 0.28rem;
		color: #222222;
		margin-top: 0.24rem;
		line-height: 0.34rem;
		/*text-indent: 2em;*/
	}
	.rd_span_ed11 {
		width: 4.12rem;
		margin-left: 1.5rem;
		font-size: 0.28rem;
		color: #222222;
		margin-top: 0.24rem;
		line-height: 0.34rem;
		/*text-indent: 2em;*/
	}
	.rd_div_body {
		overflow: hidden;
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
	
	.rd_div_content {
		width: 4.54rem;
		margin-left: 0.26rem;
		margin-top: 0.04rem;
		font-size: 0.24rem;
		color: #222222;
		line-height: 0.34rem;
		/*text-indent: 2em;*/
	}
	
	.rd_div_proall {
		width: 6.34rem;
		height: 6.438rem;
		background: url(/static/qijianwei/product_bg.png) no-repeat;
		background-size: contain;
		margin-left: 0.5rem;
		margin-bottom: 0.332rem;
		padding-top: 1.45rem;
	}
	
	.rd_div_iconname {
		width: 2.4rem;
		height: 1.42rem;
		border-radius: 6px;
		margin-top: 1.328rem;
		margin-left: 1.3rem;
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
		height: 0.4rem;
		margin-left: 0.8rem;
	}
	
	.rd_div_termall1 {
		width: 6rem;
		height: 1.8rem;
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
		font-size: 0.28rem;
		color: #EB6067;
		line-height: 0.4rem;
		margin-left: 0.16rem;
	}
	
	.rd_div_money {
		display: block;
		float: left;
		height: 0.4rem;
		font-size: 0.28rem;
		line-height: 0.4rem;
		margin-left: 0.16rem;
		font-size: 0.24rem;
		color: #222222;
		text-decoration: line-through;
	}
	
	.rd_div_bottom {
		width: 6.2rem;
		height: 0.96rem;
		position: relative;
		/*margin-top: 0.28rem;*/
	}
	
	.rd_div_bir {
		display: block;
		float: left;
		margin-left: 0.2rem;
		height: 0.34rem;
		font-size: 0.24rem;
		color: #555555;
		margin-top: 0.22rem;
		margin-left: 1.3rem;
	}
	
	.rd_div_percentage {
		display: block;
		float: right;
		font-size: 0.96rem;
		color: #EB6067;
		line-height: 1.34rem;
		margin-right: 0.5rem;
	}
	
	.rd_span_color {
		color: #EB6067;
	}
</style>