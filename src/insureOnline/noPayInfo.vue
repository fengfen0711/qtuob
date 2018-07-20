<template>
	<div class="one">
		<div class="threeBox">
			<p class="prodName" v-model="orderno">{{orderno}}</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">订单编号</label>
				<span class="inputText right" v-model="ordernamae">{{ordernamae}}</span>
			</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">订单时间</label>
				<span class="inputText right" v-model="ordertime">{{ordertime}}</span>
			</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">订单状态</label>
				<span class="inputText right" v-model="orderstatus">{{orderstatus}}</span>
			</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">保单号</label>
				<span class="inputText right" v-model="policyno">{{policyno}}</span>
			</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">保险费(元)</label>
				<span class="inputText right" v-model="premiums">{{premiums}}</span>
			</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">保单起期</label>
				<span class="inputText right" v-model="insuranpolicyof">{{insuranpolicyof}}</span>
			</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">保单讫期</label>
				<span class="inputText right" v-model="completion">{{completion}}</span>
			</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">保险期限</label>
				<span class="inputText right" v-model="policyperio">{{policyperio}}</span>
			</p>
			<!--<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">承保时间</label>
				<span class="inputText right" v-model="insurancetime">{{insurancetime}}</span>
			</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">生效时间</label>
				<span class="inputText right" v-model="effecttime">{{effecttime}}</span>
			</p>
			<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">保险期间</label>
				<span class="inputText right" v-model="endtime">{{endtime}}</span>
			</p>-->
			<!--<p class="inputGrop1 clearFloat">
				<label class="inputLabel left">购买数量</label>
				<span class="inputText right" v-model="quantity">{{quantity}}</span>
			</p>-->
		</div>
		<p class="payTitle"></p>
		<div class="twoCon">
			<p class="title_twoCon clearFloat" :class="{borderNone:show1}">
				<label class="titleLable_twoCon left">投保人信息</label>
				<img src="/static/leftImg.png" class="btnImg right" v-show="show1" @click="showHide" />
				<img src="/static/downImg.png" class="btnImg right" v-show="!show1" @click="showHide" />
			</p>
			<div class="policyHolder" v-show="!show1">
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">姓名</label>
					<span class="inputText left" v-model="nameapplicant">{{nameapplicant}}</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">性别</label>
					<span class="inputText left" v-model="sexplicant">{{sexplicant}}</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">证件类型</label>
					<span class="inputText left" v-model="documenttype">{{documenttype}}</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">证件号码</label>
					<span class="inputText left" v-model="cardnum">{{cardnum}}</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">证件有效期至</label>
					<span class="inputText left" v-model="certificate">{{certificate}}</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">出生日期</label>
					<span class="inputText left" v-model="birthday">{{birthday}}</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">手机号码</label>
					<span class="inputText left" v-model="phonenum">{{phonenum}}</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">邮箱</label>
					<span class="inputText left" v-model="eamil">{{eamil}}</span>
				</p>
				<div class="inputGrop">
					<label class="inputLabel  left">联系地址</label>
					<p class="selectBox clearFloat maxInput" style="width: 4rem; display: inline-block;">
						<span class="inputText  " v-model="province">{{province}}</span>
						<span class="inputText " v-model="city">{{city}}</span>
						<span class="inputText " v-model="county">{{county}}</span>
					</p>
				</div>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left ">详细地址</label>
					<span class="inputText maxInput left" v-model="detailaddres">{{detailaddres}}</span>
				</p>
				<!--<p class="inputGrop clearFloat">
					<label class="inputLabel left ">与被保险人关系</label>
					<span class="inputText maxInput left" v-model="relationship">{{relationship}}</span>
				</p>-->
			</div>
		</div>
		<div class="twoCon twoCon1">
			<p class="title_twoCon clearFloat" :class="{borderNone:show2}">
				<label class="titleLable_twoCon left">被保险人信息</label>
				<img src="/static/leftImg.png" class="btnImg right" v-show="show2" @click="showHide1" />
				<img src="/static/downImg.png" class="btnImg right" v-show="!show2" @click="showHide1" />
			</p>
			<div class="recognizee" v-show="!show2">
				<p class="inputGrop clearFloat" :class="{borderNone:!recognizeeChild}">
					<label class="inputLabel left">与投保人关系</label>
					<span class="inputText left" v-model="relefirder">{{relefirder}}</span>
				</p>
				<div class="recognizeeChild" v-show="recognizeeChild">
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">姓名</label>
						<span class="inputText left" v-model="insuredName">{{insuredName}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">性别</label>
						<span class="inputText left" v-model="insuredName">{{noPaysex}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">证件类型</label>
						<span class="inputText left" v-model="certfType">{{certfType}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">证件号码</label>
						<span class="inputText left" v-model="beicardnum">{{beicardnum}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">证件有效期至</label>
						<span class="inputText left" v-model="beidata">{{beidata}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">出生日期</label>
						<span class="inputText left" v-model="beibirthday">{{beibirthday}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">手机号码</label>
						<span class="inputText left">{{beipnome}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">身高（cm）</label>
						<span class="inputText left" v-model="insuredheight">{{insuredheight}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">体重（kg）</label>
						<span class="inputText left" v-model="insuredweight">{{insuredweight}}</span>
					</p>
					<!--<p class="inputGrop clearFloat">
						<label class="inputLabel left">职业大类</label>
						<span class="inputText left" v-model="insuredpersons">{{insuredpersons}}</span>
					</p>-->
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">职业类别</label>
						<span class="inputText left" v-model="insuredclass">{{insuredclass}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">职业代码</label>
						<span class="inputText left" v-model="insuredsmall">{{insuredsmall}}</span>
					</p>
					<!--<p class="inputGrop clearFloat">
						<label class="inputLabel left">推荐人编码</label>
						<span class="inputText left" v-model="sponsorencodes">{{sponsorencodes}}</span>
					</p>-->
				</div>
			</div>
		</div>
		<div class="twoCon">
			<div v-if="!beneficiary">
				<p class="title_twoCon1 clearFloat">
					<label class="titleLable_twoCon left">法定受益人</label>
				</p>
			</div>
			<div v-if="beneficiary">
				<p class="title_twoCon clearFloat" :class="{borderNone:show3}">
					<label class="titleLable_twoCon left">指定受益人</label>
					<img src="/static/leftImg.png" class="btnImg right" v-show="show3" @click="showHide2" />
					<img src="/static/downImg.png" class="btnImg right" v-show="!show3" @click="showHide2" />
				</p>
				<div class="policyHolder" v-show="!show3" v-for="(item,index) in bnfResp" style="">
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">受益人{{index+1}}</label>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">与被保人关系</label>
						<span class="inputText left">{{item.relatoInsured}}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">姓名</label>
						<span class="inputText left">{{item.bnfName }}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">证件类型</label>
						<span class="inputText left">{{item.certfType }}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">证件号码</label>
						<span class="inputText left">{{item.certfCode }}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">证件有效期至</label>
						<span class="inputText left">{{item.certfEndTime }}</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">出生日期</label>
						<span class="inputText left">{{item.birthday}}</span>
					</p>
					<!--<p class="inputGrop clearFloat">
					<label class="inputLabel left">手机号码</label>
					<span class="inputText left">{{item.mobile}}</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">邮箱</label>
					<span class="inputText left">{{item.email}}</span>
				</p>-->
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">受益份额</label>
						<span class="inputText left">{{item.bnfShare}}%</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">受益顺序</label>
						<span class="inputText left">{{item.bnfSeq}}</span>
					</p>
				</div>
			</div>

		</div>

		<div class="twoCon twoCon1" v-show="ordersattus" >
			<p class="title_twoCon clearFloat" :class="{borderNone:show4}">
				<label class="titleLable_twoCon left">核保描述</label>
				<img src="/static/leftImg.png" class="btnImg right" v-show="show4" @click="hiddenshow" />
				<img src="/static/downImg.png" class="btnImg right" v-show="!show4" @click="hiddenshow" />
			</p>
			<div class="recognizee" v-show="!show4">
				<p class="inputGropno clearFloat" :class="{borderNone:!recognizeeChild}">
					<span class="inputText11 left" v-model="orderdescrip">{{orderdescrip}}</span>
				</p>
			</div>
		</div>
		<div class="iconBox" id="tab1_all" >
			<div class="nochange" id="tab1" v-if="changenow" @click="changenum">
				修改
			</div>
			<div class="nochange" id="tab2" v-if="paynow" @click="nopay">
				支付
			</div>
			<div class="nochange" id="tab3" v-if="deletenow" @click="deleteno">
				撤单
			</div>
			<div class="nochange" id="tab4" v-if="single" @click="singledan">
				出单
			</div>
			<div class="nochange" id="tab5" v-if="receipt" @click="seereceipt">
				回执
			</div>
			<div class="nochange" id="tab6" v-if="accompany" @click="accompanying">
				补充资料
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	import { MessageBox } from 'mint-ui'
	export default {
		name: "NoPayInfo",
		data() {
			return {
				beneficiary: true,
				changenow: false,
				paynow: false,
				deletenow: false,
				single: false,
				receipt: false,
				accompany:false,
				show1: false,
				show2: false,
				show3: false,
				show4:false,
				ordersattus:false,
				nexus: '本人',
				recognizeeChildShow: true,
				minPrice: '1000',
				recognizeeChild: false,
				orderno: "",
				ordernamae: "",
				orderstatus: "",
				policyno: "",
				premiums: "",
				insurancetime: "",
				effecttime: "",
				endtime: "",
				quantity: "",
				nameapplicant: "",
				documenttype: "",
				cardnum: "",
				certificate: "",
				birthday: "",
				phonenum: "",
				eamil: "",
				province: "",
				city: "",
				county: "",
				detailaddres: "",
				relefirder: "",
				insuredName: "",
				certfType: "",
				beicardnum: "",
				beidata: "",
				beibirthday: "",
				beipnome: "",
				insuredheight: "",
				insuredweight: "",
				insuredpersons: "",
				insuredclass: "",
				insuredsmall: "",
				sponsorencodes: "",
				namedbeneficiary: "",
				beneficiarycard: "",
				beneficiarynumber: "",
				beneficiaryvalid: "",
				birthbeneficiary: "",
				cellnumber: "",
				beneficiarymailbox: "",
				beneficiaryinformation: "",
				revenueshare: "",
				information: [],
				bnfResp: [], //受益人
				prodNo: "",
				allData: [],
				orderdescrip:"",
				replation:"",
				sexplicant:"",
				relationship:"",
				noPaysex:"",
				ordertime:"", //订单时间
				insuranpolicyof :"",  //保单起期
				completion:"", //保单讫期
				policyperio:"", //保障期限
				cvrgResp:[],  //主险数组
				agentName:"" , //代理人姓名
				agentCode:"",  //代理人代码
				zipCode:"" ,  //邮编
				serviceAddress:"" , //服务地址
				applNo:""  //投保单号

			}
		},
		created() {
			this.nopayclick();
			

		},
		methods: {
			nopayclick(){
				var data = {
				"head": {
					"channelCode": "qtb_h5",
					"deptCode": this.$route.query.deptCode,
					"oprCode": this.$store.state.userId,
					"prodCode": this.$route.query.prodCode
				},
				"userId": this.$store.state.userId,
				"token": this.$store.state.token,
				//				"opt": "MAIN,APPL,INSRNT,BNF",
				"opt": "ALL",
				"pkgNo": this.$route.query.pkgNo

			}
			console.log(data);
			Indicator.open();

			this.$http.post(this.$store.state.link + "/trd/order/v1/queryorder", data).then(response => {
				console.log(response.data);
				Indicator.close();
				if(response.data.code == "SYS_S_000") {
					this.allData = response.data.output; //总数据
					this.prodNo = response.data.output.mainResp.prodNo;
					this.agentCode=response.data.output.mainResp.agentCode; //代理人代码
					this.cvrgResp=response.data.output.cvrgResp
					this.applNo=response.data.output.mainResp.applNo
					this.serviceAddress=response.data.output.mainResp.serviceAddress
				    if(response.data.output.mainResp.hasOwnProperty("deptDesc")==true){
				    	this.orderdescrip=response.data.output.mainResp.deptDesc;
				    	this.ordersattus=true;
				    	
				    }else{
				    	this.ordersattus=false;
				    }
					this.agentName=response.data.output.mainResp.agentName //代理人姓名
					this.information = response.data.output.applntResp //投保人信息
					this.bnfResp = response.data.output.bnfResp;
					this.zipCode=response.data.output.applntResp.zipCode  //投保人邮编
					for(var i=0;i<this.bnfResp.length;i++){
						
						if(response.data.output.mainResp.cmpCode == "000034"){
							if(this.bnfResp[i].relatoInsured=="00"){
								this.bnfResp[i].relatoInsured="本人";
							}else if(this.bnfResp[i].relatoInsured=="31"){
								this.bnfResp[i].relatoInsured="父母";
							}
							else if(this.bnfResp[i].relatoInsured=="32"){
								this.bnfResp[i].relatoInsured="儿女";
							}else if(this.bnfResp[i].relatoInsured=="33"){
								this.bnfResp[i].relatoInsured="配偶";
							}else if(this.bnfResp[i].relatoInsured=="07"){
								this.bnfResp[i].relatoInsured="祖父";
							}else if(this.bnfResp[i].relatoInsured=="08"){
								this.bnfResp[i].relatoInsured="祖母";
							}else if(this.bnfResp[i].relatoInsured=="09"){
								this.bnfResp[i].relatoInsured="孙子";
							}else if(this.bnfResp[i].relatoInsured=="10"){
								this.bnfResp[i].relatoInsured="孙女";
							}else if(this.bnfResp[i].relatoInsured=="11"){
								this.bnfResp[i].relatoInsured="外祖父";
							}else if(this.bnfResp[i].relatoInsured=="12"){
								this.bnfResp[i].relatoInsured="外祖母";
							}else if(this.bnfResp[i].relatoInsured=="13"){
								this.bnfResp[i].relatoInsured="外孙";
							}else if(this.bnfResp[i].relatoInsured=="14"){
								this.bnfResp[i].relatoInsured="外孙女";
							}else if(this.bnfResp[i].relatoInsured=="15"){
								this.bnfResp[i].relatoInsured="哥哥";
							}else if(this.bnfResp[i].relatoInsured=="16"){
								this.bnfResp[i].relatoInsured="姐姐";
							}else if(this.bnfResp[i].relatoInsured=="17"){
								this.bnfResp[i].relatoInsured="弟弟";
							}else if(this.bnfResp[i].relatoInsured=="18"){
								this.bnfResp[i].relatoInsured="妹妹";
							}else if(this.bnfResp[i].relatoInsured=="19"){
								this.bnfResp[i].relatoInsured="公公";
							}else if(this.bnfResp[i].relatoInsured=="21"){
								this.bnfResp[i].relatoInsured="岳父";
							}else if(this.bnfResp[i].relatoInsured=="22"){
								this.bnfResp[i].relatoInsured="岳母";
							}else if(this.bnfResp[i].relatoInsured=="23"){
								this.bnfResp[i].relatoInsured="儿媳";
							}else if(this.bnfResp[i].relatoInsured=="24"){
								this.bnfResp[i].relatoInsured="女婿";
							}else if(this.bnfResp[i].relatoInsured=="25"){
								this.bnfResp[i].relatoInsured="其他亲属";
							}else if(this.bnfResp[i].relatoInsured=="26"){
								this.bnfResp[i].relatoInsured="同事";
							}else if(this.bnfResp[i].relatoInsured=="27"){
								this.bnfResp[i].relatoInsured="朋友";
							}else if(this.bnfResp[i].relatoInsured=="28"){
								this.bnfResp[i].relatoInsured="雇主";
							}else if(this.bnfResp[i].relatoInsured=="29"){
								this.bnfResp[i].relatoInsured="雇员";
							}else if(this.bnfResp[i].relatoInsured=="30"){
								this.bnfResp[i].relatoInsured="其他";
							}
							
						}else if(response.data.output.mainResp.cmpCode == "000303"){
							if(this.bnfResp[i].relatoInsured=="00"){
								this.bnfResp[i].relatoInsured="本人";
							}else if(this.bnfResp[i].relatoInsured=="01"){
								this.bnfResp[i].relatoInsured="父母";
							}else if(this.bnfResp[i].relatoInsured=="02"){
								this.bnfResp[i].relatoInsured="配偶";
							}else if(this.bnfResp[i].relatoInsured=="03"){
								this.bnfResp[i].relatoInsured="子女";
							}else if(this.bnfResp[i].relatoInsured=="04"){
								this.bnfResp[i].relatoInsured="祖孙";
							}else if(this.bnfResp[i].relatoInsured=="05"){
								this.bnfResp[i].relatoInsured="监护";
							}else if(this.bnfResp[i].relatoInsured=="06"){
								this.bnfResp[i].relatoInsured="其他";
							}else if(this.bnfResp[i].relatoInsured=="07"){
								this.bnfResp[i].relatoInsured="保单服务人员";
							}
						}
					}
					
					this.orderno = response.data.output.mainResp.prodName;
					this.ordernamae = this.$route.query.pkgNo;
					this.orderstatus = response.data.output.mainResp.orderStatus;
					
					this.ordertime=response.data.output.mainResp.insertTime.substring(0,10); //订单时间
					this.insuranpolicyof=response.data.output.mainResp.plcyEffcTime; //保单起期
					
					for(var i=0;i<this.cvrgResp.length;i++){
						if(this.cvrgResp[i].cvrgType=="M"){
							if(this.cvrgResp[i].insuNo=="C1"){
								this.policyperio="保1年";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="C2"){
								this.policyperio="保2年";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="C3"){
								this.policyperio="保3年";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="C5"){
								this.policyperio="保5年";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="C10"){
								this.policyperio="保10年";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="C15"){
								this.policyperio="保15年";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="C20"){
								this.policyperio="保20年";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="C25"){
								this.policyperio="保25年";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="C30"){
								this.policyperio="保30年";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="C35"){
								this.policyperio="保35年";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="C40"){
								this.policyperio="保40年";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="D18"){
								this.policyperio="保到18岁";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="D20"){
								this.policyperio="保到20岁";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="D30"){
								this.policyperio="保到30岁";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="D40"){
								this.policyperio="保到40岁";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="D45"){
								this.policyperio="保到45岁";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="D50"){
								this.policyperio="保到50岁";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="D55"){
								this.policyperio="保到55岁";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="D60"){
								this.policyperio="保到60岁";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="D65"){
								this.policyperio="保到65岁";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="D70"){
								this.policyperio="保到70岁";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="D75"){
								this.policyperio="保到75岁";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="D79"){
								this.policyperio="保到79岁";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="D106"){
								this.policyperio="保到106岁";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="E1"){
								this.policyperio="保1月";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="E2"){
								this.policyperio="保2月";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="F1"){
								this.policyperio="保1天";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="F2"){
								this.policyperio="保2天";
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}else if(this.cvrgResp[i].insuNo=="B1"){
								this.policyperio="保终身";
								this.completion="保终身"
								
							}
							else{
								this.completion=response.data.output.mainResp.plcyInvalidTime;
							}
						}
					}
//					this.completion=response.data.output.mainResp.plcyInvalidTime;
					if(response.data.output.bnfResp.length>0){
						this.beneficiary = true
					}else{
						this.beneficiary = false
					}
					if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.AUC) {

						this.orderstatus = "自核成功";
						this.accompany=true;

					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.PAY) {
						this.orderstatus = "收费成功";
						if(response.data.output.mainResp.cmpCode == "000034") {

						} else if(response.data.output.mainResp.cmpCode == "000303") {
							this.single = true;
						}

					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.AUF) {
						this.orderstatus = "自核失败";
						this.changenow = true;

					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.AWL) {
						this.orderstatus = "已撤单";

					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.DEL) {
						this.orderstatus = "已删除";

					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.PAY_FAL) {
						this.orderstatus = "收费失败";

						this.paynow = true;
						this.deletenow = true;

					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.UDR) {
						this.orderstatus = "承保成功";

						if(response.data.output.mainResp.cmpCode == "000034") {
							this.receipt = true;
//							this.seereceipt();

						} else if(response.data.output.mainResp.cmpCode == "000303") {

						}

					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.UDR_FAL) {
						this.orderstatus = "承保失败";
						if(response.data.output.mainResp.cmpCode == "000034") {
							this.single = true;

						} else if(response.data.output.mainResp.cmpCode == "000303") {
							this.single = true;
						}

					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.PLY_CAL) {
						this.orderstatus = "退保";
					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.HPUC) {
						this.orderstatus = "人工核保中";
					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.INPAY) {
						this.orderstatus = "收费中";
					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.HUFN) {
						this.orderstatus = "人核失败并发送通知书";
					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.PLY_ER) {
						this.orderstatus = "保单生效已回执状态";
					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.OTHER) {
						this.orderstatus = "其他";
					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.HUC) {
						this.orderstatus = "人工核保成功";
					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.HPRO) {
						this.orderstatus = "人核未进核心";
					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.UDR_PAY) {
						this.orderstatus = "收费承保";
					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.COPC) {
						this.orderstatus = "犹豫期退保";
					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.CONO) {
						this.orderstatus = "暂存单";
						this.changenow = true;
					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.AUT) {
						this.orderstatus = "自核交易失败";
						this.changenow = true;
					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.HUF) {
						this.orderstatus = "人核失败";

					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.PAYT) {
						this.orderstatus = "收费交易失败";
						this.paynow = true;
						this.deletenow = true;
					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.UDRT) {
						this.orderstatus = "承保交易失败";
						this.single = true;

					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.UCS) {
						this.orderstatus = "承保收费成功";
						if(response.data.output.mainResp.cmpCode == "000034") {
							this.receipt = true;
//							this.seereceipt();
						} else if(response.data.output.mainResp.cmpCode == "000303") {

						}

					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.DECL) {
						this.orderstatus = "拒保";

					} else if(response.data.output.mainResp.orderStatus == this.$store.state.orderState.PREP) {
						this.orderstatus = "待支付";
						this.paynow = true;
						this.deletenow = true;

					}else if(response.data.output.mainResp.orderStatus == this.$store.state.PAY_OUT){
						if(response.data.output.mainResp.cmpCode == "000303"){
							this.orderstatus = "支付超时";
							Toast("该订单已超时");
						}
					}else if(response.data.output.mainResp.orderStatus== this.$store.state.AUS){
						this.orderstatus = "该订单已核保成功";
						this.accompany=true;
					}else if(response.data.output.mainResp.orderStatus== this.$store.state.HUS){
						this.orderstatus = "核保预审";
						this.accompany=true;
						this.changenow = true;
						
					}
					this.policyno = response.data.output.mainResp.plcyNo;
					this.premiums = response.data.output.mainResp.prem;
					this.insurancetime = response.data.output.mainResp.issueTime;
					this.effecttime = response.data.output.mainResp.plcyEffcTime;
					this.endtime = response.data.output.mainResp.plcyInvalidTime;
					this.nameapplicant = response.data.output.applntResp.applName;
					if(response.data.output.applntResp.gender=="M"){
						this.sexplicant="男"
					}else if(response.data.output.applntResp.gender=="F"){
						this.sexplicant="女"
					}
					this.documenttype = response.data.output.applntResp.certfType;
					this.cardnum = response.data.output.applntResp.certfCode;
					if(response.data.output.applntResp.certfEnduringFlag == "Y") {
						this.certificate ="永久有效";
					} else {
						this.certificate = response.data.output.applntResp.certfEndTime;
					}

					this.birthday = response.data.output.applntResp.birthday;
					this.phonenum = response.data.output.applntResp.mobile;
					this.eamil = response.data.output.applntResp.email;
					this.province = response.data.output.applntResp.province;
					let reproinfo = {
						"code": 0,
						"orgCode": this.$route.query.deptCode
					}
					Indicator.open();
					this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', reproinfo)
						.then(res => {
							var dataCode = res.data.code;
							Indicator.close();
							if(dataCode == "SYS_S_000") {

								for(let i = 0; i < res.data.output.length; i++) {
									if(this.province == res.data.output[i].cnCode) {
										this.province = res.data.output[i].cnName
									}
								}
							} else {
								Toast(res.data.desc);
							}
						}, res => {
							Indicator.close();
							console.log(res.data);
						});
					this.city = response.data.output.applntResp.city;

					let recityinfo = {
						"code": this.province,
						"orgCode": this.$route.query.deptCode
					}
					console.log(recityinfo)
					Indicator.open();
					this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', recityinfo)
						.then(res => {
							Indicator.close();
							var dataCode = res.data.code;
							if(dataCode == "SYS_S_000") {

								for(let i = 0; i < res.data.output.length; i++) {
									if(this.city == res.data.output[i].cnCode) {
										this.city = res.data.output[i].cnName
									}
								}
							} else {
								//								Toast(res.data.desc);
							}
						}, res => {
							Indicator.close();
							console.log(res.data);
						})

					this.county = response.data.output.applntResp.county;

					let recountyinfo = {
						"code": this.city,
						"orgCode": this.$route.query.deptCode

					}
					Indicator.open();
					this.$http.post(this.$store.state.link + '/dic/findChinaByOrgCode', recountyinfo)
						.then(res => {
							Indicator.close();
							var dataCode = res.data.code;
							if(dataCode == "SYS_S_000") {

								for(let i = 0; i < res.data.output.length; i++) {
									if(this.county == res.data.output[i].cnCode) {
										this.county = res.data.output[i].cnName
									}
								}
							} else {

								//								Toast(res.data.desc);
							}
						}, res => {
							Indicator.close();
							console.log(res.data);
						})

					this.detailaddres = response.data.output.applntResp.address;
//					if(response.data.output.insrntResp.relaToAppnt == "1") {
//						this.relefirder = "非本人"
//
//						this.recognizeeChild = true
//
//					} else {
//
//						this.recognizeeChild = false
//					}
						if(response.data.output.mainResp.cmpCode=="000034"){
							if(response.data.output.insrntResp.relaToAppnt =="00"){
								this.relefirder="本人";
								this.recognizeeChild = false
							}else if(response.data.output.insrntResp.relaToAppnt=="31"){
							this.relefirder="父母";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="32"){
							this.relefirder="儿女";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="33"){
							this.relefirder="配偶";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="07"){
							this.relefirder="祖父";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="08"){
							this.relefirder="祖母";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="09"){
							this.relefirder="孙子";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="10"){
							this.relefirder="孙女";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="11"){
							this.relefirder="外祖父";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="12"){
							this.relefirder="外祖母";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="13"){
							this.relefirder="外孙";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="14"){
							this.relefirder="外孙女";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="15"){
							this.relefirder="哥哥";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="16"){
							this.relefirder="姐姐";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="17"){
							this.relefirder="弟弟";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="18"){
							this.relefirder="妹妹";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="19"){
							this.relefirder="公公";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="20"){
							this.relefirder="婆婆";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="21"){
							this.relefirder="岳父";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="22"){
							this.relefirder="岳母";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="23"){
							this.relefirder="儿媳";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="24"){
							this.relefirder="女婿";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="25"){
							this.relefirder="其他亲属";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="26"){
							this.relefirder="同事";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="27"){
							this.relefirder="朋友";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="28"){
							this.relefirder="雇主";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt=="29"){
							this.relefirder="雇员";
							this.recognizeeChild = true;
						}else if(response.data.output.insrntResp.relaToAppnt="30"){
							this.relefirder="其他";
							this.recognizeeChild = true;
						}
						}else if(response.data.output.mainResp.cmpCode=="000303"){
							if(response.data.output.insrntResp.relaToAppnt=="00"){
								this.relefirder="本人";
								this.recognizeeChild = false;
							}else if(response.data.output.insrntResp.relaToAppnt=="01"){
								this.relefirder="父母";
								this.recognizeeChild = true;
							}else if(response.data.output.insrntResp.relaToAppnt=="02"){
								this.relefirder="配偶";
								this.recognizeeChild = true;
							}else if(response.data.output.insrntResp.relaToAppnt=="03"){
								this.relefirder="子女";
								this.recognizeeChild = true;
							}else if(response.data.output.insrntResp.relaToAppnt=="04"){
								this.relefirder="祖孙";
								this.recognizeeChild = true;
							}else if(response.data.output.insrntResp.relaToAppnt=="05"){
								this.relefirder="监护";
								this.recognizeeChild = true;
							}else if(response.data.output.insrntResp.relaToAppnt=="06"){
								this.relefirder="其他";
								this.recognizeeChild = true;
							}else if(response.data.output.insrntResp.relaToAppnt=="07"){
								this.relefirder="保单服务人员";
								this.recognizeeChild = true;
							}
						}
					
					if(response.data.output.mainResp.cmpCode=="000034"){
						if(response.data.output.applntResp.relationToInsured=="00"){
							this.relationship="本人";
							
						}else if(response.data.output.applntResp.relationToInsured=="31"){
							this.relationship="父母";
						}else if(response.data.output.applntResp.relationToInsured=="32"){
							this.relationship="儿女";
						}else if(response.data.output.applntResp.relationToInsured=="33"){
							this.relationship="配偶";
						}else if(response.data.output.applntResp.relationToInsured=="07"){
							this.relationship="祖父";
						}else if(response.data.output.applntResp.relationToInsured=="08"){
							this.relationship="祖母";
						}else if(response.data.output.applntResp.relationToInsured=="09"){
							this.relationship="孙子";
						}else if(response.data.output.applntResp.relationToInsured=="10"){
							this.relationship="孙女";
						}else if(response.data.output.applntResp.relationToInsured=="11"){
							this.relationship="外祖父";
						}else if(response.data.output.applntResp.relationToInsured=="12"){
							this.relationship="外祖母";
						}else if(response.data.output.applntResp.relationToInsured=="13"){
							this.relationship="外孙";
						}else if(response.data.output.applntResp.relationToInsured=="14"){
							this.relationship="外孙女";
						}else if(response.data.output.applntResp.relationToInsured=="15"){
							this.relationship="哥哥";
						}else if(response.data.output.applntResp.relationToInsured=="16"){
							this.relationship="姐姐";
						}else if(response.data.output.applntResp.relationToInsured=="17"){
							this.relationship="弟弟";
						}else if(response.data.output.applntResp.relationToInsured=="18"){
							this.relationship="妹妹";
						}else if(response.data.output.applntResp.relationToInsured=="19"){
							this.relationship="公公";
						}else if(response.data.output.applntResp.relationToInsured=="20"){
							this.relationship="婆婆";
						}else if(response.data.output.applntResp.relationToInsured=="21"){
							this.relationship="岳父";
						}else if(response.data.output.applntResp.relationToInsured=="22"){
							this.relationship="岳母";
						}else if(response.data.output.applntResp.relationToInsured=="23"){
							this.relationship="儿媳";
						}else if(response.data.output.applntResp.relationToInsured=="24"){
							this.relationship="女婿";
						}else if(response.data.output.applntResp.relationToInsured=="25"){
							this.relationship="其他亲属";
						}else if(response.data.output.applntResp.relationToInsured=="26"){
							this.relationship="同事";
						}else if(response.data.output.applntResp.relationToInsured=="27"){
							this.relationship="朋友";
						}else if(response.data.output.applntResp.relationToInsured=="28"){
							this.relationship="雇主";
						}else if(response.data.output.applntResp.relationToInsured=="29"){
							this.relationship="雇员";
						}else if(response.data.output.applntResp.relationToInsured=="30"){
							this.relationship="其他";
						}
					
					}else if(response.data.output.mainResp.cmpCode=="000303"){
						if(response.data.output.applntResp.relationToInsured=="00"){
							this.relationship="本人";
						}else if(response.data.output.applntResp.relationToInsured=="01"){
							this.relationship="父母";
						}else if(response.data.output.applntResp.relationToInsured=="02"){
							this.relationship="配偶";
						}else if(response.data.output.applntResp.relationToInsured=="03"){
							this.relationship="子女";
						}else if(response.data.output.applntResp.relationToInsured=="04"){
							this.relationship="祖孙";
						}else if(response.data.output.applntResp.relationToInsured=="05"){
							this.relationship="监护";
						}else if(response.data.output.applntResp.relationToInsured=="06"){
							this.relationship="其他";
						}else if(response.data.output.applntResp.relationToInsured=="07"){
							this.relationship="保单服务人员";
						}
					}
					
					this.insuredName = response.data.output.insrntResp.insrntName;
					
					if(response.data.output.insrntResp.gender=="M"){
						this.noPaysex="男";
					}else if(response.data.output.insrntResp.gender=="F"){
						this.noPaysex="女";
					}
					this.certfType = response.data.output.insrntResp.certfType;
					this.beicardnum = response.data.output.insrntResp.certfCode;
					if(response.data.output.insrntResp.certfEnduringFlag == "Y") {
						this.beidata = "永久有效";
					} else {
						this.beidata = response.data.output.insrntResp.certfEndTime;
					}

					this.beibirthday = response.data.output.insrntResp.birthday;
					this.beipnome = response.data.output.insrntResp.mobile;
					this.insuredheight = response.data.output.insrntResp.height;
					this.insuredweight = response.data.output.insrntResp.weight;
					this.insuredpersons = response.data.output.insrntResp.occType;
					this.insuredclass = response.data.output.insrntResp.occDetailType;
					this.insuredsmall = response.data.output.insrntResp.occName;
					if(response.data.output.bnfResp.length > 0) {
						for(var i = 0; i < this.bnfResp.length; i++) {
							if(this.bnfResp[i].certfEnduringFlag == "Y") {
								this.bnfResp[i].certfEndTime = "永久有效"
							}

						}
					}

					var noPay_data = {
						"dicReq": this.$route.query.deptCode
					}
					Indicator.open();
					this.$http.post(this.$store.state.link + '/dic/findCertiTypeByOrgCode', noPay_data)
						.then(res => {
							Indicator.close();
							var dataCode = res.data.code;
							console.log("ssdd23" + JSON.stringify(res.data))

							if(dataCode == "SYS_S_000") {

								for(let j = 0; j < res.data.output.length; j++) {
									if(this.documenttype == res.data.output[j].certifiCode) {
										this.documenttype = res.data.output[j].certifiName;

									}
									if(this.certfType == res.data.output[j].certifiCode) {
										this.certfType = res.data.output[j].certifiName;
									}
									if(this.beneficiarycard == res.data.output[j].certifiCode) {
										this.beneficiarycard == res.data.output[j].certifiName;
									}
									for(let i = 0; i < this.bnfResp.length; i++) {
										if(this.bnfResp[i].certfType == res.data.output[j].certifiCode) {
											this.bnfResp[i].certfType = res.data.output[j].certifiName;

										}
									}

								}
							} else {
								Toast(res.data.desc);
							}
						}, res => {

							console.log(res.data);
						})

				} else {
					Toast(response.data.desc);
				}
			}, response => {
				Indicator.close();
				console.log("ajax error");
			});
			},
			pay() {
				MessageBox.confirm('', {
					title: '温馨提示',
					message: "是否支付",
					confirmButtonText: '确定',
					showCancelButton: true
				}).then(action => {
					if(action == 'confirm') {
						var data = { //支付
							"token": this.$store.state.token,
							"userId": this.$store.state.userId,
							"head": {
								"channelCode": "qtb_h5",
								"deptCode": this.$route.query.cmpCode,
								"oprCode": this.$store.state.userId,
								"prodCode": this.$route.query.prodCode
							},
							"paymentReq": {
								"accName": this.allData.paymentResp.accName, //行账户姓名 ,
								"accNo": this.allData.paymentResp.accNo, //银行账户
								"bankCode": this.allData.paymentResp.bankCode, //银行代码 ,
								"bankLocationCode": this.allData.paymentResp.bankLocationCode, //开户行网点代码 
								"bankLocationName": this.allData.paymentResp.bankLocationName, //开户行网点名 ,
								"bankName": this.allData.paymentResp.bankName, //银行名称
								//						"cardType": this.allData.paymentResp.cityCode,//折类型 : 见数据字典 ,
								"cityCode": this.allData.paymentResp.cityCode, //开户行所在市代码 ,
								"cityName": this.allData.paymentResp.cityName, //开户行所在市 ,
								"countyCode": this.allData.paymentResp.countyCode, //开户行所在县代码 ,
								"countyName": this.allData.paymentResp.countyName, //开户行所在县 ,
								"mark": "1", //标志位:1-支付 0-续期支付 ,
								"payMode": this.allData.paymentResp.payMode, //支付方式 见数据字典 ,
								"payPrem": this.allData.paymentResp.payPrem, //支付金额 ,
								"payType": this.allData.paymentResp.payType, //支付标识 : 1-实时;2-线下 
								"pkgNo": this.allData.paymentResp.pkgNo, //订单号 ,
								//										"policyDeliveryFee": 0, //快递费 
								"provinceCode": this.allData.paymentResp.provinceCode, // 开户行所在省代码 ,
								"provinceName": this.allData.paymentResp.provinceName // 开户行所在省
							},
							"pkgNo": this.$route.query.orderNo
						}
						this.$http.post(this.$store.state.link + '/trd/pay/v1/payment', data)
							.then(res => {
								console.log("==" + JSON.stringify(res.data))
								var dataCode = res.data.code;
								if(dataCode == "SYS_S_000") {
									if(res.data.output.code == this.$store.state.orderState.PAY_FAL) { //11-失败,09-成功 ,
										Toast("支付成功");
									} else if(res.data.output.code == this.$store.state.orderState.PAY) { //11-失败,09-成功 ,
										Toast("支付失败");
									}
								} else {
									Toast(res.data.desc);
								}
							}, res => {
								console.log(res.data);
							})
					}
				}).catch(err => {
					if(err == 'cancel') {

					}
				})

			},
			//支付
			nopay() {
				if(this.$route.query.deptCode == "000303") {
					this.$router.push('/payInfo?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.pkgNo + "&cmpCode=" + this.$route.query.deptCode + "&prodNo=" + this.prodNo + '&userName=' + this.insuredName)
				} else if(this.$route.query.deptCode == "000034") {
//					this.pay();
				this.$router.push('/payInfo_tianGai?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.pkgNo + "&cmpCode=" + this.$route.query.deptCode + "&prodNo=" + this.prodNo +"&userId=" + this.$store.state.userId + "&token=" + this.$store.state.token)
				}

			},
			//修改
			changenum() {
				if(this.$route.query.deptCode == "000303") {
					this.$router.push('/cvrgInfo?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.pkgNo + "&cmpCode=" + this.$route.query.deptCode + "&prodNo=" + this.prodNo)
				} else if(this.$route.query.deptCode == "000034") {
					this.$router.push('/intoInfo?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.pkgNo + "&cmpCode=" + this.$route.query.deptCode + "&prodNo=" + this.prodNo + "&userId=" + this.$store.state.userId + "&token=" + this.$store.state.token+"&state="+"2")
				}
			},
			//撤单接口
			deleteno() {
				MessageBox.confirm('', {
					title: '温馨提示',
					message: "是否撤单",
					confirmButtonText: '确定',
					showCancelButton: true
				}).then(action => {
					if(action == 'confirm') {
						var deletenodata = {
							"applFlag": "1",
							"head": {
								"channelCode": "qtb_h5",
								"deptCode": this.$route.query.deptCode,
								"oprCode": this.$store.state.userId,
								"prodCode": this.$route.query.prodCode
							},
							"userId": this.$store.state.userId,
							"token": this.$store.state.token,
							"pkgNo": this.$route.query.pkgNo
						}

						Indicator.open();
						console.log(deletenodata);
						this.$http.post(this.$store.state.link + "/trd/withdrawal/v1/cancel", deletenodata)
							.then(res => {
								Indicator.close();
								console.log(res.data);
								var dataCode = res.data.code;

								if(dataCode == "SYS_S_000") {
									Toast(res.data.desc);
									window.history.go(-1)

								}else{
									Toast(res.data.desc);
								}
							}, res => {
								Indicator.close();
								console.log(res.data);
							})
					}
				}).catch(err => {
					if(err == 'cancel') {

					}
				})

			},
			//出单接口
			singledan() {
				MessageBox.confirm('', {
					title: '温馨提示',
					message: "是否出单",
					confirmButtonText: '确定',
					showCancelButton: true
				}).then(action => {
					if(action == 'confirm') {
						var deletedata = {
							"head": {
								"channelCode": "qtb_h5",
								"deptCode": this.$route.query.deptCode,
								"oprCode": this.$store.state.userId,
								"prodCode": this.$route.query.prodCode
							},
							"userId": this.$store.state.userId  ,
							"token": this.$store.state.token,
							"pkgNo": this.$route.query.pkgNo
						}
						Indicator.open();
						this.$http.post(this.$store.state.link + "/trd/ply/v1/create", deletedata)
							.then(res => {
								Indicator.close();
								console.log(res.data);
								var dataCode = res.data.code;

								if(dataCode == "SYS_S_000") {
									this.nopayclick();
									Toast(res.data.desc)
									if(res.data.output.code=="UDR_FAL"){
										Toast(res.data.output.message);
									}
									
								}else{
									Toast(res.data.desc);
								}
							}, res => {
								Indicator.close();
								console.log(res.data);
							})
					}
				}).catch(err => {
					if(err == 'cancel') {

					}
				})

			},
			//回执申请
			receipthui() {
//				
//					MessageBox.confirm('', {
//					title: '温馨提示',
//					message: "是否回执",
//					confirmButtonText: '确定',
//					showCancelButton: true
//				}).then(action => {
//					if(action == 'confirm') {
//						var receiptdata = {
//					"head": {
//						"channelCode": "qtb_h5",
//						"deptCode": this.$route.query.deptCode,
//						"oprCode": this.$store.state.userId,
//						"prodCode": this.$route.query.prodCode
//					},
//					"userId": this.$store.state.userId,
//					"token": this.$store.state.token,
//					"pkgNo": this.$route.query.pkgNo,
//					"plcyNo": this.policyno
//				}
//				console.log(receiptdata);
//				Indicator.open();
//				this.$http.post(this.$store.state.link + "/trd/receipt/v1/apply", receiptdata)
//					.then(res => {
//						Indicator.close();
//						console.log(res.data);
//						var dataCode = res.data.code;
//						if(dataCode == "SYS_S_000") {
//							this.$router.push('/enter1');
//						}
//					}, res => {
//						Indicator.close();
//						console.log(res.data);
//					})
//					}
//				}).catch(err => {
//					if(err == 'cancel') {
//
//					}
//				})
			this.$router.push('/enter1?phonenum='+this.phonenum+"&address="+this.detailaddres+"&agentName="+this.agentName+"&appName="+this.nameapplicant+"&applNo="+this.policyno+"&brokerId="+this.agentCode+"&pkgNo="+this.$route.query.pkgNo+"&zipCode="+this.zipCode+"&deptCode="+this.$route.query.deptCode+"&prodCode="+this.$route.query.prodCode);
			},
			//查询回执  为测试方便暂时注掉直接掉用receipthui方法，正常先执行一下seereceipt方法，查看能不能回执
			seereceipt() {
				var seedata = {
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.deptCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode
					},
					"userId": this.$store.state.userId,
					"token": this.$store.state.token,
					"pkgNo": this.$route.query.pkgNo,
					"plcyNo": this.policyno
				}
				Indicator.open();
				this.$http.post(this.$store.state.link + "/trd/receipt/v1/query", seedata)
					.then(res => {
						Indicator.close();
						var dataCode = res.data.code;
						console.log(res.data)
						if(dataCode == "SYS_S_000") {
							this.$router.push('/enter1?phonenum='+this.phonenum+"&address="+this.detailaddres+"&agentName="+this.agentName+"&appName="+this.nameapplicant+"&applNo="+this.applNo+"&brokerId="+this.agentCode+"&pkgNo="+this.$route.query.pkgNo+"&zipCode="+this.zipCode+"&deptCode="+this.$route.query.deptCode+"&prodCode="+this.$route.query.prodCode+"&serviceAddress="+this.serviceAddress+"&policyno="+this.policyno);
						} else if(dataCode == "TRD_E_903") {
							this.$router.push('/enter1?phonenum='+this.phonenum+"&address="+this.detailaddres+"&agentName="+this.agentName+"&appName="+this.nameapplicant+"&applNo="+this.applNo+"&brokerId="+this.agentCode+"&pkgNo="+this.$route.query.pkgNo+"&zipCode="+this.zipCode+"&deptCode="+this.$route.query.deptCode+"&prodCode="+this.$route.query.prodCode+"&serviceAddress="+this.serviceAddress+"&policyno="+this.policyno);
//							Toast(res.data.desc);
//							document.getElementById("tab5").disabled = "true"
						}else{
							Toast(res.data.desc);
						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					})
			},
			//修改资料
			accompanying(){
				this.$router.push('/inforUpload?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.pkgNo + "&cmpCode=" + this.$route.query.deptCode + "&prodNo=" + this.prodNo + "&userId=" + this.$store.state.userId + "&token=" + this.$store.state.token+"&state="+"2")
			},
			handleClickGoPay(){
				this.$router.push('/payInfo?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&prodNo=" + this.prodNo)
			},
			noPaychange() {
				this.$router.push('/intoInfo?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&prodNo=" + this.prodNo)
			},
			withdraw() {
				var cancedata = {
					"applFlag": "1",
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.deptCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode
					},
					"userId": this.$store.state.userId,
					"token": this.$store.state.token,
					"pkgNo": this.$route.query.pkgNo
				}
				Indicator.open();
				this.$http.post(this.$store.state.link + "/trd/withdrawal/v1/cancel", cancedata)
					.then(res => {
						Indicator.close();
						console.log(JSON.stringify(res.data));
						var dataCode = res.data.code;

						if(dataCode == "SYS_S_000") {

						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					})
			},
			showHide() {
				this.show1 = !this.show1
			},
			showHide1() {
				this.show2 = !this.show2
			},
			showHide2() {
				this.show3 = !this.show3
			},
			hiddenshow(){
				this.show4 = !this.show4
			},
			handleClickGoPay() {
				if(this.a == true) {
					this.$router.push('/paySucess')
				} else {
					this.$router.push('/payFail')
				}

			},
			handleClickPopup() {
				this.$router.push('/payInfo')
			}
		},
		filters: {
			statu: function(value) {
				if(value == "INPAY") {
					return value = "收费中"
				} else if(value == "AUC") {
					return value = "自核成功"
				} else if(value == "AUF") {
					return value = "自核失败"
				} else if(value == "AWL") {
					return value = "已撤单"
				} else if(value == "DEL") {
					return value = "已删除"
				} else if(value == "PAY") {
					return value = "收费成功"
				} else if(value == "PAY_FAL") {
					return value = "收费失败"
				} else if(value == "UDR") {
					return value = "承保成功"
				} else if(value == "UDR_FAL") {
					return value = "承保失败"
				} else if(value == "PLY_CAL") {
					return value = "退保"
				} else if(value == "HPUC") {
					return value = "人工核保中"
				} else if(value == "HUFN") {
					return value = "人核失败并发送通知书"
				} else if(value == "PLY_ER") {
					return value = "保单生效已回执状态"
				} else if(value == "OTHER") {
					return value = "其他"
				} else if(value == "HUC") {
					return value = "人工核保成功"
				} else if(value == "HPRO") {
					return value = "人核未进核心"
				} else if(value == "UDR_PAY") {
					return value = "收费承保"
				} else if(value == "COPC") {
					return value = "犹豫期退保"
				} else if(value == "CONO") {
					return value = "暂存单"
				} else if(value == "AUT") {
					return value = "自核交易失败"
				} else if(value == "HUF") {
					return value = "人核失败"
				} else if(value == "PAYT") {
					return value = "收费交易失败"
				} else if(value == "UDRT") {
					return value = "承保交易失败"
				} else if(value == "UCS") {
					return value = "承保收费成功"
				} else if(value == "DECL") {
					return value = "拒保"
				} else if(value == "PREP") {
					return value = "待支付"
				}

			},
			replation: function(value) {
//					if(value == "01") {
//						return value = "父母"
//					} else if(value == "02") {
//						return value = "配偶"
//					} else if(value == "03") {
//						return value = "子女"
//					}else if(value=="00"){
//						return value = "本人"
//					}else if(value=="04"){
//						return value = "祖孙"
//					}else if(value=="05"){
//						return value = "监护"
//					}else if(value=="06"){
//						return value = "监护"
//					}else if(value=="07"){
//						return value = "保单服务人员"
//					}

			}
		}
	}
</script>

<style scoped="scoped">
	#displayno{
		display: none;
	}
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
	
	textarea::-webkit-input-placeholder,
	input::-webkit-input-placeholder {
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
	
	.one {
		position: absolute;
		width: 100%;
		min-height: 100%;
		padding-bottom: 2rem;
		background: #F3F3F3;
	}
	
	.twoCon {
		margin-top: 0.4rem;
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
	}
	.twoConss{
		margin-top: 0.4rem;
		padding: 0.5rem 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
	}
	.title_twoCon {
		height: 1.11rem;
		line-height: 1.11rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.title_twoCon1{
		height: 1.11rem;
		line-height: 1.11rem;
		/*border-bottom: solid 0.01rem #C8C7CC;*/
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
		padding: 0 0.48rem;
		padding-bottom: 2.4rem;
		text-align: center;
	}
	
	.btn {
		display: inline-block;
		width: 6.04rem;
		height: 1rem;
		line-height: 1rem;
		border: 0.01rem solid #EB7760;
		box-shadow: inset 0 0.01rem 0.03rem 0 rgba(255, 255, 255, 0.50);
		border-radius: 0.5rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
	}
	
	.inputGrop1 {
		height: 0.8rem;
		font-size: 0.28rem;
	}
	
	.inputGrop {
		height: 0.8rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputGropno11{
		/*height: 1rem;*/
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputGropno{
		/*height: 1rem;*/
		font-size: 0.28rem;
		padding: 0 0 0.3rem 0;
		/*border-bottom: solid 0.01rem #C8C7CC;*/
	
	}
	.inputLabel {
		display: inline-block;
		width: 2.52rem;
		line-height: 0.8rem;
		font-weight: bold;
		color: #555555;
	}
	
	.maxInput {
		max-width: 4rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.inputText {
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.28rem;
		color: #666666;
	}
	.inputText11{
		/*height: 1rem;*/
		line-height: 0.4rem;
		font-size: 0.28rem;
		color: #666666;
	}
	.selected {
		color: #EB7760;
	}
	
	select {
		border: none;
		background: none;
		outline: none;
	}
	
	.selImg {
		display: block;
		float: left;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: 0.2rem;
		margin-right: 0.26rem;
	}
	
	.inputText1 {
		display: inline-block;
		height: 0.88rem;
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
	}
	
	.sDes {
		margin-left: 0.16rem;
	}
	
	.sSpan {
		color: #6BD1CF;
	}
	
	.prodName {
		height: 0.44rem;
		padding-top: 0.32rem;
		margin-bottom: 0.16rem;
		line-height: 0.44rem;
		font-size: 0.34rem;
		color: #222222;
		font-weight: bold;
	}
	
	.threeBox {
		padding: 0 0.4rem;
		background: #FFFFFF;
	}
	
	.iconBox {
		/*display: flex;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;*/
		/*width: 100%;*/
		/*height: 1.06rem;*/
		/*line-height: 1.06rem;*/
		/*border-top: solid 0.01rem #C8C7CC;*/
		margin-top: 0.32rem;
		padding: 0 0.32rem;
	}
	
	#tab1_all {
		display: block;
	}
	
	.nochange {
		display: inline-block;
		width: 1.5rem;
		height: 0.6rem;
		line-height: 0.6rem;
		font-size: 0.28rem;
		color: #EB7760;
		text-align: center;
		border: 0.02rem solid#EB7760;
		border-radius: 0.4rem;
		/*margin-left: 0.4rem;*/
	}
	
	.nochange1 {
		font-size: 0.36rem;
		color: #FFFFFF;
		width: 25%;
		height: 100%;
		background: #ED816C;
		text-align: center;
		border-radius: 0.3rem;
		margin-left: 2rem;
	}
	
	.figure {
		flex: 1;
		font-size: 0.36rem;
		color: #222222;
		text-align: center;
	}
	
	.figure1 {
		font-size: 0.36rem;
		color: #222222;
		background: #FFFFFF;
	}
	
	.figure2 {
		font-size: 0.36rem;
		color: #FFFFFF;
		background: #ED816C;
		/*	width: 50%;*/
	}
	
	.price {
		color: #EB6069;
	}
	
	.twoCon .inputGrop:last-child {
		border: none;
	}
	
	.borderNone {
		border: none;
	}
	/*#tab1{
		display: none;
	}
	#tab2{
		display: none;
	}
	#tab3{
		display: none;
	}
	#tab4{
		display: none;
	}*/
</style>