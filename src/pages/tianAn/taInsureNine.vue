<template>
	<div class="tain_body">
		<div v-if="!mark_flag" class="ctc_div_mask" @click="cancel" @touchmove.prevent>
			<div class="ctc_div_maskitem">
				<div class="ctc_div_labtitle">温馨提示</div>
				<div class="ctc_div_labtitle1">请点击查看各项信息，确认无误后再进行下一步操作。</div>
			</div>
		</div>
		<div class="" id="blur_all">
			<!--<div class="tain_divtopone">
				<div class="tain_p_topitem ">
					被保险人告知事项
				</div>
			</div>-->
			<div class="tain_div_top">
				<div ref="item" class="tain_p_topitem" v-for="(item,index) in alldata" @click="select_item($event,index)">
					<img class="tain_img_topitemleft" src="/static/img/icon_select1_focus.png" />
					<span class="tain_span_nameitem">{{item.name}}</span>
					<img class="tain_img_topitemright" src="/static/qijianwei/btn_next.png" />
					<component :backview="backview" v-bind:is="item.msg"></component>
				</div>
			</div>
			<div class="tain_div_btnall">
				<div @click="back" class="tain_div_btnleft">上一步</div>
				<div @click="btnnext" class="tain_div_btnright">下一步</div>
			</div>
		</div>
	</div>
</template>

