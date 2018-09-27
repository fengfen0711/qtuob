<template>
	<div class="information_bg">
		<div class="infor_pad">
			<div class="information_div_all">
				<p class="infornation_p">投保人{{applicant}}证件</p>
				<div class="inforUpload_img">
					<div id="" class="inforUpload_up">
						<img :src="a" class="inforUpload_up_img" />
						<input class="file" type="file" accept="image/*" name="file" @change="upload" code="1">
					</div>
					<div id="" class="inforUpload_up inforUpload_right">
						<img :src="b" class="inforUpload_up_img" />
						<input class="file" type="file" accept="image/*" name="file" @change="upload" code="2">
					</div>
				</div>
			</div>
			<div class="information_div_all infor_margin">
				<p class="infornation_p">被保险人 {{insrntresp}}证件</p>
				<div class="inforUpload_img">
					<div id="" class="inforUpload_up">
						<img :src="e" class="inforUpload_up_img" />
						<input class="file" type="file" accept="image/*" name="file" @change="upload" code="5">
					</div>
					<div id="" class="inforUpload_up inforUpload_right">
						<img :src="f" class="inforUpload_up_img" />
						<input class="file" type="file" accept="image/*" name="file" @change="upload" code="6">
					</div>
				</div>
			</div>
		</div>
		<div class="feed_div">
			<span class="feedorder" @click="handleClickLast">上一步</span>
			<span class="feedindex" @click="handleClickNext">下一步</span>
		</div>
	</div>

</template>

