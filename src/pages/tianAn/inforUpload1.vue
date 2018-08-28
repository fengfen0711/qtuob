<template>
	<div class="inforUpload" ref="bg">
		<div class="inforUpload_all">
			<div v-for="(item,index) in tables" class="inforUpload_div1 ">
				<p class="inforUpload_p">受益人{{item.bnfName}} 证件</p>
				<div class="inforUpload_img">
					<div class="inforUpload_up">
						<img ref="img" src="/static/img/ida.png" class="inforUpload_up_img" />
						<input class="file" type="file" accept="image/*" name="file" @change="upload" :code=[index,0]|statu>
					</div>
					<div class="inforUpload_up inforUpload_right" ref="show">
						<img ref="img" src="/static/img/IdCard.png" class="inforUpload_up_img" />
						<input class="file" type="file" accept="image/*" name="file" @change="upload" :code=[index,1]|statu>
					</div>
				</div>
			</div>

		</div>
		<div class="information_bottom_btn">
			<span class="information_bottom" @click="back">上一步</span>
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
				iName: "",
				headerImage: '',
				picValue: '',
				a: "",
				b: "",
				c: "",
				d: "",
				e: "",
				f:"",
				g:"",
				h:"",
				i:"",
				j:"",
				k:"",
				l:"",
				allData: {},
				tables:[]
			}
		},
		created() {
//			this.nationalitySelect();
			this.init();
		},
		updated(){
			console.log(this.$refs.show)
			for(var i=0,j=this.tables.length;i<j;i++){
				if(this.tables[i].certfType==0||this.tables[i].certfType=="C"||this.tables[i].certfType=="E"){
					this.$refs.show[i].setAttribute('show','Y')
				}else{
					this.$refs.show[i].setAttribute('show','N')
					this.$refs.show[i].style.display="none"
				}
			}
			this.backView()
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
						"prodCode": this.$route.query.prodCode,
						"oprStep": "inforUpload1"
					},
					"opt": "ALL",
					"pkgNo": this.$route.query.orderNo, //订单号
				}

				this.$http.post(this.$store.state.link + '/trd/order/v1/queryorder', data)
					.then(res => {
						console.log("data==" + JSON.stringify(res.data))
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.allData = res.data.output;
							this.tables=this.allData.bnfResp;
							console.log(this.tables)
//							this.backView(this.tables)
//							this.tables.length=6
							if(this.tables.length<=2){
								this.$refs.bg.style.position="fixed"
							}else{
								this.$refs.bg.style.position="relative"
							}
							
							this.aName = this.allData.applntResp.applName;
							this.iName = this.allData.insrntResp.insrntName;
							if(this.allData.applntResp.relationToInsured == "00") {
								this.relationshipFlag = false;
							} else {
								this.relationshipFlag = true;
							}
							

						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
//					this.backView()
			},
			backView(){
				console.log(this.allData.docResp)
				if(this.allData.docResp.length > 0) {
					
					for(var i = 0; i < this.allData.docResp.length; i++) {
						if(this.allData.docResp[i].showOrder == 6) {
							this.$refs.img[0].setAttribute('src',this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo) 
							this.a = this.allData.docResp[i].fileSerialNo;
							
						}
						if(this.allData.docResp[i].showOrder == 7) {
							this.$refs.img[1].setAttribute('src',this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo) 
							this.b = this.allData.docResp[i].fileSerialNo;
						}
						if(this.allData.docResp[i].showOrder == 8) {
							this.$refs.img[2].setAttribute('src',this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo) 
							this.c = this.allData.docResp[i].fileSerialNo;
						}
						if(this.allData.docResp[i].showOrder == 9) {
							this.$refs.img[3].setAttribute('src',this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo) 
							this.d = this.allData.docResp[i].fileSerialNo;
						}
						if(this.allData.docResp[i].showOrder == 10) {
							this.$refs.img[4].setAttribute('src',this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo) 
							this.e = this.allData.docResp[i].fileSerialNo;
						}
						if(this.allData.docResp[i].showOrder == 11) {
							this.$refs.img[5].setAttribute('src',this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo) 
							this.f = this.allData.docResp[i].fileSerialNo;
						}
						if(this.allData.docResp[i].showOrder == 20) {
							this.$refs.img[6].setAttribute('src',this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo) 
							this.g = this.allData.docResp[i].fileSerialNo;
							
						}
						if(this.allData.docResp[i].showOrder == 21) {
							this.$refs.img[7].setAttribute('src',this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo) 
							this.h = this.allData.docResp[i].fileSerialNo;
						}
						if(this.allData.docResp[i].showOrder == 22) {
							this.$refs.img[8].setAttribute('src',this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo) 
							this.i = this.allData.docResp[i].fileSerialNo;
						}
						if(this.allData.docResp[i].showOrder == 23) {
							this.$refs.img[9].setAttribute('src',this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo) 
							this.j = this.allData.docResp[i].fileSerialNo;
						}
						if(this.allData.docResp[i].showOrder == 24) {
							this.$refs.img[10].setAttribute('src',this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo) 
							this.k = this.allData.docResp[i].fileSerialNo;
						}
						if(this.allData.docResp[i].showOrder == 25) {
							this.$refs.img[11].setAttribute('src',this.$store.state.echoImgUrl + this.allData.docResp[i].fileSerialNo) 
							this.l = this.allData.docResp[i].fileSerialNo;
						}
					}
				}
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
				window.history.go(-1)
//				if(this.$route.query.state == "1") { //人工核保过来的
//					window.history.go(-1)
//				} else if(this.$route.query.state == "2") { //列表过来的
//					window.history.go(-1)
//				} else if(this.$route.query.state == "3") { //自核成功过来的
//					Toast("自核成功不可修改信息")
//				}
				//				if(res.data.output.uwStatus != this.$store.state.orderState.AUC) {
				//					window.history.go(-1)
				//				}
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
							if(code == 0) {
								self.$refs.img[0].setAttribute('src',this.result)
							} else if(code == 1) {
								self.$refs.img[1].setAttribute('src',this.result)
							} else if(code == 2) {
								self.$refs.img[2].setAttribute('src',this.result)
							} else if(code == 3) {
								self.$refs.img[3].setAttribute('src',this.result)
							} else if(code == 4) {
								self.$refs.img[4].setAttribute('src',this.result)
							} else if(code == 5) {
								self.$refs.img[5].setAttribute('src',this.result)
							}else if(code == 6) {
								self.$refs.img[6].setAttribute('src',this.result)
							} else if(code == 7) {
								self.$refs.img[7].setAttribute('src',this.result)
							} else if(code == 8) {
								self.$refs.img[8].setAttribute('src',this.result)
							} else if(code == 9) {
								self.$refs.img[9].setAttribute('src',this.result)
							} else if(code == 10) {
								self.$refs.img[10].setAttribute('src',this.result)
							}else if(code == 11) {
								self.$refs.img[11].setAttribute('src',this.result)
							}

							self.postImg(this.result, code);
						} else {
							Indicator.close()
							img.onload = function() {
								let data = self.compress(img, Orientation);
								if(code==0){
									self.$refs.img[0].setAttribute('src',data)
								}else if(code == 1) {
									self.$refs.img[1].setAttribute('src',data)
								} else if(code == 2) {
									self.$refs.img[2].setAttribute('src',data)
								} else if(code == 3) {
									self.$refs.img[3].setAttribute('src',data)
								} else if(code == 4) {
									self.$refs.img[4].setAttribute('src',data)
								} else if(code == 5) {
									self.$refs.img[5].setAttribute('src',data)
								}else if(code == 6) {
									self.$refs.img[6].setAttribute('src',data)
								} else if(code == 7) {
									self.$refs.img[7].setAttribute('src',data)
								} else if(code == 8) {
									self.$refs.img[8].setAttribute('src',data)
								} else if(code == 9) {
									self.$refs.img[9].setAttribute('src',data)
								} else if(code == 10) {
									self.$refs.img[10].setAttribute('src',data)
								}else if(code == 11) {
									self.$refs.img[11].setAttribute('src',data)
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
							if(code == 0) {
								this.a = res.data.output[0].fileSerialNo
							} else if(code == 1) {
								this.b = res.data.output[0].fileSerialNo
							} else if(code == 2) {
								this.c = res.data.output[0].fileSerialNo
							} else if(code == 3) {
								this.d = res.data.output[0].fileSerialNo
							} else if(code == 4) {
								this.e = res.data.output[0].fileSerialNo
							} else if(code == 5) {
								this.f = res.data.output[0].fileSerialNo
							} else if(code == 6) {
								this.g = res.data.output[0].fileSerialNo
							} else if(code == 7) {
								this.h = res.data.output[0].fileSerialNo
							} else if(code == 8) {
								this.i = res.data.output[0].fileSerialNo
							} else if(code == 9) {
								this.j = res.data.output[0].fileSerialNo
							} else if(code == 10) {
								this.k = res.data.output[0].fileSerialNo
							} else if(code == 11) {
								this.l = res.data.output[0].fileSerialNo
							}
							console.log(this.a)
							console.log(this.b)
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
//				if(this.relationshipFlag == "00") {
//					this.d1 = this.a1;
//					this.e1 = this.b1;
//				}
				var docReq = [];
				if(this.a != "") {
					var obj1 = {
						"docFileName": "受益人身份证正面", //单证文件名 
						"docType": "014", //单证类型
						"fileSerialNo": this.a, //文件序列号 : 文件在影像系统唯一标识 
						"remark": "", //备注 
						"showOrder": 6 //显示顺序
					}
					docReq.push(obj1);
				}else{
					Toast("请完善受益人信息")
					return
				}
				console.log(this.$refs.show[0].getAttribute('show'))
				if(this.$refs.show[0].getAttribute('show')=='Y') {
					if(this.b!=""){
						var obj2 = {
							"docFileName": "受益人身份证反面", //单证文件名 
							"docType": "014", //单证类型
							"fileSerialNo": this.b, //文件序列号 : 文件在影像系统唯一标识 
							"remark": "", //备注 
							"showOrder": 7 //显示顺序
						}	
						docReq.push(obj2);
					}else{
						Toast("请完善受益人信息")
						return
					}
					
					
				}
				if(this.tables.length>=2) {
					if(this.c != ""){
						var obj3 = {
							"docFileName": "受益人身份证正面", //单证文件名 
							"docType": "014", //单证类型
							"fileSerialNo": this.c, //文件序列号 : 文件在影像系统唯一标识 
							"remark": "", //备注 
							"showOrder": 8 //显示顺序
						}
						docReq.push(obj3);	
					}else{
						Toast("请完善受益人信息")
						return
					}
					
				}
				if(this.tables.length>=2&&this.$refs.show[1].getAttribute('show')=='Y') {
					if(this.d != ""){
						var obj4 = {
							"docFileName": "受益人身份证反面", //单证文件名 
							"docType": "014", //单证类型
							"fileSerialNo": this.d, //文件序列号 : 文件在影像系统唯一标识 
							"remark": "", //备注 
							"showOrder": 9 //显示顺序
						}
						docReq.push(obj4);
					}else{
						Toast("请完善受益人信息")
						return
					}
					
					
				}
				if(this.tables.length>=3) {
					if(this.e != ""){
						var obj5 = {
							"docFileName": "受益人身份证正面", //单证文件名 
							"docType": "014", //单证类型
							"fileSerialNo": this.e, //文件序列号 : 文件在影像系统唯一标识 
							"remark": "", //备注 
							"showOrder": 10 //显示顺序
						}
						docReq.push(obj5);	
					}
					
				}
				if(this.tables.length>=3&&this.$refs.show[2].getAttribute('show')=='Y') {
					if(this.f != ""){
						var obj6 = {
							"docFileName": "受益人身份证反面", //单证文件名 
							"docType": "014", //单证类型
							"fileSerialNo": this.f, //文件序列号 : 文件在影像系统唯一标识 
							"remark": "", //备注 
							"showOrder": 11 //显示顺序
						}
						docReq.push(obj6);	
					}else{
						Toast("请完善受益人信息")
						return
					}
					
				}
				if(this.tables.length>=4) {
					if(this.g != ""){
						var obj7 = {
							"docFileName": "受益人身份证正面", //单证文件名 
							"docType": "014", //单证类型
							"fileSerialNo": this.g, //文件序列号 : 文件在影像系统唯一标识 
							"remark": "", //备注 
							"showOrder": 20 //显示顺序
						}
						docReq.push(obj7);	
					}else{
						Toast("请完善受益人信息")
						return
					}
					
				}
				if(this.tables.length>=4&&this.$refs.show[3].getAttribute('show')=='Y') {
					if(this.h != ""){
						var obj8 = {
							"docFileName": "受益人身份证反面", //单证文件名 
							"docType": "014", //单证类型
							"fileSerialNo": this.h, //文件序列号 : 文件在影像系统唯一标识
							"remark": "", //备注 
							"showOrder": 21 //显示顺序
						}
						docReq.push(obj8);	
					}else{
						Toast("请完善受益人信息")
						return
					}
					
				}
				if(this.tables.length>=5) {
					if(this.i != ""){
						var obj9 = {
							"docFileName": "受益人身份证正面", //单证文件名 
							"docType": "014", //单证类型
							"fileSerialNo": this.i, //文件序列号 : 文件在影像系统唯一标识 
							"remark": "", //备注 
							"showOrder": 22 //显示顺序
						}
						docReq.push(obj9);	
					}else{
						Toast("请完善受益人信息")
						return
					}
					
				}
				if(this.tables.length>=5&&this.$refs.show[4].getAttribute('show')=='Y') {
					if(this.j != ""){
						var obj10 = {
							"docFileName": "受益人身份证反面", //单证文件名 
							"docType": "014", //单证类型
							"fileSerialNo": this.j, //文件序列号 : 文件在影像系统唯一标识
							"remark": "", //备注 
							"showOrder": 23 //显示顺序
						}
						docReq.push(obj10);	
					}else{
						Toast("请完善受益人信息")
						return
					}
					
				}
				if(this.tables.length>=6) {
					if(this.k != ""){
						var obj11 = {
							"docFileName": "受益人身份证正面", //单证文件名 
							"docType": "014", //单证类型
							"fileSerialNo": this.k, //文件序列号 : 文件在影像系统唯一标识 
							"remark": "", //备注 
							"showOrder": 24 //显示顺序
						}
						docReq.push(obj11);
					}else{
						Toast("请完善受益人信息")
						return
					}
					
				}
				if(this.tables.length>=6&&this.$refs.show[5].getAttribute('show')=='Y') {
					if(this.l != ""){
						var obj12 = {
							"docFileName": "受益人身份证反面", //单证文件名 
							"docType": "014", //单证类型
							"fileSerialNo": this.l, //文件序列号 : 文件在影像系统唯一标识
							"remark": "", //备注 
							"showOrder": 25 //显示顺序
						}
						docReq.push(obj12);
					}else{
						Toast("请完善受益人信息")
						return
					}
					
				}
				console.log(docReq)
//					if(this.tables.length*2==docReq.length){
					var data = {
						"token": this.$route.query.token,
						"userId": this.$route.query.userId,
						"mark": "UC",
						"head": {
							"oprStep": "inforUpload1",
							"channelCode": "qtb_h5",
							"deptCode": this.$route.query.cmpCode,
							"oprCode": this.$route.query.userId,
							"prodCode": this.$route.query.prodCode
						},
						"opt": "DOC",
						"pkgNo": this.$route.query.orderNo, //订单号
						"docReq": docReq
					}
					this.$http.post(this.$store.state.link + '/trd/order/v1/saveorder', data)
						.then(res => {
							console.log("===" + JSON.stringify(res.data))
							var dataCode = res.data.code;
							if(dataCode == "SYS_S_000") {
								this.$router.push('/enter?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
							} else {
								Toast(res.data.desc);
							}
						}, res => {
							console.log(res.data);
						})

//				} else {
//					Toast("请完善影像资料")
//				}
				//				//				this.$router.push("/enter")
			}
		},
		filters:{
			statu([a,b]){
				if(a==0){
					if(b==0){
						return 0
					}else{
						return 1
					}
					
				}
				if(a==1){
					if(b==0){
						return 2
					}else{
						return 3
					}
					
				}
				if(a==2){
					if(b==0){
						return 4
					}else{
						return 5
					}
					
				}
				if(a==3){
					if(b==0){
						return 6
					}else{
						return 7
					}
					
				}
				if(a==4){
					if(b==0){
						return 8
					}else{
						return 9
					}
					
				}
				if(a==5){
					if(b==0){
						return 10
					}else{
						return 11
					}
					
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
		position: fixed;
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
		border:1px solid #EB7760;
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