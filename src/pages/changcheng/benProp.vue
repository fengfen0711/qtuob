<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="twoCon">
			<p class="title_twoCon title clearFloat">
				<label class="title_twoCon2 left">受益人信息</label>
				<span class="title_twoCon1 left">最多可添加三个身故受益人</span>
			</p>
		</div>
		<div class="twoCon1">
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">身故受益人类型</label>
				<select class="inputText inputWidth left" v-model="benType" @change="changeType(1,benType)">
					<option value="F">法定受益人</option>
					<option value="T">投保人</option>
					<option value="Q">其他</option>
				</select>
			</p>
		</div>
		<BenPropChild v-if="benType=='Q'" ref="benPropChild" :dealtbData="dealtbData" :addIndex="addIndex" @deletId="deletBen" :addBen="addBen" v-for="(item,index) in addBen" :key="item.key" :item="item" :index="index"></BenPropChild>
		<p  class="pushBox" v-if="addBen.length<3&&benType=='Q'">  
				<span @click="addBeneficiary(addBen.length,1)" class="pushBtn" >继续添加身故受益人</span>
		</p>
		<p  class="pushBox" v-if="addBen.length==3">  
		</p>
		<div class="twoCon1">
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">生存受益人类型</label>
				<select class="inputText inputWidth left" v-model="benType1" @change="changeType(2,benType1)">
					<option value="SF">被保险人</option>
					<option value="ST">投保人</option>
					<option value="SQ">其他</option>
				</select>
			</p>
		</div>
		<BenPropChild v-if="benType1=='SQ'" ref="benPropChild" :dealtbData="dealtbData" :addIndex="addIndex" @deletId="deletBen" :addBen="saveBen" v-for="(item1,index1) in saveBen" :key="item1.key" :item="item1" :index="index1"></BenPropChild>
		<p  class="pushBox" v-if="saveBen.length<3&&benType1=='SQ'">  
				<span @click="addBeneficiary(saveBen.length,2)" class="pushBtn" >继续添加生存受益人</span>
		</p>
		<p  class="pushBox" v-if="saveBen.length==3">  
		</p>
		<p class="btnBox">
			<span class="btn btn1" @click="toInsuredPerson">上一步</span>
			<span class="btn" @click="toGaozhi">下一步</span>
		</p>
	</div>
</template>

