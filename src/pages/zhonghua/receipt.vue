<template>
	<div class="face_allbg">
		<!--pdf-->
		<div v-if="!pdfFlag" class="ctc_div_mask">
			<Pdf :pdf="pdf" @pdfClose="pdfClose"></Pdf>
		</div>
		<!--弹窗-->
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
		
		<div class="recepit_all">
			<div class="recepit_div">
				<p class="recepit_policy">
					保单合同签收回执
				</p>
				<div class="recepit_div_all">
					<div class="recepit_confirm">
						<p>先要预览才可以进行其他操作，不然其他功能无法进行操作</p>
					</div>
				</div>
				<p class="recepit_policy1" @click="authorization">
					预览
					<img class="nextImg" src="/static/img/detail.png" alt="" />
				</p>
				
			
			</div>
		</div>
		<div class="kong"></div>
		<p class="facetype" >第一步</p>
		
		<div class="face_div">
			<p class="face_p">
				放松表情，准备开始自拍
			</p>
			<div class="hand_phone" >
				<img :src="headerImage" class="file" :code="code" alt="" />
				<input type="file" id="file" accept="image/*" name="file" @change="upload" capture="camera" />
			</div>
		</div>
		<p class="facetype" >第二步</p>
		
		<div class="face_div1">
			<div class="facesign" @click="handleClickSign">
			<!--<p class="mem"></p>-->
			<img v-if="sign" class="signPhoto" :src="signPhoto" :code="code" alt="" />投保人签字
			</div>
			
		</div>
		<div class="feed_div">
			<!--<span class="feedorder" @click="handleClickLast">返回</span>
			<span class="feedindex" @click="handleClickNext">下一步</span>-->
			<span @click="Additional_risk" class="pushBtn">提交</span>
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
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import Exif from 'exif-js';
	import Pdf from '@/components/pdf.vue'
	export default {
		name: "Receipt",
		data() {
			return {
				ispdf:false,
				isImage:false,
				isSign:false,
				mark_flag: false,
				pdf: '',
				pdfFlag: true,
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
				sign: false,
				flag: false,
				headerImage: '/static/img/zhonghua/takephoto.png',
				status:false,
				
			}
		},
		mounted() {
			let canvas = this.$refs.canvasF;
			canvas.height = this.$refs.canvasHW.offsetHeight
			canvas.width = this.$refs.canvasHW.offsetWidth
			this.canvasTxt = canvas.getContext("2d");
			this.canvasTxt.lineWidth=5;
			this.canvasTxt.fillStyle = "#FFFFFF";
			this.canvasTxt.fillRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height);
		},
		methods: {
			cancel() {
				this.mark_flag = false;
//				window.history.go(-1)
			},
			pdfClose(...data) {
//				console.log("aaassd=====")
				this.pdfFlag = data[0]

			},
			authorization() {
				var data = [{
					"tmId": "TM0007"
				}]
				console.log("请求==" + JSON.stringify(data))
				this.$http.post('http://192.144.139.88:9022/css/queryTemplateByTmIdList', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.pdf = res.data.output[0].tmFmsUrl;
							this.pdfFlag = false
							//查看pfd是否打开
							this.ispdf = true
							console.log("响应==" + JSON.stringify(res.data.output))
						} else {
							console.log("响应1==" + JSON.stringify(res.data))
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
				})
			},
//			//上一步
//			handleClickLast(){
////				this.$router.push('/msgBook');
//				window.history.go(-1)
//			},
			//下一步
			Additional_risk(){
				if(this.ispdf == false){
					Toast("请先预览合同")
				}else if(this.isImage == false){
					Toast("请先拍照");
				}else if(this.isSign == false){
					Toast("请先签字");
				}else{
					

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
					"plcyNo": this.$route.query.policyno
						
					}
					console.log(JSON.stringify(receiptdata));
					Indicator.open();
					this.$http.post('http://192.168.171.16:9009/receipt/v1/query', receiptdata)
						.then(res => {
							Indicator.close();
							console.log(res.data);
							var dataCode = res.data.code;
							if(dataCode == "SYS_S_000") {
//								Toast(res.data.desc);
								this.mark_flag = true;
							}else{
								Toast(res.data.desc);
							}
						}, res => {
							Indicator.close();
							console.log(res.data);
						})
				}
				
