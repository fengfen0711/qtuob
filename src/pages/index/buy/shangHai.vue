<template>
	<div class="popup" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="popupBg" v-show="popShow" @click="handleClickPopHide"></div>
		<div class="popupCon" v-show="popShow">
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
				<select class="inputText width3" v-model="amountForceId" @change="amountForceChange">
					<option v-for="amountForce in amountForces" :value="amountForce.id">{{amountForce.des}}</option>
				</select>
			</p>
		</div>
		<div class="iconBox">
		  	<div class="figure" id="tab1">
		    	保费：<span class="price">&yen;<span>{{minPrice}}</span>起</span>
		  	</div>
		  	<div class="figure figure2" id="tab2" @click="handleClickGoPopInfo">
		    	马上购买	    	
		  	</div>
		</div>
	</div>
</template>
	
<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	import { MessageBox } from 'mint-ui'
	export default {
	  	name: 'Popup',
	  	props:['prodNo','saleStatus','unSaleDes'],
	  	data(){
	  		return {
	  			minPrice:'',
	  			popShow:false,
	  			birthDate:'',
	  			birthDateShow:true,
	  			insuRmkCode:[],//保险id+type
	  			insuRmkId:'',//保险id
	  			insuRmkType:'',//保险期间类型
	  			insuRmkList:[],//保险期间
	  			sexShow:true,
	  			sex:'',	  			
	  			periodCode:[],//缴费id+type
	  			periodId:'',//缴费id
	  			periodType:'',//缴费期间类型
	  			periods:[],//缴费期间
	  			amountForceId:'',//保额id
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
			  	cvrgCode:'',//主险code
			  	cvrgName:'',//主险name
			  	cvrgType:'',//主险类型
			  	age:'',
			  	prodCode:this.$route.query.prodCode,
			  	brokerCode:'0101500030',
			  	brokeName:'',
			  	cmpCode:'',
			  	cmpName:'',
			  	orderNo:'',
			  	provinceType:'',
	  			provinceList:[],
	  			cityType:'',
	  			cityList:[],
	  			countyType:'',
	  			countyList:[],
	  		}
	  	},
	  	created(){
	  		this.amountForceId = this.amountForces[0].id;
	  		
			//18岁生日
			var myDate = new Date();
			var day =myDate.getDate();
			if(myDate.getMonth()<10){
				var month = "0"+(myDate.getMonth()+1); 
			}				
			if(myDate.getDate()<10){
			 	day = "0"+myDate.getDate(); 
			}
			var datew = (myDate.getFullYear()-18)+"-"+month+"-"+day;
			var datew = datew.toString();
			if (this.birthDate == "") {
  				this.birthDate = datew;
  			}
			if(this.prodCode == "P000303010194") {
				this.cvrgInfoAjax()
			}
	  	},
	  	methods:{
	  		cvrgInfoAjax(){
	  			var cvrgInfo={
				  	"cvrgExtType": "3",
				  	"prodCode": this.prodCode
				}
		  		Indicator.open();
		  		this.$http.post(this.$store.state.link+'/prd/cvrg/cvrglist', cvrgInfo)
				.then(res =>{
//				    console.log(res.data);
				    Indicator.close();
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.minPrice = res.data.output[0].minPrem
						this.insuRmkList = res.data.output[0].insuPeriodList
						this.periods = res.data.output[0].payPeriodList
						this.cvrgCode = res.data.output[0].cvrgCode
						this.cvrgName = res.data.output[0].cvrgName
						this.cvrgType = res.data.output[0].cvrgType
						this.cvrgNo = res.data.output[0].cvrgNo
						this.cmpCode = res.data.output[0].cmpCode
						this.$store.dispatch("changeSCoding",this.cmpCode)
						this.cmpName = res.data.output[0].cmpName
						//缴费期间
		  				this.periodCode = [this.periods[0].payNo,this.periods[0].payFlag];
		  				this.periodId = this.periods[0].payNo;
		  				this.periodType = this.periods[0].payFlag;
						//保险期间
						this.insuRmkCode = [this.insuRmkList[0].insuNo,this.insuRmkList[0].insuFlag];
						this.insuRmkId = this.insuRmkList[0].insuNo;
						this.insuRmkType = this.insuRmkList[0].insuFlag;
						//投保地区
						this.pro()
					}else{
						Toast(res.data.desc);
					}
				},res =>{
					Indicator.close();
					console.log(res.data);
				})
	  		},
    		pro(){
    			var provinceinfo = {
  					"code": "0",
  					"orgCode": this.cmpCode
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
					}
				},res =>{
					console.log(res.data);
				})
    		},
    		city(){
    			var cityinfo = {
    				"code": this.provinceType,
  					"orgCode": this.cmpCode
				}
				this.$http.post(this.$store.state.link+'/dic/findChinaByOrgCode', cityinfo)
				.then(res =>{
//				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
							this.cityList = res.data.output
							this.cityType = this.cityList[0].cnCode;
							this.handleClickPopup()
							this.coun()
					}else{
						Toast(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
    		},
    		coun(){
    			var countyinfo = {
    				"code": this.cityType,
  					"orgCode": this.cmpCode
				}
//				console.log(countyinfo)
				this.$http.post(this.$store.state.link+'/dic/findChinaByOrgCode', countyinfo)
				.then(res =>{
//				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
							this.countyList = res.data.output
							this.countyType = this.countyList[0].cnCode;
					}else{
						Toast(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
    		},
    		provinceChange(){
    			console.log(this.provinceType)
    			this.city()
    		},
    		cityChange(){
    			console.log(this.cityType)
    			this.handleClickPopup()
    			this.coun()
    		},
    		countyChange(){
    			console.log(this.countyType)
    		},
	  		MsexChose(){
	  			this.sexShow = false;
	  			this.handleClickPopup()
	  		},
	  		FsexChose(){
	  			this.sexShow = true;
	  			this.handleClickPopup()
	  		},
	  		handleClickPopHide(){
	  			this.popShow = false;
	  		},
	  		periodChange(){
                console.log(this.periodCode)
                this.periodId = this.periodCode[0];
		  		this.periodType = this.periodCode[1];
                this.handleClickPopup()
	  		},
	  		amountForceChange(){
                console.log(this.amountForceId)
                this.handleClickPopup()
	  		},
	  		insuRmkChange(){
                console.log(this.insuRmkCode)
                this.insuRmkId = this.insuRmkCode[0];
				this.insuRmkType = this.insuRmkCode[1];
                this.handleClickPopup()
	  		},
	  		ageCh(){
	  			this.birthDateShow = false;
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
	  		handleClickPopup(a){
	  			//sex
				if (this.sexShow == true) {
					this.sex = "F"
				}else{
					this.sex = "M"
				}
  				this.age = this.jsGetAge(this.birthDate)
  				if (this.age >= 18 && this.age <= 50) {
  					var popIfo = {
					  	"list": [
						    {
						    	"age": this.age,
						      	"birthDays": this.birthDate,
						      	"coverage": this.amountForceId,
						      	"cvrgCode": this.cvrgCode,
						      	"cvrgName": this.cvrgName,
						      	"city": this.cityType,
						      	"prodId": this.prodCode,
						      	"safeGuard": this.insuRmkId,
						      	"sex": this.sex,
						      	"year": this.periodId
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
							if (this.popShow == true && a == "1") {
	  							this.createorderAjax()
							}
						}else{
							Toast(res.data.desc);
						}
					},res =>{
						Toast(res.data);
					})
  				}else{
  					Toast("投保年龄18-50岁，请重新选择出生日期~");
  				}
	  		},
	  		insureruleAjax(){
  				var insureruleInfo = {
					"prodCode": this.prodCode,
					"token": this.$store.state.token,
					"userId": this.$store.state.userId
				}
  				console.log(JSON.stringify(insureruleInfo))
	  			this.$http.post(this.$store.state.link+'/trd/agent/v1/insurerule', insureruleInfo)
				.then(res =>{
					console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						if (res.data.output[0].type=="0") {
							this.isOrderAjax()
						}
					}else{
						Toast(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
	  		},
	  		isOrderAjax(){
	  			var isOrderInfo = {
				  	"head": {
					    "channelCode": "qtb_h5",
					    "deptCode": this.cmpCode,
					    "oprCode": this.$store.state.userId,
					    "prodCode": this.prodCode
				  	},
					"token": this.$store.state.token,
					"userId": this.$store.state.userId
				}
//				console.log(isOrderInfo)
	  			this.$http.post(this.$store.state.link+'/trd/order/v1/checkpkg', isOrderInfo)
				.then(res =>{
				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						if (res.data.output.orderCount == 0) {
							this.popShow = true;
							this.handleClickPopup()
						}else if (res.data.output.orderCount == 1) {
							MessageBox.confirm('',{
							  	title: '温馨提示',
							  	message: '你有一笔未完成订单，要前往完善信息吗？',
							  	confirmButtonText: '立即前往',
							  	showCancelButton: true
							}).then(action => {
								if (action == 'confirm') {
									this.orderNo = res.data.output.orderList[0].pkgNo
									this.$router.push('/popupInfo1?prodCode='+this.prodCode+'&prodNo='+this.prodNo+'&orderNo='+this.orderNo+'&cmpCode='+this.cmpCode)
								}
							}).catch(err => {
								if (err == 'cancel') {
	  								this.popShow = true;
									this.handleClickPopup()
								}
							})
						}else if (res.data.output.orderCount > 1) {
							MessageBox.confirm('',{
							  	title: '温馨提示',
							  	message: '你有多笔未完成订单，要前往我的订单完善信息吗？',
							  	confirmButtonText: '立即前往', 
								cancelButtonText: '取消', 
							  	showCancelButton: true
							}).then(action => {
								this.$router.push('/mylifeOrder')
							}).catch(err => {
								this.popShow = true;
								this.handleClickPopup()
							})
						}
					}else{
						Toast(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
	  		},
	  		createorderAjax(){
	  			var orderNoInfo = {
				  	"head": {
					    "channelCode": "qtb_h5",
					    "deptCode": this.cmpCode,
					    "oprCode": this.$store.state.userId,
					    "prodCode": this.prodCode
				  	},
					"token": this.$store.state.token,
					"userId": this.$store.state.userId
				}
  				console.log(orderNoInfo)
	  			this.$http.post(this.$store.state.link+'/trd/order/v1/createorder', orderNoInfo)
				.then(res =>{
				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.orderNo = res.data.output
						this.saveInfoAjax()
					}else{
						Toast(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
	  		},
	  		handleClickGoPopInfo(){
	  			if(this.saleStatus == 1){
	  				if (this.popShow == false) {
		  				this.insureruleAjax()
		  			}else{
		  				this.handleClickPopup(1)
		  			}
	  			}
	  			else if(this.saleStatus == 0){
	  				MessageBox.confirm('',{
					  	title: '温馨提示',
					  	message: this.unSaleDes,
					  	confirmButtonText: '确定',
					  	showCancelButton: false
					}).then(action => {
						
					})
	  			}
		  			
	  		},
	  		saveInfoAjax(){
	  			let freqyNo = "B"
	  			if (this.periodId == "B1") {
	  				freqyNo = "A"
	  			}
	  			var saveinfo = {
					"head": {
					    "channelCode": "qtb_h5",
					    "deptCode": this.cmpCode,
					    "oprCode": this.$store.state.userId,
					    "prodCode": this.prodCode
					},
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
				  	"opt": "MAIN,CVRG",
				  	"pkgNo": this.orderNo,//订单号
				  	"mark":"CALC",
				  	"cvrgReq": [
						{
						    "amnt": this.amountForceId,
						    "cvrgCode": this.cvrgCode,
						    "cvrgName": this.cvrgName,
						    "cvrgType": this.cvrgType,
						    "cvrgNo": this.cvrgNo,
						    "payNo": this.periodId,//交费期间编码 
						    "payFlag": this.periodType,
						    "insuNo": this.insuRmkId,//保险期间编码 
						    "insuFlag": this.insuRmkType,
						    "prem": this.minPrice,
						    "freqyNo":freqyNo
						}
				  	],
					"mainReq": {
					    "agentCode": this.brokerCode,
					    "oprCode": this.$store.state.userId,
					    "amnt": this.amountForceId,
					    "deptCode": this.cmpCode,
					    "deptName": this.cmpName,
					    "prem": this.minPrice,
					    "prodName": this.cvrgName,
					    "prodCode": this.prodCode,
					    "province":this.provinceType,
					    "city": this.cityType,
					    "county": this.countyType,
					    "sumAmnt": this.amountForceId,
					    "sumPrem": this.minPrice,
					    "firstPremium": this.minPrice,
					    "freqyNo":freqyNo
					}
				}
	  			let insrntReqInfo = {
	  				"age": this.age,
				    "birthday": this.birthDate,
				    "gender": this.sex,
	  			}
	  			console.log(JSON.stringify(saveinfo))
	  			this.$http.post(this.$store.state.link+'/trd/order/v1/saveorder', saveinfo)
				.then(res =>{
				    console.log(res.data);
					let dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.$store.dispatch("changeInsrntReqInfo",insrntReqInfo)
						this.$router.push('/popupInfo1?prodCode='+this.prodCode+'&prodNo='+this.prodNo+'&orderNo='+this.orderNo+'&cmpCode='+this.cmpCode)
					}else{
						Toast(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
	  		}
	  	},
	  	watch:{
	  		prodNo:function(val){
//	  			console.log(val)
		    	this.prodNo = val
//		    	console.log(this.prodNo)
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
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.popupBg {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.2);
	}
	.popupCon {
		position: fixed;
		bottom: 1.06rem;
		left: 0;
		z-index: 2;
		width: 6.9rem;
		padding: 0 0.3rem;
		background: #FFFFFF;
	}
	.inputGrop {
		position: relative;
		height: 0.88rem;
		overflow: hidden;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.popupCon .inputGrop:last-child {
		border: none;
	}
	.inputLabel {
		float: left;
		width: 2.5rem;
		margin-left: 0.1rem;				
		line-height: 0.88rem;
		font-size: 0.32rem;
		color: #333333;
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
	.inputText {
		float: left;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
	}
	.inputSpan {
		display: inline-block;
		line-height: 0.88rem;
	}
	.inputSpan2 {
		padding-left: 0.1rem;
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
		width: 4.3rem;
	}
	.iconBox {
		display: flex;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		width: 100%;
		height: 1.06rem;
		line-height: 1.06rem;
		border-top: solid 0.01rem #C8C7CC;
		background: #FFFFFF;
	}
	.figure {
		flex: 1;
		font-size: 0.36rem;
		color: #222222;		
		text-align: center;
	}
	.figure2 {
		font-size: 0.36rem;
		color: #FFFFFF;
		background: #E7A128;
	}
	.price {
		color: #EB6069;
	}
	.upDownImg {
		width: 0.4rem;
		height: 0.44rem;
		margin-top: 0.2rem;
	}
	.dateInput {
		width: 4.3rem;
	}
	.upDownImg1 {
		position: absolute;
		right: 0;
		top: 0.2rem;
		z-index: -1;
		width: 0.4rem;
		height: 0.44rem;
	}
	.dateB {
		position: absolute;
		right: 0;
		top: 0rem;
		z-index: 1;/*下箭头隐藏变1*/
		width: 0.5rem;
		height: 0.88rem;
		background: #FFFFFF;
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
		width: 4.3rem;
	}
	.inputselect {
		height: 0.68rem;
	}
</style>