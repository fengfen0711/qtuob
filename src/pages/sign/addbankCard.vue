<template>
	<div class="confirmation_all" >
		<div class="bg" ></div>
		<div class="top">
			<img class="logo" src="/static/img/sign/mdlogo.png" alt="" />
		</div>
		<div class="information_div">
			<p class="infor_mess">绑定您本人在用的银行卡：</p>
			<div class="addbank_div">
				<img :src="headerImage" class="file" :code="code" alt="" />
				<input type="file" id="file" accept="image/*" name="file" @change="upload" />
				<!--<div class="addbank_div_middle">-->
					<div class="addbank_span">+</div>
			<!--	</div>-->
			</div>
			<div class="code_w">
				<div class="code">
					<p class="yao">开户行：</p>
					<div class="confirmation_div_postion" >
						<select class="confirm_div_select name" v-model="bankcode">
							<option value="q">请选择</option>
							<option :value="bank.pkBankId" v-for="bank in banklist">{{bank.bankName}}</option>
						</select>
						<img src="/static/img/sign/select_down.png" class="confirm_div_select_img" />
					</div>
				</div>
			</div>
			<div class="code_w">
				<div class="code">
					<p class="yao">银行卡号：</p>
					<div class="confirmation_div_postion">
						<input class="name" type="number"  placeholder="请输入银行卡号" v-model="codebanka" maxlength="19" id="addcard" readonly="readonly"/>
					</div>
				</div>
			</div>
			<div class="code_w">
				<div class="code">
					<p class="yao">开户行所在地：</p>
					<div class="confirmation_div_postion">
						<input class="name" type="text"  placeholder="请输入开户行所在地" v-model="bankadress"/>
					</div>
				</div>
			</div>
			<div class="code_w">
				<div class="code">
					<p class="yao">支行名称：</p>
					<div class="confirmation_div_postion">
						<input class="name" type="text"  placeholder="请输入支行名称" v-model="zhiname"/>
					</div>
				</div>
			</div>
		</div>
		<div class="btn">
			<div class="left" @click="add_up">
				上一步
			</div>
			<div class="right" @click="add_next">
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
		name: "addbankCard",
		data() {
			return {
				headerImage: '',
				picValue: '',
				code: "",
				banklist:[],
				bankcode:"",
				codebanka:"",
				bankadress:"",
				zhiname:""
			}
		},
		created() {
			this.adddata();
			this.addbank();
			
		},

		methods: {
			addbank(){
				var data={
				"":""
			}
			this.$http.post(this.$store.state.link + '/dic/findBank', data)
					.then(res => {
						console.log(res.data);
						Indicator.close();
						if(res.data.code == "SYS_S_000") {
							this.banklist=res.data.output
							
							if(this.bankcode==""){
								this.bankcode="q"
							}else{
								for(let i=0;i<this.banklist.length;i++){
									if(this.bankcode==res.data.output[i].pkBankId){
										this.bankcode=res.data.output[i].pkBankId
									}
								}
							}
							
						}
					}, res => {
						Indicator.close();
						console.log("==2" + res.data);
					})
			},
			adddata(){
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
							//银行卡img
							this.headerImage=res.data.output.brokerImg.bankImgSerial
							this.code=res.data.output.brokerImg.bankImgSerial
							this.bankcode=res.data.output.tblBrokerBank.fkBankType
							this.addbank();
							this.codebanka=res.data.output.tblBrokerBank.bankAccount;//银行卡账号
							this.bankadress= res.data.output.tblBroker.openBankAddress  //开户行所在地
							this.zhiname=res.data.output.tblBroker.bankBranchName  //支行名称
						
						} else {
							
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
				var data={
					"ocrUrl":code
				}
				console.log(code)
				Indicator.open();
				this.$http.post(this.$store.state.link + "/ocr/ocrBankCard", data).then(res => {
						Indicator.close();
						console.log(res.data);
						if(res.data.code == "SYS_S_000"){
							this.codebanka=res.data.output.cardNo
							document.getElementById("addcard").readOnly=true;
						}else if(res.data.code == "CORE_E_001"){
							Toast("银行卡识别有误，请重新识别");
							this.codebanka="";
//							document.getElementById("addcard").readOnly=false;
						}else{
							Toast(res.data.desc);
							this.codebanka="";
//							document.getElementById("addcard").readOnly=false;
						}
					}, res => {
						Indicator.close();
						console.log("2===失败1" + res.data)
					});
			},
			add_up() {
				window.history.go(-1);
			},
			add_next() {
				if(this.code==""||this.code=="undefined"){
					Toast("请上传银行卡");
				}else if(this.bankcode==""||this.bankcode=="q"){
					Toast("请选择开户行");
					
				}else if(this.codebanka==""){
					Toast("请输入银行卡号");
				}else if(this.bankadress==""){
					Toast("请输入开户行所在地");
				}else if(this.zhiname==""){
					Toast("请输入支行名称");
				}else {
					var bankdata={
						"bankUrlCode":this.code,
						"bankType":this.bankcode,
						"bankAccount":this.codebanka,
						"openBankAddress":this.bankadress,
						"bankBranchName":this.zhiname
						
					}
					console.log(bankdata);
					this.$store.dispatch("changeBank",bankdata);
					this.$router.push('/handCard?brokerId='+this.$route.query.brokerId)
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.confirmation_all {
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding-bottom: 0.48rem;
		background: url(/static/img/sign/bg.png) no-repeat;
		background-size: cover;
	}
	
	.bg {
		/*position: fixed;*/
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
	
	.information_div {
		margin-top: 0.3rem;
		padding: 0 0.94rem;
	}
	
	.infor_mess {
		font-size: 0.24rem;
		color: #000000;
		line-height: 0.2rem;
	}
	
	.addbank_div {
		width: 5.48rem;
		height: 2.94rem;
		margin: 0.32rem auto;
		border: 0.01rem dashed #2B2B2B;
		border-radius: 0.16rem;
		position: relative;
	}
	.file{
		width: 5.48rem;
		height: 2.94rem;
		position: absolute;
		z-index: 0;
	}
	#file{
		width: 5.48rem;
		height: 2.94rem;
		position: absolute;
		z-index: 1;
		opacity: 0;
	}
	.addbank_div_middle {
		width: 0.96rem;
		height: 0.96rem;
		border: 0.01rem solid #2B2B2B;
		margin: 0.98rem auto;
	}
	
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
	
	.yao {
		float: left;
		width:2rem;
		text-align: right;
		font-size: .28rem;
		color: #000000;
		line-height: .8rem;
	}
	
	.confirm_div_select {
		background: none;
		border: 0;
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		-ms-appearance: none;
	}
	
	.name {
		width: 3rem;
		height: .8rem;
		float: left;
		font-size: .28rem;
		border: none;
		background: none;
		margin: 0 auto;
	}
	
	.confirm_div_select_img {
		width: 0.08rem;
		height: 0.44rem;
		margin-top: 0.18rem;
		position: relative;
		float: left;
		right: 0.2rem;
	}
	
	.btn {
		width: 6.34rem;
		height: .96rem;
		background: url(/static/img/sign/btn2.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		/*position: absolute;*/
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
	/*	position: absolute;*/
		bottom: .32rem;
		left: .32rem;
	}
	
	.addbank_span {
		font-size: 0.8rem;
		width: 0.96rem;
		height: 0.96rem;
		margin: 0 auto;
		text-align: center;
		vertical-align: middle;
		display: flex;
		 align-items: center; 
		 justify-content: center;   
		margin-top: 0.98rem;
	}
</style>