<script>
	import BenPropChild from './benPropChild.vue'
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
import Vue from 'vue';
	export default {
		name: "ben",
		data() {
			return {
				sexShow:true,
				longShow:true,
				policyHolderShow:true,
				benType:'F',
				benType1:'SF',
				addIndex: false,
				addFlag: true, //添加受益人按钮
				addNumber: 0, //受益人的下标
				alldata:[],
				addBen:[],
				saveBen:[],
			}
		},
		created() {
			console.log("%c","color:red;",utils.utilsPlugin.calcAge(new Date("2016-09-09"),new Date()))
			//受益人数据回显
			this.initinto()
			
		},
		updated() {

		},
		methods: {
			changeType(type,benType){
				if(type==1){
					if(benType=="Q")
					this.addBen = []
					this.addBen = [{//受益人返回信息 (string, optional)
					"title": "身故受益人",//自加title
					"address": "",//地址街道
					"addressTypeNo": "",//地址序号
					"age": "",//(integer, optional)年龄
					"birthday": "",//出生年月: 格式yyyy-MM-dd
					"bnfGrade": "",//受益人级别
					"bnfName": "",//受益人姓名
					"bnfNo": "",//受益人编号
					"bnfSeq": "1",//(integer, optional)受益顺序 
					"bnfShare": "",//(number, optional)受益比例: 整数如50%则传50
					"bnfType": "1",//受益人类别
					"certfCode": "",//证件号码
					"certfEndTime": "",//证件有效期: 格式yyyy-MM-dd
					"certfEnduringFlag": "",//证件长期有效标志: Y-是;N-否
					"certfType": "",//证件类型
					"city": "",//地址市
					"county": "",//地址区县
					"email": "",//邮箱
					"fullAddr": "",//详细地址
					"gender": "",//性别: M-男;F-女
					"mobile": "",//联系电话
					"nationality": "",//国籍
					"occName": "",//职业名称
					"occNo": "",//职业名称代码
					"province": "",//地址省
					"rapidType": "",//速填标记
					"relatoInsured": "",//受益人与被保人关系 
					"tel": "",//固定电话 
					"zipCode": "",//邮编
				}]
				}else if(type==2){
					if(benType=="SQ")
					this.saveBen = []
					this.saveBen = [{//受益人返回信息 (string, optional)
						"title": "生存受益人",//自加title
						"address": "",//地址街道
						"addressTypeNo": "",//地址序号
						"age": "",//(integer, optional)年龄
						"birthday": "",//出生年月: 格式yyyy-MM-dd
						"bnfGrade": "",//受益人级别
						"bnfName": "",//受益人姓名
						"bnfNo": "",//受益人编号
						"bnfSeq": "1",//(integer, optional)受益顺序 
						"bnfShare": "",//(number, optional)受益比例: 整数如50%则传50
						"bnfType": "2",//受益人类别
						"certfCode": "",//证件号码
						"certfEndTime": "",//证件有效期: 格式yyyy-MM-dd
						"certfEnduringFlag": "",//证件长期有效标志: Y-是;N-否
						"certfType": "",//证件类型
						"city": "",//地址市
						"county": "",//地址区县
						"email": "",//邮箱
						"fullAddr": "",//详细地址
						"gender": "",//性别: M-男;F-女
						"mobile": "",//联系电话
						"nationality": "",//国籍
						"occName": "",//职业名称
						"occNo": "",//职业名称代码
						"province": "",//地址省
						"rapidType": "",//速填标记
						"relatoInsured": "",//受益人与被保人关系 
						"tel": "",//固定电话 
						"zipCode": "",//邮编
					}]
				}else{
					console.log("改变受益人类型数据出错");
					
				}
			},
			initinto(){
				var data = {
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode
					},
					"opt": "APPL,MAIN,BNF,INSRNT",
					"pkgNo": this.$route.query.orderNo, //订单号
				}
				console.log(JSON.stringify(data))
				this.$http.post(this.$store.state.link6 + '/order/v1/queryorder', data)
					.then(res => {
						console.log(JSON.parse(JSON.stringify(res.data)));
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.alldata = res.data.output
							let alldatals = res.data.output
							if(alldatals.bnfResp.length > 0){
								alldatals.bnfResp.forEach(element => {
									if(element.bnfType=="1"){//身故受益人
										console.log("%c 身故受益人+1","color:red;",)
										this.benType = "Q"
										element.title = "身故受益人"
										this.addBen.push(element)
									}else if(element.bnfType=="2"){//生存受益人
										console.log("%c 生存受益人+1","color:red;",)
										this.benType1 = "SQ"
										element.title = "生存受益人"
										this.saveBen.push(element)
									}else{
										console.log("回显受益人类型数据有误")
									}
								});
							}
							if(alldatals.mainResp.lowFlag){
								let arrls = alldatals.mainResp.lowFlag.split("-")
								if(arrls&&arrls.length==2){
									this.benType=arrls[0]
									this.benType1=arrls[1]
								}else{
									this.benType='Q'
									this.benType1='ST'
								}
							}else{
								this.benType='F'
								this.benType1='SF'
								this.benType='Q'
								this.benType1='ST'
							}
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						console.log(res.data);
					})
			},
			toInsuredPerson(){
				window.history.go(-1)
			},
			dealtbData(resp,is,type,where,index){
				let lsben = {}
				lsben.title = type=="1"?"身故受益人":"生存受益人"
				lsben.bnfName = this.alldata[resp].applName
				lsben.gender = this.alldata[resp].gender
				lsben.birthday = this.alldata[resp].birthday
				lsben.bnfSeq = is==1?"1":""
				lsben.bnfShare = is==1?100:""
				lsben.bnfType = type
				lsben.relatoInsured = this.alldata[resp].relationToInsured
				lsben.certfType = this.alldata[resp].certfType
				lsben.certfCode = this.alldata[resp].certfCode
				lsben.certfEnduringFlag = this.alldata[resp].certfEnduringFlag
				lsben.certfEndTime = this.alldata[resp].certfEndTime
				lsben.nationality = this.alldata[resp].nationality
				lsben.occName = this.alldata[resp].occName
				lsben.occNo = this.alldata[resp].occNo
				lsben.mobile = this.alldata[resp].mobile
				lsben.province = this.alldata[resp].province
				lsben.city = this.alldata[resp].city
				lsben.county = this.alldata[resp].county
				lsben.fullAddr = this.alldata[resp].fullAddr
				if(where==1){
					// if (type==1) {
					// 	Vue.set(this.addBen,index,lsben)
					// } else if(type==2){
					// 	Vue.set(this.saveBen,index,lsben)
					// }
					Vue.set(this[(type==1?"addBen":"saveBen")],index,lsben)
				}else if(where==2){//地址序号功能，复制地址
					lsben = this[type==1?"addBen":"saveBen"][index]
					lsben.province = this.alldata[resp].province
					lsben.city = this.alldata[resp].city
					lsben.county = this.alldata[resp].county
					lsben.fullAddr = this.alldata[resp].fullAddr
					Vue.set(this[type==1?"addBen":"saveBen"],index,lsben)
				}else if(where==3){//置空
					lsben = this[type==1?"addBen":"saveBen"][index]
					// lsben.title = type=="1"?"身故受益人":"生存受益人"
					lsben.bnfName = ""
					// lsben.gender = this.alldata[resp].gender
					lsben.birthday = ""
					// lsben.bnfSeq = is==1?"1":""
					// lsben.bnfShare = is==1?100:""
					// lsben.bnfType = type
					// lsben.relatoInsured = this.alldata[resp].relationToInsured
					lsben.certfType = ""
					lsben.certfCode = ""
					lsben.certfEnduringFlag = ""
					lsben.certfEndTime = ""
					// lsben.nationality = ""
					lsben.occName = ""
					lsben.occNo = ""
					lsben.mobile = ""
					lsben.province = ""
					lsben.city = ""
					lsben.county = ""
					lsben.fullAddr = ""
					Vue.set(this[type==1?"addBen":"saveBen"],index,lsben)
				}
				return lsben
			},
			goSave(){
				console.log(JSON.parse(JSON.stringify(this.addBen)))
				let addBen=[]
				let saveBen=[]
				let benType = "A"
				let benType1 = "A"
				if(this.benType=="F"){//法定

				}else if(this.benType=="T"){//投保人
					let lsben = this.dealtbData("applntResp",1,1)
					addBen.push(lsben)
					benType = "B"
				}else if(this.benType=="Q"){//其他
					addBen = this.addBen
					benType = "C"
				}
				if(this.benType1=="SF"){//被保人
					let lsben = this.dealtbData("insrntResp",1,2)
					saveBen.push(lsben)
				}else if(this.benType1=="ST"){//投保人
					let lsben = this.dealtbData("applntResp",1,2)
					saveBen.push(lsben)
					benType1 = "B"
				}else if(this.benType1=="SQ"){//其他
					saveBen = this.saveBen
					benType1 = "C"
				}
				var msg2 = {
					"agentCode": "test",
					"agentName": "test", //代理人名称 
					"deptCode": "000095",
					"agentDeptCode": "长城人寿保险", //代理机构
					// "amnt": this.covermoney,
					"cmpCode": this.$route.query.cmpCode,
					// "prem": this.coverage,
					"prodCode": this.$route.query.prodCode,
					// "prodName": this.plantename,
					"prodNo": this.$route.query.prodNo,
					// "sumAmnt": this.covermoney, //保额合计 ,
					// "sumPrem": this.coverage, //保费合计 
					// "lowFlag1": "A", //法定受益人标识 A-是;B-否 
					"lowFlag": benType+"-"+benType1, //法定受益人标识 A-是;B-否 
					"userId": this.$store.state.userId
				}
				var data = {
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode,
					},
					"mark": "CALC",
					//订单节点信息,MAIN-基本信息;APPL-投保人信息;INSRNT-被保人信息;BNF-受益人信息;CVRG-险种信息;DUTY-责任信息;APPLNOT-投保人告知信息;INSNOT-被保人告知信息;SPEC-特约信息;TAX-纳税人信息;PAY-支付信息;DOC-影像信息 ,
					"opt": "BNF,MAIN",
					"pkgNo": this.$route.query.orderNo,
					"bnfReq": addBen.concat(saveBen),
					"mainReq": msg2
				}
				Indicator.open();
				console.log(JSON.stringify(data))
				this.$http.post('http://192.168.171.12:9009' + '/order/v1/saveorder', data)
					.then(res => {
						Indicator.close();
						console.log(res.data);
						if (res.data.code == "SYS_S_000") {
							this.$router.push('/insuranceProducts?prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode + '&occupation=' + this.occupation + '&occupaCode=' + this.occupaCode + '&occupation1=' + this.occupation1 + '&occupaCode1=' + this.occupaCode1 + '&appName=' + this.appName + '&appNamea=' + this.appNamea);
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						Indicator.close();
						//console.log(res.data);
					})
			},
			toGaozhi(){
				if(this.benType=="Q" || this.benType1=="SQ"){
					let errorMessage = ""
					for (let index = 0; index < this.$refs.benPropChild.length; index++) {
						errorMessage = this.$refs.benPropChild[index].toGaozhi("lll")
						if(!errorMessage)break
					}
					if(errorMessage==true){
						console.log("下一步")
						this.goSave()
					}
					console.log(errorMessage)
				}else{
					if(false&&this.benType=="T"){
						Toast("投、被保险人是同一人时，身故受益人不能选择投保人")
						return
					}
					console.log("下一步")
					this.goSave()
				}
			},
			addBeneficiary(index,isben) {
				let lsben = {
					"title": "",//自加title
					"address": "",//地址街道
					"addressTypeNo": "",//地址序号
					"age": "",//(integer, optional)年龄
					"birthday": "",//出生年月: 格式yyyy-MM-dd
					"bnfGrade": "",//受益人级别
					"bnfName": "",//受益人姓名
					"bnfNo": "",//受益人编号
					"bnfSeq": this.addBen.length+1,//(integer, optional)受益顺序 
					"bnfShare": "",//(number, optional)受益比例: 整数如50%则传50
					"bnfType": "",//受益人类别
					"certfCode": "",//证件号码
					"certfEndTime": "",//证件有效期: 格式yyyy-MM-dd
					"certfEnduringFlag": "",//证件长期有效标志: Y-是;N-否
					"certfType": "",//证件类型
					"city": "",//地址市
					"county": "",//地址区县
					"email": "",//邮箱
					"fullAddr": "",//详细地址
					"gender": "",//性别: M-男;F-女
					"mobile": "",//联系电话
					"nationality": "",//国籍
					"occName": "",//职业名称
					"occNo": "",//职业名称代码
					"province": "",//地址省
					"rapidType": "",//速填标记
					"relatoInsured": "",//受益人与被保人关系 
					"tel": "",//固定电话 
					"zipCode": "",//邮编
				}
				if(isben==1){
					lsben.title = "身故受益人"
					lsben.bnfType = "1"
					this.addBen.push(lsben)
				}else{
					lsben.title = "生存受益人"
					lsben.bnfType = "2"
					this.saveBen.push(lsben)
				}
			},
			deletBen(...data) {
				for(var i = 0; i < this.addBen.length; i++) {
					if(this.addBen[i].id == data[0]) {
						this.addBen.splice(i, 1);
					}
				}
				if(this.addBen.length < 3) {
					this.addFlag = false;
				}
			},
			genderClick() {
				if(this.sexShow) {
					this.sexShow = false
				} else {
					this.sexShow = true
				}
			},
			genderClick1() {
				if(this.sexShow) {
					this.sexShow = false
				} else {
					this.sexShow = true
				}
			},
			sexClick() {
				if(this.longShow) {
					this.longShow = false
					this.term = false
				} else {
					this.longShow = true
					this.term = true
				}
			},
		},
		components: {
			BenPropChild: BenPropChild
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
	
	input,
	button {
		background: none;
		border: none;
	}
	
	input,
	button {
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
	
	textarea::-webkit-input-placeholder,
	input::-webkit-input-placeholder {
		color: #B2B2B2;
	}
	
	input:-ms-input-placeholder {
		color: #B2B2B2;
	}
	
	select {
		padding-right: 0.48rem;
		border: none;
		background: none;
		background: url(/static/upDown.png) no-repeat right center;
		background-size: 0.4rem 0.45rem;
		outline: none;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}
	.star {
		display: inline-block;
		width: 0.15rem;
		color: #C9141E;
	}
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	
	.one {
		position: absolute;
		width: 100%;
		min-height: 100%;
		background: #F3F3F3;
		/*background: #FFFFFF;*/
	}
	
	.twoCon {
		margin-top: 0.4rem;
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
	}
	.twoCon1 {
		/*margin-top: 0.4rem;*/
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
	}
	.one .twoCon:first-child {
		margin-top: 0;
	}
	
	.title_twoCon {
		padding: 0 0.4rem;
		height: 0.84rem;
		line-height: 0.84rem;
		/*padding-top: 0.28rem;*/
		font-size: 0.32rem;
		font-weight: bold;
		color: #222222;
	}
	.title{
		padding: 0rem;
	}
	.title_twoCon1 {
		padding: 0;
		margin-left: 0.2rem;
		font-size: 0.28rem;
		color: #EB7760;
	}
	
	.inputGrop {
		position: relative;
		height: 0.88rem;
		font-size: 0.28rem;
		/*border-bottom: solid 0.01rem #C8C7CC;*/
	}
	.inputGrop1 {
		position: relative;
		height: 0.88rem;
		font-size: 0.28rem;
		/*border-bottom: solid 0.01rem #C8C7CC;*/
	}
	.inputLabel {
		display: block;
		width: 3.22rem;
		height: 0.88rem;
		line-height: 0.88rem;
		color: #555555;
	}
	
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
	}
	
	.inputWidth {
		width: 3.48rem;
	}
	
	.twoCon .inputGrop:last-child {
		border-bottom: none;
	}
	
	.pushBox {
		margin: 0.4rem 0;
	}
	.kong{
		height: 0.4rem;
		background: #f3f3f3;
		width: 100%;
	}
	.pushBtn {
		display: block;
		width: 100%rem;
		height: 0.88rem;
		line-height: 0.88rem;
		margin: 0 auto;
		font-size: 0.28rem;
		font-weight: bold;
		color: #C9141E;
		background: #FFFFFF;
		border-radius: 0.16rem;
		text-align: center;
	}
	.sexImg {
		float: left;
		display: inline-block;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: 0.2rem;
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
	}
	
	.sexM {
		margin-right: 0.46rem;
	}
	.inputSpan {
		/*display: inline-block;*/
		line-height: 0.88rem;
	}
	.btnBox {
		padding-top: 0.92rem;
		padding-bottom: 1.16rem;
		text-align: center;
	}
	
	.btn {
		display: inline-block;
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.32rem;
		border: 0.02rem solid #C9141E;
		border-radius: 0.88rem;
		background: #C9141E;
		color: #FFFFFF;
		text-align: center;
	}
	
	.btn1 {
		background: none;
		border: 0.02rem solid #C9141E;
		color: #C9141E;
		margin-right: 0.3rem;
	}
	.dateB {
		position: absolute;
		right: 0;
		top: 0rem;
		z-index: -1;
		/*下箭头隐藏变1*/
		width: 0.5rem;
		height: 0.88rem;
		background: #FFFFFF;
	}
	.upDownImg {
		width: 0.4rem;
		height: 0.44rem;
		margin-top: 0.2rem;
	}
</style>