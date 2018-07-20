<template>
	<div class="popupConBox" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="popupConW">
			<div class="popupCon">
				<p class="title_twoCon">
					<label class="titleLable_twoCon">投保确认信息</label>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel">出生日期</label>
					<input type="date" name="date" v-model="birthDate" id="birthDate" class="inputText dateInput" @change="ageCh" />
					<label class="dateB" for="birthDate">
						<img src="/static/upDown.png" class="upDownImg" />
					</label>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel">被保险人性别</label>
					<span class="inputText inputSpan">
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
				<div class="inputGrop1 clearFloat">
					<p class="inputselectP clearFloat ">
						<label class="inputLabel inputLabel1 left">地区</label>
						<select class="inputText inputselect pro inputWidth left" v-model="provinceType" @change="provinceChange" >
							<option :value="province.cnCode" v-for="province in provinceList" >{{province.cnName}}</option>
						</select>
					</p>
					<p class="inputselectP clearFloat">
						<label class="inputLabel inputLabel1 left"></label>
						<select class="inputText1 inputWidth left" v-model="cityType" @change="cityChange" >
							<option :value="city.cnCode" v-for="city in cityList" >{{city.cnName}}</option>
						</select>
					</p>
					<p class="inputselectP clearFloat">
						<label class="inputLabel inputLabel1 left"></label>
						<select class="inputText1 inputWidth left" v-model="countyType" @change="countyChange">
							<option :value="county.cnCode" v-for="county in countyList" >{{county.cnName}}</option>
						</select>
					</p>
				</div>
				<p class="inputGrop clearFloat">
					<label class="inputLabel" for="periodsSele">交费期间</label>
					<select class="inputText width3" v-model="periodCode" @change="periodChange" id="periodsSele">
						<option v-for="period in periods" :value="[period.payNo,period.payFlag]">{{period.payRmk}}</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel">保险期间</label>
					<select class="inputText width3" v-model="insuRmkCode" @change="insuRmkChange" id="insuRmkListSele">
						<option v-for="insuRmk in insuRmkList" :value="[insuRmk.insuNo,insuRmk.insuFlag]">{{insuRmk.insuRmk}}</option>
					</select>
				</span>
				<p class="inputGrop clearFloat">
					<label class="inputLabel">保额</label>
					<select class="inputText width3" v-model="amnt" @change="amountForceChange">
						<option v-for="amountForce in amountForces" :value="amountForce.id">{{amountForce.des}}</option>
					</select>
				</p>
			</div>
			<div class="popupCon1 popupCon2">
				<p class="inputGrop clearFloat">
					<label class="inputLabel">保费(元)</label>
					<span class="inputText dateInput inputSpan">{{minPrice}}</span>
				</p>
			</div>
		</div>
		<p class="popupP">
			<span class="btn" @click="nextGo">下一步</span>
		</p>
	</div>
</template>
	
