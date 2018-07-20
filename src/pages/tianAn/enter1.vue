<template>
	<div>
		<div v-if="!pdfFlag" class="ctc_div_mask">
			<Pdf :pdf="pdf" @pdfClose="pdfClose"></Pdf>
		</div>
		<div v-if="mark_flag" class="cs_div_centenall" @touchmove.prevent>
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">回执成功</div>
				<div class="cs_div_openiput">
					恭喜你回执成功
				</div>
				<div class="cs_btn_bootom">
					<div @click="cancel" class="cs_btn_cancer">知道了</div>
					<!--<div @click="cancel" class="cs_btn_cancer">确定</div>-->
				</div>
			</div>
		</div>
		<div ref="bg" class="bg">
			<div :class="{center:blur} ">
				<div class="file">
					<div class="file_title">保险单送达确认书</div>
					<div class="file_hr"></div>
					<div class="file_pdf">
						<div class="pdf_one">天安人寿保险单送达确认书</div>
						<div class="pdf_two">
							<p>先要预览才可以进行其他操作，不然其他功能无法进行操作</p>
						</div>
					</div>
					<div class="file_hr"></div>
					<div class="file_look" @click="preview" v-model="enterss">
						<div class="look">预览</div>
						<img src="/static/img/right_privew.png" alt="" />
					</div>
				</div>
				<div class="sign" @click="handleClickSign">
					<img v-if="sign" class="signPhoto" :code="code" :src="signPhoto" alt="" /> 点击签字
				</div>
				<div class="context">
					本人确认上述信息的真是、准确和完整，且当这些信息发生变更时，将在30日内通知贵机构，否则本人承担由此造成的不利后果。
				</div>
				<p class="inputGrop clearFloat">
					<input type="tel" class="inputText left" v-model="validata" placeholder="短信验证码" />
					<span class="inputLabel right" v-show="show" @click="handleGetCode">{{resettxt}}</span>
					<span class="inputLabel right" v-show="!show" @click="handleGetCode">{{count}}s后重发</span>
				</p>
				<p class="pushBox">
					<span @click="Additional_risk" class="pushBtn">提交</span>
				</p>
				<!--<div class="btn">
				<div class="last" @click="back">上一步</div>
				<div class="next" @click="next">下一步</div>
			</div>-->
			</div>

			<div class="signatureBox" :class="{active:mask}">
				<div class="visaDetailTop">
					<p class="visaTitle">电子签名</p>
				</div>
				<div class="canvasBox" ref="canvasHW">
					<canvas @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' ref="canvasF" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp"></canvas>
					<div class="btnBox">
						<button class="last" @click="overwrite">重写</button>
						<button class="next" @click="handleClickPush">确定</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import Pdf from '@/components/pdf.vue'
	export default {
		name: "Code",
		data() {
			return {
				mark_flag: false,
				points: [],
				canvasTxt: null,
				startX: 0,
				startY: 0,
				moveY: 0,
				moveX: 0,
				endY: 0,
				endX: 0,
				w: null,
				h: null,
				isDown: false,
				mask: false,
				blur: false,
				flag: false,
				sign: false,
				signPhoto: "",
				show: true,
				count: '',
				timer: null,
				resettxt: "获取验证码",
				enterss: "", //预览
				pdfFlag: true,
				pdf: "",
				ispdf: false,
				code: "",
				validata: "",
				smsvalidata:""
			}
		},
		created() {
			this.entercreat1();
//			var signdata = [{
//				"tmId": "TM0007"
//			}]
//
//			console.log(signdata);
//			Indicator.open();
//			this.$http.post(this.$store.state.link + '/css/css/queryTemplateByTmIdList', signdata)
//				.then(res => {
//					console.log(res.data)
//					if(res.data.code == "SYS_S_000") {
//						this.enterss = res.data.output[0].tmFmsUrl;
//						
//
//					}
//
//					Indicator.close();
//				}, res => {
//					Indicator.close();
//
//				})
		},
		mounted() {
			let canvas = this.$refs.canvasF;
			canvas.height = this.$refs.canvasHW.offsetHeight
			canvas.width = this.$refs.canvasHW.offsetWidth
			this.canvasTxt = canvas.getContext("2d");
		},
		methods: {
			pdfClose(...data) {
				this.pdfFlag = data[0]
			},
			preview() {
				this.pdfFlag = false;
				this.pdf = this.enterss;
				this.ispdf = true;
			},
			entercreat1() {

				var data = {
					"address": this.$route.query.address,
					"agentName": this.$route.query.agentName,
					"appName": this.$route.query.appName,
					"applNo": this.$route.query.applNo,
					"brokerId": this.$route.query.brokerId,
					"organV2Address": this.$route.query.serviceAddress,
					"phone": this.$route.query.phonenum,
					"pkgNo": this.$route.query.pkgNo,
					"imageApp":"",
					"policyId":this.$route.query.policyno,
					"signTime": "",
					"userId": this.$store.state.userId,
					"zipCode": this.$route.query.zipCode
				}
				console.log(data)
				this.$http.post(this.$store.state.link + '/css/css/saveReceipt', data).then(response => {
					console.log(response.data)
					if(response.data.code == "SYS_S_000") {
						this.enterss = response.data.output.tmFmsUrl;
					}
				}, response => {
					console.log("ajax error");
				});
			},
			entercreat() {

				var data = {
					"address": this.$route.query.address,
					"agentName": this.$route.query.agentName,
					"appName": this.$route.query.appName,
					"applNo": this.$route.query.applNo,
					"brokerId": this.$route.query.brokerId,
					"organV2Address": this.$route.query.serviceAddress,
					"phone": this.$route.query.phonenum,
					"pkgNo": this.$route.query.pkgNo,
					"imageApp":this.code,
					"policyId": this.$route.query.policyno,
					"signTime": "",
					"userId": this.$store.state.userId,
					"zipCode": this.$route.query.zipCode
				}
				console.log(data)
				this.$http.post(this.$store.state.link + '/css/css/saveReceipt', data).then(response => {
					console.log(response.data)
					if(response.data.code == "SYS_S_000") {
						this.enterss = response.data.output.tmFmsUrl;
					}
				}, response => {
					console.log("ajax error");
				});
			},
			handleGetCode() {
				if(this.ispdf == false){
					Toast("请先预览合同")
				}else if(this.code==""){
					Toast("请先签名");
				}else{
					
			
				this.entercreat();
				var data = {
					"groupCode": "QTB",
					"mobile": this.$route.query.phonenum,
					"sceneCode": "tiananReceipt",
					"exSystem": "QTBApp",
					"exSeq": new Date().getTime(),
					"sendWhen": "I",
					"param": {}
				}
				console.log(data)
				this.$http.post(this.$store.state.link + '/sms/sendsmscode', data).then(response => {
					if(response.data.code == "SYS_S_000") {
						this.smsvalidata=response.data.output
						const TIME_COUNT = 60;
						if(!this.timer) {
							Toast('验证码已发送至' + this.$route.query.phonenum, +'请注意查收');
							this.count = TIME_COUNT;
							this.show = false;
							this.timer = setInterval(() => {
								if(this.count > 0 && this.count <= TIME_COUNT) {
									this.count--;
								} else {
									this.resettxt = "重新获取";
									this.show = true;
									clearInterval(this.timer);
									this.timer = null;
								}
							}, 1000)
						}
					}
					console.log(response.data)
				}, response => {
					console.log("ajax error");
				});
			}
			},

			Additional_risk() {
				
				if(this.ispdf == false) {
					Toast("请先预览合同");
				} else if(this.code == "") {
					Toast("请先签字");
				} else if(this.validata == "") {
					Toast("请先输入短信验证码");
				}else if(this.validata!=this.smsvalidata){
					Toast("请输入正确短信验证码");
				}
				else {
					this.mark_flag = true;
					var receiptdata = {
						"head": {
							"channelCode": "qtb_h5",
							"deptCode": this.$route.query.deptCode,
							"oprCode": this.$store.state.userId,
							"prodCode": this.$route.query.prodCode
						},
						"userId": this.$store.state.userId,
						"token": this.$store.state.token,
						"pkgNo": this.$route.query.pkgNo,
						"plcyNo": this.$route.query.applNo
					}
					console.log(receiptdata);
					Indicator.open();
					this.$http.post(this.$store.state.link + "/trd/receipt/v1/apply", receiptdata)
						.then(res => {
							Indicator.close();
							console.log(res.data);
							var dataCode = res.data.code;
							if(dataCode == "SYS_S_000") {
								
							}
						}, res => {
							Indicator.close();
							console.log(res.data);
						})
				}

			
		},
		cancel() {
			this.mark_flag = false;
//			window.history.go(-1)
		},
		back() {
			window.history.go(-1)
		},
		next() {
			this.$router.push('/customer')
		},
		handleClickSign() {
			this.$refs.bg.style.position = "fixed"
			this.mask = true
			this.blur = true
		},
		//电脑设备事件
		mouseDown(ev) {
			ev = ev || event;
			ev.preventDefault();
			console.log(ev);
			if(1) {
				let obj = {
					x: ev.offsetX,
					y: ev.offsetY
				};
				console.log(obj);
				this.startX = obj.x;
				this.startY = obj.y;
				this.canvasTxt.beginPath();
				this.canvasTxt.moveTo(this.startX, this.startY);
				this.canvasTxt.lineTo(obj.x, obj.y);
				this.canvasTxt.stroke();
				this.canvasTxt.closePath();
				this.points.push(obj);
				this.isDown = true;
			}
		},
		//移动设备事件
		touchStart(ev) {
			ev = ev || event;
			ev.preventDefault();
			if(ev.touches.length == 1) {
				let obj = {
					x: ev.targetTouches[0].clientX,
					y: ev.targetTouches[0].clientY - 40
				};
				this.startX = obj.x;
				this.startY = obj.y;
				this.canvasTxt.beginPath();
				this.canvasTxt.moveTo(this.startX, this.startY);
				this.canvasTxt.lineTo(obj.x, obj.y);
				this.canvasTxt.stroke();
				this.canvasTxt.closePath();
				this.points.push(obj);
			}
		},
		//电脑设备事件
		mouseMove(ev) {
			ev = ev || event;
			ev.preventDefault();
			if(this.isDown) {
				let obj = {
					x: ev.offsetX,
					y: ev.offsetY
				};
				this.moveY = obj.y;
				this.moveX = obj.x;
				this.canvasTxt.beginPath();
				this.canvasTxt.moveTo(this.startX, this.startY);
				this.canvasTxt.lineTo(obj.x, obj.y);
				this.canvasTxt.stroke();
				this.canvasTxt.closePath();
				this.startY = obj.y;
				this.startX = obj.x;
				this.points.push(obj);
			}
		},
		//移动设备事件
		touchMove(ev) {
			ev = ev || event;
			ev.preventDefault();
			if(ev.touches.length == 1) {
				let obj = {
					x: ev.targetTouches[0].clientX,
					y: ev.targetTouches[0].clientY - 40
				};
				this.moveY = obj.y;
				this.moveX = obj.x;
				this.canvasTxt.beginPath();
				this.canvasTxt.moveTo(this.startX, this.startY);
				this.canvasTxt.lineTo(obj.x, obj.y);
				this.canvasTxt.stroke();
				this.canvasTxt.closePath();
				this.startY = obj.y;
				this.startX = obj.x;
				this.points.push(obj);
			}
		},
		//电脑设备事件
		mouseUp(ev) {
			ev = ev || event;
			ev.preventDefault();
			if(1) {
				let obj = {
					x: ev.offsetX,
					y: ev.offsetY
				};
				this.canvasTxt.beginPath();
				this.canvasTxt.moveTo(this.startX, this.startY);
				this.canvasTxt.lineTo(obj.x, obj.y);
				this.canvasTxt.stroke();
				this.canvasTxt.closePath();
				this.points.push(obj);
				this.points.push({
					x: -1,
					y: -1
				});
				this.isDown = false;
			}
		},
		//移动设备事件
		touchEnd(ev) {
			ev = ev || event;
			ev.preventDefault();
			console.log(ev);
			if(ev.touches.length == 1) {
				let obj = {
					x: ev.targetTouches[0].clientX,
					y: ev.targetTouches[0].clientY - 40
				};
				this.canvasTxt.beginPath();
				this.canvasTxt.moveTo(this.startX, this.startY);
				this.canvasTxt.lineTo(obj.x, obj.y);
				this.canvasTxt.stroke();
				this.canvasTxt.closePath();
				this.points.push(obj);
				this.points.push({
					x: -1,
					y: -1
				});
			}
			this.flag = true
		},
		//重写
		overwrite() {
			this.flag = false
			this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height);
			this.points = [];
		},
		handleClickPush() {
			if(this.flag) {
				var image = new Image();
				image.src = this.$refs.canvasF.toDataURL("image/png")
				this.signPhoto = image.src
				this.sign = true
				this.mask = false
				this.$refs.bg.style.position = "absolute"
				this.blur = false
				this.pushImg(image.src)
			} else {
				Toast("请签名后提交")
			}

		},
		pushImg(data) {
			var a = data.split(";")[0].split("/")[1];
			var base64Info = {
				"fileType": a,
				"imgList": [
					data
				],
				"uploadType": "2024"
			}

			this.$http.post(this.$store.state.link2 + '/fastdfs/filebase64', base64Info)
				.then(res => {
					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						this.signPhoto = data
						this.code = res.data.output[0].fileSerialNo
						

					} else {
						Toast("上传发生错误，请重新上传")
					}

					Indicator.close();
				}, res => {
					Indicator.close();
					console.log("上传图片错误");
				})

		}
	},
	components: {
		Pdf: Pdf
	}
	}
