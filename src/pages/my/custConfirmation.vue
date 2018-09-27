<template>
	<div>
		<div v-if="!mark_flag" class="ctc_div_mask" @click="cancel" @touchmove.prevent>
			<div class="ctc_div_maskitem">
				<div class="ctc_div_labtitle">温馨提示</div>
				<div class="ctc_div_labcontent">温馨提示：这份确认书客户还没有签字，你是否需要重新分享给客户提示他继续完成签字。</div>
				<div class="ctc_div_labbottom">
					<div @click="cancel" class="ctc_div_btnleft">取消</div>
					<div @click.stop="share" class="ctc_div_btnright">重新分享</div>
				</div>
			</div>
		</div>
		<div class="ctc_div_queryall">
			<img class="ctc_img_query" src="/static/qijianwei/SearchGlyph.png" @click="changeCount" />
			<input v-model="input_value" class="ctc_input_query" type="text" placeholder="搜索" v-on:blur="changeCount()" />
		</div>
		<div @click="nextadd()" class="ctc_div_nextadd">新增委托书</div>
		<div v-if="data_flag">
			<div class="ctc_div_itemleft" @click="details(item.beforeOrderStatus,item.pkInsureId,item.h5Url)" v-for="item in itemall">
				<div class="ctc_div_itemconfirm">{{item.beforeOrderStatus | capitalize}}</div>
				<div v-if="delete_state(item.beforeOrderStatus)" class="ctc_div_itemdelete" @click.stop="delete_ietm(item.pkInsureId)">
					<img class="ctc_div_delete_img" src="/static/qijianwei/icon_rxdelete.png" />
					<div class="ctc_div_delete_text">删除</div>
				</div>
				<div class="ctc_div_item">
					<img class="ctc_div_itemimg" src="/static/qijianwei/Group.png" />
					<div class="ctc_div_itemname">真实姓名：</div>
					<div class="ctc_div_itemnametitle">{{item.applicantName}}</div>
				</div>
				<div class="ctc_div_item">
					<img class="ctc_div_itemimg" src="/static/qijianwei/Group.png" />
					<div class="ctc_div_itemname">证件类型：</div>
					<div class="ctc_div_itemnametitle">{{item.certiType | code}}</div>
				</div>
				<div class="ctc_div_item">
					<img class="ctc_div_itemimg" src="/static/qijianwei/Group.png" />
					<div class="ctc_div_itemname">证件号码：</div>
					<div class="ctc_div_itemnametitle">{{item.certiCode}}</div>
				</div>
				<div class="ctc_div_item">
					<img class="ctc_div_itemimg" src="/static/qijianwei/Group.png" />
					<div class="ctc_div_itemname">手机号码：</div>
					<div class="ctc_div_itemnametitle">{{item.mobileNo}}</div>
				</div>
			</div>
			<!--<div class="ctc_div_introduce">投保单信息已经转发给客户，无法进行修改删除等操作，请知悉！</div>-->
		</div>
		<div v-if="!data_flag">
			<img class="ctc_img_null" src="/static/qijianwei/my_tbd.png" />
			<div class="ctc_div_null">您还没有相关的确认书</div>
			<div class="ctc_div_null">点击新增，快速录入，有效管理</div>
		</div>
	</div>
</template>