<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
	  	name: 'CvrgInfo',
	  	data(){
	  		return {
	  			age:'',
	  			birthDate:'',
	  			sexShow:true,
	  			sex:'',
	  			insuRmkCode:[],//保险id+type
	  			insuNo:'',//保险id
	  			insuFlag:'',//保险期间类型
	  			insuRmkList:[],//保险期间
	  			periodCode:[],//缴费id+type
	  			payNo:'',//缴费id
	  			payFlag:'',//缴费期间类型
	  			periods:[],//缴费期间
	  			amnt:'',//保额id
			  	amountForces:[
			      	{
			      		des: '10万',
			      		id:"100000"
			      	},
			      	{
			      		des: '20万',
			      		id:"200000"
			      	},
			      	{
			      		des: '30万',
			      		id:"300000"
			      	},
			      	{
			      		des: '40万',
			      		id:"400000"
			      	},
			      	{
			      		des: '50万',
			      		id:"500000"
			      	},
			      	{
			      		des: '60万',
			      		id:"600000"
			      	},
			      	{
			      		des: '70万',
			      		id:"700000"
			      	},
			      	{
			      		des: '80万',
			      		id:"800000"
			      	},
			      	{
			      		des: '90万',
			      		id:"900000"
			      	},
			      	{
			      		des: '100万',
			      		id:"1000000"
			      	},
			      	{
			      		des: '110万',
			      		id:"1100000"
			      	},
			      	{
			      		des: '120万',
			      		id:"1200000"
			      	},
			      	{
			      		des: '130万',
			      		id:"1300000"
			      	},
			      	{
			      		des: '140万',
			      		id:"1400000"
			      	},
			      	{
			      		des: '150万',
			      		id:"1500000"
			      	}
			  	],//保额
			  	provinceType:'',
	  			provinceList:[],
	  			cityType:'',
	  			cityList:[],
	  			countyType:'',
	  			countyList:[],
	  			minPrice:'',
	  			allData:'',
	  			cvrgCode:'',
	  			cvrgName:'',
	  			cvrgType:'',
	  			cvrgNo:'',
	  			brokerCode:'',
	  			cmpName:'',
	  		}
	  	},
	  	created(){
	  		this.pro()
	  		this.cvrgInfoAjax()
	  	},
	  	methods:{
	  		OrderInfoAjax(){
    			var OrderInfo = {
				  	"head": {
					    "channelCode": "qtb_h5",
					    "deptCode": this.$route.query.cmpCode,
					    "oprCode": this.$store.state.userId,
					    "prodCode": this.$route.query.prodCode
				  	},
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
				  	"opt": "MAIN,CVRG,APPL",
				  	"pkgNo": this.$route.query.orderNo
				}
				this.$http.post(this.$store.state.link+'/trd/order/v1/queryorder', OrderInfo)
				.then(res =>{
				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.allData = res.data.output
						this.birthDate = res.data.output.applntResp.birthday
						this.age = res.data.output.applntResp.age
						this.sex = res.data.output.applntResp.gender
			  			if (this.sex == "F") {
			  				this.sexShow = true
			  			}else{
			  				this.sexShow = false
			  			}
			  			this.provinceType = res.data.output.mainResp.province
		      			this.cityType = res.data.output.mainResp.city
		      			this.countyType = res.data.output.mainResp.county
						for (let i=0;i<this.provinceList.length;i++) {
		      				if (this.provinceType == this.provinceList[i].cnCode) {
		      					this.provinceType = this.provinceList[i].cnCode
		      					this.city()
		      				}
		      			}
			  			this.minPrice = res.data.output.cvrgResp[0].prem
						this.amnt = res.data.output.cvrgResp[0].amnt
						this.insuFlag = res.data.output.cvrgResp[0].insuFlag
					  	this.insuNo = res.data.output.cvrgResp[0].insuNo
						for (let i=0;i<this.insuRmkList.length;i++) {
		      				if (this.insuNo == this.insuRmkList[i].insuNo) {
		      					this.insuRmkCode = [this.insuRmkList[i].insuNo,this.insuRmkList[i].insuFlag];
		      				}
		      			}
					  	this.payFlag = res.data.output.cvrgResp[0].payFlag
					  	this.payNo = res.data.output.cvrgResp[0].payNo
					  	for (let i=0;i<this.periods.length;i++) {
		      				if (this.payNo == this.periods[i].payNo) {
		      					this.periodCode = [this.periods[i].payNo,this.periods[i].payFlag];
		      				}
		      			}
			  			this.cvrgCode = res.data.output.cvrgResp[0].cvrgCode
			  			this.cvrgName = res.data.output.cvrgResp[0].cvrgName
			  			this.cvrgNo = res.data.output.cvrgResp[0].cvrgNo
			  			this.cvrgType = res.data.output.cvrgResp[0].cvrgType
			  			this.brokerCode = res.data.output.mainResp.agentCode
			  			this.cmpName = res.data.output.mainResp.deptName
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
    		},
	  		cvrgInfoAjax(){
	  			var cvrgInfo={
				  	"cvrgExtType": "3",
				  	"prodCode": this.$route.query.prodCode
				}
		  		Indicator.open();
		  		this.$http.post(this.$store.state.link+'/prd/cvrg/cvrglist', cvrgInfo)
				.then(res =>{
//				    console.log(res.data);
				    Indicator.close();
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.insuRmkList = res.data.output[0].insuPeriodList
						this.periods = res.data.output[0].payPeriodList
						//缴费期间
		  				this.periodCode = [this.periods[0].payNo,this.periods[0].payFlag];
		  				this.payNo = this.periods[0].payNo;
		  				this.payFlag = this.periods[0].payFlag;
						//保险期间
						this.insuRmkCode = [this.insuRmkList[0].insuNo,this.insuRmkList[0].insuFlag];
						this.insuNo = this.insuRmkList[0].insuNo;
						this.insuFlag = this.insuRmkList[0].insuFlag;
						
	  					this.OrderInfoAjax()
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc);
					}
				},res =>{
					Indicator.close();
					console.log(res.data);
				})
	  		},
    		pro(){
    			var provinceinfo = {
  					"code": "0",
  					"orgCode": this.$route.query.cmpCode
				}
				this.$http.post(this.$store.state.link+'/dic/findChinaByOrgCode', provinceinfo)
				.then(res =>{
//				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
							this.provinceList = res.data.output
							this.provinceType = this.provinceList[0].cnCode;
			      			this.city()
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
    		},
    		city(){
    			var cityinfo = {
    				"code": this.provinceType,
  					"orgCode": this.$route.query.cmpCode
				}
				this.$http.post(this.$store.state.link+'/dic/findChinaByOrgCode', cityinfo)
				.then(res =>{
//				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.cityList = res.data.output
						if(this.allData.mainResp && this.allData.mainResp.city){
							
						}else{
							this.cityType = ""
						}
						if(this.cityType == ""){
							this.cityType = this.cityList[0].cnCode;
							this.countyType = ""
							this.coun()
						}else{
							for (let i=0;i<this.cityList.length;i++) {
			      				if (this.cityType == this.cityList[i].cnCode) {
			      					this.cityType = this.cityList[i].cnCode
									this.coun()
			      				}
			      			}
						}
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
    		},
    		coun(){
    			var countyinfo = {
    				"code": this.cityType,
  					"orgCode": this.$route.query.cmpCode
				}
//				console.log(countyinfo)
				this.$http.post(this.$store.state.link+'/dic/findChinaByOrgCode', countyinfo)
				.then(res =>{
//				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.countyList = res.data.output
						if(this.allData.mainResp && this.allData.mainResp.city){
							
						}else{
							this.countyType = ""
						}
						if(this.countyType == ""){
							this.countyType = this.countyList[0].cnCode;
						}else{
							for (let i=0;i<this.countyList.length;i++) {
		      				if (this.countyType == this.countyList[i].cnCode) {
			      					this.countyType = this.countyList[i].cnCode
			      				}
			      			}
						}
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
    		},
    		provinceChange(){
    			this.cityType = ""
    			this.city()
    			this.handleClickPopup()
    		},
    		cityChange(){
    			this.countyType = ""
    			this.coun()
    			this.handleClickPopup()
    		},
    		countyChange(){
    			this.handleClickPopup()
    		},
    		MsexChose(){
	  			this.sexShow = false;
	  			this.sex = "M"
	  			this.handleClickPopup()
	  		},
	  		FsexChose(){
	  			this.sexShow = true;
	  			this.sex = "F"
	  			this.handleClickPopup()
	  		},
	  		ageCh(){
	  			this.age = this.jsGetAge(this.birthDate)
	  			this.handleClickPopup()
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
	  		handleClickPopup(){
  				this.age = this.jsGetAge(this.birthDate)
  				if (this.age >= 18 && this.age <= 50) {
  					var popIfo = {
					  	"list": [
						    {
						    	"age": this.age,
						      	"birthDays": this.birthDate,
						      	"coverage": this.amnt,
						      	"cvrgCode": this.cvrgCode,
						      	"cvrgName": this.cvrgName,
						      	"city": this.cityType,
						      	"prodId": this.$route.query.prodCode,
						      	"safeGuard": this.insuNo,
						      	"sex": this.sex,
						      	"year": this.payNo
						    }
					  	]
					}
//	  				console.log(JSON.stringify(popIfo))
	  				this.$http.post(this.$store.state.link+'/ppt/count/queryCoverageFee', popIfo)
					.then(res =>{
					    console.log(res.data);
						var dataCode = res.data.code;
						if (dataCode == "SYS_S_000") {
							this.minPrice = res.data.output.coverageFeeList[0].yearFee
						}else{
							Toast(res.data.desc);
							console.log(res.data.desc)
						}
					},res =>{
						Toast(res.data);
						console.log(res.data)
					})
  				}else{
  					Toast("投保年龄18-50岁，请重新选择出生日期~");
  				}
	  		},
	  		periodChange(){
                this.payNo = this.periodCode[0];
		  		this.payFlag = this.periodCode[1];
		  		this.handleClickPopup()
	  		},
	  		amountForceChange(){
				this.handleClickPopup()
	  		},
	  		insuRmkChange(){
                this.insuNo = this.insuRmkCode[0];
				this.insuFlag = this.insuRmkCode[1];
				this.handleClickPopup()
	  		},
	  		nextGo(){
	  			let freqyNo = "B"
	  			if (this.periodId == "B1") {
	  				freqyNo = "A"
	  			}
	  			var saveinfo = {
	  				"head": {
					    "channelCode": "qtb_h5",
					    "deptCode": this.$route.query.cmpCode,
					    "oprCode": this.$store.state.userId,
					    "prodCode": this.$route.query.prodCode
				  	},
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
				  	"opt": "MAIN,CVRG",
				  	"pkgNo": this.$route.query.orderNo,
				  	"mark":"CALC",
				  	"cvrgReq": [
						{
						    "amnt": this.amnt,
						    "cvrgCode": this.cvrgCode,
						    "cvrgName": this.cvrgName,
						    "cvrgType": this.cvrgType,
						    "cvrgNo": this.cvrgNo,
						    "payNo": this.payNo,//交费期间编码 
						    "payFlag": this.payFlag,
						    "insuNo": this.insuNo,//保险期间编码 
						    "insuFlag": this.insuFlag,
						    "prem": this.minPrice,
						    "freqyNo":freqyNo
						}
				  	],
					"mainReq": {
					    "agentCode": this.brokerCode,
					    "oprCode": this.$store.state.userId,
					    "amnt": this.amnt,
					    "deptCode": this.$route.query.cmpCode,
					    "deptName": this.cmpName,
					    "prem": this.minPrice,
					    "prodName": this.cvrgName,
					    "prodCode": this.$route.query.prodCode,
					    "province":this.provinceType,
					    "city": this.cityType,
					    "county": this.countyType,
					    "sumAmnt": this.amnt,
					    "sumPrem": this.minPrice,
					    "firstPremium": this.minPrice,
					    "freqyNo":freqyNo
					}
				}
	  			console.log(JSON.stringify(saveinfo))
	  			this.$http.post(this.$store.state.link+'/trd/order/v1/saveorder', saveinfo)
				.then(res =>{
				    console.log(res.data);
					let dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.$router.push('/popupInfo2?prodCode='+this.$route.query.prodCode+'&prodNo='+this.$route.query.prodNo+'&orderNo='+this.$route.query.orderNo+'&cmpCode='+this.$route.query.cmpCode+'&up=cvrgInfo')
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
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.popupConBox {
		width: 100%;
		min-height: 100%;
		position: absolute;
		display: flex;
	    -webkit-box-orient: vertical;
	    -webkit-box-direction: normal;
	    -ms-flex-direction: column;
	    flex-direction: column;
		background: #F3F3F3;
	}
	.popupConW {
		-webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	}
	.popupCon {
		width: 6.7rem;
		padding: 0 0.4rem;
		background: #FFFFFF;
	}
	.popupCon1 {
		width: 6.7rem;
		padding: 0 0.4rem;
		margin-top: 0.4rem;
		background: #FFFFFF;
	}
	.popupCon .inputGrop:last-child {
		border: none;
	}
	.popupCon1 .inputGrop:last-child {
		border: none;
	}
	.popupCon2 {
		margin-bottom: 1rem;
	}
	.popupP {
		position: relative;
	    margin-bottom: 0.64rem;
	    text-align: center;
	}
	.inputGrop {
		position: relative;
		height: 0.88rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputLabel {
		display: inline-block;
		float: left;
		width: 2.04rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
	}
	.inputText {
		float: left;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
	}
	select {
		padding: 0;
		margin: 0;
		padding-right: 0.48rem;
		border: none;
		background: none;
		background: url(/static/upDown.png) no-repeat right center;
		background-size: 0.4rem 0.45rem;
		outline: none;
		appearance: none;
		-webkit-appearance:none;
		-moz-appearance:none;
	}
	.width3 {
		width: 4.66rem;
	}
	.title_twoCon {
		height: 1.11rem;
		line-height: 1.11rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.titleLable_twoCon {
		display: inline-block;
		font-size: 0.34rem;
		font-weight: bold;
		color: #222222;
	}
	.inputGrop1 {
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputselectP {
		height: 0.68rem;
	}
	.inputLabel1 {
		height: 0.68rem;
		line-height: 0.68rem;
	}
	.inputText1 {
		display: block;
		float: left;
		width: 3.6rem;
		height: 0.68rem;
		font-size: 0.28rem;
		color: #666666;
	}
	.inputWidth {
		width: 4.66rem;
	}
	.inputselect {
		height: 0.68rem;
	}
	.dateInput {
		width: 4.66rem;
	}
	.upDownImg {
		width: 0.4rem;
		height: 0.44rem;
		margin-top: 0.2rem;
	}
	.dateB {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 1;/*下箭头隐藏变1*/
		width: 0.5rem;
		height: 0.87rem;
		background: #FFFFFF;
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
	.inputSpan {
		display: inline-block;
		line-height: 0.88rem;
	}
	.btn {
		display: inline-block;
	    width: 6.04rem;
		height: 0.88rem;
		line-height: 0.88rem;
		border: 0.02rem solid #EB7760;
		box-shadow: inset 0 0.01rem 0.03rem 0 rgba(255,255,255,0.50);
		border-radius: 0.5rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
	}
</style>