</script>

<style scoped="scoped">
	.cs_btn_bootom {
		width: 5.42rem;
		height: 0.89rem;
		position: absolute;
		bottom: 0;
		border-top: 0.01rem solid #CCCCCC;
	}
	
	.cs_btn_cancer {
		display: block;
		float: left;
		width: 5.42rem;
		height: 0.88rem;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
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
	
	.cs_btn_bg {
		display: block;
		float: left;
		height: 0.88rem;
		width: 0.01rem;
		background: #CCCCCC;
	}
	
	.cs_div_centenall {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		z-index: 100;
		background: rgba(0, 0, 0, 0.20);
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
		height: 0.5rem;
		margin: 0 auto;
		margin-top: 0.38rem;
		text-align: center;
		/*border: 0.01rem solid #8E8E93;*/
	}
	
	.pushBtn {
		display: block;
		width: 6.7rem;
		height: 0.88rem;
		margin: 0.4rem auto;
		line-height: 0.88rem;
		font-size: 0.28rem;
		color: #FFFFFF;
		background: #54CCC1;
		border-radius: 0.16rem;
		text-align: center;
	}
	
	.right {
		float: right;
	}
	
	.center {
		filter: blur(.1rem);
	}
	
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
		background: #F3F3F3;
		border: none;
		margin-left: 0.5rem;
	}
	
	.inputGrop {
		position: relative;
		height: 0.88rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	
	.cs_div_centenall {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		z-index: 100;
		background: rgba(0, 0, 0, 0.20);
	}
	
	.cs_popup_bottombg {
		width: 100%;
		height: 0.02rem;
		background: #EEEEEE;
		margin-bottom: 0.3rem;
	}
	
	.cs_popup_topbtncancel {
		display: block;
		float: left;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.84rem;
		margin-left: 0.32rem;
	}
	
	.cs_popup_topbtnok {
		display: block;
		float: right;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.84rem;
		margin-right: 0.32rem;
	}
	
	.cs_popup_bottom {
		width: 100%;
		height: 5rem;
		background: #FFFFFF;
		position: absolute;
		bottom: 0;
	}
	
	.cs_popup_topbtn {
		width: 100%;
		height: 0.84rem;
		/*background: #669900;*/
	}
	
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	
	.bg {
		position: absolute;
		height: 100%;
		width: 100%;
		background: #F3F3F3;
	}
	
	.file {
		width: 6.44rem;
		height: 3.56rem;
		margin-top: 0.4rem;
		margin: 0.4rem auto;
		background: #FFFFFF;
		border-radius: 8px;
	}
	
	.file_title {
		font-family: PingFangSC-Regular;
		height: 0.7rem;
		line-height: 0.7rem;
		margin-top: 0.28rem;
		font-size: 0.28rem;
		color: #555555;
		text-align: center;
		letter-spacing: 0;
	}
	
	.inputLabel {
		display: block;
		width: 2.04rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
	}
	
	.file_hr {
		border: 1px solid #EEEEEE;
	}
	
	.file_pdf {
		height: 2.04rem;
		margin-top: 0.2rem;
		font-family: PingFangSC-Regular;
		font-size: 0.28rem;
		color: #777777;
		letter-spacing: 0;
	}
	
	.pdf_one {
		height: 0.4rem;
		line-height: 0.4rem;
		margin-bottom: 0.2rem;
		margin-left: 0.32rem;
	}
	
	.pdf_two {
		height: 0.5rem;
		line-height: 0.5rem;
		margin-left: 0.32rem;
		margin-right: 0.24rem;
	}
	
	.file_look {
		height: 0.7rem;
	}
	
	.look {
		height: 0.9rem;
		line-height: 0.7rem;
		float: left;
		margin-left: 0.32rem;
		font-family: PingFangSC-Medium;
		font-size: 0.28rem;
		color: #EB7760;
		letter-spacing: 0;
	}
	
	.file_look img {
		width: 0.56rem;
		height: 0.56rem;
		float: right;
		margin-right: 0.24rem;
	}
	
	.sign {
		width: 6.44rem;
		height: 3.56rem;
		margin: 0 auto 0.32rem;
		font-size: 0.4rem;
		line-height: 3.56rem;
		text-align: center;
		color: #EB7760;
		letter-spacing: 0;
		background: #FFFFFF;
		border-radius: .16rem;
		overflow: hidden;
	}
	
	.context {
		width: 6.38rem;
		height: 1.02rem;
		/*border: 0.01rem solid red;*/
		margin: 0 auto 0.32rem;
		font-family: PingFangSC-Regular;
		font-size: 0.24rem;
		line-height: 0.34rem;
		color: #FEA231;
		letter-spacing: -0.29px;
	}
	
	.me {
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
		background: #FFFFFF;
		font-family: PingFangSC-Medium;
		font-size: 0.28;
		color: #555555;
		letter-spacing: 0;
	}
	
	.me p {
		margin-left: 0.32rem;
	}
	
	.btn {
		width: 6.64rem;
		height: 0.88rem;
		margin: 1.02rem auto 0rem;
	}
	
	.btn .last {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 0.32rem;
		color: #EB7760;
		letter-spacing: 0;
		border: 1px solid #EB7760;
		border-radius: 22px;
		float: left;
	}
	
	.btn .next {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 0.32rem;
		color: #EB7760;
		letter-spacing: 0;
		border: 1px solid #EB7760;
		border-radius: 22px;
		float: right;
	}
	
	.signatureBox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.20);
		z-index: -1;
		display: flex;
		flex-direction: column;
		opacity: 0;
	}
	
	.active {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.20);
		z-index: 100;
		display: flex;
		flex-direction: column;
		opacity: 1;
	}
	
	.visaDetailTop {
		/*position: absolute;*/
		/*top: 0px;*/
		/*left: 0px;*/
		width: 100%;
		/*overflow: hidden;*/
		box-sizing: border-box;
		z-index: 2;
		border-bottom: 1px solid #e5e5e5;
	}
	
	.visaDetailTop p {
		margin: 0px;
		text-align: center;
		color: #000;
		font-size: 1em;
		position: relative;
	}
	
	p.visaTitle {
		width: 100%;
		position: absolute;
		top: 5px;
		left: 0px;
		text-align: center;
		font-size: 1.2em;
	}
	
	.btnBack {
		display: block;
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		z-index: 1;
		background: transparent;
		border-color: transparent;
		outline: none;
	}
	
	.btnDaoHang {
		display: block;
		position: absolute;
		left: 0px;
		top: 0px;
		height: 2.2em;
		width: 2em;
		z-index: 1;
		background: transparent;
		border-color: transparent;
		outline: none;
	}
	
	.visaDetailTop p span {
		color: #fff;
		font-size: 1.2em;
	}
	
	.visaDetailTop p:first-of-type {
		float: left;
	}
	
	.visaDetailTop p:nth-of-type(2) {
		float: right;
	}
	
	.canvasBox {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		flex: 1;
	}
	
	canvas {
		background: #fff;
		margin: 0 auto;
	}
	
	.btn {
		width: 100;
	}
	
	.btnBox {
		width: 100%;
		position: absolute;
		bottom: 1.2rem;
	}
	
	.last {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 0.32rem;
		color: #EB7760;
		letter-spacing: 0;
		border: 1px solid #EB7760;
		border-radius: .44rem;
		float: left;
		margin-left: .3rem;
		background: #fff;
	}
	
	.next {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 0.32rem;
		color: #EB7760;
		letter-spacing: 0;
		border: 1px solid #EB7760;
		border-radius: .44rem;
		float: right;
		margin-right: .3rem;
		background: #fff;
	}
	
	.signPhoto {
		width: 100%;
		height: 100%;
	}
	
	.active {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.20);
		z-index: 100;
		display: flex;
		flex-direction: column;
		opacity: 1;
	}
	
	.last {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 0.32rem;
		color: #EB7760;
		letter-spacing: 0;
		border: 1px solid #EB7760;
		border-radius: .44rem;
		float: left;
		margin-left: .3rem;
	}
	
	.next {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 0.32rem;
		color: #EB7760;
		letter-spacing: 0;
		border: 1px solid #EB7760;
		border-radius: .44rem;
		float: right;
		margin-right: .3rem;
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
</style>