<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="broker">
			<p>本人特此声明：<br> &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;本人已亲自面见投保人和被保险人，就投保单的告知事项逐一向投保人和被保险人当面询问，并见证投保 人被保险人在投保单上签字。 
			<br>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;此外，本人还核对了其身份证件且证实本表格所列 情况与投保单表格中的陈述一致，如有不实见证或报告， 本人愿承担相应法律责任。
			</p>
		</div>
		<div class="policyHolder">
				<div class="inputGrop clearFloat">
					<label class="inputLabel left">1.您是被保险人本人或被保险人的亲属吗？若是，请勾选：</label>
					<span class="inputText inputSpan">
						<span class="dent">是</span>
						<span class="dent deny">否</span>
					</span>
					<div class="question">
						<p class="answer">
							<span class="item">
									<img src="/static/img/sexNo.png" class="sexImg" v-show="show"/>
									<img src="/static/img/sexS.png" class="sexImg" v-show="!show"/>
									<label>本人</label>
							</span>
							<span class="item item1">
									<img src="/static/img/sexNo.png" class="sexImg" v-show="show"/>
									<img src="/static/img/sexS.png" class="sexImg" v-show="!show"/>
									<label>父母</label>
							</span>
						</p>
						<p class="answer">
							<span class="item">
									<img src="/static/img/sexNo.png" class="sexImg" v-show="show"/>
									<img src="/static/img/sexS.png" class="sexImg" v-show="!show"/>
									<label>子女</label>
							</span>
							<span class="item item1">
									<img src="/static/img/sexNo.png" class="sexImg" v-show="show"/>
									<img src="/static/img/sexS.png" class="sexImg" v-show="!show"/>
									<label>配偶</label>
							</span>
						</p>
						<p class="answer">
							<span class="item">
									<img src="/static/img/sexNo.png" class="sexImg" v-show="show"/>
									<img src="/static/img/sexS.png" class="sexImg" v-show="!show"/>
									<label>其他，请说明：</label>
									<input type="text" class="inputText2 left boderbo bg bg1"  naxlength="20" />
							</span>
						</p>
					</div>
				</div>
				<div class="inputGrop clearFloat">
					<label class="inputLabel left">2.接触客户方式：</label>
					<!--<span class="inputText inputSpan">
						<span class="dent">是</span>
						<span class="dent deny">否</span>
					</span>-->
					<div class="question">
						<p class="answer">
							<span class="item">
									<img src="/static/img/sexNo.png" class="sexImg" v-show="show"/>
									<img src="/static/img/sexS.png" class="sexImg" v-show="!show"/>
									<label>代理人推销</label>
							</span>
							<span class="item item1">
									<img src="/static/img/sexNo.png" class="sexImg" v-show="show"/>
									<img src="/static/img/sexS.png" class="sexImg" v-show="!show"/>
									<label>朋友/客户介绍</label>
							</span>
						</p>
						<p class="answer">
							<span class="item">
									<img src="/static/img/sexNo.png" class="sexImg" v-show="show"/>
									<img src="/static/img/sexS.png" class="sexImg" v-show="!show"/>
									<label>投保人主动提出投保计划</label>
							</span>
						</p>
						<p class="answer">
							<span class="item">
									<img src="/static/img/sexNo.png" class="sexImg" v-show="show"/>
									<img src="/static/img/sexS.png" class="sexImg" v-show="!show"/>
									<label>其他，请说明：</label>
									<input type="text" class="inputText2 left boderbo bg bg1"  naxlength="20" />
							</span>
						</p>
					</div>
				</div>
				<div class="inputGrop clearFloat">
					<label class="inputLabel left">3.投保人的投保目的：</label>
					<!--<span class="inputText inputSpan">
						<span class="dent">是</span>
						<span class="dent deny">否</span>
					</span>-->
					<div class="question">
						<p class="answer">
							<span class="item">
									<img src="/static/img/sexNo.png" class="sexImg" v-show="show"/>
									<img src="/static/img/sexS.png" class="sexImg" v-show="!show"/>
									<label>人身保障</label>
							</span>
							<span class="item item1">
									<img src="/static/img/sexNo.png" class="sexImg" v-show="show"/>
									<img src="/static/img/sexS.png" class="sexImg" v-show="!show"/>
									<label>子女教育经费</label>
							</span>
						</p>
						<p class="answer">
							<span class="item">
									<img src="/static/img/sexNo.png" class="sexImg" v-show="show"/>
									<img src="/static/img/sexS.png" class="sexImg" v-show="!show"/>
									<label>储蓄、投资</label>
							</span>
						</p>
						<p class="answer">
							<span class="item">
									<img src="/static/img/sexNo.png" class="sexImg" v-show="show"/>
									<img src="/static/img/sexS.png" class="sexImg" v-show="!show"/>
									<label>其他，请说明：</label>
									<input type="text" class="inputText2 left boderbo bg bg1"  naxlength="20" />
							</span>
						</p>
					</div>
				</div>
				<div class="inputGrop clearFloat">
					<label class="inputLabel left">4.被保险人目前是否呈病态、有生理缺陷、智力障碍、
