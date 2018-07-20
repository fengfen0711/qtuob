<template>
	<div class="my_body">
		<div v-if="!mark_flag" class="ctc_div_mask" @click="cancel" @touchmove.prevent>
			<div class="ctc_div_maskitem">
				<div class="ctc_div_labtitle">温馨提示</div>
				<div class="ctc_div_labtitle1">点击右上角，分享给客户</div>
				<div class="ctc_div_ok">知道了</div>
				<!--<div class="ctc_div_labcontent">温馨提示：这份确认书客户还没有签字，你是否需要重新分享给客户提示他继续完成签字。</div>
				<div class="ctc_div_labbottom">
					<div @click="cancel" class="ctc_div_btnleft">取消</div>
					<div @click.stop="share" class="ctc_div_btnright">重新分享</div>
				</div>-->
			</div>
		</div>
		<div class="my_div_icon">
			<div class="my_div_icontop" @click="userinfo">
				<img class="my_img_icon" :src="headImg" />
			</div>
			<div class="my_div_name">13120000175</div>
		</div>
		<div class="my_div_itemall" @click="myConfirmation">
			<img class="my_img_itemicon" src="/static/qijianwei/my_Insurance_icon.png" />
			<div class="my_img_itemname">我的客户确认书</div>
			<img class="my_img_itemnext" src="/static/qijianwei/btn_next.png" />
		</div>
		<div class="my_bg"></div>
		<!--<div class="my_div_itemall">
			<img class="my_img_itemicon" src="/static/qijianwei/baodanguanli.png" />
			<div class="my_img_itemname">保单管理</div>
			<img class="my_img_itemnext" src="/static/qijianwei/btn_next.png" />
		</div>
		<div class="my_bg"></div>-->
		<!--<div class="my_div_itemall">
			<img class="my_img_itemicon" src="/static/qijianwei/jihuashu.png" />
			<div class="my_img_itemname">我的计划书</div>
			<img class="my_img_itemnext" src="/static/qijianwei/btn_next.png" />
		</div>
		<div class="my_bg"></div>-->
		<!--<div class="my_div_itemall">
			<img class="my_img_itemicon" src="/static/qijianwei/shouru.png" />
			<div class="my_img_itemname">我的收入</div>
			<img class="my_img_itemnext" src="/static/qijianwei/btn_next.png" />
		</div> 
		<div class="my_bigbg"></div>-->
		<div class="my_div_itemall" @click="opinionFan">
			<img class="my_img_itemicon" src="/static/qijianwei/fankui.png" />
			<div class="my_img_itemname">意见反馈</div>
			<img class="my_img_itemnext" src="/static/qijianwei/btn_next.png" />
		</div>
		<div class="my_bg"></div>
		<div class="my_div_itemall">
			<img class="my_img_itemicon" src="/static/qijianwei/anquan.png" />
			<div class="my_img_itemname" @click="safe">账户安全</div>
			<img class="my_img_itemnext" src="/static/qijianwei/btn_next.png" />
		</div>
		<div class="my_bg"></div>
		<div class="my_div_itemall" @click="aboutqtb">
			<img class="my_img_itemicon" src="/static/qijianwei/gengduo.png" />
			<div class="my_img_itemname">关于趣投保</div>
			<img class="my_img_itemnext" src="/static/qijianwei/btn_next.png" />
		</div>
		<div class="my_div_out">退出登录</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'Login',
		data() {
			return {
				headImg:"/static/qijianwei/head_img.png",
				mark_flag:true,
			}
		},
		methods: { //方法
			userinfo() {
				//个人中心
				this.$router.push('/userInfo')
			},
			opinionFan() {
				//意见反馈
				this.$router.push('/feedback')
			},
			aboutqtb() {
				//关于趣投保
				this.$router.push('/workbench')
			},
			myConfirmation() {
				//我的客户确认书
				this.$router.push('/custConfirmation')
			},
			safe() {
				//账户安全
				this.$router.push('/safe')
			}
		},
		created() {
//			console.log("ssss1=" + localStorage.getItem("userId"))
//			console.log("ssss2=" + localStorage.getItem("token"))
//			var data = {
//				"userId": localStorage.getItem("userId"),
//				"token": localStorage.getItem("token")
//			};
//			console.log("data=="+JSON.stringify(data));
//			Indicator.open();
//			this.$http.post(this.$store.state.link + "/pct/seloneselfinfo", data).then(res => {
//				Indicator.close();
//				Toast('111')
//				console.log("总数据" + JSON.stringify(res.data))
//				if(res.data.code == "SYS_S_000") {
//					this.headImg=res.data.output.headImg;
//				} else {
//					if(res.data.desc != undefined) {
//						Toast(res.data.desc);
//					} else {
//						console.log("登录接口undefined");
//					}
//				}
//			}, res => {
//				Indicator.close();
//				Toast('222')
//				console.log("2===" + res.data)
//			})
		}
	}
</script>

<style scoped="scoped">
	.my_body {
		position: fixed;
		background: #eeeeee;
		width: 100%;
		height: 100%;
		padding-bottom: 0.48rem;
	}
	
	.my_div_icon {
		width: 100%;
		height: 3.4rem;
		background: #f8f8f8;
		padding-top: 0.5rem;
	}
	
	.my_div_icontop {
		width: 2.5rem;
		height: 2.5rem;
		display: block;
		margin: 0 auto;
	}
	
	.my_img_icon {
		display: block;
		float: left;
		width: 2.5rem;
		height: 2.5rem;
		z-index: -1;
		border: 0.04rem solid #000000;
		border-radius: 50%;
		box-shadow: 0.2rem 0.2rem 0.2rem #eeeeee;
	}
	
	.my_div_name {
		position: absolute;
		top: 3.15rem;
		right: 2.25rem;
		font-size: 0.48rem;
		color: #222222;
	}
	
	.my_div_itemall {
		width: 100%;
		height: 1.12rem;
		background: #ffffff;
	}
	
	.my_img_itemicon {
		display: block;
		float: left;
		margin-top: 0.22rem;
		width: 0.68rem;
		height: 0.68rem;
		margin-left: 0.4rem;
	}
	
	.my_img_itemname {
		display: block;
		float: left;
		font-size: 0.32rem;
		line-height: 1.12rem;
		margin-left: 0.26rem;
	}
	
	.my_img_itemnext {
		display: block;
		float: left;
		margin-top: 0.24rem;
		width: 0.64rem;
		height: 0.64rem;
		position: absolute;
		right: 0.4rem;
	}
	
	.my_bg {
		width: 100%;
		height: 0.02rem;
		background: #eeeeee;
	}
	
	.my_bigbg {
		width: 100%;
		height: 0.48rem;
		background: #eeeeee;
	}
	
	.my_div_out {
		display: block;
		width: 6.04rem;
		height: 1rem;
		margin: 0 auto;
		border-radius: 1rem;
		background-image: linear-gradient(90deg, #FF8B62 0%, #FF7CA4 100%);
		box-shadow: inset 0 1px 3px 0 rgba(255, 255, 255, 0.50);
		text-align: center;
		margin-top: 1.2rem;
		color: #ffffff;
		line-height: 1rem;
		font-size: 0.32rem;
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
	.ctc_div_ok{
		width: 2rem;
		height: 0.8rem;
		margin: 0 auto;
		margin-top: 0.8rem;
		font-size: 0.4rem;
		text-align: center;
		color: #FFFFFF;
		line-height:  0.8rem;
		border-radius: 0.5rem;
		background: #EB7760;
	}
</style>