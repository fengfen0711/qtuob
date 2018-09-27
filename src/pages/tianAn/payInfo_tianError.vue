<template>
	<div class="one" :class="{opa0:!hui}" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div v-if="!mark_flag" class="ctc_div_mask" @touchmove.prevent>
			<div class="ctc_div_maskitem">
				<div class="ctc_div_labtitle">{{title}}</div>
				<div class="ctc_div_labtitle1">{{content}}</div>
				<div class="cs_btn_bootom">
					<div @click="cancel" class="cs_btn_cancer">知道了</div>
				</div>
			</div>
		</div>
		<div id="blur_all">
			<div class="div_titleName">
				<span class="pt_span_riskName">{{riskName}}</span>
				<div class="pt_div_item">
					<span class="pt_span_itemleft">保险期间</span>
					<span class="pt_span_itemright">{{guarantee}}</span>
				</div>
				<div class="pt_div_item1">
					<span class="pt_span_itemleft">基本保险金额</span>
					<span class="pt_span_itemright">{{quota}}</span>
				</div>
			</div>
			<div class="twoCon">
				<div class="policyHolder">
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">保险费</label>
						<span class="inputText lineHeight left">{{fiskFee}}</span>
					</p>
					<div class="pt_div_item1">
						<span class="pt_span_itemleft">支付方式</span>
						<div>
							<div class="pt_div_select" @click="sexChose2()">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="sexShow2" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="!sexShow2" />
								<label class="pt_span_select">实时支付</label>
								<img src="/static/img/questionMark.png" class="question imgopacity" />
							</div>
							<div class="pt_div_select" @click="sexChose1()">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="sexShow1" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="!sexShow1" />
								<label class="pt_span_select">银行转账</label>
								<img src="/static/img/questionMark.png" class="question imgopacity" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="twoCon">
				<div class="inputGrop1 clearFloat">
					<p class="inputP1 clearFloat">
						<label class="inputLabel left">开户行所在省市</label>
					</p>
					<p class="inputP1 clearFloat">
						<select class="left inputText1 inputWidth1" v-model="provinceBox" @change="provinceChange">
							<option :value="[province.cnCode,province.cnName]" v-for="province in provinceList">{{province.cnName}}</option>
						</select>
						<select class="left inputText1 inputWidth1 inputWidth2" v-model="cityBox" @change="cityChange">
							<option :value="[city.cnCode,city.cnName]" v-for="city in cityList">{{city.cnName}}</option>
						</select>
					</p>
				</div>
				<p class="inputGrop clearFloat">
					<label class="inputLabel2 left">付款银行</label>
					<label class="inputLabel3 left">(单笔最大限额{{bankDesc}}元)</label>
					<select class="inputText inputWidth left" v-model="bankCode" @change="bankDescClick">
						<option :value="coupon.bankCode" v-for="coupon in bankArray">{{coupon.bankName}}</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">户名</label>
					<span class="pt_span_itemright">{{bankName}}</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">付款账号</label>
					<input type="text" maxlength="23" class="inputText2 left" placeholder="请输入付款账号" v-model="bankNumber" @input="checknumber" />
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">确认账号</label>
					<input type="text" maxlength="23" class="inputText2  left" placeholder="请再次输入付款账号" v-model="bankNumber2" @input="checknumber1" />
				</p>
			</div>

			<div v-if="!newCardFlag" class="inforUpload_div1">
				<p class="inforUpload_p">投保人{{bankName}} 银行卡</p>
				<div class="inforUpload_img">
					<div id="" class="inforUpload_up">
						<img :src="c" class="inforUpload_up_img" />
						<input class="file" type="file" accept="image/*" name="file" @change="upload" code="3">
					</div>

				</div>
			</div>
			<p v-if="hui" class="warnP">若提供电子邮箱，则承保后同时提供电子保单和纸质保单，否则只提供纸质保单。</p>
			<p v-if="hui" class="sBox clearFloat " @click="sBoxShowHide">
				<img src="/static/noSelected.png" class="sImg left" v-show="sBoxShow" />
				<img src="/static/selected.png" class="sImg left" v-show="!sBoxShow" />
				<span class="sDes">我已阅读<span>《保险费自动转账授权声明》</span>。</span>
			</p>
			<p v-if="hui" class="warnP warnP1">1.银行账号的账户所有人为投保人，且开户银行以及账户信息真实可靠；</p>
			<p v-if="hui" class="warnP warnP2">2.投保人授权天安人寿保险股份有限公司委托投保人开户银行从上述银行账户按照保险和其他约定的方式、金额划款期、续期保险费。</p>
			<p v-if="hui" class="btnBox clearFloat" :class="{btnBox1:btnBoxShow}">
				<span class="btn btn1 left" @click="handleClickUp">上一步</span>
				<span class="btn left" @click="handleClickNext">下一步</span>
			</p>
		</div>
	</div>
