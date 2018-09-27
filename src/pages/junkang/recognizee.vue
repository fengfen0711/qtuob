<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="twoCon">
			<p class="title_twoCon clearFloat">
				<label class="titleLable_twoCon left">被保险人信息</label>
			</p>
			<div class="policyHolder">
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>是投保人的</label>
					<input type="text" class="inputText left" placeholder="请输入" />
					<span class="dateBox1"></span>
				</p>				
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>姓名</label>
					<input type="text" class="inputText left" maxlength="20" placeholder="请输入真实姓名" />
				</p>
                <p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>证件类型</label>
					<select name="name_car" class="left inputText inputWidth">
						<option>身份证</option>
                        <option>通行证</option>
					</select>
				</p>
                <p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>证件号码</label>
					<input type="text" maxlength="18" class="inputTextCard left" v-model="IDnum" placeholder="请输入证件号码" />
				</p>
                <p class="inputGrop clearFloat">
					<label class="inputLabel left"><label class="start left">*</label>性别</label>
					<span class="inputText inputSpan left left1">
					<span class="sex sexM" @click="sexChose">
						<img src="/static/img/sexNo.png" class="sexImg" v-show="showImg" style="width:0.48rem;height:0.48rem;"/>
						<img src="/static/img/sexS.png" class="sexImg" v-show="!showImg" style="width:0.48rem;height:0.48rem;" />
						<label>男</label>
					</span>
					<span class="sex sexF" style="marginLeft:0.6rem;" @click="sexChose">
						<img src="/static/img/sexNo.png" class="sexImg" v-show="!showImg" style="width:0.48rem;height:0.48rem;"/>
						<img src="/static/img/sexS.png" class="sexImg" v-show="showImg" style="width:0.48rem;height:0.48rem;"/>
						<label>女</label>
					</span>
					</span>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>出生日期</label>
					<input type="date" class="inputText dateInput left" placeholder="请选择出生日期" />
					<span class="dateBox1"></span>
				</p>				
				<p class="inputGrop clearFloat">
					<label class="inputLabel left"><label class="start left">*</label>证件是否长期</label>
					<span class="inputText inputSpan left left1">
					<span class="sex sexM"  @click="sexOpen">
						<img src="/static/img/sexNo.png" class="sexImg" v-show="showImgY" style="width:0.48rem;height:0.48rem;"/>
						<img src="/static/img/selected.png" class="sexImg" v-show="!showImgY" style="width:0.48rem;height:0.48rem;" />
						<label>是</label>
					</span>
					<span class="sex sexF" style="marginLeft:0.6rem;"  @click="sexOpen">
						<img src="/static/img/sexNo.png" class="sexImg" v-show="!showImgY" style="width:0.48rem;height:0.48rem;"/>
						<img src="/static/img/selected.png" class="sexImg" v-show="showImgY" style="width:0.48rem;height:0.48rem;"/>
						<label>否</label>
					</span>
					</span>
				</p>
				<p class="inputGrop clearFloat" v-show="dataShow">
					<label class="inputLabel3 left"><label class="start left">*</label>证件有效期至</label>
					<input type="date" class="inputText dateInput left" placeholder=/>
					<span class="dateBox1"></span>
				</p>	
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>国籍</label>
					<select class="inputLabel inputWidth left">
						<option>中国</option>
                        <option>外国</option>
					</select>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>婚姻状况</label>
					<select class="inputLabel inputWidth left">
						<option>已婚</option>
                        <option>未婚</option>
					</select>
				</p>
                <p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>职业大类</label>
					<select class="inputLabel inputWidth left">
						<option>国企</option>
                        <option>外企</option>
					</select>
				</p>
                <p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>职业小类</label>
					<select class="inputLabel inputWidth left">
						<option>宇航员</option>
                        <option>司机</option>
					</select>
				</p>
                <p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>职业代码</label>
					<input type="text" maxlength="18" class="inputTextCard left" placeholder="请输入职业代码" />
				</p>
                <p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>工作单位</label>
					<input type="text" maxlength="18" class="inputTextCard left" placeholder="请输入职业代码" />
				</p>
                <p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="startopacity left">*</label>固定电话</label>
					<input type="text" maxlength="11" class="inputText left" placeholder="请输入固定电话"  v-model="telPhone"/>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>手机号码</label>
					<input type="text" maxlength="11" class="inputText left" placeholder="请输入手机号码"  v-model="phone"/>
				</p>
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="startopacity left">*</label>邮箱地址</label>
					<input type="text" class="inputText left" placeholder="请输入邮箱" v-model="reEmail" />
				</p>
                <p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>所在地区</label>
					<input type="text" class="inputText left" placeholder="请输入所在地区" />
				</p>
                <p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>通讯地址</label>
					<input type="text" class="inputText left" placeholder="请输入通讯地址" />
				</p>
				<p class="inputGrop clearFloat">

					<label class="inputLabel3 left"><label class="startopacity left">*</label>邮编</label>
					<input type="text" maxlength="6" class="inputText left" placeholder="请输入邮编" v-model="email" />
				</p>
			</div>
		</div>
		<div  class="btnBox clearFloat" >
					<div class="boxLast" @click="lastClick">上一步</div>
					<div class="boxNext" @click="nextClick">下一步</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "recognizee",
		data() {
			return {
				showImg:false,
				showImgY:false,
				dataShow:false,
				IDnum: '', //证件号码
				telPhone: '',//固定电话
				phone: '',//手机号
				reEmail: '',//邮箱地址
				email: ''//邮编
            }
        }, methods:{
       		lastClick() {
				window.history.go(-1);
			},
       		nextClick() {
				var regCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; //证件
				var chinese = /[\u4E00-\u9FA5]/i;
				var regT = /^0\d{2,3}[1-9]\d{6,7}$/ //固定号码
				var regPh = /^1[0-9]{10}$/; //手机号	
				var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/; //邮箱地址		
				var rezipCode = /^[1-9][0-9]{5}$/; //邮编

				// 身份证
				if(this.IDnum == "" || this.IDnum == undefined) {
					Toast('请输入证件号码')
					return;
				} else {
					if(this.cardType == "0" || this.cardType == "4" || this.cardType == "C") {
						if(this.IDnum.length != 18) {
							Toast('证件号码位数不正确')
							return;
						}
						if(!this.idCardFlag) {
							Toast('证件号码格式不正确')
							return;
						}
					}
				}

				if(chinese.test(this.IDnum)) {
					Toast('证件号码格式不正确')
					return;
				}

				// 固定号码
				if(this.telPhone == "" || this.telPhone == undefined) {} else {
					if(!patrn.test(this.telPhone)) {
						Toast("固定号码格式不正确")
						return;
					}
				}

				// 手机号
				if(this.phone == '' || this.phone == undefined) {
					Toast('请输入手机号码')
					return;
				}
				if(regPh.test(this.phone) == false) {
					Toast('手机号码格式不正确')
					return;
				}

				// 邮箱
				if(this.reEmail == '' || this.reEmail == undefined) {
					Toast('请输入邮箱')
					return;
				}
				if(reg.test(this.reEmail) == false) {
					Toast('邮箱格式不正确')
					return;
				}
				
				// 邮编
				if(this.email == '' || this.email == undefined) {
					Toast('请输入邮编地址')
					return;
				}
				if(!rezipCode.test(this.email)) {
					Toast('邮编地址格式不正确')
					return;
				}



				//this.$router.push('/beneficiary');
			},
			//男女
			sexChose() {
				if(this.showImg){
					this.showImg = false
				}else{
					this.showImg = true
				}
			},
		//长期是否
			sexOpen(){
				if(this.showImgY){
					this.showImgY = false
					this.dataShow = false
				}else{
					this.showImgY= true
					this.dataShow = true
				}
			}
			
			
		}
	}
