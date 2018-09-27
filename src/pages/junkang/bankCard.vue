<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="twoCon">
			<p class="title_twoCon clearFloat">
				<label class="titleLable_twoCon left">银行账户信息</label>
			</p>
			<div class="policyHolder">
				<p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>户名</label>
					<input type="text" class="inputText left" maxlength="20" placeholder="请输入真实姓名" />
				</p>
                <p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>银行卡类型</label>
					<select name="name_car" class="left inputText inputWidth">
						<option>请选择</option>
                        <option>请选择</option>
					</select>
				</p>
                <p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>转账银行</label>
					<select name="name_car" class="left inputText inputWidth">
						<option>请选择</option>
                        <option>请选择</option>
					</select>
				</p>
                <p class="inputGrop clearFloat">
					<label class="inputLabel3 left"><label class="start left">*</label>付款账号</label>
					<input type="text" maxlength="19" class="inputTextCard left" placeholder="请输入付款账号" v-model="bankNumber" @input="checknumber"/>
				</p>
                <p class="inputGrop clearFloat">
					<label class="inputLabel left"><label class="start left">*</label>支付方式</label>
					<span class="inputText inputSpan left">
					<span class="sex sexM" @click="automatic('1')">
						<img src="/static/img/sexNo.png" class="sexImg"  v-show="automatic1" style="width:0.48rem;height:0.48rem;"/>
						<img src="/static/img/selected.png" class="sexImg"  v-show="!automatic1" style="width:0.48rem;height:0.48rem;" />
						<label>实时支付</label>
					</span>
					<span class="sex sexF" @click="automatic('2')" style="marginLeft:0.6rem;">
						<img src="/static/img/sexNo.png" class="sexImg"  v-show="automatic2" style="width:0.48rem;height:0.48rem;"/>
						<img src="/static/img/selected.png" class="sexImg"  v-show="!automatic2" style="width:0.48rem;height:0.48rem;"/>
						<label>批量支付</label>
					</span>
					</span>
				</p>
			</div>
		</div>
		<div  class="btnBox clearFloat" >
					<div class="boxLast" @click="lastClick">上一步</div>
					<div class="boxNext" @click="nextClick">下一步</div>
		</div>
		<!-- <dateTools :dateToolsKey="2" :trainDateList="trainDateList2" :trainDateFullList="trainDateFullList" ref="topDateTools2" @topDateEvent2="topDateFun2"></dateTools> -->
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "",
		data() {
			return {
				automatic1: true,
				automatic2: true,
				bankNumber: ''//银行卡
            }
		},
        methods:{
			checknumber() {
				this.bankNumber = this.bankNumber.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ")
			},
			lastClick() {
				this.$router.push('/businessInform');
			},
       		nextClick() {
//				this.$router.push('/');
			},
			automatic(index) {
				if(this.automatic1 == true && this.automatic2 == true) {
					if(index == "1") {
						this.automatic1 = false;
					} else if(index == "2") {
						this.automatic2 = false;
					}
				} else {
					if(index == "1") {
						this.automatic1 = false;
						this.automatic2 = true;
					} else if(index == "2") {
						this.automatic1 = true;
						this.automatic2 = false;
					}
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.left {
		float: left;
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

	.inputGrop {
		position: relative;
		height: 0.88rem;
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

	.inputText {
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
	
	.inputText1 {
		display: block;
		width: 3.6rem;
		height: 0.68rem;
		margin-left: 2.04rem;
		font-size: 0.28rem;
		color: #333333;
		padding-left: 0;
	}

	.inputWidth {
		width: 4.4rem;
	}

	.inputselect {
		height: 0.68rem;
	}

	.twoCon .inputGrop:last-child {
		border: none;
		line-height: 0.88rem;
	}
	.sex{
		margin-left: 1rem;
	}
	.btnBox{
		display: flex;
		justify-content: space-around;
		padding-left: 0.3rem;
		margin-top: 6rem;
	}
	.btnBox {
		/*position: absolute;*/
		width:6.64rem;
		height:0.88rem;
		margin:5.5rem auto 0.4rem;
	}
	.boxLast {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color:#c9141e;
		letter-spacing: 0;
		border:0.01rem solid #c9141e;
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
		/*background: #c9141e;*/
		letter-spacing: 0;
		border:0.01rem solid #c9141e;
		border-radius: .44rem;
		float: right;
	}
</style>