</template>

<script>
	import Exif from 'exif-js'
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "PayInfo_tian",
		props: ['backview'],
		data() {
			return {
				newCardFlag: true,
				c1: "",
				c: "/static/img/banka.png",
				fiskFee: "",
				quota: "",
				guarantee: "",
				riskName: "",
				bankNumber2: '',
				bankCode: '',
				bankDesc: '',
				bankNumber: '',
				bankName: '',
				content: '',
				title: '',
				mark_flag: true,
				ingflag: true,
				sexShow: false,
				sexShow1: true,
				sexShow2: true,
				btnBoxShow: false,
				sBoxShow: true,
				provinceBox: [],
				provinceType: '',
				provinceName: '',
				provinceList: [],
				cityBox: [],
				cityType: '',
				cityName: '',
				cityList: [],
				nowTime: '',
				bankArray: [],
				allData: {},
				hui: true
			}
		},
		created() {
			if(this.$route.query.status == "N") {
				this.newCardFlag = false;
			}
			if(this.backview == "hui") {
				this.hui = false;
			}
			this.init(); //初始化
			this.pro();
		},
		methods: {
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
							self.c = this.result
							self.postImg(this.result, code);
						} else {
							Indicator.close()
							img.onload = function() {
								let data = self.compress(img, Orientation);
								self.c = data
								self.postImg(data, code);
							}
						}
					}
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
			postImg(data, code) {
				//这里写接口  
				var a = data.split(";")[0].split("/")[1];
				var base64Info = {
					"fileType": a,
					"imgList": [
						data
					],
					"uploadType": "2030"
				}
				console.log(base64Info)
				this.$http.post(this.$store.state.link2 + '/fastdfs/filebase64', base64Info)
					.then(res => {
						console.log(res.data);
						Indicator.close();
						if(res.data.code == "SYS_S_000") {
							this.c1 = res.data.output[0].fileSerialNo
							var docReq = [];
							var obj = {
								"docFileName": "投保人银行卡正面", //单证文件名 
								"docType": "014", //单证类型
								"fileSerialNo": this.c1, //文件序列号 : 文件在影像系统唯一标识 
								"remark": "", //备注 
								"showOrder": 3 //显示顺序
							}
							docReq.push(obj)
							var data = {
								"token": this.$store.state.token,
								"userId": this.$store.state.userId,
								"mark": "UC",
								"head": {
									"channelCode": "qtb_h5",
									"deptCode": this.$route.query.cmpCode,
									"oprCode": this.$store.state.userId,
									"prodCode": this.$route.query.prodCode
								},
								"opt": "DOC",
								"pkgNo": this.$route.query.orderNo, //订单号
								"docReq": docReq
							}
							Indicator.open();
							this.$http.post(this.$store.state.link + '/trd/order/v1/saveorder', data)
								.then(res => {
									Indicator.close();
									console.log("===" + JSON.stringify(res.data))
									var dataCode = res.data.code;
									if(dataCode == "SYS_S_000") {} else {
										this.c = "/static/img/banka.png";
										this.c1 = "";
										Toast(res.data.desc);
									}
								}, res => {
									Indicator.close();
									this.c = "/static/img/banka.png";
									this.c1 = "";
									console.log(res.data);
								})

						}
					}, res => {
						Indicator.close();
						console.log("==2" + res.data);
					})
			},
			checknumber() {
				this.bankNumber = this.bankNumber.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ")
			},
			checknumber1() {
				this.bankNumber2 = this.bankNumber2.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ")
			},
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
					"opt": "APPL,PAY,MAIN,CVRG",
					"pkgNo": this.$route.query.orderNo, //订单号
				}
				//回显数据
				this.$http.post(this.$store.state.link + '/trd/order/v1/queryorder', data)
					.then(res => {
						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							//							console.log("====" + JSON.stringify(res.data.output))
							this.allData = res.data.output;
							this.bankInit(); //银行
							this.fiskFee = this.allData.mainResp.sumPrem + "元";
							this.riskName = this.allData.mainResp.prodName;
							for(var i = 0; i < this.allData.cvrgResp.length; i++) {
								if(this.allData.cvrgResp[i].cvrgType == "M") {
									if(this.allData.cvrgResp[i].insuNo.indexOf("A") != "-1") {
										this.guarantee = "无关";
									} else if(this.allData.cvrgResp[i].insuNo.indexOf("C") != "-1") {
										this.guarantee = "保" + this.allData.cvrgResp[i].insuNo.substr(1, this.allData.cvrgResp[i].insuNo.length) + "年";
									} else if(this.allData.cvrgResp[i].insuNo.indexOf("D") != "-1") {
										this.guarantee = "保到" + this.allData.cvrgResp[i].insuNo.substr(1, this.allData.cvrgResp[i].insuNo.length) + "岁";
									} else if(this.allData.cvrgResp[i].insuNo.indexOf("E") != "-1") {
										this.guarantee = "保" + this.allData.cvrgResp[i].insuNo.substr(1, this.allData.cvrgResp[i].insuNo.length) + "月";
									} else {
										this.guarantee = "保终身";
									}
									this.quota = this.allData.cvrgResp[i].amnt + "元";
								}
							}
							if(this.allData.paymentResp.accName != undefined) {
								this.bankNumber = this.allData.paymentResp.accNo.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ")
							}
							if(this.allData.paymentResp.payType != undefined) {
								console.log("====2====1===1==" + this.allData.paymentResp.payType)
								if(this.allData.paymentResp.payType == "1") {
									//									this.sexShow1 == true
									//									this.sexShow2 == true
									this.sexChose2();
								} else if(this.allData.paymentResp.payType == "2") {
									//									this.sexShow1 == false
									//									this.sexShow2 == true
									this.sexChose1();
								}
							}
							if(this.allData.paymentResp.accNo != undefined) {
								this.bankNumber2 = this.allData.paymentResp.accNo.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ")
							}
							if(this.allData.applntResp.applName == undefined || this.allData.applntResp.applName == "") {} else {
								this.bankName = this.allData.applntResp.applName;
							}
							if(this.allData.paymentResp.provinceName != undefined) {
								this.provinceType = this.allData.paymentResp.provinceCode
								this.cityType = this.allData.paymentResp.cityCode
								for(let i = 0; i < this.provinceList.length; i++) {
									if(this.provinceType == this.provinceList[i].cnCode) {
										this.provinceBox = [this.provinceList[i].cnCode, this.provinceList[i].cnName]
										this.provinceType = this.provinceList[i].cnCode
										this.city()
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
			pro() {
				var provinceinfo = {
					"code": "0",
					"orgCode": this.$route.query.cmpCode
				}
				//				console.log(provinceinfo)
				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', provinceinfo)
					.then(res => {
						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.provinceList = res.data.output
							this.provinceBox = [this.provinceList[0].cnCode, this.provinceList[0].cnName]
							this.provinceType = this.provinceList[0].cnCode;
							this.provinceName = this.provinceList[0].cnName;
							this.city()
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			city() {
				var cityinfo = {
					"code": this.provinceType,
					"orgCode": this.$route.query.cmpCode
				}
				this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', cityinfo)
					.then(res => {
						//				    console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.cityList = res.data.output
							if(this.allData.paymentResp && this.allData.paymentResp.cityCode) {

							} else {
								this.cityType = ""
							}
							if(this.cityType == "") {
								this.cityBox = [this.cityList[0].cnCode, this.cityList[0].cnName]
								this.cityType = this.cityList[0].cnCode;
								this.cityName = this.cityList[0].cnName;
							} else {
								for(let i = 0; i < this.cityList.length; i++) {
									if(this.cityType == this.cityList[i].cnCode) {
										this.cityBox = [this.cityList[i].cnCode, this.cityList[i].cnName]
										this.cityType = this.cityList[i].cnCode;
										this.cityName = this.cityList[i].cnName;
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
			provinceChange() {
				this.provinceType = this.provinceBox[0]
				this.provinceName = this.provinceBox[1]
				this.city()
			},
			cityChange() {
				this.cityType = this.cityBox[0]
				this.cityName = this.cityBox[1]
			},
			bankInit() {
				var data = {
					"dicReq": "000034"
				}

				this.$http.post(this.$store.state.link + '/dic/findBankByOrgCode', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.bankArray = res.data.output;

							if(this.allData.paymentResp.bankCode != undefined) {
								this.bankCode = this.allData.paymentResp.bankCode;
							} else {
								this.bankCode = res.data.output[0].bankCode;
								this.bankDesc = res.data.output[0].bankLimit;
							}
							//							console.log(JSON.stringify(res.data.output))
							//							console.log(res.data.output[0].bankLimit)
							//							console.log(this.bankDesc)
							for(var i = 0; i < this.bankArray.length; i++) {
								if(this.bankCode == this.bankArray[i].bankCode) {
									this.bankDesc = this.bankArray[i].bankLimit;
								}
							}
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			bankDescClick() {
				for(var i = 0; i < this.bankArray.length; i++) {
					if(this.bankCode == this.bankArray[i].bankCode) {
						this.bankDesc = this.bankArray[i].bankLimit;
					}
				}
			},
			cancel() {
				var blur_all = document.getElementById("blur_all");
				blur_all.setAttribute("class", "blur_all");
				this.mark_flag = true;
			},
			questionMarkDetail(index) {
				var blur_all = document.getElementById("blur_all");
				blur_all.setAttribute("class", "blur_all1");

				this.mark_flag = false;
				if(index == "1") { //前面
					this.title = "实时扣款";
					this.content = "实时扣款指提交成功之后银行将款项从投保人银行账户直接划转到保险公司的账户。"
				} else { //后面
					this.title = "银行转账"
					this.content = "银行转账指投保人与保险公司在约定的交费时间内，银行将款项从投保人银行账户直接划转到保险公司的账户。"
				}
			},
			sexChose(index) {
				if(index == "1") { //实时扣款
					this.sexShow = false;
				} else { //银行转账
					this.sexShow = true;
				}
			},
			sexChose1(index) {
				//				if(index == "1") { //实时扣款
				//					this.sexShow1 = false;
				//				} else { //银行转账
				//					this.sexShow1 = true;
				//				}
				this.sexShow1 = false;
				this.sexShow2 = true;
			},
			sexChose2(index) {
				//				if(index == "1") { //实时扣款
				//					this.sexShow2 = false;
				//				} else { //银行转账
				//					this.sexShow2 = true;
				//				}
				this.sexShow1 = true;
				this.sexShow2 = false;
			},
			sBoxShowHide() {
				this.sBoxShow = !this.sBoxShow
			},
			handleClickUp() {
				window.history.go(-1)
			},
			handleClickNext() {
				if(this.sBoxShow) {
					Toast("请先阅读保险费自动转账授权声明")
				} else {
					if(this.sexShow1 == true && this.sexShow2 == true) {
						Toast("请选择支付方式")
						return;
					}
					if(this.bankNumber == "") {
						Toast("银行账号不得为空")
						return;
					}

					if(this.bankNumber == "") {
						Toast("确认账号不得为空")
						return;
					}
					if(this.bankNumber != this.bankNumber2) {
						Toast("账号不一致")
						return;
					}
					var bankCodeName; //银行名字

					for(var i = 0; i < this.bankArray.length; i++) {
						if(this.bankArray[i].bankCode == this.bankCode) {
							bankCodeName = this.bankArray[i].bankName;
						}
					}
					var payType;
					if(this.sexShow1 == true) { //实时
						payType = "1";
					} else { //银行转账
						payType = "2";
					}
					if(this.newCardFlag == false && this.c1 == "") {
						Toast("请上传投保人银行卡")
						return;
					}
					if(this.newCardFlag == false && this.allData.paymentResp.accNo == this.bankNumber.replace(/\s/g, "")) {
						Toast("请输入新卡卡号")
						return;
					}
					if(this.newCardFlag == true) {
						var data = { //支付
							"token": this.$store.state.token,
							"userId": this.$store.state.userId,
							"head": {
								"channelCode": "qtb_h5",
								"deptCode": this.$route.query.cmpCode,
								"oprCode": this.$store.state.userId,
								"prodCode": this.$route.query.prodCode
							},
							"paymentReq": {
								"accName": this.allData.paymentResp.accName, //行账户姓名 ,
								"accNo": this.allData.paymentResp.accNo, //银行账户
								"bankCode": this.allData.paymentResp.bankCode, //银行代码 ,
								"bankLocationCode": this.allData.paymentResp.bankLocationCode, //开户行网点代码 
								"bankLocationName": this.allData.paymentResp.bankLocationName, //开户行网点名 ,
								"bankName": this.allData.paymentResp.bankName, //银行名称
								//						"cardType": this.allData.paymentResp.cityCode,//折类型 : 见数据字典 ,
								"cityCode": this.allData.paymentResp.cityCode, //开户行所在市代码 ,
								"cityName": this.allData.paymentResp.cityName, //开户行所在市 ,
								"countyCode": this.allData.paymentResp.countyCode, //开户行所在县代码 ,
								"countyName": this.allData.paymentResp.countyName, //开户行所在县 ,
								"mark": "1", //标志位:1-支付 0-续期支付 ,
								"payMode": this.allData.paymentResp.payMode, //支付方式 见数据字典 ,
								"payPrem": this.allData.paymentResp.payPrem, //支付金额 ,
								"payType": this.allData.paymentResp.payType, //支付标识 : 1-实时;2-线下 
								"pkgNo": this.allData.paymentResp.pkgNo, //订单号 ,
								//										"policyDeliveryFee": 0, //快递费 
								"provinceCode": this.allData.paymentResp.provinceCode, // 开户行所在省代码 ,
								"provinceName": this.allData.paymentResp.provinceName // 开户行所在省
							},
							"pkgNo": this.$route.query.orderNo
						}
						console.log("==" + JSON.stringify(data))
						this.$http.post(this.$store.state.link + '/trd/pay/v1/payment', data)
							.then(res => {
								console.log("==" + JSON.stringify(res.data))
								var dataCode = res.data.code;
								if(dataCode == "SYS_S_000") {
									if(res.data.output.code == this.$store.state.orderState.PAY_FAL) { //11-失败,09-成功 ,
										this.$router.push('/payResult?message=N&mesesult=' + res.data.output.message)
									} else if(res.data.output.code == this.$store.state.orderState.PAY) { //11-失败,09-成功 ,
										this.$router.push('/payResult?message=Y')
									}
								} else {
									Toast(res.data.desc);
								}
							}, res => {
								console.log(res.data);
							})
					} else {
						var paymentReqData = {
											"mark": "1",
											"accName": this.bankName, //银行账户姓名
											"accNo": this.bankNumber.replace(/\s/g, ""), //银行账户
											"bankCode": this.bankCode, //银行代码
											"bankName": bankCodeName, //银行名称
											//						"cardType": "string", //卡折类型 : 0-借记卡;1-存折 
											"cityCode": this.cityType, //开户行所在市代码 
											"cityName": this.cityName, //开户行所在市 
											"payMode": "4", //支付方式 9-网银电汇转账 J-网络支付 
											"payPrem": this.allData.mainResp.initialPremamt, //支付金额 
											"payType": payType, //支付标识 : 1-实时;2-线下 
											//						"policyDeliveryFee": 0, //快递费
											"provinceCode": this.provinceType, //开户行所在省代码 
											"provinceName": this.provinceName //开户行所在省
										}
										var data = {
											"token": this.$route.query.token,
											"userId": this.$route.query.userId,
											"mark": "CALC",
											"head": {
												"channelCode": "qtb_h5",
												"deptCode": this.$route.query.cmpCode,
												"oprCode": this.$route.query.userId,
												"prodCode": this.$route.query.prodCode
											},
											"opt": "PAY",
											"pkgNo": this.$route.query.orderNo, //订单号
											"paymentReq": paymentReqData,
											"upPay":"1"
										}
										Indicator.open();
										console.log("请求报文=====" + JSON.stringify(data))
										this.$http.post(this.$store.state.link + '/trd/order/v1/saveorder', data)
											.then(res => {
												Indicator.close();
												console.log("响应数据=====" + JSON.stringify(res.data))
												if(res.data.code == "SYS_S_000") {
													this.$router.push('/bankCardEnter?prodCode=' + this.$route.query.prodCode + "&bankCode=" + this.bankNumber.replace(/\s/g, "") + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
												};
											}, res => {
												Indicator.close();
												console.log(res.data);
											})
						
					}
										
										

					//					this.$router.push('/taInsureNine')
				}
			}
		},
		watch: {

		}
	}
</script>

<style scoped="scoped">
	.left {
		float: left;
	}
	
	.right {
		float: right;
	}
	
	input,
	button {
		background: none;
		border: none;
	}
	
	input,
	button {
		outline: none;
	}
	
	input::-ms-clear {
		display: none;
		width: 0;
		height: 0;
	}
	
	input::-ms-reveal {
		display: none;
	}
	
	textarea::-webkit-input-placeholder,
	input::-webkit-input-placeholder {
		color: #B2B2B2;
	}
	
	input:-ms-input-placeholder {
		color: #B2B2B2;
	}
	
	.ctc_div_labtitle1 {
		width: 85%;
		margin: 0 auto;
		font-size: 0.3rem;
		/*text-align: center;*/
		color: #555555;
		margin-top: 0.2rem;
		line-height: 0.48rem;
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
		width: 100%;
		height: 0.88rem;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
		/*border-right: 0.01rem solid #CCCCCC;
		box-sizing: border-box;*/
	}
	
	.cs_btn_cancer1 {
		display: block;
		float: left;
		width: 2.705rem;
		height: 0.88rem;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
		/*box-sizing: border-box;*/
	}
	
	.blur_all {
		width: 100%;
		height: 100%;
	}
	
	.blur_all1 {
		filter: blur(0.18rem);
	}
	
	.backg {
		background: #669900;
	}
	
	.ctc_div_ok {
		width: 2rem;
		height: 0.8rem;
		margin: 0 auto;
		margin-top: 0.8rem;
		font-size: 0.4rem;
		text-align: center;
		color: #FFFFFF;
		line-height: 0.8rem;
		border-radius: 0.5rem;
		background: #EB7760;
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
	
	.ctc_div_labtitle {
		width: 100%;
		margin: 0 auto;
		font-size: 0.36rem;
		text-align: center;
		color: #555555;
	}
	
	.ctc_div_maskitem {
		width: 5.44rem;
		height: 3.6rem;
		background: #ffffff;
		margin: 0 auto;
		margin-top: 50%;
		border-radius: 0.16rem;
		padding-top: 0.28rem;
		position: relative;
	}
	
	.sex {
		display: inline-block;
		height: 0.88rem;
		/*margin-right: 0.46rem;*/
		overflow: hidden;
	}
	
	.sexM {
		/*margin-right: 0.46rem;*/
	}
	
	.sexImg {
		display: inline-block;
		float: left;
		margin-top: 0.2rem;
		width: 0.48rem;
		height: 0.48rem;
		margin-right: 0.06rem;
	}
	
	.question {
		display: inline-block;
		float: right;
		margin-top: 0.24rem;
		margin-left: 0.16rem;
		width: 0.38rem;
		height: 0.38rem;
	}
	
	.imgopacity {
		opacity: 0;
	}
	
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	
	.inputSpan {
		display: inline-block;
		line-height: 0.88rem;
	}
	
	.one {
		width: 100%;
		min-height: 100%;
		position: absolute;
		background: #F3F3F3;
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
	
	.inforUpload_up_img {
		width: 2.46rem;
		height: 1.68rem;
		display: block;
	}
	
	.oneTitle {
		width: 100%;
		height: 1.28rem;
		padding-top: 0.32rem;
		background: #FFFFFF;
	}
	
	.oneTitleText {
		height: 0.34rem;
		line-height: 0.34rem;
		font-size: 0.26rem;
		color: #999999;
	}
	
	.oneTitleTextSpan1 {
		margin-left: 0.32rem;
	}
	
	.oneTitleTextSpan2 {
		margin-left: 2rem;
	}
	
	.div_titleName {
		padding-top: 0.12rem;
		background: #FFFFFF;
	}
	
	.pt_span_riskName {
		display: block;
		width: 6.7rem;
		margin: 0 auto;
		color: #222222;
		border-bottom: 0.01rem solid #C8C7CC;
		font-size: 0.36rem;
		line-height: 0.84rem;
		font-weight: bold;
	}
	
	.pt_div_item {
		display: block;
		width: 6.7rem;
		height: 0.86rem;
		margin: 0 auto;
		border-bottom: 0.01rem solid #C8C7CC;
	}
	
	.pt_div_item1 {
		display: block;
		width: 6.7rem;
		height: 0.86rem;
		margin: 0 auto;
	}
	
	.pt_span_itemleft {
		display: block;
		float: left;
		width: 2.04rem;
		color: #555555;
		font-size: 0.28rem;
		line-height: 0.84rem;
		font-weight: bold;
	}
	
	.pt_div_select {
		display: block;
		float: left;
		height: 0.84rem;
	}
	
	.mafleft {
		margin-left: 2.04rem;
	}
	
	.pt_span_select {
		color: #333333;
		font-size: 0.28rem;
		line-height: 0.84rem;
	}
	
	.pt_span_itemright {
		display: block;
		float: left;
		color: #555555;
		font-size: 0.28rem;
		line-height: 0.84rem;
	}
	
	.oneTitleTextSpan3 {
		margin-right: 0.32rem;
	}
	
	.ranchImg {
		display: block;
		width: 6.4rem;
		height: 0.48rem;
		margin: 0 auto;
		margin-bottom: 0.2rem;
	}
	
	.selected {
		color: #EB7760;
	}
	
	.twoCon {
		padding: 0 0.4rem;
		margin-top: 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
		overflow: scroll;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	
	.twoCon::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: #fff;
	}
	
	.title_twoCon {
		height: 1.11rem;
		line-height: 1.11rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	
	.borderNone {
		border: none;
	}
	
	.titleLable_twoCon {
		display: inline-block;
		font-size: 0.34rem;
		font-weight: bold;
		color: #222222;
	}
	
	.btnImg {
		display: inline-block;
		width: 0.56rem;
		height: 0.56rem;
	}
	
	.btnBox {
		padding: 0 0.4rem;
		padding-bottom: 0.64rem;
		text-align: center;
	}
	
	.btnBox1 {
		position: absolute;
		left: 0;
		bottom: 0.64rem;
		padding-bottom: 0;
	}
	
	.btn {
		display: inline-block;
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		border: 0.02rem solid #EB7760;
		box-shadow: inset 0 0.01rem 0.03rem 0 rgba(255, 255, 255, 0.50);
		border-radius: 0.5rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
	}
	
	.btn1 {
		margin-right: 0.3rem;
	}
	
	.inputGrop1 {
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	
	.inputGrop {
		position: relative;
		height: 0.88rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	
	.inputLabel {
		display: block;
		width: 2.04rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		/*background: #669900;*/
	}
	
	.inputLabel3 {
		display: block;
		width: 2.8rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: red;
		font-size: 0.24rem;
		/*background: #669900;*/
	}
	
	.inputLabel2 {
		display: block;
		width: 1.2rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
	}
	
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
	}
	
	.inputText2 {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
		width: 4.5rem;
	}
	
	.inpuDate {
		width: 3rem;
	}
	
	select {
		/*text-align-last: center;*/
		padding-right: 0.48rem;
		border: none;
		background: none;
		background: url(/static/upDown.png) no-repeat right center;
		background-size: 0.4rem 0.45rem;
		outline: none;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}
	
	.dateBox {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 1;
		display: block;
		height: 0.88rem;
		padding: 0 0.26rem;
		line-height: 0.88rem;
		background: #FFFFFF;
		border-left: solid 0.01rem #C8C7CC;
	}
	
	.dateBox1 {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 1;
		display: block;
		width: 1.8rem;
		height: 0.87rem;
		padding: 0 0.26rem;
		line-height: 0.88rem;
		background: #FFFFFF;
	}
	
	.file {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		opacity: 0;
	}
	
	.selImg {
		display: block;
		float: left;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: 0.2rem;
		margin-right: 0.26rem;
	}
	
	.selectBox {
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
	}
	
	.inputText1 {
		font-size: 0.28rem;
		color: #333333;
	}
	
	.pro {
		width: 3.6rem;
	}
	
	.dateInput {
		width: 3.4rem;
	}
	
	.inputWidth {
		width: 2.66rem;
		padding-left: 0;
	}
	
	.inputWidth1 {
		width: 3rem;
		height: 0.88rem;
	}
	
	.inputWidth2 {
		margin-left: 0.5rem;
	}
	
	.inputselect {
		height: 0.68rem;
	}
	
	.sBox {
		padding: 0 0.4rem;
		margin-bottom: 0.44rem;
		font-size: 0.28rem;
		line-height: 0.4rem;
	}
	
	.sImg {
		display: block;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: -0.04rem;
	}
	
	.sDes {
		margin-left: 0.16rem;
	}
	
	.sSpan {
		color: #6BD1CF;
	}
	
	.inputselectP {
		position: relative;
		height: 0.68rem;
	}
	
	.upDownImg {
		position: absolute;
		right: 0;
		top: 0.22rem;
		z-index: 3;
		width: 0.4rem;
		height: 0.44rem;
	}
	
	.upDownImg1 {
		top: 0.12rem;
	}
	
	.upDownImg2 {
		right: 2rem;
	}
	
	input[type=date]::-webkit-inner-spin-button {
		visibility: hidden;
	}
	
	input[type=date]::-webkit-calendar-picker-indicator {
		width: 0;
		height: 0;
		opacity: 0;
	}
	
	input[type=date]::-webkit-clear-button {
		visibility: hidden;
	}
	
	.twoCon .inputGrop:last-child {
		border: none;
	}
	
	.twoCon1 {
		margin-top: 0.4rem;
	}
	
	.sumBtn {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 3;
		width: 0.5rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.6rem;
		text-align: center;
		color: #EB7760;
	}
	
	.lineHeight {
		display: block;
		line-height: 0.88rem;
	}
	
	.meBox .inputGrop:last-child {
		border-bottom: solid 0.01rem #C8C7CC;
	}
	
	.warnP {
		padding: 0 0.4rem;
		margin: 0.38rem 0 0.34rem 0;
		line-height: 0.34rem;
		font-size: 0.24rem;
		color: #FEA231;
	}
	
	.warnP1 {
		margin-bottom: 0;
	}
	
	.warnP2 {
		margin-top: 0;
	}
	
	.opa0 {
		z-index: 2;
	}
	
	.inputP1 {
		position: relative;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.28rem;
	}
</style>