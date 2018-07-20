<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div v-if="pdfFlag">
			<div class="oneTitle">
				<img src="/static/ranch3.png" class="ranchImg" />
				<p class="oneTitleText clearFloat">
					<span class="oneTitleTextSpan1 left selected">投保告知</span>
					<span class="oneTitleTextSpan2 left selected">投保信息</span>
					<span class="oneTitleTextSpan3 right selected">订单核对</span>
				</p>
			</div>
			<div class="threeBox">
				<p class="inputGrop prodName">{{prodName}}</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">保险期间</label>
					<span class="inputText left">{{time}}</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">保障额度(元)</label>
					<span class="inputText left">{{amountForceNum}}</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">应付金额(元)</label>
					<span class="inputText left">{{price}}</span>
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
						<span class="inputText maxInput left">{{policyHolderName}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">证件类型</label>
						<span class="inputText left">{{cardTypeName}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">证件号码</label>
						<span class="inputText left">{{IDnum}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">证件有效期</label>
						<span class="inputText left">{{termValidityDate}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">出生日期</label>
						<span class="inputText left">{{birthDate}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">性别</label>
						<span class="inputText left">{{sex}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">手机号码</label>
						<span class="inputText left">{{phone}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">邮箱</label>
						<span class="inputText maxInput left">{{email}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">职业大类</label>
						<span class="inputText maxInput left">{{big}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">职业中类</label>
						<span class="inputText maxInput left">{{middle}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">职业小类</label>
						<span class="inputText maxInput left">{{little}}</span>
					</p>
					<div class="inputGrop1">
						<label class="inputLabel">联系地址</label>
						<p class="selectBox maxGroup clearFloat">
							<span class="inputText left">{{province}}</span>
							<span class="inputText left">{{city}}</span>
							<span class="inputText left">{{county}}</span>
						</p>
					</div>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">详细地址</label>
						<span class="inputText maxInput left">{{add}}</span>
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
						<span class="inputText left">{{nexus}}</span>
					</p>
				</div>
			</div>
			<div class="twoCon twoCon1">
				<p class="title_twoCon clearFloat" :class="{borderNone:!benShow}">
					<label class="titleLable_twoCon left">受益人信息</label>
					<img src="/static/leftImg.png" class="btnImg right" v-show="!benShow" @click="benShowHide"/>
					<img src="/static/downImg.png" class="btnImg right" v-show="benShow" @click="benShowHide"/>
				</p>
				<div :class="{disnone:lowFlagShow}" v-show="benShow">
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">法定受益人</label>
					</p>
				</div>
				<div class="recognizee benDivBox" :class="{disnone:!lowFlagShow}" v-show="benShow">
					<div class="benDiv" v-for="(ben,index) in beneficiaryList">
						<p class="inputGrop clearFloat">
							<label class="inputLabel left">受益人{{index+1}}</label>
						</p>
						<p class="inputGrop clearFloat">
							<label class="inputLabel left">与被保人关系</label>
							<span class="inputText left">{{ben.relatoInsured}}</span>
						</p>
						<div class="recognizeeChild1">
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">姓名</label>
								<span class="inputText maxInput left">{{ben.bnfName}}</span>
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">证件类型</label>
								<span class="inputText left">{{ben.certfType}}</span>
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">证件号码</label>
								<span class="inputText left">{{ben.certfCode}}</span>
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">证件有效期</label>
								<span class="inputText left">{{ben.certfEndTime}}</span>
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">出生日期</label>
								<span class="inputText left">{{ben.birthday}}</span>
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">性别</label>
								<span class="inputText left">{{ben.gender}}</span>
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">受益比例</label>
								<span class="inputText left">{{ben.bnfShare}}%</span>
							</p>
						</div>
						<p class="benP"></p>
					</div>
				</div>
			</div>
			<p class="sBox clearFloat">
				<img src="/static/noSelected.png" class="sImg left" v-show="sBoxShow"  @click="sBoxShowChange"/>
				<img src="/static/selected.png" class="sImg left" v-show="!sBoxShow" @click="sBoxHideChange"/>
				<span class="sDes">
					我已查看并同意
					<span @click="popupShowHide">
						<span class="sSpan">《保险条款》</span>、
						<span class="sSpan">《投保须知》</span>、
						<span class="sSpan">《责任免除条款》</span>、
						<span class="sSpan">《银行自动转账授权声明》</span>、
						<span class="sSpan">《人身保险投保提示书》</span>和
						<span class="sSpan">《投保人与被保人告知声明》</span>。
					</span>
				</span>
			</p>
			<mt-popup v-model="popupVisible" position="bottom" class="popupBox">
				<span class="spanGroup">
					<span class="sSpan1" @click="sBoxGoPdf(0)">《保险条款》</span>
					<span class="sSpan1" @click="sBoxGoPdf(1)">《投保须知》</span>
					<span class="sSpan1" @click="sBoxGoPdf(2)">《责任免除条款》</span>
					<span class="sSpan1" @click="sBoxGoPdf(3)">《银行自动转账授权声明》</span>
					<span class="sSpan1" @click="sBoxGoPdf(4)">《人身保险投保提示书》</span>
					<span class="sSpan1" @click="sBoxGoPdf(5)">《投保人与被保人告知声明》</span>
				</span>
			</mt-popup>
			<p class="btnBox clearFloat" :class="{btnBox1:btnBoxShow}">
				<span class="btn btn1 left" @click="handleClickUp">上一步</span>
				<span class="btn left" @click="handleClickNext">确认订单</span>
			</p>
		</div>
		<div v-if="!pdfFlag"  class="ctc_div_mask">
			<Pdf :pdf="pdf" @pdfClose = "pdfClose"></Pdf>
		</div>
	</div>
</template>

<script>
	import Pdf from '@/components/pdf.vue'
	import { Popup } from 'mint-ui'
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
    	name: "PopupInfo3",
    	data () {
      		return {
      			btnBoxShow:false,
      			prodName:'',
      			time:'',
      			insuNo:'',
      			amountForceNum:'',
      			price:'',
      			policyHolderShow:true,
      			policyHolderName:'',
      			cardType:'',
      			cardTypeName:'',
	  			IDnum:'',
	  			termValidityDate:'',
	  			birthDate:'',
	  			sex:'',
	  			phone:'',
	  			email:'',
	  			big:'',
	  			bigType:'',
	  			middle:'',
	  			middleType:'',
	  			little:'',
	  			littleType:'',
	  			province:'',
	  			provinceType:'',
	  			city:'',
	  			cityType:'',
	  			county:'',
	  			countyType:'',
	  			add:'',
	  			recognizeeShow:true,
	  			sBoxShow:true,
      			nexus:'',
      			nexusType:'',
      			lowFlag:'',
      			lowFlagShow:true,
      			beneficiaryList:[],
      			index:'',
      			benShow:true,
      			benNexus:'',
      			benName:'',
      			benCardType:'',
      			benIDnum:'',
      			benTermValidityDate:'',
      			benBirthDate:'',
      			bensex:'',
      			benShare:'',
			  	popupVisible:false,
			  	pdfSRCList:[],
			  	pdf:'',
			  	pdfFlag:true,
      		}
    	},
    	created(){
    		this.OrderInfoAjax()
    		this.pdfSRCList.push("http://h5.qtoubao.cn:8012/onlinePreview?url=http://h5.qtoubao.cn:9900/group1/M00/00/1F/rBUQCFr-mFyAF0mBAAsdUSJHcYw535.pdf")
    		this.prodSaleAjax()
    	},
    	components: {
			Pdf:Pdf
		},
    	methods:{
    		pdfClose(...data){
				this.pdfFlag=data[0]
			},
    		sBoxGoPdf(i){
    			this.pdf = this.pdfSRCList[i]
    			this.pdfFlag = false;
    		},
    		nexusChange(){
    			if (this.nexusType == '00') {
    				this.nexus = '本人'
	    		}
    		},
    		prodSaleAjax(){
    			let prodCodeInfo = {
					"prodCode": this.$route.query.prodCode
				}
				this.$http.post(this.$store.state.link+'/prd/prod/attachlist', prodCodeInfo)
				.then(res =>{
					console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						for (let i=0;i<res.data.output.length;i++) {
		      				this.pdfSRCList.push(res.data.output[i].attachUrl)
		      			}
//						console.log(this.pdfSRCList)
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
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
						//保险信息
						this.prodName = this.allData.mainResp.prodName
						this.price = this.allData.mainResp.firstPremium
						this.insuNo = this.allData.cvrgResp[0].insuNo
//						console.log(this.insuNo)
						var cvrgInfo={
						  	"cvrgExtType": "3",
						  	"prodCode": this.$route.query.prodCode
						}
				  		this.$http.post(this.$store.state.link+'/prd/cvrg/cvrglist', cvrgInfo)
						.then(res =>{
							var dataCode = res.data.code;
							if (dataCode == "SYS_S_000") {
								this.insuRmkList = res.data.output[0].insuPeriodList
//						    	console.log(this.insuRmkList);
								//保险期间
								for (let i=0;i<this.insuRmkList.length;i++) {
				      				if (this.insuNo == this.insuRmkList[i].insuNo) {
				      					this.time = this.insuRmkList[i].insuRmk
				      				}
				      			}
							}else{
								Toast(res.data.desc);
							}
						},res =>{
							console.log(res.data);
						})
						this.amountForceNum = this.allData.cvrgResp[0].amnt
					  	//投保人信息
					  	if (this.allData.applntResp.gender == "F") {
					  		this.sex = "女"
					  	}else{
					  		this.sex = "男"
					  	}
				  		this.cardType = this.allData.applntResp.certfType
		      			this.IDnum = this.allData.applntResp.certfCode
		      			let IdcardTypeInfo = {
						  	"dicReq": this.$route.query.cmpCode
						}
						this.$http.post(this.$store.state.link+'/dic/findCertiTypeByOrgCode', IdcardTypeInfo)
						.then(res =>{
							var dataCode = res.data.code;
							if (dataCode == "SYS_S_000") {
								for (let i=0;i<res.data.output.length;i++) {
				      				if (this.cardType == res.data.output[i].certifiCode) {
				      					this.cardTypeName = res.data.output[i].certifiName
				      				}
				      			}
							}else{
								Toast(res.data.desc);
							}
						},res =>{
							console.log(res.data);
						})
				      			
			      		this.policyHolderName = this.allData.applntResp.applName
		      			if (this.allData.applntResp.certfEnduringFlag == "N") {
		    				this.termValidityDate = this.allData.applntResp.certfEndTime
		    			}else{
		    				this.termValidityDate = "永久有效"
		    			}
			      		this.birthDate = this.allData.applntResp.birthday
			      		this.phone = this.allData.applntResp.mobile
			      		this.email = this.allData.applntResp.email
			      		this.add = this.allData.applntResp.address
		      			this.provinceType = this.allData.applntResp.province
		      			let proinfo = {
		    				"code": '0',
		  					"orgCode": this.$route.query.cmpCode
						}
						this.$http.post(this.$store.state.link+'/dic/findChinaByOrgCode', proinfo)
						.then(res =>{
							var dataCode = res.data.code;
							if (dataCode == "SYS_S_000") {
								for (let i=0;i<res.data.output.length;i++) {
				      				if (this.provinceType == res.data.output[i].cnCode) {
				      					this.province = res.data.output[i].cnName
				      				}
				      			}
							}else{
								Toast(res.data.desc);
							}
						},res =>{
							console.log(res.data);
						})	
		      			this.cityType = this.allData.applntResp.city
		      			let cityinfo = {
		    				"code": this.provinceType,
		  					"orgCode": this.$route.query.cmpCode
						}
						this.$http.post(this.$store.state.link+'/dic/findChinaByOrgCode', cityinfo)
						.then(res =>{
							var dataCode = res.data.code;
							if (dataCode == "SYS_S_000") {
								for (let i=0;i<res.data.output.length;i++) {
				      				if (this.cityType == res.data.output[i].cnCode) {
				      					this.city = res.data.output[i].cnName
				      				}
				      			}
							}else{
								Toast(res.data.desc);
							}
						},res =>{
							console.log(res.data);
						})
		      			this.countyType = this.allData.applntResp.county
		      			let countyinfo = {
		    				"code": this.cityType,
		  					"orgCode": this.$route.query.cmpCode
						}
						this.$http.post(this.$store.state.link+'/dic/findChinaByOrgCode', countyinfo)
						.then(res =>{
							var dataCode = res.data.code;
							if (dataCode == "SYS_S_000") {
								for (let i=0;i<res.data.output.length;i++) {
				      				if (this.countyType == res.data.output[i].cnCode) {
				      					this.county = res.data.output[i].cnName
				      				}
				      			}
							}else{
								Toast(res.data.desc);
							}
						},res =>{
							console.log(res.data);
						})
			      		this.bigType = this.allData.applntResp.occTypeNo
			      		let biginfo = {
						  	"code": '0',
		  					"orgCode": this.$route.query.cmpCode
						}
						this.$http.post(this.$store.state.link+'/dic/findProfessionalByOrgCode', biginfo)
						.then(res =>{
							var dataCode = res.data.code;
							if (dataCode == "SYS_S_000") {
								for (let i=0;i<res.data.output.length;i++) {
				      				if (this.bigType == res.data.output[i].plCode) {
				      					this.big = res.data.output[i].plName
				      				}
				      			}
							}else{
								Toast(res.data.desc);
							}
						},res =>{
							console.log(res.data);
						})
			      		this.middleType = this.allData.applntResp.occDetailTypeNo	      			
		      			let middleinfo = {
						  	"code": this.bigType,
		  					"orgCode": this.$route.query.cmpCode
						}
						this.$http.post(this.$store.state.link+'/dic/findProfessionalByOrgCode', middleinfo)
						.then(res =>{
							var dataCode = res.data.code;
							if (dataCode == "SYS_S_000") {
								for (let i=0;i<res.data.output.length;i++) {
				      				if (this.middleType == res.data.output[i].plCode) {
				      					this.middle = res.data.output[i].plName
				      				}
				      			}
							}else{
								Toast(res.data.desc);
							}
						},res =>{
							console.log(res.data);
						})
			      		this.littleType = this.allData.applntResp.occNo
			      		let littleinfo = {
							"code": this.middleType,
			  				"orgCode": this.$route.query.cmpCode
						}
						this.$http.post(this.$store.state.link+'/dic/findProfessionalByOrgCode', littleinfo)
						.then(res =>{
							var dataCode = res.data.code;
							if (dataCode == "SYS_S_000") {
								for (let i=0;i<res.data.output.length;i++) {
				      				if (this.littleType == res.data.output[i].plCode) {
				      					this.little = res.data.output[i].plName
				      				}
				      			}
							}else{
								Toast(res.data.desc);
							}
						},res =>{
							console.log(res.data);
						})
			      		//被保人信息
					  	this.nexusType = this.allData.insrntResp.relaToAppnt
					  	if (this.nexusType == "00") {
					  		this.nexus = "本人"
					  	}
						//受益人
						this.lowFlag = this.allData.mainResp.lowFlag
						if (this.lowFlag == "B") {
							this.lowFlagShow = true
						}else{
							this.lowFlagShow = false
						}
						if (this.allData.bnfResp.length > 0) {
							this.beneficiaryList = this.allData.bnfResp
							for (let i=0;i<this.beneficiaryList.length;i++) {
			      				if (this.beneficiaryList[i].relatoInsured == "01") {
			      					this.beneficiaryList[i].relatoInsured = "父母"
			      				}
			      				if (this.beneficiaryList[i].relatoInsured == "02") {
			      					this.beneficiaryList[i].relatoInsured = "配偶"
			      				}
			      				if (this.beneficiaryList[i].relatoInsured == "03") {
			      					this.beneficiaryList[i].relatoInsured = "子女"
			      				}
			      				if (this.beneficiaryList[i].certfEnduringFlag == "Y") {
				    				this.beneficiaryList[i].certfEndTime = "永久有效"
				    			}
			      				if (this.beneficiaryList[i].gender == "F") {
							  		this.beneficiaryList[i].gender = "女"
							  	}else{
							  		this.beneficiaryList[i].gender = "男"
							  	}
							  	let benIdcardTypeInfo = {
								  	"dicReq": this.$route.query.cmpCode
								}
								this.$http.post(this.$store.state.link+'/dic/findCertiTypeByOrgCode', benIdcardTypeInfo)
								.then(res =>{
									var dataCode = res.data.code;
									if (dataCode == "SYS_S_000") {
										for (let j=0;j<res.data.output.length;j++) {
						      				if (this.beneficiaryList[i].certfType == res.data.output[j].certifiCode) {
						      					this.beneficiaryList[i].certfType = res.data.output[j].certifiName
						      				}
						      			}
									}else{
										Toast(res.data.desc);
									}
								},res =>{
									console.log(res.data);
								})
			      			}
						}
					}else{
						Toast(res.data.desc);
					}
				},res =>{
					console.log(res.data);
				})
    		},
    		sBoxShowChange(){
    			this.sBoxShow = false
    		},
    		sBoxHideChange(){
    			this.sBoxShow = true
    		},
    		popupShowHide(){
    			this.popupVisible = true
    		},
    		policyHolderShowHide(){
    			this.policyHolderShow = !this.policyHolderShow
    			if (this.policyHolderShow == false && this.recognizeeShow == false && this.benShow == false) {
    				this.btnBoxShow = true;
    			}else{
    				this.btnBoxShow = false;
    			}
    		},
    		recognizeeShowHide(){
    			this.recognizeeShow = !this.recognizeeShow
    			if (this.recognizeeShow == false && this.policyHolderShow == false && this.benShow == false) {
    				this.btnBoxShow = true;
    			}else{
    				this.btnBoxShow = false;
    			}
    		},
    		benShowHide(){
    			this.benShow = !this.benShow
    			if (this.benShow == false && this.recognizeeShow == false && this.policyHolderShow == false) {
    				this.btnBoxShow = true;
    			}else{
    				this.btnBoxShow = false;
    			}
    		},
    		handleClickUp(){
    			if(this.$route.query.up && this.$route.query.up == "cvrgInfo"){
    				this.$router.push('/popupInfo2?prodCode='+this.$route.query.prodCode+'&prodNo='+this.$route.query.prodNo+'&orderNo='+this.$route.query.orderNo+'&up='+this.$route.query.up+'&cmpCode='+this.$route.query.cmpCode)
    			}else{
    				this.$router.push('/popupInfo2?prodCode='+this.$route.query.prodCode+'&prodNo='+this.$route.query.prodNo+'&orderNo='+this.$route.query.orderNo+'&cmpCode='+this.$route.query.cmpCode)
    			}
    		},
    		handleClickNext(){
    			if (this.sBoxShow == true) {
    				Toast("请点击查看《投保须知》、《保险条款》、《人身保险投保提示书》、《责任免除条款》《银行自动转账授权声明》和《投保人与被保人告知声明》~")
    				return
    			}
    			var orderInfo ={
    				"head": {
					    "channelCode": "qtb_h5",
					    "deptCode": this.$route.query.cmpCode,
					    "oprCode": this.$store.state.userId,
					    "prodCode": this.$route.query.prodCode
				  	},
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
				  	"pkgNo": this.$route.query.orderNo
				}
    			Indicator.open();
    			console.log(JSON.stringify(orderInfo))
    			this.$http.post(this.$store.state.link+'/trd/uc/v1/underwrite', orderInfo)
				.then(res =>{
				    console.log(res.data);
				    Indicator.close();
					let dataCode = res.data.code;
					let dataPayStatus = res.data.output.uwStatus;
					if (dataCode == "SYS_S_000") {
						if (dataPayStatus == this.$store.state.orderState.PREP) {
							this.$router.push('/payInfo?prodCode='+this.$route.query.prodCode+'&prodNo='+this.$route.query.prodNo+'&orderNo='+this.$route.query.orderNo+'&cmpCode='+this.$route.query.cmpCode+'&userName='+this.policyHolderName)
						}else if (dataPayStatus == this.$store.state.orderState.AUF) {
							this.$router.push('/UWfail?prodCode='+this.$route.query.prodCode+'&prodNo='+this.$route.query.prodNo+'&orderNo='+this.$route.query.orderNo+'&cmpCode='+this.$route.query.cmpCode+'&message='+res.data.output.message)
						}else{
							Toast(res.data.output.message);
							console.log(res.data.output.message);
						}
					}else{
						Toast(res.data.desc);
					}
				},res =>{
					Indicator.close();
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
	.disnone{
		display: none;
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
		height: 1.78rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputGrop {
		height: 0.88rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputLabel {
		display: block;
		width: 2.04rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
	}
	.inputText {
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
	}
	select{
		padding: 0;
		margin: 0;
		border: none;
		background: none;
		outline: none;
	}
	.dateBox {
		display: block;
		height: 0.88rem;		
		padding: 0 0.26rem;
		line-height: 0.88rem;
		border-left: solid 0.02rem #C8C7CC;
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
	}
	.inputText1 {
		display: inline-block;
		width: 2rem;
		margin-right: 0.2rem;
		font-size: 0.28rem;
		color: #666666;
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
	.prodName {
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.34rem;
		color: #222222;
		font-weight: bold;
	}
	.threeBox {
		margin-top: 0.4rem;
		padding: 0.15rem 0.4rem 0.05rem 0.4rem;
		background: #FFFFFF;
	}
	.threeBox .inputGrop:last-child {
		border: none;
	}
	.twoCon .inputGrop:last-child {
		border: none;
	}
	.twoCon1 {
		margin-top: 0.4rem;
	}
	.borderNone {
		border: none;
	}
	.benP {
		height: 0.15rem;
		background: #F3F3F3;
	}
	.benDivBox .benDiv:last-child .benP {
		display: none;
	}	
	.maxInput {
		max-width: 4.66rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.maxGroup {
		max-width: 6.7rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.popupBox {
		width: 100%;
		background: #FFFFFF;
	}
	.spanGroup {
		display: block;
		padding: 0 0.4rem;
	}
	.sSpan1 {
		display: block;
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
		color: #666666;
		overflow: hidden;
		border-bottom: solid 0.01rem #C8C7CC;
		background: none;
		background: url(/static/img/detail.png) no-repeat right center;
		background-size: 0.45rem 0.45rem;
	}
	.popupBox .sSpan1:last-child{
		border: none;
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
</style>