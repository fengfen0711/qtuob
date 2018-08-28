<template>
	<div class="twoCon" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="policyHolder">
			<p class="title_twoCon">
				<label class="titleLable_twoCon">受益人信息</label>
				<span class="delBtn" v-if='beneficiaryList[0]=="N"' @click="delet(beneficiaryList[1])">删除</span>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">与被保险人关系</label>
				<select v-model="nexusType" class="left inputText inputWidth">
					<option :value="111">请选择</option>
					<option :value="nexus.insuredCode" v-for="nexus in nexusList" >{{nexus.insuredName}}</option>
				</select>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">姓名</label>
				<input type="text" class="inputText inputWidth left" maxlength="10" v-model="policyHolderName" placeholder="请输入真实姓名" />
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">证件类型</label>
				<span v-model="cardType" class="left inputText inputWidth inputSpan1">身份证</span>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">证件号码</label>
				<input type="text" maxlength="18" @input="cardnum(1)" class="inputText inputWidth left" v-model="IDnum" placeholder="请输入证件号码" />
			</p>
			<p class="inputGrop inputGrop2 clearFloat">
				<label class="inputLabel left">证件有效期至</label>
				<span class="inputText dateInput left inputSpan2" :class="{opa0:dateInput}">请选择证件有效期</span>
				<input type="date" id="dateTimeBen" class="inputText dateInput left" :class="{opa0:!dateInput}" placeholder="请选择证件有效期" v-model="termValidityDate" @change="termValidityDateSel" />
				<span class="dateBox" @click="dateSel">
					<img src="/static/sexNo.png" class="selImg" v-show="termValidityDateShow" />
					<img src="/static/selected.png" class="selImg" v-show="!termValidityDateShow" />
					<span>长期</span>
				</span>
				<label class="dateB" for="dateTimeBen">
					<img src="/static/upDown.png" class="upDownImg3" />
				</label>
			</p>
			<p class="inputGrop inputGrop2 clearFloat">
				<label class="inputLabel left">出生日期</label>
				<span class="inputText dateInput left inputSpan2" :class="{opa0:dateInputBirth,opa1:dateInputBirth1}">请选择出生日期</span>
				<input type="date" id="dateTimeBirthBen" :class="{opa0:!dateInputBirth}" class="inputText dateInput left" v-model="birthDate" placeholder="请选择出生日期" @click="birthDateSel" @change="birthDateSel" />
				<label class="dateB" for="dateTimeBirthBen">
					<img src="/static/upDown.png" class="upDownImg3" />
				</label>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">投保人性别</label>
				<span class="inputText inputSpan left">
					<span class="sex sexM" @click="MsexChose">
						<img src="/static/sexNo.png" class="sexImg" v-show="sexShow" />
						<img src="/static/sexS.png" class="sexImg" v-show="!sexShow" />
						<label>男</label>
					</span>
					<span class="sex sexF" @click="FsexChose">
						<img src="/static/sexNo.png" class="sexImg" v-show="!sexShow" />
						<img src="/static/sexS.png" class="sexImg" v-show="sexShow" />
						<label>女</label>
					</span>
				</span>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">受益比例</label>
				<select v-model="scaleType" class="inputText inputWidth left">
					<option :value="scale.code" v-for="scale in scaleList">{{scale.name}}</option>
				</select>
			</p>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
    	name: "Beneficiary",
    	props: ['beneficiaryList'],
    	data () {
      		return {
      			policyHolderShow:true,
      			cardType:'0',
	  			policyHolderName:'',
	  			IDnum:'',
	  			termValidityDateShow:true,
	  			termValidityDate:'',
	  			termValidityDate1:'',
	  			age:'',
	  			birthDate:'',
	  			nexusType:'',
	  			nexusList:[
	  				{
	  					insuredCode:'01',
	  					insuredName:'父母'
	  				},
	  				{
	  					insuredCode:'02',
	  					insuredName:'配偶'
	  				},
	  				{
	  					insuredCode:'03',
	  					insuredName:'子女'
	  				},
	  			],
	  			scaleType:'',
	  			scaleList:[],
			    sexShow:true,
			    sex:'',
			    certfEnduringFlag:'',
			  	dateInput:false,
			  	dateInputBirth:false,
			  	dateInputBirth1:false,
			  	dateInput1:false,
			  	sexBlur:true,
			  	IDtrue:false,
      		}
    	},
    	created(){
    		this.nexusType = "111";
			this.insureAjax()
    	},
    	watch:{
    		beneficiaryList:function(val){
    			if (this.beneficiaryList[2]) {
    				this.insureAjax()
    			}
    		}
    	},
    	methods:{
    		benInfo(){
//  			console.log(this.beneficiaryList[2])
    			this.cardType = this.beneficiaryList[2].certfType
    			this.policyHolderName = this.beneficiaryList[2].bnfName
    			this.IDnum = this.beneficiaryList[2].certfCode
    			this.IDtrue = true
    			this.certfEnduringFlag = this.beneficiaryList[2].certfEnduringFlag
    			if (this.certfEnduringFlag == "N") {
      				this.termValidityDateShow = true
    				this.termValidityDate = this.beneficiaryList[2].certfEndTime
    				this.termValidityDate1 = this.beneficiaryList[2].certfEndTime
    				this.dateInput = true
    			}else{
    				this.termValidityDateShow = false
    				this.termValidityDate = ""
    				this.termValidityDate1 = "9999-01-01"
    				this.dateInput = false
    			}
    			this.age = this.beneficiaryList[2].age
    			this.birthDate = this.beneficiaryList[2].birthday
    			this.dateInputBirth = true
    			this.nexusType = this.beneficiaryList[2].relatoInsured
    			for (let i=0;i<this.nexusList.length;i++) {
      				if (this.nexusType == this.nexusList[i].insuredCode) {
      					this.nexusType = this.nexusList[i].insuredCode
      				}
      			}
    			this.scaleType = this.beneficiaryList[2].bnfShare
    			for (let i=0;i<this.scaleList.length;i++) {
      				if (this.scaleType == this.scaleList[i].code) {
      					this.scaleType = this.scaleList[i].code
      				}
      			}
    			this.sex = this.beneficiaryList[2].gender
    			if (this.sex == "M") {
		  			this.sexShow = false
		  		}else{
		  			this.sexShow = true
		  		}
    		},
    		MsexChose(){
    			if(this.sexBlur==true){
    				this.sexShow = false;
	  				this.sex = "M";
    			}
	  		},
	  		FsexChose(){
	  			if(this.sexBlur==true){
		  			this.sexShow = true;
		  			this.sex = "F";
	  			}
	  		},
    		jsGetAge(strBirthday){
	  			var returnAge;  
			    var strBirthdayArr=strBirthday.split("-");  
			    var birthYear = strBirthdayArr[0];  
			    var birthMonth = strBirthdayArr[1];  
			    var birthDay = strBirthdayArr[2];  
			    var d = new Date();  
			    var nowYear = d.getFullYear();  
			    var nowMonth = d.getMonth() + 1;  
			    var nowDay = d.getDate();  
			      
			    if(nowYear == birthYear){  
			        returnAge = 0;
			    } else{
			        var ageDiff = nowYear - birthYear ;
			        if(ageDiff > 0){  
			            if(nowMonth == birthMonth) {  
			                var dayDiff = nowDay - birthDay;
			                if(dayDiff < 0) {  
			                    returnAge = ageDiff - 1;  
			                } else {  
			                    returnAge = ageDiff ;  
			                }  
			            } else {  
			                var monthDiff = nowMonth - birthMonth;
			                if(monthDiff < 0) {  
			                    returnAge = ageDiff - 1;  
			                } else {  
			                    returnAge = ageDiff ;  
			                }
			            }  
			        } else {  
			            returnAge = -1;
			        }  
			    }
			    return returnAge;
	  		},
    		delet(data){
//  			console.log(data)
    			this.$emit('deletId',data);
    		},
    		isCardID(sId) {
				var iSum = 0;
				var info = "";
				if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
				sId = sId.replace(/x$/i, "a");
				//			if(aCity[parseInt(sId.substr(0, 2))] == null) return "你的身份证地区非法";
				var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
				var d = new Date(sBirthday.replace(/-/g, "/"));
				if(sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
				for(var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
				if(iSum % 11 != 1) return "你输入的身份证号非法";
				return "true";
			},
			cardnum(a) {
				if(this.cardType == "0") {
					if(this.IDnum.length >= 18) {
						if(this.IDnum != "") {
							var data = {
								"idcard": this.IDnum,
								"idtype": this.cardType
							}
							this.$http.post(this.$store.state.link + '/cut/cut/validIDCard', data).then(response => {
//								console.log(response.data);
								if(response.data.code == "SYS_S_000") {
									if(response.data.output.valid == true) {
										var tip = "";
										var pass = true;
										var str = this.isCardID(this.IDnum);
										if(str == "true") {
											if(a==1){
												this.IDtrue = true
											}
											var Idcard = this.IDnum.substring(6, 14); //截取生日字符串
											Idcard = Idcard.substring(0, 4) + "-" + Idcard.substring(4, 6) + "-" + Idcard.substring(6, 9);
											this.birthDate = Idcard;
											this.dateInputBirth = true
											this.dateInputBirth1 = true
											this.sexBlur = false
											this.age = this.jsGetAge(this.birthDate)
							    			if(this.age < 46){
							    				this.termValidityDateShow = true
							    			}
											if(parseInt(this.IDnum.substr(16, 1)) % 2 == 1) {
												this.sex = "M"
												this.sexShow = false
											} else {
												this.sex = "F"
												this.sexShow = true
											}
										}else{
											this.IDtrue = false
											this.dateInputBirth1 = false
											this.sexBlur = true
										}
									} else {
										this.IDtrue = false
										this.dateInputBirth1 = false
										this.sexBlur = true
										Toast("身份不合法");
										return
									}
								} else {
									this.IDtrue = false
									this.dateInputBirth1 = false
									this.sexBlur = true
									Toast("身份不合法");
									return
								}
							}, response => {
								this.IDtrue = false
								this.dateInputBirth1 = false
								this.sexBlur = true
								console.log("ajax error");
							})
						}else{
							this.IDtrue = false
							this.dateInputBirth1 = false
							this.sexBlur = true
						}
					}else{
						this.IDtrue = false
						this.dateInputBirth1 = false
						this.sexBlur = true
					}
				}
			},
    		insureAjax(){
    			//受益比例
    			var insureinfo = {
  					"orgCode": "QTBSYBLSH",
					"type": "1"
				}
				this.$http.post(this.$store.state.link+'/dic/findDicTotalByOrgCode', insureinfo)
				.then(res =>{
//				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
							this.scaleList = res.data.output
							this.scaleType = this.scaleList[0].code
							if (this.beneficiaryList[2]) {
								this.benInfo()
							}
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
    		},
    		childSay(){
    			//受益人
    			if (this.nexusType == "111") {
    				Toast("请选择受益人与被保人的关系~")
    				return
    			}
    			if (this.policyHolderName == "") {
    				Toast("受益人姓名不能为空~")
    				return
    			}else{
    				var myReg = /^([\u4E00-\u9FA5]{2,})+$/;
				 	if (!myReg.test(this.policyHolderName)) {
						Toast("受益人姓名必须为汉字，且最少两个汉字~")
						return
				 	}
    			}
    			if (this.IDnum == "") {
    				Toast("受益人证件号码不能为空~")
    				return
    			}else{
    				if(this.cardType == "0") {
						if(this.IDnum.length == 18 && this.IDtrue == true) {
							
						}else{
							Toast("受益人证件号码不合法~")
    						return
						}
					}
    			}
    			if (this.termValidityDateShow == true) {
    				this.certfEnduringFlag = "N"
    				if (this.termValidityDate == "") {
	    				Toast("受益人证件有效期不能为空~")
	    				return
	    			}
    			}else{
    				this.certfEnduringFlag = "Y"
    				this.termValidityDate = ""
    				this.termValidityDate1 = "9999-01-01"
    			}
    			if (this.birthDate == "") {
    				Toast("受益人出生日期不能为空~")
    				return
    			}
    			
    			this.age = this.jsGetAge(this.birthDate)
    			var benData = {
			      	"age": this.age,
			      	"birthday": this.birthDate,
			      	"bnfName": this.policyHolderName,
			      	"bnfGrade":"1",
					"bnfSeq":"1",
			      	"bnfShare": this.scaleType,
			      	"bnfType": "4",
			      	"certfCode": this.IDnum,
			      	"certfEndTime": this.termValidityDate1,
			      	"certfEnduringFlag": this.certfEnduringFlag,
			      	"certfType": this.cardType,
			      	"gender": this.sex,
			      	"relatoInsured": this.nexusType
    			}    			
    			this.$emit('child_saya',benData);
    		},
    		dateSel(){
    			if(this.age >=46){
    				this.termValidityDateShow = false
    				this.termValidityDate = ""
    				this.termValidityDate1 = "9999-01-01"
    				this.dateInput = false
    			}
    		},
    		termValidityDateSel(){
    			this.termValidityDateShow = true
    			var pdate = this.termValidityDate;
		        var d = new Date;
		        var today = new Date(d.getFullYear (), d.getMonth (), d.getDate ());
		        var reg = /\d+/g;
		        var temp = pdate.match (reg);
		        if(temp){
		        	var foday = new Date (temp[0], parseInt (temp[1]) - 1, temp[2]);
			        if (foday < today){
			            Toast ('受益人证件有效期不可选择今天之前的日期');
			            this.termValidityDate = ""
			            this.termValidityDate1 = ""
			        }
		        }
			        
    			if(this.termValidityDate == ""){
    				this.dateInput = false
    				this.termValidityDate1 = ""
    			}else{
    				this.dateInput = true
    				this.termValidityDate1 = this.termValidityDate
    			}
    		},
    		birthDateSel(){
    			var pdate = this.birthDate;
		        var d = new Date;
		        var today = new Date(d.getFullYear (), d.getMonth (), d.getDate ());
		        var reg = /\d+/g;
		        var temp = pdate.match (reg);
		        if(temp){
		         	var foday = new Date (temp[0], parseInt (temp[1]) - 1, temp[2]);
			        if (foday > today){
			            Toast ('受益人出生日期不可选择今天之后的日期');
			            this.birthDate = ""
			        }
		        }
			        
    			if(this.birthDate == ""){
    				this.dateInputBirth = false
    			}else{
    				this.dateInputBirth = true
    			}
    			
    		},
    		
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
	input, button {
		background: none;
		border: none;
	}
	input, button {
		outline: none;
	}
	input {
		font-weight: 100;
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
		font-weight: 100;
	}
	input:-ms-input-placeholder {
		color: #B2B2B2;
		font-weight: 100;
	}
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.opa0 {
		opacity: 0;
		z-index: -1;
	}
	.opa1 {
		opacity: 0;
		z-index: 1;
	}
	.one{
		width: 100%;
		min-height: 100%;
		position: absolute;
		background: #F3F3F3;
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
		margin-left: 0.2rem;
	}
	.oneTitleTextSpan2 {
		margin-left: 1.5rem;
	}
	.oneTitleTextSpan3 {
		margin-right: 0.2rem;
	}
	.ranchImg {
		display: block;
		width: 6.3rem;
		margin: 0 auto;
		margin-bottom: 0.2rem;
	}
	.selected {
		color: #EB7760;
	}
	.twoCon {
		margin-top: 0.4rem;
		padding: 0 0.4rem;
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
	.twoCon2 {
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
		float: left;
		width: 0.56rem;
		height: 0.56rem;
		margin-top: 0.14rem;
		margin-right: 0.1rem;
	}
	.btnBox {
		padding: 0.64rem 0.4rem;
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
		box-shadow: inset 0 0.01rem 0.03rem 0 rgba(255,255,255,0.50);
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
	.inputGrop2 {
		position: relative;
	}
	.inputSpan {
		line-height: 0.88rem;
		color: #555555;
		font-weight: bold;
	}
	.inputSpan1 {
		line-height: 0.88rem;
		color: #555555;
	}
	.inputLabel {
		display: block;
		width: 2.04rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
	}
	.inputLabel1 {
		line-height: 0.68rem;
	}
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
	}
	.inpuDate {
		width: 3rem;
	}
	select{
		padding: 0;
		margin: 0;
		padding-right: 0.48rem;
		border: none;
		background: none;
		background: url(/static/upDown.png) no-repeat right center;
		background-size: 0.4rem 0.45rem;
		outline: none;
		appearance:none;
		-webkit-appearance:none;
		-moz-appearance:none;
	}
	.dateBox {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 1;
		display: block;
		height: 0.87rem;		
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
		display: block;
		width: 3.6rem;
		height: 0.68rem;
		margin-left: 2.04rem;
		font-size: 0.28rem;
		color: #666666;
	}
	.pro {
		width: 3.6rem;
	}
	.dateInput {
		width: 2.8rem;
	}
	.inputWidth {
		width: 4.66rem;
	}
	.inputWidth1 {
		width: 3rem;
	}
	.inputWidth2 {
		width: 3.5rem;
	}
	.inputselect {
		height: 0.68rem;
	}
	.sBox {
		padding: 0 0.4rem;
		margin-top: 0.34rem;
		margin-bottom: 0.88rem;
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
		width: 0.4rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.6rem;
		text-align: center;
		color: #EB7760;
	}
	.signBox {
		padding-bottom: 0.32rem;
		margin-bottom: 0.64rem;
	}
	.signBtn {
		display: inline-block;
		float: left;
		width: 2.04rem;
		height: 0.68rem;
		line-height: 0.68rem;
		margin-top: 0.32rem;
		font-size: 0.28rem;
		color: #555555;
		text-align: center;
		border: solid 0.02rem #54CCC1;
		border-radius: 0.34rem;
	}
	.marR {
		margin-right: 0.233rem;
	}
	.selectedSign {
		background: #54CCC1;
		color: #FFFFFF;
	}
	.delBtn {
		display: block;
		float: right;
		font-size: 0.3rem;
		color: #EB7760;
	}
	.dateB {
		position: absolute;
		right: 1.86rem;
		top: 0;
		z-index: -1;
		width: 0.4rem;
		height: 0.87rem;
		background: #FFFFFF;
	}
	.upDownImg3 {
		width: 0.4rem;
		height: 0.44rem;
		margin-top: 0.22rem;
	}
	.sexImg {
		display: inline-block;
		float: left;
		margin-top: 0.2rem;
		width: 0.48rem;
		height: 0.48rem;
		margin-right: 0.06rem;
	}
	.sex label {
		display: inline-block;
		float: left;
	}
	.sex {
		display: inline-block;
		height: 0.88rem;
		margin-right: 0.46rem;
		overflow: hidden;
	}
	.sexM {
		margin-right: 0.46rem;
	}
	.inputSpan2 {
		position: absolute;
		top: 0;
		left: 2.04rem;
		font-weight: 100;
		line-height: 0.88rem;
		font-size: 0.28rem;
		color: #B2B2B2;
	}
</style>