<script>
	import Exif from 'exif-js'
	import wx from 'weixin-js-sdk'
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		name: "Informationupload",
		data() {
			return {
				a: "/static/img/zhonghua/IDcard.png",
				b: "/static/img/zhonghua/IDcardli.png",
				c: "/static/img/zhonghua/IDcardli.png",
				d: "/static/img/zhonghua/IDcardli.png",
				e: "/static/img/zhonghua/IDcardli.png",
				f: "/static/img/zhonghua/IDcardli.png",
				a1: "",
				b1: "",
				c1: "",
				d1: "",
				e1: "",
				f1: "",
				applicant: "", //投保人姓名
				insrntresp: "", //被保险人姓名
				docResp: [] //图片地址
			}
		},
		created() {
			this.init();
		},
		methods: {
			init() {
				var data = {
					"head": {
						"oprStep": "inforUpload",
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode
					},
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"opt": "ALL",
					"pkgNo": this.$route.query.orderNo
				}
				Indicator.open();
				this.$http.post(this.$store.state.link5 + "/trd/order/v1/queryorder", data).then(res => {
					Indicator.close();
					console.log(res.data);
					if(res.data.code == "SYS_S_000") {
						this.applicant = res.data.output.applntResp.applName;
						this.insrntresp = res.data.output.insrntResp.insrntName
						this.docResp = res.data.output.docResp
						console.log(this.docResp)
					}

				}, res => {
					Indicator.close();
					console.log("2===失败1" + res.data)
				});

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
							if(code == 1) {
								self.a = this.result;
							} else if(code == 2) {
								self.b = this.result
							}
							//							else if(code == 3) {
							//								self.c = this.result
							//							} else if(code == 4) {
							//								self.d = this.result
							//							} 
							else if(code == 5) {
								self.e = this.result
							} else if(code == 6) {
								self.f = this.result
							}

							self.postImg(this.result, code);
						} else {
							Indicator.close()
							img.onload = function() {
								let data = self.compress(img, Orientation);
								if(code == 1) {
									self.a = data;
								} else if(code == 2) {
									self.b = data
								}
								//								else if(code == 3) {
								//									self.c = data
								//								} else if(code == 4) {
								//									self.d = data
								//								}
								else if(code == 5) {
									self.e = data
								} else if(code == 6) {
									self.f = data
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
				} else if(code == 6) {
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
						console.log(JSON.stringify(res.data));
						Indicator.close();
						if(res.data.code == "SYS_S_000") {
							if(code == 1) {
								this.a1 = res.data.output[0].fileSerialNo
							} else if(code == 2) {
								this.b1 = res.data.output[0].fileSerialNo
							}
							//							else if(code == 3) {
							//								this.c1 = res.data.output[0].fileSerialNo
							//							} else if(code == 4) {
							//								this.d1 = res.data.output[0].fileSerialNo
							//							} 
							else if(code == 5) {
								this.e1 = res.data.output[0].fileSerialNo
							} else if(code == 6) {
								this.f1 = res.data.output[0].fileSerialNo
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
				console.log('压缩前：' + initSize);
				console.log('压缩后：' + ndata.length);
				console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
				tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
				return ndata;
			},
			//上一步
			handleClickLast() {
				window.history.go(-1)
			},
			//下一步
			handleClickNext() {

				if(this.a1 == "") {
					Toast("请上传投保人身份证正面");
				} else if(this.b1 == "") {
					Toast("请上传投保人身份证反面");
				} else if(this.e1 == "") {
					Toast("请上传被保险人身份证反面");
				} else if(this.f1 == "") {
					Toast("请上传被保险人身份证反面");
				} else {
					var data = {
						"token": this.$store.state.token,
						"userId": this.$store.state.userId,
						"head": { 
							"channelCode": "qtb_h5",
							"deptCode": "000300",
							"oprCode": this.$store.state.userId,
							"prodCode": this.$route.query.prodCode,
						},
						"mark": "UC",
						"opt": "DOC",
						"pkgNo": this.$route.query.orderNo,
						"docReq": [{
								"docFileName": "投保人身份证正面",
								"docType": "00401010",
								"fileSerialNo": this.a1,
								"remark": "正",
								"showOrder": 1
							},
							{
								"docFileName": "投保人身份证反面",
								"docType": "00401010",
								"fileSerialNo": this.b1,
								"remark": "反",
								"showOrder": 2
							},
							{
								"docFileName": "被保险人身份证正面", //单证文件名 
								"docType": "00401010", //单证类型
								"fileSerialNo": this.e1, //文件序列号 : 文件在影像系统唯一标识 
								"remark": "", //备注 
								"showOrder": 3 //显示顺序
							},
							{
								"docFileName": "被保险人身份证反面", //单证文件名 
								"docType": "00401010   ", //单证类型
								"fileSerialNo": this.f1, //文件序列号 : 文件在影像系统唯一标识 
								"remark": "", //备注 
								"showOrder": 4 //显示顺序
							}
						],
					}
					Indicator.open();
					this.$http.post(this.$store.state.link5 + '/trd/order/v1/saveorder', data)
						.then(res => {
							Indicator.close();
							console.log(res.data)
							if(res.data.code == "SYS_S_000") {
								this.$router.push('/msgBook?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&prodNo=" + this.$route.query.prodNo + "&responseCode=1");
							} else {
								Toast(res.data.desc);
							}
						}, res => {
							Indicator.close();
						})
				}
			},
		}
	}
</script>

<style scoped="scoped">
	.information_bg {
		width: 100%;
		height: 100%;
		background: #F3F3F3;
		position: fixed;
	}
	
	.information_div_all {
		padding: 0.16rem 0 0.62rem 0;
		background: #FFFFFF;
		border-radius: 0.16rem;
	}
	
	.infornation_p {
		font-size: 0.28rem;
		color: #555555;
		text-align: center;
	}
	
	.infor_div {
		padding: 0.5rem 0.4rem 0 0.4rem;
		border-top: 0.01rem solid #EEEEEE;
		margin-top: 0.14rem;
	}
	
	.infor_img {
		width: 2.46rem;
		height: 1.68rem;
	}
	
	.infor {
		float: right;
	}
	
	.infor_pad {
		padding: 0.4rem 0.52rem 0 0.52rem;
	}
	
	.infor_margin {
		margin-top: 0.32rem;
	}
	
	.feed_div {
		/*position: fixed;
		bottom: 1.16rem;
		left: 0.48rem;*/
		margin-top: 0.92rem;
		padding-left: 0.48rem;
		margin-bottom: 1.16rem;
	}
	
	.feedorder {
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
	
	.feedindex {
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
	
	.inforUpload_img {
		/*padding: 0 0.4rem;
		margin-top: 0.5rem;*/
		/*border-top: 0.01rem solid #EEEEEE;*/
		padding: 0.5rem 0.4rem 0 0.4rem;
		border-top: 0.01rem solid #EEEEEE;
		margin-top: 0.14rem;
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
</style>