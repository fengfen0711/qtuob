<template>
	<div class="my_body">
		<div v-if="!mark_flag" class="ctc_div_mask" @click="cancel" @touchmove.prevent>
			<div class="ctc_div_maskitem">
				<div class="ctc_div_labtitle1">确定要退出吗</div>
				<div class="index_bottom">
					<div class="index_con">取消</div>
					<div class="index_canel" v-on:click="quit">确定</div>
				</div>
			</div>
		</div>
		<div class="index_top">
			<div class="my_div_itemall" @click="opinionFan">
				<img class="my_img_itemicon" src="/static/qijianwei/fankui.png" />
				<div class="my_img_itemname">意见反馈</div>
				<img class="my_img_itemnext" src="/static/imgNew/icon_next3.png" />
			</div>
			<div class="my_div_itemall" @click="safe">
				<img class="my_img_itemicon" src="/static/qijianwei/anquan.png" />
				<div class="my_img_itemname">账户安全</div>
				<img class="my_img_itemnext" src="/static/imgNew/icon_next3.png" />
			</div>
			<div class="my_div_itemall" @click="aboutqtb">
				<img class="my_img_itemicon" src="/static/qijianwei/gengduo.png" />
				<div class="my_img_itemname">关于趣投保</div>
				<img class="my_img_itemnext" src="/static/imgNew/icon_next3.png" />
			</div>
		</div>
		<div class="my_div_out" v-on:click="exitYes">退出登录</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'mineSet',
		data() {
			return {
				seen: false,
				headImg: "/static/img/userImg.png",
				phoneNum: "",
				mark_flag: true,
				cust_status: true,
				indexstatus: true,
				phoneNum1: "010-86220865",
				failure: "",
			}
		},
		created() {
    		this.common.noShare();
		},
		methods: {
			opinionFan() {
				//意见反馈
				this.$router.push('/feedback')
			},
			aboutqtb() {
				//关于趣投保
				this.$router.push('/workbench')
			},
			safe() {
				//账户安全
				this.$router.push('/safe')
			},
			exitYes() {
				//退出登录
				this.mark_flag = false;
			},
			quit() {
				var data = {
				  	"token": this.$store.state.token,
				}
				this.$http.post(this.$store.state.link + "/sso/v2/doLogout", data).then(res => {
					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						window.localStorage.removeItem("token");
						window.localStorage.removeItem("userId");
						window.localStorage.removeItem("isBindWeChat");
						if (localStorage.BrokerId) {
							window.localStorage.removeItem("BrokerId");
						}
						this.$store.dispatch("changeLoginId", '0');
						this.$store.dispatch("changeToken", '')
						this.$store.dispatch("changeUserId", '')
						this.$store.dispatch("changeUserInfoData", {})
						this.$store.dispatch("changeBrokerInfoData", {})
						this.$router.push('/home');
					} else {
						window.localStorage.removeItem("token");
						window.localStorage.removeItem("userId");
						window.localStorage.removeItem("isBindWeChat");
						if (localStorage.BrokerId) {
							window.localStorage.removeItem("BrokerId");
						}
						this.$store.dispatch("changeLoginId", '0');
						this.$store.dispatch("changeToken", '')
						this.$store.dispatch("changeUserId", '')
						this.$store.dispatch("changeUserInfoData", {})
						this.$store.dispatch("changeBrokerInfoData", {})
						this.$router.push('/home');
					}
				}, res => {
					console.log(res.data)
				})
			},
			cancel() {
				this.mark_flag = true;
			}
		}
	}
</script>

