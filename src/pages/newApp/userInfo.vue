<template>
	<div class="userInfo" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="userInfoUp">
			<p class="userHeader clearFloat">
				<span class="left userHeaderDes">
					<label class="userHeaderText">头像</label>
					<span class="userHeaderTextDes">请上传职业照片和证件照</span>
				</span>
				<img :src="userImg1" class="userHeaderImg right" />
				<input id="file" type="file" accept="image/*" name="file" @change="submitImg">
			</p>
			<p class="inputGrop">
				<label class="inputLabel">昵称</label>
				<input type="text" maxlength="20" class="inputText" placeholder="请输入昵称" v-model="userNickName" />
			</p>
			<p class="inputGrop">
				<label class="inputLabel">真实姓名</label>
				<input type="text" maxlength="20" class="inputText" placeholder="请输入姓名" v-model="userName" />
			</p>
			<p class="inputGrop">
				<label class="inputLabel">证件类型</label>
				<select name="name_car" v-model="cardType" class="right inputText select_right" @change="getCouponSelected">
					<option  :value="coupon.id" v-for="coupon in couponList" >{{coupon.name}}</option>
				</select>
			</p>
			<p class="inputGrop">
				<label class="inputLabel">证件号码</label>
				<input type="text" maxlength="18" @input="testIDcode(1)" class="inputText inputWidth" placeholder="请输入证件号码" v-model="IDcode" />
			</p>
			<p class="inputGrop">
				<label class="inputLabel">手机号码</label>
				<span class="inputText spanIn">{{userTel}}</span>
			</p>
		</div>
		<div class="userInfoMid">
			<p class="inputGrop">
				<label class="inputLabel">我的微信</label>
				<input type="text" maxlength="20" class="inputText" placeholder="请输入微信号" v-model="wechartNum" />
			</p>
			<p class="inputGrop" v-show="userPositionShow">
				<label class="inputLabel">我的职位</label>
				<span class="inputText spanIn">{{userPositionName}}</span>
			</p>
			<p class="inputGrop">
				<label class="inputLabel">我的公司</label>
				<input type="text" maxlength="20" class="inputText" placeholder="请输入公司名称" v-model="compName" />
			</p>
		</div>
		<div class="userInfoDown">
			<p class="inputGrop">
				<label class="inputLabel">服务客户数（位）</label>
				<input type="text" class="inputText1" placeholder="" v-model="customNum" />
			</p>
			<p class="inputGrop">
				<label class="inputLabel">累计送出保障（万元）</label>
				<input type="text" class="inputText1" placeholder="" v-model="priceNum" />
			</p>
			<p class="inputGrop1">
				<label class="inputLabel1">个性签名</label>
				<textarea rows="3" maxlength="200" class="userSign" placeholder="请输入个性签名（200字）" v-model="userSign"></textarea>
			</p>
			<p class="keepBox">
				<span class="keepBtn" @click="handleClickKeep">保&nbsp;&nbsp;存</span>
			</p>
		</div>
	</div>
</template>

