<template>
	<div class="twoCon" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="policyHolder">
			<p class="title_twoCon">
				<label class="titleLable_twoCon">续期缴费信息</label>
			</p>
			<div class="inputDiv clearFloat">
				<p class="inputP">
					<label class="inputLabel inputLabel1">开户行所在省市</label>
				</p>
				<p class="inputP1 clearFloat">
					<select class="left inputText1 inputWidth1" v-model="provinceType" @change="provinceChange">
						<option :value="province.accCode" v-for="province in provinceList" >{{province.accName}}</option>
					</select>
					<select class="left inputText1 inputWidth1 inputWidth2" v-model="cityType" @change="cityChange" >
						<option :value="city.accCode" v-for="city in cityList" >{{city.accName}}</option>
					</select>
				</p>
			</div>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">开户行</label>
				<select class="inputText inputWidth left" v-model="bankTypeBox" @change="bankChange">
					<option :value="[bank.bankCode,bank.bankName]" v-for="bank in bankList" >{{bank.bankName}}</option>
				</select>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">银行账户名</label>
				<input type="text" class="inputText inputWidth left" v-model="userName" placeholder="请输入真实姓名" />
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">银行卡号码</label>
				<input type="text" maxlength="19" class="inputText inputWidth left" v-model="bankCardNum" placeholder="请输入银行卡号码" />
			</p>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
    	name: "RenewalPay",
    	props: ['payList'],
    	data () {
      		return {
      			provinceType:'',
      			provinceList:[],
      			cityType:'',
      			cityList:[],
      			bankTypeBox:[],
      			bankType:'',
      			bankName:'',
      			bankList:[],
      			userName:'',
      			userName1:'',
      			bankCardNum:'',
      			cmpCode:'',
      		}
    	},
    	created(){
    		this.cmpCode = this.payList[2]
			this.pro()
			this.bankAjax()
    	},
    	methods:{
    		payInfoAjax(val){
    			this.provinceType = val[0][0].provinceCode
    			this.cityType = val[0][0].cityCode
    			for (let i=0;i<this.provinceList.length;i++) {
      				if (this.provinceType == this.provinceList[i].accCode) {
      					this.provinceType = this.provinceList[i].accCode
      					this.city(2)
      				}
      			}
    			this.bankType = val[0][0].bankCode
				for (let i=0;i<this.bankList.length;i++) {
      				if (this.bankType == this.bankList[i].bankCode) {
      					this.bankType = this.bankList[i].bankCode
      					this.bankName = this.bankList[i].bankName
      					this.bankTypeBox = [this.bankList[i].bankCode,this.bankList[i].bankName];
      				}
	      		}
    			this.userName = val[0][0].accName
    			this.bankCardNum = val[0][0].accNo
    		},
    		bankAjax(){
    			var bankinfo = {
  					"dicReq": this.cmpCode
				}
//  			console.log(bankinfo)
				this.$http.post(this.$store.state.link+'/dic/findBankByOrgCode', bankinfo)
				.then(res =>{
//				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
							this.bankList = res.data.output
							this.bankTypeBox = [this.bankList[0].bankCode,this.bankList[0].bankName];
							this.bankType = this.bankList[0].bankCode
							this.bankName = this.bankList[0].bankName
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc)
					}
				},res =>{
					console.log(res.data);
				})
    		},
    		pro(){
    			var provinceinfo = {
  					"code": "0",
  					"orgCode": this.cmpCode
				}
				this.$http.post(this.$store.state.link+'/dic/findAccountByOrgCode', provinceinfo)
				.then(res =>{
//				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
							this.provinceList = res.data.output
							this.provinceType = this.provinceList[0].accCode;
							this.city(1)
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc)
					}
				},res =>{
					console.log(res.data);
				})
    		},
    		city(a){
    			var cityinfo = {
    				"code": this.provinceType,
  					"orgCode": this.cmpCode
				}
				this.$http.post(this.$store.state.link+'/dic/findAccountByOrgCode', cityinfo)
				.then(res =>{
//				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
							this.cityList = res.data.output
							if(a==2){
								this.cityType = this.payList[0][0].cityCode
							}
							if(a==1){
								this.cityType = this.cityList[0].accCode;
							}else{
								for (let i=0;i<this.cityList.length;i++) {
				      				if (this.cityType == this.cityList[i].accCode) {
				      					this.cityType = this.cityList[i].accCode
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
    		bankChange(){
    			this.bankType = this.bankTypeBox[0]
    			this.bankName = this.bankTypeBox[1]
    		},
    		provinceChange(){
    			this.city(1)
    		},
    		cityChange(){
//  			console.log(this.cityType)
    		},
    		childPayInfo(){    			
    			if (this.userName == "") {
    				Toast("银行账户名字不能为空~")
    				return
    			}else{
    				var myReg = /^[\u4e00-\u9fa5]+$/;
					if (!myReg.test(this.userName)) {
						Toast("银行账户名字必须为汉字~")
						return
					}else{
						if(this.userName != this.userName1){
							Toast("银行账户名字必须为投保人本人~")
							return
						}
					}
    			}
    			if (this.bankCardNum == "") {
    				Toast("银行卡号不能为空~")
    				return
    			}else{
    				if (isNaN(this.bankCardNum)) {
    					Toast("银行卡号不能输入非数字内容~")
    					return
    				}
    			}
    			console.log(this.bankName)
    			var payInfo = {
    				"payMode":"J",//支付方式
					"cardType":"0",//卡or折子
			    	"accName": this.userName,
			    	"bankCode": this.bankType,
			    	"bankName": this.bankName,
			    	"cityCode": this.cityType,
			    	"accNo": this.bankCardNum,
			    	"provinceCode": this.provinceType,
			    	"mark":"0"
    			}
    			this.$emit('child_paySay',payInfo);
    		}
    	},
    	watch:{
    		payList: function (val) {
//  			console.log(val)
				if (val[0][0] && val[0][0].provinceCode) {
    				this.payInfoAjax(val)
    			}
    			this.userName = val[1]
    			this.userName1 = val[1]
    			
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
		position: relative;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputGrop {
		position: relative;
		height: 0.88rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputSpan {
		line-height: 0.88rem;
		color: #555555;
		font-weight: bold;
	}
	.inputLabel {
		display: inline-block;
		width: 2.04rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
	}
	.inputLabel1 {
		height: 0.28rem;
		padding-bottom: 0.3rem;
		font-size: 0.28rem;
		line-height: 0.28rem;
	}
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
	}
	.inputText1 {
		font-size: 0.28rem;
		color: #333333;
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
	.pro {
		width: 3.6rem;
	}
	.dateInput {
		width: 3.4rem;
	}
	.inputWidth {
		width: 4.66rem;
	}
	.inputWidth1 {
		width: 3.1rem;
	}
	.inputWidth2 {
		margin-left: 0.5rem;
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
		top: 0;
		left: 2.7rem;
	}
	.upDownImg2 {
		top: 0rem;
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
	.inputDiv {
		padding: 0.3rem 0;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputP1 {
		position: relative;
		font-size: 0.28rem;
	}
</style>