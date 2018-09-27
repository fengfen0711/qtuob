<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="twoCon">
				<p class="title_twoCon clearFloat">
					<label class="titleLable_twoCon left">银行账户信息</label>
				</p>
				<div class="policyHolder">
					<p class="inputGrop clearFloat">
						<label class="inputLabel3 left"><label class="star">*</label>投保单印刷号</label>
						<input type="text" class="inputText left" maxlength="20" v-model="numberClick"/>
						<span class="inputLabel1 right" @click="plClick" >申请</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel3 left"><label class="star">*</label>投保单串号</label>
						<input type="text" class="inputText left" maxlength="20" v-model="numberPolicy"/>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel3 left"><label class="star">*</label>开户银行</label>
						<select name="name_car" v-model="bankType" class="left inputText inputWidth1" @change="paycardxx">
							<option value="q">请选择开户银行</option>
							<option :value="bank.dicCode" v-for="bank in bankList">{{bank.dicName}}</option> 
						</select>
						<span class="inputLabel1 right" @click="xeClick" >限额</span>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel3 left"><label class="star">*</label>账户名</label>
						<input type="text" class="inputText left" v-model="cardname" maxlength="20" placeholder="请输入账户名" />
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel3 left"><label class="star">*</label>账户号</label>
						<input type="text" class="inputText left" v-model="bankNumber" maxlength="20" placeholder="请输入账户号" @input="checknumber" @change="bankCard"/>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel3 left"><label class="star">*</label>确认账户号</label>
						<input type="text" class="inputText left" v-model="bankNumber1" maxlength="20" placeholder="请输入账户号" @input="checknumber1" @change="bankCard1"/>
					</p>
					<p class="inputGrop clearFloat">
						<label class="inputLabel3 left"><label class="star">*</label>应交金额</label>
						<input type="text" class="inputText left" maxlength="20" v-model="payPrem" placeholder="首期保费不可更改"/>
					</p>
				</div>
			</div>
			
			<div class="kong"></div>
			
			<div class="twoCon">
				<div class="policyHolder1">
					<p class="inputGrop clearFloat">
						<label class="inputLabel left">生存金转账授权</label>
						<span class="inputText inputSpan left"  v-model="aliveGetMode">
							<span class="sex sexM" @click="lifeClick1">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="sexShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="!sexShow" />
								<label>授权</label>
							</span>
							<span class="sex sexF" @click="lifeClick2">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="!sexShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="sexShow" />
								<label>不授权</label>
							</span>
						</span>
					</p>
					<div class="ben" v-if="ben">
						<p class="inputGrop clearFloat">
							<label class="inputLabel3 left">受益人开户银行</label>
							<select name="name_car" v-model="bankBenType" class="left inputText inputWidth1">
								<option value="q">请选择开户银行</option>
								<option :value="bank.dicCode" v-for="bank in bankBenList">{{bank.dicName}}</option> 
							</select>
							<span class="inputLabel1 right" @click="xeClick">限额</span>
						</p>
						<p class="inputGrop clearFloat">
							<label class="inputLabel3 left">受益人账户名</label>
							<input type="text" v-model="bnfAccName" class="inputText left" maxlength="20" placeholder="请输入账户名"/>
						</p>
						<p class="inputGrop clearFloat">
							<label class="inputLabel3 left">受益人账户号</label>
							<input type="text" v-model="bnfBankAccno" class="inputText left" maxlength="20" placeholder="请输入账户号"/>
						</p>
						<p class="inputGrop clearFloat">
							<label class="inputLabel3 left">确认账户号</label>
							<input type="text" class="inputText left" maxlength="20" placeholder="请输入账户号"/>
						</p>
					</div>
				</div>
			</div>
			
			<div class="kong"></div>
			
			<div class="twoCon">
				<p class="title_twoCon clearFloat">
					<label class="titleLable_twoCon left">其他信息</label>
				</p>
				<div class="policyHolder">
					<p class="inputGrop clearFloat">
						<label class="inputLabel3 left">确认代理人信息</label>
						<input type="text" v-model="agentInfo" class="inputText left" maxlength="20" placeholder="工号+姓名"/>
					</p>
					<!--<p class="inputGrop clearFloat">
						<label class="inputLabel4 left"><label class="star">*</label>一年期附加险是否自动续保</label>
						<span class="inputText1 inputSpan left">
							<span class="sexX sexY">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="longShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="!longShow" />
								<label>是</label>
							</span>
						<span class="sexX sexY">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="!longShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="longShow" />
								<label>否</label>
							</span>
						</span>
					</p>-->
					<p class="inputGrop1 clearFloat">
						<label class="inputLabel4 left"><label class="star">*</label>溢交保险费处理方式</label>
						<span class="inputText13 inputSpan left" @click="typeClick">
							<span class="sexX sexY">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="tuiShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="!tuiShow" />
								<label>颓废</label>
							</span>
							<span class="sexX sexY">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="!tuiShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="tuiShow" />
								<label>抵交续期保险费</label>
							</span>
						</span>
					</p>
					<p class="inputGrop1 clearFloat">
						<label class="inputLabel4 left"><label class="star">*</label>保险费逾期未付的选择</label>
						<span class="inputText13 inputSpan left" @click="choseClick">
							<span class="sexX sexY">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="chShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="!chShow" />
								<label>终止合同</label>
							</span>
							<span class="sexX sexY">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="!chShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="chShow" />
								<label>自动垫交</label>
							</span>
						</span>
					</p>
					<!--<p class="inputGrop clearFloat">
						<label class="inputLabel4 left"><label class="star">*</label>是否转线下批量收费</label>
						<span class="inputText1 inputSpan left">
							<span class="sexX sexY">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="YShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="!YShow" />
								<label>是</label>
							</span>
						<span class="sexX sexY">
								<img src="/static/img/sexNo.png" class="sexImg" v-show="!YShow" />
								<img src="/static/img/sexS.png" class="sexImg" v-show="YShow" />
								<label>否</label>
							</span>
						</span>
					</p>-->
				</div>
			</div>
			
			<div class="kong"></div>
			
			<div class="sBox clearFloat" @click="openClick">
				<img src="/static/noSelected.png" class="sImg" v-if="!sBoxShow" />
				<img src="/static/selected.png" class="sImg" v-if="sBoxShow" />
				<span class="sDes">请阅读并确认
					<span class="book" style="color:#240000;">《保险费自动转账授权书》</span>。</span>
			</div>
		<div class="btnBox clearFloat">
			<div class="boxLast" @click="handleClickLast">上一步</div>
			<div class="boxNext" @click="toDataUpload">下一步</div>
		</div>

	</div>
