<template>
	<div class="refion_all_bg">
		<div v-if="!mark_flag" class="ctc_div_mask" @click="cancel" @touchmove.prevent>
			<div class="ctc_div_maskitem">
				<div class="ctc_div_labtitle">温馨提示</div>
				<div class="ctc_div_labtitle1">点击右上角，分享给客户</div>
				<div class="ctc_div_ok">知道了</div>
			</div>
		</div>
		<div class="">
			<div class="reinforce_bg" id="refion_all_id">
				<div class="ba" v-if="!invited" @click="initcanel" @touchmove.prevent>
					<div class="refion_open" id="refion_style">
						<p class="refion_invite_code">您的邀请码</p>
						<p class="refion_invite_num" id="invite_code" v-model="refion_data">{{reinforce}}</p>
						<!--	<button class="refion_invite_num" id="invite_code"  data-clipboard-action="10000678">10000678</button>-->
						<div class="refion_btn11" id="invite_copy" v-on:click="invite_click_copy">复制邀请码</div>

						<p class="refion_invite_text">打开微信，向您的好友发送验证码，注册成功后，将成为您的团队成员，每笔出单，您都获取佣金收入。</p>
					</div>
				</div>
				<div class="div_open" style="" id="invite_div" v-if="invited">
					<div class="refion_div">
						<p class="refion_p">
							<img src="/static/img/red.png" class="refion_img" />
							<span class="refion_nun">增员成功</span>
						</p>
						<p class="refion_text">
							通过你的邀请链接注册的用户，全部都自动加入你的团队。
						</p>
					</div>
					<div class="refion_div">
						<p class="refion_p">
							<img src="/static/img/red.png" class="refion_img" />
							<span class="refion_nun">邀请奖励</span>
						</p>
						<p class="refion_text">
							团队下的成员每笔出单你都可以拿到奖励。
						</p>
					</div>
					<div class="refion_div">
						<p class="refion_p">
							<img src="/static/img/red.png" class="refion_img" />
							<span class="refion_nun">晋级奖励</span>
						</p>
						<p class="refion_text">
							达到一定人数和保费后可晋级为高级代理人，你的佣金收入更上一层楼。
						</p>
					</div>
					<div class="refion_bottom clearFloat">
						<span class="refion_btn" @click="share">链接增员</span>
						<span class="refion_btn refion_left" v-on:click="invite">邀请码增员</span>
					</div>

				</div>

			</div>
		</div>

	</div>
</template>

<script>
	import wx from 'weixin-js-sdk'
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import Clipboard from 'clipboard';
	export default {
		name: "reinforce",
		data() {
			return {
				invited: true,
				refion_data: '',
				reinforce: "",
				mark_flag: true,
			}
		},
		created() {
			if (this.$route.query.token != undefined) {
				window.localStorage.token = this.$route.query.token
			}
			this.reinforce = localStorage.getItem("brokerCode");

			this.weChat();
			//			this.share_wx();
		},
		methods: {
			invite() {
				if(this.invited) {
					this.invited = false;
				} else {
					this.invited = true;
				}
			},
			initcanel() {
				this.invited = true;
			},
			invite_click_copy() {
				let clipboard = new Clipboard('#invite_code');
				clipboard.on('success', e => {
					console.log('复制成功')
					// 释放内存  
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					// 不支持复制  
					console.log('该浏览器不支持自动复制')
					// 释放内存  
					clipboard.destroy()
				})
			},
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
				//				var share_URL = "http://h5.qtoubao.cn/work/signingAgent/index.html?brokerCode=" + localStorage.brokerCode;
				var share_URL = this.$store.state.shareLink + "/static/router.html?type=reinforce&code=reinforce&brokerCode=" + localStorage.brokerCode;
				console.log("share_URL===" + share_URL);
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
							title: "招募合伙人", // 分享标题
							desc: "加入趣投保，和我一起获客签单吧", // 分享描述
							link: share_URL, // 分享链接 默认以当前链接
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

			}
		}

	}
</script>

<style scoped="scoped">
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
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
	
	.ctc_div_labtitle {
		width: 100%;
		margin: 0 auto;
		font-size: 0.36rem;
		text-align: center;
		color: #555555;
	}
	
	.ctc_div_labtitle1 {
		width: 100%;
		margin: 0 auto;
		font-size: 0.3rem;
		text-align: center;
		color: #555555;
		margin-top: 0.5rem;
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
	
	.reinforce_bg {
		position: relative;
		background-image: url(/static/img/reinforce_bg.png);
		width: 100%;
		height: 16.24rem;
		background-size: cover;
	}
	
	.div_open {
		position: absolute;
		background-color: #FFFFFF;
		height: 6.92rem;
		width: 6.6rem;
		border-radius: 0.25rem;
		top: 4.5rem;
		left: 0.45rem;
	}
	
	.refion_img {
		width: 0.2rem;
		height: 0.2rem;
		float: left;
		margin-top: 0.1rem;
	}
	
	.refion_nun {
		font-size: 0.32rem;
		color: #EB7760;
		letter-spacing: -0.39px;
		float: left;
		margin-left: 0.16rem;
	}
	
	.refion_div {
		padding: 0.4rem 0.3rem 0 0.3rem;
	}
	
	.refion_text {
		margin-top: 0.08rem;
		font-size: 0.28rem;
		line-height: 0.44rem;
		color: #222222;
		letter-spacing: 0;
	}
	
	.refion_lin {
		margin-top: 0.4rem;
	}
	
	.refion_btn {
		display: inline-block;
		float: left;
		width: 2.8rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		background-image: linear-gradient(-179deg, #FDDE5E 0%, #FFCE2C 100%);
		box-shadow: 1px 1px 6px 0 #FFEF9E, inset 0 1px 3px 0 rgba(255, 255, 255, 0.50);
		border-radius: 0.5rem;
		font-size: 0.32rem;
		color: #EB7760;
	}
	
	.refion_open {
		background-image: url(/static/img/invite_open.png);
		background-size: cover;
		height: 6.96rem;
		width: 6.42rem;
		position: absolute;
		top: 2rem;
		left: 0.54rem;
		/*display: none;*/
	}
	
	.refion_all_bg {}
	
	.refion_invite_code {
		font-size: 0.4rem;
		color: #EB7760;
		text-align: center;
		margin-top: 0.24rem;
	}
	
	.refion_invite_num {
		margin-top: 2rem;
		margin-left: 2.38rem;
		font-size: 0.36rem;
		color: #000000;
		border: 0;
	}
	
	.refion_btn11 {
		background-image: url(/static/img/botton@2x.png);
		background-size: cover;
		width: 3.04rem;
		height: 1.02rem;
		font-size: 16px;
		color: #EB7760;
		text-align: center;
		line-height: 1.02rem;
		float: left;
		margin-top: 1.06rem;
		margin-left: 1.82rem;
	}
	
	.refion_invite_text {
		font-size: 0.28rem;
		color: #333333;
		width: 5.18rem;
		height: 1.2rem;
		margin-top: 2.3rem;
		margin-left: 0.58rem;
		line-height: 0.4rem;
		clear: both;
	}
	
	.ba {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.3);
	}
	
	.refion_bottom {
		height: 1.12rem;
		padding-left: 0.32rem;
		margin-top: 0.6rem;
	}
	
	.refion_left {
		margin-left: 0.4rem;
	}
	
	.refion_p {
		height: 0.44rem;
		line-height: 0.44rem;
	}
</style>