精神疾病或有疾病、外伤曾接受医生治疗？</label>
					<span class="inputText inputSpan">
						<span class="dent">是</span>
						<span class="dent deny">否</span>
					</span>
				</div>
				<div class="inputGrop1 clearFloat">
					<label class="inputLabel left">9.您估计投保人的家庭总资产约
						<input type="text" class="inputText1 left boderbo bg bg1"  naxlength="20" />
						 万元。</label>
				</div>
		
		</div>
		<div class="btnBox clearFloat">
			<div class="boxLast" @click="handleClickLast">上一步</div>
			<div class="boxNext" @click="toInsuranceTips">下一步</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "accInfo",

		data() {
			return {
				show: true,

			}
		},
		watch: {

		},
		created() {

		},
		methods: {
			handleClickLast(){
				window.history.go(-1)
			},
			toInsuranceTips(){
				this.$router.push("/insuranceTips")
			}
		}

	}
</script>

<style scoped="scoped">
	.one {
		width: 100%;
		min-height: 100%;
		position: absolute;
		background: #F3F3F3;
	}
	
	.broker {
		/*width:100%;*/
		padding: 0.2rem 0.2rem 0.2rem 0.2rem;
		height: 3.08rem;
		margin: 0.32rem auto;
		font-size: 0.28rem;
		color: #101010;
		letter-spacing: 0;
		line-height: 0.44rem;
		background: #FfFFFF;
	}

	.dent {
		color: #54CCC1;
		border: 0.01rem solid #54CCC1;
		padding: 0.15rem 0.3rem;
		border-radius: 0.16rem;
		margin-left: 0.28rem;
	}
	
	.deny {
		color: #ffffff;
		background: #54CCC1;
		padding: 0.15rem 0.3rem;
		border-radius: 0.16rem;
	}
	
	.inputGrop {
		position: relative;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
		margin-top: 0.22rem;
	}
	.inputGrop1{
		position: relative;
		font-size: 0.28rem;
		/*border-bottom: solid 0.01rem #C8C7CC;*/
		margin-top: 0.22rem;
	}
	.inputLabel {
		display: block;
		font-size: 0.28rem;
		color: #555555;
		letter-spacing: 0;
		line-height: 0.44rem;
	}
	
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
		padding-left: 0;
	}
	
	.inputSpan {
		margin-left: 4rem;
		line-height: 0.88rem;
		color: #555555;
	}
	
	.policyHolder {
		padding: 0.2rem 0.4rem;
		background: #FfFFFF;
	}
	
	.sexImg {
		float: left;
		display: inline-block;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: 0.2rem;
		margin-right: 0.06rem;
	}
	
	.item {
		display: inline-block;
	}
	
	.item1 {
		margin-left: 1.1rem;
	}
	
	.item label {
		height: 0.88rem;
		line-height: 0.88rem;
		font-size: 0.28rem;
		color: #555555;
	}
	
	.inputText2 {
		width: 2.7rem;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
		padding-left: 0;
	}
	.inputText1 {
		width: 1.5rem;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
		padding-left: 0;
	}
	.boderbo {
		/*width: 5.5rem;*/
		border: none;
		border-radius: 0;
		border-bottom: 0.01rem solid #979797;
	}
	.bg {
		margin-bottom: 0.2rem;
	}
	.bg1 {
		margin-left: 0.2rem;
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
	
</style>