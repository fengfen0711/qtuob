<template>
	<div class="userInfo" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="userInfoUp">
			<p class="userHeader clearFloat">
				<span class="left userHeaderDes">
					<label class="userHeaderText">头像</label>
					<span class="userHeaderTextDes">请上传职业照片和证件照</span>
				</span>
				<img :src="userImg1" class="userHeaderImg right" />
				<form id="form" method="post" style="text-align:center;" enctype="multipart/form-data" @change="submitImg">  
		    		<input type="file" id="file" name="file" accept="image/*" />
			       	<input id="submit" type="submit" />
			 	</form>
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
				<input type="text" maxlength="19" class="inputText inputWidth" placeholder="请输入证件号码" v-model="IDcode" @blur="testIDcode" />
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
				<input type="text" class="inputText1" placeholder="0" v-model="customNum" />
			</p>
			<p class="inputGrop">
				<label class="inputLabel">累计送出保障（万元）</label>
				<input type="text" class="inputText1" placeholder="0" v-model="priceNum" />
			</p>
			<p class="inputGrop1">
				<label class="inputLabel1">个性签名</label>
				<textarea rows="3" maxlength="200" class="userSign" placeholder="请输入个性签名（200字）" v-model="userSign"></textarea>
			</p>
			<p class="keepBox">
				<span class="keepBtn" @click="handleClickKeep">保存</span>
			</p>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui';
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
	  			]
	  		}
	  	},
	  	created(){
	  		this.cardType = this.couponList[0].id;
	  		//show
	  		var userShow = {
				"userId":localStorage.getItem("userId"),
				"token":localStorage.getItem("token")
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
					this.priceNum = res.data.output.sendGuarantee
					this.wechartNum = res.data.output.wechatNo
					this.userSign = res.data.output.cardText
					
					
					if (res.data.output.credentNumber == "null") {				
						this.IDcode = ""
					}else{	
						this.IDcode = res.data.output.credentNumber	
					}
					
					if (res.data.output.credentNumber == "null") {				
						this.cardType = this.couponList[0].id;
					}else{	
						this.cardType = res.data.output.credentType
					}
										
					if (res.data.output.custNum == "null") {				
						this.customNum = '0'
					}else{	
						this.customNum = res.data.output.custNum	
					}
					
					if (res.data.output.headImg == undefined) {
						this.userImg1 = '/static/img/userImg.png'
					}else{
						if (res.data.output.headImg.indexOf("null") == -1 && res.data.output.headImg.indexOf("/static/img/userImg.png") == -1) {
							this.userImg1 = res.data.output.headImg
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
		},
		methods:{
			submitImg(){
				let formData1 = new FormData();
				var myfile = document.getElementById('file');
				var data = myfile.files[0];
				console.log(data)
				formData1.delete("file")
				formData1.append("file", data)
				var s=this;
				for(var i = 0; i < myfile.files.length; i++) {
					var reader = new FileReader();
					reader.readAsDataURL(myfile.files[i]);
					reader.onload = function(e){
						s.userImg1 = e.target.result
					}
				}
				console.log("formData1=="+JSON.stringify(data))
				console.log(formData1)
				this.$http.post(this.$store.state.link2+'/fastdfs/fileH5?uploadType=2001', formData1)
				.then(res =>{
				    console.log("==1"+JSON.stringify(res.data));
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.userImg = res.data.output.fileSerialNo;
						console.log("==="+this.userImg);
					}else{
						Toast(res.data.desc);
					}
				},res =>{
					 Toast("222")
					console.log("==2"+res.data);
				})
			},
			test(e){
				this.userImg1 = e.target.result
			},
			getCouponSelected(){
                console.log(this.cardType)
            },
            testIDcode(){
                var IDcodeNum = {
    				 "idcard": this.IDcode
    			}
                if (this.IDcode!="") {
                	this.$http.post(this.$store.state.link+'/cut/cut/validIDCard', IDcodeNum)
					.then(res =>{
					    console.log(res.data);
						var dataCode = res.data.output.valid;
						if (dataCode == true) {
							
						}else{
							Toast("身份证号输入有误~");
						}
					},res =>{
						console.log(res.data);
					})
               }
            },
			handleClickKeep(){				
				//keep
				console.log(this.userImg1)
		  		var userInfo = {
					"userId":localStorage.getItem("userId"),
					"token":localStorage.getItem("token"),
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
					}else{
						Toast(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
			},
			 
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
	.userInfo {
		background: #F3F3F3;
	}
	.userInfoUp {
		width: 6.7rem;
		padding: 0 0.4rem;
		background: #FFFFFF;		
		font-size: 0.36rem;
		color: #222222;
		overflow: hidden;
	}
	.userHeader {
		position: relative;
		height: 1.76rem;
		margin-top: 0.16rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	#form {
		position: absolute;
		top: 0.44rem;
		right: 0.4rem;
		opacity: 0;
		z-index: 1;
	}
	#file {
		width: 1.12rem;
		height: 1.12rem;
	}
	#submit{
		padding: 0;
		margin: 0;
		border: none;
		background: none;
		width: 0.0001rem;
		height: 0.0001rem;
		z-index: -9999;
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
		border-bottom: solid 0.01rem #C8C7CC;
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
	.inputWidth {
		width: 4rem;
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
		font-size: 0.36rem;
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
		font-size: 0.36rem;
		color: #222222;
		overflow: hidden;
	}
	.inputGrop1 {
		min-height: 2.26rem;
		margin-top: 0.16rem;
		border-bottom: solid 0.01rem #C8C7CC;
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
		height: 1rem;
		margin: 0 auto;
		line-height: 1rem;
		text-align: center;
		font-size: 0.32rem;
		color: #EB7760;
		border: solid 0.01rem #EB7760;
		border-radius: 0.5rem;
	}
	select {
		border: none;
		background: none;
		outline: none;
	}
	.select_right{
		direction: rtl;
	}
	
</style>