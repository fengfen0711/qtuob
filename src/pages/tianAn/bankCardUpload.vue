<template>
	<div class="inforUpload">
		<div class="inforUpload_all">
			<div class="inforUpload_div1">
				<p class="inforUpload_p">投保人{{aName}} 银行卡</p>
				<div class="inforUpload_img">
					<div id="" class="inforUpload_up">
						<img :src="c" class="inforUpload_up_img" />
						<input class="file" type="file" accept="image/*" name="file" @change="upload" code="3">
					</div>
				</div>
			</div>
		</div>
		<div class="information_bottom_btn">
			<!--<span class="information_bottom" @click="back">上一步</span>-->
			<span class="information_next" @click="handleClickNext">下一步</span>
		</div>
	</div>
</template>

<script>
	import Exif from 'exif-js'
	import wx from 'weixin-js-sdk'
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: "inforUpload",
		data() {
			return {
				relationshipFlag: false,
				aName: "",
				picValue: '',
				c: "/static/img/banka.png",
				c1: "",
				c1Old:'',
				allData: {}
				
			}
		},
		created() {
			this.init();
		},
		methods: {
			init() {
				var data = {
					"token": this.$route.query.token,
					"userId": this.$route.query.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$route.query.userId,
						"prodCode": this.$route.query.prodCode

					},
					"opt": "APPL,DOC",
					"pkgNo": this.$route.query.orderNo, //订单号
				}
				this.$http.post(this.$store.state.link + '/trd/order/v1/queryorder', data)
					.then(res => {
						console.log("data==" + JSON.stringify(res.data))
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.allData = res.data.output;
							this.aName = this.allData.applntResp.applName;
							if(this.allData.applntResp.relationToInsured == "00") {
								this.relationshipFlag = false;
							} else {
								this.relationshipFlag = true;
							}
							if(this.allData.docResp.length > 0) {
								for(var i = 0; i < this.allData.docResp.length; i++) {
									if(this.allData.docResp[i].showOrder == 3) {
										this.c = this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo;
										this.c1 = this.allData.docResp[i].fileSerialNo;
										this.c1Old = this.allData.docResp[i].fileSerialNo;
									}
								}
							}
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			back() {
				this.$router.push('/payInfo_tian?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
			},
			upload(e) {
				var code = e.currentTarget.getAttribute('code')
				let files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				this.picValue = files[0];
				Indicator.open()
				this.imgPreview(this.picValue, code);
			},
			imgPreview(file, code) {
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
							if(code == 3) {
								self.c = this.result
							}
							self.postImg(this.result, code);
						} else {
							Indicator.close()
							img.onload = function() {
								let data = self.compress(img, Orientation);
								if(code == 3) {
									self.c = data
								}
								self.postImg(data, code);
							}
						}
					}
				}
			},
			postImg(data, code) {
				//这里写接口  
				var a = data.split(";")[0].split("/")[1];
				if(code == 1) {
					var base64Info = {
						"fileType": a,
						"imgList": [
							data
						],
						"uploadType": "2026"
					}
				} else if(code == 2) {
					var base64Info = {
						"fileType": a,
						"imgList": [
							data
						],
						"uploadType": "2027"
					}
				} else if(code == 3) {
					var base64Info = {
						"fileType": a,
						"imgList": [
							data
						],
						"uploadType": "2030"
					}
				} else if(code == 4) {
					var base64Info = {
						"fileType": a,
						"imgList": [
							data
						],
						"uploadType": "2028"
					}
				} else if(code == 5) {
					var base64Info = {
						"fileType": a,
						"imgList": [
							data
						],
						"uploadType": "2029"
					}
				}
				console.log(base64Info)
				this.$http.post(this.$store.state.link2 + '/fastdfs/filebase64', base64Info)
					.then(res => {
						console.log(res.data);
						Indicator.close();
						if(res.data.code == "SYS_S_000") {
							if(code == 3) {
								this.c1 = res.data.output[0].fileSerialNo
							}
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
				//				    alert('压缩前：' + initSize);  
				//				    alert('压缩后：' + ndata.length);  
				//				    alert('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");  
				tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
				return ndata;
			},
			handleClickNext() {
				if(this.c1 != "" && this.c1 != this.c1Old) {
					var docReq = [];					
					var obj3 = {
						"docFileName": "投保人银行卡正面", //单证文件名 
						"docType": "014", //单证类型
						"fileSerialNo": this.c1, //文件序列号 : 文件在影像系统唯一标识 
						"remark": "", //备注 
						"showOrder": 3 //显示顺序
					}
					docReq.push(obj3);
					var data = {
						"token": this.$route.query.token,
						"userId": this.$route.query.userId,
						"mark": "UC",
						"head": {
							"oprStep": "inforUpload",
							"channelCode": "qtb_h5",
							"deptCode": this.$route.query.cmpCode,
							"oprCode": this.$route.query.userId,
							"prodCode": this.$route.query.prodCode
						},
						"opt": "DOC",
						"pkgNo": this.$route.query.orderNo, //订单号
						"docReq": docReq,
						"upPay":"1"
					}
					this.$http.post(this.$store.state.link + '/trd/order/v1/saveorder', data)
						.then(res => {
							console.log("===" + JSON.stringify(res.data))
							var dataCode = res.data.code;
							if(dataCode == "SYS_S_000") {
								this.$router.push('/bankCardEnter?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
							} else {
								Toast(res.data.desc);
							}
						}, res => {
							console.log(res.data);
						})

				} else {
					Toast("请重新上传银行卡正面照")
				}
			}
		}
	}
</script>

<style scoped="scoped">
	canvas {
		position: fixed;
		opacity: 0;
	}
	
	.inforUpload {
		width: 100%;
		height: 100%;
		position: absolute;
		background: #F3F3F3;
		padding: 0.4rem 0 .6rem;
	}
	
	.inforUpload_all {
		padding: 0 0.52rem;
		margin-bottom: 0.68rem;
	}
	
	.inforUpload_div {
		background: #FFFFFF;
		height: 3.44rem;
		width: 100%;
		border-radius: 0.16rem;
	}
	
	.inforUpload_div1 {
		background: #FFFFFF;
		height: 3.65rem;
		width: 100%;
		border-radius: 0.08rem;
		margin-top: 0.32rem;
	}
	
	.inforUpload_p {
		font-size: 0.28rem;
		color: #555555;
		height: 0.7rem;
		border-bottom: 0.01rem solid #EEEEEE;
		text-align: center;
		line-height: 0.7rem;
	}
	
	.inforUpload_img {
		padding: 0 0.4rem;
		margin-top: 0.5rem;
	}
	
	.inforUpload_up {
		position: relative;
		width: 2.46rem;
		height: 1.68rem;
		background: #E0E5FE;
		border-radius: 0.08rem;
		display: inline-block;
	}
	
	.file {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		opacity: 0;
	}
	
	.inforUpload_right {
		float: right;
	}
	
	.inforUpload_up_img {
		width: 2.46rem;
		height: 1.68rem;
		display: block;
	}
	
	.inforUpload_up_p {
		font-size: 0.24rem;
		color: #888888;
		text-align: center;
	}
	
	.information_bottom_btn {
		/*padding: 0 0 0 0.48rem;*/
		vertical-align: bottom;
		height: 0.88rem;
		margin-top: 2.56rem;
		text-align: center;
	}
	
	.information_bottom {
		width: 3.12rem;
		height: 0.88rem;
		border: 0.01rem solid #EB7760;
		border-radius: 0.44rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
		line-height: 0.88rem;
		display: inline-block;
	}
	
	.information_next {
		width: 6rem;
		height: 0.88rem;
		margin: 0 auto;
		border: 0.02rem solid #EB7760;
		border-radius: 0.44rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
		line-height: 0.88rem;
		display: inline-block;
		/*margin-left: 0.3rem;*/
	}
	
	.inforUpload_booy {
		margin-bottom: ;
	}
</style>