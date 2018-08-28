<template>
	<div class="bg">
		<div class="signatureBox" :class="{active:mask}">
			<div class="visaDetailTop">
				<p class="visaTitle">电子签名</p>
			</div>
			<div class="canvasBox" ref="canvasHW">
				<canvas @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' ref="canvasF" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp"></canvas>
				<div class="btnBox">
					<div class="last" @click="overwrite">重写</div>
					<div class="next" @click="handleClickPush">确定</div>
				</div>
			</div>
		</div>
		<div class="sign" @click="handleClickSign(1)">
			<img  ref="tou" :src="signPhoto" :code="code" alt="" /> 投保人签字区域
		</div>
		<div class="sign" @click="handleClickSign(2)">
			<img ref="bei" :src="signPhoto1" :code="code1" alt="" /> 被保险人签字区域
		</div>
		<div class="btnBox11">
			<!--<div class="font">保险人(法定监护人)<br>签字转发</div>-->
			<div class="boxNext" @click="handleNext">签字完成</div>
		</div>
		<p class="conText">
			<span style="font-family:'应用字体 Regular', '应用字体';color:#999999;">
					投保人与被保险人本人都已确认并与阅读
			</span>
			<span style="font-family:'应用字体 Regular', '应用字体';color:#F5222D;">
					《人身保险投保提示书》、《电子投保单》，
			</span>
			<span style="font-family:'应用字体 Regular', '应用字体';color:#999999;">
						签字确保上述信息的真实、准确和完整，且当这些信息发生变更时，将在30日内通知贵机构，否则本人承担由此造成的不利后果
			</span>
		</p>
			<div  class="btnBox11 clearFloat" >
					<div class="boxLast11" @click="lastClick">上一步</div>
					<div class="boxNext11" @click="nextClick">下一步</div>
			</div>
		
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		name: "Code",
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
				flag: false,
				index:"",
				signPhoto: "",
				signPhoto1: "",
				code: "",
				code1: ""
			}
		},
		created() {

		},
		mounted(){
	        let canvas = this.$refs.canvasF;
			canvas.height = this.$refs.canvasHW.offsetHeight
			canvas.width = this.$refs.canvasHW.offsetWidth
			this.canvasTxt = canvas.getContext("2d");
     	 },
		methods:{
			lastClick(){
				this.$router.push('/viewVideo');
			},
			nextClick(){
				this.$router.push('/paymentProcessing');
			},
			handleNext(){
				if(this.signPhoto != "" && this.signPhoto1 != "") {
					this.next();
				} else {
					Toast("请签字")
				}
			},
			handleClickSign(a){
				if(this.index == a) {
					this.index = a
				} else {
					this.index = a
					this.overwrite()
				}
				this.mask = true
			},
			next(){
				
			},
			back(){
				window.history.go(-1)
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
					if(this.index == 1) {
						Indicator.open()
						this.pushImg(image.src, 0)

					} else {
						Indicator.open()
						this.pushImg(image.src, 1)
					}

					this.sign = true
					this.mask = false
//					this.$refs.bg.style.position = "absolute"
//					this.blur = false
				} else {
					Toast("请签名后提交")
				}

			},
			pushImg(data, code) {
				var a = data.split(";")[0].split("/")[1];
				if(code == 0) {
					var base64Info = {
						"fileType": a,
						"imgList": [
							data
						],
						"uploadType": "2024"
					}
				} else if(code == 1) {
					var base64Info = {
						"fileType": a,
						"imgList": [
							data
						],
						"uploadType": "2025"
					}
				}
				this.$http.post(this.$store.state.link2 + '/fastdfs/filebase64', base64Info)
					.then(res => {
						Indicator.close();
						console.log(res)
						if(res.data.code == "SYS_S_000") {
							if(code == 0) {
								this.code = res.data.output[0].fileSerialNo
								this.signPhoto = data
								//								window.localStorage.code = this.code
								this.$refs.tou.setAttribute('class', 'signPhoto')
							} else if(code == 1) {
								this.code1 = res.data.output[0].fileSerialNo
								this.signPhoto1 = data
								//								window.localStorage.code1 = this.code1
								this.$refs.bei.setAttribute('class', 'signPhoto')
							}
						} else {
							Toast("上传发生错误，请重新上传")
						}

						
					}, res => {
						Indicator.close();
						console.log("上传图片错误");
					})
					}
			}
	}
</script>

