<template>
<div ref="bg" class="bg">
	<div :class="{center:blur}">
	<div class="face_allbg">
		<div class="recepit_all">
			<div class="recepit_div">
				<p class="recepit_policy">
					人身保险投保提示书
				</p>
				<div class="recepit_div_all">
					<div class="recepit_confirm">
						<p>尊敬的的客户：<br>
						人身保险这是一个用纯文本的简单卡片。但卡片
						可以包含自己的页头，页脚，列表视图，图像，
						和里面的任何元素。</p>
					</div>
				</div>
				<p class="recepit_policy1" @click="goPdf" v-model="enterss">
					预览
					<img class="nextImg" src="/static/img/detail.png" alt="" />
				</p>
			</div>
		</div>
		<div v-if="!pdfFlag" class="ctc_div_mask">
			<Pdf :pdf="pdf" @pdfClose="pdfClose"></Pdf>
		</div>
		<div class="recepit_all">
			<div class="recepit_div">
				<p class="recepit_policy">
					投保人（签名）
				</p>
				<div class="recepit_div_all">
					<div class="recepit_confirm sign" v-if="firstClick" @click="handleClickSign">
						<img v-if="sign" class="signPhoto" :code="code" :src="signPhoto" alt="" />
						<p v-show="signShow">点击签字</p>
					</div>
				</div>
				<p class="recepit_policy1">
					分享
					<img class="nextImg" src="/static/img/detail.png" alt="" />
				</p>
			</div>
		</div>
		
		<div class="day">签署日期：2018年8月21日（当天）</div>
		
		<div class="sBox clearFloat" @click="openClick">
			<img src="/static/noSelected.png" class="sImg" v-if="!sBoxShow" />
			<img src="/static/selected.png" class="sImg" v-if="sBoxShow" />
			<span class="sDes">我已阅读并同意
				<span class="book" style="color: #310000;">《人身保险投资提示书》</span>，了解并确认全部内容</span>
		</div>
		
		<div class="btnBox1">
			<div class="boxLast" @click="handleClickLast">上一步</div>
			<div class="boxNext" @click="handleClickNext">下一步</div>
		</div>
	</div>
	</div>
	<div class="signatureBox" :class="{active:mask}">
				<div class="visaDetailTop">
					<p class="visaTitle">电子签名</p>
				</div>
				<div class="canvasBox" ref="canvasHW">
					<canvas @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' ref="canvasF" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp" style="background: #fff;"></canvas>
					<div class="btnBox">
						<button class="last" @click="overwrite">重写</button>
						<button class="next" @click="handleClickPush">确定</button>
					</div>
				</div>
	</div>
</div>
</template>

