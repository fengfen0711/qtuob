<template>
	<div class="confirmation_all">
		<div class="bg"></div>
		<div class="top">
			<img class="logo" src="/static/img/sign/mdlogo.png" alt="" />
		</div>
		<div class="information_div">
			<p class="infor_mess">补充您的学历及其他信息：</p>
			<div class="code_w">
				<div class="code">
					<p class="yao">政治面貌：</p>
					<div class="confirmation_div_postion">
						<select class="confirm_div_select name" v-model="landscape" @change="aa">
							<option value="q">请选择</option>
							<option :value="item.code" v-for="(item,index) in policitydata">{{item.name}}</option>
						</select>
						<img src="/static/img/sign/select_down.png" class="confirm_div_select_img" />
					</div>
				</div>
			</div>
			<div class="code_w">
				<div class="code">
					<p class="yao">学历：</p>
					<div class="confirmation_div_postion">
						<select class="confirm_div_select name" v-model="knowlage" @change="bb">
							<option value="q">请选择</option>
							<option :value="item.educationCode" v-for="(item,index) in knowlageall">{{item.educationName}}</option>
						</select>
						<img src="/static/img/sign/select_down.png" class="confirm_div_select_img" />
					</div>
				</div>
			</div>
			<div class="div_clean1">
				<div class="code1">
					<div class="div_move">
						<p class="confirm_div_p1">上传学历影像文件：</p>
					</div>
					<img :src="headerImage" :code="code" class="information_move" />
					<input type="file" id="file" accept="image/*" name="file" @change="upload" />
				</div>
			</div>
		</div>
		<div class="btn">
			<div class="left" @click="up">
				上一步
			</div>
			<div class="right" @click="next">
				下一步
			</div>
		</div>
		<div class="bottom">
		</div>
	</div>

</template>