<script>
	import AA from "./info1.vue"
	import BB from "./info2.vue"
	import CC from "./info3.vue"
	import DD from "./intoInfo.vue"
	import EE from "./insuranceadvice1.vue"
	import FF from "./insuranceadvice.vue"
	import GG from "./payInfo_tian.vue"
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: "taInsureNine",
		data() {
			return {
				backview: "hui",
				hei: false,
				alldata: [{
						"name": '投保人信息',
						"msg": ""
					},
					{
						"name": '被保险人信息',
						"msg": ""
					},
					{
						"name": '受益人信息',
						"msg": ""
					},
					{
						"name": '险种信息',
						"msg": ""
					},
					{
						"name": '投保人告知项',
						"msg": ""
					},
					{
						"name": '被保险人告知项',
						"msg": ""
					},
					{
						"name": '交费信息',
						"msg": ""
					}
				],
				addData: [],
				mark_flag: true
			}
		},
		methods: {
			back() {
				window.history.go(-1)
			},
			select_item(e, index) {
				console.log(index)
				var flag = false;
				if(this.addData.length == "0") {
					this.addData.push(index);
				} else {
					for(var i = 0; i < this.addData.length; i++) {
						if(this.addData[i] == index) {
							flag = true;
							break;
						} else {
							flag = false;
						}
					}
					if(flag == false) {
						this.addData.push(index);
					}
				}
				console.log(this.$refs.item[0].getElementsByClassName('tain_img_topitemright')[0].src)

				e.currentTarget.getElementsByClassName('tain_img_topitemleft')[0].style.opacity = 1;
				if(e.currentTarget.getElementsByClassName('tain_img_topitemright')[0].src.indexOf("downImg") != -1) {
					e.currentTarget.getElementsByClassName('tain_img_topitemright')[0].src = "/static/qijianwei/btn_next.png"
					e.currentTarget.setAttribute('class', "tain_p_topitem")
					this.alldata[index].msg = ""
					//e.currentTarget.getElementsByClassName('display')[0].style.display="none"
				} else {
					this.alldata[index].msg = this.session
					e.currentTarget.getElementsByClassName('tain_img_topitemright')[0].src = "/static/img/downImg.png"
					e.currentTarget.setAttribute('class', "active")
					if(index == 0) {
						this.alldata[index].msg = "Logo"
					} else if(index == 1) {
						this.alldata[index].msg = "Logo1"
					} else if(index == 2) {
						this.alldata[index].msg = "Logo2"
					} else if(index == 3) {
						this.alldata[index].msg = "Logo3"
					} else if(index == 4) {
						this.alldata[index].msg = "Logo4"
					} else if(index == 5) {
						this.alldata[index].msg = "Logo5"
					} else if(index == 6) {
						this.alldata[index].msg = "Logo6"
					}
					//e.currentTarget.getElementsByClassName('display')[0].style.display="block"
				}
				for(var i = 0; i < this.$refs.item.length; i++) {
					if(index != i) {
						this.$refs.item[i].getElementsByClassName('tain_img_topitemright')[0].src = "/static/qijianwei/btn_next.png";
						this.$refs.item[i].setAttribute('class', "tain_p_topitem")
						this.alldata[i].msg = ""
					}
				}
			},
			cancel() {
				this.mark_flag = true;
				var blur_all = document.getElementById("blur_all");
				blur_all.setAttribute("class", "blur_all");

			},
			btnnext() {
				console.log(this.$store.state.HUS)
				if(this.addData.length == this.alldata.length) {
					var data = {
						"token": this.$route.query.token,
						"userId": this.$route.query.userId,
						"head": {
							"channelCode": "qtb_h5",
							"deptCode": this.$route.query.cmpCode,
							"oprCode": this.$route.query.userId,
							"prodCode": this.$route.query.prodCode
						},
						"pkgNo": this.$route.query.orderNo //订单号
					}
					console.log("2===" + JSON.stringify(data))
					Indicator.open();
					this.$http.post(this.$store.state.link + '/trd/uc/v1/underwrite', data)
						.then(res => {
							console.log(res.data)
							Indicator.close();
							console.log("响应数据2=====" + JSON.stringify(res.data))
							var stringResult;
							if(res.data.code == "SYS_S_000") {
								//								window.localStorage.applNo = res.data.output.applNo;
								stringResult = res.data.output.message.replace(/%/g, 'aaa');
								if(stringResult == undefined) {
									stringResult = "";
								}
								console.log(this.$store.state.orderState)
								if(res.data.output.uwStatus == this.$store.state.orderState.AUF) { //核保失败
									this.$router.push('/faresult1?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&message=" + stringResult + "&token=" + this.$route.query.token)
								} else if(res.data.output.uwStatus == this.$store.state.orderState.AUC) { //核保成功
									this.$router.push('/inforUpload?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&state=" + "3" + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
								} else if(res.data.output.uwStatus == this.$store.state.orderState.HPUC || res.data.output.uwStatus == this.$store.state.HUS) { //人核保
//									alert(1)
									this.$router.push('/hbresult?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&message=" + stringResult + "&token=" + this.$route.query.token)
								} else if(res.data.output.uwStatus == this.$store.state.orderState.DECL) { //拒保
									this.$router.push('/faresult?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token + "&message=" + stringResult)
								}else{
									Toast(res.data.output.message)
								}
							} else {
								stringResult = res.data.desc;
								if(stringResult == undefined) {
									stringResult = "";
								}
								this.$router.push('/faresult1?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&message=" + stringResult + "&token=" + this.$route.query.token)
							}
						}, res => {
							Indicator.close();
							console.log(res.data);
						})
				} else {
					this.mark_flag = false;
					var blur_all = document.getElementById("blur_all");
					blur_all.setAttribute("class", "blur_all1");
				}
			}
		},
		components: {
			Logo: AA,
			Logo1: BB,
			Logo2: CC,
			Logo3: DD,
			Logo4: EE,
			Logo5: FF,
			Logo6: GG,
		}
	}
</script>

<style scoped="scoped">
	.display {
		display: none;
	}
	
	.ha {
		width: 100%;
		height: 4rem;
	}
	
	.blur_all {
		filter: blur(0);
	}
	
	.blur_all1 {
		filter: blur(0.18rem);
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
	
	.ctc_div_labtitle {
		width: 100%;
		margin: 0 auto;
		font-size: 0.32rem;
		text-align: center;
		color: #222222;
	}
	
	.ctc_div_labtitle1 {
		width: 4.8;
		padding: 0 0.32rem;
		margin: 0 auto;
		font-size: 0.28rem;
		line-height: 0.36rem;
		color: #555555;
		margin-top: 0.38rem;
	}
	
	.ctc_div_maskitem {
		width: 5.44rem;
		height: 1.9rem;
		background: #ffffff;
		margin: 0 auto;
		margin-top: 50%;
		border-radius: 0.16rem;
		padding-top: 0.48rem;
	}
	
	.tain_divtoponea {
		width: 6.7rem;
		height: 100%;
		margin: 0 auto;
		border-bottom: 0.02rem solid #C8C7CC;
	}
	
	.tain_divtopone {
		width: 100%;
		height: 0.84rem;
		background: #FFFFFF;
		padding-top: 0.12rem;
	}
	
	.tain_div_btnright {
		display: block;
		float: right;
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.86rem;
		margin-right: 0.48rem;
		border: 0.01rem solid #EB7760;
		border-radius: 0.44rem;
		text-align: center;
		color: #EB7760;
		font-size: 0.32rem;
	}
	
	.tain_div_btnleft {
		display: block;
		float: left;
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.86rem;
		margin-left: 0.48rem;
		border: 0.01rem solid #EB7760;
		border-radius: 0.44rem;
		text-align: center;
		color: #EB7760;
		font-size: 0.32rem;
	}
	
	.tain_div_btnall {
		width: 100%;
		height: 0.88rem;
		position: absolute;
		bottom: 0.64rem;
		z-index: 1;
	}
	
	.tain_body {
		width: 100%;
		height: 100%;
		position: absolute;
		background: #F3F3F3;
	}
	
	.tain_div_top {
		width: 100%;
		background: #FFFFFF;
	}
	
	.tain_div_top :last-child {
		/*border-bottom: 0;*/
	}
	
	.tain_p_top {
		width: 6.7rem;
		height: 0.86rem;
		margin: 0 auto;
		border-bottom: 0.02rem solid #C8C7CC;
	}
	
	.tain_p_topitem {
		display: block;
		width: 7.5rem;
		height: 0.83rem;
		margin: 0 auto;
		border-bottom: 0.01rem solid #C8C7CC;
		font-size: 0.36rem;
		line-height: 0.83rem;
		color: #222222;
	}
	
	.active {
		display: block;
		width: 7.5rem;
		min-height: 0.83rem;
		margin: 0 auto;
		border-bottom: 0.01rem solid #C8C7CC;
		/*font-size: 0.36rem;
		line-height: 0.83rem;
		color: #222222;*/
	}
	
	.tain_p_topitemend {
		display: block;
		width: 6.7rem;
		height: 0.86rem;
		margin: 0 auto;
	}
	
	.tain_span_name {
		width: 100%;
		height: 100%;
		font-size: 0.36rem;
		line-height: 0.84rem;
		color: #222222;
	}
	
	.tain_span_nameitem {
		width: 100%;
		height: 100%;
		font-size: 0.28rem;
		line-height: 0.84rem;
		color: #555555;
		margin-left: 0.02rem;
	}
	
	.tain_img_topitemleft {
		display: block;
		float: left;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: 0.2rem;
		opacity: 0;
	}
	
	.tain_img_topitemleft1 {
		display: block;
		float: left;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: 0.2rem;
		opacity: 1;
	}
	
	.tain_img_topitemright {
		display: block;
		float: right;
		width: 0.56rem;
		height: 0.56rem;
		margin-top: 0.16rem;
	}
</style>