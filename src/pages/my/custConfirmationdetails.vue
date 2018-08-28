<template>
	<div>
		<div v-if="!mark_flag" class="ctc_div_mask" @click="cancel" @touchmove.prevent>
			<div class="ctc_div_maskitem">
				<div class="ctc_div_labtitle">温馨提示</div>
				<div class="ctc_div_labtitle1">点击右上角，分享给客户</div>
				<div class="ctc_div_ok">知道了</div>
			</div>
		</div>
		<div class="ccd_confirm_div ">
			<div class="ccd_div_name">真实姓名:</div>
			<div class="ccd_div_nameright">{{name}}</div>
		</div>
		<div class="ccd_confirm_div">
			<div class="ccd_div_name">证件类型:</div>
			<div class="ccd_div_nameright">{{type | code}}</div>
		</div>
		<div class="ccd_confirm_div">
			<div class="ccd_div_name">证件号码:</div>
			<div class="ccd_div_nameright">{{number_card}}</div>
		</div>
		<div class="ccd_confirm_div">
			<div class="ccd_div_name">手机号码:</div>
			<div class="ccd_div_nameright">{{inphon}}</div>
		</div>
		<div class="ccd_confirm_share" @click="share">
			分享
		</div>
	</div>
</template>

<script>
	import wx from 'weixin-js-sdk'
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: "",
		data() {
			return {
				name: '',
				type: '',
				number_card: '',
				inphon: '',
				pkInsureId: '',
				h5Url: '',
				beforeOrderStatus: '',
				mark_flag: true,
				share_Url: ''
			}
		},
		created() {

			this.pkInsureId = this.$route.query.pkInsureId;
			this.h5Url = this.$route.query.h5Url;
			this.beforeOrderStatus = this.$route.query.beforeOrderStatus;
			var data = {
				"pkInsureId": this.pkInsureId,
				"token": localStorage.token,
				"userId": localStorage.userId
			};
			Indicator.open();
			this.$http.post(this.$store.state.link + "/core/order/queryInsureInputDetail", data).then(res => {
				Indicator.close();
				console.log("详细数据" + JSON.stringify(res.data))
				if(res.data.code == "SYS_S_000") {
					this.name = res.data.output.applicantName;
					this.type = res.data.output.certiType;
					this.number_card = res.data.output.certiCode;
					this.inphon = res.data.output.mobileNo;
//					this.share_url = this.$store.state.shareLink+ "/static/router.html?type=afternoon&code=afternoon&temCode=" + this.$route.query.temCode;
//					console.log(httpLink)
					//					this.share_Url = this.$store.state.shareLink1 + "/work/sign/index1.html?pkInsureId=" + res.data.output.pkInsureId + "&beforeOrderStatus=" + res.data.output.beforeOrderStatus + "&userId=" + localStorage.getItem("userId") + "&token=" + localStorage.getItem("token");
					this.share_Url = this.$store.state.shareLink + "/static/router.html?type=confirm&code=confirm&pkInsureId=" + res.data.output.pkInsureId + "&beforeOrderStatus=" + res.data.output.beforeOrderStatus + "&userId=" + localStorage.getItem("userId") + "&token=" + localStorage.getItem("token");

					this.weChat();
				} else {
					if(res.data.desc != undefined) {
						Toast(res.data.desc);
					} else {
						console.log("登录接口undefined");
					}
				}
			}, res => {
				Indicator.close();
				console.log("2===" + res.data)
			});

			//			this.weChat();
			//				this.share_wx();
		},
		methods: {
			share() {
				this.mark_flag = false;
			},
			cancel() {
				this.mark_flag = true;
			},
			weChat() {
				//分享
				var data = {
					"shareUrl": window.location.href.split('#')[0]
				}
				console.log(data)
				Indicator.open();
//				this.share_url = this.$store.state.shareLink + "/static/router.html?type=confirm&code=confirm&pkInsureId=" + res.data.output.pkInsureId + "&beforeOrderStatus=" + res.data.output.beforeOrderStatus + "&userId=" + localStorage.getItem("userId") + "&token=" + localStorage.getItem("token");
					console.log(this.share_url)
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
							title: "签署委托书", // 分享标题
							desc: "非常感谢您选择明大保险经纪作为您的保险经纪人，我们将竭诚为您提供高品质的保险业务服务", // 分享描述
							//							link: "http://outer.qtoubao.cn/work/sign/index.html?pkInsureId=475046&beforeOrderStatus=N&userId=275007&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHQiOjE1NTYyNzAxNTM1MDUsInBhc3N3b3JkIjoiYTExMTExMSIsImlhdCI6MTUyNzIzOTc1MzUwNSwidXNlcm5hbWUiOiIxMzQ2Mzk1NDkwMiJ9.47OULIwZY5rZxe1qDdfW3xOKFoaNfr2spqnK7gI96Ew", // 分享链接 默认以当前链接
							link: this.share_Url,
							imgUrl: this.$store.state.MDimgUrl, // 分享图标
							type: '', // 分享类型,music、video或link，不填默认为link
							dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
							// 用户确认分享后执行的回调函数
							success: function() {
								// 用户确认分享后执行的回调函数
								Toast('分享成功')
								this.$router.push('/custConfirmation')
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
		filters: {
			code: function(value) {
				if(value == "A") {
					return '身份证'
				} else if(value == "B") {
					return '临时身份证'
				} else if(value == "C") {
					return '户口簿'
				} else if(value == "D") {
					return '出生证明'
				} else if(value == "E") {
					return '港澳通行证'
				} else if(value == "F") {
					return '护照'
				} else if(value == "G") {
					return '军官证'
				} else if(value == "H") {
					return '警官证'
				} else if(value == "I") {
					return '士兵证'
				} else if(value == "J") {
					return '驾照'
				} else if(value == "K") {
					return '回乡证'
				} else if(value == "O") {
					return '其他'
				} else if(value == "M") {
					return '营业执照'
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.ccd_div_name {
		display: block;
		float: left;
		line-height: 0.88rem;
		font-size: 0.36rem;
		color: #222222;
		margin-left: 0.4rem;
	}
	
	.ccd_div_nameright {
		display: block;
		float: right;
		line-height: 0.88rem;
		font-size: 0.36rem;
		color: #222222;
		margin-right: 0.4rem;
	}
	
	.ccd_confirm_div {
		height: 0.88rem;
		width: 100%;
		border-bottom: 0.01rem solid;
		border-bottom-color: #E3E3E3;
	}
	
	.ccd_confirm_share {
		font-size: 0.32rem;
		color: #EB7760;
		font-style: bold;
		background-image: url(/static/img/btn_div.png);
		background-size: cover;
		width: 6.04rem;
		height: 1rem;
		margin: 0 auto;
		margin-top: 2rem;
		line-height: 1rem;
		text-align: center;
	}
	
	.ctc_div_mask {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		background: rgba(0, 0, 0, 0.40);
		z-index: 100;
	}
	
	.ctc_div_maskitem {
		width: 5.44rem;
		height: 3.6rem;
		background: #ffffff;
		margin: 0 auto;
		margin-top: 50%;
		border-radius: 0.16rem;
		padding-top: 0.28rem;
	}
	
	.ctc_div_labtitle {
		width: 100%;
		margin: 0 auto;
		font-size: 0.32rem;
		text-align: center;
		color: #555555;
	}
	
	.ctc_div_labtitle1 {
		width: 100%;
		margin: 0 auto;
		font-size: 0.4rem;
		text-align: center;
		color: #555555;
		margin-top: 0.5rem;
	}
	
	.ctc_div_labcontent {
		width: 90%;
		margin: 0 auto;
		font-size: 0.32rem;
		line-height: 0.4rem;
		text-align: left;
		color: #555555;
		margin-top: 0.18rem;
	}
	
	.ctc_div_labbottom {
		width: 100%;
		height: 1.28rem;
		margin-top: 0.5rem;
	}
	
	.ctc_div_ok {
		width: 2rem;
		height: 0.8rem;
		margin: 0 auto;
		margin-top: 0.8rem;
		font-size: 0.4rem;
		text-align: center;
		color: #FFFFFF;
		line-height: 0.8rem;
		border-radius: 0.5rem;
		background: #EB7760;
	}
</style>