<template>
	<div ref="bg" class="bg">
		<div v-if="!pdfFlag" class="ctc_div_mask">
			<Pdf :pdf="pdf" @pdfClose="pdfClose"></Pdf>
		</div>
		<div :class="{center:blur} ">
			<div class="sign" @click="handleClickSign(1)">
				<img v-if="sign" ref="tou" :src="signPhoto" :code="code" alt="" /> 投保人签字区域
			</div>
			<div class="sign" @click="handleClickSign(2)">
				<img v-if="sign" ref="bei" :src="signPhoto1" :code="code1" alt="" /> 被保人签字区域
			</div>
			<div class="context">
				被保险人（法定监护人）签字（请横向签字）。
			</div>
			<div class="success" @click="handleClickSuc">签字完成</div>
			<div class="list">
				投保人与被投保人本人都已经确认并阅读<span @click="cardPDF">《个人税收居民身份声明文件》、</span><span @click="cardPDF1">《人身保险投保提示书》、</span>
				<span @click="cardPDF2">《电子投保单》</span>，签字确保上述信息的真实、将在 30日内通知贵机构，否则本人承担由此造成的不利 后果。
			</div>
			<div ref="item" :code="item.msg" class="tain_p_topitem " v-for="(item,index) in alldata" @click="select_item($event,index)">
				<img ref="test" class="tain_img_topitemleft" src="/static/img/icon_select1_focus.png" />
				<span class="tain_span_nameitem">{{item.name}}</span>
				<img class="tain_img_topitemright" src="/static/qijianwei/btn_next.png" />
			</div>
			<div class="btn">
				<div class="last" @click="back">上一步</div>
				<div class="next" @click="queryOrder">确认提交</div>
			</div>
		</div>

		<div class="signatureBox" :class="{active:mask}">
			<div class="visaDetailTop">
				<p class="visaTitle">电子签名</p>
			</div>
			<div class="canvasBox" ref="canvasHW">
				<canvas @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' ref="canvasF" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp"></canvas>
				<div class="btnBox">
					<div class="last" @click="overwrite">重写</div>
					<div class="next" @click="handleClickPush">确定</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Pdf from '@/components/pdf.vue'
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		name: "Code",
		data() {
			return {
				points: [],
				canvasTxt: null,
				startX: 0,
				startY: 0,
				moveY: 0,
				moveX: 0,
				endY: 0,
				endX: 0,
				w: null,
				h: null,
				isDown: false,
				mask: false,
				blur: false,
				flag: false,
				sign: false,
				signPhoto: "",
				signPhoto1: "",
				index: "",
				photo: "",
				alldata: [{
						"name": '投保人个税信息',
						"msg": ""
					},
					{
						"name": '被保人个税信息',
						"msg": ""
					},
					{
						"name": '人身保险投保提示书',
						"msg": ""
					},
					{
						"name": '电子投保单',
						"msg": ""
					}
				],
				addData: [],
				code: "",
				code1: "",
				cardPDFArray: [],
				pdfFlag: true,
				pdf: "",
				orderstatus:''

			}
		},
		created() {
			this.init();
			this.nopayclick();
//			console.log(this.$store.state.orderState.AUC)
		},

		mounted() {
			//			if(window.localStorage.photo != undefined) {
			//				this.$refs.tou.setAttribute('class', 'signPhoto')
			//				this.$refs.bei.setAttribute('class', 'signPhoto')
			//			}

			var s = this.$refs.test
//			for(var i = 0, j = this.addData.length; i < j; i++) {
//				s[this.addData[i]].style.opacity = 1
//			}

			let canvas = this.$refs.canvasF;
			canvas.height = this.$refs.canvasHW.offsetHeight
			canvas.width = this.$refs.canvasHW.offsetWidth
			console.log(this.$refs.canvasHW.style)
			console.log(canvas.width)
			this.canvasTxt = canvas.getContext("2d");
		},
		methods: {
			pdfClose(...data) {
				this.pdfFlag = data[0]
				this.$refs.bg.style.position = "absolute"
			},
			nopayclick(){
				var data = {
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode
					},
					"userId": this.$store.state.userId,
					"token": this.$store.state.token,
					"opt": "MAIN",
					"pkgNo": this.$route.query.orderNo
				}
				Indicator.open();
				this.$http.post(this.$store.state.link + "/trd/order/v1/queryorder", data)
				.then(response => {
					console.log(response.data);
					Indicator.close();
					if(response.data.code == "SYS_S_000") {
						this.orderstatus = response.data.output.mainResp.orderStatus;
					}
				}, response => {
					Indicator.close();
					console.log("ajax error");
				});
			},
			init() {
				var data = [{
						"tmId": "TM0001"
					},
					{
						"tmId": "TM0002"
					},
					{
						"tmId": "TM0003"
					}
				]
				Indicator.open();
				this.$http.post(this.$store.state.link + '/css/css/queryTemplateByTmIdList', data)
					.then(res => {
						Indicator.close();
						console.log("==222==" + JSON.stringify(res.data));
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.cardPDFArray = res.data.output;
							console.log(this.cardPDFArray)
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					})
			},
			init1() {
				var data = {
					"token": this.$route.query.token,
					"userId": this.$route.query.userId,
					"head": {
						"oprStep": "enter",
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$route.query.userId,
						"prodCode": this.$route.query.prodCode
					},
					"opt": "1,2,3,4,5",
					"pkgNo": this.$route.query.orderNo
				}
				console.log("1111==="+JSON.stringify(data))
				Indicator.open();
				this.$http.post(this.$store.state.link + '/trd/doc/v1/createdoc', data)
					.then(res => {
						Indicator.close();
						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							console.log("cheng")
							if(res.data.output.pdfURL!=undefined){
								this.cardPDFArray = res.data.output.pdfURL;
								this.photo = true
								Toast("签字完成")
							}else{
								Toast(res.data.output.desc)
							}
							
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					})
			},
			cardPDF() {
				if(this.cardPDFArray.length>0){
					for(var i = 0; i < this.cardPDFArray.length; i++) {
						if(this.cardPDFArray[i].tmId == "TM0003") {
							this.pdfFlag = false
							this.pdf = this.cardPDFArray[2].tmFmsUrl;
						}
					}
				}
				

			},
			cardPDF1() {
				if(this.cardPDFArray.length>0){
					for(var i = 0; i < this.cardPDFArray.length; i++) {
						if(this.cardPDFArray[i].tmId == "TM0002") {
							this.pdfFlag = false
							//						this.$refs.bg.setAttribute("class", "bg1")
							this.pdf = this.cardPDFArray[i].tmFmsUrl;
						}
					}
				}
			},
			cardPDF2() {
				if(this.cardPDFArray.length>0){
					for(var i = 0; i < this.cardPDFArray.length; i++) {
						if(this.cardPDFArray[i].tmId == "TM0001") {
							this.pdfFlag = false
							//						this.$refs.bg.setAttribute("class", "bg1")
							this.pdf = this.cardPDFArray[i].tmFmsUrl;
						}
					}
				}
			},
			cardPDF3() {
				if(this.cardPDFArray.length>0){
					for(var i = 0; i < this.cardPDFArray.length; i++) {
						if(this.cardPDFArray[i].tmId == "TM0003") {
							this.pdfFlag = false
							//						this.$refs.bg.setAttribute("class", "bg1")
							this.pdf = this.cardPDFArray[3].tmFmsUrl;
						}
					}
				}
			},
			handleClickSuc() {
				if(this.signPhoto != "" && this.signPhoto1 != "") {
					this.next();
				} else {
					Toast("请签字")
				}
			},
			select_item(e, index) {
				if(this.photo) {
					this.addData.push(index);
					e.currentTarget.getElementsByClassName('tain_img_topitemleft')[0].style.opacity = 1;
					if(e.currentTarget.getElementsByClassName('tain_img_topitemright')[0].src.indexOf("downImg") != -1) {
						this.alldata[index].msg = ""
					} else {
						this.alldata[index].msg = this.session
					}
					if(index == 0) {
						this.cardPDF();
					} else if(index == 1) {
						this.cardPDF3();
					} else if(index == 2) {
						this.cardPDF1();
					}else if(index == 3) {
						this.cardPDF2();
					}
					//					window.location.href = e.currentTarget.getAttribute('code')
				} else {
					Toast("请点击签字完成")
				}

			},
			back() {
				window.history.go(-1)
			},
			next() {

				var docReq = [];
				var obj1 = {
					"docFileName": "投保人签字", //单证文件名 
					"docType": "014", //单证类型
					"fileSerialNo": this.code, //文件序列号 : 文件在影像系统唯一标识 
					"remark": "", //备注 
					"showOrder": 16 //显示顺序
				}
				var obj2 = {
					"docFileName": "被保人签字", //单证文件名 
					"docType": "014", //单证类型
					"fileSerialNo": this.code1, //文件序列号 : 文件在影像系统唯一标识 
					"remark": "", //备注 
					"showOrder": 17 //显示顺序
				}
				docReq.push(obj1);
				docReq.push(obj2);
				var data = {
					"token": this.$route.query.token,
					"userId": this.$route.query.userId,
					"mark": "UC",
					"head": {
						"oprStep": "enter",
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$route.query.userId,
						"prodCode": this.$route.query.prodCode
					},
					"opt": "DOC",
					"pkgNo": this.$route.query.orderNo, //订单号
					"docReq": docReq
				}
				console.log("==111==" + JSON.stringify(data));
				this.$http.post(this.$store.state.link + '/trd/order/v1/saveorder', data)
					.then(res => {
						console.log("==123==" + JSON.stringify(res.data));
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							
//							Toast("签字完成")
							this.init1();
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			queryOrder() {
				console.log(this.addData)
				if(this.addData.length != 4) {
					console.log(1)
					Toast("请依次阅读投保文件")
				} else {
					var data = { //订单查询   订单状态:10-暂存单 20-自核成功 30-已撤单 40-承保成功 60-犹豫期退保 01-自核交易失败 02-自核不通过 03-人工核保中 04-人工核保成功 05-人核未进核心 06-人核失败 07-人核失败并发送通知书 08-收费中 09-收费成功 11-收费失败 12-收费交易失败 13-承保失败 14-承保交易失败 15-保单生效已回执状态 16-退保 17-已删除 18-承保收费成功 19-拒保 21-其他 ,
						"token": this.$route.query.token,
						"userId": this.$route.query.userId,
						"head": {
							"channelCode": "qtb_h5",
							"deptCode": this.$route.query.cmpCode,
							"oprCode": this.$route.query.userId,
							"prodCode": this.$route.query.prodCode
						},
						"pkgNoList": [{
							"pkgNo": this.$route.query.orderNo
						}]
					}
					//				console.log("==" + JSON.stringify(data))
					Indicator.open();
					this.$http.post(this.$store.state.link + '/trd/insplyquery/v1/pkgquerydata', data)
						.then(res => {
							Indicator.close();
							console.log("==" + JSON.stringify(res.data))
							var dataCode = res.data.code;
							if(dataCode == "SYS_S_000") {
								if(res.data.output[0].orderStatus == this.$store.state.orderState.UDR) {
									this.issue(); //出单
								} else if(res.data.output[0].orderStatus == this.$store.state.orderState.HPUC) { //走人工核保页面
									this.$router.push('/artificialSubmission')
								} else {
									//									Toast("查询订单状态失败")
									this.issue(); //出单
									//									this.$router.push('/issueError?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
								}
							} else {
								this.$router.push('/issueError?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
								Toast(res.data.desc);
							}
						}, res => {
							Indicator.close();
							console.log(res.data);
						})
				}

			},
			issue() { //出单
				var data = { //订单查询   订单状态:10-暂存单 20-自核成功 30-已撤单 40-承保成功 60-犹豫期退保 01-自核交易失败 02-自核不通过 03-人工核保中 04-人工核保成功 05-人核未进核心 06-人核失败 07-人核失败并发送通知书 08-收费中 09-收费成功 11-收费失败 12-收费交易失败 13-承保失败 14-承保交易失败 15-保单生效已回执状态 16-退保 17-已删除 18-承保收费成功 19-拒保 21-其他 ,
					"token": this.$route.query.token,
					"userId": this.$route.query.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$route.query.userId,
						"prodCode": this.$route.query.prodCode
					},
					"pkgNo": this.$route.query.orderNo
				}
				//				console.log("==21" + JSON.stringify(data))
				Indicator.open();
				this.$http.post(this.$store.state.link + '/trd/ply/v1/create', data)
					.then(res => {
						Indicator.close();
						console.log(res.data)
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							if (this.orderstatus == this.$store.state.orderState.AUC) {
								this.$router.push('/sucessIssue?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
							}
//							else if (this.orderstatus == this.$store.state.orderState.HUS) {
							else if (this.orderstatus == "HUS") {
								this.$router.push('/Results?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
							}
							
						} else {
							Toast(res.data.desc);
							this.$router.push('/issueError?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					})
			},
			handleClickSign(a) {
				if(this.index == a) {
					this.index = a
				} else {
					this.index = a
					this.overwrite()
				}

				this.$refs.bg.style.position = "fixed"
				this.mask = true
				this.blur = true

			},
			//电脑设备事件
			mouseDown(ev) {
				ev = ev || event;
				ev.preventDefault();
				console.log(ev);
				if(1) {
					let obj = {
						x: ev.offsetX,
						y: ev.offsetY
					};
					console.log(obj);
					this.startX = obj.x;
					this.startY = obj.y;
					this.canvasTxt.beginPath();
					this.canvasTxt.moveTo(this.startX, this.startY);
					this.canvasTxt.lineTo(obj.x, obj.y);
					this.canvasTxt.stroke();
					this.canvasTxt.closePath();
					this.points.push(obj);
					this.isDown = true;
				}
			},
			//移动设备事件
			touchStart(ev) {
				ev = ev || event;
				ev.preventDefault();
				if(ev.touches.length == 1) {
					let obj = {
						x: ev.targetTouches[0].clientX,
						y: ev.targetTouches[0].clientY - 30
					};
					console.log(obj)
					this.startX = obj.x;
					this.startY = obj.y;
					this.canvasTxt.beginPath();
					this.canvasTxt.moveTo(this.startX, this.startY);
					this.canvasTxt.lineTo(obj.x, obj.y);
					this.canvasTxt.stroke();
					this.canvasTxt.closePath();
					this.points.push(obj);
				}
			},
			//电脑设备事件
			mouseMove(ev) {
				ev = ev || event;
				ev.preventDefault();
				if(this.isDown) {
					let obj = {
						x: ev.offsetX,
						y: ev.offsetY
					};
					this.moveY = obj.y;
					this.moveX = obj.x;
					this.canvasTxt.beginPath();
					this.canvasTxt.moveTo(this.startX, this.startY);
					this.canvasTxt.lineTo(obj.x, obj.y);
					this.canvasTxt.stroke();
					this.canvasTxt.closePath();
					this.startY = obj.y;
					this.startX = obj.x;
					this.points.push(obj);
				}
			},
			//移动设备事件
			touchMove(ev) {
				ev = ev || event;
				ev.preventDefault();
				if(ev.touches.length == 1) {
					let obj = {
						x: ev.targetTouches[0].clientX,
						y: ev.targetTouches[0].clientY - 30
					};
					this.moveY = obj.y;
					this.moveX = obj.x;
					this.canvasTxt.beginPath();
					this.canvasTxt.moveTo(this.startX, this.startY);
					this.canvasTxt.lineTo(obj.x, obj.y);
					this.canvasTxt.stroke();
					this.canvasTxt.closePath();
					this.startY = obj.y;
					this.startX = obj.x;
					this.points.push(obj);
				}
			},
			//电脑设备事件
			mouseUp(ev) {
				ev = ev || event;
				ev.preventDefault();
				if(1) {
					let obj = {
						x: ev.offsetX,
						y: ev.offsetY
					};
					this.canvasTxt.beginPath();
					this.canvasTxt.moveTo(this.startX, this.startY);
					this.canvasTxt.lineTo(obj.x, obj.y);
					this.canvasTxt.stroke();
					this.canvasTxt.closePath();
					this.points.push(obj);
					this.points.push({
						x: -1,
						y: -1
					});
					this.isDown = false;
				}
			},
			//移动设备事件
			touchEnd(ev) {
				ev = ev || event;
				ev.preventDefault();
				console.log(ev);
				if(ev.touches.length == 1) {
					let obj = {
						x: ev.targetTouches[0].clientX,
						y: ev.targetTouches[0].clientY - 30
					};
					this.canvasTxt.beginPath();
					this.canvasTxt.moveTo(this.startX, this.startY);
					this.canvasTxt.lineTo(obj.x, obj.y);
					this.canvasTxt.stroke();
					this.canvasTxt.closePath();
					this.points.push(obj);
					this.points.push({
						x: -1,
						y: -1
					});
				}
				this.flag = true
			},
			//重写
			overwrite() {
				this.flag = false
				this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height);
				this.points = [];
			},
			handleClickPush() {
				if(this.flag) {
					var image = new Image();
					image.src = this.$refs.canvasF.toDataURL("image/png")
					if(this.index == 1) {
						Indicator.open()
						this.pushImg(image.src, 0)

					} else {
						Indicator.open()
						this.pushImg(image.src, 1)
					}

					this.sign = true
					this.mask = false
					this.$refs.bg.style.position = "absolute"
					this.blur = false
				} else {
					Toast("请签名后提交")
				}

			},
			pushImg(data, code) {
				var a = data.split(";")[0].split("/")[1];
				if(code == 0) {
					var base64Info = {
						"fileType": a,
						"imgList": [
							data
						],
						"uploadType": "2024"
					}
				} else if(code == 1) {
					var base64Info = {
						"fileType": a,
						"imgList": [
							data
						],
						"uploadType": "2025"
					}
				}
				this.$http.post(this.$store.state.link2 + '/fastdfs/filebase64', base64Info)
					.then(res => {
						Indicator.close();
						console.log(res)
						if(res.data.code == "SYS_S_000") {
							if(code == 0) {
								this.code = res.data.output[0].fileSerialNo
								this.signPhoto = data
								//								window.localStorage.code = this.code
								this.$refs.tou.setAttribute('class', 'signPhoto')
							} else if(code == 1) {
								this.code1 = res.data.output[0].fileSerialNo
								this.signPhoto1 = data
								//								window.localStorage.code1 = this.code1
								this.$refs.bei.setAttribute('class', 'signPhoto')
							}
						} else {
							Toast("上传发生错误，请重新上传")
						}

						
					}, res => {
						Indicator.close();
						console.log("上传图片错误");
					})

			}

		},
		components: {
			Pdf: Pdf
		}
	}
</script>

<style scoped="scoped">
	.center {
		filter: blur(.1rem);
	}
	
	.bg {
		position: absolute;
		width: 100%;
		background: #F3F3F3;
		padding-bottom: .6rem;
	}
	
	.bg1 {
		position: fixed;
		width: 100%;
		background: #F3F3F3;
		padding-bottom: .4rem;
	}
	
	.sign {
		width: 6.44rem;
		height: 3.56rem;
		margin: 0.32rem auto 0rem;
		font-size: 0.4rem;
		line-height: 3.56rem;
		text-align: center;
		color: #EB7760;
		letter-spacing: 0;
		background: #FFFFFF;
		border-radius: .16rem;
		overflow: hidden;
	}
	
	.context {
		width: 6.38rem;
		height: .6rem;
		/*border: 0.01rem solid red;*/
		margin: .32rem auto 0rem;
		font-family: PingFangSC-Regular;
		font-size: 0.24rem;
		line-height: 0.34rem;
		color: #000;
		letter-spacing: -0.29px;
	}
	
	.me {
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
		background: #FFFFFF;
		font-family: PingFangSC-Medium;
		font-size: 0.28;
		color: #555555;
		letter-spacing: 0;
	}
	
	.me p {
		margin-left: 0.32rem;
	}
	
	.btn {
		width: 100%;
		height: 0.88rem;
		margin: 1.02rem auto 0rem;
	}
	
	.last {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 0.32rem;
		color: #EB7760;
		letter-spacing: 0;
		border: 1px solid #EB7760;
		border-radius: 22px;
		float: left;
	}
	
	.next {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 0.32rem;
		color: #EB7760;
		letter-spacing: 0;
		border: 1px solid #EB7760;
		border-radius: 22px;
		float: right;
	}
	
	.signatureBox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.20);
		z-index: -1;
		display: flex;
		flex-direction: column;
		opacity: 0;
	}
	
	.active {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.20);
		z-index: 100;
		display: flex;
		flex-direction: column;
		opacity: 1;
	}
	
	.visaDetailTop {
		/*position: absolute;*/
		/*top: 0px;*/
		/*left: 0px;*/
		width: 100%;
		/*overflow: hidden;*/
		box-sizing: border-box;
		z-index: 2;
		border-bottom: 1px solid #e5e5e5;
	}
	
	.visaDetailTop p {
		margin: 0px;
		text-align: center;
		color: #000;
		font-size: 1em;
		position: relative;
	}
	
	p.visaTitle {
		width: 100%;
		position: absolute;
		top: 5px;
		left: 0px;
		text-align: center;
		font-size: 1.2em;
	}
	
	.btnBack {
		display: block;
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		z-index: 1;
		background: transparent;
		border-color: transparent;
		outline: none;
	}
	
	.btnDaoHang {
		display: block;
		position: absolute;
		left: 0px;
		top: 0px;
		height: 2.2em;
		width: 2em;
		z-index: 1;
		background: transparent;
		border-color: transparent;
		outline: none;
	}
	
	.visaDetailTop p span {
		color: #fff;
		font-size: 1.2em;
	}
	
	.visaDetailTop p:first-of-type {
		float: left;
	}
	
	.visaDetailTop p:nth-of-type(2) {
		float: right;
	}
	
	.canvasBox {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		flex: 1;
	}
	
	canvas {
		background: #fff;
		margin: 0 auto;
	}
	
	.btn {
		width: 100;
	}
	
	.btnBox {
		width: 100%;
		position: absolute;
		bottom: 1.2rem;
	}
	
	.last {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 0.32rem;
		color: #EB7760;
		letter-spacing: 0;
		border: 1px solid #EB7760;
		border-radius: .44rem;
		float: left;
		margin-left: .3rem;
	}
	
	.next {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 0.32rem;
		color: #EB7760;
		letter-spacing: 0;
		border: 1px solid #EB7760;
		border-radius: .44rem;
		float: right;
		margin-right: .3rem;
	}
	
	.signPhoto {
		width: 100%;
		height: 100%;
	}
	
	.success {
		width: 6rem;
		height: 1rem;
		border-radius: .5rem;
		border: 1px solid #EB7760;
		box-shadow: inset 0 .02rem .06rem 0 rgba(255, 255, 255, 0.50);
		text-align: center;
		line-height: 1rem;
		margin: 0 auto;
		font-size: .32rem;
		color: #EB7760;
	}
	
	.list {
		text-indent: 2em;
		width: 6.44rem;
		margin: 0 auto;
		font-size: .28rem;
		color: #222;
		line-height: .4rem;
		text-align: justify;
		margin-top: .32rem;
		margin-bottom: .2rem;
	}
	
	.list span {
		color: #5bcdc3;
	}
	
	.tain_p_topitem {
		padding: 0 .3rem;
		background: #fff;
		display: block;
		height: 0.83rem;
		margin: 0 auto;
		border-bottom: 0.01rem solid #C8C7CC;
		font-size: 0.36rem;
		line-height: 0.83rem;
		color: #222222;
	}
	
	.tain_img_topitemleft {
		display: block;
		float: left;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: 0.2rem;
		opacity: 0;
	}
	
	.tain_span_nameitem {
		width: 100%;
		height: 100%;
		font-size: 0.28rem;
		line-height: 0.84rem;
		color: #555555;
		margin-left: 0.02rem;
	}
	
	.tain_img_topitemright {
		display: block;
		float: right;
		width: 0.56rem;
		height: 0.56rem;
		margin-top: 0.16rem;
	}
	
	.ctc_div_mask {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		background: rgba(0, 0, 0, 0.40);
		z-index: 100;
	}
</style>