<style scoped="scoped">
	.my_body {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	
	.my_div_icon {
		width: 100%;
		height: 3.4rem;
		background: #f8f8f8;
		padding-top: 0.5rem;
	}
	
	.my_div_icontop {
		width: 2.2rem;
		height: 2.2rem;
		display: block;
		margin: 0 auto;
	}
	
	.my_img_icon {
		display: block;
		width: 2.2rem;
		height: 2.2rem;
		border: 0.04rem solid #000000;
		border-radius: 50%;
		box-shadow: 0rem 0.2rem 0.2rem #eeeeee;
	}
	
	.my_div_name {
		margin-top: 0.32rem;
		text-align: center;
		font-size: 0.48rem;
		color: #222222;
	}
	
	.my_div_itemall {
		width: 100%;
		height: 1.12rem;
		background: #ffffff;
		border-bottom: 0.01rem solid #EEEEEE;
	}
	
	.my_img_itemicon {
		display: block;
		float: left;
		margin-top: 0.27rem;
		width: 0.58rem;
		height: 0.58rem;
		margin-left: 0.4rem;
	}
	
	.my_img_itemname {
		display: block;
		float: left;
		font-size: 0.28rem;
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
		width: 6.66rem;
		height: 0.72rem;
		margin: 0 auto;		
		margin-top: 1.2rem;
		line-height: 0.72rem;
		font-size: 0.24rem;
		color: #FFFFFF;
		text-align: center;
		background: #E73748;
		border-radius: 0.08rem;
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
		height: 3rem;
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
	
	.index_con {
		float: left;
		width: 2rem;
		height: 0.72rem;
		line-height: 0.72rem;
		margin-top: 0.8rem;
		font-size: 0.28rem;
		border-radius: 0.08rem;
		text-align: center;
		color: #FFFFFF;
		background: #E73748;
	}
	
	.index_canel {
		float: right;
		width: 2rem;
		height: 0.72rem;
		line-height: 0.72rem;
		margin-top: 0.8rem;
		font-size: 0.28rem;
		border-radius: 0.08rem;
		text-align: center;
		color: #FFFFFF;
		background: #E73748;
	}
	
	.index_bottom {
		padding: 0 0.4rem;
	}
	
	.index_top {
		margin-top: 0.2rem;
	}
	
	.custseven_sattus {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		z-index: 100;
		background: rgba(0, 0, 0, 0.20);
	}
	
	.cs_div_centen {
		overflow: hidden;
		width: 5.42rem;
		height: 3.56rem;
		margin: 0 auto;
		margin-top: 50%;
		border-radius: 0.16rem;
		background: rgba(248, 248, 248, 0.90);
		border-radius: 0.26rem;
		position: relative;
	}
	
	.cs_div_opentitle {
		width: 100%;
		height: 0.36rem;
		text-align: center;
		font-size: 0.32rem;
		color: #222222;
		font-weight: bold;
		margin-top: 0.32rem;
	}
	
	.cs_div_openiput {
		width: 4.76rem;
		height: 1.23rem;
		margin: 0 auto;
		margin-top: 0.38rem;
		border: 0.01rem solid #8E8E93;
	}
	
	.cs_btn_bootom {
		width: 5.42rem;
		height: 0.89rem;
		position: absolute;
		bottom: 0;
		border-top: 0.01rem solid #CCCCCC;
	}
	
	.cs_btn_cancercust {
		display: block;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
		border-right: 0.01rem solid #CCCCCC;
	}
	
	.cs_div_openiput1 {
		width: 4.76rem;
		height: 1.23rem;
		margin: 0 auto;
		margin-top: 0.38rem;
		padding: 0 0.3rem 0 0.3rem;
	}
	
	.cust_p {
		line-height: 0.4rem;
		text-align: justify;
	}
	
	.custseven_sattus {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		z-index: 100;
		background: rgba(0, 0, 0, 0.31);
	}
	
	.cs_div_centen {
		overflow: hidden;
		width: 5.42rem;
		height: 3.56rem;
		margin: 0 auto;
		margin-top: 50%;
		border-radius: 0.16rem;
		background: rgba(248, 248, 248, 0.90);
		border-radius: 0.26rem;
		position: relative;
	}
	
	.cs_div_opentitle {
		width: 100%;
		height: 0.36rem;
		text-align: center;
		font-size: 0.32rem;
		color: #222222;
		font-weight: bold;
		margin-top: 0.32rem;
	}
	
	.cs_div_openiput1 {
		width: 4.76rem;
		height: 1.23rem;
		margin: 0 auto;
		margin-top: 0.38rem;
		padding: 0 0.3rem 0 0.3rem;
	}
	
	.cust_p {
		text-align: justify;
	}
	
	.cs_btn_bootom {
		width: 5.42rem;
		height: 0.89rem;
		position: absolute;
		bottom: 0;
		border-top: 0.01rem solid #CCCCCC;
	}
	
	.cs_btn_cancer1 {
		display: block;
		float: left;
		width: 2.69rem;
		height: 0.88rem;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
		border-right: 0.01rem solid #CCCCCC;
	}
	
	.cs_btn_bg {
		display: block;
		float: left;
		height: 0.88rem;
		width: 0.01rem;
		background: #CCCCCC;
	}
	
	.cs_btn_cancer2 {
		display: block;
		float: left;
		width: 2.69rem;
		height: 0.88rem;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
		font-weight: bold;
	}
	
	.blur_all {
		width: 100%;
		height: 100%;
	}
	
	.blur_all1 {
		filter: blur(0.18rem);
	}
</style>