<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="twoCon clearFloat">
			<div class="headDivL left">
				<img src="/static/img/zhonghua/resultimg.png" class="headImg" />
			</div>
			<div class="headDivR left">
				<p class="headDivRP">经纪人柴富强(工号：10000165)为您服务！  手机号：13466670107</p>
			</div>
		</div>
		<div class="twoCon titleBox">
			<p class="title_twoCon1">声明内容</p>
			<p class="title_twoCon1 title_twoCon2">声明</p>
		</div>
		<div class="twoCon">
			<p class="title_twoCon">主险信息</p>
			<div class="policyHolder">
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">主险</label>
					<span class="inputText inputSpan inputWidth left">中华怡康重大疾病保险</span>
				</P>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">缴费方式</label>
					<span class="inputText inputSpan inputWidth left">缴费方式</span>
				</P>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">缴费期间</label>
					<span class="inputText inputSpan inputWidth left">缴费期间</span>
				</P>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">保险期间</label>
					<span class="inputText inputSpan inputWidth left">保险期间</span>
				</P>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">基本保险保额（元）</label>
					<span class="inputText inputSpan inputWidth left">基本保险保额</span>
				</P>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">保费（元）</label>
					<span class="inputText inputSpan inputWidth left">保费</span>
				</P>
			</div>
		</div>
		<!--<div class="twoCon twoCon1">
			<div class="policyHolder">
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">附加险</label>
					<span class="inputText inputSpan inputWidth left">中华怡康重大疾病保险</span>
				</P>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">缴费方式</label>
					<span class="inputText inputSpan inputWidth left">缴费方式</span>
				</P>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">缴费期间</label>
					<span class="inputText inputSpan inputWidth left">缴费期间</span>
				</P>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">保险期间</label>
					<span class="inputText inputSpan inputWidth left">保险期间</span>
				</P>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">养老金领取年龄</label>
					<span class="inputText inputSpan inputWidth left">养老金领取年龄</span>
				</P>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">养老金领取方式</label>
					<span class="inputText inputSpan inputWidth left">养老金领取方式</span>
				</P>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">养老金金额（元）</label>
					<span class="inputText inputSpan inputWidth left">养老金金额</span>
				</P>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">基本保险保额（元）</label>
					<span class="inputText inputSpan inputWidth left">基本保险保额</span>
				</P>
				<p class="inputGrop clearFloat">
					<label class="inputLabel left">保费（元）</label>
					<span class="inputText inputSpan inputWidth left">保费</span>
				</P>
			</div>
		</div>-->
		<div class="twoCon titleBox">
			<p class="title_twoCon1">温馨提示</p>
			<p class="title_twoCon1 title_twoCon2">提示内容</p>
		</div>
		<p class="btnBox">
			<span class="btn">保费：<span class="btnSpan">￥1000元起</span></span>
			<span class="btn btn1">下一步</span>
		</p>
	</div>
</template>

<script>
	import Addrisk from './addrisk.vue'
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "fee",
		data() {
			return {
				boxShow: true,
				sexShow: true,
			}
		},
		created() {

		},
		methods: {
			
		},
		components: {
			Addrisk: Addrisk
		}
	}
</script>

<style scoped="scoped">
	.ctc_div_listitemleft {
		float: left;
		display: block;
	}
	.pr_img_item {
		margin-top: 0.07rem;
		display: block;
		float: left;
		width: 0.64rem;
		height: 0.64rem;
	}
	.ctc_div_listitemall {
		width: 90%;
		height: 0.8rem;
		line-height: 0.8rem;
		margin: 0 auto;
		border-bottom: 0.01rem solid #8E8E93;
	}
	.ctc_div_list {
		margin-top: 0.3rem;
		width: 100%;
		height: 6rem;
		overflow-y: scroll;
		border-top: 0.01rem solid #8E8E93;
	}
	.span_cancel {
		display: block;
		float: left;
		margin-left: 0.4rem;
		font-size: 0.32rem;
		color: #EB6067;
	}
	.span_ok {
		display: block;
		float: right;
		margin-right: 0.4rem;
		font-size: 0.32rem;
		color: #EB6067;
	}
	.ctc_div_mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.40);
	}
	.ctc_div_maskitem {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 2;
		width: 100%;
		height: 7rem;
		padding-top: 0.32rem;
		background: #ffffff;
	}
	.ctc_div_title {
		width: 100%;
		margin: 0 auto;
		font-size: 0.32rem;
		text-align: center;
		color: #555555;
	}
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
		padding-bottom: 1.5rem;
		background: #F3F3F3;
	}
	.twoCon {
		margin-top: 0.4rem;
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
	}
	.one .twoCon:first-child {
		margin-top: 0;
	}
	.title_twoCon {
		height: 0.84rem;
		line-height: 0.84rem;
		padding-top: 0.28rem;
		font-size: 0.32rem;
		font-weight: bold;
		color: #222222;
	}
	.titleBox {
		padding: 0.24rem 0.4rem;
	}
	.title_twoCon1 {
		min-height: 0.76rem;
		line-height: 0.76rem;
		font-size: 0.32rem;
		font-weight: bold;
		color: #222222;
	}
	.title_twoCon2 {
		line-height: 0.5rem;
		font-size: 0.28rem;
		font-weight: 100;
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
	.btnBox {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 2;
		width: 100%;
		height: 1.06rem;
		display: flex;
	}
	.btn {
		display: inline-block;
		flex: 1;
		height: 1.06rem;
		line-height: 1.06rem;
		font-size: 0.36rem;
		color: #333333;
		text-align: center;
		background: #FFFFFF;
	}
	.btnSpan{
		color: #C9141E;
	}
	.btn1 {
		color: #FFFFFF;
		background: #C9141E;
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
		color: #555555;
	}
	.inputSpan {
		display: inline-block;
		line-height: 0.88rem;
		text-align: right;
	}
	.inputWidth {
		width: 3.48rem;
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
	}
	.dateB {
		position: absolute;
		right: 0;
		top: 0rem;
		z-index: -1;/*下箭头隐藏变1*/
		width: 0.5rem;
		height: 0.88rem;
		background: #FFFFFF;
	}
	.upDownImg {
		width: 0.4rem;
		height: 0.44rem;
		margin-top: 0.2rem;
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
		margin-top: 0;
		padding-top: 0.4rem;
	}
	.headDivL {
		width: 1.16rem;
		height: 1.76rem;
	}
	.headImg {
		display: block;
		width: 0.96rem;
		height: 0.96rem;
		margin-top: 0.4rem;
	}
	.headDivR {
		width: 5.54rem;
		height: 1.76rem;
		font-size: 0.28rem;
		color: #222222;
	}
	.headDivRP{
		margin-top: 0.35rem;
		min-height: 0.5rem;
		line-height: 0.5rem;
	}
</style>