//				this.$router.push('/epolicy?prodCode=' +
//									this.$route.query.prodCode + '&prodNo=' +
//									this.$route.query.prodNo + '&orderNo=' +
//									this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode);
			},
			upload(e) {
				Indicator.open()
				let files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				this.picValue = files[0];
				this.imgPreview(this.picValue);
			},
			imgPreview(file) {
				let self = this;
				let Orientation;
				//去获取拍照时的信息，解决拍出来的照片旋转问题  
				Exif.getData(file, function() {
					Orientation = Exif.getTag(this, 'Orientation');
				});
				// 看支持不支持FileReader  
				if(!file || !window.FileReader) return;

				if(/^image/.test(file.type)) {
					// 创建一个reader  
					let reader = new FileReader();
					// 将图片2将转成 base64 格式  
					reader.readAsDataURL(file);
					// 读取成功后的回调  
					reader.onloadend = function() {
						let result = this.result;
						let img = new Image();
						img.src = result;
						//判断图片是否大于100K,是就直接上传，反之压缩图片  
						if(this.result.length <= (100 * 1024)) {
								self.headerImage = this.result;

							self.postImg(this.result);  
						} else {
							img.onload = function() {
								let data = self.compress(img, Orientation);
									self.headerImage = data;
								self.postImg(data);  
							}
						}
					}
				}
			},
			postImg(data) {
				//这里写接口  
				var a = data.split(";")[0].split("/")[1];
				var base64Info = {
						"fileType": a,
						"imgList": [
							data
						],
						"uploadType": "2026"
					}
				
				console.log(base64Info)
				this.$http.post(this.$store.state.link2 + '/fastdfs/filebase64', base64Info)
					.then(res => {
						console.log(res.data);
						Indicator.close();
						if(res.data.code == "SYS_S_000") {
								this.code = res.data.output[0].fileSerialNo
								this.status = true
								this.isImage = true
								//this.addImgFace();
						}
					}, res => {
						Indicator.close();
						console.log("==2" + res.data);
					})
			},
			addImgFace() {
				Indicator.open();
				var imgFormat = "";
				if(this.code.length > 3) {
					imgFormat = this.code.substr(this.code.length - 3, this.code.length - 1)
				}
				console.log(this.allData)
				var addData = {
					"cardId": this.allData.insrntResp.certfCode,
					"head": {
						"oprStep": "",
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode
					},
					"imgData": this.code,
					"imgFormat": imgFormat,
					"name": this.allData.insrntResp.insrntName,
					"pkgNo": this.$route.query.orderNo
				}
				console.log("==请求==" + JSON.stringify(addData))
				//				this.$http.post("http://192.168.171.12:9009/doc/v1/checkdoc", addData)
				this.$http.post(this.$store.state.link5 + '/trd/doc/v1/checkdoc', addData)
					.then(res => {
						console.log("===成功==" + JSON.stringify(res.data));
						Indicator.close();
						if(res.data.code == "SYS_S_000") {
							if(res.data.output.responseCode == "000000") {
								this.status = true
							} else {
								this.headerImage = "/static/img/zhonghua/takephoto.png";
								this.code = "";
								Toast(res.data.output.responseMsg)
							}
						}
					}, res => {
						this.headerImage = "/static/img/zhonghua/takephoto.png";
						this.code = "";
						console.log("===失败==" + JSON.stringify(res.data));
						Indicator.close();
					})
			},
			rotateImg(img, direction, canvas) {
				//最小与最大旋转方向，图片旋转4次后回到原方向      
				const min_step = 0;
				const max_step = 3;
				if(img == null) return;
				//img的高度和宽度不能在img元素隐藏后获取，否则会出错      
				let height = img.height;
				let width = img.width;
				let step = 2;
				if(step == null) {
					step = min_step;
				}
				if(direction == 'right') {
					step++;
					//旋转到原位置，即超过最大值      
					step > max_step && (step = min_step);
				} else {
					step--;
					step < min_step && (step = max_step);
				}
				//旋转角度以弧度值为参数      
				let degree = step * 90 * Math.PI / 180;
				let ctx = canvas.getContext('2d');
				switch(step) {
					case 0:
						canvas.width = width;
						canvas.height = height;
						ctx.drawImage(img, 0, 0);
						break;
					case 1:
						canvas.width = height;
						canvas.height = width;
						ctx.rotate(degree);
						ctx.drawImage(img, 0, -height);
						break;
					case 2:
						canvas.width = width;
						canvas.height = height;
						ctx.rotate(degree);
						ctx.drawImage(img, -width, -height);
						break;
					case 3:
						canvas.width = height;
						canvas.height = width;
						ctx.rotate(degree);
						ctx.drawImage(img, -width, 0);
						break;
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
			handleClickSign() {		
					if(this.status == true){
						this.mask = true;
					}else{
//						Toast('请您先执行第一步~')
					}

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
					this.pushImg(this.$refs.canvasF.toDataURL("image/jpeg"))
				} else {
					Toast("请签名后提交")
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
							console.log(this.code)
							console.log(data)
							this.handSign(data.split(",")[1]);
//							this.handSign(data);

							
						} else {
							Toast("上传发生错误，请重新上传")
						}

						Indicator.close();
					}, res => {
						Indicator.close();
						console.log("上传图片错误");
					})

			},
			handSign(addData){	
				Indicator.open();
				var data = {
					  "code": addData
					}
				console.log("1===="+JSON.stringify(data))
				this.$http.post('http://192.168.171.12:9016/testwrite',data)
					.then(res => {
						Indicator.close();
						console.log("2===="+JSON.stringify(res.data))
						if(res.data.code == "SYS_S_000") {
							this.isSign = true
							Toast('识别成功--'+res.data.output.resultWord)
						} else {
							Toast('识别失败--'+res.data.output.resultWord)
						}

						Indicator.close();
					}, res => {
						Indicator.close();
						Toast(res.data.output.resultWord)
						console.log("3===="+JSON.stringify(res.data))
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
		height: 0.5rem;
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
		background: #FFFFFF;
	}
	.facetype{
		font-size: 0.32rem;
		color: #222222;
		line-height: 0.4rem;
		height: 0.4rem;
		margin: 0.2rem 0.4rem;
	}
	.face_div{
		width: 100%;
		background: #F3F3F3;
		padding: 0.28rem 0 0.4rem 0;
	
	}
	.face_div1{
		width: 100%;
		background: #F3F3F3;
		padding: 0.28rem 0 0.4rem 0;
		margin-bottom: 1.56rem;
	}
	.face_p{
		font-size: 0.28rem;
		color: #444444;
		text-align: center;
		
	}
	.hand_phone{
	}
	.file{
		width: 2.6rem;
		height: 2.6rem;
		display: block;
		margin: 0 auto;
		margin-top: 0.4rem;
	}
	.face_img{
		width: 2.6rem;
		height: 2.6rem;
		display: block;
		margin: 0 auto;
		margin-top: 0.4rem;
	}
	#file{
		width: 2.6rem;
		height: 2.6rem;
		position: absolute;
		/*position: fixed;*/
		top: 5.6rem;
		left: 2.4rem;
		opacity: 0;
		z-index: 1;
	}
	.facesign{
		width: 6.44rem;
		height: 3.56rem;
		background: #FFFFFF;
		border-radius: 0.16rem;
		margin: 0 auto;
		font-size: 0.4rem;
		color: #EB7760;
		text-align: center;
		line-height: 3.56rem;
		overflow: hidden;
		position: relative;
		
	}
	.feed_div{
		/*position: fixed;
		bottom: 1.16rem;
		left: 0.48rem;*/
		
		margin-top: 1.56rem;
		margin-bottom: 1.16rem;
		margin-left: 0.48rem;
	}
	.feedorder{
		font-size: 0.32rem;
		color: #C9141E;
		border: 0.01rem solid #C9141E;
		border-radius: 0.44rem;
		display: inline-block;
		width: 3.12rem;
		height: 0.88rem;
		text-align: center;
		line-height: 0.88rem;
	}
	.feedindex{
		font-size: 0.32rem;
		color: #C9141E;
		border: 0.01rem solid #C9141E;
		border-radius: 0.44rem;
		width: 3.12rem;
		height: 0.88rem;
		display: inline-block;
		margin-left: 0.3rem;
		text-align: center;
		line-height: 0.88rem;
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
		/*z-index: 100;*/
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
</style>