<style scoped="scoped">
	.font{
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.44rem;
		text-align: center;
		font-size: 0.32rem;
		color:#c9141e;
		letter-spacing: 0;
		border:0.01rem solid #c9141e;
		border-radius: .44rem;
		float: left;
		margin-right: 0.3rem;
	}
	.bg{
	    /*position: fixed;*/
	    height:100%;
	    width:100%;
		background: #F3F3F3;
		overflow: hidden;
	}
	.file{
		width:6.44rem;
		height:3.56rem;
		margin-top: 0.4rem;
		margin: 0.4rem auto;
		background: pink;
		border-radius: 8px;
		background: #FFFFFF;
	}
	.file_title{
		font-family: PingFangSC-Regular;
		height:0.7rem;
		line-height:0.7rem;
		margin-top: 0.28rem;
		font-size:0.28rem;
		color: #555555;
		text-align: center;
		letter-spacing: 0;
	}
	.file_hr{
		border: 1px solid #EEEEEE;
	}
	.file_pdf{
		height:2.04rem;
		margin-top: 0.2rem;
		font-family: PingFangSC-Regular;
		font-size: 0.28rem;
		color: #777777;
		letter-spacing: 0;
	}
	.cont{
		width:5.88rem;
		height:1.60rem;
		line-height:0.4rem;
		margin: 0 auto;
		font-size: 0.28rem;
		color: #777777;
		letter-spacing: 0;
	}
	.file_look{
		height:0.7rem;
	}
	.look_all{
		height:0.9rem;
		line-height:0.7rem;
		float: left;
		margin-left: 0.32rem;
		font-family: PingFangSC-Medium;
		font-size: 0.28rem;
		color: #EB7760;
		letter-spacing: 0;
	}
	.file_look img{
		width:0.56rem;
		height:0.56rem;
		float: right;
		margin-right: 0.24rem;
	}
	.sign{
		width:6.44rem;
		height:3.56rem;
		margin: 0.32rem auto 0.32rem;
		font-size: 0.4rem;
		line-height: 3.56rem;
		text-align: center;
		color: #EB7760;
		letter-spacing: 0;
		background: #FFFFFF;
		border-radius:0.16rem;
		overflow: hidden;
	}
	.agree{
		width:6.44rem;
		height:0.80rem;
		background: #F3F3F3;
		margin-left: 0.52rem;
	}
	.circle{
		width:0.32rem;
		height:0.32rem;
		border-radius: 50%;
		border: 0.001rem solid #EB7760;
		float: left;
	}
	.read_agree{
		width:5.88rem;
		height:0.80rem;
		line-height: 0.4rem;
		float: right;
		font-family: PingFangSC-Regular;
		font-size: 0.28rem;
		color: #222222;
		letter-spacing: 0;
	}
	.read_agree a{
		color:#6BD1CF ;
	}
	.btn{
		width:6.64rem;
		height:0.88rem;
		margin:1rem auto 0.62rem;
	}
	.btn1{
		width:6.64rem;
		height:0.88rem;
		margin: 0.5rem auto 0.5rem;
	}
	.btn .last{
		width:3.12rem;
		height:0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #C9141E;
		letter-spacing: 0;
		border: 0.01rem solid #C9141E;
		border-radius: 0.44rem;
		float: left;
	}
	/*.last1{
		width:3.12rem;
		height:0.88rem;
		line-height: 0.45rem;
		text-align: center;
		font-size: 0.32rem;
		color: #C9141E;
		letter-spacing: 0;
		border: 0.01rem solid #C9141E;
		border-radius: 22px;
		float: left;
	}*/
	.btn .next{
		width:3.12rem;
		height:0.88rem;
		line-height: 0.88rem;
		text-align: center;
		/*background:#C9141E;*/
		font-size: 0.32rem;
		color: #C9141E;
		letter-spacing: 0;
		border: 1px solid #C9141E;
		border-radius: 22px;
		float: right;
	}
	.conText{
		width:6.44rem;
		height:1.2rem;
		margin: 0 auto ;
		padding-bottom: 0.6rem;
		line-height: 0.4rem;
	}
	/*qianzi*/
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
	.btnBox11 {
		/*position: absolute;*/
		width:6.64rem;
		height:0.88rem;
		margin: 0.4rem auto 0.44rem;
		padding-bottom:0.17rem;
	}
	
	.boxLast11 {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color:#c9141e;
		letter-spacing: 0;
		border:0.01rem solid #c9141e;
		border-radius: .44rem;
		float: left;
		margin-right: 0.3rem;
	}
	.boxNext{
		width: 6.44rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color:  #c9141e;
		/*background: #c9141e;*/
		letter-spacing: 0;
		border:0.01rem solid #c9141e;
		border-radius: .44rem;
		float: right;
	}
	.boxNext11 {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color:  #c9141e;
		/*background: #c9141e;*/
		letter-spacing: 0;
		border:0.01rem solid #c9141e;
		border-radius: .44rem;
		float: right;
	}
	.signPhoto {
		width: 100%;
		height: 100%;
	}
</style>