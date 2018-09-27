<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="twoBox">
			<p class="idtitle">上传银行卡正面：</p>
			<div class="idBox">
				<img :src="headerImage" class="file" :code="code" alt="" />
				<input type="file" id="file" accept="image/*" name="file" @change="upload" />
			</div>
		</div>
		<p class="btnBox">
			<span class="btn btn1" @click="toGoApplicant">返回</span>
			<span class="btn" @click="toGoApplicant">下一步</span>
		</p>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	import Exif from 'exif-js'
	export default {
		name: "idCard",
		data() {
			return {
				headerImage:"/static/muhaha/bank.png",
				code:"",
			}
		},
		created() {

		},
		methods: {
			toGoApplicant(){
				this.$router.push('/accInformation?prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode);
			},
			toGoIdCard(){
				this.$router.push('/accInformation?prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode);
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
								this.bankOcr(this.code);
						}
					}, res => {
						Indicator.close();
						console.log("==2" + res.data);
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
			bankOcr(code){
				var dataCode={
						  "head": {
						    "channelCode": "qtb_h5",
						    "deptCode": this.$route.query.cmpCode,
						    "oprCode": this.$store.state.userId,
						    "prodCode": this.$route.query.prodCode
						  },
						  "userId": this.$store.state.userId,
						   "token": this.$store.state.token,
						  "imgData":code,
						  "imgFormat": "jpg",
						  "imgType": "00401013",
						  "pkgNo": this.$route.query.orderNo
						}
				console.log(dataCode)
					Indicator.open();
				this.$http.post(this.$store.state.link5 + "/doc/v1/ocr", dataCode).then(res => {
						Indicator.close();
						console.log(res.data);
						if(res.data.code == "SYS_S_000"){
							if(res.data.output.responseMsg=="交易成功"){
								this.$router.push('/accInformation?bankName='+res.data.output.bankName+'&cardNo='+res.data.output.cardNo+'&status='+"1"+'&prodNo='+this.$route.query.prodNo+'&orderNo='+this.$route.query.orderNo+'&cmpCode='+this.$route.query.cmpCode+'&prodCode='+this.$route.query.prodCode);
							}
						}
					}, res => {
						Indicator.close();
						console.log("2===失败1" + res.data)
					});
			},
		},
		components: {
			
		}
	}
</script>

<style scoped="scoped">
	.one {
		position: absolute;
		width: 100%;
		min-height: 100%;
		background: #F3F3F3;
	}
	.btnBox {
		margin-top: 7.5rem;
		margin-bottom: 0.64rem;
		/*padding-top: 3rem;
		padding-bottom: 1.16rem;*/
		text-align: center;
	}
	.btn {
		display: inline-block;
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.32rem;
		border: 0.02rem solid #C9141E;
		border-radius: 0.88rem;
		background: #C9141E;
		color: #FFFFFF;
		text-align: center;
	}
	.btn1 {
		background: none;
		border: 0.02rem solid #C9141E;
		color: #C9141E;
		margin-right: 0.3rem;
	}
	.idtitle {
		height: 0.44rem;
		line-height: 0.44rem;
		padding: 0.4rem 0 0.32rem 1rem;
		font-size: 0.28rem;
		color: #555555;
	}
	.idImg {
		display: block;
		width: 5.48rem;
		height: 2.94rem;
		margin: 0 auto;
	}
	.file{
		
		width: 5.48rem;
		height: 2.94rem;
		position: absolute;
		display: block;
		margin-left: 1.01rem;
		z-index: 0;
	}
	#file{
		width: 5.48rem;
		height: 2.94rem;
		position: absolute;
		z-index: 1;
		opacity: 0;
	}
</style>