<script>
	import Pdf from '@/components/pdf.vue'
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		name: "tips",
		data() {
			return {
			firstClick:true,
			sBoxShow: true,
			pdfFlag: true,
			enterss: "", //预览
			pdf: "",
			sign: false,
			signPhoto: "",
			code: "",
			signShow:true,
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
				show: true,
			}
		},
		created() {
			this.entercreat1();
		},
		mounted() {
			let canvas = this.$refs.canvasF;
			canvas.height = this.$refs.canvasHW.offsetHeight
			canvas.width = this.$refs.canvasHW.offsetWidth
			this.canvasTxt = canvas.getContext("2d");
			this.canvasTxt.lineWidth=5;
			this.canvasTxt.fillStyle = "#fff";
			this.canvasTxt.fillRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height);
		},
		methods: {
			goPdf(){
				this.pdfFlag = false;
				this.pdf = this.enterss;
				this.ispdf = true;
			},
			
			entercreat1() {

//				var data = {
//					"address": this.$route.query.address,
//					"agentName": this.$route.query.agentName,
//					"appName": this.$route.query.appName,
//					"applNo": this.$route.query.applNo,
//					"brokerId": this.$route.query.brokerId,
//					"organV2Address": this.$route.query.serviceAddress,
//					"phone": this.$route.query.phonenum,
//					"pkgNo": this.$route.query.pkgNo,
//					"imageApp":"",
//					"policyId":this.$route.query.policyno,
//					"signTime": "",
//					"userId": this.$store.state.userId,
//					"zipCode": this.$route.query.zipCode
//				}
//				console.log(data)
//				this.$http.post(this.$store.state.link + '/css/css/saveReceipt', data).then(response => {
//					console.log(response.data)
//					if(response.data.code == "SYS_S_000") {
//						this.enterss = response.data.output.tmFmsUrl;
//					}
//				}, response => {
//					console.log("ajax error");
//				});
			},
			handleClickSign() {
				console.log(this.$route.query.status)
				if(this.$route.query.status == undefined){
					this.$router.push('/verification?prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode)
					
				}else{
					this.$refs.bg.style.position = "fixed"
					this.mask = true
					this.blur = true
				}
				
			},
			pdfClose(...data) {
				this.pdfFlag = data[0]
			},
			openClick() {
					this.sBoxShow = !this.sBoxShow;
				},
			handleClickLast(){
				window.history.go(-1)
			},
			handleClickNext(){
				alert(111)
			},
			toVerification(){
				this.$router.push("/verification")
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
				this.canvasTxt.lineWidth = 5;
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
				this.canvasTxt.lineWidth = 5;
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
				this.canvasTxt.lineWidth = 5;
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
				this.canvasTxt.lineWidth = 5;
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
				this.canvasTxt.lineWidth = 5;
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
				this.canvasTxt.lineWidth = 5;
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
				this.signShow = false
			} else {
				Toast("请签名后提交")
			}

		},
		compress(img, Orientation) {
				let canvas = document.createElement("canvas");
				let ctx = canvas.getContext('2d');
				//瓦片canvas  
				let tCanvas = document.createElement("canvas");
				let tctx = tCanvas.getContext("2d");
				let initSize = img.src.length;
				let width = img.width;
				let height = img.height;
				//如果图片大于四百万像素，计算压缩比并将大小压至400万以下  
				let ratio;
				if((ratio = width * height / 4000000) > 1) {
					console.log("大于400万像素")
					ratio = Math.sqrt(ratio);
					width /= ratio;
					height /= ratio;
				} else {
					ratio = 1;
				}
				canvas.width = width;
				canvas.height = height;
				//        铺底色  
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				//如果图片像素大于100万则使用瓦片绘制  
				let count;
				if((count = width * height / 1000000) > 1) {
					console.log("超过100W像素");
					count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片  
					//            计算每块瓦片的宽和高  
					let nw = ~~(width / count);
					let nh = ~~(height / count);
					tCanvas.width = nw;
					tCanvas.height = nh;
					for(let i = 0; i < count; i++) {
						for(let j = 0; j < count; j++) {
							tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
							ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
						}
					}
				} else {
					ctx.drawImage(img, 0, 0, width, height);
				}
				//修复ios上传图片的时候 被旋转的问题  
				if(Orientation != "" && Orientation != 1) {
					switch(Orientation) {
						case 6: //需要顺时针（向左）90度旋转  
							this.rotateImg(img, 'left', canvas);
							break;
						case 8: //需要逆时针（向右）90度旋转  
							this.rotateImg(img, 'right', canvas);
							break;
						case 3: //需要180度旋转  
							this.rotateImg(img, 'right', canvas); //转两次  
							this.rotateImg(img, 'right', canvas);
							break;
					}
				}
				//进行最小压缩  
				let ndata = canvas.toDataURL('image/jpeg', 0.1);
				console.log('压缩前：' + initSize);
				console.log('压缩后：' + ndata.length);
				console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
				tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
				return ndata;
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
			console.log(data)
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
	.sign{
		width: 6.44rem;
		height: 2.32rem;
	}
	.signPhoto {
		width: 6.44rem;
		height: 2.12rem;
		margin-left:-0.43rem;
		overflow: hidden;
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
	.pushBtn {
		display: block;
		font-size: 0.32rem;
		color: #C9141E;
		border: 0.01rem solid #C9141E;
		border-radius: 0.44rem;
		width: 6.64rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.28rem;
		text-align: center;
	}
	.btnBox1 {
		display: flex;
		justify-content: space-around;
		padding-left: 0.1rem;
		margin-top:1.8rem;
		margin-bottom: 0.6rem;
	}
	
	.btnBox {
		width: 6.64rem;
		height: 0.88rem;
		margin: 1.8rem auto 0.64rem;
	}
	
	.boxLast {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #c9141e;
		letter-spacing: 0;
		border: 0.01rem solid #c9141e;
		border-radius: .44rem;
		float: left;
		margin-right: 0.3rem;
	}
	
	.boxNext {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #fff;
		background: #c9141e;
		letter-spacing: 0;
		/*border:0.01rem solid #c9141e;*/
		border-radius: .44rem;
		float: right;
	}
	.day{
		font-size:0.28rem;
		color: #777777;
		line-height: 0.4rem;
		margin-top:0.32rem;
		margin-left: 0.54rem;
		margin-bottom: 0.34rem;
	}
	.sBox {
		/*padding: 0 0.4rem;*/
		margin-top: 0.34rem;
		margin-left: 0.4rem;
		margin-bottom: 0.44rem;
		font-size: 0.28rem;
		line-height: 0.4rem;
	}
	.book {
		font-size: 0.28rem;
		letter-spacing: 0;
		line-height: 0.4rem;
	}
	.sImg {
		width: 0.48rem;
		height: 0.48rem;
		margin-top: -0.04rem;
	}
	.ctc_div_mask {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #c9141e;
		background: rgba(0, 0, 0, 0.40);
		z-index: 10;
	}
	.kong{
		width:100%;
		height:0.32rem;
		background: #F3F3F3;
	}
	.recepit_all{
		width: 100%;
		height: 100%;
		background: #F3F3F3;
		/*position: fixed;*/
		padding:0.32rem 0.52rem 0 0.52rem ;
		
	}
	.recepit_div{
		/*width: 100%;*/
		/*height: 3.56rem;*/
		width: 6.44rem;
		background: #FFFFFF;
		border-radius: 0.16rem;
		padding: ;
	}
	.recepit_policy{
		font-size: 0.28rem;
		color: #555555;
		text-align: center;
		height: 0.7rem;
		line-height: 0.7rem;
		border-bottom: 0.01rem solid #EEEEEE;
	}
	.recepit_policy1{
		font-size: 0.28rem;
		color: #EB7760;
		/*text-align: center;*/
		height: 0.7rem;
		line-height: 0.7rem;
		border-top: 0.01rem solid #EEEEEE;
		padding-left: 0.32rem;
	}
	.nextImg{
		width:0.50rem;
		height:0.50rem;
		float: right;
		margin-right: 0.07rem;
		margin-top: 0.07rem;
	}
	.recepit_div_all{
		padding: 0.2rem 0.52rem 0.64rem 0.1rem;
	}
	.recepit_confirm{
		height: 1.48rem;
		line-height: 0.5rem;
		margin-left: 0.32rem;
		/*margin-right: 0.24rem;*/
		width: 5.6rem;
		font-size: 0.28rem;
		color: #777777;
	}
	.face_allbg{
		width: 100%;
		height: 100%;
		/*position: absolute;*/
		background: #F3F3F3;
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
		top: 0.5rem;
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
		font-size: 0.32rem;
		color: #c9141e;
		letter-spacing: 0;
		border: 0.01rem solid #c9141e;
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
		font-size: 0.32rem;
		color: #c9141e;
		letter-spacing: 0;
		border: 0.01rem solid #c9141e;
		border-radius: .44rem;
		float: right;
		margin-right: .3rem;
		background: #fff;
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

</style>