</template>

<script>
	import { Dictionaries1 } from "../../assets/js/country.js";
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "accInfo",

		data() {
			return {
				sexShow: true,
				longShow: true,
				sBoxShow: true,
				ben:true,
//				YShow:true,
				chShow:true,
				tuiShow:true,
				numberClick:'1050030002015688',
				numberPolicy:'1069010021007088',
				cardname:'',
				bankName:'',
				payPrem:'',
				bankNumber:'',
				bankNumber1:'',
				bankType:'',
				bankList:[],
				bankBenType:'',
				bankBenType:'',
				bankBenList:[],
				aliveGetMode:'',
				bnfAccName:'',
				bnfBankAccno:'',
				agentInfo:'',
				main: '',
				allData: {},
				dictionaries: "",
				
			}
		},
		watch: {
		
		},
		created() {
			var _this = this
				Dictionaries1('http://192.168.171.12:9005').then((res) => {
					_this.dictionaries = res.output
				})
				this.echo();
				console.log(this.bankType)
				console.log(this.tuiShow)
		},
		
		methods: {
			echo(){
				var data = {
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"head": {
						"channelCode": "qtb_h5",
						 "deptCode": "000095",
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode,
					},
					"opt": "PAY,APPL",
					"pkgNo": this.$route.query.orderNo,
				}
				console.log("====请求报文====" + JSON.stringify(data))
				this.$http.post('http://192.168.171.12:9009' + '/order/v1/queryorder', data).then(res => {
					var dataCode = res.data.code;
					if(dataCode == "SYS_S_000") {
						this.allType();
						this.allData = res.data.output;
						this.main = res.data.output.mainResp;
						this.cardname = this.$route.query.appName
						if(this.bankType == ''){
							this.bankType = 'q'
						}else{
							this.bankList = this.dictionaries.bankCode.codeList;
						}
						if(this.bankBenType == ''){
							this.bankBenType = 'q'
						}else{
							this.bankBenList = this.dictionaries.bankCode.codeList;
						}
					} else {
						this.allType();
					}
				}, res => {
					console.log(res.data);
				})
			},
			allType(){
//				console.log(JSON.stringify(this.dictionaries.bankCode))
				this.bankList = this.dictionaries.bankCode.codeList;
				this.bankBenList = this.dictionaries.bankCode.codeList;
			},
			xeClick() {
				alert(11)
			},
			handleClickLast(){
				window.history.go(-1)
			},
			//银行卡输入规则
			checknumber() {
				this.bankNumber = this.bankNumber.replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
			},
			checknumber1() {
				this.bankNumber1 = this.bankNumber1.replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
			},
			bankCard(){
				console.log(this.bankNumber)
			},
			bankCard1(){
				if(this.bankNumber!=this.bankNumber1){
					Toast("账号不一致，请重新输入")
					this.bankNumber1 = ""
				}
			},
			paycardxx() {
				for(var i = 0; i < this.bankList.length; i++) {
					if(this.bankType == this.bankList[i].dicCode) {
						this.bankName = this.bankList[i].dicName
						console.log(this.bankName)
					}
				}
			},
			plClick(){
				alert(111)
			},
				
			toDataUpload(){
				var re = /[^\u4e00-\u9fa5]/; //姓名校验
				var num = /^\d*$/; //全数字
				var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
				if(this.bankNumber == "") {
					Toast("请填写银行卡号");
				} else if(this.bankNumber.replace(/\s/g, "").length < 16 || this.bankNumber.replace(/\s/g, "").length > 19) {
					Toast("银行卡号长度必须在16到19之间");
					return;
				}else if(strBin.indexOf(this.bankNumber.substring(0, 2)) == -1) {
					Toast("银行卡号开头6位不符合规范");
				} else if(this.cardname.length <= 1) {
					Toast("持卡人姓名格式不正确");
				} else if(re.test(this.cardname)) {
					Toast("持卡人姓名必须为纯中文");
				}else{
					
					var outPayFlag;
						if(this.tuiShow == true){
							outPayFlag = "B"
						}else{
							outPayFlag = "A"
						}
					var overdueFlag;
						if(this.chShow == true){
							outPayFlag = "B"
						}else{
							outPayFlag = "A"
						}
					var data = {
						"head": {
							"channelCode": "qtb_h5",
							"deptCode": this.$route.query.cmpCode,
							"oprCode": this.$store.state.userId,
							"prodCode": this.$route.query.prodCode
						},
						"userId": this.$store.state.userId,
						"token": this.$store.state.token,
						"opt": "PAY,APPL,BNF,MAIN",
						"paymentReq": {
							"bankName" : this.bankType,//开户银行 ,	
//							"accName": this.cardname,//账户名
							"accNo" : this.bankNumber,//账户号,
							"payPrem":this.payPrem,//应交金额
							"aliveGetMode":this.aliveGetMode,//生存金转账授权
						},
						"applntReq":{
							"applName":this.cardname,
						},
						"bnfReq":{
							"bnfBankCode":bankBenType,
							"bnfAccName":bnfAccName,
							"bnfBankAccno":bnfBankAccno,
						},
						"mainReq":{
							"agentInfo":this.agentInfo,
							"outPayFlag":outPayFlag,
							"overdueFlag":overdueFlag , 
						},
						"mark": "UC",
						"pkgNo": this.$route.query.orderNo,
					}
					console.log("121212" + JSON.stringify(data));
					Indicator.open();
					this.$http.post(this.$store.state.link5 + '/trd/order/v1/saveorder', data).then(res => {
						Indicator.close();
						var dataCode = res.data.code;
						console.log(res.data)
						if(dataCode == "SYS_S_000") {
							this.$router.push('/dataUpload?prodCode=' + this.$route.query.prodCode + '&prodNo=' + this.$route.query.prodNo + '&orderNo=' + this.$route.query.orderNo + '&cmpCode=' + this.$route.query.cmpCode);
						} else {
							Toast(res.data.desc);
						}
					}, res => {
						Indicator.close();
						console.log(res.data);
					})
				}
			},
			lifeClick1() {
				this.sexShow = false
				this.ben = false
			},
			lifeClick2() {
				this.sexShow = true
				this.ben = true
			},
			autoClick() {
				this.longShow = !this.longShow
			},
			typeClick(){
				this.tuiShow = !this.tuiShow
			},
			choseClick(){
				this.chShow = !this.chShow
			},
			openClick(){
				alert(111)
			}
//			clickPay(){
//				this.YShow = !this.YShow
//			}
		}
			
	}
