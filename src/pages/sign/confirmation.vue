<template>
	<div class="confirmation_all">
		<div class="bg"></div>
		<div v-if="!cust_Seven" class="custseven_sattus" @touchmove.prevent>
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">提示</div>
				<div class="cs_div_openiput1">
					<p class="cust_p">
						您已经是我们的签约经纪人，无需再次申请。
					</p>
				</div>
				<div class="cs_btn_bootom">
					<div class="cs_btn_cancercust" @click="index_know">确定</div>
				</div>
			</div>
		</div>
		<div class="top">
			<img class="logo" src="/static/img/sign/mdlogo.png" alt="" @click="confirm" />
		</div>
		<div class="confirm_text">
			<p class="confirm_car">上传身份证人像面：</p>
			<div class="file_wrap">
				<img class="confirm_img" :src="img" :file='code' />
				<input class="file" type="file" accept="image/*" name="file" @change="upload" code="1">
			</div>

			<p class="confirm_margin">上传身份证国徽面：</p>
			<div class="file_wrap">
				<img class="confirm_img" :src="img1" :file="code1" />
				<input class="file" type="file" accept="image/*" name="file" @change="upload" code="2">
			</div>

			<div class="confirm_lin">
				<div class="code_w">
					<div class="code">
						<p class="yao">真实姓名：</p>
						<input class="name" type="text" v-model="name" placeholder="请输入申请人姓名" id="nameid" readonly="readonly"/>
					</div>
				</div>
				<div class="code_w">
					<div class="code">
						<p class="yao">证件号码：</p>
						<input class="name" maxlength="18" type="text" id="conidcard" v-model="cardnum" placeholder="请输入证件号码" v-on:input="Idcard" readonly="readonly"/>
					</div>
				</div>
				<div class="code_w">
					<div class="code">
						<p class="yao">性别：</p>
						<div class="confirm_div_card">
							<div class="confirm_sex" id="sexfeamle">
								<img class="imgSex" v-if="nv" src="/static/img/sign/unfocus@2x.png" />
								<img class="imgSex1" v-if="!nv" src="/static/img/sign/focus@2x.png" />
								<span>
								女
							</span>
							</div>
							<div class="confirm_sex_man" id="sexman">
								<img class="imgSex1" v-if="nan" src="/static/img/sign/focus@2x.png" />
								<img class="imgSex" v-if="!nan" src="/static/img/sign/unfocus@2x.png" />
								<span>
								男
							</span>
							</div>
						</div>

					</div>
				</div>
				<div class="code_w">
					<div class="code">
						<p class="yao">民族：</p>
						<div class="confirmation_div_postion">
							<select class="confirm_div_select name" v-model="nation" id="selectoption" disabled="disabled">
								<option value="q" selected>请选择</option>
								<option :value="item.pkNationId" v-for="(item,index) in nationall">{{item.nationName}}</option>
							</select>
							<img src="/static/img/sign/select_down.png" class="confirm_div_select_img" />
						</div>
					</div>
				</div>
				<div class="code_w">
					<div class="code">
						<p class="yao">户籍地址：</p>
						<input class="name" type="text" id="conaddress" v-model="hujadress" placeholder="请输入户籍地址" readonly="readonly"/>
					</div>
				</div>
				<div class="code_w">
					<div class="code">
						<p class="yao">现居所在地：</p>
						<div>
							<select class="confirm_div_select name1 " v-model="nownation" @change="procity">
								<option value="0">请选择</option>
								<option :value="item.cnCode" v-for="(item,index) in provinceList">{{item.cnName}}</option>
							</select>
							<img src="/static/img/sign/select_down.png" class="confirm_div_select_img" />
						</div>
						<div>
							<select class="confirm_div_select name1 " v-model="nownation1" @change="procounty">
								<option value="0">请选择</option>
								<option :value="city.cnCode" v-for="city in pocitylist">{{city.cnName}}</option>
							</select>
							<img src="/static/img/sign/select_down.png" class="confirm_div_select_img" />
						</div>
						<div>
							<select class="confirm_div_select name1 " v-model="nownation2">
								<option value="0">请选择</option>
								<option :value="county.cnCode" v-for="county in pocitycountylist">{{county.cnName}}</option>
							</select>
							<img src="/static/img/sign/select_down.png" class="confirm_div_select_img" />
						</div>
					</div>
				</div>
				<div class="code_w">
					<div class="code">
						<p class="yao">详细地址：</p>
						<input class="name" type="text" v-model="confirmadress" placeholder="请输入详细地址" />
					</div>
				</div>
				<div class="code_w1">
					<div class="code">
						<p class="yao">证件起期：</p>
						<input class="name" type="date" v-model="confirmdata" placeholder="请输入证件起期" id="constart" readonly="readonly"/>

					</div>
				</div>
				<!--<div class="code_w">
					<div class="code">
						<p class="yao">证件止期：</p>
						<input class="name" type="date" v-model="confirmtime" placeholder="请输入证件止期" id="conend" />

					</div>
				</div>-->
				<div class="code_wss">
					<div class="code">
						<p class="yao">证件止期：</p>
						<input class="name" type="date" v-model="confirmtime" placeholder="请输入证件止期" id="conend" readonly="readonly"/>

					</div>
				</div>
				<div class="code_wss">
					<div class="codelong">
						<div class="codeall" id="codeid" v-model="confirmtime">
							<img class="imgSex" v-if="longcard" src="/static/img/sign/unfocus@2x.png" />
							<img class="imgSex1" v-if="!longcard" src="/static/img/sign/focus@2x.png" />
							<span class="codespan">长期</span>
						</div>

					</div>
				</div>

			</div>

		</div>
		<div class="btn">
			<div class="left" @click="up">
				上一步
			</div>
			<div class="right" @click="IDcard">
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
		name: "confirmation",
		data() {
			return {
				cust_Seven: true,
				img: '/static/img/sign/bg_example.png',
				img1: '/static/img/sign/font_example.png',
				picValue: '',
				code: '',
				code1: '',
				name: "",
				cardnum: "",
				man: "",
				feamle: "",
				nation: "",
				hujadress: "",
				nownation: "",
				confirmadress: "",
				confirmdata: "",
				confirmtime: "",
				nationall: [],
				provinceList: [],
				provinceType: "",
				pocitylist: [],
				nownation1: "",
				nownation2: "",
				pocitycountylist: [],
				nv: true,
				nan: true,
				condattimestar: "", //身份证起期
				condataend: "", //身份证止期
				flage: false,
				phone: "",
				//				certificate:"", //根据识别出来的证件如果止期是汉字的时候的状态
				longcard: true,
				longfalse: false,
				longfalse1: false,

			}
		},
		created() {

			this.initialization();
			this.province();
			this.nationcon();
			//			this.procity();
			//			this.procounty();
			this.feamle = "M";
			console.log(this.$store.state.sign)

		},

		methods: {
//			confirmclick() {
//					if(this.longfalse == true) {
//						this.longcard = false
//						
//
//					} else if(this.longfalse1 == true) {
//						this.longcard = true
//					}
//				 else {
//					if(this.longcard) {
//						this.longcard = false
//						this.confirmtime="长期"
//					} else {
//						this.longcard = true
//						
//					}
//				}
//
//			},
			index_know() {
				this.cust_Seven = true;
				WeixinJSBridge.call('closeWindow');
			},
			nationcon() {
				var nationInfo = {

				}

				Indicator.open();

				this.$http.post(this.$store.state.link + "/dic/findNation", nationInfo).then(res => {
					Indicator.close();
					console.log(res.data);
					if(res.data.code == "SYS_S_000") {
						this.nationall = res.data.output;
						if(this.nation == "") {
							this.nation = "q"
						} else {
							for(let i = 0; i < this.nationall.length; i++) {
								if(this.nation == res.data.output[i].pkNationId) {
									this.nation = res.data.output[i].pkNationId
								}
							}
						}

					}
				}, res => {
					Indicator.close();
					console.log("2===失败1" + res.data)
				});
			},
			initialization() {
				if(this.$route.query.brokerId != "undefined") {
					var data = {
						"brokerId": this.$route.query.brokerId

					}
					this.$http.post(this.$store.state.link + '/core/broker/findBrokerByBrokId', data)

						.then(res => {
							console.log(res.data)
							var dataCode = res.data.code;
							if(dataCode == "SYS_S_000") {
								if(res.data.output.brokerImg.idCardSerial != "null") {
									//									this.code = "http://outer.qtoubao.cn:9900/" + res.data.output.brokerImg.idCardSerial; //身份证正面
									this.img = res.data.output.brokerImg.idCardSerial;
									this.code = res.data.output.brokerImg.idCardSerial
								} else {
									this.code = "";
								}
								if(res.data.output.brokerImg.idCardSerialReverse != "null") {
									this.img1 = res.data.output.brokerImg.idCardSerialReverse; //身份证反面
									this.code1 = res.data.output.brokerImg.idCardSerialReverse
								} else {
									this.code1 = "";
								}
								this.name = res.data.output.tblBroker.brokerName;
								this.cardnum = res.data.output.tblBroker.certiCode;

								if(res.data.output.tblBroker.genderEnum == "F") {
									this.nv = false;
									this.nan = false;
									this.feamle = "F";
								} else {
									this.nv = true;
									this.nan = true;
									this.feamle = "M";
								}
								this.hujadress = res.data.output.tblBroker.rsdResidence //户籍地址
								this.confirmadress = res.data.output.tblBroker.addressDeta //详细地址
								this.nation = res.data.output.tblBroker.nationType;
								document.getElementById("selectoption").style.color = "#222222"
								this.nationcon();
								//省
								this.nownation = res.data.output.tblBroker.province
								console.log(this.nownation)
								//								this.province();

								//市
								this.nownation1 = res.data.output.tblBroker.urban
								this.procity();

								//区
								this.nownation2 = res.data.output.tblBroker.area
								this.procounty();
								
								var date = new Date(res.data.output.brokerImg.certificateStartDate); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
								var Y = date.getFullYear() + '-';
								var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
								var D = date.getDate()< 10 ? '0' +  date.getDate() : date.getDate();
								var a = Y + M + D
								this.confirmdata = a
								if(this.confirmtime=="2999-12-31"){
									this.longcard = false;
								}else{
									var date = new Date(res.data.output.brokerImg.certificateEndDate); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
									var Y = date.getFullYear() + '-';
									var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
									var D = date.getDate()< 10 ? '0' +  date.getDate() : date.getDate();;
									this.confirmtime = Y + M + D;
								}
								
								this.phone = res.data.output.tblBroker.mobile //代理人手机号
								var phonedata = {
									"brokerMobile": this.phone
								}
								this.$store.dispatch("changeMobile", phonedata)
								
//								var data = {
//									"sign": res.data.output.brokerImg.sign
//			
//								}
//								this.$store.dispatch("changeSign", data)
								console.log(data)
							} else {
								//							Toast(res.data.desc);
							}
						}, res => {
							console.log(res.data);
						})
				}

			},
//			handclickfeam() {
//
//				if(this.flage == false) {
//					this.nv = false;
//					this.nan = false;
//					this.feamle = "F";
//				} else {
//
//				}
//
//				console.log(this.feamle)
//
//			},
//			handleclickman() {
//				if(this.flage == false) {
//					this.nv = true;
//					this.nan = true;
//					this.feamle = "M";
//				} else {
//
//				}
//
//				console.log(this.feamle)
//			},
			province() {
				var data = {
					"code": "0",
					"orgCode": "999999"
				}

				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)

					.then(res => {
						var dataCode = res.data.code;
						console.log(res.data)
						if(dataCode == "SYS_S_000") {

							//调取所有的省份
							this.provinceList = res.data.output;
							if(this.nownation == "") {
								this.nownation = "0"
							} else {
								for(let i = 0; i < this.provinceList.length; i++) {
									if(this.nownation == res.data.output[i].cnCode) {
										this.nownation = res.data.output[i].cnCode;
										this.procity();

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
			procity() {
				//用省调取所有的市
				var data = {
					"code": this.nownation,
					"orgCode": "999999"
				}
				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)

					.then(res => {
						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.pocitylist = res.data.output

							if(this.nownation1 == "") {
								this.nownation1 = "0";

							} else {

								for(let i = 0; i < this.pocitylist.length; i++) {
									if(this.nownation1 == res.data.output[i].cnCode) {
										this.nownation1 = res.data.output[i].cnCode;

										this.procounty();
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
			procounty() {

				//用省调取所有的区
				var data = {
					"code": this.nownation1,
					"orgCode": "999999"
				}

				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', data)

					.then(res => {
						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.pocitycountylist = res.data.output;

							if(this.nownation2 == "") {
								this.nownation2 = "0";
							} else {

								for(let i = 0; i < this.pocitycountylist.length; i++) {

									if(this.nownation2 == res.data.output[i].cnCode) {
										this.nownation2 = res.data.output[i].cnCode;
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
								self.img = this.result;
							} else if(code == 2) {
								self.img1 = this.result
							}

							self.postImg(this.result, code);
						} else {
							Indicator.close()
							img.onload = function() {
								let data = self.compress(img, Orientation);
								if(code == 1) {
									self.img = data;
								} else if(code == 2) {
									self.img1 = data
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
				}
				console.log(base64Info)
				Indicator.open();
				this.$http.post(this.$store.state.link2 + '/fastdfs/filebase64', base64Info)
					.then(res => {
						console.log(res.data);
						Indicator.close();
						if(res.data.code == "SYS_S_000") {
							if(code == 1) {

								this.code = res.data.output[0].fileSerialNo
								this.ocr(this.code);

							} else if(code == 2) {
								this.code1 = res.data.output[0].fileSerialNo

								this.ocrother(this.code1);
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
			up() {
				window.history.go(-1)
			},
			next() {
				if(this.cardnum == "") {
					Toast("请输入真实姓名");
				} else if(this.cardnum == "") {
					Toast("请输入证件号码");
				} else if(this.hujadress == "") {
					Toast("请输入户籍地址");
				} else if(this.nation == "q") {
					Toast("请选择民族");
				} else if(this.nownation == "0") {
					Toast("请选择省");
				} else if(this.nownation1 == "0") {
					Toast("请选择市");
				} else if(this.nownation2 == "0") {
					Toast("请选择区");
				} else if(this.confirmadress == "") {
					Toast("请输入详细地址");
				} else if(this.confirmdata == "") {
					Toast("请输入证件起期");
				} else if(this.confirmtime == "") {
					Toast("请输入证件止期");
				} else if(this.code == "") {
					Toast("请上传身份证反面照");
				} else if(this.code1 == "") {
					Toast("请上传身份证正面照");
				} else {
					this.Idcard();
					if(this.confirmtime=="长期"){
						var conirmdata = {
						"brokerName": this.name, //经纪人姓名
						"brokerCertiCode": this.cardnum, //证件号码
						"brokerGender": this.feamle, //性别
						"nationType": this.nation, //民族编码
						"rsdResidence": this.hujadress, //户籍地址
						"province": this.nownation, //现居地址省
						"urban": this.nownation1, //现居地址市
						"area": this.nownation2, //现居地址区
						"addressDeta": this.confirmadress, //详细地址
						"certiStartDate": this.confirmdata,
						"certiEndDate": "2999-12-31",
						"certiCodeDownCode": this.code1,
						"certiCodeUpCode": this.code
					}
					}else{
						var conirmdata = {
						"brokerName": this.name, //经纪人姓名
						"brokerCertiCode": this.cardnum, //证件号码
						"brokerGender": this.feamle, //性别
						"nationType": this.nation, //民族编码
						"rsdResidence": this.hujadress, //户籍地址
						"province": this.nownation, //现居地址省
						"urban": this.nownation1, //现居地址市
						"area": this.nownation2, //现居地址区
						"addressDeta": this.confirmadress, //详细地址
						"certiStartDate": this.confirmdata,
						"certiEndDate": this.confirmtime,
						"certiCodeDownCode": this.code1,
						"certiCodeUpCode": this.code
					}
					}
					
					this.$store.dispatch("changeCard", conirmdata)
					console.log(conirmdata);
					this.$router.push('/informaConfirmation?brokerId=' + this.$route.query.brokerId)

				}

			},
			confirm() {
				console.log(this.$store.state.token);
				console.log(this.$store.state.userId);
			},

			ocr(code) {
				var data = {
					"ocrUrl": code
				}
				Indicator.open();
				this.$http.post(this.$store.state.link + "/ocr/ocrIdCard", data).then(res => {
					Indicator.close();
					console.log(res.data);
					if(res.data.code == "SYS_S_000") {
						this.name = res.data.output.data.name;
						document.getElementById("nameid").readOnly = true

						if(res.data.output.data.id != "") {

							this.cardnum = res.data.output.data.id;
							document.getElementById("conidcard").readOnly = true;
						}

						for(var i = 0; i < this.nationall.length; i++) {
							if(res.data.output.data.nationId == this.nationall[i].pkNationId) {

								this.nation = this.nationall[i].pkNationId;
								document.getElementById("selectoption").disabled = true;
								document.getElementById("selectoption").style.color = "#222222"
							}
						}

						this.hujadress = res.data.output.data.address;
						document.getElementById("conaddress").readOnly = true;
						if(res.data.output.data.sex == "女") {
							this.nv = false;
							this.nan = false;
							this.feamle = "F"
							this.flage = true;
						} else {
							this.nv = true;
							this.nan = true;
							this.feamle = "M"
							this.flage = true;
						}

					} else if(res.data.code == "CORE_E_001") {
						Toast("身份证识别有误，请重新识别")
						this.name = "";
//						document.getElementById("nameid").readOnly = false;
						this.cardnum = "";
//						document.getElementById("conidcard").readOnly = false;
						this.nation = "";
//						document.getElementById("selectoption").disabled = false;
						this.nation = "q"
						this.hujadress = "";
//						document.getElementById("conaddress").readOnly = false;
//						this.nv = true;
//						this.nan = true;
						this.feamle = "M"
//						this.flage = false;
					} else {
						Toast(res.data.desc);
						this.name = "";
//						document.getElementById("nameid").readOnly = false;
						this.cardnum = "";
//						document.getElementById("conidcard").readOnly = false;
						this.nation = "";
//						document.getElementById("selectoption").disabled = false;
						this.nation = "q"
						this.hujadress = "";
//						document.getElementById("conaddress").readOnly = false;
//						this.nv = true;
//						this.nan = true;
						this.feamle = "M"
//						this.flage = false;
					}
				}, res => {
					Indicator.close();
					console.log("2===失败1" + res.data)
				});
			},
			ocrother(code) {
				var data = {
					"ocrUrl": code
				}

				Indicator.open();
				this.$http.post(this.$store.state.link + "/ocr/ocrIdCardOtherSide", data).then(res => {
					Indicator.close();
					console.log(res.data);
					if(res.data.code == "SYS_S_000") {
						if(res.data.output.data.valid_date == "") {
							this.confirmdata = "";
							document.getElementById("constart").readOnly = false;
							this.confirmtime = "";
							document.getElementById("conend").readOnly = false;
						} else {
							this.condattimestar = res.data.output.data.valid_date.substring(0, 10)
							this.confirmdata = this.condattimestar.replace(/\./g, "-");
							document.getElementById("constart").readOnly = true;
							this.condataend = res.data.output.data.valid_date.substring(11, 21);
							this.confirmtime = this.condataend.replace(/\./g, "-");
							if(this.confirmtime == "长期") {
								this.longcard = false;
								//								document.getElementById("codeid").disabled=true;
								this.longfalse = true;
//								this.confirmtime="2999-12-31";

							} else {
								this.longcard = true;
								this.longfalse1 = true;
							}
							document.getElementById("conend").readOnly = true;
						}

					} else if(res.data.code == "CORE_E_001") {
						
						this.longfalse1 = false;
						Toast("身份证识别有误，请重新识别")
						this.confirmdata = "";
//						document.getElementById("constart").readOnly = false;
						this.confirmtime = "";
//						document.getElementById("conend").readOnly = false;

					} else {
						Toast(res.data.desc)
						this.longfalse1 = false;
						this.confirmdata = "";
//						document.getElementById("constart").readOnly = false;
						this.confirmtime = "";
//						document.getElementById("conend").readOnly = false;
					}
				}, res => {
					Indicator.close();
					console.log("2===失败1" + res.data)
				});
			},
			//校验身份证代理人是否注册
			IDcard() {
				if(this.cardnum == "") {
					Toast("请输入真实姓名");
				} else if(this.cardnum == "") {
					Toast("请输入证件号码");
				} else if(this.hujadress == "") {
					Toast("请输入户籍地址");
				} else if(this.nation == "q") {
					Toast("请选择民族");
				} else if(this.nownation == "0") {
					Toast("请选择省");
				} else if(this.nownation1 == "0") {
					Toast("请选择市");
				} else if(this.nownation2 == "0") {
					Toast("请选择区");
				} else if(this.confirmadress == "") {
					Toast("请输入详细地址");
				} else if(this.confirmdata == "") {
					Toast("请输入证件起期");
				} else if(this.confirmtime == "") {
					Toast("请输入证件止期");
				} else if(this.code == "") {
					Toast("请上传身份证反面照");
				} else if(this.code1 == "") {
					Toast("请上传身份证正面照");
				} else {
					var IDcarddata = {
						"brokerCertiCode": this.cardnum
					}
					Indicator.open();
					this.$http.post(this.$store.state.link + "/core/broker/findBrokerByCertiCode", IDcarddata).then(res => {
						Indicator.close();
						console.log(res.data);
						if(res.data.code == "SYS_S_000") {
							this.next();

						} else if(res.data.code == "CORE_E_001") {
							this.next();

						} else if(res.data.code == "CORE_E_003") {
							this.next();

						} else if(res.data.code == "CORE_E_204") {
//							this.$router.push('/waitindex?regStatus='+"TN");
							this.cust_Seven = false;
						} else if(res.data.code == "CORE_E_207") {
							this.$router.push('/waitindex?regStatus='+"TN");
						} else if(res.data.code == "CORE_E_212") {
							this.next();

						} else if(res.data.code == "CORE_E_209") {
							Toast(res.data.desc);
						} else if(res.data.code == "CORE_E_208") {
							Toast(res.data.desc);
						} else {
							Toast(res.data.desc);
						}

					}, res => {
						Indicator.close();
						console.log("2===失败1" + res.data)
					});
				}

			},
			//证件号码校验
			Idcard() {
				if(this.cardnum.length >= 18) {

					var IDdata = {
						"brokerSuretyCertiCode": this.cardnum
					}
					console.log(IDdata)
					Indicator.open();
					this.$http.post(this.$store.state.link + "/core/broker/checkIdCard", IDdata).then(res => {
						Indicator.close();
						console.log(res.data);
						if(res.data.code == "SYS_S_000") {
							if(parseInt(this.cardnum.substr(16, 1)) % 2 == 1) {
								this.nv = true;
								this.nan = true;
								this.feamle = "M";
							} else {
								this.nv = false;
								this.nan = false;
								this.feamle = "F";
							}

						} else if(res.data.code == "CORE_E_211") {
							Toast("身份证输入有误")
						}
					}, res => {
						Indicator.close();
						console.log("2===失败1" + res.data)
					});
				} else {
					this.nv = true;
					this.nan = true;
					this.feamle = "M";
				}
			}
		},

	}
</script>

<style scoped="scoped">
	.divwidth {
		width: 1.2rem;
		float: left;
	}
	
	.confirmation_all {
		width: 100%;
		height: 100%;
		/*	position: absolute;*/
		background: url(/static/img/sign/bg.png) no-repeat;
		background-size: cover;
		overflow: hidden;
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
	
	.confirm_div_card {
		width: 3.5rem;
		display: inline-block;
		line-height: 0.8rem;
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
	
	.bottom {
		width: 6.86rem;
		height: 1.52rem;
		background: url(/static/img/sign/bot.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		margin-top: .32rem;
		position: relative;
	}
	
	.logo {
		position: absolute;
		bottom: .14rem;
		width: .68rem;
		height: .52rem;
		left: 3.1rem;
	}
	
	.confirmation_div_postion {}
	
	.logo_bottom {
		position: absolute;
		bottom: .14rem;
		width: .68rem;
		height: .52rem;
		left: 3.1rem;
	}
	
	.confirm_text {
		margin-top: 0.3rem;
		padding: 0 0.95rem;
	}
	
	.confirm_car {
		font-size: 0.24rem;
		color: #000000;
		line-height: 0.2rem;
	}
	
	.file_wrap {
		width: 5.52rem;
		height: 2.98rem;
		position: relative;
		top: .32rem;
	}
	
	.confirm_img {
		width: 5.52rem;
		height: 2.98rem;
		position: absolute;
		z-index: 0;
		/*margin: 0.32rem auto;*/
	}
	
	.file {
		width: 5.52rem;
		height: 2.98rem;
		position: absolute;
		z-index: 1;
		opacity: 0;
	}
	
	.confirm_margin {
		font-size: 0.24rem;
		color: #000000;
		line-height: 0.2rem;
		margin-top: 0.7rem;
	}
	
	.confirm_lin {
		margin-top: 0.86rem;
	}
	
	.div_clean {
		clear: both;
	}
	
	.div_clean1 {
		clear: both;
		margin-top: 0.37rem;
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
	}
	
	.confirm_sex_man {
		/*margin-right: 0.2rem;
		margin-left: 0.8rem;*/
		display: inline-block;
	}
	
	.confirm_sex {
		/*margin-left: 0.8rem;
		margin-right: 0.2rem;*/
		display: inline-block;
		float: left;
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
	
	.div_next {
		margin-top: 0.85rem;
	}
	
	.confirm_next_up {
		background: url(/static/img/sign/btn2.png) no-repeat;
		background-size: contain;
		width: 6.34rem;
		height: 0.96rem;
		margin: 0.8rem auto;
	}
	
	.confirm_div_up {
		width: 3.17rem;
		height: 0.96rem;
		display: inline-block;
		border: 1px solid red;
		line-height: 0.96;
		text-align: center;
	}
	
	.confirm_div_next {
		width: 3.17rem;
		height: 0.96rem;
		display: inline-block;
	}
	
	.btn {
		width: 6.34rem;
		height: .96rem;
		background: url(/static/img/sign/btn2.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		position: relative;
		margin-top: 0.69rem;
		text-align: center;
		line-height: 1.24rem;
		font-size: .48rem;
	}
	
	.left,
	.right {
		width: 3.17rem;
		height: 1rem;
		font-size: .32rem;
		line-height: .96rem;
		float: left;
	}
	
	.code_w {
		width: 5.6rem;
		/*height: 1.7rem;*/
		margin: 0 auto;
		margin-top: .22rem;
	}
	
	.code_wss {
		width: 5.6rem;
		margin: 0 auto;
		margin-top: .22rem;
	}
	
	.code_w1 {
		width: 5.6rem;
		/*height: 1.7rem;*/
		margin: 0 auto;
		margin-top: .85rem;
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
	
	.codelong {
		width: 5.6rem;
		height: .8rem;
		margin-left: 1.68rem;
	}
	
	.yao {
		float: left;
		width: 1.68rem;
		text-align: right;
		font-size: .28rem;
		color: #000000;
		line-height: .8rem;
	}
	
	.name {
		width: 3rem;
		height: .8rem;
		float: left;
		/*	margin-left: 1.46rem;*/
		font-size: .28rem;
		border: none;
		background: none;
		margin: 0 auto;
		/*line-height: .8rem;*/
	}
	
	.name1 {
		width: 1.2rem;
		height: .8rem;
		float: left;
		font-size: .28rem;
		border: none;
		background: none;
		margin: 0 auto;
		max-width: 1.2rem;
		overflow: hidden;
		padding-right: 0.35rem;
	}
	
	.maxInput {
		max-width: 1.2rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.maxInput1 {
		max-width: 3.5rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.imgSex {
		width: 0.28rem;
		height: 0.28rem;
	}
	
	.imgSex1 {
		width: 0.34rem;
		height: 0.28rem;
	}
	
	.codeall {
		width: 1.5rem;
		height: 0.28rem;
	}
	
	.codespan {
		display: inline-block;
		vertical-align: middle;
		margin-left: 0.15rem;
		font-size: 0.28rem;
	}
	.custseven_sattus {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		z-index: 100;
		background: rgba(0, 0, 0, 0.20);
	}
	
	.custseven_sattus1 {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		z-index: 100;
		background: rgba(0, 0, 0, 0.20);
	}
	
	.cs_div_centen {
		overflow: hidden;
		width: 5.42rem;
		height: 3.56rem;
		margin: 0 auto;
		margin-top: 50%;
		border-radius: 0.16rem;
		background: rgba(248, 248, 248, 0.95);
		border-radius: 0.26rem;
		position: relative;
	}
	
	.cs_div_centen1 {
		overflow: hidden;
		width: 5.42rem;
		height: 3rem;
		margin: 0 auto;
		margin-top: 50%;
		border-radius: 0.16rem;
		background: rgba(248, 248, 248, 0.95);
		border-radius: 0.26rem;
		position: relative;
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
	
	.cs_div_openiput1 {
		width: 4.76rem;
		height: 1.23rem;
		margin: 0 auto;
		margin-top: 0.38rem;
		padding: 0 0.3rem 0 0.3rem;
	}
	
	.cust_p {
		text-align: justify;
		text-align: center;
		line-height: 0.5rem;
	}
	
	.cs_btn_bootom {
		width: 5.42rem;
		height: 0.89rem;
		position: absolute;
		bottom: 0;
		border-top: 0.01rem solid #CCCCCC;
	}
	.cs_btn_cancercust {
		display: block;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
		border-right: 0.01rem solid #CCCCCC;
	}
</style>