<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import Exif from 'exif-js'
	export default {
		name: "sign",
		data() {
			return {
				headerImage: '/static/img/sign/move.png',
				picValue: '',
				code: "",
				knowlageall: [],
				landscape: "",
				knowlage: "",
				policitydata: []
			}
		},
		created() {
			this.informationaa();
			this.political();
			this.knowlagenow();

		},

		methods: {
			informationaa() {
				if(this.$route.query.brokerId != "undefined") {
					var data = {
						"brokerId": this.$route.query.brokerId
						//					"brokerId":"1475362"

					}
					this.$http.post(this.$store.state.link + '/core/broker/findBrokerByBrokId', data)
						.then(res => {
							console.log(res.data);
							Indicator.close();
							if(res.data.code == "SYS_S_000") {
									
								//政治面貌
								this.landscape=res.data.output.tblBroker.politicalStatusEnum;
								this.political();

								this.knowlage = res.data.output.tblBroker.educationType;
							 	this.knowlagenow();
								//educationImgSerial 学历影像
								if(res.data.output.brokerImg.educationImgSerial != "null") {
									this.headerImage =  res.data.output.brokerImg.educationImgSerial
									this.code = res.data.output.brokerImg.educationImgSerial
								} else {
									this.code = "";
								}

							}
						}, res => {
							Indicator.close();
							console.log("==2" + res.data);
						})
				} else {

				}

			},
			aa() {
				console.log(this.landscape)
			},
			bb() {
				console.log(this.knowlage)
			},
			political() {
				var polidata = {
					"orgCode": "999999",
					"type": "8"
				}
				this.$http.post(this.$store.state.link + '/dic/findDicTotalByOrgCode', polidata)
					.then(res => {
						console.log(res.data);
						Indicator.close();
						if(res.data.code == "SYS_S_000") {
							this.policitydata = res.data.output;
							if(this.landscape==""){
								this.landscape = "q"
							}else{
								for(let i=0;i<this.policitydata.length;i++){
									if(this.landscape==res.data.output[i].code){
										this.landscape=res.data.output[i].code
									}
								}
							}
							
						}
					}, res => {
						Indicator.close();
						console.log("==2" + res.data);
					})
			},
			knowlagenow() {
				var data = {
					"": "",

				}
				this.$http.post(this.$store.state.link + '/dic/findEduForBroker', data)
					.then(res => {
						console.log(res.data);
						Indicator.close();
						if(res.data.code == "SYS_S_000") {
							this.knowlageall = res.data.output;
							
							if(this.knowlage==""){
								this.knowlage = "q"
							}else{
								for(let i=0;i<this.knowlageall.length;i++){
									if(this.knowlage==res.data.output[i].educationCode){
										this.knowlage=res.data.output[i].educationCode
									}
								}
							}
						}
					}, res => {
						Indicator.close();
						console.log("==2" + res.data);
					})
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
			up() {
				window.history.go(-1);
			},
			next() {
				if(this.landscape == "q" || this.landscape == "") {
					Toast("请选择政治面貌");
				} else if(this.knowlage == "q" || this.knowlage == "") {
					Toast("请选择学历");
				} else if(this.code == "") {
					Toast("请先上传学历影像文件");
				} else {
					var informdata = {
						"politicalStatus": this.landscape,
						"educationCode": this.knowlage, //学历
						"education": this.code // 影像文件路径

					}
					console.log(informdata)
					this.$store.dispatch("changeRecord", informdata)
					console.log(informdata)
					this.$router.push('/addbankCard?brokerId=' + this.$route.query.brokerId);
				}

			}
		}
	}
</script>

<style scoped="scoped">
	.code_w {
		width: 5.6rem;
		/*height: 1.7rem;*/
		margin: 0 auto;
		margin-top: .22rem;
	}
	
	.code {
		width: 5.6rem;
		height: .8rem;
		text-align: center;
		background: url(/static/img/sign/line.png) no-repeat;
		background-size: contain;
		background-position-y: 100%;
		margin-top: .1rem;
	}
	
	.code1 {
		width: 5.6rem;
		height: 2rem;
		text-align: center;
		background: url(/static/img/sign/line.png) no-repeat;
		background-size: contain;
		background-position-y: 100%;
		/*margin-top: .1rem;	*/
		position: relative;
	}
	
	.yao {
		float: left;
		width: 1.68rem;
		text-align: right;
		font-size: .28rem;
		color: #000000;
		line-height: .8rem;
	}
	
	.confirmation_all {
		width: 100%;
		height: 100%;
		padding-bottom: 0.48rem;
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
	
	.name {
		width: 2.5rem;
		height: .8rem;
		float: left;
		/*	margin-left: 1.46rem;*/
		font-size: .28rem;
		border: none;
		background: none;
		margin: 0 auto;
		/*line-height: .8rem;*/
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
	
	.infor_mess {
		font-size: 0.24rem;
		color: #000000;
		line-height: 0.2rem;
	}
	
	.information_div {
		margin-top: 0.3rem;
		padding: 0 0.94rem;
	}
	
	.div_clean1 {
		clear: both;
		margin-top: 1rem;
		height: 0.7rem;
	}
	
	.confirm_div_p {
		width: 1.68rem;
		height: 0.36rem;
		font-size: 0.28rem;
		color: #000000;
		line-height: 0.36rem;
		float: left;
		text-align: right;
		/*border: 1px solid red;*/
	}
	
	.confirm_div_p1 {
		width: 2.52rem;
		height: 0.36rem;
		font-size: 0.28rem;
		color: #000000;
		line-height: 0.36rem;
		float: left;
		text-align: right;
		/*border: 1px solid red;*/
	}
	
	.confirm_div_select {
		background: none;
		border: 0;
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		-ms-appearance: none;
	}
	
	.confirm_div_select_img {
		width: 0.08rem;
		height: 0.44rem;
		margin-top: 0.18rem;
		position: relative;
		float: left;
		right: 0.2rem;
	}
	
	.confirm_div_name {
		height: 0.36rem;
		background: none;
		font-size: 0.28rem;
		color: #000000;
		line-height: 0.36rem;
		border: 0;
		float: left;
		/*border: 1px solid red;*/
	}
	
	.confirm_div_img {
		width: 5.66;
		height: 0.24rem;
		border: 1px solid red;
	}
	
	.information_move {
		width: 2.12rem;
		height: 1.46rem;
		position: absolute;
		z-index: 0;
	}
	
	#file {
		width: 2.12rem;
		height: 1.46rem;
		position: absolute;
		opacity: 0;
		z-index: 1;
	}
	
	.div_move {
		height: 0.36rem;
	}
	
	.btn {
		width: 6.34rem;
		height: .96rem;
		background: url(/static/img/sign/btn2.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		position: absolute;
		bottom: 2.2rem;
		left: .58rem;
		margin-top: 2rem;
		text-align: center;
		line-height: 1.24rem;
		font-size: .48rem;
	}
	
	.left,
	.right {
		width: 3.17rem;
		height: 1rem;
		font-size: .32rem;
		line-height: 1rem;
		float: left;
	}
	
	.bottom {
		width: 6.86rem;
		height: 1.52rem;
		background: url(/static/img/sign/bot.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		margin-top: .32rem;
		position: absolute;
		bottom: .32rem;
		left: .32rem;
	}
</style>