</script>

<style scoped="scoped">
	.inputLabel1{
		font-size:0.28rem;
		color: #C9141E;
		line-height: 0.88rem;
		padding-left: 0.4rem;
		font-weight: bold;
	}
	.inputSpan {
		display: inline-block;
		line-height: 0.88rem;
	}
	.left {
		float: left;
	}
	.sBox {
		/*padding: 0 0.4rem;*/
		margin-top: 0.34rem;
		margin-left: 0.4rem;
		margin-bottom: 0.44rem;
		font-size: 0.28rem;
		line-height: 0.4rem;
	}
	.sImg {
		width: 0.48rem;
		height: 0.48rem;
		margin-top: -0.04rem;
	}
	.book {
		font-size: 0.28rem;
		letter-spacing: 0;
		line-height: 0.4rem;
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
	.sexX label {
		display: inline-block;
		float: left;
	}
	
	.sexX {
		display: inline-block;
		height: 0.88rem;
		margin-right: 0.46rem;
	}

	.kong{
		height: 0.4rem;
		background: #f3f3f3;
		width: 100%;
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
		width: 100%;
		min-height: 100%;
		position: absolute;
		background: #F3F3F3;
	}
	
	.start {
		display: block;
		height: 0.88rem;
		line-height: 0.88rem;
		color: red;
	}
	
	.selected {
		color: #EB7760;
	}
	
	.twoCon {
		/*margin-top: 0.4rem;*/
		height: 100%;
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
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
		font-size: 0.36rem;
		font-weight: bold;
		color: #222222;
	}
	.inputGrop {
		position: relative;
		height: 0.88rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputGrop1{
		position: relative;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputLabel3 {
		display: block;
		width: 2.3rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		/*background: #669900;*/
	}
	.inputLabel4 {
		display: block;
		width: 3.7rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
	}
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
		padding-left: 0;
	}
	.inputText1 {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
		padding-left: 0;
		margin-left: 0.35rem;
	}
	.inputText13 {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
		padding-left: 0;
		margin-left:2.1rem;
	}
	.inputTextCard {
		width: 3rem;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
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
	.inputWidth {
		width: 4.4rem;
	}
	.inputWidth1 {
		width: 3.2rem;
	}
	.twoCon .inputGrop:last-child {
		border: none;
		line-height: 0.88rem;
	}
	
	.sex {
		margin-left: 0.27rem;
	}
	.btnBox {
		/*position: absolute;*/
		width: 6.64rem;
		height: 0.88rem;
		margin: 0.65rem auto 0.64rem;
	}
	
	.boxLast {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #c9141e;
		letter-spacing: 0;
		border: 0.01rem solid #c9141e;
		border-radius: .44rem;
		float: left;
		margin-right: 0.3rem;
	}
	
	.boxNext {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color: #fff;
		background: #c9141e;
		letter-spacing: 0;
		/*border:0.01rem solid #c9141e;*/
		border-radius: .44rem;
		float: right;
	}

	.inputLabel {
		display: block;
		width: 2.2rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		/*background: #669900;*/
	}

</style>