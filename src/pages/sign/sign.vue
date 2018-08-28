<template>
	<div class="background" ref="bg">
		<div v-if="!pdfFlag" class="ctc_div_mask">
			<Pdf :pdf="pdf" @pdfClose="pdfClose"></Pdf>
		</div>
		<div class="bg">

		</div>
		<div class="top">
			<img class="logo" @click="ret" src="/static/img/sign/mdlogo.png" alt="" />
		</div>
		<p class="title">签字之前须预览以下协议！</p>
		<ul class="list">
			<li style="margin-left: 0; " v-model="singindexss" @click="siginclick"></li>
			<li v-model="singindex1ss" @click="siginclick1"></li>
			<li v-model="singindex2ss" @click="siginclick2"></li>

		</ul>
		<ul class="listss">
			<li style="margin-left: 0; ">保险委托销售合同</li>
			<li>诚信展业承诺书</li>
			<li>合规展业承诺书</li>
		</ul>
		<div class="sign" @click="handleClickSign">
			<p class="mem"></p>
			<img v-if="sign" class="signPhoto" :src="signPhoto" :code="code" alt="" />申请人签字
		</div>
		<div class="btn">
			<div class="left" @click="handleClickUp">
				上一步
			</div>
			<div class="right" @click="handleClickNext">
				下一步
			</div>
		</div>
		<div ref="styles1" class="bot">
			<p class="insuracce">本次签字适用于 《委托销售合同》</br>
				《诚信展业承诺书》《合规展业承诺书》</p>
		</div>
		<div class="signatureBox" :class="{active:mask}">
			<div class="visaDetailTop">
				<p class="visaTitle">电子签名</p>
			</div>
			<div class="canvasBox" ref="canvasHW">
				<canvas @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' ref="canvasF" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp"></canvas>

				<div class="btnBox">
					<div class="last" @click="overwrite">
						重写
					</div>
					<div class="next" @click="handleClickPush">
						确定
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from "mint-ui"
	import { Indicator } from "mint-ui"
	import Pdf from '@/components/pdf.vue'
	export default {
		name: "sign",
		data() {
			return {
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
				code: "",
				flag: false,
				sign: false,
				singindexss: "",
				singindex1ss: "",
				singindex2ss: "",
				pdfFlag: true,
				pdf: "",
				falg: false,
				falg1: false,
				falg2: false,
			}
		},
		created() {
		this.creatsign()
			var signdata = [{
				"tmId": "TM0004"
			}, {
				"tmId": "TM0005"
			}, {
				"tmId": "TM0006"
			}]

			console.log(signdata);
			Indicator.open();
			this.$http.post(this.$store.state.link + '/css/css/queryTemplateByTmIdList', signdata)
				.then(res => {
					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						this.singindexss = res.data.output[2].tmFmsUrl;
						this.singindex1ss = res.data.output[0].tmFmsUrl;
						this.singindex2ss = res.data.output[1].tmFmsUrl;

					}

					Indicator.close();
				}, res => {
					Indicator.close();

				})

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
			creatsign(){
				if(this.$route.query.status == "2") {
					var data = {
						"brokerId": this.$route.query.brokerId

					}
					Indicator.open();
				this.$http.post(this.$store.state.link + '/core/broker/findBrokerByBrokId', data)
				.then(res => {
					console.log("==="+JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {						
						this.signPhoto=res.data.output.brokerImg.sign;						
						this.sign = true
						this.mask = false
						this.falg = true;
						this.falg1 = true;
						this.falg2 = true;
						this.code=res.data.output.brokerImg.sign
					}

					Indicator.close();
				}, res => {
					Indicator.close();

				})
				}

			},
			siginclick() {
				this.pdfFlag = false
				this.pdf = this.singindexss
				this.falg = true;
				console.log(this.falg);
			},
			siginclick1() {
				this.pdfFlag = false
				this.pdf = this.singindex1ss
				this.falg1 = true;
				console.log(this.falg1);
			},
			siginclick2() {
				this.pdfFlag = false
				this.pdf = this.singindex2ss
				this.falg2 = true;
				console.log(this.falg2);
			},
			handleClickNext() {

				if(this.code == "") {
					Toast("请签字");
				} else {
					var data = {
						"sign": this.code

					}
					this.$store.dispatch("changeSign", data)
					this.$router.push('/confirmation?brokerId=' + this.$route.query.brokerId)
				}

			},
			handleClickUp() {
				window.history.go(-1)
			},
			handleClickSign() {
				if(this.falg == true && this.falg1 == true && this.falg2 == true) {
					this.mask = true
				} else {
					Toast("请先预览合同");
				}

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
						y: ev.targetTouches[0].clientY - 30
					};
					console.log(obj)
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
						y: ev.targetTouches[0].clientY - 30
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
						y: ev.targetTouches[0].clientY - 30
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
					//										this.blur = false
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
							this.code = res.data.output[0].fileSerialNo
							

						} else {
							Toast("上传发生错误，请重新上传")
						}

						Indicator.close();
					}, res => {
						Indicator.close();
						console.log("上传图片错误");
					})

			},
			ret() {
				alert(1)
				//				return false
			}

		},
		components: {
			Pdf: Pdf
		}
	}
