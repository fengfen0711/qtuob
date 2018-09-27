<template>
	<div class="inforUpload">
		<div class="inforUploadW">
			<div class="inforUpload_all" style="line-height:10rem;text-align:center;" v-if="!isnetwork">
				网络连接异常
			</div>
			<div class="inforUpload_all" v-if="isnetwork">
				<div class="inforUpload_div">
					<p class="inforUpload_p">投保人{{aName}} 证件</p>
					<div class="inforUpload_img">
						<div id="" class="inforUpload_up" v-for="item in holderImgObj.imgArr" :key="item.key" v-if="item.type==1">
							<img :src="item.img" class="inforUpload_up_img" />
							<input class="file" type="file" accept="image/*" name="file" @change="upload($event,item)">
						</div>
						<div id="" class="inforUpload_up inforUpload_right" v-for="item in holderImgObj.imgArr" :key="item.key" v-if="item.type==2">
							<img :src="item.img" class="inforUpload_up_img" />
							<input class="file" type="file" accept="image/*" name="file" @change="upload($event,item)">
						</div>
					</div>
				</div>
				<!-- 银行之类的影像 -->
				<div class="inforUpload_div1">
					<p class="inforUpload_p">投保人{{aName}} 存折或借记(有效收费凭)银行卡</p>
					<div class="inforUpload_img">
						<div id="" class="inforUpload_up" v-for="item in bankImgObj.imgArr" :key="item.key" v-if="item.type==1">
							<img :src="item.img" class="inforUpload_up_img" />
							<input class="file" type="file" accept="image/*" name="file" @change="upload($event,item)">
						</div>
					</div>
				</div>
				<!-- 被保人影像 -->
				<div v-if="relationshipFlag" class="inforUpload_div1 ">
					<p class="inforUpload_p">被保险人{{iName}} 证件</p>
					<div class="inforUpload_img">
						<div id="" class="inforUpload_up" v-for="item in insureImgObj.imgArr" :key="item.key" v-if="item.type==1">
							<img :src="item.img" class="inforUpload_up_img" />
							<input class="file" type="file" accept="image/*" name="file" @change="upload($event,item)">
						</div>
						<div id="" class="inforUpload_up inforUpload_right" v-for="item in insureImgObj.imgArr" :key="item.key" v-if="item.type==2">
							<img :src="item.img" class="inforUpload_up_img" />
							<input class="file" type="file" accept="image/*" name="file" @change="upload($event,item)">
						</div>
					</div>
				</div>
				<!-- 受益人影像 -->
				<div class="inforUpload_div1" v-for="ben in benefitBankImgObj" :key="ben.key">
					<p class="inforUpload_p">受益人{{ben.name}} 存折或借记(有效收费凭)银行卡</p>
					<div class="inforUpload_img">
						<div id="" class="inforUpload_up" v-for="item in ben.imgArr" :key="item.key" v-if="item.type==1">
							<img :src="item.img" class="inforUpload_up_img" />
							<input class="file" type="file" accept="image/*" name="file" @change="upload($event,item)">
						</div>
					</div>
				</div>
				<div v-if="benefitImgObj.length>0" class="inforUpload_div1 " v-for="ben in benefitImgObj" :key="ben.key">
					<p class="inforUpload_p">受益人{{ben.name}} 证件</p>
					<div class="inforUpload_img">
						<div id="" class="inforUpload_up" v-for="item in ben.imgArr" :key="item.key" v-if="item.type==1">
							<img :src="item.img" class="inforUpload_up_img" />
							<input class="file" type="file" accept="image/*" name="file" @change="upload($event,item)">
						</div>
						<div id="" class="inforUpload_up inforUpload_right" v-for="item in ben.imgArr" :key="item.key" v-if="item.type==2">
							<img :src="item.img" class="inforUpload_up_img" />
							<input class="file" type="file" accept="image/*" name="file" @change="upload($event,item)">
						</div>
					</div>
				</div>
			</div>
			<div class="information_bottom_btn">
				<span class="information_bottom" @click="back">上一步</span>
				<span class="information_next" @click="handleClickNext">下一步</span>
			</div>
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
				iName: "",
				headerImage: '',
				picValue: '',
				isnetwork:true,
				holderImgObj:{
					imgArr:[
						{
							"imgList": [],//base64数组
							"img": "/static/img/ida.png",//影响件地址--用于回显为全地址
							"uploadType": "2026",//影响类型
							"docFileName": "投保人身份证正面",
							"docType": "00401010",
							"fileSerialNo": "",//影响件地址
							"remark": "正",
							"type": 1,
							"showOrder": 1
						},
						{
							"imgList": [],//base64数组
							"img": "/static/img/IdCard.png",//base64
							"uploadType": "2027",//影响类型
							"docFileName": "投保人身份证反面",
							"docType": "00401010",
							"fileSerialNo": "",//影响件地址
							"remark": "反",
							"type": 2,
							"showOrder": 2
						},
					],
				},//投保人影像对象
				bankImgObj:{
					imgArr:[
						{
							"imgList": [],//base64数组
							"img": "/static/img/banka.png",//影响件地址--用于回显为全地址
							"uploadType": "2026",//影响类型
							"docFileName": "投保人银行正面",
							"docType": "00401010",
							"fileSerialNo": "",//影响件地址
							"remark": "正",
							"type": 1,
							"showOrder": 1
						},
					],
				},//银行卡类影像对象
				insureImgObj:{
					imgArr:[
						{
							"imgList": [],//base64数组
							"img": "/static/img/ida.png",//base64
							"uploadType": "2029",//影响类型
							"docFileName": "投保人身份证正面",
							"docType": "00401010",
							"fileSerialNo": "",//影响件地址
							"remark": "正",
							"type": 1,
							"showOrder": 1
						},
						{
							"imgList": [],//base64数组
							"img": "/static/img/IdCard.png",//base64
							"uploadType": "2029",//影响类型
							"docFileName": "投保人身份证反面",
							"docType": "00401010",
							"fileSerialNo": "",//影响件地址
							"remark": "反",
							"type": 2,
							"showOrder": 2
						},
					],
				},//目前处理成单被保人
				benefitBankImgObj:[],//受益人银行为数组暂且处理成空，根据业务逻辑在created里面进行初始化
				benefitImgObj:[],//受益人身份证件为数组暂且处理成空，根据业务逻辑在created里面进行初始化
				a: "/static/img/ida.png",
				b: "/static/img/IdCard.png",
				c: "/static/img/banka.png",
				d: "/static/img/ida.png",
				e: "/static/img/IdCard.png",
				a1: "",
				b1: "",
				c1: "",
				d1: "",
				e1: "",
				allData: {},
				shou: "",
				Tf:true,
				Bf:true

			}
		},
		created() {
			//			this.nationalitySelect();
			var ss = utils.getMaxOrMinObj("max","hhhhhhh哈哈哈哈哈哈哈哈哈哈哈哈哈哈")
			console.log('%c ddddd','color:#00CD00',ss)
			this.init();
		},
		filters:{
			codeTotype(val,d){
				var arr = [
					{"code": "A", "uploadType":"2022", "desc": "身份证",},
					{"code": "F", "uploadType":"2022", "desc": "护照",},
					{"code": "G", "uploadType":"2022", "desc": "军人证",},
					{"code": "V", "uploadType":"2022", "desc": "异常身份证",},
					{"code": "C", "uploadType":"2022", "desc": "户口本",},
					{"code": "H", "uploadType":"2022", "desc": "警官证",},
					{"code": "D", "uploadType":"2022", "desc": "出生证",},
					{"code": "O", "uploadType":"2022", "desc": "其他",},
					{"code": "W", "uploadType":"2022", "desc": "港澳台回乡证",},
				]
				for (let index = 0; index < arr.length; index++) {
					if(arr[index].code==val){
						return arr[index][d]
						break
					}
				}
				return "-"
			}
		},
		methods: {
			init() {
				var data = {
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"head": {
						"oprStep": "inforUpload",
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode

					},
					"opt": "APPL,MAIN,BNF,APPLNOT,INSRNT,DOC",
					"pkgNo": this.$route.query.orderNo, //订单号
				}
				console.log('%c 查询请求数据','color:#FFA500',data)
				this.$http.post(this.$store.state.link6 + '/order/v1/queryorder', data)
					.then(res => {
						if(!res)this.isnetwork = false
						console.log("%c 查询返回数据","color:#00CD00",JSON.parse(JSON.stringify(res.data)))
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.allData = res.data.output;
							console.log(this.allData.insrntResp.certfType)
							this.shou = this.allData.bnfResp.length
							this.aName = this.allData.applntResp.applName;
							this.iName = this.allData.insrntResp.insrntName;
							var showT=this.allData.applntResp.certfType;
							var showB=this.allData.insrntResp.certfType;
							if(showT=='A'||showT=='V'){
								// this.Tf=true
							}else{
								this.holderImgObj.imgArr.splice(1,1)
								// this.Tf=false
							}
							if(showB=='A'||showB=='V'){
								// this.Bf=true
							}else{
								this.insureImgObj.imgArr.splice(1,1)
								// this.Bf=false
							}
							if(this.allData.applntResp.relationToInsured == "00") {
								this.relationshipFlag = false;
							} else {
								this.relationshipFlag = true;
							}
							//受益人影像与人的处理
							//当达到反洗钱要求：单个被保险人此份保险合同保险费（保费=交费年期*期交保费）金额大于人民币20万元时，
							//且受益人（生存受益人或身故受益人）为“其他”，必须上传受益人身份证；符合以上条件，若未上传受益人身份证则阻断提示“请上传受益人身份证件！”；
							if(2000000>200000&&"生存or身故"=="生存or身故"){
								this.allData.bnfResp.forEach(bnf => {
									let typeName = bnf.bnfType==1?"身故受益人":"生存受益人"
									let certfType = bnf.certfType
									var objls = {
										name: bnf.bnfName,//姓名
										imgArr:[
											{
												"imgList": [],//base64数组
												"img": "/static/img/ida.png",//base64
												"uploadType": this.$options.filters.codeTotype(certfType,"uploadType") || "2029",//影响类型
												"docFileName": typeName+"身份证正面",
												"docType": "00401010",
												"fileSerialNo": "",//影响件地址
												"remark": "正",
												"type": 1,
												"showOrder": 1
											},
											{
												"imgList": [],//base64数组
												"img": "/static/img/IdCard.png",//base64
												"uploadType": this.$options.filters.codeTotype(certfType,"uploadType") || "2029",//影响类型
												"docFileName": typeName+"身份证反面",
												"docType": "00401010",
												"fileSerialNo": "",//影响件地址
												"remark": "反",
												"type": 2,
												"showOrder": 2
											},
										],
									}
									if(bnf.certfType=='A'||bnf.certfType=='V'){
									}else{
										objls.imgArr.splice(1,1)
									}
									this.benefitImgObj.push(objls)
								})
								var indexls = 1
								this.benefitImgObj.forEach(el => {
									el.imgArr.forEach(ell => {
										ell.showOrder = indexls
										indexls = indexls+1
									});
								});
							}
							//受益人存折/借记卡（有效收费凭证），只允许上传一张。当被保人与投保人非同一人，且生存金自动转账授权选择‘授权’，需上传该证件。反之不需要上传。
							if(this.allData.applntResp.relationToInsured!="A"){
								this.allData.bnfResp.forEach(bnf => {
									let typeName = bnf.bnfType==1?"身故受益人":"生存受益人"
									let certfType = bnf.certfType
									var objls = {
										name: bnf.bnfName,//姓名
										imgArr:[
											{
												"imgList": [],//base64数组
												"img": "/static/img/ida.png",//base64
												"uploadType": this.$options.filters.codeTotype(certfType,"uploadType") || "2029",//影响类型
												"docFileName": typeName+"银行正面",
												"docType": "00401010",
												"fileSerialNo": "",//影响件地址
												"remark": "正",
												"type": 1,
												"showOrder": 1
											}
										],
									}
									// if(true&&bnf.bnfType==2){
										this.benefitBankImgObj.push(objls)
									// }
								})
								var indexls = 1
								this.benefitBankImgObj.forEach(el => {
									el.imgArr.forEach(ell => {
										ell.showOrder = indexls
										indexls = indexls+1
									});
								});
							}
							console.log(JSON.stringify(this.allData.docResp))
							let hl = this.holderImgObj.imgArr.length
							let bl = this.bankImgObj.imgArr.length
							let il = this.insureImgObj.imgArr.length
							let bbl = 0
							this.benefitBankImgObj.forEach(el => {
								el.imgArr.forEach(ell => {
									bbl = bbl+1
								});
							});
							let al = this.allData.docResp.length
							let dataArr = JSON.parse(JSON.stringify(this.allData.docResp))
							let hld = dataArr.slice(0, hl)
							let bld = dataArr.slice(hl, hl+bl)
							let ild = dataArr.slice(hl+bl, hl+bl+il)
							let bbld = dataArr.slice(hl+bl+il, hl+bl+il+bbl)
							let ald = dataArr.slice(hl+bl+il+bbl, al)
							console.log('%c hl','color:#00CD00',hld)
							console.log('%c bl','color:#00CD00',bld)
							console.log('%c il','color:#00CD00',ild)
							console.log('%c il','color:#00CD00',bbld)
							console.log('%c al','color:#00CD00',ald)
							this.holderImgObj.imgArr.forEach(el => {
								hld.forEach(ell => {
									if(el.showOrder==ell.showOrder){
										el.img = this.$store.state.echoImgUrl + ell.fileSerialNo
									}
								})
							})
							this.bankImgObj.imgArr.forEach(el => {
								bld.forEach(ell => {
									if(el.showOrder==ell.showOrder){
										el.img = this.$store.state.echoImgUrl + ell.fileSerialNo
									}
								})
							})
							this.insureImgObj.imgArr.forEach(el => {
								ild.forEach(ell => {
									if(el.showOrder==ell.showOrder){
										el.img = this.$store.state.echoImgUrl + ell.fileSerialNo
									}
								})
							})
							this.benefitBankImgObj.forEach(obj => {
								obj.imgArr.forEach(el => {
									bbld.forEach(ell => {
										if(el.showOrder==ell.showOrder){
											el.img = this.$store.state.echoImgUrl + ell.fileSerialNo
										}
									})
								})
							})
							this.benefitImgObj.forEach(obj => {
								obj.imgArr.forEach(el => {
									ald.forEach(ell => {
										if(el.showOrder==ell.showOrder){
											el.img = this.$store.state.echoImgUrl + ell.fileSerialNo
										}
									})
								})
							})
							console.log('%c hld','color:#00CD00',JSON.parse(JSON.stringify(this.holderImgObj)))
							console.log('%c bld','color:#00CD00',JSON.parse(JSON.stringify(this.insureImgObj)))
							console.log('%c ild','color:#00CD00',JSON.parse(JSON.stringify(this.bankImgObj)))
							console.log('%c ald','color:#00CD00',JSON.parse(JSON.stringify(this.benefitImgObj)))
							if(this.allData.docResp.length > 0) {
								for(var i = 0; i < this.allData.docResp.length; i++) {

									// if(this.allData.docResp[i].showOrder == 1) {
									// 	this.a = this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo;
									// 	this.a1 = this.allData.docResp[i].fileSerialNo;
									// }
									// if(this.allData.docResp[i].showOrder == 2) {
									// 	this.b = this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo;
									// 	this.b1 = this.allData.docResp[i].fileSerialNo;
									// }
									// if(this.allData.docResp[i].showOrder == 3) {
									// 	this.c = this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo;
									// 	this.c1 = this.allData.docResp[i].fileSerialNo;
									// }
									// if(this.allData.docResp[i].showOrder == 4) {
									// 	this.d = this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo;
									// 	this.d1 = this.allData.docResp[i].fileSerialNo;
									// }
									// if(this.allData.docResp[i].showOrder == 5) {
									// 	this.e = this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo;
									// 	this.e1 = this.allData.docResp[i].fileSerialNo;
									// }
								}
							}

						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})

			},
			nationalitySelect() {
				var data = { //天安人寿
				}
				this.$http.post(this.$store.state.link + '/dic/findOdImg', data)
					.then(res => {
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			back() {
				if(this.$route.query.state == "1") { //人工核保过来的
					window.history.go(-1)
				} else if(this.$route.query.state == "2") { //列表过来的
					window.history.go(-1)
				} else if(this.$route.query.state == "3") { //自核成功过来的
					Toast("自核成功不可修改信息")
				}
				//				if(res.data.output.uwStatus != this.$store.state.orderState.AUC) {
				//					window.history.go(-1)
				//				}
			},
			upload(e,item) {
				// var code = e.currentTarget.getAttribute('code')
				let files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				this.picValue = files[0];
				Indicator.open()
				this.imgPreview(this.picValue, item,"code");
			},
			imgPreview(file,item,code) {
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
							item.img = this.result
							self.postImg(this.result, item,code);
						} else {
							Indicator.close()
							img.onload = function() {
								let data = self.compress(img, Orientation);
								item.img = data
								self.postImg(data, item,code);
							}
						}
					}
				}
			},
			postImg(data, item,code) {
				//这里写接口  
				var a = data.split(";")[0].split("/")[1];
				// if(code == 1) {
				// 	var base64Info = {
				// 		"fileType": a,
				// 		"imgList": [
				// 			data
				// 		],
				// 		"uploadType": "2026"
				// 	}
				// } else if(code == 2) {
				// 	var base64Info = {
				// 		"fileType": a,
				// 		"imgList": [
				// 			data
				// 		],
				// 		"uploadType": "2027"
				// 	}
				// } else if(code == 3) {
				// 	var base64Info = {
				// 		"fileType": a,
				// 		"imgList": [
				// 			data
				// 		],
				// 		"uploadType": "2030"
				// 	}
				// } else if(code == 4) {
				// 	var base64Info = {
				// 		"fileType": a,
				// 		"imgList": [
				// 			data
				// 		],
				// 		"uploadType": "2028"
				// 	}
				// } else if(code == 5) {
				// 	var base64Info = {
				// 		"fileType": a,
				// 		"imgList": [
				// 			data
				// 		],
				// 		"uploadType": "2029"
				// 	}
				// }
				var base64Info = {
					"fileType": a,
					"imgList": [
						item.img
					],
					"uploadType": item.uploadType
				}
				console.log(base64Info)
				this.$http.post(this.$store.state.link2 + '/fastdfs/filebase64', base64Info)
					.then(res => {
						console.log(res.data);
						Indicator.close();
						if(res.data.code == "SYS_S_000") {
							item.img = this.$store.state.echoImgUrl + res.data.output[0].fileSerialNo
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
			dealSumData(){
				if(this.relationshipFlag == "00") {
					// this.d1 = this.a1;
					// this.e1 = this.b1;
					this.insureImgObj.imgArr.forEach(insureImgObj => {
						this.holderImgObj.imgArr.forEach(holderImgObj => {
							if(insureImgObj.type == holderImgObj.type){
								insureImgObj.img = holderImgObj.img
							}
						})
					})
				}
				//投保人影像件、被保人影像件、受益人影像件合并为同一个请求数组
				var docReq = []
				var arrls = this.holderImgObj.imgArr.concat(this.bankImgObj.imgArr).concat(this.insureImgObj.imgArr)
				docReq = JSON.parse(JSON.stringify(arrls))
				this.benefitBankImgObj.forEach(ele1 => {
					ele1.imgArr.forEach(ele2 => {
						docReq.push(JSON.parse(JSON.stringify(ele2)))
					})
				})
				this.benefitImgObj.forEach(ele1 => {
					ele1.imgArr.forEach(ele2 => {
						docReq.push(JSON.parse(JSON.stringify(ele2)))
					})
				})
				for (let index = 0; index < docReq.length; index++) {
					if(docReq[index].img.indexOf(this.$store.state.echoImgUrl)==-1){
						Toast("请完善影像资料")
						return false
						break
					}else{
						docReq[index].fileSerialNo = docReq[index].img.replace(this.$store.state.echoImgUrl,"/")
					}
				}
				return docReq
				// if(this.a1 != "" && this.c1 != "" && this.d1 != "") {
				// 	var obj1 = {
				// 		"docFileName": "投保人身份证正面", //单证文件名 
				// 		"docType": "014", //单证类型
				// 		"fileSerialNo": this.a1, //文件序列号 : 文件在影像系统唯一标识 
				// 		"remark": "", //备注 
				// 		"showOrder": 1 //显示顺序
				// 	}
				// 	docReq.push(obj1);
				// 	if(this.Tf){
				// 		if(this.b1!=""){
				// 			var obj2 = {
				// 				"docFileName": "投保人身份证反面", //单证文件名 
				// 				"docType": "014", //单证类型
				// 				"fileSerialNo": this.b1, //文件序列号 : 文件在影像系统唯一标识 
				// 				"remark": "", //备注 
				// 				"showOrder": 2 //显示顺序
				// 			}
				// 			docReq.push(obj2);
				// 		}else{
				// 			Toast("请完善影像资料")
				// 			return false
				// 		}
				// 	}
				// 	var obj3 = {
				// 		"docFileName": "投保人银行卡正面", //单证文件名 
				// 		"docType": "014", //单证类型
				// 		"fileSerialNo": this.c1, //文件序列号 : 文件在影像系统唯一标识 
				// 		"remark": "", //备注 
				// 		"showOrder": 3 //显示顺序
				// 	}
				// 	docReq.push(obj3);
				// 	var obj4 = {
				// 		"docFileName": "被保险人身份证正面", //单证文件名 
				// 		"docType": "014", //单证类型
				// 		"fileSerialNo": this.d1, //文件序列号 : 文件在影像系统唯一标识 
				// 		"remark": "", //备注 
				// 		"showOrder": 4 //显示顺序
				// 	}
				// 	docReq.push(obj4);
				// 	if(this.Bf){
				// 		if(this.e1!=""){
				// 			var obj5 = {
				// 				"docFileName": "被保险人身份证反面", //单证文件名 
				// 				"docType": "014", //单证类型
				// 				"fileSerialNo": this.e1, //文件序列号 : 文件在影像系统唯一标识 
				// 				"remark": "", //备注 
				// 				"showOrder": 5 //显示顺序
				// 			}
				// 			docReq.push(obj5);
				// 		}else{
				// 			Toast("请完善影像资料")
				// 			return false
				// 		}
				// 	}
				// 	return true
				// } else {
				// 	Toast("请完善影像资料")
				// 	return false
				// }
			},
			handleClickNext() {
				let re = this.dealSumData()
				if(re==false)return
				var data = {
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"mark": "UC",
					"head": {
						"oprStep": "inforUpload",
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode
					},
					"opt": "DOC",
					"pkgNo": this.$route.query.orderNo, //订单号
					"docReq": re
				}
				console.log('%c 影像件提交报文','color:#00CD00',data)
				this.$http.post(this.$store.state.link6 + '/order/v1/saveorder', data)
					.then(res => {
						console.log("===" + JSON.stringify(res.data))
						var dataCode = res.data.code;
						// if(dataCode == "SYS_S_000") {
						// 	if(this.shou == 0) {
						// 		this.$router.push('/enter?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
						// 	} else {
						// 		this.$router.push('/inforUpload1?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
						// 	}
						// } else {
						// 	Toast(res.data.desc);
						// }
					}, res => {
						console.log(res.data);
					})
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
		position: absolute;
		background: #F3F3F3;
		min-height: 100%;
	}
	.inforUploadW {
		padding: 0.4rem 0 .6rem;
	} 
	.inforUpload_all {
		padding: 0 0.52rem;
		margin-bottom: 0.58rem;
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
		padding: 0 0 0 0.48rem;
		vertical-align: bottom;
		height: 0.88rem;
		/*margin-bottom: 0.56rem;*/
	}
	
	.information_bottom {
		width: 3.12rem;
		height: 0.88rem;
		border: 1px solid #EB7760;
		border-radius: 0.44rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
		line-height: 0.88rem;
		display: inline-block;
	}
	
	.information_next {
		width: 3.12rem;
		height: 0.88rem;
		border: 1px solid #EB7760;
		border-radius: 0.44rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
		line-height: 0.88rem;
		display: inline-block;
		margin-left: 0.3rem;
	}
	
	.inforUpload_booy {
		margin-bottom: ;
	}
</style>