<script>
	import Exif from 'exif-js'
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
	  	name: 'userInfo',
	  	data(){
	  		return {
	  			userImg:"",
	  			userImg1:"/static/img/userImg.png",
	  			userNickName:"",
	  			userName:"",
	  			cardType:"",
	  			IDcode:"",
	  			userTel:"",
	  			typeNum:"",
	  			wechartNum:"",
	  			compName:"",
	  			customNum:"",
	  			priceNum:"",
	  			userSign:"",
	  			userPositionShow:false,
	  			userPosition:"",
	  			userPositionName:"",
	  			couponList:[
	  				{
	  					id:"A",
	  					name:"身份证"
	  				},
	  				{
	  					id:"B",
	  					name:"临时身份证"
	  				},
	  				{
	  					id:"C",
	  					name:"户口簿"
	  				},
	  				{
	  					id:"D",
	  					name:"出生证明"
	  				},
	  				{
	  					id:"E",
	  					name:"港澳通行证"
	  				},
	  				{
	  					id:"F",
	  					name:"护照"
	  				},
	  				{
	  					id:"G",
	  					name:"军官证"
	  				},
	  				{
	  					id:"H",
	  					name:"警官证"
	  				},
	  				{
	  					id:"I",
	  					name:"士兵证"
	  				},
	  				{
	  					id:"J",
	  					name:"驾照"
	  				},
	  				{
	  					id:"M",
	  					name:"营业执照"
	  				},
	  				{
	  					id:"O",
	  					name:"其他"
	  				}
	  			],
				picValue: '',
				IDtrue:false,
	  		}
	  	},
	  	created(){
	  		this.cardType = this.couponList[0].id;
	  		//show
	  		var userShow = {
				"userId":this.$store.state.userId,
				"token":this.$store.state.token
			};
	  		this.$http.post(this.$store.state.link+'/pct/seloneselfinfo', userShow)
			.then(res =>{
			    console.log(res.data);
				var dataCode = res.data.code;
				if (dataCode == "SYS_S_000") {
					this.userTel = res.data.output.userPhone
					this.userNickName = res.data.output.absName
					this.userName = res.data.output.userName
					this.compName = res.data.output.conpanyName	
					this.wechartNum = res.data.output.wechatNo
					this.userSign = res.data.output.cardText
					
					if (!res.data.output.credentNumber || res.data.output.credentNumber == "" || res.data.output.credentNumber == "null") {				
						this.IDcode = ""
						this.IDtrue = false;
					}else{	
						this.IDcode = res.data.output.credentNumber	
						this.IDtrue = true;
					}
					
					if (!res.data.output.credentNumber || res.data.output.credentNumber == "" || res.data.output.credentNumber == "null") {				
						this.cardType = this.couponList[0].id;
					}else{	
						this.cardType = res.data.output.credentType
					}
										
					if (!res.data.output.custNum || res.data.output.custNum == "null" || res.data.output.custNum == "") {				
						this.customNum = ''
					}else{
						if (parseFloat(res.data.output.custNum) == 0) {
							this.customNum = ''
						}else{
							this.customNum = res.data.output.custNum
						}
					}
					
					if (!res.data.output.sendGuarantee || res.data.output.custNum == "null" || res.data.output.custNum == "") {				
						this.priceNum = ''
					}else{
						if (parseFloat(res.data.output.sendGuarantee) == 0) {
							this.customNum = ''
						}else{
							this.priceNum = res.data.output.sendGuarantee
						}
					}
					
					if (res.data.output.headImg == undefined) {
						this.userImg1 = '/static/img/userImg.png'
					}else{
						if (res.data.output.headImg.indexOf("null") == -1 && res.data.output.headImg.indexOf("/static/img/userImg.png") == -1) {
							this.userImg1 = res.data.output.headImg
							this.userImg = this.userImg1.split('9900/')[1]
						}
					}
					
					if (res.data.output.userPosition != undefined && res.data.output.userPosition != null && res.data.output.userPosition != "") {
						this.userPositionShow = true;
						if (res.data.output.userPosition == "A") {
							this.userPosition = "A"
							this.userPositionName = "经纪人"
						}
						else if (res.data.output.userPosition == "B") {
							this.userPosition = "B"
							this.userPositionName = "高级经纪人"
						}
						else if (res.data.output.userPosition == "C") {
							this.userPosition = "C"
							this.userPositionName = "业务经理"
						}
						else if (res.data.output.userPosition == "D") {
							this.userPosition = "D"
							this.userPositionName = "业务总监"
						}
					}else{
						this.userPositionShow = false;
					}
				}else{
					Toast(res.data.desc);
				}
			},res =>{
				console.log(res.data);
			})
			
	  		this.common.noShare();
		},
		methods:{
			submitImg(e) {
				let files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				this.picValue = files[0];
				Indicator.open()
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
							Indicator.close()
							self.userImg1 = this.result;
							self.postImg(self.userImg1);  
						} else {
							Indicator.close()
							img.onload = function() {
								let data = self.compress(img, Orientation);
								Indicator.close()
								self.userImg1 = data
								self.postImg(self.userImg1);  
							}
						}
					}
				}
			},
			postImg(img) {
				//这里写接口  
				var a = img.split(";")[0].split("/")[1];
				var base64Info = {
				 	"fileType": a,
				  	"imgList": [
				    	img
				  	],
				  	"uploadType": "2001"
				}
				this.$http.post(this.$store.state.link2+'/fastdfs/filebase64', base64Info)
				.then(res =>{
				    console.log("==1"+JSON.stringify(res.data));
				    Indicator.close();
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.userImg = res.data.output[0].fileSerialNo;
						console.log("==="+this.userImg);
					}else{
						Toast(res.data.desc);
					}
				},res =>{
					Indicator.close();
					console.log("==2"+res.data);
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
			getCouponSelected(){
                console.log(this.cardType)
                if (this.cardType == "A" || this.cardType == "B" || this.cardType == "C") {
					if (this.IDcode.length == 18){
						this.testIDcode(1)				
					}
				}
           },
            testIDcode(a){
                var IDcodeNum = {
    				"idcard": this.IDcode,
					"idtype": this.cardType
    			}
                console.log(IDcodeNum)
                if (this.IDcode.length >= 18) {
                	if (this.cardType == "A" || this.cardType == "B" || this.cardType == "C") {
                		this.$http.post(this.$store.state.link + '/cut/cut/validIDCard', IDcodeNum)
						.then(res =>{
						    console.log(res.data);
						    var dataCode = res.data.code;
							if (dataCode == "SYS_S_000") {
						    	var dataCode = res.data.output.valid;
								if (dataCode == true ) {
									if (a == 1) {
										this.IDtrue = true;
									}
									return true;
								}else{
									this.IDtrue = false;
									Toast("身份证号输入有误~");
									return false;
								}
						    }else{
						    	this.IDtrue = false;
						    	Toast(res.data.desc);
						    	return false;
						    }
						},res =>{
							console.log(res.data);
						})
                	}
               	}
           	},
			handleClickKeep(){
				if (this.IDcode == "") {
					
				}else{
					if (this.cardType == "A" || this.cardType == "B" || this.cardType == "C") {
						if (this.IDcode.length == 18 && this.IDtrue == true){
							
						}else{
							console.log(this.cardType)
							console.log(this.IDcode.length)
							console.log(this.IDtrue)
							Toast("身份证号输入有误~");
							return false;
						}
					}
				}
				if (this.priceNum == "") {
					
    			}else{
    				if (isNaN(this.priceNum)) {
    					Toast("累计送出保障输入内容必须为数字~")
    					return
    				}
    			}
    			if (this.customNum == "") {
					
    			}else{
    				if (isNaN(this.customNum)) {
    					Toast("服务客户数输入内容必须为数字~")
    					return
    				}
    			}
				//keep
				console.log(this.userImg1)
		  		var userInfo = {
					"userId":this.$store.state.userId,
					"token":this.$store.state.token,
					"headImg":this.userImg,
					"absName":this.userNickName,
					"userName":this.userName,
					"userPhone":this.userTel,
					"credentType":this.cardType,
					"credentNumber":this.IDcode,
					"wechatNo":this.wechartNum,
					"conpanyName":this.compName,
					"custNum":this.customNum,
					"sendGuarantee":this.priceNum,
					"userPosition":this.userPosition,
					"cardText":this.userSign
				};
		  		this.$http.post(this.$store.state.link+'/pct/updoneselfinfo', userInfo)
				.then(res =>{
				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						Toast("保存成功");
						this.$router.push('/mine')
					}else{
						Toast(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.left{
		float: left;
	}
	.right{
		float: right;
	}
	input, button {
		background: none;
		border: none;
	}
	input, button {
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
	textarea::-webkit-input-placeholder, input::-webkit-input-placeholder {
		color: #B2B2B2;
	}
	input:-ms-input-placeholder {
		color: #B2B2B2;
	}
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.userInfo {
		width: 100%;
		overflow: hidden;
		background: #F3F3F3;
	}
	.userInfoUp {
		width: 6.7rem;
		padding: 0 0.4rem;
		background: #FFFFFF;		
		font-size: 0.32rem;
		color: #222222;
		overflow: hidden;
	}
	.userHeader {
		position: relative;
		height: 1.76rem;
		margin-top: 0.16rem;
		border-bottom: solid 0.01rem #D8D8D8;
	}
	#file {
		position: absolute;
		top: 0.29rem;
		right: 0;
		opacity: 0;
		z-index: 1;
		width: 1.2rem;
		height: 1.2rem;
	}
	.userHeaderText {
		display: block;
		margin: 0.38rem 0 0.3rem 0;
		height: 0.44rem;
		line-height: 0.44rem;
	}
	.userHeaderTextDes {
		display: block;
		height: 0.44rem;
		line-height: 0.44rem;
		font-size: 0.28rem;
		color: #969696;
	}
	.userHeaderImg {
		display: block;
		width: 1.12rem;
		height: 1.12rem;
		margin-top: 0.28rem;
		border: solid 0.04rem #000000;
		border-radius: 50%;
	}
	.inputGrop {
		height: 0.88rem;
		margin-top: 0.16rem;
		border-bottom: solid 0.01rem #D8D8D8;
	}
	.inputLabel {
		display: inline-block;
		line-height: 0.88rem;
	}
	.inputText {
		float: right;
		height: 0.88rem;
		font-size: 0.32rem;
		color: #555555;
		text-align: right;
		border: none;
		background: none;
	}
	.spanIn {
		line-height: 0.88rem;
		color: #969696;
	}
	.userInfoUp .inputGrop:last-child {
		border: none;
	}
	.userInfoMid {
		width: 6.7rem;
		padding: 0 0.4rem;
		margin-top: 0.56rem;
		background: #FFFFFF;		
		font-size: 0.32rem;
		color: #222222;
		overflow: hidden;
	}
	.userInfoMid .inputGrop:last-child {
		border: none;
	}
	.userInfoDown {
		width: 6.7rem;
		padding: 0 0.4rem;
		margin-top: 0.56rem;
		background: #FFFFFF;		
		font-size: 0.32rem;
		color: #222222;
		overflow: hidden;
	}
	.inputGrop1 {
		min-height: 2.26rem;
		margin-top: 0.16rem;
		border-bottom: solid 0.01rem #D8D8D8;
	}
	.inputText1 {
		float: right;
		width: 3rem;
		height: 0.88rem;
		font-size: 0.32rem;
		color: #555555;
		text-align: right;
		border: none;
		background: none;
	}
	.inputLabel1 {
		display: block;
		margin: 0.38rem 0 0.24rem;
	}
	.userSign {
		width: 100%;
		line-height: 0.34rem;
		font-size: 0.24rem;
		border: none;
		outline: none;
	}
	.keepBox {
		margin-top: 0.6rem;
		margin-bottom: 1.5rem;
	}
	.keepBtn {
		display: block;
		width: 6.04rem;
		height: 0.95rem;
		margin: 0 auto;
		line-height: 0.95rem;
		text-align: center;
		font-size: 0.32rem;
		color: #EB7760;
		border: solid 0.01rem #EB7760;
		border-radius: 0.51rem;
	}
	select {
		border: none;
		background: none;
		outline: none;
	}
	.select_right{
		direction: rtl;
	}
	.inputWidth {
		width: 4rem;
	}
</style>