<script>
	import wx from 'weixin-js-sdk'
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'allSort',
		data() {
			return {
				input_value: "",
				mark_flag: true,
				data_flag: true,
				itemall: [],
				share_url: ""
			}
		},
		created() {
			if (this.$route.query.token != undefined) {
				window.localStorage.token = this.$route.query.token
			}
			if(this.$route.query.custId == "" || this.$route.query.custId == undefined || this.$route.query.custId == null) {
				console.log("=======1")
				this.init();
			} else {
				this.name_init_cust();
				console.log("=======2")
			}

		},
		filters: {
			capitalize: function(value) {
				if(value == "N") {
					return '客户未确认'
				} else if(value == "Y") {
					return '客户已确认'
				} else if(value == "S") {
					return '保单已投保'
				} else if(value == "W") {
					return '客户未确认'
				}
			},
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

						wx.error(function(res) {
							console.log("验证失败返回的信息:==" + JSON.stringify(res))
						});
					} else {
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {
							console.log("分享接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					console.log("2===分享失败" + res.data)
				});

			},
			details(beforeOrderStatus, pkInsureId, h5Url) {
				//				详情
				if(beforeOrderStatus == "Y") {
					this.share_url = h5Url + "/index.html?pkInsureId=" + pkInsureId + "&beforeOrderStatus=" + beforeOrderStatus + "&userId=" + localStorage.getItem("userId") + "&token=" + localStorage.getItem("token");
					console.log("连接详情的URL" + this.share_url);
					window.location.href = this.share_url;
				} else {
					//					this.mark_flag = false;
					this.$router.push('/custConfirmationdetails?beforeOrderStatus=' + beforeOrderStatus + "&pkInsureId=" + pkInsureId + "&h5Url=" + h5Url)
				}
			},
			cancel() {
				this.mark_flag = true;
			},
			delete_ietm(depkInsureId) {
				//				删除
				var data = {
					"pkInsureId": depkInsureId,
					"token": localStorage.token,
					"userId": localStorage.userId
				};
				Indicator.open();
				this.$http.post(this.$store.state.link + "/core/order/deleteInsureInput", data).then(res => {
					Indicator.close();
					console.log("删除过后" + JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {
						this.init();
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
				})
			},
			delete_state(certiType) {
				console.log("certiType==" + certiType)
				if(certiType == "M" || certiType == "N" || certiType == "W") {
					return true;
				} else {
					return false;
				}
			},
			changeCount() {
				//				搜索
				this.name_init();
			},
			nextadd() {
				//新增确认书

				if(this.$route.query.custId == "" || this.$route.query.custId == undefined || this.$route.query.custId == null) {
					this.$router.push('/confirmed')
				} else {
					this.$router.push('/confirmed?custId=' + this.$route.query.custId)
				}

			},
			init() {
				var data = {
					"brokerId": localStorage.BrokerId,
					"token": localStorage.token,
					"userId": localStorage.userId
				};
				console.log(data)
				Indicator.open();
				this.$http.post(this.$store.state.link + "/core/order/queryInsureInputList", data).then(res => {
					Indicator.close();
					console.log("总数据" + JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {
						this.itemall = res.data.output;
						if(res.data.output.length > 0) {
							this.data_flag = true;
						} else {
							this.data_flag = false;
						}
					} else {
						this.data_flag = false;
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {
							console.log("登录接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					this.data_flag = false;
					console.log("2===" + res.data)
				})
			},
			name_init() {
				var data = {
					"brokerId": localStorage.BrokerId,
					"name": this.input_value,
					"token": localStorage.token,
					"userId": localStorage.userId
				};
				console.log("datas===" + JSON.stringify(data))
				Indicator.open();
				this.$http.post(this.$store.state.link + "/core/order/queryInsureInputList", data).then(res => {
					Indicator.close();
					console.log("总数据" + JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {
						this.itemall = res.data.output;
						if(res.data.output.length > 0) {
							this.data_flag = true;
						} else {
							this.data_flag = false;
						}
					} else {
						this.data_flag = false;
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {
							console.log("登录接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					this.data_flag = false;
					console.log("2===" + res.data)
				})
			},
			name_init_cust() {
				var data = {
					"brokerId": localStorage.BrokerId,
					"name": localStorage.custName,
					"token": localStorage.token,
					"userId": localStorage.userId
				};
				console.log("datas===" + JSON.stringify(data))
				Indicator.open();
				this.$http.post(this.$store.state.link + "/core/order/queryInsureInputList", data).then(res => {
					Indicator.close();
					console.log("总数据" + JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {
						this.itemall = res.data.output;
						if(res.data.output.length > 0) {
							this.data_flag = true;
						} else {
							this.data_flag = false;
						}
					} else {
						this.data_flag = false;
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {
							console.log("登录接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					this.data_flag = false;
					console.log("2===" + res.data)
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.ctc_div_queryall {
		width: 7.18rem;
		height: 0.72rem;
		margin: 0 auto;
		background: #EEEEEE;
		border-radius: 0.2rem;
		margin-top: 0.2rem;
	}
	
	.ctc_img_query {
		display: block;
		float: left;
		width: 0.28rem;
		height: 0.28rem;
		margin-top: 0.22rem;
		margin-left: 0.2rem;
	}
	
	.ctc_input_query {
		width: 6.46rem;
		height: 0.72rem;
		padding-left: 0.24rem;
		border: none;
		background: #EEEEEE;
		font-size: 0.32rem;
	}
	
	.ctc_div_introduce {
		width: 7.3rem;
		padding-left: 0.2rem;
		color: #333333;
		font-size: 0.26rem;
		line-height: 0.4rem;
		margin-top: 0.16rem;
	}
	
	.ctc_div_itemleft {
		width: 7.1rem;
		height: 2.2rem;
		padding-top: 0.2rem;
		padding-left: 0.4rem;
		position: relative;
		border-bottom: 0.01rem solid #EEEEEE;
	}
	
	.ctc_div_item {
		width: 100%;
		height: 0.4rem;
	}
	
	.ctc_div_itemimg {
		display: block;
		float: left;
		width: 0.2rem;
		height: 0.2rem;
		margin-top: 0.1rem;
	}
	
	.ctc_div_itemname {
		display: block;
		float: left;
		font-size: 0.24rem;
		color: #222222;
		height: 0.4rem;
		line-height: 0.4rem;
		margin-left: 0.2rem;
	}
	
	.ctc_div_itemnametitle {
		display: block;
		float: left;
		font-size: 0.24rem;
		color: #222222;
		height: 0.4rem;
		line-height: 0.4rem;
	}
	
	.ctc_div_itemconfirm {
		position: absolute;
		right: 0.6rem;
		top: 0.3rem;
		color: #eb7760;
	}
	
	.ctc_div_itemdelete {
		position: absolute;
		right: 0.6rem;
		bottom: 0.3rem;
		z-index: 10;
		/*width: 1rem;
		height: 0.5rem;*/
		/*background: #669900;*/
	}
	
	.ctc_div_delete_text {
		display: block;
		float: left;
		font-size: 0.24rem;
		color: #000000;
		height: 0.5rem;
		line-height: 0.5rem;
	}
	
	.ctc_div_delete_img {
		display: block;
		float: left;
		width: 0.48rem;
		height: 0.48rem;
		margin-right: 0.1rem;
	}
	
	.ctc_div_nextadd {
		position: fixed;
		bottom: 1rem;
		right: 0.5rem;
		z-index: 888;
		background: #eb7760;
		width: 1.8rem;
		height: 0.6rem;
		border-radius: 0.8rem;
		text-align: center;
		line-height: 0.6rem;
		color: #FFFFFF;
	}
	
	.ctc_img_null {
		width: 4.82rem;
		height: 3.9rem;
		margin-left: 1.34rem;
		margin-top: 1.6rem;
	}
	
	.ctc_div_null {
		font-size: 0.28rem;
		color: #333333;
		margin-top: 0.34rem;
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
	
	.ctc_div_btnleft {
		display: block;
		float: left;
		width: 1.8rem;
		height: 0.64rem;
		text-align: center;
		/*background: #669900;*/
		font-size: 0.34rem;
		color: #999999;
		line-height: 0.64rem;
		border-radius: 0.4rem;
		border: 0.02rem solid#999999;
		margin-left: 0.55rem;
	}
	
	.ctc_div_btnright {
		display: block;
		float: left;
		width: 1.8rem;
		height: 0.64rem;
		text-align: center;
		/*background: #669900;*/
		font-size: 0.34rem;
		color: #EC7962;
		line-height: 0.64rem;
		border-radius: 0.4rem;
		border: 0.02rem solid#EC7962;
		margin-left: 0.6rem;
	}
</style>