</script>

<style scoped="scoped">
	.background {
		width: 100%;
		height: 100%;
		background-size: cover;
		overflow: hidden;
		font-family: "宋体";
		padding-bottom: .38rem;
	}
	
	.bg {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: url(/static/img/sign/bg.png) no-repeat;
		background-size: cover;
		z-index: -1;
	}
	
	.top {
		width: 6.86rem;
		height: 1.52rem;
		background: url(/static/img/sign/top.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		margin-top: .38rem;
		position: relative;
	}
	
	.logo {
		position: absolute;
		bottom: .14rem;
		width: .68rem;
		height: .52rem;
		left: 3.1rem;
	}
	
	.title {
		width: 5.6rem;
		margin: 0 auto;
		font-family: STSongti-SC-Regular;
		font-size: .24rem;
		color: #222;
		letter-spacing: 0;
		text-align: left;
		margin-top: .3rem;
	}
	
	.list {
		width: 5.6rem;
		overflow: hidden;
		margin: 0 auto;
		margin-top: .32rem;
	}
	
	.list li {
		width: 1.6rem;
		height: 1.54rem;
		background: url(/static/img/sign/item.png) no-repeat;
		background-size: contain;
		float: left;
		margin-left: .4rem;
	}
	
	.listss {
		/*width: 5.6rem;*/
		width: 6rem;
	
		margin: 0 auto;
		margin-top: .2rem;
		/*border: 1px solid red ;*/
	}
	
	.listss li {
		float: left;
		margin-left: .2rem;
		font-size: 0.24rem;
	}
	
	.sign {
		width: 5.9rem;
		height: 2.6rem;
		font-size: .28rem;
		opacity: 0.5;
		background: #FFFFFF;
		margin: 1.04rem auto 0;
		text-align: center;
		line-height: 2.6rem;
		color: #000;
		overflow: hidden;
		position: relative;
	}
	
	.mem {
		width: 5.9rem;
		height: 2.6rem;
		z-index: 100;
		position: absolute;
	}
	
	.signPhoto {
		/*width: 5.9rem;
		height: 2.6rem;
		z-index: -100;*/
		width: 100%;
		height: 100%;
		position: relative;
		z-index: -100;
	}
	
	.btn {
		width: 6.34rem;
		height: 1rem;
		background: url(/static/img/sign/btn2.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		position: relative;
		margin-top: 1.04rem;
		text-align: center;
		line-height: 1.24rem;
		font-size: .48rem;
	}
	
	.left,
	.right,
	.last,
	.next {
		width: 3.17rem;
		height: 1rem;
		font-size: .32rem;
		line-height: .96rem;
		float: left;
		text-align: center;
	}
	
	.bot {
		width: 6.86rem;
		height: 1.52rem;
		/*position: absolute;
		bottom: .32rem;*/
		height: 1.52rem;
		background: url(/static/img/sign/bot.png) no-repeat;
		background-size: contain;
		/*left: .32rem;*/
		margin: 0 auto;
		margin-top: 1.52rem;
		overflow: hidden;
	}
	
	.insuracce {
		text-align: center;
		line-height: .34rem;
		margin-top: .12rem;
	}
	
	body {
		font-family: "宋体";
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
	
	.btnBox {
		width: 100%;
		position: absolute;
		bottom: 1.2rem;
		width: 6.34rem;
		height: .96rem;
		background: url(/static/img/sign/btn2.png) no-repeat;
		background-size: contain;
		line-height: 1.24rem;
		font-size: .48rem;
		left: .58rem;
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