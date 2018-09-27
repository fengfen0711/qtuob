<template>
	<div>
		<img class="afternoon_img" :src="imgdata" />
		<div class="after_div">
			<p class="after_p">{{after_title}}</p>
			<p class="afetr_time">
				<span class="after_color">{{after_time}}</span>
				<span class="after_data">{{afetr_data}}</span>
			</p>
			<p class="after_content">
				{{aftercontent}}
			</p>
		</div>

	</div>
</template>
<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import wx from 'weixin-js-sdk'
	export default {
		name: "",
		data() {
			return {
				imgdata: '',
				after_title: '',
				aftercontent: '',
				after_time: '',
				afetr_data: '',
				temCode: "",
				share_url: ''
			}
		},
		created() {
			if (this.$route.query.token != undefined) {
				window.localStorage.token = this.$route.query.token
			}
			Indicator.open()
			this.temCode = this.$route.query.temCode
			var afterdata = {
				"temCode": this.temCode
			}
			console.log(afterdata)
			this.$http.post(this.$store.state.link + '/cnt/resource/temdetail', afterdata).then(response => {
				Indicator.close()
				if(response.data.code == "SYS_S_000") {
					this.imgdata = response.data.output.temImgPath;
					this.after_title = response.data.output.temTitle;
					this.aftercontent = response.data.output.temCnt;
					this.after_time = response.data.output.currentTime.substring(10, 16);
					this.afetr_data = response.data.output.currentTime.substring(0, 10);
					this.share_url = this.$store.state.shareLink+ "/static/router.html?type=afternoon&code=afternoon&temCode=" + this.$route.query.temCode;
//					console.log(httpLink)
					console.log(this.share_url)
					this.weChat()
				}
			}, response => {
				Indicator.close()
				console.log("ajax error");
			});

			
		},
		methods: {
			weChat() {
				//分享
				var data = {
					"shareUrl": window.location.href.split('#')[0]
				}

				console.log(data)
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
							title: this.after_title, // 分享标题
							desc: this.aftercontent, // 分享描述
							link: this.share_url, // 分享链接 默认以当前链接
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
								Toast("分享失败")
							}
						});
						//分享到朋友圈
						wx.onMenuShareTimeline({
							title: this.after_title, // 分享标题
							link: this.share_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: this.$store.state.imgUrl, // 分享图标
							success: function() {
								// 用户确认分享后执行的回调函数
								Toast("分享成功")
							},
							cancel: function() {
								// 用户取消分享后执行的回调函数
								Toast("分享失败")
								console.log('分享到朋友取消');
							}
						});
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

			}
		}
	}
</script>

<style scoped="scoped">
	.afternoon_img {
		width: 7.5rem;
		height: 3.9rem;
		display: block;
		margin: 0 auto;
	}
	
	.after_div {
		padding: 0.32rem 0.3rem 0.16rem 0.3rem;
	}
	
	.after_p {
		font-size: 0.36rem;
		color: #000000;
	}
	
	.afetr_time {
		margin-top: 0.17rem;
	}
	
	.after_color {
		font-size: 0.22rem;
		color: #333333
	}
	
	.after_data {
		font-size: 0.22rem;
		color: #888888;
		margin-left: 0.1rem;
	}
	
	.after_content {
		font-size: 0.28rem;
		color: #333333;
		margin-top: 0.16rem;
		line-height: 0.5rem;
	}
</style>