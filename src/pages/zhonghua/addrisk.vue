<template>
	<div class="twoCon">
		<div class="policyHolder">
			<p class="title_twoCon">附加险信息</p>
			<p class="title_twoCon title_twoCon1 clearFloat">
				<span class="left">中华福瑞一生年金保险</span>
				<span class="right">清除</span>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">缴费方式</label>
				<select class="inputText inputWidth left select1">
					<option>缴费方式</option>
				</select>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">缴费期间</label>
				<select class="inputText inputWidth left select1">
					<option>缴费期间</option>
				</select>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">保险期间</label>
				<select class="inputText inputWidth left select1">
					<option>保险期间</option>
				</select>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">养老金领取年龄</label>
				<select class="inputText inputWidth left select1">
					<option>养老金年龄</option>
				</select>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">养老金领取方式</label>
				<select class="inputText inputWidth left select1">
					<option>养老金领取方式</option>
				</select>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">养老金金额（元）</label>
				<select class="inputText inputWidth left select1">
					<option>养老金金额</option>
				</select>
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">保额（元）</label>
				<input type="text" class="inputText left" name="text" placeholder="请输入保额" />
			</p>
			<p class="inputGrop clearFloat">
				<label class="inputLabel left">保费（元）</label>
				<span class="inputText inputSpan left">保费</span>
			</p>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui'
	export default {
		name: "addrisk",
		props: [],
		data() {
			return {

			}
		},
		watch: {

		},
		created() {

		},
		methods: {

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
	.title_twoCon1 {
		padding: 0;
		color: #EB7760;
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
		padding-bottom: 0.64rem;
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
		color: #C9141E;
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
	.inputSpan {
		display: inline-block;
		line-height: 0.88rem;
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
	.pushBox {
		margin: 0.4rem 0 0.92rem 0;
	}
	.pushBtn {
		display: block;
		width: 6.7rem;
		height: 0.88rem;
		line-height: 0.88rem;
		margin: 0 auto;
		font-size: 0.28rem;
		color: #FFFFFF;
		background: #C9141E;
		border-radius: 0.16rem;
		text-align: center;
	}
</style>