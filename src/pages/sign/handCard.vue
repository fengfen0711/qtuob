<template>
	<div class="confirmation_all">
		<div class="bg"></div>
		<div class="top">
			<img class="logo" src="/static/img/sign/mdlogo.png" alt="" />
		</div>
		<div class="information_div" >
			<p class="infor_mess">上传本人手持身份证图片：</p>
			<div class="hand_phone">
				<img :src="headerImage" class="file" :code="code" alt="" />
				<input type="file" id="file" accept="image/*" name="file" @change="upload" />
			</div>
		</div>
		<div class="btn">
			<div class="left" @click="handcard_up">
				上一步
			</div>
			<div class="right" @click="handcard_next" >
				下一步
			</div>
		</div>
		<div class="bottom">
		</div>
	</div>

</template>

<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui'
	import Exif from 'exif-js'
	export default {
		name: "handCard",
		data() {
			return {
				headerImage: '/static/img/phone_example.png',
				picValue: '',
				code: ""

			}
		},
		created() {
				this.handcarnum();
		},

		methods: {
			handcarnum(){
				if(this.$route.query.brokerId != "undefined"){
					
			
				var data={
					"brokerId":this.$route.query.brokerId
//					"brokerId":"1475362"
				}
				this.$http.post(this.$store.state.link + '/core/broker/findBrokerByBrokId', data)

					.then(res => {
						console.log(res.data)
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							
							if(res.data.output.tblBrokerImg.cidInHandImg!="null"){
								this.headerImage="http://outer.qtoubao.cn:9900/"+res.data.output.tblBrokerImg.cidInHandImg
								this.code=res.data.output.tblBrokerImg.cidInHandImg;
								console.log(this.headerImage)
							}else{
								this.code="";
							}
							
						
						} else {
//							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
				}else{
					
				}
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
			handcard_up(){
				window.history.go(-1);
			},
			handcard_next(){
				if(this.code==""){
					Toast("请上传照片");
				}else{
					var handdata={
					"cidInHandImg":this.code
					}
					console.log(handdata)
					this.$store.dispatch("changeInformation",handdata);				
					this.$router.push('/confirm_message')
				}
			},
		}
	}
</script>

<style scoped="scoped">
	.confirmation_all {
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding-bottom: 0.48rem;
	}
	.bg{
		position: fixed;
	  	top: 0;
	  	bottom: 0;
	  	left: 0;
	  	right: 0;
	  	background: url(/static/img/sign/bg.png) no-repeat;
	  	background-size:cover ;
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
	.information_div {
		margin-top: 0.3rem;
		padding: 0 0.94rem;
	}
	.hand_phone{
		/*background: url(/static/img/phone_example.png) no-repeat;
		background-size: contain;*/
		width: 5.52rem;
		height: 2.98rem;
		margin: 0 auto;
		margin-top: 0.32rem;
	}
	.file{
		width: 5.52rem;
		height: 2.98rem;
		position: absolute;
		z-index: 0;
	}
	#file{
		width: 5.52rem;
		height: 2.98rem;
		position: absolute;
		opacity: 0;
		z-index: 1;
	}
		.btn {
		width: 6.34rem;
		height: .96rem;
		background: url(/static/img/sign/btn2.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		position: absolute;
		bottom:2.2rem;
		left:.58rem;
		text-align: center;
		line-height: 1.24rem;
		font-size: .48rem;
	}
	.infor_mess{
		font-size: 0.24rem;
		color: #000000;
	}
	.left,
	.right {
		width: 3.17rem;
		height: 1rem;
		font-size: .32rem;
		line-height:1rem;
		float: left;
	}
	
	.bottom {
		width: 6.86rem;
		height: 1.52rem;
		background: url(/static/img/sign/bot.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		margin-top: .52rem;
			position: absolute;
  	bottom: .32rem;
  	left: .32rem;
		
	}
</style>