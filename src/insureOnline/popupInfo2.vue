<template>
	<div class="one" :class="{addBoxF:!boxShow}" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div v-show="!boxShow" @click="addBoxChange" class="addBox">
			<UserList @child_userList="childUserListSay"></UserList>
		</div>
		<div>
			<div class="oneTitle">
				<img src="/static/ranch2.png" class="ranchImg" />
				<p class="oneTitleText clearFloat">
					<span class="oneTitleTextSpan1 left selected">投保告知</span>
					<span class="oneTitleTextSpan2 left selected">投保信息</span>
					<span class="oneTitleTextSpan3 right">订单核对</span>
				</p>
			</div>
			<div class="twoCon">
				<p class="title_twoCon clearFloat" :class="{borderNone:!policyHolderShow}">
					<label class="titleLable_twoCon left">投保人信息</label>
					<img src="/static/leftImg.png" class="btnImg right" v-show="!policyHolderShow" @click="policyHolderShowHide"/>
					<img src="/static/downImg.png" class="btnImg right" v-show="policyHolderShow" @click="policyHolderShowHide"/>
				</p>
				<div class="policyHolder" v-show="policyHolderShow">
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">姓名</label>
						<input type="text" class="inputText inputWidth left" maxlength="10" v-model="policyHolderName" placeholder="请输入真实姓名" />
						<span class="sumBtn" @click="goSub">+</span>
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
						<input type="date" id="dateTime" :class="{opa0:!dateInput}" class="inputText dateInput left" placeholder="请选择证件有效期" v-model="termValidityDate" @change="termValidityDateSel" />
						<span class="dateBox" @click="dateSel">
							<img src="/static/sexNo.png" class="selImg" v-show="termValidityDateShow" />
							<img src="/static/selected.png" class="selImg" v-show="!termValidityDateShow" />
							<span>长期</span>
						</span>
						<label class="dateB" for="dateTime">
							<img src="/static/upDown.png" class="upDownImg3" />
						</label>
					</p>
					<p class="inputGrop inputGrop2 clearFloat">
						<label class="inputLabel left">出生日期</label>
						<span class="inputText dateInput left inputSpan2" :class="{opa0:dateInputBirth,opa1:dateInputBirth1}">请选择出生日期</span>
						<input type="date" id="dateTimeBirth" :class="{opa0:!dateInputBirth}" class="inputText dateInput left" v-model="birthDate" placeholder="请选择出生日期" @change="birthDateSel"/>
						<label class="dateB" for="dateTimeBirth">
							<img src="/static/upDown.png" class="upDownImg3" />
						</label>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">投保人性别</label>
						<span class="inputText inputSpan1 left">
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
						<label class="inputLabel left">手机号码</label>
						<input type="tel" maxlength="11" class="inputText inputWidth left" v-model="phone" placeholder="请输入手机号码" @input="phoneChange"/>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">邮箱</label>
						<input type="text" class="inputText inputWidth left" v-model="email" placeholder="请输入接收电子保单的邮箱地址" @blur="emailTest" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">职业大类</label>
						<select class="inputText inputWidth left" v-model="tbigType" @change="tbigChange">
							<option :value="tbig.plCode" v-for="tbig in tbigList" >{{tbig.plName}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">职业中类</label>
						<select class="inputText inputWidth left" v-model="tmiddleType" @change="tmiddleChange">
							<option :value="tmiddle.plCode" v-for="tmiddle in tmiddleList" >{{tmiddle.plName}}</option>
						</select>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">职业小类</label>
						<select class="inputText inputWidth left" v-model="tlittleTypeBox" @change="tlittleChange">
							<option :value="[tlittle.plCode,tlittle.plLevel]" v-for="tlittle in tlittleList" >{{tlittle.plName}}</option>
						</select>
					</p>
					<div class="inputGrop1 clearFloat">
						<p class="inputselectP clearFloat ">
							<label class="inputLabel inputLabel1 left">联系地址</label>
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
							<select class="inputText1 inputWidth left" v-model="countyType">
								<option :value="county.cnCode" v-for="county in countyList" >{{county.cnName}}</option>
							</select>
						</p>
					</div>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">详细地址</label>
						<input type="text" class="inputText inputWidth left" v-model="add" placeholder="请输入详细地址" />
					</p>
				</div>
			</div>
			<div class="twoCon twoCon1">
				<p class="title_twoCon clearFloat" :class="{borderNone:!recognizeeShow}">
					<label class="titleLable_twoCon left">被保险人信息</label>
					<img src="/static/leftImg.png" class="btnImg right" v-show="!recognizeeShow" @click="recognizeeShowHide"/>
					<img src="/static/downImg.png" class="btnImg right" v-show="recognizeeShow" @click="recognizeeShowHide"/>
				</p>
				<div class="recognizee" v-show="recognizeeShow">
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">与投保人关系</label>
						<span v-model="nexusType" class="left inputSpan1 inputWidth">{{nexus}}</span>
					</p>
				</div>
			</div>
			<div class="twoCon">
				<div class="twoCon2" :class="{borderNone:childShow}">
					<p class="title_twoCon">
						<label class="titleLable_twoCon">受益人类型</label>
					</p>
					<p class="inputGrop">
						<span class="clearFloat" @click="pushBoxHide">
							<img src="/static/img/noSelected.png" class="btnImg1 left" v-show="!childShow"/>
							<img src="/static/img/selected.png" class="btnImg1 left" v-show="childShow"/>
							<label class="inputText inputSpan left">法定受益人</label>
						</span>
					</p>
					<p class="inputGrop">
						<span class="clearFloat" @click="pushBoxShow">
							<img src="/static/img/noSelected.png" class="btnImg1 left" v-show="childShow"/>
							<img src="/static/img/selected.png" class="btnImg1 left" v-show="!childShow"/>
							<label class="inputText inputSpan left">自定义受益人</label>
						</span>
					</p>
				</div>
			</div>
			<Beneficiary ref="getBen" @child_saya="listenToMyChild" v-show="!childShow" :beneficiaryList="[ben.id,ben.index,benList[ben.index]]" @deletId="deletBen" v-for="ben in beneficiaryList" :key="ben.index"></Beneficiary>
			<p class="pushBox" v-show="!pushBtnShow">
				<span @click="addBeneficiary" class="pushBtn">添加受益人</span>
			</p>
			<RenewalPay ref="getPay" @child_paySay="listenToMyPay" v-show="RenewalPayShow" :payList="[payList1,policyHolderName,cmpCode]"></RenewalPay>
			<p class="btnBox" :class="{btnBox1:btnBoxShow}">
				<span class="btn btn1" @click="handleClickUp">上一步</span>
				<span class="btn" @click="goNext">下一步</span>
			</p>
		</div>
	</div>
</template>

<script>
	import UserList from './userList.vue'
	import Beneficiary from './beneficiary.vue'
	import RenewalPay from './renewalPay.vue'
	import { Toast } from 'mint-ui'
	import { MessageBox } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
    	name: "PopupInfo2",  
    	data () {
      		return {
      			btnBoxShow:false,
      			policyHolderShow:true,
	  			sexShow:true,
      			custGender:'',
      			cardType:'0',
	  			policyHolderName:'',
	  			IDnum:'',
	  			termValidityDateShow:true,
	  			termValidityDate:'',
	  			termValidityDate1:'',
	  			age:'',
	  			birthDate:'',
	  			phone:'',
	  			email:'',
	  			add:'',
	  			recognizeeShow:true,
	  			meShow:true,
	  			resexShow:true,
	  			recustGender:'',
	  			nexusType:'00',
	  			nexus:'本人',
	  			provinceType:'',
	  			provinceList:[],
	  			cityType:'',
	  			cityList:[],
	  			countyType:'',
	  			countyList:[],
	  			tbigType:'',
	  			tbigList:[],
	  			tmiddleType:'',
	  			tmiddleList:[],
	  			tlittleTypeBox:'',
	  			tlittleType:'',
	  			tlittleList:[],
	  			tplLevel:'',
	  			childShow:true,
	  			pushBtnShow:true,
	  			beneficiaryList:[],
	  			deletId:'',
	  			RenewalPayShow:false,
	  			benList:[],
	  			payInfo:{},
	  			amnt:'',
	  			cvrgCode:'',//主险code
			  	cvrgName:'',//主险name
			  	cvrgType:'',//主险类型
			  	cvrgNo:'',
			  	freqyNo:'',
			  	insuFlag:'',
			  	insuNo:'',
			  	payFlag:'',
			  	payNo:'',
			  	deptName:'',
			  	minPrice:'',
			  	lowFlag:'A',
			  	certfEnduringFlag:'N',
			  	payList1:[],
			  	payBlur:false,
			  	allData:{},
			  	benCity:'',
			  	dateInput:false,
			  	dateInputBirth:false,
			  	dateInputBirth1:false,
			  	cmpCode:this.$route.query.cmpCode,
			  	boxShow:true,
			  	code:"",
			  	sexBlur:true,
			  	provinceType1:'',
			  	cityType1:'',
			  	countyType1:'',
			  	IDtrue:false,
      		}
    	},
	  	components:{
    		Beneficiary : Beneficiary,
    		RenewalPay : RenewalPay,
    		UserList : UserList,
    	},
    	created(){
    		this.pro()
    		this.big()
    		this.OrderInfoAjax()
    	},
    	methods:{
    		GetDateStr(AddDayCount) { 
				var dd = new Date(); 
				dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
				var y = dd.getFullYear();
				var m = dd.getMonth()+1;//获取当前月份的日期 
				var d = dd.getDate(); 
				if(dd.getMonth()<10){
					m = "0"+(dd.getMonth()+1); 
				}				
				if(dd.getDate()<10){
				 	d = "0"+dd.getDate();
				}
				return y+"-"+m+"-"+d; 
			},
    		goSub(){
				this.boxShow = false
    		},
    		etInformation() {
				var data = {
					"custId": this.code,
					"token": this.$store.state.token,
					"userId": this.$store.state.userId
				}
//				console.log(data)
				this.$http.post(this.$store.state.link + "/cut/cut/queryCustInfo", data).then(response => {
					console.log(response.data)
					if(response.data.code == "SYS_S_000"){
						if(response.data.output.custName != undefined){
							this.policyHolderName = response.data.output.custName
						}else{
							this.policyHolderName = ""
						}
						if(response.data.output.custIdNo != undefined && response.data.output.custIdNo != "" && response.data.output.custCertiType == "0"){
							this.IDnum = response.data.output.custIdNo
							this.dateInputBirth = true
							this.dateInputBirth1 = true
							this.sexBlur = false
							this.IDtrue = true
							this.cardnum(1)
						}else{
							this.IDnum = ""
							this.IDtrue = false
							this.dateInputBirth1 = false
							this.sexBlur = true
							if(response.data.output.custBirthday != undefined){
								this.birthDate = response.data.output.custBirthday
								this.age = this.jsGetAge(this.birthDate)
								this.dateInputBirth = true
							}else{
								this.birthDate = ""
								this.dateInputBirth = false
								this.age = ""
							}
							if(response.data.output.custGender == "M") {
								this.custGender = "M"
						  		this.sexShow = false
							}else{
								this.custGender = "F"
					  			this.sexShow = true
					  		}
						}
						if(response.data.output.custMobile != undefined){
							this.phone = response.data.output.custMobile
						}else{
							this.phone = ""
						}
						if(response.data.output.custEmail != undefined){
							this.email = response.data.output.custEmail
						}else{
							this.email = ""
						}
					}
				}, response => {
					console.log("ajax error");
				});
			},
    		MsexChose(){
    			if(this.sexBlur==true){
    				this.sexShow = false;
	  				this.custGender = "M";
    			}
	  		},
	  		FsexChose(){
	  			if(this.sexBlur==true){
		  			this.sexShow = true;
		  			this.custGender = "F";
	  			}
	  		},
    		deletBen(...data){
    			this.deletId = data
//  			console.log(this.deletId)
    			for (let a = 0; a < this.beneficiaryList.length; a++) {
    				if (this.beneficiaryList[a].index == this.deletId) {
    					this.beneficiaryList.splice(a,1)
    					this.benList.splice(a,1)
    				}
    			}
    			if (this.beneficiaryList.length < 3) {
    				this.pushBtnShow =false
    			}
    		},
    		addBeneficiary(){
    			if(this.beneficiaryList.length==0){
    				this.beneficiaryList.push({"id":"Y","index":this.beneficiaryList.length})
    			}else{
    				this.beneficiaryList.push({"id":"N","index":this.beneficiaryList.length})
    				if(this.beneficiaryList.length==3){
    					this.pushBtnShow =true
    				}
    			}
    		},
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
				  	"opt": "MAIN,CVRG,APPL,INSRNT,BNF,PAYSH",
				  	"pkgNo": this.$route.query.orderNo
				}
				this.$http.post(this.$store.state.link+'/trd/order/v1/queryorder', OrderInfo)
				.then(res =>{
				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.allData = res.data.output
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
    		},
    		allDataVal(allData){
    			this.brokerCode = allData.mainResp.agentCode
				if (allData.cvrgResp[0].payNo == "B1") {
					this.RenewalPayShow = false
				}else{
//					console.log(allData.payment)
					if (allData.payment != undefined) {
						this.payInfo = allData.payment
						this.payList1.push(this.payInfo)							
						this.RenewalPayShow = true
					}
				}
				this.amnt = allData.cvrgResp[0].amnt
	  			this.cvrgCode = allData.cvrgResp[0].cvrgCode
			  	this.cvrgName = allData.cvrgResp[0].cvrgName
			  	this.cvrgType = allData.cvrgResp[0].cvrgType
			  	this.cvrgNo = allData.cvrgResp[0].cvrgNo
			  	this.freqyNo = allData.cvrgResp[0].freqyNo
			  	this.insuFlag = allData.cvrgResp[0].insuFlag
			  	this.insuNo = allData.cvrgResp[0].insuNo
			  	this.payFlag = allData.cvrgResp[0].payFlag
			  	this.payNo = allData.cvrgResp[0].payNo
			  	this.deptName = allData.mainResp.deptName
			  	this.provinceType1 = allData.mainResp.province
			  	this.cityType1 = allData.mainResp.city
			  	this.countyType1 = allData.mainResp.county
			  	//投保人信息
			  	if (allData.applntResp.address) {
			  		this.custGender = allData.applntResp.gender
			  		if (this.custGender == "M") {
			  			this.sexShow = false
			  		}else{
			  			this.sexShow = true
			  		}
		  			this.cardType = allData.applntResp.certfType
	      			this.IDnum = allData.applntResp.certfCode
					this.dateInputBirth1 = true
					this.sexBlur = false
	      			this.IDtrue = true
	      			this.policyHolderName = allData.applntResp.applName
	      			this.certfEnduringFlag = allData.applntResp.certfEnduringFlag
	      			if (this.certfEnduringFlag == "N") {
	      				this.termValidityDateShow = true
	    				this.termValidityDate = allData.applntResp.certfEndTime
	    				this.termValidityDate1 = allData.applntResp.certfEndTime
	    				this.dateInput = true
	    			}else{
	    				this.termValidityDateShow = false
	    				this.termValidityDate = ""
	    				this.termValidityDate1 = "9999-01-01"
	    				this.dateInput = false
	    			}
	      			this.age = allData.applntResp.age
	      			this.birthDate = allData.applntResp.birthday
	      			this.dateInputBirth = true
	      			this.phone = allData.applntResp.mobile
	      			this.email = allData.applntResp.email
	      			this.add = allData.applntResp.address
	      			this.provinceType = allData.applntResp.province
	      			this.cityType = allData.applntResp.city
	      			this.countyType = allData.applntResp.county
					for (let i=0;i<this.provinceList.length;i++) {
	      				if (this.provinceType == this.provinceList[i].cnCode) {
	      					this.provinceType = this.provinceList[i].cnCode
	      					this.city()
	      				}
	      			}
	      			this.tbigType = allData.applntResp.occTypeNo
	      			this.tmiddleType = allData.applntResp.occDetailTypeNo
	      			this.tlittleType = allData.applntResp.occNo
	      			this.tplLevel = allData.applntResp.occCate
	      			for (let i=0;i<this.tbigList.length;i++) {
	      				if (this.tbigType == this.tbigList[i].plCode) {
	      					this.tbigType = this.tbigList[i].plCode
	      					this.tmiddle()
	      				}
	      			}
	      			//被保人信息
			  		this.nexusType = allData.insrntResp.relaToAppnt
			  		if (this.nexusType == "00") {
			  			this.nexus = "本人"
			  		}
			  	}else{
			  		this.age = this.$store.state.insrntReqInfo.age
		  			this.birthDate = this.$store.state.insrntReqInfo.birthday
		  			this.dateInputBirth = true
		  			this.custGender = this.$store.state.insrntReqInfo.gender
		  			if (this.custGender == "M") {
			  			this.sexShow = false
			  		}else{
			  			this.sexShow = true
			  		}
			  	}
				//受益人
				if (allData.bnfResp.length > 0) {
					this.childShow = false
					if (this.childShow == false) {
						this.lowFlag = "B"
					}else{
						this.lowFlag = "A"
					}
					if (allData.bnfResp.length < 3) {
						this.pushBtnShow = false
					}
					if(allData.bnfResp.length > 0){
						this.benList = allData.bnfResp
					}
					for (var i=0; i< this.benList.length; i++) {
						if (i==0) {
							this.beneficiaryList.push({"id":"Y","index":i})
						}else{
							this.beneficiaryList.push({"id":"N","index":i})
						}
					}
				}
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
												this.custGender = "M"
												this.sexShow = false
											} else {
												this.custGender = "F"
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
						if(this.allData.applntResp && this.allData.applntResp.occDetailTypeNo){
							
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
						if(this.allData.applntResp && this.allData.applntResp.occDetailTypeNo){
							
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
    		big(){
    			var biginfo = {
    				"code": "0",
  					"orgCode": this.$route.query.cmpCode
				}
				this.$http.post(this.$store.state.link+'/dic/findProfessionalByOrgCode', biginfo)
				.then(res =>{
//				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.tbigList = res.data.output
						this.tbigType = this.tbigList[0].plCode;
						this.tmiddle()
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc)
					}
				},res =>{
					console.log(res.data);
				})
    		},
    		tmiddle(){
    			var tmiddleinfo = {
				  	"code": this.tbigType,
  					"orgCode": this.$route.query.cmpCode
				}
				this.$http.post(this.$store.state.link+'/dic/findProfessionalByOrgCode', tmiddleinfo)
				.then(res =>{
//				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.tmiddleList = res.data.output
						if(this.allData.applntResp && this.allData.applntResp.occDetailTypeNo){
							
						}else{
							this.tmiddleType = ""
						}
						if(this.tmiddleType == ""){
							this.tmiddleType = this.tmiddleList[0].plCode;
							this.tlittleType = ""
							this.tlittle()
						}else{
							for (var i=0; i <this.tmiddleList.length; i++) {
			      				if (this.tmiddleType == this.tmiddleList[i].plCode) {
			      					this.tmiddleType = this.tmiddleList[i].plCode
			      					this.tlittle()
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
    		tlittle(){
    			var tlittleinfo = {
				  	"code": this.tmiddleType,
				  	"orgCode": this.$route.query.cmpCode
				}
				this.$http.post(this.$store.state.link+'/dic/findProfessionalByOrgCode', tlittleinfo)
				.then(res =>{
//				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						this.tlittleList = res.data.output
						if(this.allData.applntResp && this.allData.applntResp.occDetailTypeNo){
							
						}else{
							this.tlittleType = ""
						}
						if(this.tlittleType == ""){
							this.tlittleTypeBox = [this.tlittleList[0].plCode,this.tlittleList[0].plLevel];
							this.tplLevel = this.tlittleList[0].plLevel;
							this.tlittleType = this.tlittleList[0].plCode;
						}else{
							for (let i=0;i<this.tlittleList.length;i++) {
			      				if (this.tlittleType == this.tlittleList[i].plCode) {
			      					this.tlittleTypeBox = [this.tlittleList[i].plCode,this.tlittleList[i].plLevel]
			      					this.tlittleType = this.tlittleList[i].plCode
	      							this.tplLevel = this.tlittleList[i].plLevel
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
    		pushBoxShow(){
    			this.childShow = false;
				this.lowFlag = "B"
				this.pushBtnShow = false
				this.addBeneficiary()
    			if (this.childShow == true && this.recognizeeShow == false && this.policyHolderShow == false && this.RenewalPayShow == false) {
    				this.btnBoxShow = true;
    			}else{
    				this.btnBoxShow = false;
    			}
    		},
    		pushBoxHide(){
    			this.childShow = true;
				this.lowFlag = "A"
				this.pushBtnShow = true
				this.beneficiaryList = [];
    			if (this.childShow == true && this.recognizeeShow == false && this.policyHolderShow == false && this.RenewalPayShow == false) {
    				this.btnBoxShow = true;
    			}else{
    				this.btnBoxShow = false;
    			}
    		},
    		policyHolderShowHide(){
    			this.policyHolderShow = !this.policyHolderShow
    			if (this.policyHolderShow == false && this.recognizeeShow == false && this.childShow == true && this.RenewalPayShow == false) {
    				this.btnBoxShow = true;
    			}else{
    				this.btnBoxShow = false;
    			}
    		},
    		recognizeeShowHide(){
    			this.recognizeeShow = !this.recognizeeShow
    			if (this.recognizeeShow == false && this.policyHolderShow == false && this.childShow == true && this.RenewalPayShow == false) {
    				this.btnBoxShow = true;
    			}else{
    				this.btnBoxShow = false;
    			}
    		},
    		phoneChange(){
                var telTest=/^1[3|4|5|6|7|8|9][0-9]{9}$/;
                if (this.phone != "") {
                	if (this.phone.length >= 11) {
			  			if (!telTest.test(this.phone)) {
			  				Toast('投保人手机号不正确')
			  				return
			  			}
	                }
                }
           	},
            emailTest(){
            	var emailTest = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            	if (this.email != "") {
		  			if (!emailTest.test(this.email)) {
		  				Toast('投保人邮箱号码不正确')
		  				return
		  			}
                }
            },
    		dateSel(){
    			this.age = this.jsGetAge(this.birthDate)
    			if(this.age >=46){
    				this.termValidityDateShow = false
    				this.termValidityDate = ""
    				this.dateInput = false
    			}
    		},
    		termValidityDateSel(){
    			this.termValidityDateShow = true
    			
		        let pdate = this.termValidityDate;
		        let d = new Date;
		        let today = new Date(d.getFullYear (), d.getMonth (), d.getDate ());
		        let reg = /\d+/g;
		        let temp = pdate.match (reg);
		        if(temp){
		        	let foday = new Date (temp[0], parseInt (temp[1]) - 1, temp[2]);
			        if (foday < today){
			            Toast ('证件有效期不可选择今天之前的日期');
			            this.termValidityDate = ""
			        }
		        }
    			if(this.termValidityDate == ""){
    				this.dateInput = false
    			}else{
    				this.dateInput = true
    			}
    		},
    		birthDateSel(){
    			let pdate = this.birthDate;
		        let d = new Date;
		        let today = new Date(d.getFullYear (), d.getMonth (), d.getDate ());
		        let reg = /\d+/g;
		        let temp = pdate.match (reg);
		        let foday = new Date (temp[0], parseInt (temp[1]) - 1, temp[2]);
		        if (foday > today){
		            Toast ('出生日期不可选择今天之后的日期');
		            this.birthDate = ""
		        }
    			if(this.birthDate == ""){
    				this.dateInputBirth = false
    			}else{
    				this.dateInputBirth = true
    			}
    		},
    		handleClickUp(){
    			if(this.$route.query.up && this.$route.query.up == "cvrgInfo"){
    				this.$router.push('/cvrgInfo?prodCode='+this.$route.query.prodCode+'&prodNo='+this.$route.query.prodNo+'&orderNo='+this.$route.query.orderNo+'&cmpCode='+this.$route.query.cmpCode)
    			}else{
    				this.$router.push('/popupInfo1?prodCode='+this.$route.query.prodCode+'&prodNo='+this.$route.query.prodNo+'&orderNo='+this.$route.query.orderNo+'&cmpCode='+this.$route.query.cmpCode)
    			}
    		},
    		listenToMyPay(...payInfo){
    			this.payInfo = payInfo[0]
//  			console.log(this.payInfo)
    		},
    		listenToMyChild(...benData){
    			this.benList = this.benList.concat(benData)
//  			console.log(this.benList)
    		},
    		addBoxChange(){
    			this.boxShow = true
    		},
    		childUserListSay(...data){
//  			console.log(data[0])
    			this.code = data[0][0]
    			this.boxShow = data[0][1]
    			if(this.code != ""){
	    			this.etInformation()
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
	  		feeAjax(){
	  			//sex
  				this.age = this.jsGetAge(this.birthDate)
				if (this.age >= 18 && this.age <= 50) {
					let popIfo = {
					  	"list": [
						    {
						    	"age": this.age,
						      	"birthDays": this.birthDate,
						      	"coverage": this.amnt,
						      	"cvrgCode": this.cvrgCode,
						      	"cvrgName": this.cvrgName,
						      	"freqyNo": "",
						      	"lifeAmtAge": "",
						      	"city": this.cityType1,
						      	"occDetailCode": this.tlittleType,
								"occTypeCode": this.tplLevel,
						      	"prodId": this.$route.query.prodCode,
						      	"safeGuard": this.insuNo,
						      	"sex": this.custGender,
						      	"year": this.payNo,
						      	"yearFee": 0
						    }
					  	]
					}
	  				console.log(JSON.stringify(popIfo))
	  				this.$http.post(this.$store.state.link+'/ppt/count/queryCoverageFee', popIfo)
					.then(res =>{
					    console.log(res.data);
						var dataCode = res.data.code;
						if (dataCode == "SYS_S_000") {
							if(this.minPrice != res.data.output.coverageFeeList[0].yearFee){
								this.minPrice = res.data.output.coverageFeeList[0].yearFee
								MessageBox.confirm('',{
								  	title: '温馨提示',
								  	message: "被保险人信息补全，保费已重新计算",
								  	confirmButtonText: '确定',
								  	showCancelButton: false
								}).then(action => {
									if (action == 'confirm') {
										if (this.payNo == "B1" && this.lowFlag == "A") {
											Indicator.open();
											this.saveInfo3()
										}
										else if (this.payNo == "B1" && this.lowFlag == "B") {
											Indicator.open();
											this.saveInfo4()
										}
							  			else if (this.payNo != "B1" && this.lowFlag == "A") {
							  				Indicator.open();
							  				this.saveInfo2()
							  			}else{
							  				Indicator.open();
							  				this.saveInfo1()
							  			}
									}
								})
							}else{
								if (this.payNo == "B1" && this.lowFlag == "A") {
									Indicator.open();
									this.saveInfo3()
								}
								else if (this.payNo == "B1" && this.lowFlag == "B") {
									Indicator.open();
									this.saveInfo4()
								}
					  			else if (this.payNo != "B1" && this.lowFlag == "A") {
					  				Indicator.open();
					  				this.saveInfo2()
					  			}else{
					  				Indicator.open();
					  				this.saveInfo1()
					  			}
							}
						}else{
							Toast(res.data.desc);
						}
					},res =>{
						console.log(res.data);
					})
  				}else{
  					Toast("投保年龄在18-50岁，请重新输入身份信息~");
  				}
	  		},
	  		saveInfo1(){
	  			var saveInfo = {
    				"head": {
					    "channelCode": "qtb_h5",
					    "deptCode": this.$route.query.cmpCode,
					    "oprCode": this.$store.state.userId,
					    "prodCode": this.$route.query.prodCode
				  	},
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
				  	"opt": "APPL,INSRNT,BNF,PAY,MAIN,CVRG",
				  	"pkgNo": this.$route.query.orderNo,
				  	"mark":"UC",
				  	"applntReq": {
					    "nationality":"CHN",
					    "age": this.age,
					    "applName": this.policyHolderName,
					    "birthday": this.birthDate,
					    "certfCode": this.IDnum,
					    "certfEndTime": this.termValidityDate1,
					    "certfEnduringFlag": this.certfEnduringFlag,
					    "certfType": this.cardType,
					    "occTypeNo": this.tbigType,
					    "occDetailTypeNo": this.tmiddleType,
					    "occNo": this.tlittleType,
					    "occCate": this.tplLevel,
					    "province":this.provinceType,
					    "city": this.cityType,
					    "county": this.countyType,
					    "email": this.email,
					    "address": this.add,
					    "gender": this.custGender,
					    "mobile": this.phone,
					    "relationToInsured":this.nexusType,
				        "socialsecurityStatus":"Y"
				  	},	  	
				  	"insrntReq": {
				  		"nationality":"CHN",
				  		"relaToAppnt":this.nexusType,
					    "age": this.age,
					    "insrntName": this.policyHolderName,
					    "birthday": this.birthDate,
					    "certfCode": this.IDnum,
					    "certfEndTime": this.termValidityDate1,
					    "certfEnduringFlag": this.certfEnduringFlag,
					    "certfType": this.cardType,
					    "occTypeNo": this.tbigType,
					    "occDetailTypeNo": this.tmiddleType,
					    "occNo": this.tlittleType,
					    "occCate": this.tplLevel,
					    "province":this.provinceType,
					    "city": this.cityType,
					    "county": this.countyType,
					    "email": this.email,
					    "address": this.add,
					    "gender": this.custGender,
					    "mobile": this.phone,
					    "socialsecurityStatus":"Y",
				        "insuRelationToMaininsu":"00",
				        "mainInsured":"1"
				  	},
				  	"bnfReq": this.benList,
				  	"paymentReq": this.payInfo,
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
						    "freqyNo":this.freqyNo,
						    "insEffcToTime":this.GetDateStr(1),
						    "insEffcFromTime":this.GetDateStr(1)
						}
				  	],
					"mainReq": {
					    "agentCode": this.brokerCode,
					    "agentName":"云海佳",//bookerName？
					    "oprCode": this.$store.state.userId,
					    "amnt": this.amnt,
					    "deptCode": this.$route.query.cmpCode,
					    "deptName": this.deptName,
					    "prem": this.minPrice,
					    "prodName": this.cvrgName,
					    "prodCode": this.$route.query.prodCode,
					    "prodNo": this.$route.query.prodNo,
					    "province":this.provinceType1,
					    "city": this.cityType1,
					    "county": this.countyType1,
					    "sumAmnt": this.amnt,
					    "sumPrem": this.minPrice,
					    "firstPremium": this.minPrice,
					    "freqyNo": this.freqyNo,
					    "lowFlag":this.lowFlag,
				        "issueTime": this.GetDateStr(0),
				        "initialPremamt": this.minPrice,
				        "plcyEffcTime": this.GetDateStr(1),
				        "plcyInvalidTime": this.GetDateStr(1),
				        "userId":"110101198912075026"
					}
				}
	  			
    			console.log(JSON.stringify(saveInfo))
    			this.save(saveInfo)
	  		},
	  		saveInfo2(){//法定受益人
	  			var saveInfo = {
    				"head": {
					    "channelCode": "qtb_h5",
					    "deptCode": this.$route.query.cmpCode,
					    "oprCode": this.$store.state.userId,
					    "prodCode": this.$route.query.prodCode
				  	},
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
				  	"opt": "APPL,INSRNT,PAY,MAIN,CVRG",
				  	"pkgNo": this.$route.query.orderNo,
				  	"mark":"UC",
				  	"applntReq": {
					    "nationality":"CHN",
					    "age": this.age,
					    "applName": this.policyHolderName,
					    "birthday": this.birthDate,
					    "certfCode": this.IDnum,
					    "certfEndTime": this.termValidityDate1,
					    "certfEnduringFlag": this.certfEnduringFlag,
					    "certfType": this.cardType,
					    "occTypeNo": this.tbigType,
					    "occDetailTypeNo": this.tmiddleType,
					    "occNo": this.tlittleType,
					    "occCate": this.tplLevel,
					    "province":this.provinceType,
					    "city": this.cityType,
					    "county": this.countyType,
					    "email": this.email,
					    "address": this.add,
					    "gender": this.custGender,
					    "mobile": this.phone,
					    "relationToInsured":this.nexusType,
				        "socialsecurityStatus":"Y"
				  	},	  	
				  	"insrntReq": {
				  		"nationality":"CHN",
				  		"relaToAppnt":this.nexusType,
					    "age": this.age,
					    "insrntName": this.policyHolderName,
					    "birthday": this.birthDate,
					    "certfCode": this.IDnum,
					    "certfEndTime": this.termValidityDate1,
					    "certfEnduringFlag": this.certfEnduringFlag,
					    "certfType": this.cardType,
					    "occTypeNo": this.tbigType,
					    "occDetailTypeNo": this.tmiddleType,
					    "occNo": this.tlittleType,
					    "occCate": this.tplLevel,
					    "province":this.provinceType,
					    "city": this.cityType,
					    "county": this.countyType,
					    "email": this.email,
					    "address": this.add,
					    "gender": this.custGender,
					    "mobile": this.phone,
					    "socialsecurityStatus":"Y",
				        "insuRelationToMaininsu":"00",
				        "mainInsured":"1"
				  	},
				  	"paymentReq": this.payInfo,
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
						    "freqyNo":this.freqyNo,
						    "insEffcToTime":this.GetDateStr(1),
						    "insEffcFromTime":this.GetDateStr(1)
						}
				  	],
					"mainReq": {
					    "agentCode": this.brokerCode,
					    "agentName":"云海佳",//bookerName？
					    "oprCode": this.$store.state.userId,
					    "amnt": this.amnt,
					    "deptCode": this.$route.query.cmpCode,
					    "deptName": this.deptName,
					    "prem": this.minPrice,
					    "prodName": this.cvrgName,
					    "prodCode": this.$route.query.prodCode,
					    "prodNo": this.$route.query.prodNo,
					    "province":this.provinceType1,
					    "city": this.cityType1,
					    "county": this.countyType1,
					    "sumAmnt": this.amnt,
					    "sumPrem": this.minPrice,
					    "firstPremium": this.minPrice,
					    "freqyNo": this.freqyNo,
					    "lowFlag":this.lowFlag,
				        "issueTime": this.GetDateStr(0),
				        "initialPremamt": this.minPrice,
				        "plcyEffcTime": this.GetDateStr(1),
				        "plcyInvalidTime": this.GetDateStr(1),
				        "userId":"110101198912075026"
					}
				}
	  			
    			console.log(JSON.stringify(saveInfo))
    			this.save(saveInfo)
	  		},
	  		saveInfo3(){//法定受益人及趸交
	  			var saveInfo = {
    				"head": {
					    "channelCode": "qtb_h5",
					    "deptCode": this.$route.query.cmpCode,
					    "oprCode": this.$store.state.userId,
					    "prodCode": this.$route.query.prodCode
				  	},
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
				  	"opt": "APPL,INSRNT,MAIN,CVRG",
				  	"pkgNo": this.$route.query.orderNo,
				  	"mark":"UC",
				  	"applntReq": {
					    "nationality":"CHN",
					    "age": this.age,
					    "applName": this.policyHolderName,
					    "birthday": this.birthDate,
					    "certfCode": this.IDnum,
					    "certfEndTime": this.termValidityDate1,
					    "certfEnduringFlag": this.certfEnduringFlag,
					    "certfType": this.cardType,
					    "occTypeNo": this.tbigType,
					    "occDetailTypeNo": this.tmiddleType,
					    "occNo": this.tlittleType,
					    "occCate": this.tplLevel,
					    "province":this.provinceType,
					    "city": this.cityType,
					    "county": this.countyType,
					    "email": this.email,
					    "address": this.add,
					    "gender": this.custGender,
					    "mobile": this.phone,
					    "relationToInsured":this.nexusType,
				        "socialsecurityStatus":"Y"
				  	},	  	
				  	"insrntReq": {
				  		"nationality":"CHN",
				  		"relaToAppnt":this.nexusType,
					    "age": this.age,
					    "insrntName": this.policyHolderName,
					    "birthday": this.birthDate,
					    "certfCode": this.IDnum,
					    "certfEndTime": this.termValidityDate1,
					    "certfEnduringFlag": this.certfEnduringFlag,
					    "certfType": this.cardType,
					    "occTypeNo": this.tbigType,
					    "occDetailTypeNo": this.tmiddleType,
					    "occNo": this.tlittleType,
					    "occCate": this.tplLevel,
					    "province":this.provinceType,
					    "city": this.cityType,
					    "county": this.countyType,
					    "email": this.email,
					    "address": this.add,
					    "gender": this.custGender,
					    "mobile": this.phone,
					    "socialsecurityStatus":"Y",
				        "insuRelationToMaininsu":"00",
				        "mainInsured":"1"
				  	},
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
						    "freqyNo":this.freqyNo,
						    "insEffcToTime":this.GetDateStr(1),
						    "insEffcFromTime":this.GetDateStr(1)
						}
				  	],
					"mainReq": {
					    "agentCode": this.brokerCode,
					    "agentName":"云海佳",//bookerName？
					    "oprCode": this.$store.state.userId,
					    "amnt": this.amnt,
					    "deptCode": this.$route.query.cmpCode,
					    "deptName": this.deptName,
					    "prem": this.minPrice,
					    "prodName": this.cvrgName,
					    "prodCode": this.$route.query.prodCode,
					    "prodNo": this.$route.query.prodNo,
					    "province":this.provinceType1,
					    "city": this.cityType1,
					    "county": this.countyType1,
					    "sumAmnt": this.amnt,
					    "sumPrem": this.minPrice,
					    "firstPremium": this.minPrice,
					    "freqyNo": this.freqyNo,
					    "lowFlag":this.lowFlag,
				        "issueTime": this.GetDateStr(0),
				        "initialPremamt": this.minPrice,
				        "plcyEffcTime": this.GetDateStr(1),
				        "plcyInvalidTime": this.GetDateStr(1),
				        "userId":"110101198912075026"
					}
				}
	  			console.log(JSON.stringify(saveInfo))
    			this.save(saveInfo)
	  		},
	  		saveInfo4(){//趸交
	  			var saveInfo = {
    				"head": {
					    "channelCode": "qtb_h5",
					    "deptCode": this.$route.query.cmpCode,
					    "oprCode": this.$store.state.userId,
					    "prodCode": this.$route.query.prodCode
				  	},
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
				  	"opt": "APPL,INSRNT,BNF,MAIN,CVRG",
				  	"pkgNo": this.$route.query.orderNo,
				  	"mark":"UC",
				  	"applntReq": {
					    "nationality":"CHN",
					    "age": this.age,
					    "applName": this.policyHolderName,
					    "birthday": this.birthDate,
					    "certfCode": this.IDnum,
					    "certfEndTime": this.termValidityDate1,
					    "certfEnduringFlag": this.certfEnduringFlag,
					    "certfType": this.cardType,
					    "occTypeNo": this.tbigType,
					    "occDetailTypeNo": this.tmiddleType,
					    "occNo": this.tlittleType,
					    "occCate": this.tplLevel,
					    "province":this.provinceType,
					    "city": this.cityType,
					    "county": this.countyType,
					    "email": this.email,
					    "address": this.add,
					    "gender": this.custGender,
					    "mobile": this.phone,
					    "relationToInsured":this.nexusType,
				        "socialsecurityStatus":"Y"
				  	},	  	
				  	"insrntReq": {
				  		"nationality":"CHN",
				  		"relaToAppnt":this.nexusType,
					    "age": this.age,
					    "insrntName": this.policyHolderName,
					    "birthday": this.birthDate,
					    "certfCode": this.IDnum,
					    "certfEndTime": this.termValidityDate1,
					    "certfEnduringFlag": this.certfEnduringFlag,
					    "certfType": this.cardType,
					    "occTypeNo": this.tbigType,
					    "occDetailTypeNo": this.tmiddleType,
					    "occNo": this.tlittleType,
					    "occCate": this.tplLevel,
					    "province":this.provinceType,
					    "city": this.cityType,
					    "county": this.countyType,
					    "email": this.email,
					    "address": this.add,
					    "gender": this.custGender,
					    "mobile": this.phone,
					    "socialsecurityStatus":"Y",
				        "insuRelationToMaininsu":"00",
				        "mainInsured":"1"
				  	},
				  	"bnfReq": this.benList,
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
						    "freqyNo":this.freqyNo,
						    "insEffcToTime":this.GetDateStr(1),
						    "insEffcFromTime":this.GetDateStr(1)
						}
				  	],
					"mainReq": {
					    "agentCode": this.brokerCode,
					    "agentName":"云海佳",//bookerName？
					    "oprCode": this.$store.state.userId,
					    "amnt": this.amnt,
					    "deptCode": this.$route.query.cmpCode,
					    "deptName": this.deptName,
					    "prem": this.minPrice,
					    "prodName": this.cvrgName,
					    "prodCode": this.$route.query.prodCode,
					    "prodNo": this.$route.query.prodNo,
					    "province": this.provinceType1,
					    "city": this.cityType1,
					    "county": this.countyType1,
					    "sumAmnt": this.amnt,
					    "sumPrem": this.minPrice,
					    "firstPremium": this.minPrice,
					    "freqyNo": this.freqyNo,
					    "lowFlag": this.lowFlag,
				        "issueTime": this.GetDateStr(0),
				        "initialPremamt": this.minPrice,
				        "plcyEffcTime": this.GetDateStr(1),
				        "plcyInvalidTime": this.GetDateStr(1),
				        "userId":"110101198912075026"
					}
				}
	  			console.log(JSON.stringify(saveInfo))
    			this.save(saveInfo)
	  		},
    		goNext(){
    			//投保人
    			if (this.policyHolderName == "") {
    				Toast("投保人姓名不能为空~")
    				return
    			}else{
    				 var myReg = /^([\u4E00-\u9FA5]{2,})+$/;
					 if (!myReg.test(this.policyHolderName)) {
						Toast("投保人姓名必须为汉字,且最少两个汉字~")
						return
					 }
    			}
    			if (this.IDnum == "") {
    				Toast("投保人证件号码不能为空~")
    				return
    			}else{
    				if(this.cardType == "0") {
						if(this.IDnum.length == 18 && this.IDtrue == true) {
							
						}else{
							Toast("投保人证件号码不合法~")
    						return
						}
					}
    			}
    			this.age = this.jsGetAge(this.birthDate)
    			if (this.termValidityDateShow == true) {
    				this.certfEnduringFlag = "N"
    				if (this.termValidityDate == "") {
	    				Toast("投保人证件有效期不能为空~")
	    				return
	    			}else{
	    				this.termValidityDate1 = this.termValidityDate
	    			}
    			}else{
    				this.certfEnduringFlag = "Y"
    				this.termValidityDate1 = "9999-01-01"
    			}
    			if (this.birthDate == "") {
    				Toast("投保人出生日期不能为空~")
    				return
    			}
    			if (this.phone == "") {
    				Toast("投保人手机号码不能为空~")
    				return
    			}else{
    				var telTest=/^1[3|4|5|6|7|8|9][0-9]{9}$/;
                	if (!telTest.test(this.phone)) {
		  				Toast('投保人手机号不正确')
		  				return
		  			}
    			}
    			if (this.email == "") {
    				Toast("投保人邮箱不能为空~")
    				return
    			}else{
    				var emailTest = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		  			if (!emailTest.test(this.email)) {
		  				Toast('投保人邮箱号码不正确')
		  				return
		  			}
    			}
    			if (this.add == "") {
    				Toast("投保人详细地址不能为空~")
    				return
    			}else{
//  				var myRege = /.*[\u4e00-\u9fa5]{4,}.*/;
    				var re = /[\u4E00-\u9FA5]/g;
//					if (!myRege.test(this.add)) {
					if (this.add.match(re).length < 4) {
						Toast("投保人详细地址必须包含四个汉字~")
						return
					}
    			}
    			if (this.lowFlag == "B") {
    				this.benList = []
	    			if (this.childShow == false) {
	    				if (this.beneficiaryList.length>=1) {
	    					for (let i = 0; i< this.beneficiaryList.length;i++) {
								this.$refs.getBen[i].childSay()
							}
	    				}
	    			}
	    			let sum = 0;
	    			for (let i=0; i<this.benList.length;i++) {
	    				sum += parseInt(this.benList[i].bnfShare)
	    			}
//	    			console.log(sum)
	    			if (this.benList[0].relatoInsured && this.benList[0].bnfName && this.benList[0].certfCode && this.benList[0].certfEndTime && this.benList[0].birthday ) {
	    				if(sum != 100){
		    				Toast("受益人比例之和不等于100%~")
		    				return
	    				}
	    			}else{
	    				return
	    			}
	    			if (this.benList.length > 1) {
	    				for (let i=0; i<this.benList.length;i++) {
	    					if(this.benList[i+1]){
		    					if(this.benList[i].certfCode == this.benList[i+1].certfCode){
		    						Toast("受益人的证件号码不能一样~")
	    							return false;
		    					}
	    					}
		    			}
	    			}
	    			
    			}
    			if (this.RenewalPayShow == true) {
    				this.$refs.getPay.childPayInfo()
    				if (this.payInfo.accNo != "" && this.payInfo.accNo != undefined) {
    					this.feeAjax()
    				}
    			}else{
    				this.feeAjax()
    			}
    			
    		},
    		save(saveInfo){
	  			this.$http.post(this.$store.state.link+'/trd/order/v1/saveorder', saveInfo)
				.then(res =>{
					Indicator.close();
				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						if(this.$route.query.up && this.$route.query.up == "cvrgInfo"){
							this.$router.push('/popupInfo3?prodCode='+this.$route.query.prodCode+'&prodNo='+this.$route.query.prodNo+'&orderNo='+this.$route.query.orderNo+'&cmpCode='+this.$route.query.cmpCode+'&up='+this.$route.query.up)
						}else{
							this.$router.push('/popupInfo3?prodCode='+this.$route.query.prodCode+'&prodNo='+this.$route.query.prodNo+'&orderNo='+this.$route.query.orderNo+'&cmpCode='+this.$route.query.cmpCode)
						}
						
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc);
					}
				},res =>{
					Indicator.close();
					console.log(res.data);
				})
    		},
    		provinceChange(){
//  			console.log(this.provinceType)
    			this.cityType = ""
    			this.city()
    		},
    		cityChange(){
//  			console.log(this.cityType)
    			this.countyType = ""
    			this.coun()
    		},
    		tbigChange(){
//  			console.log(this.tbigType)
    			this.tmiddleType = ""
    			this.tmiddle()
    		},
    		tmiddleChange(){
//  			console.log(this.tmiddleType)
    			this.tlittleType = ""
    			this.tlittle()
    		},
    		tlittleChange(){
//  			console.log(this.tlittleTypeBox)
    			this.tlittleType = this.tlittleTypeBox[0]
    			this.tplLevel = this.tlittleTypeBox[1]
    		},
    	},
    	watch:{
    		allData: function (val) {
    			this.allDataVal(val)
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
		margin-left: 0.32rem;
	}
	.oneTitleTextSpan2 {
		margin-left: 2rem;
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
		margin-top: 0.275rem;
	}
	.btnBox {
		padding: 0.64rem 0;
		text-align: center;
	}
	.btnBox1 {
		position: absolute;
		left: 0;
		bottom: 0.64rem;
		padding-bottom: 0;
		width: 100%;
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
		overflow: hidden;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputGrop2 {
		position: relative;
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
		height: 0.68rem;
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
		/*text-align-last: center;*/
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
		float: left;
		width: 3.6rem;
		height: 0.68rem;
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
		width: 4.2rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.inputselect {
		height: 0.68rem;
	}
	.sBox {
		padding: 0 0.4rem;
		margin-top: 0.34rem;
		margin-bottom: 0.88rem;
		font-size: 0.28rem;
		line-height: 0.5rem;
	}
	.sImg {
		display: block;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: -0.04rem;
	}
	.sDes {
		display: inline-block;
		float: left;
		width: 6rem;
		margin-left: 0.16rem;
	}
	.sSpan {
		color: #6BD1CF;
	}
	.inputselectP {
		height: 0.68rem;
	}
	.upDownImg {
		position: absolute;
		right: 0;
		top: 0.22rem;
		z-index: -1;
		width: 0.4rem;
		height: 0.44rem;
	}
	.upDownImg1 {
		top: 0.12rem;
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
	.lineHeight {
		display: block;
		line-height: 0.88rem;
	}
	.meBox .inputGrop:last-child{
		border-bottom: solid 0.01rem #C8C7CC;
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
	.pushBtn {
		display: block;
		width: 6.7rem;
		height: 0.88rem;
		margin: 0 auto;
		line-height: 0.88rem;
		font-size: 0.28rem;
		text-align: center;
		color: #FFFFFF;
		background: #54CCC1;
		border-radius: 8px;
	}
	.pushBox {
		margin: 0.44rem 0;
	}
	.inputSpan {
		line-height: 0.88rem;
		color: #555555;
		font-weight: bold;
	}
	.inputSpan1 {
		line-height: 0.88rem;
		color: #666666;
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
	.btnImg1 {
		display: inline-block;
		float: left;
		width: 0.56rem;
		height: 0.56rem;
		margin-top: 0.14rem;
		margin-right: 0.1rem;
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
	.dis{
		display:none
	}
	.addBox {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 5;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.2);
	}
	.addBoxF {
		height: 100%;
		overflow: hidden;
	}
</style>