</script>

<style scoped="scoped">
	.left1{
		margin-left: 0.18rem;
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
	
	.labsex {
		color: #C8C7CC;
	}
	
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	
	.inputLabel2 {
		display: block;
		height: 0.88rem;
		line-height: 0.88rem;
		color: #555555;
	}
	
	.brspanbo {
		display: block;
		position: absolute;
		left: 2.3rem;
		top: 0;
		height: 0.88rem;
		line-height: 0.88rem;
		color: #B2B2B2;
	}
	
	.opa0 {
		opacity: 0;
	}
	
	.one {
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
	
	.start {
		display: block;
		height: 0.88rem;
		line-height: 0.88rem;
		color: red;
	}
	
	.startopacity {
		display: block;
		height: 0.88rem;
		line-height: 0.88rem;
		color: red;
		opacity: 0;
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
	
	.boderbo {
		/*width: 5.5rem;*/
		border: none;
		border-radius: 0;
		border-bottom: 0.02rem solid #979797;
	}
	
	.bg {
		margin-top: 0.2rem;
	}
	
	.bg1 {
		margin-left: 0.2rem;
	}
	
	.twoCon {
		/*margin-top: 0.4rem;*/
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
		/*padding: 0.64rem 0.4rem;*/
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
		box-shadow: inset 0 0.01rem 0.03rem 0 rgba(255, 255, 255, 0.50);
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
	
	.inputSpan {
		line-height: 0.88rem;
		color: #555555;
		font-weight: bold;
	}
	
	.inputLabel {
		display: block;
		width: 2.04rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		padding-left: 0;
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
	
	.padleftitem {
		padding-left: 0.25rem;
	}
	
	.inputLabel1 {
		line-height: 0.68rem;
	}
	
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
		padding-left: 0;
	}
	
	.inputText2 {
		width: 2.7rem;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
		padding-left: 0;
	}
	
	.inputTextCard {
		width: 3rem;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
	}
	
	.inpuDate {
		width: 3rem;
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
	
	.dateBox {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 1;
		display: block;
		height: 0.87rem;
		padding: 0 0.2rem;
		line-height: 0.88rem;
		background: #FFFFFF;
		border-left: solid 0.01rem #C8C7CC;
	}
	
	.dateB {
		position: absolute;
		right: 1.78rem;
		top: 0;
		z-index: -1;
		width: 0.4rem;
		height: 0.87rem;
		background: #FFFFFF;
	}
	
	.upDownImg3 {
		display: block;
		width: 0.4rem;
		height: 0.44rem;
		margin-top: 0.22rem;
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
		color: #333333;
		padding-left: 0;
	}
	
	.pro {
		width: 3.6rem;
	}
	
	.dateInput {
		width: 2.7rem;
	}
	
	.inputWidth {
		width: 4.4rem;
	}
	
	.inputWidth11 {
		width: 4.4rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
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
	}
	
	.signBox span {
		display: inline-block;
		float: left;
		width: 1.84rem;
		margin: 0 0.15rem;
		height: 0.68rem;
		line-height: 0.68rem;
		margin-top: 0.32rem;
		font-size: 0.28rem;
		color: #555555;
		text-align: center;
		border: solid 0.02rem #54CCC1;
		border-radius: 0.34rem;
		margin-right: 0.2rem;
	}
	.marR {
		margin-right: 0.233rem;
	}
	.selectedSign {
		background: #54CCC1;
		color: #FFFFFF;
	}
	
	.opa1 {
		z-index: 2;
	}
	.btnBox {
		/*position: absolute;*/
		width:6.64rem;
		height:0.88rem;
		margin: 0 auto;
		padding-top: 0.64rem;
		padding-bottom: 0.64rem;
	}
	.boxLast {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color:#c9141e;
		letter-spacing: 0;
		border:0.02rem solid #c9141e;
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
		color:  #c9141e;
		letter-spacing: 0;
		border:0.02rem solid #c9141e;
		border-radius: .44rem;
		float: right;
	}
</style>